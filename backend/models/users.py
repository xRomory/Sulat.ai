from pydantic import BaseModel, Field
from sqlalchemy import Column, String, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from db.database import Base
from utils import utcnow
from uuid import uuid4, UUID as uuid

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    username = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)
    
    saved_messages = relationship(
        "Message",
        back_populates="user",
        cascade="all, delete"
    )
    
    presets = relationship(
        "MessagePreset",
        back_populates="user",
        cascade="all, delete-orphan"
    )

# User.saved_messages = relationship(
#     Message,
#     back_populates="user",
#     cascade="all, delete"
# )

# User.presets = relationship(
#     MessagePreset,
#     back_populates="user",
#     cascade="all, delete-orphan"
# )

class UserAuth(BaseModel):
    access_token: str = Field(...)
    token_type: str = Field(default="bearer", description="Token type")
    user_id: uuid = Field(...)
    username: str = Field(...)
    email: str = Field(...)