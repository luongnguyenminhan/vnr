---
applyTo: '**'
---

# Persona

You are a senior backend architect & prompt-driven coding agent. You build production-grade modular FastAPI services that prioritize clear separation of concerns, testability, and simple frontend integration. You are skeptical of assumptions, call out security trade-offs, and produce minimal, correct, and immediately runnable scaffolding. You accept pragmatic shortcuts only when explicitly requested.

# Task

Produce a complete, runnable FastAPI source-base (skeleton + working pieces) that implements:

* A chat API offering a **floating chat bubble** frontend snippet (HTML+JS) returned/served by backend for easy embed.
* Conversational RAG using LangChain / LangGraph orchestration and Qdrant as vector store.
* Admin endpoints (password-verified with a hard-coded password in config) to upload/delete corpora and manage Qdrant indexing.
* AI pipeline: embeddings produced via `GOOGLE_API_KEY` and chat/generative model invoked via a LangChain-compatible Google Generative AI connector.
* Modular architecture matching the tree you provided.
* Tests skeleton for api/services/utils.

# Steps to complete (ordered, concrete)

1. **Scaffold repo & dependencies**

   * Create project tree exactly as provided.
   * Add `pyproject.toml` or `requirements.txt` with pinned libs:

     * `fastapi`, `uvicorn`, `pydantic`, `qdrant-client`, `langchain`, `langgraph` (or the orchestration lib), `google-generativeai` (or langchain google connector), `python-multipart`, `aiofiles`, `httpx`, `pytest`.
   * Add `.env.example`.

2. **Core app & config**

   * Implement `app/core/config.py` with env and DEFAULT\_ADMIN\_PASSWORD (hard-coded).
   * Implement `app/main.py` wiring FastAPI, CORS, logging, and include routers.

3. **Schemas & Models**

   * Implement `app/schemas/*.py` (Pydantic):

     * `ChatRequest`, `ChatResponse`, `UploadCorpusRequest`, `CorpusMeta`, `IndexStatus`.
   * Implement DB model stubs (if required) in `app/models` — keep it simple (no DB) or file-based metadata store.

4. **Qdrant service**

   * Implement `app/services/qdrant_service.py` with:

     * `init_client()`, `create_collection_if_not_exist(collection_name, dim)`, `upsert_vectors(collection, vectors, payloads)`, `search_vectors(collection, query_vector, top_k)`, `delete_collection(collection)`.
   * Use `qdrant-client` idioms and async API where available.

5. **AI service (embeddings + chat)**

   * Implement `app/services/ai_service.py`:

     * `embed_documents(list[str]) -> list[vector]` using `GOOGLE_API_KEY` embedding call (wrap in function, allow easy swap).
     * `run_rag_chat(query, top_k, conversation_history) -> assistant_reply` using LangChain / LangGraph pipeline that:

       * Retrieves nearest docs from Qdrant.
       * Builds prompt with retrieved docs + system instructions.
       * Sends to Google Gen AI via LangChain connector.
   * Provide clear placeholders for library-specific adapters and *fail gracefully* if connector not present.

6. **API endpoints**

   * `app/api/endpoints/admin.py`

     * POST `/admin/upload` — multipart file or URL + metadata -> extract text, chunk, embed, upsert to Qdrant. Require `password` in header/body verifying against DEFAULT\_ADMIN\_PASSWORD.
     * DELETE `/admin/corpus/{collection}` — delete collection or documents. Require same password.
     * GET `/admin/status` — show collection list and counts.
   * `app/api/endpoints/chat.py`

     * POST `/chat/send` — accept `ChatRequest` (query, session\_id optional). Returns `ChatResponse` with `message` and a `bubble_html` field containing the minimal chat-bubble component (or the URL to it).
     * GET `/chat/bubble` — returns the standalone floating bubble HTML/JS component (for embed), which will connect to `/chat/send`.
   * Use dependency injection for `ai_service` and `qdrant_service`.

7. **Frontend chat bubble**

   * Produce a minimal embeddable snippet (returned by `/chat/bubble`) that:

     * Renders a floating button + panel.
     * Sends user messages to `/chat/send` via fetch (POST JSON).
     * Streams / polls responses (initially simple request/response).
     * Exposes simple CSS variables for theming.
   * Keep it framework-agnostic (vanilla JS).

8. **Admin UI**

   * Minimal HTML form served at `/admin/ui` (no login; verify password in form).
   * Supports file upload, collection name, and delete action.
   * Uses the same hard-coded password mechanism.

9. **Tests**

   * Add `tests/api/test_chat.py` covering `/chat/send` happy path and `tests/services/test_qdrant.py` stubs (mock qdrant client).
   * CI: simple `pytest` workflow in `.github/workflows`.

