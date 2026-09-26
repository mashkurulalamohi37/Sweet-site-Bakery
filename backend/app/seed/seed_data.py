import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import AsyncSessionLocal, engine, Base
from app.core.security import get_password_hash
from app.models.user import User, UserRole
from app.models.product import Category, Product
from app.models.customization import CustomizationOption
from app.models.delivery import DeliveryZone, DeliverySlot
from app.models.inventory import InventoryItem
from app.models.cms import Coupon, FAQ, CMSSetting

def slugify(text: str) -> str:
    import re
    text = text.lower().replace("+", " and ").replace("(", "").replace(")", "")
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

CATEGORIES_DATA = [
    {"slug": "pound-cakes", "name": "Pound Cakes", "description": "Whole cakes, 1.5 pound, in 28 rich artisanal flavours.", "image_url": "/assets/cakes/pound-cakes.jpg", "sort_order": 1},
    {"slug": "cup-cakes", "name": "Cup Cakes", "description": "Single cupcakes with swirl buttercream, sold by the piece.", "image_url": "/assets/cakes/cup-cakes.jpg", "sort_order": 2},
    {"slug": "pastry-cakes", "name": "Pastry Cakes", "description": "Individual multi-layered French pastry cakes, by the piece.", "image_url": "/assets/cakes/pastry-cakes.jpg", "sort_order": 3},
    {"slug": "jar-cakes", "name": "Jar Cakes", "description": "Layers of moist cake, fudge, and frosting in a reusable glass jar.", "image_url": "/assets/cakes/jar-cakes.jpg", "sort_order": 4},
    {"slug": "tab-cakes", "name": "Tab Cakes", "description": "Creamy decadent dessert tab cakes, by the piece.", "image_url": "/assets/cakes/tab-cakes.jpg", "sort_order": 5},
    {"slug": "lunch-box-cakes", "name": "Lunch Box Cakes", "description": "Trendy Korean Bento mini aesthetic cakes in eco takeaway boxes.", "image_url": "/assets/cakes/lunch-box-cakes.jpg", "sort_order": 6},
    {"slug": "muffins", "name": "Muffins", "description": "Freshly baked bakery muffins in tulip parchment paper, by the box.", "image_url": "/assets/cakes/muffins.jpg", "sort_order": 7},
    {"slug": "swiss-rolls", "name": "Swiss Rolls", "description": "Rolled sponge and whipped vanilla cream, by the box.", "image_url": "/assets/cakes/swiss-rolls.jpg", "sort_order": 8},
    {"slug": "pound-slices", "name": "Pound Slices", "description": "Individual fresh pound cake slices, by the piece.", "image_url": "/assets/cakes/pound-slices.jpg", "sort_order": 9},
    {"slug": "lava-cakes", "name": "Lava Cakes", "description": "Warm molten chocolate lava cake with rich flowing center.", "image_url": "/assets/cakes/lava-cake.jpg", "sort_order": 10},
    {"slug": "cheesecakes", "name": "Cheesecakes", "description": "Classic and Basque burnt cheesecakes.", "image_url": "/assets/cakes/cheesecakes.jpg", "sort_order": 11},
    {"slug": "chocolate-cakes", "name": "Chocolate Cakes", "description": "Everything decadent and chocolate, in one place.", "image_url": "/assets/cakes/chocolate-cakes.jpg", "sort_order": 12},
]

