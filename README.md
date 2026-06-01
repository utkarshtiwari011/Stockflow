<div align="center">

<img src="https://img.shields.io/badge/StockFlow-Inventory%20Management-4F46E5?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0yMSAxNlY4YTIgMiAwIDAgMC0xLTEuNzNsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzNsNyA0YTIgMiAwIDAgMCAyIDBsNy00QTIgMiAwIDAgMCAyMSAxNnoiPjwvcGF0aD48L3N2Zz4=" alt="StockFlow"/>

# StockFlow

### Production-Ready Inventory & Order Management System

*A full-stack enterprise application built with FastAPI, React, and PostgreSQL*

[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=flat-square&logo=docker&logoColor=white)](https://docker.com)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[🚀 Live Demo](https://stockflow-tawny-six.vercel.app) • 
[📖 API Docs](https://stockflow-backend-v6fk.onrender.com/docs) • 
[🐛 Report Bug](https://github.com/utkarshtiwari011/Stockflow/issues) • 
[✨ Request Feature](https://github.com/utkarshtiwari011/Stockflow/issues)

![StockFlow Dashboard Preview](https://via.placeholder.com/1200x600/4F46E5/ffffff?text=StockFlow+Dashboard+Preview)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Live Links](#live-links)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Quick Start with Docker](#quick-start-with-docker)
  - [Manual Setup](#manual-setup)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Docker Guide](#docker-guide)
- [Deployment](#deployment)
- [Business Logic](#business-logic)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

StockFlow is a **production-ready, fully containerized** Inventory & Order Management System designed for modern businesses. Built with a microservices-inspired architecture, it provides real-time inventory tracking, order processing, and business analytics through an intuitive dashboard.

> Built as a technical assessment demonstrating full-stack engineering, Docker containerization, and production deployment capabilities.

### Why StockFlow?
- ⚡ **Fast** — Async FastAPI backend handles thousands of requests
- 🔒 **Reliable** — Business logic prevents overselling and data inconsistency  
- 📦 **Containerized** — One command deployment with Docker Compose
- 🎨 **Premium UI** — Professional React dashboard with real-time updates

---

## 🔗 Live Links

- **GitHub repository** - [https://github.com/utkarshtiwari011/Stockflow](https://github.com/utkarshtiwari011/Stockflow)
- **Frontend deployment URL** - [https://stockflow-tawny-six.vercel.app](https://stockflow-tawny-six.vercel.app)
- **Backend API URL** - [https://stockflow-backend-v6fk.onrender.com](https://stockflow-backend-v6fk.onrender.com)
- **Docker Hub image link for the backend image** - [https://hub.docker.com/r/utkarshtiwari011/stockflow-backend](https://hub.docker.com/r/utkarshtiwari011/stockflow-backend)

---

## ✨ Features

### 📦 Product Management
- ✅ Create, Read, Update, Delete products
- ✅ Unique SKU enforcement
- ✅ Real-time stock level tracking
- ✅ Low stock alerts (threshold: ≤ 5 units)
- ✅ Stock status badges (Available / Low Stock / Out of Stock)

### 👥 Customer Management
- ✅ Complete customer directory
- ✅ Unique email validation
- ✅ Customer profile with contact details
- ✅ Order history per customer

### 🛒 Order Management
- ✅ Multi-product order creation
- ✅ Automatic stock deduction on order
- ✅ Stock restoration on order cancellation
- ✅ Auto-calculated order totals
- ✅ Order status tracking (Pending / Confirmed / Cancelled)
- ✅ Insufficient stock prevention

### 📊 Analytics Dashboard
- ✅ Real-time business metrics
- ✅ Total products, customers, orders, revenue
- ✅ Low stock alert panel
- ✅ Recent orders feed
- ✅ Sales performance chart

### 🔧 Technical Features
- ✅ RESTful API with OpenAPI/Swagger docs
- ✅ Async database operations (SQLAlchemy + asyncpg)
- ✅ Docker + Docker Compose orchestration
- ✅ CORS configuration
- ✅ Environment-based configuration
- ✅ Proper HTTP status codes throughout
- ✅ Request validation with Pydantic v2

---

## 🛠️ Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React | 18.3 | UI Framework |
| **Frontend** | Vite | 5.2 | Build Tool |
| **Frontend** | Tailwind CSS | 3.4 | Styling |
| **Frontend** | Recharts | 2.12 | Data Visualization |
| **Frontend** | React Router | 6.23 | Client Routing |
| **Frontend** | Axios | 1.7 | HTTP Client |
| **Frontend** | Lucide React | 0.378 | Icon Library |
| **Backend** | FastAPI | 0.111 | API Framework |
| **Backend** | Python | 3.11 | Language |
| **Backend** | SQLAlchemy | 2.0 | ORM |
| **Backend** | Pydantic v2 | 2.7 | Data Validation |
| **Backend** | Uvicorn | 0.29 | ASGI Server |
| **Database** | PostgreSQL | 16 | Primary Database |
| **Database** | asyncpg | 0.29 | Async DB Driver |
| **DevOps** | Docker | Latest | Containerization |
| **DevOps** | Docker Compose | v3.9 | Orchestration |
| **Deployment** | Render.com | - | Backend Hosting |
| **Deployment** | Vercel | - | Frontend Hosting |

---

## 🏗️ Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT BROWSER                        │
└─────────────────────────┬───────────────────────────────┘
                          │ HTTPS
┌─────────────────────────▼───────────────────────────────┐
│              REACT FRONTEND (Vercel/Nginx)               │
│                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │Dashboard │ │Products  │ │Customers │ │ Orders   │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
└─────────────────────────┬───────────────────────────────┘
                          │ REST API (JSON)
┌─────────────────────────▼───────────────────────────────┐
│           FASTAPI BACKEND (Render/Docker)                │
│                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │/products │ │/customers│ │ /orders  │ │/dashboard│  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │         SQLAlchemy ORM (Async)                     │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────┬───────────────────────────────┘
                          │ asyncpg
┌─────────────────────────▼───────────────────────────────┐
│              POSTGRESQL DATABASE                         │
│                                                          │
│   products │ customers │ orders │ order_items            │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure
```
stockflow/
├── 📁 backend/                    # FastAPI Application
│   ├── 📁 app/
│   │   ├── 📄 main.py             # App entry point, CORS, startup
│   │   ├── 📄 config.py           # Environment configuration
│   │   ├── 📄 database.py         # DB engine, session, base model
│   │   ├── 📁 models/             # SQLAlchemy ORM models
│   │   │   ├── 📄 product.py      # Product model
│   │   │   ├── 📄 customer.py     # Customer model
│   │   │   └── 📄 order.py        # Order + OrderItem models
│   │   ├── 📁 schemas/            # Pydantic v2 schemas
│   │   │   ├── 📄 product.py      # Product request/response
│   │   │   ├── 📄 customer.py     # Customer request/response
│   │   │   └── 📄 order.py        # Order request/response
│   │   ├── 📁 crud/               # Database operations
│   │   │   ├── 📄 product.py      # Product CRUD + validation
│   │   │   ├── 📄 customer.py     # Customer CRUD + validation
│   │   │   └── 📄 order.py        # Order CRUD + business logic
│   │   └── 📁 routers/            # API route handlers
│   │       ├── 📄 products.py     # /api/v1/products endpoints
│   │       ├── 📄 customers.py    # /api/v1/customers endpoints
│   │       ├── 📄 orders.py       # /api/v1/orders endpoints
│   │       └── 📄 dashboard.py    # /api/v1/dashboard/stats
│   ├── 📄 Dockerfile              # Backend container config
│   ├── 📄 requirements.txt        # Python dependencies
│   └── 📄 .env.example            # Backend env template
│
├── 📁 frontend/                   # React Application
│   ├── 📁 src/
│   │   ├── 📄 App.jsx             # Routes + providers
│   │   ├── 📄 main.jsx            # React entry point
│   │   ├── 📄 index.css           # Global styles + CSS vars
│   │   ├── 📁 api/                # Axios API layer
│   │   │   ├── 📄 axios.js        # Axios instance + interceptors
│   │   │   ├── 📄 products.js     # Products API calls
│   │   │   ├── 📄 customers.js    # Customers API calls
│   │   │   ├── 📄 orders.js       # Orders API calls
│   │   │   └── 📄 dashboard.js    # Dashboard API calls
│   │   ├── 📁 context/            # Global state
│   │   │   └── 📄 AppContext.jsx  # useReducer state management
│   │   ├── 📁 hooks/              # Custom React hooks
│   │   │   ├── 📄 useProducts.js  # Product operations + toasts
│   │   │   ├── 📄 useCustomers.js # Customer operations + toasts
│   │   │   └── 📄 useOrders.js    # Order operations + toasts
│   │   ├── 📁 components/
│   │   │   ├── 📁 layout/         # App shell components
│   │   │   │   ├── 📄 Sidebar.jsx
│   │   │   │   ├── 📄 Topbar.jsx
│   │   │   │   └── 📄 Layout.jsx
│   │   │   ├── 📁 ui/             # Reusable UI primitives
│   │   │   │   ├── 📄 Button.jsx
│   │   │   │   ├── 📄 Input.jsx
│   │   │   │   ├── 📄 Modal.jsx
│   │   │   │   ├── 📄 Table.jsx
│   │   │   │   ├── 📄 Badge.jsx
│   │   │   │   ├── 📄 Card.jsx
│   │   │   │   ├── 📄 Spinner.jsx
│   │   │   │   ├── 📄 StatCard.jsx
│   │   │   │   ├── 📄 EmptyState.jsx
│   │   │   │   └── 📄 ConfirmDialog.jsx
│   │   │   ├── 📁 products/
│   │   │   │   ├── 📄 ProductTable.jsx
│   │   │   │   └── 📄 ProductForm.jsx
│   │   │   ├── 📁 customers/
│   │   │   │   ├── 📄 CustomerTable.jsx
│   │   │   │   └── 📄 CustomerForm.jsx
│   │   │   └── 📁 orders/
│   │   │       ├── 📄 OrderTable.jsx
│   │   │       ├── 📄 OrderForm.jsx
│   │   │       └── 📄 OrderDetail.jsx
│   │   └── 📁 pages/
│   │       ├── 📄 Dashboard.jsx
│   │       ├── 📄 Products.jsx
│   │       ├── 📄 Customers.jsx
│   │       ├── 📄 Orders.jsx
│   │       └── 📄 NotFound.jsx
│   ├── 📄 Dockerfile              # Multi-stage build
│   ├── 📄 nginx.conf              # Nginx SPA config
│   ├── 📄 vite.config.js
│   ├── 📄 tailwind.config.js
│   └── 📄 package.json
│
├── 📄 docker-compose.yml          # Development orchestration
├── 📄 docker-compose.prod.yml     # Production orchestration
├── 📄 .env.example                # Root env template
└── 📄 README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

| Tool | Version | Download |
|------|---------|----------|
| Docker Desktop | Latest | [docker.com](https://docker.com) |
| Git | Latest | [git-scm.com](https://git-scm.com) |
| Node.js *(optional)* | 20+ | [nodejs.org](https://nodejs.org) |
| Python *(optional)* | 3.11+ | [python.org](https://python.org) |

---

### ⚡ Quick Start with Docker

**1. Clone the repository**
```bash
git clone https://github.com/utkarshtiwari011/Stockflow.git
cd Stockflow
```

**2. Set up environment variables**
```bash
cp .env.example .env
```

**3. Start all services**
```bash
docker compose up --build
```

**4. Access the application**

| Service | URL |
|---------|-----|
| 🌐 Frontend Dashboard | http://localhost:3000 |
| ⚡ Backend API | http://localhost:8000 |
| 📖 Swagger API Docs | http://localhost:8000/docs |
| 🗄️ PostgreSQL | localhost:5432 |

> ⏱️ First build takes 3-5 minutes. Subsequent starts are instant.

---

### 🔧 Manual Setup (Without Docker)

<details>
<summary>Click to expand manual setup guide</summary>

#### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# Run the server
uvicorn app.main:app --reload --port 8000
```

#### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit VITE_API_URL if needed

# Start development server
npm run dev
```

#### Database Setup

```bash
# Make sure PostgreSQL is running
# Create database
psql -U postgres -c "CREATE DATABASE stockflow;"
psql -U postgres -c "CREATE USER stockflow WITH PASSWORD 'stockflow123';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE stockflow TO stockflow;"
```

</details>

---

## 📡 API Documentation

Base URL: `http://localhost:8000/api/v1`

> 📖 Full interactive docs available at: `http://localhost:8000/docs`

### Products Endpoints

| Method | Endpoint | Description | Status Code |
|--------|----------|-------------|-------------|
| `GET` | `/products` | List all products | 200 |
| `POST` | `/products` | Create new product | 201 |
| `GET` | `/products/{id}` | Get product by ID | 200 |
| `PUT` | `/products/{id}` | Update product | 200 |
| `DELETE` | `/products/{id}` | Delete product | 204 |

**Create Product — Request Body:**
```json
{
  "name": "MacBook Pro M3",
  "sku": "APL-MBP-M3",
  "description": "Apple MacBook Pro with M3 chip",
  "price": 1999.99,
  "quantity": 25
}
```

**Product Response:**
```json
{
  "id": 1,
  "name": "MacBook Pro M3",
  "sku": "APL-MBP-M3",
  "description": "Apple MacBook Pro with M3 chip",
  "price": 1999.99,
  "quantity": 25,
  "created_at": "2026-06-01T10:00:00",
  "updated_at": "2026-06-01T10:00:00"
}
```

### Customers Endpoints

| Method | Endpoint | Description | Status Code |
|--------|----------|-------------|-------------|
| `GET` | `/customers` | List all customers | 200 |
| `POST` | `/customers` | Create new customer | 201 |
| `GET` | `/customers/{id}` | Get customer by ID | 200 |
| `DELETE` | `/customers/{id}` | Delete customer | 204 |

**Create Customer — Request Body:**
```json
{
  "full_name": "John Smith",
  "email": "john.smith@company.com",
  "phone": "+1 555 123-4567"
}
```

### Orders Endpoints

| Method | Endpoint | Description | Status Code |
|--------|----------|-------------|-------------|
| `GET` | `/orders` | List all orders | 200 |
| `POST` | `/orders` | Create new order | 201 |
| `GET` | `/orders/{id}` | Get order details | 200 |
| `DELETE` | `/orders/{id}` | Cancel/Delete order | 204 |

**Create Order — Request Body:**
```json
{
  "customer_id": 1,
  "items": [
    {"product_id": 1, "quantity": 2},
    {"product_id": 3, "quantity": 1}
  ]
}
```

**Order Response:**
```json
{
  "id": 1,
  "customer_id": 1,
  "customer_name": "John Smith",
  "status": "confirmed",
  "total_amount": 4148.97,
  "created_at": "2026-06-01T10:00:00",
  "items": [
    {
      "id": 1,
      "product_id": 1,
      "product_name": "MacBook Pro M3",
      "quantity": 2,
      "unit_price": 1999.99,
      "subtotal": 3999.98
    }
  ]
}
```

### Dashboard Endpoint

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/dashboard/stats` | Get business metrics |

**Response:**
```json
{
  "total_products": 12,
  "total_customers": 8,
  "total_orders": 24,
  "total_revenue": 48750.50,
  "low_stock_products": [
    {"id": 2, "name": "Keychron Q1 Max", 
     "sku": "KCR-Q1M-KB", "quantity": 4}
  ],
  "recent_orders": [...]
}
```

---

## ⚙️ Environment Variables

### Root `.env`

| Variable | Description | Example |
|----------|-------------|---------|
| `POSTGRES_USER` | Database username | `stockflow` |
| `POSTGRES_PASSWORD` | Database password | `securepassword` |
| `POSTGRES_DB` | Database name | `stockflow` |
| `DATABASE_URL` | Full connection string | `postgresql+asyncpg://...` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:3000` |
| `VITE_API_URL` | Frontend API base URL | `http://localhost:8000/api/v1` |

### Backend `.env`

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL async URL | Required |
| `ALLOWED_ORIGINS` | Comma-separated origins | Required |
| `APP_ENV` | Environment mode | `development` |

### Frontend `.env`

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8000/api/v1` |

---

## 🐳 Docker Guide

### Development

```bash
# Build and start all services
docker compose up --build

# Start in background
docker compose up -d

# View logs
docker compose logs -f

# View specific service logs
docker compose logs -f backend

# Stop all services
docker compose down

# Stop and remove volumes (reset database)
docker compose down -v

# Rebuild single service
docker compose build backend
docker compose up -d backend
```

### Production

```bash
# Use production compose file
docker compose -f docker-compose.prod.yml up -d

# Push backend to Docker Hub
docker build -t yourusername/stockflow-backend ./backend
docker push yourusername/stockflow-backend:latest
```

### Services Overview

| Service | Image | Port | Description |
|---------|-------|------|-------------|
| `db` | postgres:16-alpine | 5432 | PostgreSQL database |
| `backend` | custom/python:3.11 | 8000 | FastAPI application |
| `frontend` | custom/nginx:alpine | 3000 | React + Nginx |

---

## 🌐 Deployment

### Backend → Render.com

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repository
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add PostgreSQL database on Render
6. Set environment variables:
   - `DATABASE_URL` → from Render PostgreSQL (using `postgresql+asyncpg://`)
   - `ALLOWED_ORIGINS` → your Vercel URL
   - `PYTHON_VERSION` → `3.11.9`
7. Deploy ✅

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository
3. Configure:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Set environment variable:
   - `VITE_API_URL` → your Render backend URL + `/api/v1`
5. Deploy ✅

### Docker Hub

```bash
# Tag and push backend image
docker build -t utkarshtiwari011/stockflow-backend:latest ./backend
docker push utkarshtiwari011/stockflow-backend:latest

# Tag and push frontend image  
docker build -t utkarshtiwari011/stockflow-frontend:latest ./frontend
docker push utkarshtiwari011/stockflow-frontend:latest
```

---

## 💼 Business Logic

### Inventory Management Rules

| Rule | Implementation |
|------|---------------|
| **SKU Uniqueness** | 400 error if duplicate SKU on create/update |
| **Email Uniqueness** | 400 error if email already registered |
| **Non-negative Stock** | Pydantic validation: `quantity >= 0` |
| **Stock Validation** | Order fails if quantity > available stock |
| **Auto Stock Deduction** | Stock reduced atomically on order creation |
| **Stock Restoration** | Stock restored when order is deleted/cancelled |
| **Auto Total Calculation** | `total = Σ(quantity × unit_price)` per item |
| **Price Snapshot** | Unit price captured at order time, not product current price |

### Error Handling

| Scenario | HTTP Code | Message |
|----------|-----------|---------|
| Resource not found | 404 | `"Product not found"` |
| Duplicate SKU | 400 | `"SKU already exists"` |
| Duplicate email | 400 | `"Email already registered"` |
| Insufficient stock | 400 | `"Insufficient stock for 'Product Name'"` |
| Invalid data | 422 | Pydantic validation details |
| Server error | 500 | `"Internal server error"` |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨💻 Author

**Utkarsh Tiwari**

[![GitHub](https://img.shields.io/badge/GitHub-utkarshtiwari011-181717?style=flat-square&logo=github)](https://github.com/utkarshtiwari011)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/utkarshtiwari011)

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

*Built with ❤️ by Utkarsh Tiwari*

</div>
