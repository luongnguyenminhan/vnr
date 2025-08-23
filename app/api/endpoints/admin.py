from fastapi import APIRouter, File, UploadFile, Form, HTTPException, Request
from fastapi.responses import HTMLResponse
from typing import List
import logging

from app.core.config import settings
from app.services import qdrant_service
from app.services.ai_service import ai_service

router = APIRouter()

# Security logger for admin access
security_logger = logging.getLogger("vnr.security")


def verify_password(pw: str):
    """Verify admin password and log access attempts."""
    if pw != settings.DEFAULT_ADMIN_PASSWORD:
        security_logger.warning(f"❌ Failed admin authentication attempt")
        raise HTTPException(status_code=401, detail="unauthorized")

    security_logger.info("✅ Successful admin authentication")


@router.post("/upload")
async def upload(
    file: UploadFile = File(None),
    url: str | None = Form(None),
    collection: str = Form(...),
    password: str = Form(...),
):
    verify_password(password)

    # Validate inputs
    if not collection or not collection.strip():
        raise HTTPException(status_code=400, detail="Collection name is required")

    if not file and not url:
        raise HTTPException(status_code=400, detail="Either file or URL is required")

    # Extract text from file or URL
    text = ""
    try:
        if file:
            if file.size and file.size > 10 * 1024 * 1024:  # 10MB limit
                raise HTTPException(status_code=413, detail="File too large (max 10MB)")
            data = await file.read()
            text = data.decode(errors="ignore")
        elif url:
            # Validate URL format
            if not url.startswith(("http://", "https://")):
                raise HTTPException(
                    status_code=400, detail="URL must start with http:// or https://"
                )

            import httpx

            async with httpx.AsyncClient(timeout=30.0) as client:
                resp = await client.get(url)
                resp.raise_for_status()
                text = resp.text

        if not text.strip():
            raise HTTPException(status_code=400, detail="No text content found")

    except httpx.RequestError as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch URL: {str(e)}")
    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="File encoding not supported")

    # Process text and create embeddings
    try:
        chunks = ai_service.chunk_text(text)
        if not chunks:
            raise HTTPException(
                status_code=400, detail="No text chunks could be created"
            )

        vectors = await ai_service.embed_documents(chunks)
        if not vectors:
            raise HTTPException(status_code=500, detail="Failed to generate embeddings")

        dim = len(vectors[0]) if vectors else 0
        if dim == 0:
            raise HTTPException(status_code=500, detail="Invalid embedding dimension")

        # Create collection and upsert vectors
        collection_created = await qdrant_service.create_collection_if_not_exist(
            collection, dim
        )
        if collection_created is False and not await qdrant_service.collection_exists(
            collection
        ):
            raise HTTPException(status_code=500, detail="Failed to create collection")

        upsert_success = await qdrant_service.upsert_vectors(
            collection,
            vectors,
            payloads=[{"text": c, "chunk_index": i} for i, c in enumerate(chunks)],
        )

        if not upsert_success:
            raise HTTPException(status_code=500, detail="Failed to store vectors")

        return {
            "status": "success",
            "collection": collection,
            "chunks": len(chunks),
            "vectors": len(vectors),
            "dimension": dim,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")


@router.delete("/corpus/{collection}")
async def delete_collection(collection: str, password: str = Form(...)):
    verify_password(password)

    # Validate collection name
    if not collection or not collection.strip():
        raise HTTPException(status_code=400, detail="Collection name is required")

    try:
        delete_success = await qdrant_service.delete_collection(collection)
        if not delete_success:
            raise HTTPException(status_code=500, detail="Failed to delete collection")

        return {
            "status": "success",
            "message": f"Collection '{collection}' deleted successfully",
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Delete failed: {str(e)}")


@router.get("/status")
async def status():
    try:
        cols = await qdrant_service.list_collections()
        return {
            "status": "success",
            "collections": cols,
            "total_collections": len(cols),
            "qdrant_status": "connected" if cols is not None else "disconnected",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Status check failed: {str(e)}")


@router.get("/ui", response_class=HTMLResponse)
async def admin_ui(request: Request):
    """Enhanced admin UI with better styling and functionality."""

    # Get current status for display
    try:
        status_data = await status()
        collections = status_data.get("collections", [])
        qdrant_status = status_data.get("qdrant_status", "unknown")
    except:
        collections = []
        qdrant_status = "error"

    # Create collections table HTML
    collections_html = ""
    if collections:
        collections_html = """
        <div class="collections-section">
            <h3>Current Collections</h3>
            <table class="collections-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Vectors</th>
                        <th>Dimension</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        """

        for collection in collections:
            collections_html += f"""
                    <tr>
                        <td>{collection.get('name', 'N/A')}</td>
                        <td>{collection.get('vectors_count', 'N/A')}</td>
                        <td>{collection.get('dimension', 'N/A')}</td>
                        <td>{collection.get('status', 'N/A')}</td>
                        <td>
                            <button onclick="deleteCollection('{collection.get('name', '')}')"
                                    class="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
            """

        collections_html += """
                </tbody>
            </table>
        </div>
        """
    else:
        collections_html = """
        <div class="collections-section">
            <h3>Current Collections</h3>
            <p class="no-data">No collections found</p>
        </div>
        """

    html = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RAG Chat Admin Panel</title>
        <style>
            * {{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }}

            body {{
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                padding: 20px;
            }}

            .container {{
                max-width: 1200px;
                margin: 0 auto;
                background: white;
                border-radius: 12px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                overflow: hidden;
            }}

            .header {{
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }}

            .header h1 {{
                font-size: 2.5rem;
                margin-bottom: 10px;
            }}

            .header p {{
                opacity: 0.9;
                font-size: 1.1rem;
            }}

            .content {{
                padding: 30px;
            }}

            .section {{
                background: #f8f9fa;
                border-radius: 8px;
                padding: 25px;
                margin-bottom: 25px;
                border-left: 4px solid #667eea;
            }}

            .section h2 {{
                color: #333;
                margin-bottom: 20px;
                font-size: 1.5rem;
            }}

            .form-group {{
                margin-bottom: 20px;
            }}

            .form-group label {{
                display: block;
                margin-bottom: 5px;
                font-weight: 600;
                color: #333;
            }}

            .form-group input, .form-group select {{
                width: 100%;
                padding: 12px;
                border: 2px solid #e0e0e0;
                border-radius: 6px;
                font-size: 1rem;
                transition: border-color 0.3s;
            }}

            .form-group input:focus, .form-group select:focus {{
                outline: none;
                border-color: #667eea;
            }}

            .btn {{
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 12px 25px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 1rem;
                font-weight: 600;
                transition: transform 0.2s, box-shadow 0.2s;
            }}

            .btn:hover {{
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
            }}

            .btn-danger {{
                background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            }}

            .btn-danger:hover {{
                box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
            }}

            .btn:disabled {{
                opacity: 0.6;
                cursor: not-allowed;
                transform: none;
            }}

            .status-indicator {{
                display: inline-block;
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 600;
            }}

            .status-connected {{
                background: #d4edda;
                color: #155724;
            }}

            .status-disconnected {{
                background: #f8d7da;
                color: #721c24;
            }}

            .status-error {{
                background: #fff3cd;
                color: #856404;
            }}

            .collections-table {{
                width: 100%;
                border-collapse: collapse;
                margin-top: 15px;
            }}

            .collections-table th,
            .collections-table td {{
                padding: 12px;
                text-align: left;
                border-bottom: 1px solid #dee2e6;
            }}

            .collections-table th {{
                background: #f8f9fa;
                font-weight: 600;
                color: #495057;
            }}

            .btn-sm {{
                padding: 6px 12px;
                font-size: 0.9rem;
            }}

            .no-data {{
                color: #6c757d;
                font-style: italic;
                text-align: center;
                padding: 40px;
            }}

            .file-input-wrapper {{
                position: relative;
                display: inline-block;
                width: 100%;
            }}

            .file-input-wrapper input[type="file"] {{
                position: absolute;
                opacity: 0;
                width: 100%;
                height: 100%;
                cursor: pointer;
            }}

            .file-input-label {{
                display: block;
                padding: 12px;
                border: 2px dashed #dee2e6;
                border-radius: 6px;
                text-align: center;
                cursor: pointer;
                transition: border-color 0.3s;
            }}

            .file-input-label:hover {{
                border-color: #667eea;
            }}

            .alert {{
                padding: 15px;
                border-radius: 6px;
                margin-bottom: 20px;
                border-left: 4px solid;
            }}

            .alert-info {{
                background: #d1ecf1;
                border-left-color: #17a2b8;
                color: #0c5460;
            }}

            .alert-warning {{
                background: #fff3cd;
                border-left-color: #ffc107;
                color: #856404;
            }}

            .loading {{
                display: none;
                text-align: center;
                padding: 20px;
            }}

            .spinner {{
                border: 4px solid #f3f3f3;
                border-top: 4px solid #667eea;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
                margin: 0 auto 15px;
            }}

            @keyframes spin {{
                0% {{ transform: rotate(0deg); }}
                100% {{ transform: rotate(360deg); }}
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔧 RAG Chat Admin Panel</h1>
                <p>Manage your vector collections and upload documents</p>
            </div>

            <div class="content">
                <div class="alert alert-info">
                    <strong>System Status:</strong>
                    <span class="status-indicator status-{'connected' if qdrant_status == 'connected' else 'disconnected' if qdrant_status == 'disconnected' else 'error'}">
                        Qdrant: {qdrant_status.upper()}
                    </span>
                </div>

                <div class="section">
                    <h2>📤 Upload New Document</h2>
                    <form id="uploadForm" action="/admin/upload" method="post" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="file">Upload File</label>
                            <div class="file-input-wrapper">
                                <input type="file" id="file" name="file" accept=".txt,.pdf,.doc,.docx,.md">
                                <label for="file" class="file-input-label" id="fileLabel">
                                    Click to select a file (TXT, PDF, DOC, MD)
                                </label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="url">Or Provide URL</label>
                            <input type="url" id="url" name="url" placeholder="https://example.com/document.txt">
                        </div>

                        <div class="form-group">
                            <label for="collection">Collection Name</label>
                            <input type="text" id="collection" name="collection" required
                                   placeholder="Enter collection name (e.g., 'documents', 'knowledge-base')">
                        </div>

                        <div class="form-group">
                            <label for="password">Admin Password</label>
                            <input type="password" id="password" name="password" required>
                        </div>

                        <button type="submit" class="btn" id="uploadBtn">Upload Document</button>
                    </form>

                    <div class="loading" id="uploadLoading">
                        <div class="spinner"></div>
                        <p>Uploading and processing document...</p>
                    </div>
                </div>

                {collections_html}

                <div class="section">
                    <h2>🗑️ Delete Collection</h2>
                    <div class="alert alert-warning">
                        <strong>Warning:</strong> This action cannot be undone. All vectors in the collection will be permanently deleted.
                    </div>

                    <div class="form-group">
                        <label for="deleteCollection">Collection to Delete</label>
                        <select id="deleteCollection" required>
                            <option value="">Select a collection...</option>
                            {"".join([f"<option value='{c.get('name')}'>{c.get('name')} ({c.get('vectors_count', 0)} vectors)</option>" for c in collections])}
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="deletePassword">Admin Password</label>
                        <input type="password" id="deletePassword" required>
                    </div>

                    <button type="button" class="btn btn-danger" onclick="deleteSelectedCollection()" id="deleteBtn">
                        Delete Collection
                    </button>
                </div>
            </div>
        </div>

        <script>
            // File input handling
            document.getElementById('file').addEventListener('change', function(e) {{
                const fileName = e.target.files[0]?.name || 'No file selected';
                document.getElementById('fileLabel').textContent = fileName;
            }});

            // Form submission handling
            document.getElementById('uploadForm').addEventListener('submit', function(e) {{
                document.getElementById('uploadBtn').disabled = true;
                document.getElementById('uploadLoading').style.display = 'block';
            }});

            // Delete collection function
            async function deleteCollection(collectionName) {{
                if (!collectionName) return;

                if (!confirm(`Are you sure you want to delete collection "${{collectionName}}"? This action cannot be undone.`)) {{
                    return;
                }}

                const password = prompt('Enter admin password:');
                if (!password) return;

                try {{
                    const response = await fetch(`/admin/corpus/${{collectionName}}`, {{
                        method: 'DELETE',
                        headers: {{
                            'Content-Type': 'application/x-www-form-urlencoded',
                        }},
                        body: new URLSearchParams({{ password: password }})
                    }});

                    const result = await response.json();
                    alert(JSON.stringify(result, null, 2));
                    location.reload();
                }} catch (error) {{
                    alert('Error deleting collection: ' + error.message);
                }}
            }}

            // Delete selected collection
            async function deleteSelectedCollection() {{
                const collectionName = document.getElementById('deleteCollection').value;
                const password = document.getElementById('deletePassword').value;

                if (!collectionName || !password) {{
                    alert('Please select a collection and enter the password.');
                    return;
                }}

                if (!confirm(`Are you sure you want to delete collection "${{collectionName}}"?`)) {{
                    return;
                }}

                document.getElementById('deleteBtn').disabled = true;

                try {{
                    const response = await fetch(`/admin/corpus/${{collectionName}}`, {{
                        method: 'DELETE',
                        headers: {{
                            'Content-Type': 'application/x-www-form-urlencoded',
                        }},
                        body: new URLSearchParams({{ password: password }})
                    }});

                    const result = await response.json();
                    alert(JSON.stringify(result, null, 2));
                    location.reload();
                }} catch (error) {{
                    alert('Error: ' + error.message);
                    document.getElementById('deleteBtn').disabled = false;
                }}
            }}

            // Auto-refresh status every 30 seconds
            setInterval(async function() {{
                try {{
                    const response = await fetch('/admin/status');
                    const data = await response.json();

                    // Update connection status
                    const statusElement = document.querySelector('.status-indicator');
                    const isConnected = data.qdrant_status === 'connected';
                    statusElement.className = `status-indicator status-${{isConnected ? 'connected' : 'disconnected'}}`;
                    statusElement.textContent = `Qdrant: ${{data.qdrant_status.toUpperCase()}}`;
                }} catch (error) {{
                    console.error('Status update failed:', error);
                }}
            }}, 30000);
        </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html)
