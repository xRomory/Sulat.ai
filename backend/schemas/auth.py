from pydantic import BaseModel, EmailStr
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