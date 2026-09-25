from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_
from sqlalchemy.orm import selectinload
from app.core.database import get_db
from app.models.product import Category, Product
from app.schemas.product import ProductResponse, CategoryResponse
from typing import List, Optional

router = APIRouter(tags=["Products & Catalog"])

@router.get("/categories", response_model=List[CategoryResponse])
async def get_categories(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Category).where(Category.is_active == True).order_by(Category.sort_order))
    categories = res.scalars().all()
    
    # attach counts
    out = []
    for c in categories:
        cnt_res = await db.execute(select(func.count(Product.id)).where(Product.category_id == c.id, Product.is_active == True))
        cnt = cnt_res.scalar() or 0
        cat_dict = CategoryResponse.model_validate(c)
        cat_dict.product_count = cnt
        out.append(cat_dict)
    return out

@router.get("/products", response_model=List[ProductResponse])
async def get_products(
    category: Optional[str] = None,
    q: Optional[str] = None,
    sort: Optional[str] = "featured", # featured, low, high, az, newest
    flavor: Optional[str] = None,
    featured_only: bool = False,
    bestsellers_only: bool = False,
    limit: int = 100,
    offset: int = 0,
    db: AsyncSession = Depends(get_db)
):
    query = select(Product).options(selectinload(Product.category)).where(Product.is_active == True)
    
    if category:
        # Check if category slug
        cat_res = await db.execute(select(Category).where(Category.slug == category))
        cat_obj = cat_res.scalars().first()
        if cat_obj:
            query = query.where(Product.category_id == cat_obj.id)
    
    if q:
        search_terms = q.strip().lower()
        query = query.where(
            or_(
                func.lower(Product.name).contains(search_terms),
                func.lower(Product.flavor).contains(search_terms),
                func.lower(Product.description).contains(search_terms),
                func.lower(Product.ingredients).contains(search_terms)
            )
        )
        
    if flavor:
        query = query.where(func.lower(Product.flavor) == flavor.lower())
        
    if featured_only:
        query = query.where(Product.is_featured == True)
        
    if bestsellers_only:
        query = query.where(Product.is_bestseller == True)
        
    # Sorting
    if sort == "low":
        query = query.order_by(Product.base_price.asc())
    elif sort == "high":
        query = query.order_by(Product.base_price.desc())
    elif sort == "az":
        query = query.order_by(Product.name.asc())
    elif sort == "newest":
        query = query.order_by(Product.created_at.desc())
    else:
        # Default featured / menu order
        query = query.order_by(Product.is_featured.desc(), Product.base_price.asc())
        
    query = query.offset(offset).limit(limit)
    res = await db.execute(query)
    return res.scalars().all()

@router.get("/products/{slug}", response_model=ProductResponse)
async def get_product_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(
        select(Product)
        .options(selectinload(Product.category))
        .where(Product.slug == slug, Product.is_active == True)
    )
    prod = res.scalars().first()
    if not prod:
        raise HTTPException(status_code=404, detail="Product not found")
    return prod
