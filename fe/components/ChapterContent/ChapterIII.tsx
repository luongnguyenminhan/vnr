'use client';

import { FiBook, FiHeart, FiHome, FiMap, FiShield, FiTarget, FiTrendingUp, FiDollarSign, FiGlobe, FiAward } from 'react-icons/fi';
import Card from '../ui/Card';

export default function ChapterIII() {
    // Card data structure
    const cardsData = [
        // Header card (spans 12 columns)
        {
            type: 'text' as const,
            data: `# Chương III: Thành Tựu Vượt Trội - Luận Cứ Cho "Cơ đồ, Tiềm lực, Vị thế và Uy tín Quốc tế"

## Thành Tựu Toàn Diện

Công cuộc Đổi mới đã mang lại những thành tựu phi thường về kinh tế và xã hội, tạo ra một sự đối lập hoàn toàn so với thời kỳ Bao cấp. Những thành tựu này là luận cứ vững chắc nhất để khẳng định rằng Việt Nam chưa bao giờ có được một "cơ đồ" và "tiềm lực" như ngày nay.`,
            title: "Tổng Quan Chương III",
            icon: <FiBook className="w-5 h-5" />,
            className: "col-span-12"
        },

        // Economic Achievements (spans 8 columns)
        {
            type: 'text' as const,
            data: `## Thành Tựu Về Kinh Tế

Từ một nền kinh tế có quy mô nhỏ bé, tăng trưởng thấp và lạm phát lên tới 774,7% vào năm 1986, Việt Nam đã duy trì mức tăng trưởng trung bình ấn tượng, khoảng 7% mỗi năm.

Quy mô GDP theo giá hiện hành đã tăng trưởng vượt bậc, từ chỉ 26,88 tỷ USD vào thời điểm Đổi mới lên 409 tỷ USD vào năm 2022. Dữ liệu thống kê cũng cho thấy GDP bình quân đầu người của Việt Nam đã có một sự nhảy vọt chưa từng có, từ mức thấp chỉ vài trăm USD vào đầu thập kỷ 1990 lên 4.110 USD vào năm 2022 và dự kiến đạt 4.622,54 USD vào năm 2024.`,
            title: "Thành Tựu Kinh Tế",
            icon: <FiTrendingUp className="w-5 h-5" />,
            className: "col-span-8"
        },

        // Economic Statistics (spans 4 columns)
        {
            type: 'text' as const,
            data: `## Thống Kê Kinh Tế

### GDP
- **1986:** 26,88 tỷ USD
- **2022:** 409 tỷ USD
- **Tăng trưởng:** Gấp 15 lần

### GDP Bình Quân Đầu Người
- **1990:** Vài trăm USD
- **2022:** 4.110 USD
- **2024 (dự kiến):** 4.622,54 USD
- **Tăng trưởng:** Gấp 38 lần

### Tăng Trưởng
- **Trung bình:** 7%/năm
- **Ổn định:** Lạm phát thấp`,
            title: "Thống Kê Quan Trọng",
            icon: <FiDollarSign className="w-5 h-5" />,
            className: "col-span-4"
        },

        // Living Standards (spans 12 columns)
        {
            type: 'text' as const,
            data: `## Cải Thiện Đời Sống Dân Sinh

Sự phát triển không chỉ dừng lại ở kinh tế. Chỉ số Phát triển Con người (HDI) của Việt Nam cũng cho thấy sự tiến bộ toàn diện. Từ năm 2016 đến 2020, HDI của Việt Nam đã tăng từ 0,682 lên 0,706, giúp đất nước chuyển từ nhóm các quốc gia có chỉ số phát triển con người trung bình sang nhóm có chỉ số phát triển con người cao.

Tỷ lệ nghèo đói đã giảm một cách nhanh chóng và liên tục. Tình trạng nghèo cùng cực đã giảm từ mức cao nhất khoảng 40% vào những năm 1990 xuống dưới 5% vào năm 2020. Tỷ lệ hộ nghèo giảm mạnh từ 58% vào năm 1993 xuống chỉ còn 2,23% vào năm 2021.`,
            title: "Đời Sống Dân Sinh",
            icon: <FiHome className="w-5 h-5" />,
            className: "col-span-12"
        },

        // Poverty Reduction (spans 6 columns)
        {
            type: 'text' as const,
            data: `## Giảm Nghèo Đột Phá

### Thống Kê Giảm Nghèo
- **1993:** 58% hộ nghèo
- **2021:** 2,23% hộ nghèo
- **Giảm:** 55,77 điểm phần trăm

### Nghèo Cùng Cực
- **1990s:** 40% dân số
- **2020:** Dưới 5% dân số
- **Đánh giá:** "Điển hình thành công"

### Tăng Trưởng Thu Nhập
- **Tăng trưởng GDP:** 7%/năm
- **Thu nhập thực tế:** Tăng mạnh
- **Chất lượng sống:** Cải thiện toàn diện`,
            title: "Giảm Nghèo Đột Phá",
            icon: <FiTarget className="w-5 h-5" />,
            className: "col-span-6"
        },

        // HDI and Development (spans 6 columns)
        {
            type: 'text' as const,
            data: `## Chỉ Số Phát Triển Con Người

### HDI Việt Nam
- **2016:** 0,682 (Trung bình)
- **2020:** 0,706 (Cao)
- **Thăng hạng:** Từ nhóm Trung bình lên Cao

### Ba Chỉ Số Thành Phần
- **Sức khỏe:** Cải thiện
- **Giáo dục:** Đầu tư mạnh
- **Thu nhập:** Tăng trưởng bền vững

### Ý Nghĩa
- Phát triển bền vững
- Lấy con người làm trung tâm
- Chất lượng sống cao hơn`,
            title: "Phát Triển Con Người",
            icon: <FiAward className="w-5 h-5" />,
            className: "col-span-6"
        },

        // Personal Stories (spans 8 columns)
        {
            type: 'text' as const,
            data: `## Câu Chuyện Thực Tế

Sự thay đổi về chất lượng đời sống được thể hiện rõ nhất qua những câu chuyện giản dị. Như lời một người dân trả lời phỏng vấn, từ chỗ "ăn ngô bung, cả xóm xếp hàng xem tivi," cuộc sống hiện tại là "ăn ngon mặc đẹp," với "siêu thị mọc khắp nơi."

Sự đối lập trực quan này chính là minh chứng sinh động nhất cho thành quả của Đổi mới. Những con số ấn tượng về tăng trưởng GDP, giảm nghèo, và thăng hạng trên trường quốc tế là minh chứng sống động cho sự tự do, thịnh vượng và uy tín của Việt Nam hiện tại.

### Sự Thay Đổi Đời Sống
- Từ tem phiếu sang tự do mua sắm
- Từ thiếu thốn sang sung túc
- Từ xếp hàng sang siêu thị hiện đại
- Từ lo lắng sang tự tin`,
            title: "Câu Chuyện Đời Thường",
            icon: <FiHeart className="w-5 h-5" />,
            className: "col-span-8"
        },

        // HDI Details (spans 4 columns)
        {
            type: 'text' as const,
            data: `## Chỉ Số Phát Triển Con Người

### Sự Tiến Bộ
- **2016:** 0,682 (Trung bình)
- **2020:** 0,706 (Cao)
- **Thăng hạng:** Từ nhóm Trung bình lên Cao

### Ba Chỉ Số Thành Phần
- **Sức khỏe:** Cải thiện đáng kể
- **Giáo dục:** Đầu tư mạnh mẽ
- **Thu nhập:** Tăng trưởng bền vững

### Ý Nghĩa
- Phát triển toàn diện
- Lấy con người làm trung tâm
- Chất lượng sống nâng cao
- Bền vững và bao trùm`,
            title: "Chi Tiết HDI",
            icon: <FiAward className="w-5 h-5" />,
            className: "col-span-4"
        },

        // International Position (spans 4 columns)
        {
            type: 'text' as const,
            data: `## Vị Thế Quốc Tế

### Thương Mại
- **Xếp hạng:** Top 22 thế giới
- **Tính chất:** Đối tác kinh tế lớn

### Ngoại Giao
- **ASEAN:** Vai trò dẫn dắt
- **LHQ:** Có tiếng nói quan trọng

### Uy Tín
- **Thương hiệu:** Thăng hạng vượt bậc
- **Hạnh phúc:** Top 46/2025`,
            title: "Vị Thế Quốc Tế",
            icon: <FiGlobe className="w-5 h-5" />,
            className: "col-span-4"
        },

        // International Integration (spans 12 columns)
        {
            type: 'text' as const,
            data: `## Hội Nhập Quốc Tế

Thành công của Đổi mới không chỉ tạo ra tiềm lực kinh tế nội tại mà còn nâng cao đáng kể "vị thế" và "uy tín" của Việt Nam trên trường quốc tế. Nền kinh tế Việt Nam đã chuyển từ trạng thái "đóng cửa, khép kín" sang trở thành một đối tác thương mại lớn thứ 22 trên toàn cầu.

Việt Nam đã chủ động và tích cực ký kết nhiều Hiệp định Thương mại Tự do (FTA) song phương và đa phương, bao gồm các thỏa thuận quan trọng như VJEPA (với Nhật Bản), VKFTA (với Hàn Quốc), và FTA với Liên minh Kinh tế Á Âu.`,
            title: "Hội Nhập Quốc Tế",
            icon: <FiGlobe className="w-5 h-5" />,
            className: "col-span-12"
        },

        // Diplomatic Achievements (spans 6 columns)
        {
            type: 'text' as const,
            data: `## Thành Tựu Ngoại Giao

### Trong ASEAN
- **Vai trò:** Dẫn dắt
- **Hoạt động:** Thúc đẩy hòa bình, ổn định
- **Hợp tác:** Khu vực toàn diện

### Tại Liên Hợp Quốc
- **Vị thế:** Có tiếng nói
- **Cam kết:** COP26 - Phát thải ròng 0 vào 2050
- **Đánh giá:** Quốc gia nghiêm túc thực hiện Mục tiêu 2030

### Các FTA Quan Trọng
- **VJEPA:** Nhật Bản
- **VKFTA:** Hàn Quốc
- **Eurasian FTA:** Liên minh Á Âu`,
            title: "Thành Tựu Ngoại Giao",
            icon: <FiMap className="w-5 h-5" />,
            className: "col-span-6"
        },

        // Global Recognition (spans 6 columns)
        {
            type: 'text' as const,
            data: `## Sự Công Nhận Quốc Tế

### Brand Finance
- **Kinh doanh & thương mại:** Tăng 6 bậc
- **Ngoại giao:** Tăng 12 bậc
- **Truyền thông:** Tăng 23 bậc

### Chỉ Số Hạnh Phúc
- **2023:** Hạng 65
- **2025:** Hạng 46
- **Đánh giá:** Một trong những nước tăng mạnh nhất châu Á

### Ý Nghĩa
- **Uy tín:** Được công nhận toàn cầu
- **Vị thế:** Nâng cao đáng kể
- **Tiềm lực:** Thể hiện mạnh mẽ`,
            title: "Công Nhận Quốc Tế",
            icon: <FiAward className="w-5 h-5" />,
            className: "col-span-6"
        },

        // Image placeholders
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
            title: "Hội nhập quốc tế",
            icon: <FiGlobe className="w-5 h-5" />,
            className: "col-span-4"
        },
        {
            type: 'image' as const,
            data: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop',
            title: "Cải thiện đời sống",
            icon: <FiHome className="w-5 h-5" />,
            className: "col-span-4"
        },

        // Conclusion (spans 12 columns)
        {
            type: 'text' as const,
            data: `## Kết Luận Chương III

Những thành tựu vượt trội này là minh chứng không thể chối cãi cho "cơ đồ, tiềm lực, vị thế và uy tín quốc tế" của Việt Nam hiện nay. Từ một quốc gia thiếu thốn, khép kín, Việt Nam đã vươn lên trở thành một nền kinh tế năng động, có vị thế và uy tín trên trường quốc tế.

Sự thăng hạng về danh tiếng trên các bảng xếp hạng quốc tế về kinh doanh, ngoại giao và chỉ số hạnh phúc là minh chứng không thể chối cãi cho sự gia tăng "uy tín" và "vị thế" của đất nước. Việt Nam hôm nay là kết quả của sự nỗ lực, quyết tâm và tầm nhìn chiến lược của một dân tộc kiên cường.`,
            title: "Tổng Kết Thành Tựu",
            icon: <FiShield className="w-5 h-5" />,
            className: "col-span-12"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full px-32 py-4">
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
