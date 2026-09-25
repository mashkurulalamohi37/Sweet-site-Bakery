from pydantic_settings import BaseSettings
from typing import List, Union
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "Sweet Site Bakery API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite+aiosqlite:///./sweetsite_bakery.db"
    )
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "sweetsite_bakery_super_secret_jwt_key_2026_aesthetic_bakes")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    MIN_ORDER_AMOUNT: int = 499
    WHATSAPP_PHONE: str = "8801852668468"
    BAKERY_LOCATION: str = "Rangpur, Bangladesh"
    
    CORS_ORIGINS: Union[str, List[str]] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8080",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:8080"
    ]
    
    class Config:
        case_sensitive = True

settings = Settings()
