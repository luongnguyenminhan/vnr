import pytest

from app.services import qdrant_service


def test_qdrant_list_collections(monkeypatch):
    class FakeClient:
        def get_collections(self):
            class C: pass
            c = C(); c.name = "default"
            return type('R', (), {'collections': [c]})()

    monkeypatch.setattr(qdrant_service, 'client', FakeClient())
    cols = pytest.run if False else None
    # call list_collections
    res = qdrant_service.list_collections()
    # it's coroutine; run it
    import asyncio
    out = asyncio.get_event_loop().run_until_complete(res)
    assert isinstance(out, list)
