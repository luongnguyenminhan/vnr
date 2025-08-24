'use client';

import { FiMenu } from 'react-icons/fi';

interface ChatHeaderProps {
    sessionId: string | null;
    conversationTurns: number;
    showMenu: boolean;
    onToggleMenu: () => void;
    onShowHistory: () => void;
    onStartNewSession: () => void;
    onClearHistory: () => void;
}

export default function ChatHeader({
    sessionId,
    conversationTurns,
    showMenu,
    onToggleMenu,
    onShowHistory,
    onStartNewSession,
    onClearHistory
}: ChatHeaderProps) {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-semibold">Trợ Lý AI</h3>
                    <div className="text-xs opacity-80">
                        {sessionId ? `Phiên: ${sessionId.substring(0, 8)} (${conversationTurns} lượt)` : 'Phiên Mới'}
                    </div>
                </div>
                <div className="relative">
                    <button
                        onClick={onToggleMenu}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <FiMenu className="w-4 h-4" />
                    </button>

                    {showMenu && (
                        <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 min-w-48">
                            <button
                                onClick={onShowHistory}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 text-gray-700 dark:text-gray-200"
                            >
                                <span className="text-sm">📝</span>
                                Hiển Thị Lịch Sử
                            </button>
                            <button
                                onClick={onStartNewSession}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 text-gray-700 dark:text-gray-200"
                            >
                                <span className="text-sm">🔄</span>
                                Buổi Trò Chuyện Mới
                            </button>
                            <button
                                onClick={onClearHistory}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-red-600 flex items-center gap-2"
                            >
                                <span className="text-sm">🗑️</span>
                                Xóa Lịch Sử
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
