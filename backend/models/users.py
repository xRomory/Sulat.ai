from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from sqlalchemy import String, DateTime, Boolean
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from db.database import Base
from utils.prompts import utcnow
from uuid import uuid4, UUID

class User(Base):
    __tablename__ = "users"
    
    id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        primary_key=True,
        default=uuid4
    )
    
    email: Mapped[str] = mapped_column(
        String,
        unique=True,
        nullable=False
    )
    
    password: Mapped[str] = mapped_column(
        String,
        nullable=False
    )
    
    username: Mapped[str] = mapped_column(
        String,
        nullable=False
    )
    
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True
    )
    
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=utcnow
    )
    
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

class UserAuthResponse(BaseModel):
    access_token: str = Field(...)
    token_type: str = Field(default="bearer", description="Token type")
    user_id: UUID = Field(...)
    username: str = Field(...)
    email: str = Field(...)

class UserResponse(BaseModel):
    user_id: UUID = Field(...)
    username: str = Field(..., min_length=1, max_length=100)
    email: EmailStr = Field(..., min_length=1, max_length=100)

class UserCreate(BaseModel):
    username: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=1, max_length=100)