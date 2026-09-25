from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import uuid
from app.core.database import Base

class Coupon(Base):
    __tablename__ = "coupons"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    code = Column(String(50), unique=True, index=True, nullable=False)
    description = Column(String(255), nullable=True)
    discount_type = Column(String(20), default="PERCENT") # PERCENT, FIXED
    discount_value = Column(Integer, nullable=False) # e.g. 10 for 10% or 100 for ৳100
    min_order_amount = Column(Integer, default=499)
    max_discount = Column(Integer, nullable=True)
    usage_limit = Column(Integer, default=100)
    times_used = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    expires_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class Review(Base):
    __tablename__ = "reviews"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    product_id = Column(String(36), ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    customer_name = Column(String(150), nullable=False)
    rating = Column(Integer, default=5, nullable=False)
    comment = Column(Text, nullable=False)
    is_verified_purchase = Column(Boolean, default=True)
    is_approved = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    product = relationship("Product", back_populates="reviews")
    user = relationship("User", back_populates="reviews")

class CMSSetting(Base):
    __tablename__ = "cms_settings"
    
    key = Column(String(100), primary_key=True)
    value = Column(JSON, nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

class FAQ(Base):
    __tablename__ = "faqs"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    question = Column(String(255), nullable=False)
    answer = Column(Text, nullable=False)
    category = Column(String(50), default="General")
    sort_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
