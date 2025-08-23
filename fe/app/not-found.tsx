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
                        Page Not Found
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Oops! The page you&apos;re looking for doesn&apos;t exist.
                        The AI assistant might have moved it to a better location.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        <span>🏠</span>
                        Go Back Home
                    </Link>

                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Or try using the AI chat assistant to find what you need
                    </div>
                </div>

                {/* Helpful Links */}
                <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        Need help? Try these:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                        >
                            🏠 Home Page
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
                            💬 Chat Assistant
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
