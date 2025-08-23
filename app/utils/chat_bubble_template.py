CHAT_BUBBLE_HTML = """
<style>
/* minimal floating bubble CSS */
#rag-bubble { position: fixed; right: 20px; bottom: 20px; z-index:99999; }
#rag-panel { display:none; width:320px; height:420px; box-shadow:0 4px 24px rgba(0,0,0,.2); border-radius:12px; overflow:hidden; background:white; }
#rag-btn { background:#0078d4; color:white; border:none; padding:12px 16px; border-radius:999px; cursor:pointer; }
#rag-messages { padding:12px; }
#rag-form { display:flex; gap:8px; padding:8px; }
#rag-input { flex:1; padding:8px; }
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
    try{
      const res = await fetch('/chat/send', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({query:q})
      });
      const data = await res.json();
      msgs.innerHTML += '<div><b>Bot:</b> '+(data.message||'') + '</div>';
      msgs.scrollTop = msgs.scrollHeight;
    }catch(err){
      msgs.innerHTML += '<div style="color:red"><b>Error:</b> '+err.toString()+"</div>";
    }
  };
})();
</script>
"""
