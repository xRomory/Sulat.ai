from pydantic import Field
from pydantic_settings import SettingsConfigDict, BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str = Field(..., env="SECRET_KEY")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    
    DATABASE_URL: str = Field(..., env="DATABASE_URL")
    GEMINI_API_KEY: str = Field(..., env="GEMINI_API_KEY")
    
    model_config = SettingsConfigDict(env_file=".env", extra="forbid")

settings = Settings()