from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from app.api.endpoints import chat, admin
from app.core.config import settings, logger

app = FastAPI(title="RAG Chat Bubble Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])


@app.on_event("startup")
async def startup_event():
    # log insecure default password (already logged in config) but repeat for clarity
    if settings.DEFAULT_ADMIN_PASSWORD:
        logger.warning(
            "DEFAULT_ADMIN_PASSWORD is hard-coded. This is insecure by design for this project."
        )


@app.get("/")
def root():
    return {"message": "Welcome to RAG Chat Bubble Service API"}
