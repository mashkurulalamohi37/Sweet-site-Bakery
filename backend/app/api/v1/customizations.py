from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.customization import CustomizationOption, CustomizationRequest
from app.models.product import Product
from app.schemas.customization import (
    CustomizationOptionResponse,
    CustomizationQuoteRequest,
    CustomizationQuoteResponse,
    CustomizationRequestCreate,
    CustomizationRequestResponse
)
from typing import List
import uuid

router = APIRouter(prefix="/customizations", tags=["Cake Customization Studio"])

@router.get("/options", response_model=List[CustomizationOptionResponse])
async def get_customization_options(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(CustomizationOption).where(CustomizationOption.is_active == True).order_by(CustomizationOption.sort_order))
    return res.scalars().all()

@router.post("/quote", response_model=CustomizationQuoteResponse)
async def calculate_custom_quote(req: CustomizationQuoteRequest, db: AsyncSession = Depends(get_db)):
    base_price = 599 # default vanilla baseline
    if req.flavor_id:
        prod_res = await db.execute(select(Product).where(Product.id == req.flavor_id))
        prod = prod_res.scalars().first()
        if prod:
            base_price = prod.base_price
            
    # Size multiplier
    size_extra = 0
    if req.size == "2 pound":
        size_extra = int(base_price * 0.4)
    elif req.size == "3 pound":
        size_extra = int(base_price * 0.8)
    elif req.size == "0.5 pound":
        size_extra = -int(base_price * 0.4)
        
    # Options extras
    frosting_extra = 0
    design_extra = 0
    extras_total = 0
    
    if req.frosting or req.design_style or req.extras:
        opts_res = await db.execute(select(CustomizationOption).where(CustomizationOption.is_active == True))
        all_opts = {o.name: o.extra_price for o in opts_res.scalars().all()}
        
        if req.frosting and req.frosting in all_opts:
            frosting_extra = all_opts[req.frosting]
        if req.design_style and req.design_style in all_opts:
            design_extra = all_opts[req.design_style]
        for extra in req.extras:
            if extra in all_opts:
                extras_total += all_opts[extra]
                
    estimated_total = max(499, base_price + size_extra + frosting_extra + design_extra + extras_total)
    
    return CustomizationQuoteResponse(
        base_price=base_price,
        size_extra=size_extra,
        frosting_extra=frosting_extra,
        design_extra=design_extra,
        extras_total=extras_total,
        estimated_total=estimated_total
    )

@router.post("/requests", response_model=CustomizationRequestResponse)
async def submit_custom_design_request(req: CustomizationRequestCreate, db: AsyncSession = Depends(get_db)):
    req_num = f"SSB-REQ-{uuid.uuid4().hex[:6].upper()}"
    
    custom_req = CustomizationRequest(
        request_number=req_num,
        customer_name=req.customer_name,
        customer_phone=req.customer_phone,
        customer_email=req.customer_email,
        occasion=req.occasion,
        flavor_name=req.flavor_name,
        size=req.size,
        frosting=req.frosting,
        design_style=req.design_style,
        color_theme=req.color_theme,
        extras=req.extras,
        cake_message=req.cake_message,
        reference_image_url=req.reference_image_url,
        special_instructions=req.special_instructions,
        preferred_date=req.preferred_date,
        preferred_time=req.preferred_time,
        budget_estimate=req.budget_estimate,
        calculated_base_price=req.budget_estimate or 0,
        status="PENDING"
    )
    db.add(custom_req)
    await db.commit()
    await db.refresh(custom_req)
    return custom_req
