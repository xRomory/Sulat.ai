from fastapi import Depends
from db.users_db import UserDatabase, UserNotFoundException
from sqlalchemy.orm import Session
from backend.schemas.users import LoginRequest
from models.users import User
from schemas.users import UserCreate, UserAuthResponse
from utils.security import get_password_hash, verify_password
from utils.jwt import create_access_token

class UserService:
    def __init__(self, db: Session) -> None:
        self.user_db = UserDatabase(db)
        
    def signup(self, user_data: UserCreate) -> User:
        try:
            self.user_db.get_by_email(user_data.email)
            raise ValueError("Email already exists.")
        except UserNotFoundException:
            ...
        
        hashed_password = get_password_hash(user_data.password)
        
        new_user = self.user_db.create(User(
            username=user_data.username,
            email=user_data.email,
            password=hashed_password
        ))
        
        return new_user
    
    def login(self, user_credentials: LoginRequest) -> UserAuthResponse:
        try:
            user = self.user_db.get_by_email(user_credentials.email)
        except UserNotFoundException:
            raise ValueError("Invalid email or password")
        
        if not verify_password(user_credentials.password, user.password):
            raise ValueError("Invalid email or password")
        
        token = create_access_token(user)
        
        return UserAuthResponse(
            access_token=token,
            token_type="bearer",
            username=user.username,
            email=user.email,
            user_id=user.id
        )