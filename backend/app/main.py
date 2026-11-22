from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.models import LANGUAGE_META
from app.routers.analyze import router as receipts_router

app = FastAPI(
    title="Receipt Reader API",
    version="0.1.0",
    description=(
        "Mock-backed receipt analysis API. Real OCR can be wired in through the analyzer interface."
    ),
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(receipts_router, prefix="/api")


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "analyzer": settings.analyzer}


@app.get("/api/languages")
def languages() -> list[dict[str, str]]:
    return LANGUAGE_META
