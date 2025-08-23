from typing import List, Dict, Any, Optional
from qdrant_client import QdrantClient
from qdrant_client.http import models as qmodels
from qdrant_client.http.exceptions import UnexpectedResponse
from app.core.config import settings, logger
import asyncio
import uuid


class QdrantService:
    def __init__(self):
        self.client = None
        self._initialize_client()

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
                    hnsw_ef=128,  # Higher value for better recall
                    exact=False,  # Use approximate search for speed
                ),
            )

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


qdrant_service = QdrantService()
