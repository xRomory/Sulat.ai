from pydantic import BaseModel, EmailStr, Field, ConfigDict
from uuid import UUID

#------------- Schemas -------------
class SignupRequest(BaseModel):
    username: str
    email: EmailStr
    password: str
    
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    
class UsersAuth(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str
    email: EmailStr
    user_id: UUID

class UserAuthResponse(BaseModel):
    access_token: str = Field(...)
    token_type: str = Field(default="bearer", description="Token type")
    user_id: UUID = Field(...)
    username: str = Field(...)
    email: str = Field(...)

class UserResponse(BaseModel):
    id: UUID
    username: str
    email: EmailStr
    
    model_config = ConfigDict(from_attributes=True)

class UserCreate(BaseModel):
    username: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=1, max_length=100)