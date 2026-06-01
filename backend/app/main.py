from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from app.config import settings
from app.database import create_tables
from app.routers import products, customers, orders, dashboard

app = FastAPI(
    title="StockFlow API",
    version="1.0.0",
    description="Inventory & Order Management System API"
)

# CORS Configuration
origins = settings.ALLOWED_ORIGINS.split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup DB Event
@app.on_event("startup")
async def startup_event():
    await create_tables()

# Include Routers
app.include_router(products.router, prefix="/api/v1")
app.include_router(customers.router, prefix="/api/v1")
app.include_router(orders.router, prefix="/api/v1")
app.include_router(dashboard.router, prefix="/api/v1")

# Global request validation exception handler
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    # Format a clean error string from Pydantic validations
    formatted_errors = []
    for err in errors:
        loc = " -> ".join(str(l) for l in err.get("loc", []))
        msg = err.get("msg", "Invalid value")
        formatted_errors.append(f"[{loc}]: {msg}")
    
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": ", ".join(formatted_errors)}
    )

@app.get("/")
async def root():
    return {
        "status": "healthy",
        "service": "StockFlow API",
        "version": "1.0.0"
    }

@app.get("/health")
async def health():
    return {"status": "ok"}
