CHAT_BUBBLE_HTML = """
<style>
/* Enhanced chat bubble styles */
#rag-bubble {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 99999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

#rag-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 14px 18px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;
    position: relative;
}

#rag-btn:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

#rag-btn:active {
    transform: translateY(0) scale(1);
}

#rag-btn.notification::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 8px;
    height: 8px;
    background: #ff4757;
    border-radius: 50%;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.7; }
    100% { transform: scale(1); opacity: 1; }
}

#rag-panel {
    display: none;
    width: 380px;
    height: 500px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    position: absolute;
    bottom: 70px;
    right: 0;
    flex-direction: column;
    animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

#rag-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 16px 20px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

#rag-header .session-info {
    font-size: 12px;
    opacity: 0.8;
    margin-top: 4px;
}

#rag-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 8px;
    min-width: 150px;
    display: none;
    z-index: 1000;
}

#rag-menu button {
    display: block;
    width: 100%;
    padding: 8px 12px;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    font-size: 14px;
    border-radius: 4px;
    margin-bottom: 4px;
}

#rag-menu button:hover {
    background: #f8f9fa;
}

#rag-menu button.clear-history {
    color: #dc3545;
}

#rag-menu button.clear-history:hover {
    background: #f8d7da;
}

#rag-close {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: background 0.2s;
}

#rag-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

#rag-messages {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    max-height: calc(500px - 140px);
    scroll-behavior: smooth;
}

.message {
    margin-bottom: 16px;
    padding: 12px 16px;
    border-radius: 12px;
    max-width: 85%;
    line-height: 1.4;
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.message.user {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    margin-left: auto;
    text-align: right;
}

.message.bot {
    background: #f1f3f4;
    color: #333;
    margin-right: auto;
}

.message.error {
    background: #fee;
    color: #c33;
    border: 1px solid #fcc;
}

.message .timestamp {
    font-size: 11px;
    opacity: 0.7;
    margin-top: 4px;
    display: block;
}

.message.typing {
    display: flex;
    align-items: center;
    gap: 8px;
}

.typing-dots {
    display: flex;
    gap: 4px;
}

.typing-dots span {
    width: 6px;
    height: 6px;
    background: #667eea;
    border-radius: 50%;
    animation: typing 1.4s infinite;
}

.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-10px); opacity: 1; }
}

#rag-form {
    padding: 16px 20px;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
    display: flex;
    gap: 8px;
    align-items: flex-end;
}

#rag-input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 20px;
    font-size: 14px;
    outline: none;
    resize: none;
    min-height: 44px;
    max-height: 100px;
    transition: border-color 0.3s;
}

#rag-input:focus {
    border-color: #667eea;
}

#rag-send {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s ease;
}

#rag-send:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

#rag-send:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.welcome-message {
    text-align: center;
    color: #666;
    font-style: italic;
    margin: 20px 0;
}

/* Responsive design */
@media (max-width: 480px) {
    #rag-panel {
        width: calc(100vw - 40px);
        height: calc(100vh - 120px);
        right: 20px;
        bottom: 80px;
    }

    #rag-messages {
        max-height: calc(100vh - 200px);
    }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    #rag-panel {
        background: #2d3748;
        color: white;
    }

    #rag-messages {
        background: #2d3748;
    }

    .message.bot {
        background: #4a5568;
        color: white;
    }

    #rag-form {
        background: #2d3748;
        border-top-color: #4a5568;
    }

    #rag-input {
        background: #2d3748;
        border-color: #4a5568;
        color: white;
    }

    #rag-input:focus {
        border-color: #667eea;
    }
}
</style>

<div id="rag-bubble">
    <button id="rag-btn" title="Open Chat Assistant">💬 Chat</button>
    <div id="rag-panel">
        <div id="rag-header">
            <div>
                <span>AI Assistant</span>
                <div class="session-info" id="session-info">Session: New</div>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
                <button id="rag-menu-btn" title="Menu" aria-label="Chat menu">⋮</button>
                <button id="rag-close" title="Close Chat" aria-label="Close chat">×</button>
            </div>
        </div>
        <div id="rag-menu">
            <button id="clear-history-btn" class="clear-history">🗑️ Clear History</button>
            <button id="show-history-btn">📝 Show History</button>
            <button id="new-session-btn">🔄 New Session</button>
        </div>
        <div id="rag-messages">
            <div class="welcome-message">
                👋 Hi! I'm your AI assistant with conversation memory. Ask me anything about your documents or general questions - I'll remember our conversation!
            </div>
        </div>
        <form id="rag-form">
            <textarea id="rag-input" placeholder="Type your message here..." rows="1"></textarea>
            <button id="rag-send" type="submit">Send</button>
        </form>
    </div>
</div>

<script>
(function() {
    const btn = document.getElementById('rag-btn');
    const panel = document.getElementById('rag-panel');
    const closeBtn = document.getElementById('rag-close');
    const menuBtn = document.getElementById('rag-menu-btn');
    const menu = document.getElementById('rag-menu');
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    const showHistoryBtn = document.getElementById('show-history-btn');
    const newSessionBtn = document.getElementById('new-session-btn');
    const sessionInfo = document.getElementById('session-info');
    const form = document.getElementById('rag-form');
    const input = document.getElementById('rag-input');
    const sendBtn = document.getElementById('rag-send');
    const msgs = document.getElementById('rag-messages');

    let sessionId = localStorage.getItem('rag_session_id') || null;
    let isOpen = false;
    let conversationTurns = 0;

    // Auto-resize textarea
    input.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });

    // Update session info display
    function updateSessionInfo() {
        if (sessionId) {
            const shortId = sessionId.substring(0, 8);
            sessionInfo.textContent = `Session: ${shortId} (${conversationTurns} turns)`;
        } else {
            sessionInfo.textContent = 'Session: New';
        }
    }

    // Menu toggle
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && e.target !== menuBtn) {
            menu.style.display = 'none';
        }
    });

    // Clear conversation history
    clearHistoryBtn.addEventListener('click', async function() {
        if (sessionId && confirm('Clear conversation history? This cannot be undone.')) {
            try {
                const response = await fetch(`/chat/conversation/${sessionId}`, {
                    method: 'DELETE'
                });
                const result = await response.json();

                if (response.ok) {
                    // Clear local messages (keep welcome message)
                    const welcomeMessage = msgs.querySelector('.welcome-message');
                    msgs.innerHTML = '';
                    if (welcomeMessage) {
                        msgs.appendChild(welcomeMessage);
                    }

                    conversationTurns = 0;
                    updateSessionInfo();
                    addMessage('Conversation history cleared successfully!', 'bot');
                } else {
                    addMessage('Failed to clear history: ' + result.detail, 'error');
                }
            } catch (error) {
                addMessage('Error clearing history: ' + error.message, 'error');
            }
        }
        menu.style.display = 'none';
    });

    // Show conversation history
    showHistoryBtn.addEventListener('click', async function() {
        if (sessionId) {
            try {
                const response = await fetch(`/chat/conversation/${sessionId}`);
                const result = await response.json();

                if (response.ok) {
                    let historyText = '📝 Conversation History:\\n\\n';
                    result.history.forEach((turn, index) => {
                        const date = new Date(turn.timestamp * 1000).toLocaleString();
                        historyText += `Turn ${index + 1} (${date}):\\n`;
                        historyText += `User: ${turn.user}\\n`;
                        historyText += `AI: ${turn.ai}\\n\\n`;
                    });

                    addMessage(historyText, 'bot');
                } else {
                    addMessage('Failed to retrieve history: ' + result.detail, 'error');
                }
            } catch (error) {
                addMessage('Error retrieving history: ' + error.message, 'error');
            }
        } else {
            addMessage('No active conversation session.', 'bot');
        }
        menu.style.display = 'none';
    });

    // Start new session
    newSessionBtn.addEventListener('click', function() {
        if (confirm('Start a new conversation? Current history will be preserved.')) {
            sessionId = null;
            localStorage.removeItem('rag_session_id');
            conversationTurns = 0;
            updateSessionInfo();

            // Clear messages but keep welcome
            const welcomeMessage = msgs.querySelector('.welcome-message');
            msgs.innerHTML = '';
            if (welcomeMessage) {
                msgs.appendChild(welcomeMessage);
            }

            addMessage('Started new conversation session!', 'bot');
        }
        menu.style.display = 'none';
    });

    // Toggle panel
    function togglePanel() {
        isOpen = !isOpen;
        panel.style.display = isOpen ? 'flex' : 'none';
        if (isOpen) {
            input.focus();
            btn.classList.remove('notification');
            updateSessionInfo(); // Update session info when opening
        }
    }

    btn.onclick = togglePanel;
    closeBtn.onclick = function(e) {
        e.stopPropagation();
        togglePanel();
    };

    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
        if (isOpen && !panel.contains(e.target) && e.target !== btn) {
            togglePanel();
        }
    });

    // Add message to chat
    function addMessage(content, type = 'bot', timestamp = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;

        const timeStr = timestamp ? new Date(timestamp * 1000).toLocaleTimeString() : new Date().toLocaleTimeString();

        if (type === 'typing') {
            messageDiv.innerHTML = `
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
                <span>AI is typing...</span>
            `;
        } else {
            messageDiv.innerHTML = `
                ${content}
                <span class="timestamp">${timeStr}</span>
            `;
        }

        msgs.appendChild(messageDiv);
        msgs.scrollTop = msgs.scrollHeight;
        return messageDiv;
    }

    // Remove typing indicator
    function removeTyping() {
        const typingMsg = msgs.querySelector('.message.typing');
        if (typingMsg) {
            typingMsg.remove();
        }
    }

    // Handle form submission
    async function sendMessage() {
        const message = input.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        input.value = '';
        input.style.height = 'auto';

        // Disable input while processing
        input.disabled = true;
        sendBtn.disabled = true;

        // Show typing indicator
        const typingIndicator = addMessage('', 'typing');

        try {
            const response = await fetch('/chat/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: message,
                    session_id: sessionId
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Update session ID
                if (data.session_id) {
                    sessionId = data.session_id;
                    localStorage.setItem('rag_session_id', sessionId);
                }

                // Increment conversation turns
                conversationTurns++;
                updateSessionInfo();

                // Remove typing indicator and add bot response
                removeTyping();
                addMessage(data.message || 'No response', 'bot', data.timestamp);

                // Show notification if chat is closed
                if (!isOpen) {
                    btn.classList.add('notification');
                }
            } else {
                throw new Error(data.detail || 'Request failed');
            }

        } catch (error) {
            removeTyping();
            addMessage(`Sorry, I encountered an error: ${error.message}. Please try again.`, 'error');

            // Show notification for errors
            if (!isOpen) {
                btn.classList.add('notification');
            }
        } finally {
            input.disabled = false;
            sendBtn.disabled = false;
            input.focus();
        }
    }

    form.onsubmit = function(e) {
        e.preventDefault();
        sendMessage();
    };

    // Handle Enter key (send on Enter, new line on Shift+Enter)
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Save chat state
    window.addEventListener('beforeunload', function() {
        if (msgs.children.length > 1) { // More than welcome message
            localStorage.setItem('rag_chat_open', isOpen.toString());
        }
    });

    // Restore chat state
    const wasOpen = localStorage.getItem('rag_chat_open') === 'true';
    if (wasOpen) {
        setTimeout(() => togglePanel(), 1000); // Delay to ensure page is loaded
    }

    // Initialize session info and load conversation count
    updateSessionInfo();
    conversationTurns = parseInt(localStorage.getItem('rag_conversation_turns') || '0');

    // Add some initial animation
    setTimeout(() => {
        btn.style.animation = 'pulse 2s infinite';
    }, 3000);

    // Save conversation state
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('rag_conversation_turns', conversationTurns.toString());
    });
})();
</script>
"""
