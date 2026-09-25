from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import uuid
from app.core.database import Base

class Payment(Base):
    __tablename__ = "payments"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_id = Column(String(36), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    payment_method = Column(String(50), nullable=False) # CASH_ON_DELIVERY, BKASH, NAGAD, CARD, SSLCOMMERZ
    amount = Column(Integer, nullable=False)
    currency = Column(String(10), default="BDT")
    status = Column(String(50), default="PENDING") # PENDING, PROCESSING, PAID, FAILED, REFUNDED
    transaction_id = Column(String(100), nullable=True)
    gateway_reference = Column(String(100), nullable=True)
    gateway_response = Column(JSON, nullable=True)
    paid_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    order = relationship("Order", back_populates="payments")
