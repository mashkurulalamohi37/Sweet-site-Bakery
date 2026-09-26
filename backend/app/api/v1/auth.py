from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import get_password_hash, verify_password, create_access_token, create_refresh_token, decode_token, oauth2_scheme
from app.models.user import User, UserRole, Address
from app.schemas.user import UserCreate, UserLogin, UserResponse, Token, AddressCreate, AddressResponse
from typing import List, Optional

router = APIRouter(prefix="/auth", tags=["Authentication"])

async def get_current_user(token: Optional[str] = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)) -> User:
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")
    payload = decode_token(token)
    if not payload or payload.get("type") != "access":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    user_id = payload.get("sub")
    res = await db.execute(select(User).where(User.id == user_id, User.is_active == True))
    user = res.scalars().first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found or disabled")
    return user

async def get_current_admin(user: User = Depends(get_current_user)) -> User:
    if user.role not in [UserRole.ADMIN.value, UserRole.MANAGER.value]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Administrator permissions required")
    return user

@router.post("/register", response_model=Token)
async def register(req: UserCreate, db: AsyncSession = Depends(get_db)):
    # Check phone duplicate
    res = await db.execute(select(User).where(User.phone == req.phone))
    if res.scalars().first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Phone number is already registered")
    
    user = User(
        name=req.name,
        phone=req.phone,
        email=req.email,
        hashed_password=get_password_hash(req.password),
        role=UserRole.CUSTOMER.value,
        is_active=True
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    
    access = create_access_token(user.id, user.role)
    refresh = create_refresh_token(user.id)
    return Token(access_token=access, refresh_token=refresh, user=UserResponse.model_validate(user))

@router.post("/login", response_model=Token)
async def login(req: UserLogin, db: AsyncSession = Depends(get_db)):
    ident = req.identifier or req.email or req.phone
    if not ident:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email or phone number is required")
        
    res = await db.execute(
        select(User).where(
            (User.email == ident) | (User.phone == ident)
        )
    )
    user = res.scalars().first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email/phone or password")
    
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account is disabled")
    
    access = create_access_token(user.id, user.role)
    refresh = create_refresh_token(user.id)
    return Token(access_token=access, refresh_token=refresh, user=UserResponse.model_validate(user))


@router.get("/me", response_model=UserResponse)
async def get_profile(user: User = Depends(get_current_user)):
    return user

@router.get("/addresses", response_model=List[AddressResponse])
async def get_addresses(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Address).where(Address.user_id == user.id))
    return res.scalars().all()

@router.post("/addresses", response_model=AddressResponse)
async def add_address(req: AddressCreate, user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    addr = Address(user_id=user.id, **req.model_dump())
    db.add(addr)
    await db.commit()
    await db.refresh(addr)
    return addr
