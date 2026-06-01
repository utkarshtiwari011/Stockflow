from pydantic_settings import BaseSettings
from pydantic import ConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://stockflow:stockflow123@db:5432/stockflow"
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://localhost:3000"
    APP_ENV: str = "development"

    model_config = ConfigDict(env_file=".env", extra="ignore")

settings = Settings()
