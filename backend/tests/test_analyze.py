from __future__ import annotations

from fastapi.testclient import TestClient

from app.config import settings
from app.models import LANGUAGE_CODES

PNG = b"\x89PNG\r\n\x1a\n" + b"\x00" * 128
JPEG = b"\xff\xd8\xff\xe0" + b"\x00" * 128
WEBP = b"RIFF" + (64).to_bytes(4, "little") + b"WEBP" + b"VP8 " + b"\x00" * 64
PDF = b"%PDF-1.7\n" + b"\x00" * 128


def upload(
    client: TestClient,
    data: bytes = PNG,
    *,
    filename: str = "receipt.png",
    content_type: str = "image/png",
    language: str = "en",
):
    return client.post(
        "/api/analyze",
        files={"file": (filename, data, content_type)},
        data={"language": language},
    )


def test_analyzes_receipt_and_translates_items(client: TestClient) -> None:
    response = upload(client)

    assert response.status_code == 200
    body = response.json()
    receipt = body["receipt"]

    assert body["meta"]["is_mock"] is True
    assert body["meta"]["analyzer"] == "mock"
    assert receipt["source_language"] == "fi"
    assert receipt["output_language"] == "en"
    assert receipt["merchant"]["original"] == "K-Market Ruoholahti"
    assert receipt["items"][0]["original_name"] == "Maitoa 1 l"
    assert receipt["items"][0]["translated_name"] == "Milk 1 L"
    assert receipt["total"] == 47.28
    assert receipt["tax"] == 5.81
    assert len(receipt["items"]) == 12


def test_every_language_returns_translated_items(client: TestClient) -> None:
    english_names = set()

    for language in LANGUAGE_CODES:
        response = upload(client, language=language)
        assert response.status_code == 200, language
        receipt = response.json()["receipt"]
        assert receipt["output_language"] == language
        assert all(item["translated_name"].strip() for item in receipt["items"])
        english_names.add(receipt["items"][0]["translated_name"])

    assert len(english_names) == len(LANGUAGE_CODES)


def test_persian_output_uses_translation(client: TestClient) -> None:
    response = upload(client, language="fa")

    assert response.status_code == 200
    receipt = response.json()["receipt"]
    assert receipt["items"][0]["translated_name"] == "شیر ۱ لیتری"
    assert receipt["items"][0]["original_name"] == "Maitoa 1 l"


def test_includes_low_confidence_item(client: TestClient) -> None:
    receipt = upload(client).json()["receipt"]
    confidences = [item["confidence"] for item in receipt["items"]]

    assert min(confidences) < 0.75


def test_accepts_pdf_jpeg_and_webp(client: TestClient) -> None:
    for data, filename, content_type in (
        (PDF, "receipt.pdf", "application/pdf"),
        (JPEG, "receipt.jpg", "image/jpeg"),
        (WEBP, "receipt.webp", "image/webp"),
    ):
        response = upload(client, data, filename=filename, content_type=content_type)
        assert response.status_code == 200, filename
        assert response.json()["meta"]["file_type"] == content_type


def test_rejects_unsupported_file(client: TestClient) -> None:
    response = upload(client, b"not a receipt", filename="notes.txt", content_type="text/plain")

    assert response.status_code == 400
    assert response.json()["detail"]["code"] == "unsupported_file_type"


def test_rejects_invalid_language(client: TestClient) -> None:
    response = upload(client, language="klingon")

    assert response.status_code == 422
    assert response.json()["detail"]["code"] == "invalid_language"


def test_rejects_empty_file(client: TestClient) -> None:
    response = upload(client, b"")

    assert response.status_code == 400
    assert response.json()["detail"]["code"] == "empty_file"


def test_rejects_oversized_file(client: TestClient, monkeypatch) -> None:
    monkeypatch.setattr(settings, "max_upload_bytes", 20)
    response = upload(client, PNG)

    assert response.status_code == 400
    assert response.json()["detail"]["code"] == "file_too_large"


def test_health_and_languages(client: TestClient) -> None:
    health = client.get("/api/health")
    assert health.status_code == 200
    assert health.json() == {"status": "ok", "analyzer": "mock"}

    languages = client.get("/api/languages")
    assert languages.status_code == 200
    assert len(languages.json()) == len(LANGUAGE_CODES)
