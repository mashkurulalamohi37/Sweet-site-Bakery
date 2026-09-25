from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os
from app.core.config import settings
from app.core.database import engine, Base, AsyncSessionLocal
from app.seed.seed_data import seed_database
from app.api.v1.auth import router as auth_router
from app.api.v1.products import router as products_router
from app.api.v1.customizations import router as customizations_router
from app.api.v1.orders import router as orders_router
from app.api.v1.cms import router as cms_router
from app.api.v1.admin import router as admin_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure tables exist & Seed default catalog
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    async with AsyncSessionLocal() as session:
        await seed_database(session)
        
    yield
    # Shutdown
    await engine.dispose()

app = FastAPI(
    title="Sweet Site Bakery API",
    description="Production-grade backend for Sweet Site Bakery (Rangpur, Bangladesh)",
    version="1.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, configure to allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static assets if exists
if os.path.exists("./assets"):
    app.mount("/assets", StaticFiles(directory="./assets"), name="assets")

# Include Routers
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(products_router, prefix=settings.API_V1_STR)
app.include_router(customizations_router, prefix=settings.API_V1_STR)
app.include_router(orders_router, prefix=settings.API_V1_STR)
app.include_router(cms_router, prefix=settings.API_V1_STR)
app.include_router(admin_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "brand": "Sweet Site Bakery",
        "location": "Rangpur, Bangladesh",
        "tagline": "Love at first bite. Made to melt Hearts.",
        "phone": "+880 1852-668468",
        "status": "online",
        "docs": "/docs"
    }