POUND_CAKES = [
    ("Vanilla", 599, False, "/assets/cakes/pound-cakes.jpg", False, False),
    ("Orange", 699, False, "/assets/cakes/pound-cakes.jpg", False, False),
    ("Strawberry", 699, False, "/assets/cakes/pound-cakes.jpg", False, False),
    ("Mango", 699, False, "/assets/cakes/pound-cakes.jpg", False, False),
    ("Lemon", 699, False, "/assets/cakes/pound-cakes.jpg", False, False),
    ("Chocolate", 749, False, "/assets/cakes/chocolate-cakes.jpg", True, False),
    ("Cappuccino", 749, False, "/assets/cakes/chocolate-mousse.jpg", False, False),
    ("Blueberry", 799, False, "/assets/cakes/pound-cakes.jpg", False, False),
    ("Pandan", 799, False, "/assets/cakes/pound-cakes.jpg", False, False),
    ("Caramel", 799, False, "/assets/cakes/pound-cakes.jpg", False, False),
    ("Black Forest", 799, False, "/assets/cakes/black-forest.jpg", True, True),
    ("White Forest", 799, False, "/assets/cakes/pastry-cakes.jpg", False, False),
    ("Ganache Cover (Chocolate)", 799, False, "/assets/cakes/chocolate-mousse.jpg", True, False),
    ("Chocolate Mocha", 849, False, "/assets/cakes/chocolate-mousse.jpg", True, False),
    ("Chocolate Moist", 949, False, "/assets/cakes/chocolate-mousse.jpg", True, False),
    ("Chocolate Mud", 949, False, "/assets/cakes/chocolate-mousse.jpg", True, False),
    ("Vanilla + Chocolate", 949, False, "/assets/cakes/pound-cakes.jpg", False, False),
    ("Assorted Cake", 949, False, "/assets/cakes/pound-cakes.jpg", False, False),
    ("Vencho Cake", 949, False, "/assets/cakes/pound-cakes.jpg", False, False),
    ("Roshmalai Cake", 949, False, "/assets/cakes/roshmalai.jpg", True, True),
    ("Butterscotch", 949, False, "/assets/cakes/pound-cakes.jpg", False, False),
    ("Chocolate Brownie", 949, False, "/assets/cakes/chocolate-overloaded.jpg", True, False),
    ("Chocolate Mousse Cake", 999, False, "/assets/cakes/chocolate-mousse.jpg", True, True),
    ("Chocolate Indulgence Cake", 999, False, "/assets/cakes/chocolate-overloaded.jpg", True, False),
    ("Red Velvet", 1199, False, "/assets/cakes/red-velvet.jpg", True, True),
    ("Cheesecake", 1199, False, "/assets/cakes/cheesecakes.jpg", True, False),
    ("Basque Burnt Cheesecake", 1199, False, "/assets/cakes/basque-cheesecake.jpg", True, True),
    ("Chocolate Over Loaded Cake", 1999, True, "/assets/cakes/chocolate-overloaded.jpg", True, True),
]

OTHER_PRODUCTS = [
    ("cup-cakes", "Cupcake Vanilla", 39, "per piece", "/assets/cakes/cup-cakes.jpg", "Vanilla cupcake with whipped vanilla buttercream.", False),
    ("cup-cakes", "Cupcake Chocolate", 49, "per piece", "/assets/cakes/cup-cakes.jpg", "Rich dark chocolate cupcake with chocolate swirl.", True),
    ("pastry-cakes", "Pastry Cake Vanilla", 79, "per piece", "/assets/cakes/pastry-cakes.jpg", "Layered vanilla opera pastry slice.", False),
    ("pastry-cakes", "Pastry Cake Chocolate", 99, "per piece", "/assets/cakes/pastry-cakes.jpg", "Rich chocolate pastry slice.", True),
    ("jar-cakes", "Jar Cake Vanilla", 149, "per piece", "/assets/cakes/jar-cakes.jpg", "Layers of vanilla sponge, white chocolate & frosting in a jar.", False),
    ("jar-cakes", "Jar Cake Chocolate", 199, "per piece", "/assets/cakes/jar-cakes.jpg", "Fudge, chocolate chips, and sponge cake layered in a glass jar.", True),
    ("tab-cakes", "Tab Cake Vanilla", 279, "per piece", "/assets/cakes/tab-cakes.jpg", "Creamy vanilla tab cake with roasted nuts.", False),
    ("tab-cakes", "Tab Cake Chocolate", 349, "per piece", "/assets/cakes/tab-cakes.jpg", "Chocolate tab cake with ganache frosting.", True),
    ("lunch-box-cakes", "Lunch Box Cake Vanilla", 299, "per piece", "/assets/cakes/lunch-box-cakes.jpg", "Korean bento mini cake with pastel border piping.", True),
    ("lunch-box-cakes", "Lunch Box Cake Chocolate", 379, "per piece", "/assets/cakes/lunch-box-cakes.jpg", "Korean bento chocolate mini cake.", True),
    ("muffins", "Muffin Cake Vanilla", 499, "per box", "/assets/cakes/muffins.jpg", "Freshly baked golden blueberry & vanilla muffins (box of 4).", False),
    ("muffins", "Muffin Cake Chocolate", 599, "per box", "/assets/cakes/muffins.jpg", "Double chocolate chip bakery muffins (box of 4).", True),
    ("swiss-rolls", "Swiss Roll Vanilla", 599, "per box", "/assets/cakes/swiss-rolls.jpg", "Soft rolled sponge cake with light vanilla cream.", False),
    ("swiss-rolls", "Swiss Roll Chocolate", 699, "per box", "/assets/cakes/swiss-rolls.jpg", "Chocolate sponge cake rolled with rich fudge.", True),
    ("pound-slices", "Pound Slice Cake Vanilla", 399, "per piece", "/assets/cakes/pound-slices.jpg", "Thick cut slice of classic butter pound cake.", False),
    ("pound-slices", "Pound Slice Cake Chocolate", 499, "per piece", "/assets/cakes/pound-slices.jpg", "Thick cut slice of chocolate pound cake.", True),
    ("lava-cakes", "Lava Cake", 999, "per piece", "/assets/cakes/lava-cake.jpg", "Decadent warm molten dark chocolate lava cake.", True),
]

