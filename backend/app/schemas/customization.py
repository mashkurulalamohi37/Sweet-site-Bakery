from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CustomizationOptionResponse(BaseModel):
    id: str
    category: str
    name: str
    description: Optional[str] = None
    extra_price: int
    color_hex: Optional[str] = None
    is_active: bool
    
    class Config:
        from_attributes = True

class CustomizationQuoteRequest(BaseModel):
    flavor_id: Optional[str] = None
    size: str = "1.5 pound"
    frosting: Optional[str] = None
    design_style: Optional[str] = None
    color_theme: List[str] = []
    extras: List[str] = []

class CustomizationQuoteResponse(BaseModel):
    base_price: int
    size_extra: int
    frosting_extra: int
    design_extra: int
    extras_total: int
    estimated_total: int

class CustomizationRequestCreate(BaseModel):
    customer_name: str
    customer_phone: str
    customer_email: Optional[str] = None
    occasion: Optional[str] = None
    flavor_name: Optional[str] = None
    size: str = "1.5 pound"
    frosting: Optional[str] = None
    design_style: Optional[str] = None
    color_theme: List[str] = []
    extras: List[str] = []
    cake_message: Optional[str] = None
    reference_image_url: Optional[str] = None
    special_instructions: Optional[str] = None
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = "Any time"
    budget_estimate: Optional[int] = None

class CustomizationRequestResponse(CustomizationRequestCreate):
    id: str
    request_number: str
    calculated_base_price: int
    proposed_final_price: Optional[int] = None
    status: str
    admin_notes: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True
