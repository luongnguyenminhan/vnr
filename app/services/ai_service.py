from typing import List, Optional, Dict
from app.core.config import settings, logger
from app.services.qdrant_service import qdrant_service

import asyncio
import time

try:
    from google import genai
    from google.genai import types
except ImportError:
    genai = None
    types = None

# LangChain imports for chat generation
try:
    from langchain_google_genai import ChatGoogleGenerativeAI
    from langchain_core.messages import (
        HumanMessage,
        SystemMessage,
        AIMessage,
        BaseMessage,
    )
    from langchain.memory import ConversationBufferWindowMemory
    from langchain.chains import ConversationChain

    LANGCHAIN_AVAILABLE = True
except ImportError:
    logger.warning(
        "LangChain Google GenAI not available - install with: pip install langchain-google-genai"
    )
    LANGCHAIN_AVAILABLE = False


class AIService:
    def __init__(self):
        self.embed_dim = 768  # Will be determined from actual embeddings
        self.client = None  # For embeddings
        self.chat_client = None  # For LangChain chat
        self.conversation_store = (
            {}
        )  # In-memory conversation storage: session_id -> conversation
        self.max_conversation_length = 10  # Maximum turns to keep in memory

        if settings.GOOGLE_API_KEY and genai:
            try:
                # Initialize embeddings client
                self.client = genai.Client(api_key=settings.GOOGLE_API_KEY)
                logger.info("Google GenAI embeddings client initialized successfully")

                # Initialize LangChain chat client
                if LANGCHAIN_AVAILABLE:
                    self.chat_client = ChatGoogleGenerativeAI(
                        model="gemini-2.5-flash",  # Latest Gemini model
                        api_key=settings.GOOGLE_API_KEY,
                        temperature=0.3,  # Lower temperature for consistent responses
                        max_tokens=2048,
                    )
                    logger.info(
                        "LangChain Google GenAI chat client initialized successfully"
                    )
                else:
                    logger.warning(
                        "LangChain not available - chat will use stub responses"
                    )

            except Exception as e:
                logger.error(f"Failed to initialize Google GenAI clients: {e}")
                self.client = None
                self.chat_client = None
        else:
            logger.warning(
                "GOOGLE_API_KEY not set - both embeddings and chat will use stub data"
            )

    def chunk_text(self, text: str, chunk_size: int = 1000) -> List[str]:
        # naive chunker by characters
        return [text[i : i + chunk_size] for i in range(0, len(text), chunk_size)]

    async def embed_documents(self, docs: List[str]) -> List[List[float]]:
        if not docs:
            return []

        # Use real Google embeddings if client is available
        if self.client:
            try:
                logger.info("Embedding %d documents using Google GenAI", len(docs))

                # Call Google embedding API
                response = self.client.models.embed_content(
                    model="text-embedding-004", contents=docs
                )

                # Extract embeddings from response
                if response.embeddings:
                    embeddings = []
                    for embedding in response.embeddings:
                        if embedding.values:
                            embeddings.append(embedding.values)
                        else:
                            logger.warning("Empty embedding values in response")
                            # Fallback to stub for this document
                            embeddings.append([0.0] * self.embed_dim)

                    # Update embed_dim based on actual response
                    if embeddings and embeddings[0]:
                        self.embed_dim = len(embeddings[0])

                    logger.info(
                        "Successfully generated %d embeddings with dimension %d",
                        len(embeddings),
                        self.embed_dim,
                    )
                    return embeddings
                else:
                    logger.error("No embeddings in response from Google API")
                    # Fall back to stub

            except Exception as e:
                logger.error(f"Google embedding API call failed: {e}")
                # Fall back to stub

        # Fallback to stub embeddings
        logger.info("Using stub embeddings for %d documents", len(docs))
        return [
            [float((i + 1) % 10) for _ in range(self.embed_dim)]
            for i, _ in enumerate(docs)
        ]

    async def embed_query(self, query: str) -> List[float]:
        res = await self.embed_documents([query])
        return res[0] if res else []

    def get_conversation_history(self, session_id: str) -> List[Dict[str, str]]:
        """Get conversation history for a session."""
        if not session_id:
            return []

        return self.conversation_store.get(session_id, [])

    def add_to_conversation_history(
        self, session_id: str, user_message: str, ai_response: str
    ):
        """Add a conversation turn to the history."""
        if not session_id:
            return

        if session_id not in self.conversation_store:
            self.conversation_store[session_id] = []

        # Add the new conversation turn
        conversation_turn = {
            "timestamp": time.time(),
            "user": user_message,
            "ai": ai_response,
        }

        self.conversation_store[session_id].append(conversation_turn)

        # Keep only the last N conversation turns
        if len(self.conversation_store[session_id]) > self.max_conversation_length:
            self.conversation_store[session_id] = self.conversation_store[session_id][
                -self.max_conversation_length :
            ]

        logger.info(
            f"Updated conversation history for session {session_id}: {len(self.conversation_store[session_id])} turns"
        )

    def clear_conversation_history(self, session_id: str):
        """Clear conversation history for a session."""
        if session_id in self.conversation_store:
            del self.conversation_store[session_id]
            logger.info(f"Cleared conversation history for session {session_id}")

    def get_conversation_context(self, session_id: str, max_turns: int = 5) -> str:
        """Get formatted conversation context for RAG prompts."""
        history = self.get_conversation_history(session_id)
        if not history:
            return ""

        # Get the last few conversation turns
        recent_history = history[-max_turns:] if len(history) > max_turns else history

        context_parts = []
        for turn in recent_history:
            context_parts.append(f"User: {turn['user']}")
            context_parts.append(f"AI: {turn['ai']}")

        return "\n".join(context_parts)

    async def run_rag_chat(
        self,
        query: str,
        top_k: int = 5,
        conversation_history: Optional[List[str]] = None,
        session_id: Optional[str] = None,
    ) -> str:
        # 1) embed query
        qvec = await self.embed_query(query)
        # 2) retrieve nearest docs
        try:
            hits = await qdrant_service.search_vectors(
                collection="default", query_vector=qvec, top_k=top_k
            )
        except Exception:
            hits = []

        retrieved_texts = []
        for h in hits:
            # qdrant client returns objects with payload
            payload = getattr(h, "payload", None) or {}
            txt = payload.get("text") if isinstance(payload, dict) else str(payload)
            if txt:
                retrieved_texts.append(txt)

        # 3) build prompt with retrieved context and conversation history
        context = "\n\n".join(retrieved_texts[:top_k])

        # Get conversation context if session_id is provided
        conversation_context = ""
        if session_id:
            conversation_context = self.get_conversation_context(
                session_id, max_turns=3
            )
            if conversation_context:
                logger.info(f"Using conversation history for session {session_id}")

        # 4) call generator using LangChain
        if self.chat_client:
            try:
                logger.info(
                    "Calling LangChain Google GenAI with %d retrieved docs and conversation context",
                    len(retrieved_texts),
                )

                # Build comprehensive context
                context_parts = []
                if context.strip():
                    context_parts.append(f"Retrieved Document Context:\n{context}")
                if conversation_context:
                    context_parts.append(
                        f"Recent Conversation:\n{conversation_context}"
                    )

                full_context = "\n\n".join(context_parts) if context_parts else ""

                # Create messages for RAG chat with conversation awareness
                system_prompt = """You are a helpful AI assistant that provides accurate and contextual responses.

Guidelines:
- Use the retrieved document context to provide accurate, factual information
- Consider the conversation history to maintain context and avoid repetition
- If the context doesn't contain relevant information, provide a helpful general response
- Be conversational and maintain context across the conversation
- If asked for clarification, ask specific questions
- Provide comprehensive but concise responses"""

                system_message = SystemMessage(content=system_prompt)

                # Build user message with all available context
                user_content_parts = []
                if full_context:
                    user_content_parts.append(f"Available Context:\n{full_context}")
                user_content_parts.append(f"Current Question: {query}")

                user_message = HumanMessage(content="\n\n".join(user_content_parts))

                # Get response from LangChain
                response = self.chat_client.invoke([system_message, user_message])
                reply = response.content
                logger.info(
                    "Successfully generated response using LangChain with conversation context"
                )

            except Exception as e:
                logger.error(f"LangChain chat generation failed: {e}")
                # Fall back to basic response
                reply = f"I found {len(retrieved_texts)} relevant documents but couldn't generate a response. Error: {str(e)}"

        else:
            # Fallback to stub response
            logger.info("Using stub response - no LangChain client available")
            if context.strip():
                reply = f"[Stub Reply] I retrieved {len(retrieved_texts)} documents related to your query. Here's a summary based on the context I found. (Install langchain-google-genai for real responses)"
            else:
                reply = f"[Stub Reply] I understand your question: '{query}'. (Install langchain-google-genai for real responses)"

        return reply


ai_service = AIService()


def initialize_qdrant_integration():
    """Initialize integration between AI service and Qdrant service."""
    try:
        from app.services.qdrant_service import qdrant_service

        # Get the ai_service instance from the module level
        import sys

        current_module = sys.modules[__name__]
        ai_service_instance = getattr(current_module, "ai_service", None)
        if ai_service_instance:
            qdrant_service.set_ai_service(ai_service_instance)
            logger.info("Qdrant-AI service integration initialized")
        else:
            logger.warning("ai_service instance not found")
    except Exception as e:
        logger.warning(f"Could not initialize Qdrant integration: {e}")


# Integration will be initialized when needed
# Call initialize_qdrant_integration() manually if required
