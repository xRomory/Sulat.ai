import pytest
from sqlalchemy.orm import Session
from unittest.mock import Mock, patch
from pydantic import EmailStr
from models.users import UserCreate, User
from services.users_service import UserService
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

def test_signup_success(user_service):
    user_data = create_test_user()
    user_service.user_db.get_by_email.return_value = None
    
    created_user = User(
        id=uuid4(),
        username=user_data.username,
        email=user_data.email,
        password="hashed123"
    )
    
    user_service.user_db.create.return_value = created_user
    
    with patch(
        f"{USER_SERVICE_MODULE}.get_password_hash",
        return_value="hashed123"
    )as mock_hash:
        
        result = user_service.signup(user_data)
    
    mock_hash.assert_called_once_with("password123")
    user_service.user_db.get_by_email.assert_called_once_with("test.user@email.com")
    user_service.user_db.create.assert_called_once()
    
    created_args = user_service.user_db.create.call_args[0][0]
    assert isinstance(created_args, User)
    assert created_args.username == "Test User"
    assert created_args.email == "test.user@email.com"
    assert created_args.password == "hashed123"
    
    assert result is created_user
    assert result.username == user_data.username
    assert result.email == user_data.email

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
    user_data = create_test_user()
    existing_user = User(
        id=uuid4(),
        username="Existing User",
        email=user_data.email,
        password="anotherpass",
    )
    user_service.user_db.get_by_email.return_value = existing_user
    
    with pytest.raises(ValueError, match="Email already exists."):
        with patch(
            f"{USER_SERVICE_MODULE}.get_password_hash",
            side_effect=RuntimeError("Hash failed")
        ):
            with pytest.raises(RuntimeError, match="Hash failed"):
                user_service.signup(user_data)

        user_service.user_db.create.assert_not_called()