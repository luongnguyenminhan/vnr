'use client';

import { FiClock, FiUser, FiMapPin } from 'react-icons/fi';

export default function ChapterI() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    {/* Chapter Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                            Chương I: Nguồn Gốc và Sự Hình Thành Dân Tộc Việt Nam
                        </h1>
                        <div className="flex justify-center items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <FiClock className="w-4 h-4" />
                                <span>Thời gian: Từ 2879 TCN</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiMapPin className="w-4 h-4" />
                                <span>Khu vực: Đông Nam Á</span>
                            </div>
                        </div>
                    </div>

                    {/* Introduction */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            📖 Tổng Quan
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            Lịch sử dân tộc Việt Nam bắt đầu từ rất xa xưa với những dấu tích đầu tiên của con người
                            ở vùng Đông Nam Á. Theo các nhà nghiên cứu, dân tộc Việt Nam có nguồn gốc từ những cộng
                            đồng người Đông Nam Á cổ đại, trải qua quá trình phát triển lâu dài và phức tạp.
                        </p>
                    </div>

                    {/* Key Points */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Early Settlements */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                🏞️ Các Nhóm Người Cổ Đại
                            </h3>
                            <div className="space-y-3">
                                <div className="border-l-4 border-blue-500 pl-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Người Bách Việt</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Nhóm người lớn nhất ở vùng Đông Nam Á cổ đại, từ sông Dương Tử đến Trung Quốc
                                    </p>
                                </div>
                                <div className="border-l-4 border-green-500 pl-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Người Lạc Việt</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Nhóm người Việt cổ ở vùng đồng bằng sông Hồng
                                    </p>
                                </div>
                                <div className="border-l-4 border-purple-500 pl-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Người Âu Việt</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Nhóm người Việt ở vùng miền Trung
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Ancient States */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                🏛️ Các Vương Quốc Cổ Đại
                            </h3>
                            <div className="space-y-3">
                                <div className="border-l-4 border-red-500 pl-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Văn Lang</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Nhà nước cổ đại đầu tiên của người Việt, năm 2879 TCN
                                    </p>
                                </div>
                                <div className="border-l-4 border-yellow-500 pl-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Âu Lạc</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Sự kết hợp giữa Âu Việt và Lạc Việt, năm 257 TCN
                                    </p>
                                </div>
                                <div className="border-l-4 border-indigo-500 pl-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Nam Việt</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Nhà nước độc lập sau khi chinh phục Âu Lạc
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cultural Development */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            🎨 Phát Triển Văn Hóa
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div className="text-2xl mb-2">🌾</div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Nông Nghiệp</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Lúa nước, chăn nuôi, trồng trọt
                                </p>
                            </div>
                            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <div className="text-2xl mb-2">🏹</div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Công Nghệ</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Chế tạo công cụ, vũ khí
                                </p>
                            </div>
                            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <div className="text-2xl mb-2">🎵</div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Nghệ Thuật</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Nhạc cụ, múa, trang trí
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Key Figures */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            👑 Nhân Vật Lịch Sử
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                                    <FiUser className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Hùng Vương</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        Các vua Hùng của nhà nước Văn Lang
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                        Hùng Vương thứ 18 là người cuối cùng của triều đại này
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                                    <FiUser className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Thục Phán</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        Vua của nước Âu Lạc
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                        Người có công thống nhất Âu Việt và Lạc Việt
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
