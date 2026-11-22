from __future__ import annotations

from functools import lru_cache
from time import perf_counter
from typing import Annotated, cast

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile

from app.config import settings
from app.models import (
    LANGUAGE_CODES,
    AnalyzeMeta,
    AnalyzeResponse,
    LanguageCode,
    Receipt,
)
from app.services.analyzer import ReceiptAnalyzer
from app.services.mock_analyzer import MockReceiptAnalyzer

router = APIRouter(tags=["receipts"])


def _error(status_code: int, code: str, message: str) -> HTTPException:
    return HTTPException(status_code=status_code, detail={"code": code, "message": message})


def _sniff_media_type(data: bytes) -> str | None:
    if data.startswith(b"\xff\xd8\xff"):
        return "image/jpeg"
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "image/png"
    if len(data) >= 12 and data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "image/webp"
    if b"%PDF-" in data[:1024]:
        return "application/pdf"
    return None


@lru_cache
def get_analyzer() -> ReceiptAnalyzer:
    if settings.analyzer == "mock":
        return MockReceiptAnalyzer(delay_seconds=settings.mock_delay_seconds)
    raise RuntimeError(f"Unknown analyzer configured: {settings.analyzer}")


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_receipt(
    file: Annotated[UploadFile, File()],
    language: Annotated[str, Form()],
    analyzer: Annotated[ReceiptAnalyzer, Depends(get_analyzer)],
) -> AnalyzeResponse:
    started = perf_counter()

    if language not in LANGUAGE_CODES:
        raise _error(422, "invalid_language", "The selected output language is not supported.")

    data = await file.read(settings.max_upload_bytes + 1)
    if not data:
        raise _error(400, "empty_file", "The uploaded file is empty.")
    if len(data) > settings.max_upload_bytes:
        raise _error(400, "file_too_large", "The uploaded file exceeds the size limit.")

    media_type = _sniff_media_type(data)
    if media_type is None:
        raise _error(
            400,
            "unsupported_file_type",
            "Upload a JPG, PNG, WebP, or PDF receipt.",
        )

    receipt: Receipt = await analyzer.analyze(
        file_bytes=data,
        media_type=media_type,
        output_language=cast(LanguageCode, language),
    )

    return AnalyzeResponse(
        receipt=receipt,
        meta=AnalyzeMeta(
            file_name=file.filename or "receipt",
            file_type=media_type,
            file_size=len(data),
            processing_ms=int((perf_counter() - started) * 1000),
            analyzer=analyzer.name,
            is_mock=analyzer.name == "mock",
        ),
    )
