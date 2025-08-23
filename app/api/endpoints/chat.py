from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional

from app.utils.chat_bubble_template import CHAT_BUBBLE_HTML
from app.services.ai_service import ai_service

router = APIRouter()


class ChatRequest(BaseModel):
    query: str
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    message: str
    bubble_html: Optional[str] = None


@router.get("/bubble")
async def get_bubble():
    # returns HTML string that can be embedded directly
    return {"html": CHAT_BUBBLE_HTML}


@router.post("/send", response_model=ChatResponse)
async def send_chat(payload: ChatRequest):
    # run RAG pipeline
    answer = await ai_service.run_rag_chat(payload.query, top_k=5, conversation_history=None)
    return ChatResponse(message=answer, bubble_html=None)
