from __future__ import annotations

import os
from dataclasses import dataclass, field

from dotenv import load_dotenv

load_dotenv()


def _parse_origins(value: str) -> list[str]:
    return [origin.strip() for origin in value.split(",") if origin.strip()]


@dataclass
class Settings:
    analyzer: str = field(default_factory=lambda: os.getenv("ANALYZER", "mock"))
    max_upload_bytes: int = field(
        default_factory=lambda: int(os.getenv("MAX_UPLOAD_MB", "15")) * 1024 * 1024
    )
    mock_delay_seconds: float = field(
        default_factory=lambda: float(os.getenv("MOCK_DELAY_SECONDS", "1.4"))
    )
    cors_origins: list[str] = field(
        default_factory=lambda: _parse_origins(
            os.getenv(
                "CORS_ORIGINS",
                "http://localhost:5173,http://127.0.0.1:5173",
            )
        )
    )


settings = Settings()
