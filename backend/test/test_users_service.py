import pytest
from unittest.mock import MagicMock
from pydantic import EmailStr
from models.users import UserCreate
from services.users_service import UserService

@pytest.fixture
def user_service():
    db = MagicMock()
    service = UserService(db)
    print(service)
    return service

def create_test_user(
    username: str = "Test User",
    email: EmailStr = "test.user@email.com",
    password: str = "test123"
) -> UserCreate:
    return UserCreate(
        username=username,
        email=email,
        password=password
    )

def test_signup_success(user_service):
    fake_user_data = create_test_user()
    user = user_service.signup(fake_user_data)
    
    assert user == fake_user_data