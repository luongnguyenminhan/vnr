'use client';

import { FiBook, FiClock, FiHeart, FiHome, FiMap, FiShield, FiTarget, FiTrendingUp, FiRefreshCw } from 'react-icons/fi';
import Card from '../ui/Card';

export default function ChapterII() {
    // Card data structure
    const cardsData = [
        // Header card (spans 12 columns)
        {
            type: 'text' as const,
            data: `# Chương II: Bước Ngoặt Lịch Sử - Công Cuộc Đổi Mới và Tầm Nhìn Chiến Lược

## Công Cuộc Đổi Mới

Công cuộc Đổi mới được chính thức khởi xướng từ Đại hội Đảng Cộng sản Việt Nam lần thứ VI vào tháng 12 năm 1986. Đây không phải là một sự thay đổi đột ngột mà là một bước ngoặt lịch sử mang tính tất yếu, được thúc đẩy bởi sự thất bại toàn diện của các chính sách kinh tế thời kỳ Bao cấp.`,
            title: "Tổng Quan Chương II",
            icon: <FiBook className="w-5 h-5" />,
            className: "col-span-12"
        },

        // Introduction (spans 8 columns)
        {
            type: 'text' as const,
            data: `Các tài liệu lịch sử nhấn mạnh rằng "sự thúc đẩy của người dân buộc nhà cầm quyền cộng sản phải tiến hành cởi trói nền kinh tế". Điều này cho thấy Đổi mới là một phản ứng cần thiết trước cuộc khủng hoảng kinh tế-xã hội trầm trọng và những đòi hỏi cấp bách từ thực tiễn đời sống.

Công cuộc Đổi mới không chỉ là một cuộc cải cách đơn thuần mà là một quyết định chiến lược, mở đường cho sự phát triển vượt bậc của đất nước. Sự "cởi trói" nền kinh tế đã tạo ra động lực phát triển mới, đặt nền móng cho những thành tựu vĩ đại sau này.`,
            title: "Bối Cảnh Khởi Xướng",
            icon: <FiClock className="w-5 h-5" />,
            className: "col-span-8"
        },

        // Key Reforms (spans 4 columns)
        {
            type: 'text' as const,
            data: `## Nội Dung Cốt Lõi

- **Thời gian:** Từ năm 1986
- **Tính chất:** Chuyển đổi từ kế hoạch hóa sang thị trường
- **Mục tiêu:** "Nền kinh tế thị trường định hướng xã hội chủ nghĩa"
- **Tầm nhìn:** "Đổi mới tư duy lãnh đạo"`,
            title: "Đổi Mới Về Cơ Bản",
            icon: <FiRefreshCw className="w-5 h-5" />,
            className: "col-span-4"
        },

        // Economic Transformation (spans 12 columns)
        {
            type: 'text' as const,
            data: `## Sự Chuyển Đổi Về Kinh Tế

Nội dung cốt lõi của Đổi mới là sự chuyển dịch từ nền kinh tế kế hoạch hóa sang "nền kinh tế thị trường định hướng xã hội chủ nghĩa". Tuy nhiên, sự thay đổi không chỉ giới hạn ở phương diện kinh tế mà còn là một cuộc "đổi mới tư duy lãnh đạo" của Đảng Cộng sản Việt Nam.

Bằng việc "nhìn thẳng vào sự thật, nói rõ sự thật, nói đúng sự thật" và thừa nhận kinh tế hàng hóa nhiều thành phần là một chính sách có ý nghĩa chiến lược lâu dài, Công cuộc Đổi mới đã trực tiếp "giải phóng được lực lượng sản xuất" và "khơi dậy sức mạnh toàn dân".`,
            title: "Chuyển Đổi Kinh Tế",
            icon: <FiTrendingUp className="w-5 h-5" />,
            className: "col-span-12"
        },

        // Strategic Vision (spans 6 columns)
        {
            type: 'text' as const,
            data: `## Tầm Nhìn Chiến Lược

### Tư Duy Đổi Mới
- **Nhìn thẳng vào sự thật:** Thừa nhận những sai lầm
- **Nói rõ sự thật:** Đặt vấn đề thẳng thắn
- **Nói đúng sự thật:** Đề xuất giải pháp cụ thể

### Giải Phóng Sản Xuất
- **Lực lượng sản xuất:** Khơi dậy tiềm năng kinh tế
- **Sức mạnh toàn dân:** Động viên nhân dân tham gia
- **Tư duy đổi mới:** Chuyển biến nhận thức lãnh đạo

### Hướng Đi Mới
- Từ kinh tế kế hoạch sang thị trường
- Từ tập trung sang phân tán
- Từ khép kín sang hội nhập`,
            title: "Tầm Nhìn Chiến Lược",
            icon: <FiTarget className="w-5 h-5" />,
            className: "col-span-6"
        },

        // Historical Significance (spans 6 columns)
        {
            type: 'text' as const,
            data: `## Ý Nghĩa Lịch Sử

### Bước Ngoặt Tất Yếu
- **Thất bại của Bao cấp:** Tạo động lực thay đổi
- **Đòi hỏi của nhân dân:** Áp lực từ thực tiễn
- **Quyết định chiến lược:** Chuyển hướng phát triển

### Sự Khác Biệt
- **Trước 1986:** Kế hoạch hóa tập trung
- **Sau 1986:** Thị trường định hướng xã hội chủ nghĩa
- **Kết quả:** Sự "cởi trói" nền kinh tế

### Tầm Quan Trọng
- Đánh dấu sự chuyển mình của Việt Nam
- Mở đường cho hội nhập toàn cầu
- Tạo nền tảng cho mọi thành tựu hiện tại`,
            title: "Ý Nghĩa Lịch Sử",
            icon: <FiShield className="w-5 h-5" />,
            className: "col-span-6"
        },

        // Transformation Process (spans 8 columns)
        {
            type: 'text' as const,
            data: `## Quá Trình Chuyển Mình

Đổi mới được nhìn nhận là một quá trình "tìm tòi, khám phá và sáng tạo", tương tự như việc áp dụng lại mô hình Chính sách kinh tế mới (NEP) của Lenin. Bước chuyển mình này không chỉ là một cuộc cải cách đơn thuần mà là một quyết định chiến lược.

Sự "cởi trói" nền kinh tế đã biến Việt Nam từ một quốc gia thiếu thốn, khép kín trở thành một nền kinh tế năng động và hội nhập sâu rộng. Những thành tựu vĩ đại của Việt Nam hôm nay đều bắt nguồn từ quyết định đúng đắn này.`,
            title: "Quá Trình Chuyển Mình",
            icon: <FiRefreshCw className="w-5 h-5" />,
            className: "col-span-8"
        },

        // Key Principles (spans 4 columns)
        {
            type: 'text' as const,
            data: `## Nguyên Tắc Cốt Lõi

### Định Hướng Xã Hội Chủ Nghĩa
- **Thị trường:** Cơ chế phân bổ tài nguyên
- **Định hướng:** Đảm bảo công bằng xã hội
- **Nhiều thành phần:** Phát triển kinh tế đa dạng

### Phát Triển Bền Vững
- **Kinh tế:** Tăng trưởng ổn định
- **Xã hội:** Cải thiện đời sống
- **Môi trường:** Bảo vệ tài nguyên

### Tư Duy Đổi Mới
- **Nhìn thẳng vào sự thật:** Thừa nhận sai lầm
- **Nói rõ sự thật:** Đặt vấn đề thẳng thắn
- **Nói đúng sự thật:** Đề xuất giải pháp cụ thể`,
            title: "Nguyên Tắc Cốt Lõi",
            icon: <FiHome className="w-5 h-5" />,
            className: "col-span-4"
        },

        // Strategic Implementation (spans 8 columns)
        {
            type: 'text' as const,
            data: `## Chiến Lược Thực Thi

### Sự "Cởi Trói" Nền Kinh Tế
- Từ nền kinh tế kế hoạch tập trung
- Chuyển sang nền kinh tế thị trường
- Giải phóng lực lượng sản xuất
- Khơi dậy sức mạnh toàn dân

### Quá Trình Tìm Tòi, Khám Phá
- Học hỏi từ mô hình NEP của Lenin
- Áp dụng sáng tạo vào điều kiện Việt Nam
- Thử nghiệm và điều chỉnh linh hoạt
- Đảm bảo phù hợp với thực tiễn

### Bước Chuyển Mình Vĩ Đại
- Từ quốc gia thiếu thốn, khép kín
- Trở thành nền kinh tế năng động, hội nhập
- Tham gia sâu rộng vào nền kinh tế toàn cầu
- Tạo nền tảng cho mọi thành tựu hiện tại`,
            title: "Chiến Lược Thực Thi",
            icon: <FiTarget className="w-5 h-5" />,
            className: "col-span-8"
        },

        // Historical Context (spans 4 columns)
        {
            type: 'text' as const,
            data: `## Bối Cảnh Lịch Sử

### Động Lực Thay Đổi
- Thất bại của cơ chế Bao cấp
- Khủng hoảng kinh tế-xã hội trầm trọng
- Đòi hỏi cấp bách từ thực tiễn
- Áp lực từ người dân

### Quyết Định Chiến Lược
- Đại hội Đảng Cộng sản Việt Nam lần thứ VI
- Tháng 12 năm 1986
- Bước ngoặt lịch sử tất yếu
- Đánh dấu sự chuyển mình của Việt Nam`,
            title: "Bối Cảnh Lịch Sử",
            icon: <FiClock className="w-5 h-5" />,
            className: "col-span-4"
        },

        // Image placeholders
        {
            type: 'image' as const,
            data: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
            title: "Đại hội Đảng lần thứ VI",
            icon: <FiBook className="w-5 h-5" />,
            className: "col-span-4"
        },
        {
            type: 'image' as const,
            data: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
            title: "Phát triển kinh tế",
            icon: <FiTrendingUp className="w-5 h-5" />,
            className: "col-span-4"
        },
        {
            type: 'image' as const,
            data: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
            title: "Hội nhập kinh tế",
            icon: <FiMap className="w-5 h-5" />,
            className: "col-span-4"
        },

        // Legacy and Impact (spans 12 columns)
        {
            type: 'text' as const,
            data: `## Di Sản và Tác Động

Công cuộc Đổi mới đã tạo ra một sự đối lập hoàn toàn so với thời kỳ Bao cấp. Những thành tựu phi thường về kinh tế và xã hội là luận cứ vững chắc nhất để khẳng định rằng Việt Nam chưa bao giờ có được một "cơ đồ" và "tiềm lực" như ngày nay.

Từ một nền kinh tế trì trệ với lạm phát 774,7% năm 1986, Việt Nam đã duy trì mức tăng trưởng trung bình ấn tượng, khoảng 7% mỗi năm. GDP bình quân đầu người đã tăng từ vài trăm USD lên 4.110 USD năm 2022, tương đương với việc tăng "gấp khoảng 38 lần" chỉ trong hơn ba thập kỷ.

Công cuộc Đổi mới không chỉ đơn thuần là một cuộc cải cách kinh tế, mà còn là sự giải phóng toàn diện các tiềm năng của đất nước và con người, tạo ra nền tảng vững chắc cho mọi thành tựu hiện tại.`,
            title: "Di Sản và Tác Động",
            icon: <FiHeart className="w-5 h-5" />,
            className: "col-span-12"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex justify-center items-center">
            <div className="w-[70%] py-4">
                {/* 12-column grid container */}
                <div className="grid grid-cols-12 gap-4 auto-rows-fr">
                    {cardsData.map((cardData, index) => (
                        <Card
                            key={index}
                            content={cardData}
                            className={cardData.className || ""}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
