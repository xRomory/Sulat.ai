from sqlalchemy import Column, String, DateTime, Boolean
from sqlalchemy.orm import relationship
from database import Base
from utils import utcnow
import uuid

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    username = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)
    
from models.message import Message
from models.preset import MessagePreset

User.saved_messages = relationship("Message", back_populates="user", cascade="all, delete")
User.presets = relationship("MessagePreset", back_populates="user", cascade="all, delete")