from pydantic import BaseModel
from typing import Optional, List, Any
from datetime import datetime

class CategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    sort_order: int = 0
    is_active: bool = True

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: str
    product_count: Optional[int] = 0
    
    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    name: str
    slug: str
    sku: Optional[str] = None
    category_id: Optional[str] = None
    short_description: Optional[str] = None
    description: Optional[str] = None
    base_price: int
    sale_price: Optional[int] = None
    is_price_starting_from: bool = False
    unit: str = "1.5 pound"
    weight_grams: int = 680
    available_sizes: List[str] = ["1.5 pound", "2 pound", "3 pound"]
    flavor: Optional[str] = None
    frosting: Optional[str] = "Homemade butter, Ever Whipped & white chocolate"
    filling: Optional[str] = None
    ingredients: Optional[str] = None
    allergens: Optional[str] = "Eggs, Dairy, Wheat/Gluten"
    image_url: str
    gallery_images: List[str] = []
    stock_quantity: int = 99
    is_in_stock: bool = True
    is_featured: bool = False
    is_bestseller: bool = False
    is_new: bool = False
    is_active: bool = True
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category_id: Optional[str] = None
    short_description: Optional[str] = None
    description: Optional[str] = None
    base_price: Optional[int] = None
    sale_price: Optional[int] = None
    is_price_starting_from: Optional[bool] = None
    unit: Optional[str] = None
    flavor: Optional[str] = None
    image_url: Optional[str] = None
    is_in_stock: Optional[bool] = None
    is_featured: Optional[bool] = None
    is_bestseller: Optional[bool] = None
    is_active: Optional[bool] = None

class ProductResponse(ProductBase):
    id: str
    rating_avg: float
    rating_count: int
    created_at: datetime
    category: Optional[CategoryResponse] = None
    
    class Config:
        from_attributes = True
