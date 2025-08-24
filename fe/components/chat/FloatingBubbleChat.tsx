'use client';

import { chatService } from '@/service';
import { ChatMessage as ChatMessageType, ConversationTurn } from '@/types/chat.type';
import { useEffect, useState } from 'react';
import { FiMessageCircle, FiX } from 'react-icons/fi';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';


export default function FloatingBubbleChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [conversationTurns, setConversationTurns] = useState(0);
    const [showMenu, setShowMenu] = useState(false);

    // Load session from localStorage
    useEffect(() => {
        const savedSessionId = localStorage.getItem('rag_session_id');
        if (savedSessionId) {
            setSessionId(savedSessionId);
        }
    }, []);

    const sendMessage = async () => {
        const message = inputValue.trim();
        if (!message || isLoading) return;

        // Add user message
        const userMessage: ChatMessageType = {
            type: 'user',
            content: message,
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const data = await chatService.sendMessage(message, sessionId);

            // Update session ID
            if (data.session_id) {
                setSessionId(data.session_id);
                localStorage.setItem('rag_session_id', data.session_id);
            }

            // Add bot response
            const botMessage: ChatMessageType = {
                type: 'bot',
                content: data.message,
                timestamp: data.timestamp * 1000
            };
            setMessages(prev => [...prev, botMessage]);
            setConversationTurns(prev => prev + 1);
        } catch (error) {
            const errorMessage: ChatMessageType = {
                type: 'error',
                content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearHistory = async () => {
        if (!sessionId || !confirm('Xóa lịch sử cuộc trò chuyện? Hành động này không thể hoàn tác.')) return;

        try {
            await chatService.clearConversationHistory(sessionId);

            setMessages([]);
            setConversationTurns(0);
        } catch (error) {
            console.error('Failed to clear history:', error);
            const errorMessage: ChatMessageType = {
                type: 'error',
                content: `Không thể xóa lịch sử: ${error instanceof Error ? error.message : 'Lỗi không xác định'}`,
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, errorMessage]);
        }
        setShowMenu(false);
    };

    const showHistory = async () => {
        if (!sessionId) {
            setMessages(prev => [...prev, {
                type: 'bot',
                content: 'Không có phiên trò chuyện hoạt động.',
                timestamp: Date.now()
            }]);
            setShowMenu(false);
            return;
        }

        try {
            const data = await chatService.getConversationHistory(sessionId);
            const history = data.history || [];

            if (history.length) {
                let historyText = '📝 Lịch Sử Cuộc Trò Chuyện:\n\n';
                history.forEach((turn: ConversationTurn, index: number) => {
                    const date = new Date(turn.timestamp * 1000).toLocaleString();
                    historyText += `Lượt ${index + 1} (${date}):\n`;
                    historyText += `Người dùng: ${turn.user}\n`;
                    historyText += `AI: ${turn.ai}\n\n`;
                });
                setMessages(prev => [...prev, {
                    type: 'bot',
                    content: historyText,
                    timestamp: Date.now()
                }]);
            } else {
                setMessages(prev => [...prev, {
                    type: 'bot',
                    content: 'Không tìm thấy lịch sử cuộc trò chuyện.',
                    timestamp: Date.now()
                }]);
            }
        } catch (error) {
            console.error('Failed to retrieve history:', error);
            const errorMessage: ChatMessageType = {
                type: 'error',
                content: `Không thể truy xuất lịch sử: ${error instanceof Error ? error.message : 'Lỗi không xác định'}`,
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, errorMessage]);
        }
        setShowMenu(false);
    };

    const startNewSession = () => {
        if (confirm('Bắt đầu cuộc trò chuyện mới? Lịch sử hiện tại sẽ được giữ lại.')) {
            setSessionId(null);
            localStorage.removeItem('rag_session_id');
            setConversationTurns(0);
            setMessages([]);
        }
        setShowMenu(false);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    title="Mở Trợ Lý Chat"
                >
                    {isOpen ? (
                        <FiX className="w-10 h-10" />
                    ) : (
                        <FiMessageCircle className="w-10 h-10" />
                    )}
                </button>
            </div>

            {/* Chat Panel */}
            {isOpen && (
                <div className="fixed bottom-32 right-6 w-[500px] h-[70vh] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-40 flex flex-col">
                    <ChatHeader
                        sessionId={sessionId}
                        conversationTurns={conversationTurns}
                        showMenu={showMenu}
                        onToggleMenu={() => setShowMenu(!showMenu)}
                        onShowHistory={showHistory}
                        onStartNewSession={startNewSession}
                        onClearHistory={clearHistory}
                    />

                    <ChatMessages
                        messages={messages}
                        isLoading={isLoading}
                    />

                    <ChatInput
                        value={inputValue}
                        onChange={setInputValue}
                        onSend={sendMessage}
                        isLoading={isLoading}
                        placeholder="Type your message..."
                    />
                </div>
            )}
        </>
    );
}
