import pytest
from uuid import uuid4
from unittest.mock import MagicMock
from db import users_db
from models.users import User

@pytest.fixture
def mock_session():
    return MagicMock()

def create_user(
    username: str = "Test User",
    email: str = "testuser@example.com",
    hashed_password: str = "password123"
) -> User:
    return User(
        id = uuid4(),
        email=email,
        hashed_password=hashed_password,
        username=username,
    )

def test_init_stores_stores(mock_session):
    user_db = users_db.UserDatabase(mock_session)
    assert user_db.db is mock_session

def test_create_user(db_session):
    repo = users_db.UserDatabase(db_session)
    
    user = repo.create(
        username="Test User",
        email="testuser@example.com",
        password="password123"
    )
    
    assert user.id is not None
    assert str(user.email) == "testuser@example.com"
    assert str(user.username) == "Test User"