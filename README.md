# Receipt Reader

Upload a receipt photo or PDF and get a categorized, translated item list in the language you choose.

This first version runs on a **mock analyzer**: the upload, validation, grouping, translation, RTL, and export flows are real, while the receipt contents come from a deterministic sample receipt. The analyzer sits behind an interface so real OCR can be added without changing the API or UI.

## Features

- Upload a JPG, PNG, WebP, or PDF receipt up to **15 MB**
- Eight languages: English, Finnish, Persian, Arabic, Spanish, French, German, and Simplified Chinese
- One language selector controls both the interface language and the translated receipt items; changing it re-runs the analysis
- Items grouped into 14 shopping categories with per-category subtotals
- Sticky receipt totals with subtotal, included VAT, and total
- Low-confidence warnings on uncertain items
- CSV and JSON export
- RTL layout and localized formatting for Persian and Arabic
- No database and no uploaded files retained

## Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Vitest, Testing Library
- **Backend:** FastAPI, Python 3.12+ (tested on 3.14), uv, pytest, ruff

## Quick start

Prerequisites: Python 3.12+, `uv`, Node.js 20+, and `pnpm`.

```bash
make install
```

Run the API and the web app in two terminals:

```bash
make backend    # http://127.0.0.1:8000
make frontend   # http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173). Interactive API docs are at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

The frontend dev server proxies `/api` to the backend, so no extra configuration is needed.

### Without make

```bash
cd backend && uv sync && uv run uvicorn app.main:app --reload --port 8000
cd frontend && pnpm install && pnpm dev
```

## API

### `POST /api/analyze`

Multipart form upload:

- `file` — JPG, PNG, WebP, or PDF
- `language` — one of `en`, `fi`, `fa`, `ar`, `es`, `fr`, `de`, `zh`

```bash
curl -X POST http://127.0.0.1:8000/api/analyze \
  -F "file=@receipt.jpg" \
  -F "language=fa"
```

The response contains a `receipt` object and analysis `meta`:

```json
{
  "receipt": {
    "id": "mock-...",
    "merchant": { "original": "K-Market Ruoholahti", "translated": "..." },
    "date": "2026-11-18",
    "currency": "EUR",
    "source_language": "fi",
    "output_language": "fa",
    "items": [
      {
        "id": "item-1",
        "original_name": "Maitoa",
        "translated_name": "شیر",
        "quantity": 1,
        "unit_price": 1.29,
        "line_total": 1.29,
        "category": "dairy_eggs",
        "confidence": 0.98
      }
    ],
    "subtotal": 47.28,
    "tax": 5.81,
    "total": 47.28,
    "warnings": []
  },
  "meta": {
    "file_name": "receipt.jpg",
    "file_type": "image/jpeg",
    "file_size": 12345,
    "processing_ms": 1402,
    "analyzer": "mock",
    "is_mock": true
  }
}
```

Errors return HTTP `400` or `422` with `{ "detail": { "code": "...", "message": "..." } }`. Codes: `unsupported_file_type`, `file_too_large`, `empty_file`, `invalid_language`.

Other endpoints:

- `GET /api/health`
- `GET /api/languages`

File types are verified by magic bytes on the server, not just the filename or browser MIME type.

## Configuration

### Backend

Copy `backend/.env.example` to `backend/.env` if you want to override defaults:

| Variable | Default | Purpose |
| --- | --- | --- |
| `ANALYZER` | `mock` | Analyzer implementation |
| `MAX_UPLOAD_MB` | `15` | Upload size limit |
| `MOCK_DELAY_SECONDS` | `1.4` | Simulated processing delay |
| `CORS_ORIGINS` | localhost dev origins | Comma-separated allowed origins |

### Frontend

`frontend/.env.example`:

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_API_BASE` | empty | API origin when not using the Vite proxy |

## Testing and checks

```bash
make test    # backend pytest + frontend Vitest
make lint    # ruff + ESLint + TypeScript
make build   # production frontend build
```

## Adding real OCR

The mock is intentionally isolated:

1. Implement the `ReceiptAnalyzer` protocol in `backend/app/services/analyzer.py`.
2. Return a `Receipt` from `backend/app/models.py` in the requested `output_language`.
3. Register the implementation in `get_analyzer()` in `backend/app/routers/analyze.py`.
4. Set `ANALYZER` in the backend environment.

The API contract, frontend, category grouping, exports, and tests can stay as they are.

## Project layout

```
backend/
  app/
    fixtures/mock_receipt.py   # deterministic sample receipt + translations
    routers/analyze.py         # upload validation and API endpoint
    services/                  # analyzer protocol + mock implementation
    models.py                  # API and receipt models
    main.py                    # FastAPI app, health, languages
  tests/
frontend/
  src/
    api/                       # fetch client
    components/                # uploader, results, categories, totals, exports
    hooks/                     # language + analysis state
    i18n/                      # UI strings, language metadata, category labels
    lib/                       # grouping, validation, formatting, export
```
