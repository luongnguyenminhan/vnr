from typing import List, Optional, Dict, Any
from app.core.config import settings, logger

import time

# LangChain and LangGraph imports for chat generation
try:
    from langchain_google_genai import ChatGoogleGenerativeAI
    from langchain_core.messages import (
        HumanMessage,
        SystemMessage,
    )

    # LangGraph imports for workflow management
    from langgraph.graph import StateGraph, END
    from typing_extensions import TypedDict

    LANGCHAIN_AVAILABLE = True
    LANGGRAPH_AVAILABLE = True
except ImportError as e:
    logger.warning(
        f"LangChain/LangGraph components not available: {e} - install with: pip install langchain-google-genai langgraph"
    )
    LANGCHAIN_AVAILABLE = False
    LANGGRAPH_AVAILABLE = False


# LangGraph State Definition
class RAGState(TypedDict):
    """State for the RAG workflow"""

    query: str
    session_id: Optional[str]
    retrieved_documents: List[str]
    conversation_context: str
    response: str
    metadata: Dict[str, Any]


class AIService:
    def __init__(self):
        self.embed_dim = 768  # Will be determined from actual embeddings
        self.client = None  # For embeddings
        self.chat_client = None  # For LangChain chat
        self.conversation_store = (
            {}
        )  # In-memory conversation storage: session_id -> conversation
        self.max_conversation_length = 10  # Maximum turns to keep in memory
        self.workflow = None  # LangGraph workflow
        self.rag_app = None  # Compiled LangGraph app

        if settings.GOOGLE_API_KEY and LANGCHAIN_AVAILABLE:
            try:
                # Initialize embeddings client (using Google GenAI through LangChain)
                import google.generativeai as genai

                genai.configure(api_key=settings.GOOGLE_API_KEY)
                self.client = genai
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

                    # Initialize LangGraph workflow if available
                    if LANGGRAPH_AVAILABLE:
                        self._setup_langgraph_workflow()
                        logger.info("LangGraph workflow initialized successfully")
                    else:
                        logger.warning(
                            "LangGraph not available - using direct LangChain"
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

    def chunk_text(self, text: str, chunk_size: int = 3000) -> List[str]:
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
                embeddings = []
                for doc in docs:
                    result = self.client.embed_content(
                        model="models/text-embedding-004",
                        content=doc,
                        task_type="retrieval_document",
                    )
                    if result and "embedding" in result:
                        embeddings.append(result["embedding"])
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
        if self.client:
            try:
                # Use query-specific embedding
                result = self.client.embed_content(
                    model="models/text-embedding-004",
                    content=query,
                    task_type="retrieval_query",
                )
                if result and "embedding" in result:
                    return result["embedding"]
            except Exception as e:
                logger.error(f"Query embedding failed: {e}")

        # Fallback to document embedding approach
        res = await self.embed_documents([query])
        return res[0] if res else []

    def _setup_langgraph_workflow(self):
        """Setup LangGraph workflow for RAG chat"""
        if not LANGGRAPH_AVAILABLE or not self.chat_client:
            return

        # Create the workflow
        self.workflow = StateGraph(RAGState)

        # Add nodes
        self.workflow.add_node("retrieve_documents", self._retrieve_documents_node)
        self.workflow.add_node(
            "get_conversation_context", self._get_conversation_context_node
        )
        self.workflow.add_node("generate_response", self._generate_response_node)
        self.workflow.add_node("format_output", self._format_output_node)

        # Define the flow
        self.workflow.set_entry_point("retrieve_documents")
        self.workflow.add_edge("retrieve_documents", "get_conversation_context")
        self.workflow.add_edge("get_conversation_context", "generate_response")
        self.workflow.add_edge("generate_response", "format_output")
        self.workflow.add_edge("format_output", END)

        # Compile the workflow
        self.rag_app = self.workflow.compile()
        logger.info("LangGraph RAG workflow compiled successfully")

    async def _retrieve_documents_node(self, state: RAGState) -> Dict[str, Any]:
        """Node to retrieve documents from Qdrant"""
        try:
            from app.services.qdrant_service import qdrant_service

            # Embed the query
            query_vector = await self.embed_query(state["query"])

            # Search for relevant documents
            hits = await qdrant_service.search_vectors(
                collection="default", query_vector=query_vector, top_k=5
            )

            # Extract document texts
            retrieved_texts = []
            for h in hits:
                payload = getattr(h, "payload", None) or {}
                txt = payload.get("text") if isinstance(payload, dict) else str(payload)
                if txt:
                    retrieved_texts.append(txt)

            return {
                "retrieved_documents": retrieved_texts,
                "query": state["query"],
                "session_id": state["session_id"],
            }
        except Exception as e:
            logger.error(f"Document retrieval failed: {e}")
            return {
                "retrieved_documents": [],
                "query": state["query"],
                "session_id": state["session_id"],
            }

    def _get_conversation_context_node(self, state: RAGState) -> Dict[str, Any]:
        """Node to get conversation context"""
        conversation_context = ""
        if state["session_id"]:
            conversation_context = self.get_conversation_context(
                state["session_id"], max_turns=3
            )
            if conversation_context:
                logger.info(
                    f"Using conversation history for session {state['session_id']}"
                )

        return {
            "conversation_context": conversation_context,
            "retrieved_documents": state["retrieved_documents"],
            "query": state["query"],
            "session_id": state["session_id"],
        }

    async def _generate_response_node(self, state: RAGState) -> Dict[str, Any]:
        """Node to generate response using LangChain"""
        try:
            # Build context
            context_parts = []
            if state["retrieved_documents"]:
                context_parts.append(
                    f"Retrieved Document Context:\n{'\n\n'.join(state['retrieved_documents'])}"
                )
            if state["conversation_context"]:
                context_parts.append(
                    f"Recent Conversation:\n{state['conversation_context']}"
                )

            full_context = "\n\n".join(context_parts) if context_parts else ""

            # Create messages
            system_prompt = """You are a helpful AI assistant that provides accurate and contextual responses.

Guidelines:
- Use the retrieved document context to provide accurate, factual information
- Consider the conversation history to maintain context and avoid repetition
- If the context doesn't contain relevant information, provide a helpful general response
- Be conversational and maintain context across the conversation
- If asked for clarification, ask specific questions
- Provide comprehensive but concise responses
- Answer in Vietnamese when the query is in Vietnamese, English otherwise"""

            system_message = SystemMessage(content=system_prompt)

            # Build user message
            user_content_parts = []
            if full_context:
                user_content_parts.append(f"Available Context:\n{full_context}")
            user_content_parts.append(f"Current Question: {state['query']}")

            user_message = HumanMessage(content="\n\n".join(user_content_parts))

            # Generate response
            response = self.chat_client.invoke([system_message, user_message])

            return {
                "response": response.content,
                "retrieved_documents": state["retrieved_documents"],
                "conversation_context": state["conversation_context"],
                "query": state["query"],
                "session_id": state["session_id"],
                "metadata": {
                    "document_count": len(state["retrieved_documents"]),
                    "has_conversation_context": bool(state["conversation_context"]),
                },
            }
        except Exception as e:
            logger.error(f"Response generation failed: {e}")
            return {
                "response": f"I encountered an error while processing your request: {str(e)}",
                "retrieved_documents": state["retrieved_documents"],
                "conversation_context": state["conversation_context"],
                "query": state["query"],
                "session_id": state["session_id"],
                "metadata": {"error": str(e)},
            }

    def _format_output_node(self, state: RAGState) -> Dict[str, Any]:
        """Node to format final output"""
        return {
            "response": state["response"],
            "query": state["query"],
            "session_id": state["session_id"],
            "metadata": state["metadata"],
        }

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
        """Run RAG chat using LangGraph workflow or fallback to direct LangChain"""
        start_time = time.time()
        logger.info("🚀 STARTING RAG CHAT REQUEST")
        logger.info(f"📝 Query: {query}")
        logger.info(f"🔑 Session ID: {session_id}")
        logger.info(f"📊 Top K: {top_k}")
        logger.info(f"🤖 LangGraph Available: {LANGGRAPH_AVAILABLE}")
        logger.info(f"⚙️ Workflow Compiled: {self.rag_app is not None}")

        # Use LangGraph workflow if available
        if self.rag_app and LANGGRAPH_AVAILABLE:
            try:
                logger.info("🔄 Running RAG chat using LangGraph workflow")

                # Initialize state
                initial_state: RAGState = {
                    "query": query,
                    "session_id": session_id,
                    "retrieved_documents": [],
                    "conversation_context": "",
                    "response": "",
                    "metadata": {},
                }

                logger.info("📋 Initial state prepared")
                logger.info(f"🔍 State keys: {list(initial_state.keys())}")

                # Run the workflow
                logger.info("⚡ Executing LangGraph workflow...")
                workflow_start = time.time()
                result = await self.rag_app.ainvoke(initial_state)
                workflow_time = time.time() - workflow_start

                logger.info("✅ LangGraph workflow completed")
                logger.info(f"⚡ Workflow execution time: {workflow_time:.2f}s")
                logger.info(f"📄 Result keys: {list(result.keys())}")
                logger.info(f"💬 Response length: {len(result.get('response', ''))}")
                logger.info(
                    f"📚 Retrieved docs: {len(result.get('retrieved_documents', []))}"
                )

                # Update conversation history if session_id is provided
                if session_id and result["response"]:
                    logger.info("💾 Updating conversation history")
                    self.add_to_conversation_history(
                        session_id, query, result["response"]
                    )
                    logger.info("✅ Conversation history updated")

                total_time = time.time() - start_time
                logger.info(f"⏱️ Total processing time: {total_time:.2f}s")
                logger.info("🎉 RAG CHAT REQUEST COMPLETED SUCCESSFULLY")

                return result["response"]

            except Exception as e:
                logger.error(f"❌ LangGraph workflow failed: {e}")
                logger.error(f"🔍 Exception type: {type(e).__name__}")
                logger.error(f"📍 Exception args: {e.args}")
                logger.exception("Full traceback:")
                # Fall back to direct LangChain approach
                return await self._fallback_rag_chat(query, top_k, session_id)

        else:
            logger.info("🔄 Using direct LangChain approach (LangGraph not available)")
            # Use direct LangChain approach
            return await self._fallback_rag_chat(query, top_k, session_id)

    async def _fallback_rag_chat(
        self,
        query: str,
        top_k: int = 5,
        session_id: Optional[str] = None,
    ) -> str:
        """Fallback RAG chat using direct LangChain (original implementation)"""
        # 1) embed query
        qvec = await self.embed_query(query)
        # 2) retrieve nearest docs
        try:
            from app.services.qdrant_service import qdrant_service

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
- Provide comprehensive but concise responses
- Answer in Vietnamese when the query is in Vietnamese, English otherwise"""

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

        # Update conversation history if session_id is provided
        if session_id and reply:
            self.add_to_conversation_history(session_id, query, reply)

        return reply

    def get_workflow_status(self) -> Dict[str, Any]:
        """Get status information about the LangGraph workflow"""
        return {
            "langchain_available": LANGCHAIN_AVAILABLE,
            "langgraph_available": LANGGRAPH_AVAILABLE,
            "google_client_available": self.client is not None,
            "chat_client_available": self.chat_client is not None,
            "workflow_initialized": self.workflow is not None,
            "rag_app_compiled": self.rag_app is not None,
            "embedding_dimension": self.embed_dim,
            "conversation_sessions": len(self.conversation_store),
        }

    def get_langgraph_workflow_graph(self) -> Optional[str]:
        """Get the LangGraph workflow graph as Mermaid format for visualization"""
        if self.rag_app:
            try:
                return self.rag_app.get_graph().draw_mermaid()
            except Exception as e:
                logger.warning(f"Could not generate workflow graph: {e}")
                return None
        return None


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
