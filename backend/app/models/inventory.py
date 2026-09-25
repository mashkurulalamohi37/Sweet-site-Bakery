from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text
from datetime import datetime, timezone
import uuid
from app.core.database import Base

class InventoryItem(Base):
    __tablename__ = "inventory_items"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    sku = Column(String(50), unique=True, index=True, nullable=True)
    name = Column(String(150), nullable=False)
    category = Column(String(50), default="INGREDIENT") # INGREDIENT, PACKAGING, RAW_MATERIAL, FINISHED_PRODUCT
    unit = Column(String(30), default="kg") # kg, liter, piece, box, gram
    quantity_on_hand = Column(Float, default=0.0)
    quantity_reserved = Column(Float, default=0.0) # Reserved for baking orders
    reorder_level = Column(Float, default=10.0)
    cost_per_unit = Column(Float, default=0.0)
    supplier_name = Column(String(150), nullable=True)
    notes = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

class InventoryTransaction(Base):
    __tablename__ = "inventory_transactions"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    item_id = Column(String(36), ForeignKey("inventory_items.id", ondelete="CASCADE"), nullable=False)
    order_id = Column(String(36), nullable=True)
    change_amount = Column(Float, nullable=False) # e.g. -2.5 or +50
    transaction_type = Column(String(50), nullable=False) # PURCHASE, ORDER_RESERVATION, ORDER_USAGE, ORDER_RELEASE, WASTE, ADJUSTMENT
    reason = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
