from fastapi import APIRouter, File, UploadFile, Form, HTTPException, Request
from fastapi.responses import HTMLResponse
from typing import List

from app.core.config import settings
from app.services import qdrant_service
from app.services.ai_service import ai_service

router = APIRouter()


def verify_password(pw: str):
    if pw != settings.DEFAULT_ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="unauthorized")


@router.post("/upload")
async def upload(file: UploadFile = File(None), url: str | None = Form(None), collection: str = Form(...), password: str = Form(...)):
    verify_password(password)
    text = ""
    if file:
        data = await file.read()
        text = data.decode(errors="ignore")
    elif url:
        # minimal URL fetch
        import httpx
        resp = httpx.get(url)
        resp.raise_for_status()
        text = resp.text
    else:
        raise HTTPException(status_code=400, detail="file or url required")

    chunks = ai_service.chunk_text(text)
    vectors = await ai_service.embed_documents(chunks)
    dim = len(vectors[0]) if vectors else 0
    await qdrant_service.create_collection_if_not_exist(collection, dim)
    await qdrant_service.upsert_vectors(collection, vectors, payloads=[{"text": c} for c in chunks])
    return {"status": "ok", "collection": collection, "chunks": len(chunks)}


@router.delete("/corpus/{collection}")
async def delete_collection(collection: str, password: str = Form(...)):
    verify_password(password)
    await qdrant_service.delete_collection(collection)
    return {"status": "deleted", "collection": collection}


@router.get("/status")
async def status():
    cols = await qdrant_service.list_collections()
    return {"collections": cols}


@router.get("/ui", response_class=HTMLResponse)
async def admin_ui(request: Request):
    # simple admin UI form
    html = """
    <html><body>
    <h2>Admin - Upload Corpus (password required)</h2>
    <form action="/admin/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="file" /> <br/>
      or URL: <input type="text" name="url" /> <br/>
      Collection name: <input type="text" name="collection" required /> <br/>
      Password: <input type="password" name="password" required /> <br/>
      <button type="submit">Upload</button>
    </form>

    <h3>Delete collection</h3>
    <form action="/admin/corpus/" method="post" onsubmit="event.preventDefault(); fetch('/admin/corpus/' + document.getElementById('delname').value, {method:'DELETE', body:new URLSearchParams({password:document.getElementById('delpw').value})}).then(r=>r.json()).then(j=>alert(JSON.stringify(j)))">
      Collection: <input id="delname" type="text" name="collection" /> <br/>
      Password: <input id="delpw" type="password" name="password" /> <br/>
      <button type="submit">Delete</button>
    </form>
    </body></html>
    """
    return HTMLResponse(content=html)
