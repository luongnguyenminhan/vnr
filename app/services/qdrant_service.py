from typing import List, Dict, Any
from qdrant_client import QdrantClient
from qdrant_client.http import models as qmodels
from app.core.config import settings
import asyncio


class QdrantService:
    def __init__(self):
        # using synchronous client (qdrant-client provides sync client by default)
        self.client = QdrantClient(url=settings.QDRANT_URL, api_key=settings.QDRANT_API_KEY)

    async def init_client(self):
        # placeholder for async init if needed
        return self.client

    async def create_collection_if_not_exist(self, collection_name: str, dim: int):
        if collection_name in [c.name for c in self.client.get_collections().collections]:
            return
        self.client.recreate_collection(
            collection_name=collection_name,
            vectors_config=qmodels.VectorParams(size=dim, distance=qmodels.Distance.COSINE),
        )

    async def upsert_vectors(self, collection: str, vectors: List[List[float]], payloads: List[Dict[str, Any]]):
        # ensure collection exists
        if not vectors:
            return
        points = []
        for idx, vec in enumerate(vectors):
            points.append(qmodels.PointStruct(id=idx, vector=vec, payload=payloads[idx] if idx < len(payloads) else {}))
        self.client.upsert(collection_name=collection, points=points)

    async def search_vectors(self, collection: str, query_vector: List[float], top_k: int = 5):
        res = self.client.search(collection_name=collection, query_vector=query_vector, limit=top_k)
        return res

    async def delete_collection(self, collection: str):
        self.client.delete_collection(collection_name=collection)

    async def list_collections(self) -> List[Dict[str, Any]]:
        cols = self.client.get_collections()
        out = []
        for c in cols.collections:
            out.append({"name": c.name, "vectors_count": None})
        return out


qdrant_service = QdrantService()
