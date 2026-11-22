from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.routers.analyze import get_analyzer
from app.services.mock_analyzer import MockReceiptAnalyzer


@pytest.fixture(autouse=True)
def _fast_analyzer():
    app.dependency_overrides[get_analyzer] = lambda: MockReceiptAnalyzer(delay_seconds=0)
    yield
    app.dependency_overrides.clear()


@pytest.fixture
def client() -> TestClient:
    return TestClient(app)
