from typing import List, Dict, Any, Optional
from qdrant_client import QdrantClient
from qdrant_client.http import models as qmodels
from qdrant_client.http.exceptions import UnexpectedResponse
from app.core.config import settings, logger
import asyncio
import uuid
import re
import os


class QdrantService:
    def __init__(self):
        self.client = None
        self._initialize_client()
        self.ai_service = None  # Will be injected for embedding operations

    def _initialize_client(self):
        """Initialize Qdrant client with error handling"""
        try:
            self.client = QdrantClient(
                url=settings.QDRANT_URL,
                api_key=settings.QDRANT_API_KEY,
                timeout=30.0,  # Add timeout for better reliability
            )
            logger.info("Qdrant client initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize Qdrant client: {e}")
            self.client = None

    async def init_client(self):
        """Initialize and return the Qdrant client"""
        if self.client is None:
            self._initialize_client()
        return self.client

    async def create_collection_if_not_exist(
        self, collection_name: str, dim: int
    ) -> bool:
        """Create a collection if it doesn't exist. Returns True if created, False if already exists."""
        if not self.client:
            logger.error("Qdrant client not initialized")
            return False

        if not collection_name or not collection_name.strip():
            logger.error("Collection name cannot be empty")
            return False

        if dim <= 0:
            logger.error(f"Invalid vector dimension: {dim}")
            return False

        try:
            # Check if collection already exists
            existing_collections = [
                c.name for c in self.client.get_collections().collections
            ]
            if collection_name in existing_collections:
                logger.info(f"Collection '{collection_name}' already exists")
                return False

            # Create new collection
            self.client.create_collection(
                collection_name=collection_name,
                vectors_config=qmodels.VectorParams(
                    size=dim, distance=qmodels.Distance.COSINE
                ),
                # Add additional configuration for better reliability
                optimizers_config=qmodels.OptimizersConfigDiff(
                    default_segment_number=2,
                    max_segment_size=1024 * 1024 * 100,  # 100MB
                ),
            )
            logger.info(
                f"Successfully created collection '{collection_name}' with dimension {dim}"
            )
            return True

        except Exception as e:
            logger.error(f"Failed to create collection '{collection_name}': {e}")
            return False

    async def upsert_vectors(
        self,
        collection: str,
        vectors: List[List[float]],
        payloads: List[Dict[str, Any]],
    ) -> bool:
        """Upsert vectors to a collection. Returns True on success."""
        if not self.client:
            logger.error("Qdrant client not initialized")
            return False

        if not vectors:
            logger.warning("No vectors to upsert")
            return True

        if not collection or not collection.strip():
            logger.error("Collection name cannot be empty")
            return False

        # Validate vector dimensions
        if not vectors[0]:
            logger.error("Vectors cannot be empty")
            return False

        vector_dim = len(vectors[0])
        for i, vec in enumerate(vectors):
            if len(vec) != vector_dim:
                logger.error(
                    f"Vector at index {i} has inconsistent dimension: {len(vec)} != {vector_dim}"
                )
                return False

        # Ensure payloads list matches vectors list
        if len(payloads) != len(vectors):
            logger.warning(
                f"Payloads count ({len(payloads)}) doesn't match vectors count ({len(vectors)}). Padding with empty payloads."
            )
            while len(payloads) < len(vectors):
                payloads.append({})

        try:
            # Create points for upsert
            points = []
            for idx, vec in enumerate(vectors):
                # Qdrant requires point IDs to be either an unsigned integer or a UUID string.
                # Previous implementation used a custom string with hashes which produced invalid IDs.
                point_id = str(uuid.uuid4())
                points.append(
                    qmodels.PointStruct(id=point_id, vector=vec, payload=payloads[idx])
                )

            # Upsert to collection
            self.client.upsert(collection_name=collection, points=points)
            logger.info(
                f"Successfully upserted {len(points)} vectors to collection '{collection}'"
            )
            return True

        except Exception as e:
            logger.error(f"Failed to upsert vectors to collection '{collection}': {e}")
            return False

    async def search_vectors(
        self, collection: str, query_vector: List[float], top_k: int = 5
    ) -> List[Any]:
        """Search for similar vectors in a collection. Returns list of results."""
        if not self.client:
            logger.error("Qdrant client not initialized")
            return []

        if not collection or not collection.strip():
            logger.error("Collection name cannot be empty")
            return []

        if not query_vector:
            logger.error("Query vector cannot be empty")
            return []

        if top_k <= 0:
            logger.warning(f"Invalid top_k value: {top_k}. Using default of 5.")
            top_k = 5

        if top_k > 100:
            logger.warning(f"Large top_k value: {top_k}. Limiting to 100.")
            top_k = 100

        try:
            # Check if collection exists
            existing_collections = [
                c.name for c in self.client.get_collections().collections
            ]
            if collection not in existing_collections:
                logger.warning(f"Collection '{collection}' does not exist")
                return []

            # Perform search
            results = self.client.search(
                collection_name=collection,
                query_vector=query_vector,
                limit=top_k,
                # Add search parameters for better results
                search_params=qmodels.SearchParams(
                    hnsw_ef=256,  # Higher value for better recall
                    exact=False,  # Use approximate search for speed
                ),
            )
            print(results)
            logger.info(
                f"Successfully searched collection '{collection}' and found {len(results)} results"
            )
            return results

        except Exception as e:
            logger.error(f"Failed to search vectors in collection '{collection}': {e}")
            return []

    async def delete_collection(self, collection: str) -> bool:
        """Delete a collection. Returns True on success."""
        if not self.client:
            logger.error("Qdrant client not initialized")
            return False

        if not collection or not collection.strip():
            logger.error("Collection name cannot be empty")
            return False

        try:
            # Check if collection exists
            existing_collections = [
                c.name for c in self.client.get_collections().collections
            ]
            if collection not in existing_collections:
                logger.warning(f"Collection '{collection}' does not exist")
                return True  # Not an error if already deleted

            # Delete the collection
            self.client.delete_collection(collection_name=collection)
            logger.info(f"Successfully deleted collection '{collection}'")
            return True

        except Exception as e:
            logger.error(f"Failed to delete collection '{collection}': {e}")
            return False

    async def list_collections(self) -> List[Dict[str, Any]]:
        """List all collections with detailed information."""
        if not self.client:
            logger.error("Qdrant client not initialized")
            return []

        try:
            collections_info = self.client.get_collections()
            collections = []

            for collection in collections_info.collections:
                try:
                    # Get detailed information about each collection
                    collection_info = self.client.get_collection(
                        collection_name=collection.name
                    )

                    collections.append(
                        {
                            "name": collection.name,
                            "vectors_count": getattr(
                                collection_info, "vectors_count", None
                            ),
                            "status": getattr(collection_info, "status", None),
                            "dimension": (
                                getattr(
                                    collection_info.config.params.vectors, "size", None
                                )
                                if hasattr(collection_info.config.params, "vectors")
                                else None
                            ),
                        }
                    )
                except Exception as e:
                    logger.warning(
                        f"Failed to get details for collection '{collection.name}': {e}"
                    )
                    # Add basic info if detailed info fails
                    collections.append(
                        {
                            "name": collection.name,
                            "vectors_count": None,
                            "status": None,
                            "dimension": None,
                        }
                    )

            logger.info(f"Successfully listed {len(collections)} collections")
            return collections

        except Exception as e:
            logger.error(f"Failed to list collections: {e}")
            return []

    async def collection_exists(self, collection_name: str) -> bool:
        """Check if a collection exists."""
        if not self.client or not collection_name:
            return False

        try:
            existing_collections = [
                c.name for c in self.client.get_collections().collections
            ]
            return collection_name in existing_collections
        except Exception as e:
            logger.error(
                f"Failed to check if collection '{collection_name}' exists: {e}"
            )
            return False

    async def get_collection_info(
        self, collection_name: str
    ) -> Optional[Dict[str, Any]]:
        """Get detailed information about a specific collection."""
        if not self.client or not collection_name:
            return None

        try:
            collection_info = self.client.get_collection(
                collection_name=collection_name
            )
            return {
                "name": collection_name,
                "vectors_count": getattr(collection_info, "vectors_count", None),
                "status": getattr(collection_info, "status", None),
                "dimension": (
                    getattr(collection_info.config.params.vectors, "size", None)
                    if hasattr(collection_info.config.params, "vectors")
                    else None
                ),
                "distance": (
                    getattr(collection_info.config.params.vectors, "distance", None)
                    if hasattr(collection_info.config.params, "vectors")
                    else None
                ),
            }
        except Exception as e:
            logger.error(f"Failed to get collection info for '{collection_name}': {e}")
            return None

    def set_ai_service(self, ai_service):
        """Set the AI service for embedding operations"""
        self.ai_service = ai_service
        logger.info("AI service set for QdrantService embeddings")

    async def chunk_text_by_sections(
        self, text: str, max_chunk_size: int = 1000
    ) -> List[Dict[str, Any]]:
        """
        Advanced text chunking that respects document structure and creates meaningful chunks.
        Uses Vietnamese language patterns and section headers.
        """
        if not text or not text.strip():
            return []

        # Split by major sections first (using Vietnamese section markers)
        section_pattern = r"(?=^#{1,3}\s+|^[A-ZÀ-ÝĂÂĐÊÔƠƯĂẰẲẴẶẮẰẲẴẶẤẦẨẪẬẾỀỂỄỆỐỒỔỖỘỚỜỞỠỢỨỪỬỮỰ][^\n]*(?:\n|$))"
        sections = re.split(section_pattern, text, flags=re.MULTILINE)

        chunks = []
        current_chunk = ""
        current_section = ""
        chunk_id = 0

        for section in sections:
            section = section.strip()
            if not section:
                continue

            # Check if this is a header
            if re.match(
                r"^#{1,3}\s+|^[A-ZÀ-ÝĂÂĐÊÔƠƯĂẰẲẴẶẮẰẲẴẶẤẦẨẪẬẾỀỂỄỆỐỒỔỖỘỚỜỞỠỢỨỪỬỮỰ][^\n]*",
                section,
            ):
                # If we have content in current chunk, save it
                if current_chunk.strip():
                    chunks.append(
                        {
                            "id": chunk_id,
                            "text": current_chunk.strip(),
                            "section": current_section,
                            "type": "content",
                            "word_count": len(current_chunk.split()),
                        }
                    )
                    chunk_id += 1

                # Start new section
                current_section = section
                current_chunk = section + "\n"
            else:
                # Add to current chunk
                current_chunk += section + "\n"

                # If chunk is getting too large, split it
                if len(current_chunk) > max_chunk_size:
                    # Find a good breaking point (end of sentence or paragraph)
                    sentences = re.split(r"(?<=[.!?])\s+|\n\s*\n", current_chunk)
                    temp_chunk = ""

                    for sentence in sentences:
                        if len(temp_chunk + sentence) > max_chunk_size and temp_chunk:
                            # Save current chunk
                            chunks.append(
                                {
                                    "id": chunk_id,
                                    "text": temp_chunk.strip(),
                                    "section": current_section,
                                    "type": "content",
                                    "word_count": len(temp_chunk.split()),
                                }
                            )
                            chunk_id += 1
                            temp_chunk = sentence
                        else:
                            temp_chunk += sentence + " "

                    current_chunk = temp_chunk

        # Add the last chunk
        if current_chunk.strip():
            chunks.append(
                {
                    "id": chunk_id,
                    "text": current_chunk.strip(),
                    "section": current_section,
                    "type": "content",
                    "word_count": len(current_chunk.split()),
                }
            )

        logger.info(f"Chunked text into {len(chunks)} chunks")
        return chunks

    async def process_corpus_file(
        self, file_path: str, collection_name: str = "vietnam_history"
    ) -> bool:
        """
        Process a corpus file and store it in Qdrant using Google embeddings.
        Supports Vietnamese text with proper chunking.
        """
        if not self.ai_service:
            logger.error("AI service not set - cannot generate embeddings")
            return False

        if not os.path.exists(file_path):
            logger.error(f"Corpus file not found: {file_path}")
            return False

        try:
            # Read the corpus file
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            logger.info(
                f"Processing corpus file: {file_path} ({len(content)} characters)"
            )

            # Create collection if it doesn't exist
            # Estimate embedding dimension from AI service
            embed_dim = getattr(self.ai_service, "embed_dim", 768)
            created = await self.create_collection_if_not_exist(
                collection_name, embed_dim
            )
            if not created and not await self.collection_exists(collection_name):
                logger.error(
                    f"Failed to create or verify collection: {collection_name}"
                )
                return False

            # Chunk the text using advanced chunking
            chunks = await self.chunk_text_by_sections(content, max_chunk_size=1500)

            if not chunks:
                logger.warning("No chunks generated from corpus")
                return False

            # Generate embeddings for all chunks
            chunk_texts = [chunk["text"] for chunk in chunks]
            embeddings = await self.ai_service.embed_documents(chunk_texts)

            if not embeddings or len(embeddings) != len(chunks):
                logger.error(
                    f"Embedding generation failed or mismatched: got {len(embeddings) if embeddings else 0}, expected {len(chunks)}"
                )
                return False

            # Prepare payloads with metadata
            payloads = []
            for i, chunk in enumerate(chunks):
                payload = {
                    "id": chunk["id"],
                    "text": chunk["text"],
                    "section": chunk["section"],
                    "type": chunk["type"],
                    "word_count": chunk["word_count"],
                    "source_file": os.path.basename(file_path),
                    "language": "vietnamese",
                    "document_type": "historical_political_document",
                    "topic": "vietnam_communist_party_history_doi_moi",
                    "chunk_index": i,
                    "total_chunks": len(chunks),
                }
                payloads.append(payload)

            # Store in Qdrant
            success = await self.upsert_vectors(collection_name, embeddings, payloads)

            if success:
                logger.info(
                    f"Successfully processed and stored {len(chunks)} chunks from {file_path}"
                )
                collection_info = await self.get_collection_info(collection_name)
                if collection_info:
                    logger.info(
                        f"Collection '{collection_name}' now has {collection_info.get('vectors_count', 0)} vectors"
                    )
            else:
                logger.error("Failed to store chunks in Qdrant")

            return success

        except Exception as e:
            logger.error(f"Failed to process corpus file {file_path}: {e}")
            return False

    async def search_corpus(
        self,
        query: str,
        collection_name: str = "vietnam_history",
        top_k: int = 5,
        include_metadata: bool = True,
    ) -> List[Dict[str, Any]]:
        """
        Search the corpus using Google embeddings with Vietnamese language support.
        """
        if not self.ai_service:
            logger.error("AI service not set - cannot generate query embedding")
            return []

        try:
            # Generate embedding for the query
            query_embedding = await self.ai_service.embed_query(query)

            # Search in Qdrant
            results = await self.search_vectors(
                collection_name, query_embedding, top_k=top_k
            )

            if not results:
                return []

            # Format results with metadata
            formatted_results = []
            for i, result in enumerate(results):
                payload = getattr(result, "payload", {}) or {}
                score = getattr(result, "score", 0.0)

                formatted_result = {
                    "rank": i + 1,
                    "score": score,
                    "text": payload.get("text", ""),
                    "section": payload.get("section", ""),
                    "source_file": payload.get("source_file", ""),
                    "word_count": payload.get("word_count", 0),
                    "chunk_index": payload.get("chunk_index", 0),
                    "total_chunks": payload.get("total_chunks", 0),
                    "document_type": payload.get("document_type", ""),
                    "topic": payload.get("topic", ""),
                }

                # Only include text if it's not too long
                if len(formatted_result["text"]) > 2000:
                    formatted_result["text"] = formatted_result["text"][:2000] + "..."

                formatted_results.append(formatted_result)

            logger.info(
                f"Found {len(formatted_results)} relevant chunks for query: '{query[:50]}...'"
            )
            return formatted_results

        except Exception as e:
            logger.error(f"Failed to search corpus: {e}")
            return []

    async def get_corpus_statistics(
        self, collection_name: str = "vietnam_history"
    ) -> Dict[str, Any]:
        """
        Get statistics about the stored corpus.
        """
        try:
            collection_info = await self.get_collection_info(collection_name)
            if not collection_info:
                return {"error": "Collection not found or inaccessible"}

            # Get sample documents to analyze content
            sample_results = await self.search_vectors(
                collection_name,
                [0.0] * collection_info.get("dimension", 768),
                top_k=100,
            )

            stats = {
                "collection_name": collection_name,
                "total_vectors": collection_info.get("vectors_count", 0),
                "dimension": collection_info.get("dimension", 0),
                "status": collection_info.get("status", "unknown"),
                "total_chunks": 0,
                "unique_sections": set(),
                "source_files": set(),
                "total_words": 0,
                "avg_chunk_size": 0,
                "language": "vietnamese",
                "document_type": "historical_political_document",
            }

            if sample_results:
                total_chunks = 0
                total_words = 0
                sections = set()
                files = set()

                for result in sample_results:
                    payload = getattr(result, "payload", {}) or {}
                    total_chunks = max(total_chunks, payload.get("total_chunks", 0))
                    total_words += payload.get("word_count", 0)
                    if payload.get("section"):
                        sections.add(payload["section"])
                    if payload.get("source_file"):
                        files.add(payload["source_file"])

                stats.update(
                    {
                        "total_chunks": total_chunks,
                        "unique_sections": len(sections),
                        "source_files": list(files),
                        "total_words": total_words,
                        "avg_chunk_size": (
                            total_words // len(sample_results) if sample_results else 0
                        ),
                    }
                )

            return stats

        except Exception as e:
            logger.error(f"Failed to get corpus statistics: {e}")
            return {"error": str(e)}


qdrant_service = QdrantService()
