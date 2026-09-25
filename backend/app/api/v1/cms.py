from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.delivery import DeliveryZone, DeliverySlot
from app.models.cms import Coupon, CMSSetting, FAQ, Review
from app.schemas.cms import (
    DeliveryZoneResponse,
    DeliverySlotResponse,
    CouponValidateRequest,
    CouponValidateResponse,
    FAQResponse,
    CMSSettingResponse,
    ReviewCreate,
    ReviewResponse
)
from typing import List

router = APIRouter(tags=["Delivery, CMS & Coupons"])

@router.get("/delivery/zones", response_model=List[DeliveryZoneResponse])
async def get_delivery_zones(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(DeliveryZone).where(DeliveryZone.is_active == True))
    return res.scalars().all()

@router.get("/delivery/slots", response_model=List[DeliverySlotResponse])
async def get_delivery_slots(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(DeliverySlot).where(DeliverySlot.is_active == True).order_by(DeliverySlot.sort_order))
    return res.scalars().all()

@router.post("/coupons/validate", response_model=CouponValidateResponse)
async def validate_coupon(req: CouponValidateRequest, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Coupon).where(Coupon.code == req.code.strip().upper(), Coupon.is_active == True))
    coupon = res.scalars().first()
    if not coupon:
        return CouponValidateResponse(is_valid=False, discount_amount=0, message="Invalid coupon code")
        
    if req.order_subtotal < coupon.min_order_amount:
        return CouponValidateResponse(
            is_valid=False, 
            discount_amount=0, 
            message=f"Coupon requires a minimum order of ৳{coupon.min_order_amount:,}"
        )
        
    discount = 0
    if coupon.discount_type == "PERCENT":
        discount = int(req.order_subtotal * (coupon.discount_value / 100))
        if coupon.max_discount:
            discount = min(discount, coupon.max_discount)
    else:
        discount = coupon.discount_value
        
    return CouponValidateResponse(
        is_valid=True,
        discount_amount=discount,
        message=f"Coupon applied: ৳{discount:,} discount!"
    )

@router.get("/cms/faqs", response_model=List[FAQResponse])
async def get_faqs(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(FAQ).where(FAQ.is_active == True).order_by(FAQ.sort_order))
    return res.scalars().all()

@router.get("/cms/settings", response_model=List[CMSSettingResponse])
async def get_cms_settings(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(CMSSetting))
    return res.scalars().all()

@router.get("/reviews", response_model=List[ReviewResponse])
async def get_reviews(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Review).where(Review.is_approved == True).order_by(Review.created_at.desc()).limit(20))
    return res.scalars().all()

@router.post("/reviews", response_model=ReviewResponse)
async def submit_review(req: ReviewCreate, db: AsyncSession = Depends(get_db)):
    rev = Review(**req.model_dump())
    db.add(rev)
    await db.commit()
    await db.refresh(rev)
    return rev
