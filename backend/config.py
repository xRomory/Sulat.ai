from pydantic import Field
from pydantic_settings import SettingsConfigDict, BaseSettings
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

class Settings(BaseSettings):
    # SECRET_KEY: str = Field(default=..., validation_alias="SECRET_KEY")
    
    # DATABASE_URL: str = Field(..., validation_alias="DATABASE_URL")
    # GEMINI_API_KEY: str = Field(..., validation_alias="GEMINI_API_KEY")
    
    model_config = SettingsConfigDict(env_file=".env", extra="forbid")

settings = Settings()