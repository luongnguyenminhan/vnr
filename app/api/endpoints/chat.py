from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List
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
        return {"html": CHAT_BUBBLE_HTML, "status": "success"}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to load chat bubble: {str(e)}"
        )


@router.post("/send", response_model=ChatResponse)
async def send_chat(payload: ChatRequest):
    """Send a chat message and get AI response using RAG."""
    try:
        # Validate query
        if not payload.query or not payload.query.strip():
            raise HTTPException(status_code=400, detail="Query cannot be empty")

        # Generate or validate session_id
        session_id = payload.session_id
        if not session_id:
            session_id = str(uuid.uuid4())

        # Run RAG pipeline with session-based conversation history
        start_time = time.time()
        answer = await ai_service.run_rag_chat(
            payload.query.strip(),
            top_k=5,
            session_id=session_id,
        )
        processing_time = time.time() - start_time

        if not answer:
            raise HTTPException(status_code=500, detail="Failed to generate response")

        # Store the conversation turn in history
        ai_service.add_to_conversation_history(
            session_id, payload.query.strip(), answer
        )

        return ChatResponse(
            message=answer,
            session_id=session_id,
            bubble_html=None,
            timestamp=time.time(),
            status="success",
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat processing failed: {str(e)}")


@router.get("/health")
async def health_check():
    """Health check endpoint for the chat service."""
    try:
        # Check if AI service is available
        ai_available = (
            ai_service.client is not None or ai_service.chat_client is not None
        )

        return {
            "status": "healthy" if ai_available else "degraded",
            "service": "chat",
            "ai_available": ai_available,
            "timestamp": time.time(),
        }
    except Exception as e:
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
        ai_service.clear_conversation_history(session_id)
        return {
            "status": "success",
            "message": f"Conversation history cleared for session {session_id}",
            "session_id": session_id,
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to clear conversation: {str(e)}"
        )


@router.get("/conversation/{session_id}")
async def get_conversation_history(session_id: str):
    """Get conversation history for a specific session."""
    try:
        history = ai_service.get_conversation_history(session_id)
        return {
            "status": "success",
            "session_id": session_id,
            "history": history,
            "total_turns": len(history),
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to retrieve conversation history: {str(e)}"
        )
