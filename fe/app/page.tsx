import { FloatingBubbleChat } from '@/components/chat';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">VNR AI Assistant</h1>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              AI-powered chat assistant with conversation memory
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome to VNR AI Assistant
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your intelligent AI companion with conversation memory and RAG capabilities.
              Ask questions about your documents or engage in general conversations -
              I&apos;ll remember our entire conversation context.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                🚀 Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 dark:text-blue-400 text-sm">💬</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Conversation Memory</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Maintains context across your entire chat session</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 dark:text-green-400 text-sm">🔍</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">RAG Integration</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Retrieves relevant information from your documents</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 dark:text-purple-400 text-sm">📱</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Floating Chat</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Access chat anytime with the floating bubble</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 dark:text-orange-400 text-sm">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Real-time Responses</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get instant AI responses with typing indicators</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
              💡 How to Use
            </h3>
            <div className="text-left space-y-2 text-blue-800 dark:text-blue-200">
              <p>• Click the chat bubble in the bottom-right corner to start chatting</p>
              <p>• Ask questions about your documents or general topics</p>
              <p>• Use the menu to manage conversation history and sessions</p>
              <p>• Your conversation context is automatically preserved</p>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Chat Component */}
      <FloatingBubbleChat />
    </div>
  );
}
