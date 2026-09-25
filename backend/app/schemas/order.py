from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class OrderItemCreate(BaseModel):
    product_id: str
    quantity: int = Field(gt=0, default=1)
    cake_message: Optional[str] = None
    customization_details: Optional[Dict[str, Any]] = None

class OrderCreate(BaseModel):
    customer_name: str
    customer_phone: str
    customer_email: Optional[str] = None
    delivery_area: str = "Rangpur City"
    delivery_address: str
    delivery_landmark: Optional[str] = None
    delivery_date: str
    delivery_time_slot: str = "Any time"
    payment_method: str = "CASH_ON_DELIVERY"
    coupon_code: Optional[str] = None
    customer_notes: Optional[str] = None
    items: List[OrderItemCreate]

class OrderItemResponse(BaseModel):
    id: str
    product_id: Optional[str]
    product_name: str
    product_image: Optional[str]
    unit_size: str
    unit_price: int
    quantity: int
    line_total: int
    cake_message: Optional[str]
    customization_details: Optional[Dict[str, Any]]
    
    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    id: str
    order_number: str
    customer_name: str
    customer_phone: str
    customer_email: Optional[str]
    delivery_area: str
    delivery_address: str
    delivery_date: str
    delivery_time_slot: str
    subtotal: int
    delivery_fee: int
    discount_amount: int
    grand_total: int
    coupon_code: Optional[str]
    status: str
    payment_status: str
    payment_method: str
    assigned_baker_name: Optional[str]
    assigned_delivery_agent: Optional[str]
    customer_notes: Optional[str]
    created_at: datetime
    items: List[OrderItemResponse]
    
    class Config:
        from_attributes = True

class OrderStatusUpdate(BaseModel):
    status: Optional[str] = None
    payment_status: Optional[str] = None
    assigned_baker_name: Optional[str] = None
    assigned_delivery_agent: Optional[str] = None
    admin_notes: Optional[str] = None
