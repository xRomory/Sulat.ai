from typing import List
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from models.users import User

class UserNotFoundException(Exception):
    ...

class UserDatabase:
    def __init__(
        self, 
        db: Session
    ) -> None:
        try:
            self.db = db
        except SQLAlchemyError as e:
            raise RuntimeError(f"Database initialization failed: {e}")
    
    def create(
        self,
        username: str,
        email: str,
        hashed_password: str
    ) -> User:
        user = User(
            username,
            email,
            hashed_password
        )
        
        self.db.add(user)
        
        try:
            self.db.commit()
            self.db.refresh(user)
            return user
        except IntegrityError:
            self.db.rollback()
            raise ValueError("User already exists")
        except SQLAlchemyError as e:
            raise RuntimeError(f"Failed to create user: {e}")
    
    def get_by_id(self, user_id: str) -> User:
        try:
            return self.db.query(User).filter(User.id == user_id).first()
        except SQLAlchemyError as e:
            raise RuntimeError(f"Failed to get user's id: {e}")
    
    def get_by_email(self, email: str) -> User:
        try:
            return self.db.query(User).filter(User.email == email).first()
        except SQLAlchemyError as e:
            raise RuntimeError(f"Failed to get user's email: {e}")
    
    def list_all(self) -> List[User]:
        return self.db.query(User).all()
    
    def delete(self, user_id: str) -> bool:
        user = self.get_by_id(user_id)
        if not user:
            raise UserNotFoundException("User not found.")
        
        self.db.delete(user)
        self.db.commit()
        return True