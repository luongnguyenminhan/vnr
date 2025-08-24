'use client';

import { FiBook, FiClock, FiHeart, FiHome, FiMapPin, FiMusic, FiShield, FiTarget } from 'react-icons/fi';

export default function ChapterII() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    {/* Chapter Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                            Chương II: Thời Kỳ Bắc Thuộc và Kháng Chiến Chống Trung Quốc
                        </h1>
                        <div className="flex justify-center items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <FiClock className="w-4 h-4" />
                                <span>Thời gian: 179 TCN - 938</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiMapPin className="w-4 h-4" />
                                <span>Khu vực: Việt Nam - Trung Quốc</span>
                            </div>
                        </div>
                    </div>

                    {/* Introduction */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FiBook className="w-6 h-6" />
                            Tổng Quan
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            Sau khi nhà nước Âu Lạc bị nhà Triệu (Trung Quốc) xâm lược năm 179 TCN, dân tộc Việt Nam
                            trải qua hơn một thiên niên kỷ dưới ách đô hộ của các triều đại Trung Quốc. Tuy nhiên,
                            trong suốt thời kỳ này, nhân dân Việt Nam luôn đứng lên chống lại kẻ thù xâm lược,
                            bảo vệ độc lập dân tộc.
                        </p>
                    </div>

                    {/* Key Periods */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Early Periods */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FiHome className="w-6 h-6" />
                                Các Thời Kỳ Đầu
                            </h3>
                            <div className="space-y-3">
                                <div className="border-l-4 border-blue-500 pl-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Nhà Triệu (179-111 TCN)</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Thiết lập ách thống trị đầu tiên, đổi tên Giao Chỉ
                                    </p>
                                </div>
                                <div className="border-l-4 border-green-500 pl-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Nhà Tây Hán (111 TCN-25)</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Chinh phục Giao Chỉ, cai trị trực tiếp
                                    </p>
                                </div>
                                <div className="border-l-4 border-purple-500 pl-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Nhà Đông Hán (25-220)</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Tiếp tục chính sách đô hộ và khai thác
                                    </p>
                                </div>
                                <div className="border-l-4 border-red-500 pl-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Thời kỳ Tam Quốc (220-280)</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Vùng Giao Chỉ thuộc quyền kiểm soát của các nước
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Later Periods */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FiHome className="w-6 h-6" />
                                Các Thời Kỳ Sau
                            </h3>
                            <div className="space-y-3">
                                <div className="border-l-4 border-yellow-500 pl-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Nhà Tấn (280-420)</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Thống nhất Trung Quốc, tiếp tục cai trị Giao Chỉ
                                    </p>
                                </div>
                                <div className="border-l-4 border-indigo-500 pl-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Nhà Lưu Tống (420-479)</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Kỷ nguyên Nam Bắc triều, tranh chấp lãnh thổ
                                    </p>
                                </div>
                                <div className="border-l-4 border-pink-500 pl-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Nhà Tùy (581-618)</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Thống nhất Trung Quốc lần nữa
                                    </p>
                                </div>
                                <div className="border-l-4 border-teal-500 pl-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Nhà Đường (618-907)</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Thời kỳ hưng thịnh và suy yếu của Trung Quốc
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Major Resistance Movements */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FiTarget className="w-6 h-6" />
                            Các Phong Trào Kháng Chiến Lớn
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border-l-4 border-red-500 pl-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Khởi Nghĩa Hai Bà Trưng</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    Năm 40, hai chị em Trưng Trắc và Trưng Nhị lãnh đạo nhân dân nổi dậy chống lại nhà Đông Hán
                                </p>
                                <div className="text-xs text-gray-500 dark:text-gray-500">
                                    <strong>Thành tựu:</strong> Giành lại độc lập trong 3 năm
                                </div>
                            </div>
                            <div className="border-l-4 border-blue-500 pl-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Khởi Nghĩa Bà Triệu</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    Năm 248, Bà Triệu lãnh đạo nhân dân chống lại nhà Tấn
                                </p>
                                <div className="text-xs text-gray-500 dark:text-gray-500">
                                    <strong>Thành tựu:</strong> Làm rung chuyển ách thống trị
                                </div>
                            </div>
                            <div className="border-l-4 border-green-500 pl-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Khởi Nghĩa Lý Bí</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    Năm 542-548, Lý Bí lãnh đạo khởi nghĩa lớn chống nhà Lương
                                </p>
                                <div className="text-xs text-gray-500 dark:text-gray-500">
                                    <strong>Thành tựu:</strong> Thành lập nước Vạn Xuân
                                </div>
                            </div>
                            <div className="border-l-4 border-purple-500 pl-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Khởi Nghĩa Mai Thúc Loan</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    Năm 722, Mai Thúc Loan lãnh đạo nhân dân chống nhà Đường
                                </p>
                                <div className="text-xs text-gray-500 dark:text-gray-500">
                                    <strong>Thành tựu:</strong> Kéo dài hơn 10 năm kháng chiến
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cultural Resistance */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FiMusic className="w-6 h-6" />
                            Kháng Chiến Văn Hóa
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                                    <FiBook className="w-4 h-4 text-white" />
                                </div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Giữ Ngôn Ngữ</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Bảo tồn tiếng Việt cổ đại
                                </p>
                            </div>
                            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mb-2">
                                    <FiMusic className="w-4 h-4 text-white" />
                                </div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Duy Trì Phong Tục</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Giữ bản sắc dân tộc
                                </p>
                            </div>
                            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mb-2">
                                    <FiHome className="w-4 h-4 text-white" />
                                </div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Xây Đền Miếu</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Tôn vinh các anh hùng dân tộc
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Key Figures */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FiShield className="w-6 h-6" />
                            Các Anh Hùng Dân Tộc
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
                                    <FiShield className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Hai Bà Trưng</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        Trưng Trắc và Trưng Nhị - Nữ tướng tài ba
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                        Lãnh đạo khởi nghĩa chống Đông Hán năm 40
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                                    <FiShield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Bà Triệu</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        Nữ tướng chống Tấn với ngọn cờ "Dứt bỏ bọn Tấn"
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                        Lãnh đạo khởi nghĩa năm 248
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                                    <FiShield className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Lý Bí</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        Thành lập nước Vạn Xuân độc lập
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                        Lãnh đạo khởi nghĩa năm 542
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                                    <FiShield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Mai Thúc Loan</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        Kháng chiến chống Đường hơn 10 năm
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                        Lãnh đạo khởi nghĩa năm 722
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legacy */}
                    <div className="bg-gradient-to-r from-red-50 to-blue-50 dark:from-red-900/20 dark:to-blue-900/20 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FiHeart className="w-6 h-6" />
                            Di Sản và Bài Học
                        </h3>
                        <div className="space-y-3 text-gray-700 dark:text-gray-300">
                            <p className="flex items-start gap-3">
                                <span className="text-red-500 font-bold">•</span>
                                <span>Thể hiện tinh thần bất khuất, kiên cường của dân tộc Việt Nam</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="text-blue-500 font-bold">•</span>
                                <span>Góp phần bảo tồn và phát triển bản sắc dân tộc</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="text-green-500 font-bold">•</span>
                                <span>Tạo nền tảng cho công cuộc đấu tranh giành độc lập sau này</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="text-purple-500 font-bold">•</span>
                                <span>Để lại những tấm gương sáng về lòng yêu nước và tinh thần đoàn kết</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
