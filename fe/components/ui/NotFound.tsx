'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
            <div className="text-center space-y-8 max-w-md mx-auto px-4">
                {/* 404 Illustration */}
                <div className="space-y-4">
                    <div className="text-8xl font-bold text-blue-600 dark:text-blue-400">
                        404
                    </div>
                    <div className="text-4xl">🤖</div>
                </div>

                {/* Error Message */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Không Tìm Thấy Trang
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Rất tiếc! Trang bạn đang tìm kiếm không tồn tại.
                        Trợ lý AI có thể đã chuyển nó đến một vị trí tốt hơn.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        <span>🏠</span>
                        Về Trang Chủ
                    </Link>

                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Hoặc thử sử dụng trợ lý AI để tìm những gì bạn cần
                    </div>
                </div>

                {/* Helpful Links */}
                <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        Cần giúp đỡ? Thử những cách này:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                        >
                            🏠 Trang Chủ
                        </Link>
                        <span className="hidden sm:inline text-gray-300 dark:text-gray-600">|</span>
                        <button
                            onClick={() => {
                                // This would trigger the floating chat if it exists
                                const chatButton = document.querySelector('[title="Open Chat Assistant"]') as HTMLButtonElement;
                                if (chatButton) {
                                    chatButton.click();
                                }
                            }}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                        >
                            💬 Trợ Lý Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
