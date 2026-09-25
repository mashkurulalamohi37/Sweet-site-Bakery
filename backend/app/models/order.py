from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import uuid
from app.core.database import Base

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_number = Column(String(50), unique=True, index=True, nullable=False)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    
    # Customer Snapshot
    customer_name = Column(String(255), nullable=False)
    customer_phone = Column(String(50), nullable=False)
    customer_email = Column(String(255), nullable=True)
    
    # Delivery Snapshot
    delivery_area = Column(String(100), nullable=False) # Rangpur City, Outside Rangpur
    delivery_address = Column(Text, nullable=False)
    delivery_landmark = Column(String(255), nullable=True)
    delivery_date = Column(String(50), nullable=False)
    delivery_time_slot = Column(String(50), default="Any time")
    
    # Financials
    subtotal = Column(Integer, nullable=False)
    delivery_fee = Column(Integer, default=0)
    discount_amount = Column(Integer, default=0)
    grand_total = Column(Integer, nullable=False)
    coupon_code = Column(String(50), nullable=True)
    
    # Order Status Lifecycle:
    # PENDING -> CONFIRMED -> PREPARING -> BAKING -> QUALITY_CHECK -> READY -> OUT_FOR_DELIVERY -> DELIVERED (or CANCELLED)
    status = Column(String(50), default="PENDING", index=True, nullable=False)
    payment_status = Column(String(50), default="PENDING", nullable=False) # PENDING, PAID, FAILED, REFUNDED
    payment_method = Column(String(50), default="CASH_ON_DELIVERY", nullable=False)
    
    assigned_baker_name = Column(String(100), nullable=True)
    assigned_delivery_agent = Column(String(100), nullable=True)
    
    customer_notes = Column(Text, nullable=True)
    admin_notes = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), index=True)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="order", cascade="all, delete-orphan")

class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_id = Column(String(36), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(String(36), ForeignKey("products.id", ondelete="SET NULL"), nullable=True)
    
    product_name = Column(String(200), nullable=False)
    product_sku = Column(String(50), nullable=True)
    product_image = Column(String(500), nullable=True)
    unit_size = Column(String(50), default="1.5 pound")
    
    unit_price = Column(Integer, nullable=False)
    quantity = Column(Integer, default=1, nullable=False)
    line_total = Column(Integer, nullable=False)
    
    cake_message = Column(String(100), nullable=True) # Optional message written on the cake
    customization_details = Column(JSON, nullable=True) # Dict of extra options
    
    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")