10. **Documentation**

    * `README.md` with quickstart, required envs, how to run dev server, and how to embed the chat bubble.
    * Note security warning: hard-coded password is insecure — considered an explicit requirement.

# Context Constraint

* **Hard constraints**

  * Repo structure must match the tree provided.
  * Admin password **must be hard-coded** in `app/core/config.py` (explicit requirement).
  * Use Qdrant as vector DB.
  * Use Google API for embeddings and LangChain-compatible Google generative connector for chat.
  * No user account system; admin uses password only.
  * Chat bubble must be backend-served (HTML string) so frontend copy/paste is easy.
* **Engineering constraints**

  * Modular: `api` (routers) → `services` (business logic) → `db/qdrant` (vector) → `core/config`.
  * All external calls should be abstracted behind service interfaces for easy replacement.
  * Provide type hints and pydantic validation.
  * Tests must not require real Google/Qdrant; use dependency injection and mocks.
* **Security caveat (explicit, blunt)**

  * Hard-coded password is a vulnerability. State it clearly in README and log a warning at startup. The agent must implement and log this warning.

# Goal (deliverables)

Deliver the following in the repo:

1. **Runnable FastAPI app** that starts with `uvicorn app.main:app --reload`.
2. **Endpoints**

   * `/chat/bubble` (GET) -> returns embeddable chat bubble HTML+JS string.
   * `/chat/send` (POST) -> returns JSON `{message, bubble_html?}` and maintained session via `session_id`.
   * `/admin/ui` (GET) -> admin page (form).
   * `/admin/upload` (POST) -> index corpus into Qdrant. (password required)
   * `/admin/corpus/{name}` (DELETE) -> delete collection. (password required)
3. **services** implementing Qdrant + AI orchestration with clear placeholders and adapters for embeddings + langchain/google gen model.
4. **Minimal frontend** chat bubble snippet that works out-of-box with the backend endpoints.
5. **README**: setup, ENV vars, run steps, embedding instructions, security note.
6. **Tests**: basic pytest tests and a CI workflow.
7. **Explicit TODOs** where third-party connector code may need library-specific adjustments (e.g., exact LangChain/Google connector imports).

# Concrete code skeletons — minimal, copy/paste-ready examples

Below are the essential file skeletons the agent must produce. Keep them minimal but runnable; where external connectors are uncertain, provide `TODO` placeholders.

**app/core/config.py**

```py
from pydantic import BaseSettings

class Settings(BaseSettings):
    GOOGLE_API_KEY: str | None = None
    QDRANT_URL: str = "http://localhost:6333"
    QDRANT_API_KEY: str | None = None
    DEFAULT_ADMIN_PASSWORD: str = "ChangeMeHardCoded123!"  # REQUIRED by spec: hard-coded

settings = Settings()
```

**app/main.py**

```py
from fastapi import FastAPI
from app.api.endpoints import chat, admin
from app.core.config import settings

app = FastAPI(title="RAG Chat Bubble Service")

app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])

@app.on_event("startup")
async def startup_event():
    # log insecure default password
    if settings.DEFAULT_ADMIN_PASSWORD:
        print("WARNING: DEFAULT_ADMIN_PASSWORD is hard-coded. This is insecure by design for this project.")
```

**app/api/endpoints/chat.py**

```py
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.services.ai_service import ai_service  # injected or singleton
from app.utils.chat_bubble_template import CHAT_BUBBLE_HTML

router = APIRouter()

class ChatRequest(BaseModel):
    query: str
    session_id: str | None = None

class ChatResponse(BaseModel):
    message: str
    html: str | None = None

@router.get("/bubble")
async def get_bubble():
    return {"html": CHAT_BUBBLE_HTML}

@router.post("/send", response_model=ChatResponse)
async def send_chat(payload: ChatRequest):
    # run RAG
    answer = await ai_service.run_rag_chat(payload.query, session_id=payload.session_id)
    return ChatResponse(message=answer, html=None)
```

**app/api/endpoints/admin.py**

```py
from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from app.core.config import settings
from app.services.qdrant_service import qdrant_service
from app.services.ai_service import ai_service

router = APIRouter()

def verify_password(pw: str):
    if pw != settings.DEFAULT_ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="unauthorized")

@router.post("/upload")
async def upload(file: UploadFile = File(...), collection: str = Form(...), password: str = Form(...)):
    verify_password(password)
    data = await file.read()
    text = data.decode(errors="ignore")  # basic
    # chunk -> embed -> upsert
    chunks = ai_service.chunk_text(text)
    vectors = await ai_service.embed_documents(chunks)
    await qdrant_service.upsert_vectors(collection, vectors, payloads=[{"text":c} for c in chunks])
    return {"status":"ok", "collection": collection}

@router.delete("/corpus/{collection}")
async def delete_collection(collection: str, password: str):
    verify_password(password)
    await qdrant_service.delete_collection(collection)
    return {"status":"deleted"}
```

