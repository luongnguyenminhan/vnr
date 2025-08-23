from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
import uuid
import time

from app.utils.chat_bubble_template import CHAT_BUBBLE_HTML
from app.services.ai_service import ai_service

router = APIRouter()


class ChatRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=1000, description="User query")
    session_id: Optional[str] = Field(
        None, description="Session ID for conversation continuity"
    )


class ChatResponse(BaseModel):
    message: str
    session_id: str
    bubble_html: Optional[str] = None
    timestamp: float
    status: str = "success"


@router.get("/bubble")
async def get_bubble():
    """Returns the HTML snippet for the chat bubble widget."""
    try:
        print("🎈 Chat bubble endpoint called")
        bubble_size = len(CHAT_BUBBLE_HTML)
        print(f"📄 Chat bubble HTML size: {bubble_size} characters")
        return {"html": CHAT_BUBBLE_HTML, "status": "success"}
    except Exception as e:
        print(f"❌ Error loading chat bubble: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"Failed to load chat bubble: {str(e)}"
        )


@router.post("/send", response_model=ChatResponse)
async def send_chat(payload: ChatRequest):
    """Send a chat message and get AI response using RAG."""
    request_start_time = time.time()
    request_id = str(uuid.uuid4())[:8]

    try:
        # Log request details
        print(f"\n🚀 CHAT REQUEST STARTED - ID: {request_id}")
        print(f"📝 Query: {payload.query}")
        print(f"🔑 Session ID: {payload.session_id}")
        print(
            f"📊 Query length: {len(payload.query) if payload.query else 0} characters"
        )
        print(
            f"⏰ Request start time: {time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(request_start_time))}"
        )

        # Validate query
        if not payload.query or not payload.query.strip():
            print("❌ Query validation failed: Empty query")
            raise HTTPException(status_code=400, detail="Query cannot be empty")

        print("✅ Query validation passed")

        # Generate or validate session_id
        session_id = payload.session_id
        if not session_id:
            session_id = str(uuid.uuid4())
            print(f"🔄 Generated new session ID: {session_id}")
        else:
            print(f"✅ Using existing session ID: {session_id}")

        # Check conversation history
        existing_history = ai_service.get_conversation_history(session_id)
        print(f"📚 Existing conversation turns: {len(existing_history)}")

        # Run RAG pipeline with session-based conversation history
        print("🤖 Starting RAG pipeline...")
        rag_start_time = time.time()
        answer = await ai_service.run_rag_chat(
            payload.query.strip(),
            top_k=5,
            session_id=session_id,
        )
        rag_processing_time = time.time() - rag_start_time

        print(f"⏱️ RAG processing time: {rag_processing_time:.2f}s")
        print(f"💬 Answer length: {len(answer) if answer else 0} characters")

        if not answer:
            print("❌ RAG pipeline failed: No answer generated")
            raise HTTPException(status_code=500, detail="Failed to generate response")

        print("✅ RAG pipeline completed successfully")

        # Store the conversation turn in history
        print("💾 Storing conversation turn in history...")
        ai_service.add_to_conversation_history(
            session_id, payload.query.strip(), answer
        )

        # Get updated history to verify storage
        updated_history = ai_service.get_conversation_history(session_id)
        print(f"📚 Updated conversation turns: {len(updated_history)}")

        # Calculate total request time
        total_time = time.time() - request_start_time
        print(f"⏱️ Total request time: {total_time:.2f}s")

        response_data = ChatResponse(
            message=answer,
            session_id=session_id,
            bubble_html=None,
            timestamp=time.time(),
            status="success",
        )

        print(f"⏱️ RAG processing time: {rag_processing_time:.2f}s")
        print(f"📊 Response data size: {len(str(response_data.dict()))} characters")
        print(f"🎉 CHAT REQUEST COMPLETED - ID: {request_id}")
        print("=" * 60)

        return response_data

    except HTTPException as e:
        print(f"❌ HTTP Exception in chat request {request_id}: {e.detail}")
        raise
    except Exception as e:
        print(f"❌ Unexpected error in chat request {request_id}: {str(e)}")
        print(f"🔍 Exception type: {type(e).__name__}")
        print(f"📍 Exception args: {e.args}")
        import traceback

        print(f"📄 Traceback:\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Chat processing failed: {str(e)}")


@router.get("/health")
async def health_check():
    """Health check endpoint for the chat service."""
    try:
        print("❤️ Health check endpoint called")

        # Check if AI service is available
        ai_available = (
            ai_service.client is not None or ai_service.chat_client is not None
        )

        langgraph_available = ai_service.rag_app is not None

        print(f"🤖 AI Service Available: {ai_available}")
        print(f"🔄 LangGraph Available: {langgraph_available}")
        print(f"📊 Conversation Sessions: {len(ai_service.conversation_store)}")

        status = "healthy" if ai_available else "degraded"

        return {
            "status": status,
            "service": "chat",
            "ai_available": ai_available,
            "langgraph_available": langgraph_available,
            "conversation_sessions": len(ai_service.conversation_store),
            "timestamp": time.time(),
        }
    except Exception as e:
        print(f"❌ Health check error: {str(e)}")
        return {
            "status": "unhealthy",
            "service": "chat",
            "error": str(e),
            "timestamp": time.time(),
        }


@router.delete("/conversation/{session_id}")
async def clear_conversation(session_id: str):
    """Clear conversation history for a specific session."""
    try:
        print(f"🗑️ Clear conversation endpoint called for session: {session_id}")
        ai_service.clear_conversation_history(session_id)
        print(f"✅ Conversation history cleared for session: {session_id}")
        return {
            "status": "success",
            "message": f"Conversation history cleared for session {session_id}",
            "session_id": session_id,
        }
    except Exception as e:
        print(f"❌ Error clearing conversation for session {session_id}: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"Failed to clear conversation: {str(e)}"
        )


@router.get("/conversation/{session_id}")
async def get_conversation_history(session_id: str):
    """Get conversation history for a specific session."""
    try:
        print(f"📝 Get conversation history endpoint called for session: {session_id}")
        history = ai_service.get_conversation_history(session_id)
        print(
            f"📚 Retrieved {len(history)} conversation turns for session: {session_id}"
        )
        return {
            "status": "success",
            "session_id": session_id,
            "history": history,
            "total_turns": len(history),
        }
    except Exception as e:
        print(
            f"❌ Error retrieving conversation history for session {session_id}: {str(e)}"
        )
        raise HTTPException(
            status_code=500, detail=f"Failed to retrieve conversation history: {str(e)}"
        )
