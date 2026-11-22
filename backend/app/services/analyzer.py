from __future__ import annotations

from typing import Protocol

from app.models import LanguageCode, Receipt


class ReceiptAnalyzer(Protocol):
    """Contract for receipt analyzers.

    A real OCR/LLM implementation can replace the mock without changing the API
    layer: return a validated Receipt for the requested output language.
    """

    name: str

    async def analyze(
        self,
        *,
        file_bytes: bytes,
        media_type: str,
        output_language: LanguageCode,
    ) -> Receipt: ...
