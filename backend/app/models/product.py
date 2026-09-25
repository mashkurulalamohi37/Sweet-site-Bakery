from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import uuid
from app.core.database import Base

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    slug = Column(String(100), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    image_url = Column(String(500), nullable=True)
    sort_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    products = relationship("Product", back_populates="category")

class Product(Base):
    __tablename__ = "products"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    sku = Column(String(50), unique=True, index=True, nullable=True)
    slug = Column(String(150), unique=True, index=True, nullable=False)
    name = Column(String(200), nullable=False)
    category_id = Column(String(36), ForeignKey("categories.id", ondelete="SET NULL"), nullable=True)
    short_description = Column(String(500), nullable=True)
    description = Column(Text, nullable=True)
    
    base_price = Column(Integer, nullable=False)  # in BDT (৳)
    sale_price = Column(Integer, nullable=True)
    is_price_starting_from = Column(Boolean, default=False)
    
    unit = Column(String(50), default="1.5 pound") # "1.5 pound", "per piece", "per box"
    weight_grams = Column(Integer, default=680)    # 1.5 lb ~ 680g
    available_sizes = Column(JSON, default=lambda: ["1.5 pound", "2 pound", "3 pound"])
    
    flavor = Column(String(100), nullable=True)
    frosting = Column(String(150), default="Homemade butter, Ever Whipped & white chocolate")
    filling = Column(String(150), nullable=True)
    ingredients = Column(Text, nullable=True)
    allergens = Column(String(255), default="Eggs, Dairy, Wheat/Gluten")
    
    image_url = Column(String(500), nullable=False)
    gallery_images = Column(JSON, default=list)
    
    stock_quantity = Column(Integer, default=99)
    is_in_stock = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    is_bestseller = Column(Boolean, default=False)
    is_new = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    
    rating_avg = Column(Float, default=5.0)
    rating_count = Column(Integer, default=1)
    
    seo_title = Column(String(255), nullable=True)
    seo_description = Column(String(500), nullable=True)
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    category = relationship("Category", back_populates="products", lazy="selectin")
    reviews = relationship("Review", back_populates="product", cascade="all, delete-orphan", lazy="selectin")
    order_items = relationship("OrderItem", back_populates="product")
