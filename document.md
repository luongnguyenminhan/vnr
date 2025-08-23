# Integrating the Floating Chat Bubble

This document shows simple, copy-paste-ready ways to embed the backend-served floating chat bubble from this project into any website.

Use the backend endpoint `/chat/bubble` (GET) which returns the complete embeddable HTML+CSS+JS for the floating chat UI. The examples below assume your backend base URL is `http://127.0.0.1:8000` in development; change to your production origin as needed.

## Quick copy-paste (server-served bubble)

1. Call your backend and copy the returned HTML string (GET `/chat/bubble`).
2. Paste that HTML directly into the target page where you want the bubble to load (preferably just before `</body>`).

This is the simplest integration — the returned HTML includes all styles and vanilla JS required to talk to `/chat/send` and other chat endpoints.

## Recommended: Dynamic loader (fetch & inject)

If you prefer a single script that any page can include, use a small loader that fetches `/chat/bubble` and injects it into the host page while ensuring any inline scripts execute.

Paste the following snippet into your page (replace BASE_URL if your API is hosted elsewhere):

```html
<script>
(function(){
  const BASE_URL = 'http://127.0.0.1:8000'; // change to your backend origin
  async function loadBubble() {
    try {
      const res = await fetch(BASE_URL + '/chat/bubble');
      const htmlText = await res.text();
      // Parse and inject while executing inline scripts
      const tmp = document.createElement('div');
      tmp.innerHTML = htmlText;
      // move non-script nodes
      Array.from(tmp.childNodes).forEach(node => {
        if (node.tagName !== 'SCRIPT') document.body.appendChild(node);
      });
      // execute scripts by recreating them (ensures inline script runs)
      Array.from(tmp.querySelectorAll('script')).forEach(s => {
        const ns = document.createElement('script');
        if (s.src) ns.src = s.src;
        if (s.type) ns.type = s.type;
        ns.text = s.textContent;
        document.body.appendChild(ns);
      });
    } catch (err) {
      console.error('Failed to load chat bubble:', err);
    }
  }
  // Load after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBubble);
  } else {
    loadBubble();
  }
})();
</script>
```

Notes:

- This approach preserves the bubble's inline JS execution (browsers do not execute scripts inserted via innerHTML).
- Use the correct `BASE_URL` (scheme + host + optional port). Use HTTPS in production.

## Iframe alternative

If you prefer isolation, host a small HTML file that includes the bubble HTML and embed it with an `<iframe>`:

```html
<iframe src="https://your-api.example.com/embed" style="position:fixed;right:20px;bottom:20px;width:360px;height:520px;border:none;z-index:99999;"></iframe>
```

Pros: isolates CSS/JS and avoids CSS conflicts. Cons: cross-origin communication and sizing must be handled.

## Required backend endpoints

The chat bubble talks to these endpoints (default paths):

- GET `/chat/bubble` — returns embeddable HTML+JS (the copy-paste widget).
- POST `/chat/send` — send a user message; expects JSON {query: string, session_id?: string} and returns JSON {message: string, ...}.
- GET `/chat/health` — quick check that the chat backend is reachable.
- (Optional) Admin endpoints: `/admin/upload`, `/admin/corpus/{name}`, `/admin/ui`.

If you host the widget on a different origin than the API, enable CORS on the API and configure the allowed origin.

## Theming and customization

The provided bubble uses simple CSS variables and inline rules. To theme it:

- Option A (recommended): copy the returned HTML into your project and edit the CSS variables in that HTML directly.
- Option B: override styles by adding a higher-specificity stylesheet on the host page (careful with shadowing). Example variables and selectors to inspect in the returned HTML:
  - `#rag-bubble`, `#rag-panel`, `#rag-btn`, `#rag-messages`, `#rag-form`, `#rag-input`.

The bubble is intentionally framework-agnostic (vanilla JS). If you need deeper customization, copy the template from `app/utils/chat_bubble_template.py` into your project and adapt JS handlers.

## Sessions and persistent state

- The bubble supports an optional `session_id` to keep conversation history. If you provide `session_id` in the POST to `/chat/send`, the backend will attempt to continue that session.
- If you need cross-page session continuity, generate a stable `session_id` (UUID) and store it in a cookie or localStorage on the host site.

## Required environment variables / backend configuration

The backend expects the following environment settings (see `app/core/config.py`):

- `GOOGLE_API_KEY` — used by the AI embedding/generation adapters.
- `QDRANT_URL` — Qdrant vector db URL (default `http://localhost:6333`).
- `QDRANT_API_KEY` — optional.
- `DEFAULT_ADMIN_PASSWORD` — intentionally hard-coded in this project; see Security section.

## Security and production notes (important)

- This project intentionally uses a hard-coded admin password for the admin endpoints (`DEFAULT_ADMIN_PASSWORD` in `app/core/config.py`). This is insecure and must be replaced with a proper secret store or auth mechanism before production.
- Always run API and frontend over HTTPS in production.
- Limit CORS origins to only the domains that will embed the bubble.
- Do not expose `GOOGLE_API_KEY` or other secret credentials to the browser. All AI calls must be proxied from the server.

## Troubleshooting

1. Bubble doesn't appear or JS doesn't run:
   - Check the browser console for script errors.
   - If you fetch the bubble HTML dynamically, ensure you recreate script tags (see the loader snippet above).
2. Empty or non-JSON responses from `/chat/send`:
   - Verify the server is healthy with GET `/chat/health`.
   - Check server logs for exceptions during request handling.
3. CORS errors when embedding from another origin:
   - Enable CORS on the FastAPI app and add the host origin to allowed origins.
4. Qdrant upsert errors (400 invalid point ID):
   - Ensure backend uses UUIDs or integers for point ids. The project uses UUIDs by default.

## Example: minimal host page

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Page with Chat Bubble</title>
</head>
<body>
  <h1>My site</h1>
  <!-- Loader script (inserted before closing body) -->
  <script src="/path/to/loader.js"></script>
</body>
</html>
```

The `loader.js` in this example would contain the dynamic loader snippet earlier with the correct `BASE_URL`.

## Logging & debugging tips

- Enable logging on the backend (check `app/services/ai_service.py` which includes workflow logging wrappers) to see node-level timing and errors.
- Use the browser devtools network tab to inspect calls to `/chat/send` and `/chat/health`.

## Final notes

- For quick testing, use `curl http://127.0.0.1:8000/chat/bubble` to retrieve the widget HTML.
- The returned widget is intentionally minimal. For production, adapt the CSS/JS to match your brand and secure the backend.

If you want, I can create a tiny standalone `loader.js` file in this repo (or an `embed.html` example) that you can host and drop into any site — tell me which option you prefer and I will add it.
