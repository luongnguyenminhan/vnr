import { ChatMessage, ChatResponse, ConversationTurn } from '@/types/chat.type';

export class ChatService {
    private static instance: ChatService;
    private baseUrl = '/chat';

    private constructor() { }

    public static getInstance(): ChatService {
        if (!ChatService.instance) {
            ChatService.instance = new ChatService();
        }
        return ChatService.instance;
    }

    /**
     * Send a chat message to the AI
     */
    async sendMessage(query: string, sessionId?: string | null): Promise<ChatResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query,
                    session_id: sessionId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || errorData.message || `HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to send message');
        }
    }

    /**
     * Get conversation history for a session
     */
    async getConversationHistory(sessionId: string): Promise<{
        status: string;
        session_id: string;
        history: ConversationTurn[];
        total_turns: number;
    }> {
        try {
            const response = await fetch(`${this.baseUrl}/conversation/${sessionId}`, {
                method: 'GET',
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || errorData.message || `HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to get conversation history');
        }
    }

    /**
     * Clear conversation history for a session
     */
    async clearConversationHistory(sessionId: string): Promise<{
        status: string;
        message: string;
        session_id: string;
    }> {
        try {
            const response = await fetch(`${this.baseUrl}/conversation/${sessionId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || errorData.message || `HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to clear conversation history');
        }
    }

    /**
     * Check chat service health
     */
    async checkHealth(): Promise<{
        status: string;
        service: string;
        ai_available: boolean;
        langgraph_available: boolean;
        conversation_sessions: number;
        timestamp: number;
    }> {
        try {
            const response = await fetch(`${this.baseUrl}/health`, {
                method: 'GET',
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || errorData.message || `HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to check service health');
        }
    }
}

// Export a singleton instance
export const chatService = ChatService.getInstance();
