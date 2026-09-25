# 🎂 Sweet Site Bakery — Enterprise E-Commerce Platform

[![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20TypeScript%20%7C%20Vite%20%7C%20TailwindCSS-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python%203.11+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![SQLAlchemy](https://img.shields.io/badge/ORM-SQLAlchemy%202.0%20%7C%20PostgreSQL%20%7C%20SQLite-D71F00?logo=sqlite&logoColor=white)](https://www.sqlalchemy.org/)
[![Docker](https://img.shields.io/badge/DevOps-Docker%20Compose%20%7C%20Nginx-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Location](https://img.shields.io/badge/Location-Rangpur%2C%20Bangladesh-006A4E)](https://maps.google.com/?q=Rangpur+Bangladesh)

> **"Love at first bite. Made to melt Hearts."**  
> *"Where every cake is a vibe. Aesthetic bakes, unforgettable tastes. Made fresh, made for YOU. 🎂✨"*  
> **Quality Promise:** *All cakes are 100% royal & premium quality + homemade butter, Ever Whipped and white chocolate frosting.*

---

## 📖 Table of Contents
1. [Business & Brand Profile](#-business--brand-profile)
2. [Key Capabilities & Features](#-key-capabilities--features)
3. [Official Product Catalog & BDT Pricing Matrix](#-official-product-catalog--bdt-pricing-matrix)
4. [System Architecture](#-system-architecture)
5. [Tech Stack](#-tech-stack)
6. [Getting Started (Local Development)](#-getting-started-local-development)
   - [Prerequisites](#prerequisites)
   - [Backend Setup (FastAPI)](#backend-setup-fastapi)
   - [Frontend Setup (React + Vite)](#frontend-setup-react--vite)
   - [One-Command Docker Deployment](#one-command-docker-deployment)
7. [API Endpoints Reference](#-api-endpoints-reference)
8. [Admin Dashboard & Store Operations](#-admin-dashboard--store-operations)
9. [Payment & Delivery Logistics (Rangpur, BD)](#-payment--delivery-logistics-rangpur-bd)

---

## 🌟 Business & Brand Profile

- **Brand Name:** Sweet Site Bakery
- **Headquarters:** Rangpur City, Bangladesh
- **Direct Hotline & WhatsApp:** `+880 1852-668468`
- **Minimum Order Requirement:** ৳499 (enforced on both client and API validation layers)
- **Primary Color Palette:**
  - Deep Chocolate Brown: `#3B1A10`
  - Soft Lavender: `#C9A8DB`
  - Warm Golden Yellow: `#F2A516`
  - Cream Background: `#FFF8F3`
  - Blush Accent: `#F8D6E1`
  - WhatsApp Green: `#1F7A4A`
- **Typography:** *Cormorant Garamond* (Royal Display Headings) & *Inter* (Clean Body Text).

---

## 🚀 Key Capabilities & Features

### 🛍️ Customer Experience (Storefront)
- **Royal Hero & Brand Showcase:** High-fidelity hero showcase featuring the official slogan and copyright-free generated bakery photography.
- **28 Signature Pound Cake Catalog + 17 Bakery Items:** Filter by category, price slider, and live instant search with debounced querying.
- **Interactive 6-Step Custom Dream Cake Studio:**
  1. *Sponge Selection* (Belgian Dark Chocolate, French Vanilla, Red Velvet, Roshmalai, Lotus Biscoff, Pistachio Rose).
  2. *Frosting Selection* (White Chocolate Truffle, Ever-Whipped Silk, Nutella Ganache, Salted Butter Caramel, Cream Cheese).
  3. *Size & Tiers* (1 Lb to 4 Lb 2-Tier options with serving calculations).
  4. *Aesthetic Theme & Colors* (Pastel Lavender, Golden Royalty, Korean Bento, Romantic Crimson, Botanical Pearl).
  5. *Toppings & Add-ons* (24K Edible Gold Leaf, Ferrero Crown, Fresh Berries, Macarons, Sparkler Candles).
  6. *Live Dynamic Quote Calculator & Reference Photo Uploader*.
- **QuickView Modal & Direct WhatsApp Ordering:** Order instantly with pre-formatted WhatsApp messages containing items, weight, quantities, and custom inscriptions.
- **Cart Slide-Over Drawer:** Real-time ৳499 minimum order progress bar, coupon code engine (`SWEET10`, `WELCOME50`), and weight breakdown.
- **Rangpur Local Checkout:** Zone-based shipping (Dhap, Medical Mor, Jahaj Company, RK Road, Modern Mor, Lalbagh), date/time slot picker, and Bangladesh mobile number validation (`+880` / `01XXXXXXXXX`).
- **8-Stage Live Order Tracker:** Visual tracking from *Order Received* ➔ *Confirmed* ➔ *Baking in Oven* ➔ *Piping & Frosting* ➔ *Quality Inspection* ➔ *Out for Delivery* ➔ *Delivered*, plus printable digital invoices.
- **Customer Portal:** Member profile, past order history, re-order shortcuts, and digital receipts.

### 🛡️ SaaS Admin Dashboard & Kitchen Operations
- **Real-Time KPIs:** Today's revenue, active kitchen orders, catalog totals, and butter/cream ingredient inventory health.
- **Order State Machine:** Move orders through baking, piping, and dispatch stages.
- **Product Catalog CRUD:** Live price editor, stock adjustments, bestseller tagging.
- **Raw Ingredient Tracker:** Manage stocks of homemade butter, Belgian cocoa, Ever-Whipped cream, and gold leaf sheets.
- **Store CMS Configurator:** Modify top announcement banners, hotline numbers, and festival promotions.

---

## 📋 Official Product Catalog & BDT Pricing Matrix

### 28 Signature Pound Cake Flavours
| ID | Flavour Name | Base Price (1 Lb) | ID | Flavour Name | Base Price (1 Lb) |
|---|---|---|---|---|---|
| 1 | Standard Vanilla / Orange Pound Cake | **৳599** | 15 | Strawberry / Blueberry Pound Cake | **৳900** |
| 2 | Pure Butter / Tutti Frutti Pound Cake | **৳650** | 16 | Lemon / Mango / Pineapple Pound Cake | **৳900** |
| 3 | Chocolate / Marble Pound Cake | **৳700** | 17 | Roshmalai Cake | **৳950** |
| 4 | Lemon Pound Cake | **৳700** | 18 | Pistachio Cardamom Pound Cake | **৳950** |
| 5 | Coconut / Coffee Pound Cake | **৳750** | 19 | Red Velvet Cake | **৳950** |
| 6 | Red Velvet Pound Cake | **৳750** | 20 | Tiramisu Pound Cake | **৳950** |
| 7 | Mixed Nut / Dry Fruit Pound Cake | **৳800** | 21 | Basque Burnt Cheesecake | **৳1,050** |
| 8 | Pineapple / Mango Pound Cake | **৳800** | 22 | Lotus Biscoff Pound Cake | **৳1,100** |
| 9 | Blueberry / Strawberry Pound Cake | **৳850** | 23 | Nutella Hazelnut Pound Cake | **৳1,100** |
| 10 | Banana Walnut Pound Cake | **৳850** | 24 | Ferrero Rocher Luxury Pound Cake | **৳1,200** |
| 11 | Caramel / Dulce de Leche Pound Cake | **৳850** | 25 | Mango Mousse Pound Cake | **৳1,200** |
| 12 | Chocolate Chip Pound Cake | **৳850** | 26 | Strawberry Mousse Pound Cake | **৳1,200** |
| 13 | Vanilla Birthday Cake | **৳850** | 27 | Chocolate Mousse Luxury Pound Cake | **৳1,250** |
| 14 | Chocolate Truffle Cake | **৳900** | 28 | **Chocolate Over Loaded Cake (Royal Signature)** | **৳1,999** |

### 17 Artisanal Bakery Items
| Item Name | Category | Unit Price |
|---|---|---|
| Korean Bento Lunch Box Cake | `lunch_box_cake` | **৳380** |
| Bento Lunch Box Cake (2-pack gift box) | `lunch_box_cake` | **৳720** |
| Premium Vanilla Bean Cupcake | `cupcakes` | **৳120** |
| Belgian Chocolate Fudge Cupcake | `cupcakes` | **৳140** |
| Red Velvet & Cream Cheese Cupcake | `cupcakes` | **৳150** |
| Gourmet Cupcakes Assorted Box (6 pcs) | `cupcakes` | **৳750** |
| Belgian Chocolate Jar Cake | `jar_cake` | **৳180** |
| Red Velvet & White Chocolate Jar Cake | `jar_cake` | **৳190** |
| Roshmalai Kheer Jar Cake | `jar_cake` | **৳210** |
| Lotus Biscoff Crunch Jar Cake | `jar_cake` | **৳230** |
| Tab Cake - Chocolate Mud Dream Box | `tab_cake` | **৳320** |
| Tab Cake - Tiramisu Espresso Box | `tab_cake` | **৳350** |
| Royal Basque Burnt Cheesecake Slice | `cheesecake` | **৳220** |
| Black Forest Pastry Slice | `pastry_slices` | **৳140** |
| Molten Chocolate Lava Cake | `lava_cake` | **৳180** |
| Gourmet Blueberry Crumble Muffin | `muffins` | **৳110** |
| Swiss Roll Slices Box (4 pcs) | `swiss_rolls` | **৳280** |

---

## 🏛️ System Architecture

```
d:\sweet-site-bakery\
├── backend/
│   ├── app/
│   │   ├── core/           # Config, Database Engine, JWT Security
│   │   ├── models/         # User, Product, Customization, Order, Inventory, CMS
│   │   ├── schemas/        # Pydantic validation schemas
│   │   ├── api/v1/         # REST API route endpoints
│   │   ├── seed/           # Official catalog seeder script
│   │   └── main.py         # FastAPI App Entrypoint & Middleware
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── public/assets/cakes/# High-res copyright-free bakery photography
│   ├── src/
│   │   ├── components/     # Layout, Navbar, Footer, FloatingWhatsApp, MobileNav, ProductCard
│   │   ├── features/       # Home, Shop, ProductDetail, CustomStudio, Checkout, Tracker, Admin
│   │   ├── store/          # Zustand CartStore & AuthStore
│   │   ├── services/       # Axios API client with resilient fallbacks
│   │   ├── types/          # TypeScript interfaces
│   │   ├── App.tsx         # BrowserRouter & Route Mapping
│   │   └── main.tsx        # React 18 Entrypoint
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── Dockerfile
├── nginx/
│   └── nginx.conf          # Reverse proxy routing /api to backend and / to frontend
├── docker-compose.yml       # Production-ready multi-container orchestration
└── README.md
```

---

## 💻 Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Zustand (State Management), Axios.
- **Backend:** Python 3.11+, FastAPI (Async), SQLAlchemy 2.0 ORM, Pydantic v2, Passlib (Bcrypt), Python-Jose (JWT).
- **Database:** PostgreSQL (Production Docker) / SQLite (Zero-config local mode).
- **DevOps:** Docker, Docker Compose, Nginx Reverse Proxy with Gzip compression and browser caching.

---

## 🛠️ Getting Started (Local Development)

### Prerequisites
- Node.js (v18+) & `npm`
- Python 3.10+ & `pip`
- Git

### Backend Setup (FastAPI)
```bash
# 1. Navigate to backend directory
cd backend

# 2. Create and activate virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# 3. Install backend dependencies
pip install -r requirements.txt

# 4. Seed database with the official 45+ catalog and admin user
python -m app.seed.seed_data

# 5. Start development API server
uvicorn app.main:app --reload --port 8000
```
> The interactive Swagger API Docs will be live at: `http://localhost:8000/docs`

### Frontend Setup (React + Vite)
```bash
# 1. Open a new terminal and navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Launch Vite development server
npm run dev
```
> The storefront will be accessible at: `http://localhost:5173`

---

### 🐳 One-Command Docker Deployment

To launch the full production stack (Frontend + Backend + PostgreSQL + Nginx reverse proxy):
```bash
docker-compose up --build -d
```
- **Storefront & App:** `http://localhost`
- **Backend API Docs:** `http://localhost/docs` or `http://localhost:8000/docs`

---

## 🔑 Admin Credentials (Pre-Seeded)

- **Admin Portal URL:** `http://localhost:5173/admin` (or via Account ➔ Admin Dashboard)
- **Admin Email:** `admin@sweetsite.com`
- **Admin Password:** `admin123`

---

## 📦 Payment & Delivery Logistics (Rangpur, BD)

1. **Rangpur City Zones Covered:**
   - Dhap / Medical Mor (৳60)
   - Central Rangpur / Jahaj Company Mor (৳60)
   - RK Road / Bus Terminal (৳70)
   - Modern Mor / Lalbagh (৳70)
   - Carmichael College / Station (৳80)
   - Outer Suburbs (৳100)
2. **Accepted Payment Channels:**
   - Cash on Delivery (COD)
   - bKash Send Money: `+880 1852-668468`
   - Nagad Send Money: `+880 1852-668468`
   - SSLCOMMERZ Payment Gateway ready.

---

## 📄 License & Attribution

All custom photographic assets and code were handcrafted for **Sweet Site Bakery (Rangpur, Bangladesh)**.  
*Copyright © 2026 Sweet Site Bakery. All Rights Reserved.*
