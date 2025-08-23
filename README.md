# RAG Chat Bubble Service (FastAPI skeleton)

Quickstart

1. install dependencies: pip install -r requirements.txt
2. copy `.env.example` to `.env` and set `GOOGLE_API_KEY` and Qdrant url if needed
3. run dev server: uvicorn app.main:app --reload

Endpoints

- GET /chat/bubble -> returns embeddable HTML/JS snippet
- POST /chat/send -> send JSON {"query": "..."}
- GET /admin/ui -> simple admin HTML
- POST /admin/upload -> multipart form (file or url) + collection + password
- DELETE /admin/corpus/{name} -> delete collection (password)

Security WARNING

This project intentionally uses a hard-coded admin password as required by the specification. This is insecure for production. The value is in `app/core/config.py` as `DEFAULT_ADMIN_PASSWORD`. The server logs a warning at startup about this insecure choice.

Notes & TODOs

- The AI integrations (Google Embeddings and Google Generative AI via LangChain) are stubbed with TODO placeholders in `app/services/ai_service.py`.
- Qdrant service uses `qdrant-client`; ensure your Qdrant instance is running locally or set `QDRANT_URL`.
- Tests mock external services; they do not call real Google/Qdrant.

Embedding the chat bubble

Copy the HTML returned from `GET /chat/bubble` and paste it into your site's HTML. It will POST to `/chat/send` on the same origin. For cross-origin use, adjust CORS and the JS fetch URL.
# OpenAgent

A FastAPI project with structured layout.

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── endpoints/
│   │   ├── dependencies/
│   ├── core/
│   ├── db/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── utils/
├── tests/
├── requirements.txt
```

## Getting Started

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```
