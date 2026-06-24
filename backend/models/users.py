from pydantic import BaseModel, Field
from sqlalchemy import Column, String, DateTime, Boolean
from sqlalchemy.orm import relationship
from ..db.database import Base
from backend.utils import utcnow
from uuid import UUID, uuid4

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid4()))
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    username = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)
    
from backend.models.message import Message
from backend.models.preset import MessagePreset

User.saved_messages = relationship("Message", back_populates="user", cascade="all, delete")
User.presets = relationship("MessagePreset", back_populates="user", cascade="all, delete-orphan")

class UserAuth(BaseModel):
    access_token: str = Field(...)
    token_type: str = Field(default="bearer", description="Token type")
    user_id: UUID = Field(...)
    username: str = Field(...)
    email: str = Field(...)