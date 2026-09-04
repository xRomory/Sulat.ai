import pytest
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db.database import Base

TEST_DATABASE_URL = os.getenv("DATABASE_URL")

@pytest.fixture(scope="session")
def test_engine():
    engine = create_engine(TEST_DATABASE_URL) #type: ignore
    Base.metadata.create_all(engine)
    yield engine
    Base.metadata.drop_all(engine)

@pytest.fixture(scope="function")
def db_session(test_engine):
    SessionLocal = sessionmaker(bind=test_engine)
    session = SessionLocal()
    yield session
    session.rollback()
    session.close()