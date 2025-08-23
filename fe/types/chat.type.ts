export interface ChatMessage {
    type: 'user' | 'bot' | 'error';
    content: string;
    timestamp: number;
}

export interface ChatResponse {
    message: string;
    session_id: string;
    timestamp: number;
    status: string;
}

export interface ConversationTurn {
    user: string;
    ai: string;
    timestamp: number;
}
