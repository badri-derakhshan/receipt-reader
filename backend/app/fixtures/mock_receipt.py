from __future__ import annotations

from dataclasses import dataclass
from uuid import uuid4

from app.models import CategoryKey, LanguageCode, Merchant, Receipt, ReceiptItem


@dataclass(frozen=True)
class MockItem:
    id: str
    original: str
    quantity: float
    unit_price: float
    category: CategoryKey
    confidence: float
    translations: dict[LanguageCode, str]


MOCK_ITEMS: tuple[MockItem, ...] = (
    MockItem(
        id="item-1",
        original="Maitoa 1 l",
        quantity=1,
        unit_price=1.29,
        category="dairy_eggs",
        confidence=0.97,
        translations={
            "en": "Milk 1 L",
            "fi": "Maitoa 1 l",
            "fa": "شیر ۱ لیتری",
            "ar": "حليب ١ لتر",
            "es": "Leche 1 L",
            "fr": "Lait 1 L",
            "de": "Milch 1 l",
            "zh": "牛奶 1升",
        },
    ),
    MockItem(
        id="item-2",
        original="Vehnäjauho 2 kg",
        quantity=1,
        unit_price=1.89,
        category="pantry",
        confidence=0.95,
        translations={
            "en": "Wheat flour 2 kg",
            "fi": "Vehnäjauho 2 kg",
            "fa": "آرد گندم ۲ کیلوگرم",
            "ar": "طحين قمح ٢ كغ",
            "es": "Harina de trigo 2 kg",
            "fr": "Farine de blé 2 kg",
            "de": "Weizenmehl 2 kg",
            "zh": "小麦面粉 2公斤",
        },
    ),
    MockItem(
        id="item-3",
        original="Kana filee 400 g",
        quantity=2,
        unit_price=5.49,
        category="meat_seafood",
        confidence=0.94,
        translations={
            "en": "Chicken breast 400 g",
            "fi": "Kana filee 400 g",
            "fa": "سینه مرغ ۴۰۰ گرم",
            "ar": "صدر دجاج ٤٠٠ غ",
            "es": "Pechuga de pollo 400 g",
            "fr": "Filet de poulet 400 g",
            "de": "Hähnchenbrustfilet 400 g",
            "zh": "鸡胸肉 400克",
        },
    ),
    MockItem(
        id="item-4",
        original="Tomaatti 500 g",
        quantity=1,
        unit_price=2.49,
        category="produce",
        confidence=0.96,
        translations={
            "en": "Tomatoes 500 g",
            "fi": "Tomaatti 500 g",
            "fa": "گوجه‌فرنگی ۵۰۰ گرم",
            "ar": "طماطم ٥٠٠ غ",
            "es": "Tomates 500 g",
            "fr": "Tomates 500 g",
            "de": "Tomaten 500 g",
            "zh": "西红柿 500克",
        },
    ),
    MockItem(
        id="item-5",
        original="Banaani",
        quantity=1,
        unit_price=1.75,
        category="produce",
        confidence=0.98,
        translations={
            "en": "Bananas",
            "fi": "Banaani",
            "fa": "موز",
            "ar": "موز",
            "es": "Plátanos",
            "fr": "Bananes",
            "de": "Bananen",
            "zh": "香蕉",
        },
    ),
    MockItem(
        id="item-6",
        original="Ruispala",
        quantity=1,
        unit_price=2.95,
        category="bakery",
        confidence=0.89,
        translations={
            "en": "Rye bread",
            "fi": "Ruispala",
            "fa": "نان چاودار",
            "ar": "خبز الجاودار",
            "es": "Pan de centeno",
            "fr": "Pain de seigle",
            "de": "Roggenbrot",
            "zh": "黑麦面包",
        },
    ),
    MockItem(
        id="item-7",
        original="Jäätelö 1 l",
        quantity=1,
        unit_price=3.99,
        category="frozen",
        confidence=0.92,
        translations={
            "en": "Ice cream 1 L",
            "fi": "Jäätelö 1 l",
            "fa": "بستنی ۱ لیتری",
            "ar": "آيس كريم ١ لتر",
            "es": "Helado 1 L",
            "fr": "Glace 1 L",
            "de": "Eiscreme 1 l",
            "zh": "冰淇淋 1升",
        },
    ),
    MockItem(
        id="item-8",
        original="Kahvi 500 g",
        quantity=1,
        unit_price=6.49,
        category="pantry",
        confidence=0.97,
        translations={
            "en": "Coffee 500 g",
            "fi": "Kahvi 500 g",
            "fa": "قهوه ۵۰۰ گرم",
            "ar": "قهوة ٥٠٠ غ",
            "es": "Café 500 g",
            "fr": "Café 500 g",
            "de": "Kaffee 500 g",
            "zh": "咖啡 500克",
        },
    ),
    MockItem(
        id="item-9",
        original="Shampoo",
        quantity=1,
        unit_price=4.99,
        category="personal_care",
        confidence=0.93,
        translations={
            "en": "Shampoo",
            "fi": "Shampoo",
            "fa": "شامپو",
            "ar": "شامبو",
            "es": "Champú",
            "fr": "Shampooing",
            "de": "Shampoo",
            "zh": "洗发水",
        },
    ),
    MockItem(
        id="item-10",
        original="Vessapaperi",
        quantity=1,
        unit_price=3.29,
        category="household",
        confidence=0.95,
        translations={
            "en": "Toilet paper",
            "fi": "Vessapaperi",
            "fa": "دستمال توالت",
            "ar": "ورق تواليت",
            "es": "Papel higiénico",
            "fr": "Papier toilette",
            "de": "Toilettenpapier",
            "zh": "卫生纸",
        },
    ),
    MockItem(
        id="item-11",
        original="Olut 0,5 l",
        quantity=2,
        unit_price=2.19,
        category="alcohol",
        confidence=0.91,
        translations={
            "en": "Beer 0.5 L",
            "fi": "Olut 0,5 l",
            "fa": "آبجو ۰٫۵ لیتری",
            "ar": "بيرة ٠٫٥ لتر",
            "es": "Cerveza 0,5 L",
            "fr": "Bière 0,5 L",
            "de": "Bier 0,5 l",
            "zh": "啤酒 0.5升",
        },
    ),
    MockItem(
        id="item-12",
        original="Perunalastut",
        quantity=1,
        unit_price=2.79,
        category="snacks_sweets",
        confidence=0.62,
        translations={
            "en": "Potato chips",
            "fi": "Perunalastut",
            "fa": "چیپس سیب‌زمینی",
            "ar": "رقائق البطاطس",
            "es": "Patatas fritas",
            "fr": "Chips",
            "de": "Kartoffelchips",
            "zh": "薯片",
        },
    ),
)


def build_mock_receipt(output_language: LanguageCode) -> Receipt:
    items = [
        ReceiptItem(
            id=item.id,
            original_name=item.original,
            translated_name=item.translations[output_language],
            quantity=item.quantity,
            unit_price=item.unit_price,
            line_total=round(item.quantity * item.unit_price, 2),
            category=item.category,
            confidence=item.confidence,
        )
        for item in MOCK_ITEMS
    ]
    total = round(sum(item.line_total for item in items), 2)
    tax = round(total - total / 1.14, 2)

    return Receipt(
        id=f"mock-{uuid4().hex[:10]}",
        merchant=Merchant(
            original="K-Market Ruoholahti",
            translated="K-Market Ruoholahti",
        ),
        date="2026-11-18",
        currency="EUR",
        source_language="fi",
        output_language=output_language,
        items=items,
        subtotal=total,
        tax=tax,
        total=total,
    )
