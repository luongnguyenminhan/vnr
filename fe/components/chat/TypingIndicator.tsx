'use client';

export default function TypingIndicator() {
    return (
        <div className="flex justify-start chat-message">
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1 typing-indicator">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div
                            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                            style={{ animationDelay: '0.1s' }}
                        ></div>
                        <div
                            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                            style={{ animationDelay: '0.2s' }}
                        ></div>
                    </div>
                    <span className="text-sm">AI is typing...</span>
                </div>
            </div>
        </div>
    );
}
