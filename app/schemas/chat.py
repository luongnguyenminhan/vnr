from pydantic import BaseModel
from typing import Optional, List


class ChatRequest(BaseModel):
    query: str
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    message: str
    bubble_html: Optional[str] = None
