from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field

LanguageCode = Literal["en", "fi", "fa", "ar", "es", "fr", "de", "zh"]

CategoryKey = Literal[
    "produce",
    "dairy_eggs",
    "meat_seafood",
    "bakery",
    "pantry",
    "frozen",
    "beverages",
    "snacks_sweets",
    "alcohol",
    "household",
    "personal_care",
    "health",
    "restaurant",
    "other",
]

LANGUAGE_CODES: tuple[LanguageCode, ...] = ("en", "fi", "fa", "ar", "es", "fr", "de", "zh")

LANGUAGE_META = [
    {"code": "en", "label": "English", "native_label": "English", "dir": "ltr"},
    {"code": "fi", "label": "Finnish", "native_label": "Suomi", "dir": "ltr"},
    {"code": "fa", "label": "Persian", "native_label": "فارسی", "dir": "rtl"},
    {"code": "ar", "label": "Arabic", "native_label": "العربية", "dir": "rtl"},
    {"code": "es", "label": "Spanish", "native_label": "Español", "dir": "ltr"},
    {"code": "fr", "label": "French", "native_label": "Français", "dir": "ltr"},
    {"code": "de", "label": "German", "native_label": "Deutsch", "dir": "ltr"},
    {"code": "zh", "label": "Chinese (Simplified)", "native_label": "中文", "dir": "ltr"},
]


class Merchant(BaseModel):
    original: str
    translated: str


class ReceiptItem(BaseModel):
    id: str
    original_name: str
    translated_name: str
    quantity: float = Field(gt=0)
    unit_price: float = Field(ge=0)
    line_total: float = Field(ge=0)
    category: CategoryKey
    confidence: float = Field(ge=0, le=1)


class Receipt(BaseModel):
    id: str
    merchant: Merchant
    date: str
    currency: str
    source_language: LanguageCode
    output_language: LanguageCode
    items: list[ReceiptItem]
    subtotal: float = Field(ge=0)
    tax: float = Field(ge=0)
    total: float = Field(ge=0)
    warnings: list[str] = Field(default_factory=list)


class AnalyzeMeta(BaseModel):
    file_name: str
    file_type: str
    file_size: int
    processing_ms: int
    analyzer: str
    is_mock: bool


class AnalyzeResponse(BaseModel):
    receipt: Receipt
    meta: AnalyzeMeta
