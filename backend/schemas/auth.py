from pydantic import BaseModel, EmailStr

#------------- Schemas -------------
class SignupRequest(BaseModel):
    username: str
    email: EmailStr
    password: str
    
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    
class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str
    email: str