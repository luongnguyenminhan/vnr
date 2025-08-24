'use client';

export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
            <div className="text-center space-y-6">
                {/* Loading Spinner */}
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin">
                        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                </div>

                {/* Loading Text */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Đang Tải Trợ Lý AI VNR
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Vui lòng đợi trong khi chúng tôi chuẩn bị trợ lý AI của bạn...
                    </p>
                </div>

                {/* Loading Animation Dots */}
                <div className="flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    );
}
