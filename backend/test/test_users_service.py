import pytest
from sqlalchemy.orm import Session
from unittest.mock import Mock, patch
from pydantic import EmailStr
from models.users import UserCreate, User
from db.users_db import UserNotFoundException
from services.users_service import UserService
from schemas.auth import LoginRequest
from utils.security import get_password_hash
from uuid import uuid4

USER_SERVICE_MODULE = "services.users_service"

@pytest.fixture
def mock_db_session():
    return Mock(spec=Session)

@pytest.fixture
def user_service(mock_db_session):
    with patch(f"{USER_SERVICE_MODULE}.UserDatabase") as mock_db_class:
        mock_user_db = mock_db_class.return_value
        
        service = UserService(db=mock_db_session)
        service.user_db = mock_user_db
        
        yield service

def test_signup_success(user_service):
    user_service.user_db.get_by_email.return_value = None
    
    created_user = created_user_data()
    created_user.password = get_password_hash(created_user.password)
    user_service.user_db.create.return_value = created_user
    
    result = user_service.signup(created_user)

    user_service.user_db.get_by_email.assert_called_once_with("test.user@email.com")
    user_service.user_db.create.assert_called_once()
    
    assert result is created_user
    assert result.username == created_user.username
    assert result.email == created_user.email

def test_signup_duplicate_email(user_service):
    user_data = create_test_user()
    existing_user = User(
        id=uuid4(),
        username="Existing User",
        email=user_data.email,
        password="anotherpass",
    )
    
    user_service.user_db.get_by_email.return_value = existing_user
    
    with pytest.raises(ValueError, match="Email already exists."):
        user_service.signup(user_data)
    
    user_service.user_db.create.assert_not_called()

def test_signup_hash_failure_does_not_create(user_service):
    existing_user = created_user_data()
    user_service.user_db.get_by_email.return_value = existing_user
    
    with pytest.raises(ValueError, match="Email already exists."):
        with patch(
            f"{USER_SERVICE_MODULE}.get_password_hash",
            side_effect=RuntimeError("Hash failed")
        ):
            with pytest.raises(RuntimeError, match="Hash failed"):
                user_service.signup(existing_user)

        user_service.user_db.create.assert_not_called()

def test_login_user_success(user_service):
    user_service.user_db.get_by_email.return_value = None
    
    # Create a user, hash the password, query it
    created_user = created_user_data()
    plain_password = created_user.password
    created_user.password = get_password_hash(plain_password)
    user_service.user_db.create.return_value = created_user
    
    signup_user=user_service.signup(created_user)
    
    # User now exists in DB
    user_service.user_db.get_by_email.return_value = signup_user
    
    # User login with their credentials
    user_creds = LoginRequest(
        email=created_user.email,
        password=plain_password
    )
    
    login = user_service.login(user_creds)
    
    assert isinstance(user_creds, LoginRequest)
    assert login.username == signup_user.username
    assert login.email == signup_user.email
    assert login.token_type == "bearer"

def test_login_wrong_password_real_check(user_service):
    # Create user, hash the pwd, query it
    created_user = created_user_data()
    created_user.password = get_password_hash(created_user.password)
    user_service.user_db.get_by_email.return_value = created_user
    
    user_creds = LoginRequest(
        email=created_user.email,
        password="John Cena"
    )
    
    with pytest.raises(ValueError, match="Invalid email or password"):
        user_service.login(user_creds)

def test_login_nonexistent_user(user_service):
    user_service.user_db.get_by_email.side_effect = UserNotFoundException()
    user_creds = LoginRequest(
        email="test@email.com",
        password="John Cena"
    )
    
    with pytest.raises(ValueError, match="Invalid email or password"):
        user_service.login(user_creds)
    
def create_test_user(
    username: str = "Test User",
    email: EmailStr = "test.user@email.com",
    password: str = "password123"
) -> UserCreate:
    return UserCreate(
        username=username,
        email=email,
        password=password
    )

def created_user_data() -> User:
    user = create_test_user()
    return User(
        id=uuid4(),
        username=user.username,
        email=user.email,
        password="hashed123"
    )