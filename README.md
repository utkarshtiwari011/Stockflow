# 📦 StockFlow: Inventory & Order Management System

StockFlow is a premium, professional-grade, full-stack Inventory & Order Management System built with a dark-first SaaS startup aesthetic. It combines a robust, transaction-safe asynchronous Python backend with a high-fidelity, highly interactive React dashboard.

---

## 🏗️ Architecture Design (ASCII)

```
                       +----------------------------------+
                       |        React Client (Vite)       |
                       |       Port 3000 (Nginx/HMR)      |
                       +----------------+-----------------+
                                        |
                                        | HTTP Requests
                                        v
                       +----------------------------------+
                       |         FastAPI Gateway          |
                       |            Port 8000             |
                       +-------+----------------+---------+
                               |                |
                CRUD Queries   |                |  CRUD Queries
                               v                v
                       +-------+---+        +---+---------+
                       | Products  |        |  Customers  |
                       +-------+---+        +---+---------+
                               |                |
                               +-------+--------+
                                       |
                                       v Atomic Transactions
                               +-------+---+
                               |  Orders   |
                               +-------+---+
                                       |
                                       v
                       +---------------+------------------+
                       |       PostgreSQL Database        |
                       |            Port 5432             |
                       +----------------------------------+
```

---

## ✨ Features

- **Robust Dashboard Analytics**: Multi-metric KPI cards, interactive sales charts using `Recharts`, and instant warnings for low stock levels.
- **Dynamic Checkouts**: Multi-line dynamic order sheet with auto product dropdown lookups, instant stock alerts, and backend total calculations.
- **Strict Integrity Controls**: SKU uniqueness checks, customer e-mail validation, and atomic database checkouts preventing inventory inconsistencies.
- **Inventory Restoration**: Automated stock recovery when cancelling or deleting active orders.
- **Micro-Animations**: Pulsing alerts, scale button triggers, smooth transition list cells, and frosted blur overlays.
- **SaaS Dark Mode Design**: Using curated palettes, custom Google Font integration (`Syne` for headings, `DM Sans` for body), and custom thin scrollbars.
- **Dockerized Packaging**: Unified dev configurations supporting hot-reload HMR overlays.

---

## 🏗️ Tech Stack

- **Backend**: Python 3.12, FastAPI, SQLAlchemy 2.0 (Async), asyncpg, Pydantic v2
- **Frontend**: React 18, Vite, Tailwind CSS, Axios, Lucide React, Recharts, React Hot Toast
- **Database**: PostgreSQL 16
- **Deployment**: Docker, Docker Compose, Nginx (frontend server)

---

## ⚙️ Environment Variables Config

Create a `.env` file at the root or within sub-folders following this format:

| Key | Description | Default Development Value |
| :--- | :--- | :--- |
| `POSTGRES_USER` | Postgres database user | `stockflow` |
| `POSTGRES_PASSWORD` | Postgres database password | `stockflow123` |
| `POSTGRES_DB` | Postgres database name | `stockflow` |
| `DATABASE_URL` | SQLAlchemy Asyncpg Connection URI | `postgresql+asyncpg://stockflow:stockflow123@db:5432/stockflow` |
| `ALLOWED_ORIGINS` | CORS comma-separated origins | `http://localhost:5173,http://localhost:3000` |
| `VITE_API_URL` | Frontend client gateway backend | `http://localhost:8000/api/v1` |
| `APP_ENV` | Running environment mode | `development` |

---

## 🚀 Quickstart: Local Development

### Option A: Using Docker Compose (Recommended)

1. Make sure you have Docker and Docker Compose installed.
2. Spin up the dev stack with live reload:
   ```bash
   docker compose up --build
   ```
3. Once running, access the local environments:
   - **Frontend Dashboard**: `http://localhost:3000`
   - **FastAPI API Swagger UI**: `http://localhost:8000/docs`
   - **Postgres Database**: `localhost:5432`

### Option B: Running Manually from Scratch

#### 1. Database Setup
Ensure you have a PostgreSQL server running with a database named `stockflow`.

#### 2. Backend Setup
1. Navigate into the backend folder:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Unix/macOS:
   source venv/bin/activate
   ```
3. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file from the example:
   ```bash
   copy .env.example .env
   ```
5. Spin up the Uvicorn dev server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

#### 3. Frontend Setup
1. Navigate into the frontend folder:
   ```bash
   cd frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```bash
   copy .env.example .env
   ```
4. Start the Vite dev server:
   ```bash
   npm run dev
   ```
5. Access the app in your browser at `http://localhost:5173`.

---

## 📡 API Reference Documentation

### Products API (`/api/v1/products`)

- **GET `/products`**: Paginated listing of products.
  - Query: `skip=0&limit=100`
- **POST `/products`**: Registers a product. SKU must be unique.
  - Request Body:
    ```json
    {
      "name": "Industrial Widget",
      "sku": "WGT-IND-01",
      "description": "Standard heavy duty industrial widget",
      "price": 19.99,
      "quantity": 100
    }
    ```
- **GET `/products/{id}`**: Detailed product view.
- **PUT `/products/{id}`**: Partial update of description, price, quantity, etc.
- **DELETE `/products/{id}`**: Deletes the product.

### Customers API (`/api/v1/customers`)

- **GET `/customers`**: Registry listing.
- **POST `/customers`**: Register customer profile. Email must be unique.
  - Request Body:
    ```json
    {
      "full_name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "+123456789"
    }
    ```
- **DELETE `/customers/{id}`**: Removes the customer.

### Orders API (`/api/v1/orders`)

- **GET `/orders`**: Active order listings.
- **POST `/orders`**: Transaction-safe checkout validation.
  - Request Body:
    ```json
    {
      "customer_id": 1,
      "items": [
        { "product_id": 1, "quantity": 5 }
      ]
    }
    ```
- **DELETE `/orders/{id}`**: Cancels the order, cascades deletions to item snap shots, and restores product inventory levels.

### Dashboard Stats API (`/api/v1/dashboard/stats`)

- **GET `/dashboard/stats`**: Compiles metrics, low-stock notifications, and recent orders inside a single payload.

---

## 🚀 Deployment Guide

### Backend Server Deployment (Render.com)

1. Push the `backend/` directory to a GitHub repository.
2. Register a new Web Service on Render linked to your repository.
3. Configure the following build/start settings:
   - **Environment**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Spin up a Managed PostgreSQL instance on Render, copy its internal connection URL, and define the `DATABASE_URL` environment variable inside your Web Service settings.
5. Set `ALLOWED_ORIGINS` to point to your hosted frontend URL.

### Frontend Client Deployment (Vercel)

1. Connect Vercel to your GitHub repository.
2. Select the `frontend` folder as the root directory of your project.
3. Set Vercel's build parameters:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Define the `VITE_API_URL` environment variable pointing to your hosted Render backend (e.g. `https://your-backend.onrender.com/api/v1`).
5. Trigger Vercel deploy.

---

## 🐳 Docker Hub Push Mappings

To tag and upload backend/frontend images to Docker Hub:

```bash
# Backend Build & Push
docker build -t yourusername/stockflow-backend ./backend
docker push yourusername/stockflow-backend

# Frontend Build & Push
docker build --build-arg VITE_API_URL=https://your-api.com/api/v1 -t yourusername/stockflow-frontend ./frontend
docker push yourusername/stockflow-frontend
```

---

## 🔒 License
StockFlow is open-source software licensed under the MIT License.
