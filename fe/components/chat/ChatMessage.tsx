'use client';

import { ChatMessage as ChatMessageType } from '@/types/chat.type';
import { parseMarkdown } from '@/utils/markdownParser';

interface ChatMessageProps {
    message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.type === 'user';
    const isError = message.type === 'error';

    const getMessageStyles = () => {
        if (isUser) {
            return 'bg-blue-600 text-white';
        }
        if (isError) {
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        }
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    };

    const getAlignment = () => {
        return isUser ? 'justify-end' : 'justify-start';
    };

    const formatTimestamp = (timestamp: number) => {
        return new Date(timestamp).toLocaleTimeString();
    };

    const renderContent = () => {
        if (isUser) {
            // User messages don't need markdown parsing
            return (
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
            );
        }

        // Bot and error messages get markdown parsing
        const parsedContent = parseMarkdown(message.content);
        return (
            <div
                className="text-sm prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
        );
    };

    return (
        <div className={`flex ${getAlignment()} chat-message`}>
            <div
                className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${getMessageStyles()}`}
            >
                {renderContent()}
                <div className="text-xs opacity-70 mt-1">
                    {formatTimestamp(message.timestamp)}
                </div>
            </div>
        </div>
    );
}
