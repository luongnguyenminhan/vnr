from typing import List, Optional
from app.core.config import settings, logger
from app.services.qdrant_service import qdrant_service

import asyncio


class AIService:
    def __init__(self):
        # placeholder clients
        self.embed_dim = 768  # default stub dim

    def chunk_text(self, text: str, chunk_size: int = 1000) -> List[str]:
        # naive chunker by characters
        return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

    async def embed_documents(self, docs: List[str]) -> List[List[float]]:
        # TODO: Replace this stub with real Google embeddings via settings.GOOGLE_API_KEY
        if not docs:
            return []
        logger.info("Embedding %d documents (stub)", len(docs))
        # return small deterministic vectors for testing
        return [[float((i + 1) % 10) for _ in range(self.embed_dim)] for i, _ in enumerate(docs)]

    async def embed_query(self, query: str) -> List[float]:
        res = await self.embed_documents([query])
        return res[0] if res else []

    async def run_rag_chat(self, query: str, top_k: int = 5, conversation_history: Optional[List[str]] = None) -> str:
        # 1) embed query
        qvec = await self.embed_query(query)
        # 2) retrieve nearest docs
        try:
            hits = await qdrant_service.search_vectors(collection="default", query_vector=qvec, top_k=top_k)
        except Exception:
            hits = []

        retrieved_texts = []
        for h in hits:
            # qdrant client returns objects with payload
            payload = getattr(h, "payload", None) or {}
            txt = payload.get("text") if isinstance(payload, dict) else str(payload)
            if txt:
                retrieved_texts.append(txt)

        # 3) build prompt
        prompt = "\n\n".join(retrieved_texts[:top_k]) + "\n\nUser: " + query

        # 4) call generator -- TODO: wire LangChain/Google Gen connector
        logger.info("Calling generator (stub) with prompt length %d", len(prompt))
        # Placeholder reply
        reply = "[stub reply] I retrieved %d docs. Replace with real Google Gen AI call." % (len(retrieved_texts))
        return reply


ai_service = AIService()
