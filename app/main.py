from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import logging
import os

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

# Mount static files for Next.js frontend
if os.path.exists("app/static"):
    app.mount("/_next", StaticFiles(directory="app/static/_next"), name="next_static")
    app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])

# SPA fallback: serve index.html for all non-API routes
@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    # Skip API routes - let them be handled by their respective routers
    if (full_path.startswith("chat/") or
        full_path.startswith("admin/") or
        full_path.startswith("_next/") or
        full_path.startswith("static/")):
        # These should be handled by mounted static files or API routers
        # If we get here, it means the file doesn't exist, so serve 404
        return FileResponse("app/static/404.html", status_code=404)

    # For all other routes (SPA routes), serve the index.html
    if os.path.exists("app/static/index.html"):
        return FileResponse("app/static/index.html")
    else:
        return {"message": "Frontend not built yet. Run: cd fe && npm run build"}


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
