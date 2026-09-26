from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

# Inventory
class InventoryItemBase(BaseModel):
    name: str
    sku: Optional[str] = None
    category: str = "INGREDIENT"
    unit: str = "kg"
    quantity_on_hand: float
    reorder_level: float = 10.0
    cost_per_unit: float = 0.0
    supplier_name: Optional[str] = None
    notes: Optional[str] = None
    is_active: bool = True

class InventoryItemCreate(InventoryItemBase):
    pass

class InventoryItemResponse(InventoryItemBase):
    id: str
    quantity_reserved: float
    updated_at: datetime
    
    class Config:
        from_attributes = True

class StockAdjustment(BaseModel):
    item_id: str
    change_amount: float
    transaction_type: str = "ADJUSTMENT" # PURCHASE, WASTE, ADJUSTMENT, RESTOCK
    reason: Optional[str] = None

# Delivery
class DeliveryZoneResponse(BaseModel):
    id: str
    name: str
    description: Optional[str]
    delivery_fee: int
    free_delivery_threshold: int
    estimated_delivery_time: str
    is_active: bool
    
    class Config:
        from_attributes = True

class DeliverySlotResponse(BaseModel):
    id: str
    title: str
    is_active: bool
    
    class Config:
        from_attributes = True

# Coupon
class CouponResponse(BaseModel):
    id: str
    code: str
    description: Optional[str]
    discount_type: str
    discount_value: int
    min_order_amount: int
    is_active: bool
    
    class Config:
        from_attributes = True

class CouponValidateRequest(BaseModel):
    code: str
    order_subtotal: int

class CouponValidateResponse(BaseModel):
    is_valid: bool
    discount_amount: int
    message: str

# Review
class ReviewCreate(BaseModel):
    product_id: str
    customer_name: str
    rating: int = 5
    comment: str

class ReviewResponse(BaseModel):
    id: str
    product_id: str
    customer_name: str
    rating: int
    comment: str
    is_verified_purchase: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# CMS & FAQs
class FAQResponse(BaseModel):
    id: str
    question: str
    answer: str
    category: str
    
    class Config:
        from_attributes = True

class CMSSettingResponse(BaseModel):
    key: str
    value: Any
    
    class Config:
        from_attributes = True

class BestSellingCake(BaseModel):
    product_name: str
    total_quantity_sold: int
    total_revenue: int
    estimated_profit: int
    percentage_of_sales: float
    category: Optional[str] = None
    image_url: Optional[str] = None

class AdminAnalyticsResponse(BaseModel):
    total_revenue: int
    cogs_cost: int
    gross_profit: int
    net_profit: int
    profit_margin_percent: float
    total_orders_count: int
    avg_order_value: int
    all_time_best_sellers: List[BestSellingCake]
    orders_by_status: Dict[str, int]
    revenue_by_zone: Dict[str, int]

class AdminDashboardStats(BaseModel):
    total_revenue: int
    today_revenue: int
    total_orders: int
    orders_today: int
    pending_orders: int
    completed_orders: int
    total_products: int
    total_customers: int
    low_stock_items: int
    pending_customizations: int
    recent_orders: List[Any]
    analytics: Optional[AdminAnalyticsResponse] = None

