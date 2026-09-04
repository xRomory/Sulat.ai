from pydantic_settings import SettingsConfigDict, BaseSettings

class Settings(BaseSettings):
    database_url: str
    gemini_api_key: str
    jwt_secret_key: str
    cors_origins: str
    postgres_user: str
    postgres_password: str
    postgres_db: str
    db_port: int
    
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings() #type: ignore

ALLOW_ORIGINS = [
    origin.strip() 
    for origin in settings.cors_origins.split(",") 
    if origin.strip()
]