async def seed_database(db: AsyncSession):
    # Check if already seeded
    res = await db.execute(select(Category))
    if res.scalars().first():
        print("Database already seeded.")
        return

    print("Seeding Sweet Site Bakery database...")
    
    # 1. Admin Users
    sajia_admin = User(
        name="Sajia (Admin)",
        phone="01852668468",
        email="sajia@gmail.com",
        hashed_password=get_password_hash("sajia123"),
        role=UserRole.ADMIN.value,
        is_active=True,
        is_verified=True
    )
    db.add(sajia_admin)

    admin = User(
        name="Sweet Site Bakery Admin",
        phone="01700000000",
        email="admin@sweetsitebakery.com",
        hashed_password=get_password_hash("Admin@2026"),
        role=UserRole.ADMIN.value,
        is_active=True,
        is_verified=True
    )
    db.add(admin)

    # 2. Categories
    cat_map = {}
    for c in CATEGORIES_DATA:
        cat_obj = Category(**c)
        db.add(cat_obj)
        cat_map[c["slug"]] = cat_obj
    await db.flush()

    # 3. Pound Cakes
    for idx, (name, price, is_starting, img, is_choc, is_feat) in enumerate(POUND_CAKES, start=1):
        slug = slugify(name)
        desc = (
            f"Our most generous chocolate cake, loaded to order with truffles, brownies, and drip. Prices start at ৳{price:,}."
            if is_starting else
            f"{name} — a whole 1.5 pound artisanal cake, baked fresh to order in our Rangpur kitchen with homemade butter, Ever Whipped, and white chocolate frosting."
        )
        prod = Product(
            name=name if is_starting else f"{name} Cake",
            slug=slug if is_starting else f"{slug}-cake" if not slug.endswith("-cake") else slug,
            sku=f"SSB-PND-{idx:03d}",
            category_id=cat_map["pound-cakes"].id,
            short_description=f"Fresh 1.5 lb {name} cake baked with homemade butter in Rangpur.",
            description=desc,
            base_price=price,
            is_price_starting_from=is_starting,
            unit="1.5 pound",
            weight_grams=680,
            available_sizes=["1.5 pound", "2 pound", "3 pound", "Custom"],
            flavor=name,
            frosting="Homemade butter, Ever Whipped & white chocolate",
            ingredients="Flour, homemade butter, farm-fresh eggs, sugar, milk, Ever Whipped cream, white chocolate, natural flavor essence.",
            allergens="Eggs, Dairy, Wheat/Gluten",
            image_url=img,
            is_featured=is_feat,
            is_bestseller=is_feat or price > 900,
            is_new=name in ["Roshmalai Cake", "Basque Burnt Cheesecake", "Chocolate Over Loaded Cake"],
            rating_avg=4.9 if is_feat else 4.8,
            rating_count=24 if is_feat else 12
        )
        db.add(prod)

    # 4. Other Bakery Products
    for idx, (cat_slug, name, price, unit, img, desc, is_feat) in enumerate(OTHER_PRODUCTS, start=1):
        slug = slugify(name)
        prod = Product(
            name=name,
            slug=slug,
            sku=f"SSB-{cat_slug.upper()[:3]}-{idx:03d}",
            category_id=cat_map[cat_slug].id,
            short_description=desc,
            description=f"{name}, baked fresh to order in our Rangpur kitchen. Sold {unit}.",
            base_price=price,
            unit=unit,
            weight_grams=150 if "piece" in unit else 500,
            available_sizes=[unit],
            flavor="Chocolate" if "Chocolate" in name else "Vanilla",
            frosting="Homemade butter, Ever Whipped & white chocolate",
            image_url=img,
            is_featured=is_feat,
            is_bestseller=is_feat,
            rating_avg=4.8,
            rating_count=15
        )
        db.add(prod)

    # 5. Delivery Zones
    db.add(DeliveryZone(name="Rangpur City", description="All areas within Rangpur metropolitan city", delivery_fee=60, free_delivery_threshold=2500, estimated_delivery_time="Same Day / 2-4 Hours"))
    db.add(DeliveryZone(name="Outside Rangpur", description="Suburbs and neighboring upazilas around Rangpur", delivery_fee=150, free_delivery_threshold=4000, estimated_delivery_time="Scheduled Next-Day"))

    # 6. Delivery Slots
    for i, slot in enumerate(["Morning (10:00 AM - 1:00 PM)", "Afternoon (1:00 PM - 5:00 PM)", "Evening (5:00 PM - 9:00 PM)", "Any time"]):
        db.add(DeliverySlot(title=slot, sort_order=i))

    # 7. Customization Options
    custom_opts = [
        ("OCCASION", "Birthday", 0, None),
        ("OCCASION", "Anniversary", 0, None),
        ("OCCASION", "Wedding", 0, None),
        ("OCCASION", "Engagement", 0, None),
        ("OCCASION", "Baby Shower", 0, None),
        ("OCCASION", "Graduation", 0, None),
        ("OCCASION", "Just Because", 0, None),
        
        ("FROSTING", "Homemade Buttercream", 0, None),
        ("FROSTING", "Ever Whipped Cream", 0, None),
        ("FROSTING", "White Chocolate Frosting", 100, None),
        ("FROSTING", "Rich Chocolate Ganache", 150, None),
        
        ("DESIGN", "Minimal & Clean", 0, None),
        ("DESIGN", "Floral Blossom", 150, None),
        ("DESIGN", "Vintage Lambeth Piping", 200, None),
        ("DESIGN", "Theme & Character", 250, None),
        ("DESIGN", "From My Reference Photo", 200, None),
        
        ("COLOR", "Blush Pink", 0, "#F8D6E1"),
        ("COLOR", "Lavender", 0, "#EADCF3"),
        ("COLOR", "Ivory & Gold", 0, "#FDEFD9"),
        ("COLOR", "Chocolate", 0, "#4B2418"),
        ("COLOR", "Pastel Mix", 0, "#EFB9CC"),
        ("COLOR", "Pure White", 0, "#FFFFFF"),
        
        ("EXTRA", "Golden Birthday Candles", 50, None),
        ("EXTRA", "Custom Name Cake Topper", 150, None),
        ("EXTRA", "Gourmet Sprinkles & Pearls", 80, None),
        ("EXTRA", "Chocolate Drip", 100, None),
        ("EXTRA", "Fresh Berries & Fruit", 200, None),
    ]
    for cat, name, extra, hex_code in custom_opts:
        db.add(CustomizationOption(category=cat, name=name, extra_price=extra, color_hex=hex_code))

    # 8. Inventory Items
    inventory_seeds = [
        ("INV-FLR", "Special Cake Flour", "INGREDIENT", "kg", 150.0, 30.0, 95.0, "Rangpur Agro Mills"),
        ("INV-BTR", "Homemade Cultured Butter", "INGREDIENT", "kg", 80.0, 15.0, 850.0, "In-House Bakery Dairy"),
        ("INV-EGG", "Farm Fresh Organic Eggs", "INGREDIENT", "piece", 500.0, 100.0, 12.5, "Rangpur Organic Farms"),
        ("INV-EVR", "Ever Whipped Cream", "INGREDIENT", "liter", 60.0, 15.0, 380.0, "Ever Bake Supplies"),
        ("INV-WCH", "Belgian White Chocolate", "INGREDIENT", "kg", 45.0, 10.0, 1100.0, "Euro Dessert Imports"),
        ("INV-DCH", "Dark Chocolate Couverture", "INGREDIENT", "kg", 50.0, 12.0, 1200.0, "Euro Dessert Imports"),
        ("INV-BOX", "Luxury 1.5lb Cake Boxes", "PACKAGING", "piece", 300.0, 50.0, 45.0, "Rangpur Packaging Ltd"),
        ("INV-JAR", "Glass Dessert Jars with Lids", "PACKAGING", "piece", 200.0, 40.0, 30.0, "Eco Glass BD"),
    ]
    for sku, name, cat, unit, qty, reorder, cost, sup in inventory_seeds:
        db.add(InventoryItem(sku=sku, name=name, category=cat, unit=unit, quantity_on_hand=qty, reorder_level=reorder, cost_per_unit=cost, supplier_name=sup))

    # 9. Demo Coupon
    db.add(Coupon(code="SWEETLOVE", description="৳100 discount on orders over ৳799", discount_type="FIXED", discount_value=100, min_order_amount=799))
    db.add(Coupon(code="FIRSTBITE", description="10% discount on first cake order", discount_type="PERCENT", discount_value=10, min_order_amount=499, max_discount=250))

    # 10. FAQs
    faqs_data = [
        ("How do I place an order?", "Browse our shop or design your dream cake, add it to your cart, and proceed through checkout. You can also send the order directly to our WhatsApp (+880 1852-668468).", "Ordering"),
        ("Is there a minimum order?", "Yes, the initial minimum order amount is ৳499 across Rangpur.", "Ordering"),
        ("What size are the pound cakes?", "Listed prices are for a whole 1.5 pound cake. Larger sizes (2 lb, 3 lb, or tiered) can be customized upon request.", "Cakes"),
        ("Can I order a custom cake with my own reference photo?", "Yes! Use 'Create Your Dream Cake' or 'Have a design in mind?' to upload your photo or send it on WhatsApp.", "Customization"),
        ("What goes into your frosting?", "All our cakes are 100% royal & premium quality, crafted with homemade butter, Ever Whipped, and white chocolate frosting.", "Ingredients"),
        ("What payment methods do you accept?", "We accept Cash on Delivery (COD), bKash, Nagad, and direct bank transfers.", "Payment"),
        ("Do you deliver outside Rangpur city?", "Yes! We deliver across Rangpur City (৳60) and neighboring upazilas/outside Rangpur (৳150).", "Delivery"),
    ]
    for q, a, cat in faqs_data:
        db.add(FAQ(question=q, answer=a, category=cat))

    # 11. CMS Settings
    db.add(CMSSetting(key="ANNOUNCEMENT_BAR", value={"text": "Freshly baked with love in Rangpur ❤️", "is_active": True, "link": "#/shop"}))
    db.add(CMSSetting(key="MIN_ORDER_AMOUNT", value={"amount": 499}))
    db.add(CMSSetting(key="WHATSAPP_PHONE", value={"phone": "8801852668468", "call_phone": "+8801852668468"}))
    db.add(CMSSetting(key="QUALITY_STATEMENT", value={"text": "All cakes are 100% royal & premium quality + homemade butter, Ever Whipped and white chocolate frosting."}))

    await db.commit()
    print("Sweet Site Bakery database successfully seeded with 45+ official products, categories, zones, and settings!")

if __name__ == "__main__":
    async def main():
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        async with AsyncSessionLocal() as session:
            await seed_database(session)
    asyncio.run(main())
