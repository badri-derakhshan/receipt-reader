from __future__ import annotations

import asyncio

from app.fixtures.mock_receipt import build_mock_receipt
from app.models import LanguageCode, Receipt


class MockReceiptAnalyzer:
    name = "mock"

    def __init__(self, delay_seconds: float = 0.0) -> None:
        self._delay_seconds = max(0.0, delay_seconds)

    async def analyze(
        self,
        *,
        file_bytes: bytes,
        media_type: str,
        output_language: LanguageCode,
    ) -> Receipt:
        del file_bytes, media_type
        if self._delay_seconds:
            await asyncio.sleep(self._delay_seconds)
        return build_mock_receipt(output_language)
