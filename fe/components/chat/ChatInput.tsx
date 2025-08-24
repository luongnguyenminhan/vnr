'use client';

import { ChangeEvent, KeyboardEvent, useRef } from 'react';
import { FiSend } from 'react-icons/fi';

interface ChatInputProps {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    isLoading: boolean;
    placeholder?: string;
}

export default function ChatInput({
    value,
    onChange,
    onSend,
    isLoading,
    placeholder = "Nhập tin nhắn của bạn..."
}: ChatInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        onChange(newValue);

        // Auto-resize textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 100) + 'px';
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    const handleSend = () => {
        if (value.trim() && !isLoading) {
            onSend();

            // Reset textarea height after sending
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    return (
        <div className="border-t border-gray-200 dark:border-gray-600 p-4">
            <div className="flex gap-2">
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                    rows={1}
                    disabled={isLoading}
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading || !value.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <FiSend className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