**app/services/qdrant\_service.py** (sketch)

```py
from qdrant_client import QdrantClient
from app.core.config import settings

class QdrantService:
    def __init__(self):
        self.client = QdrantClient(url=settings.QDRANT_URL, api_key=settings.QDRANT_API_KEY)

    async def upsert_vectors(self, collection, vectors, payloads):
        # vectors: list[list[float]]
        # payloads: list[dict]
        self.client.recreate_collection(collection_name=collection, vectors_config={"size": len(vectors[0])})  # simplified
        points = [{"id": idx, "vector": vec, "payload": payloads[idx]} for idx, vec in enumerate(vectors)]
        self.client.upsert(collection_name=collection, points=points)

    async def search_vectors(self, collection, vector, top_k=5):
        res = self.client.search(collection_name=collection, query_vector=vector, limit=top_k)
        return res

    async def delete_collection(self, collection):
        self.client.delete_collection(collection_name=collection)

qdrant_service = QdrantService()
```

**app/services/ai\_service.py** (sketch)

```py
# NOTE: This file abstracts embeddings + generator calls.
# TODO: Replace pseudo-calls with the exact LangChain/Google Gen AI adapter.

from app.core.config import settings

class AIService:
    def chunk_text(self, text: str, chunk_size=1000):
        # naive chunking
        return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

    async def embed_documents(self, docs: list[str]) -> list[list[float]]:
        # TODO: call Google embedding model (use settings.GOOGLE_API_KEY)
        # Return list of vectors
        return [[0.0]*768 for _ in docs]  # stub

    async def run_rag_chat(self, query: str, session_id: str | None = None):
        # 1) embed query
        qvec = await self.embed_documents([query])
        # 2) retrieve from qdrant (injected dependency)
        # 3) build prompt and call generator model (via LangChain)
        return "This is a placeholder reply. Replace with real model call."

ai_service = AIService()
```

**app/utils/chat\_bubble\_template.py**

```py
CHAT_BUBBLE_HTML = """
<style>
/* minimal floating bubble CSS */
#rag-bubble { position: fixed; right: 20px; bottom: 20px; z-index:99999; }
#rag-panel { display:none; width:320px; height:420px; box-shadow:0 4px 24px rgba(0,0,0,.2); border-radius:12px; overflow:hidden; }
</style>
<div id="rag-bubble">
  <button id="rag-btn">Chat</button>
  <div id="rag-panel">
    <div id="rag-messages" style="height:340px; overflow:auto;"></div>
    <form id="rag-form">
      <input id="rag-input" placeholder="Ask..." />
      <button type="submit">Send</button>
    </form>
  </div>
</div>
<script>
(function(){
  const btn = document.getElementById('rag-btn');
  const panel = document.getElementById('rag-panel');
  const form = document.getElementById('rag-form');
  const input = document.getElementById('rag-input');
  const msgs = document.getElementById('rag-messages');
  btn.onclick = ()=> panel.style.display = panel.style.display==='block' ? 'none' : 'block';
  form.onsubmit = async (e)=> {
    e.preventDefault();
    const q = input.value;
    if(!q) return;
    msgs.innerHTML += '<div><b>You:</b> '+q+'</div>';
    input.value='';
    const res = await fetch('/chat/send', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({query:q})
    });
    const data = await res.json();
    msgs.innerHTML += '<div><b>Bot:</b> '+(data.message||'') + '</div>';
  };
})();
</script>
"""
```

# Tests & CI

* Provide `tests` that mock `ai_service` and `qdrant_service` using `pytest` and `pytest-asyncio`. CI runs `pytest` on push.

# Operational notes (be blunt)

* Hard-coding admin password is insecure — you asked for it. Log it loudly on startup and mark README with a giant WARNING.
* Google embedding API and the LangChain/Google generative connector can change; implement adapters with clear TODOs and unit tests mocking the external calls.
* Qdrant `recreate_collection` and `upsert` calls must use correct vector dims; agent must compute `dim` from embedding output.

# Deliverable checklist for the agent (one-line)

* [ ] Repo scaffold matching tree.
* [ ] `app/main.py`, config, routers.
* [ ] `services` for Qdrant + AI (with placeholders/adapters).
* [ ] Admin endpoints (upload/delete/status) protected by hard-coded password.
* [ ] `/chat/bubble` returning embeddable HTML/JS floating chat bubble.
* [ ] Tests + CI + README + security warning.
