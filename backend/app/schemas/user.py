from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    phone: Optional[str] = None
    email: Optional[str] = None
    identifier: Optional[str] = None # can be email or phone
    password: str


class UserResponse(UserBase):
    id: str
    role: str
    is_active: bool
    is_verified: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse

class AddressBase(BaseModel):
    title: str = "Home"
    recipient_name: str
    recipient_phone: str
    area: str
    street_address: str
    landmark: Optional[str] = None
    is_default: bool = False

class AddressCreate(AddressBase):
    pass

class AddressResponse(AddressBase):
    id: str
    created_at: datetime
    
    class Config:
        from_attributes = True
