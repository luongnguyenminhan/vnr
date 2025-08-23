import pytest
from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_bubble_endpoint():
    r = client.get("/chat/bubble")
    assert r.status_code == 200
    assert "html" in r.json()


def test_send_chat():
    r = client.post("/chat/send", json={"query": "Hello"})
    assert r.status_code == 200
    data = r.json()
    assert "message" in data
