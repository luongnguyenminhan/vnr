'use client';

import { FiBook, FiHeart, FiHome, FiShield, FiTarget, FiTrendingUp, FiDollarSign, FiAward, FiRefreshCw, FiAlertTriangle } from 'react-icons/fi';
import Card from '../ui/Card';

export default function ChapterII() {
    // Card data structure
    const cardsData = [
        // Main Header
        {
            type: 'text' as const,
            data: `# Chương II: Bước Ngoặt Lịch Sử - Đường Lối Đổi Mới (1986)
## Tổng Quan Công Cuộc Đổi Mới
Đại hội đại biểu toàn quốc lần thứ VI của Đảng Cộng sản Việt Nam (tháng 12/1986) đã trở thành một bước ngoặt lịch sử, mở ra kỷ nguyên Đổi mới toàn diện đất nước. Đây là thời điểm mà Đảng đã có sự chuyển biến mạnh mẽ trong tư duy lãnh đạo, từ việc duy trì nền kinh tế kế hoạch hóa sang nền kinh tế thị trường định hướng xã hội chủ nghĩa. Sự chuyển mình này không phải là kết quả của ngẫu nhiên mà là sản phẩm của sự kiên trì, sáng tạo và khát vọng vươn lên của toàn dân tộc.`,
            title: "Chương II: Đường Lối Đổi Mới",
            icon: <FiBook className="w-6 h-6" />,
            className: "col-span-12 text-2xl leading-relaxed"
        },
        {
            type: 'image' as const,
            data: 'https://imgnvsk.vnanet.vn/MediaUpload/Org/2023/08/19/dhvi-619-16-48-13.png',
            title: "Đại Hội Đảng Lần Thứ VI - Bước Ngoặt Vĩ Đại",
            icon: <FiTarget className="w-6 h-6" />,
            className: "col-span-12"
        },

        // Section 2.1: Foundation and Necessity of Doi Moi
        {
            type: 'text' as const,
            data: `## 2.1. Nền Tảng và Sự Cần Thiết của Đổi Mới

Cuộc khủng hoảng kinh tế-xã hội trầm trọng vào cuối thập niên 70, đầu 80 đã cho thấy những hạn chế và sai lầm của mô hình kinh tế cũ. Các mục tiêu kinh tế không đạt được, giá cả tăng vọt, đời sống nhân dân vô cùng khó khăn, thể hiện sự bế tắc của cơ chế kế hoạch hóa tập trung.

**Những biểu hiện của khủng hoảng:**
- **Kinh tế trì trệ:** Các mục tiêu Đại hội IV không đạt được
- **Giá cả tăng vọt:** Lạm phát phi mã
- **Đời sống khó khăn:** Nhân dân thiếu thốn vật chất
- **Bế tắc cơ chế:** Mô hình kế hoạch hóa tập trung đã lỗi thời`,
            title: "2.1. Nền Tảng và Sự Cần Thiết",
            icon: <FiAlertTriangle className="w-6 h-6" />,
            className: "col-span-12 text-xl leading-relaxed"
        },
        {
            type: 'text' as const,
            data: `## Những Bước Đi Đột Phá Trước Khi Chính Thức Đổi Mới

Trước khi chính thức khởi xướng công cuộc Đổi mới tại Đại hội VI, Đảng và Nhà nước đã có những bước đi đột phá, thử nghiệm để tìm ra con đường thoát khỏi khủng hoảng.

**Những bước đi quan trọng:**
- **Hội nghị Trung ương 6 (1979):** Khắc phục khuyết điểm, "sản xuất bung ra"
- **Chỉ thị 100-CT/TW (1981):** Khoán sản phẩm trong nông nghiệp
- **Phong trào quần chúng:** Tạo ra sự tăng trưởng đáng kể

**Ý nghĩa của những bước đi này:**
- Tạo tiền đề quan trọng cho nhận thức mới
- Thử nghiệm các phương thức quản lý mới
- Giải phóng sức sản xuất trong phạm vi nhất định
- Tạo động lực cho công cuộc Đổi mới toàn diện`,
            title: "Những Bước Đi Đột Phá Trước Đổi Mới",
            icon: <FiRefreshCw className="w-6 h-6" />,
            className: "col-span-12 md:col-span-6 text-xl leading-relaxed"
        },
        {
            type: 'image' as const,
            data: 'https://i-kinhdoanh.vnecdn.net/2016/12/15/mua-hang-thoi-bao-cap-0-9267-1481774665.jpg',
            title: "Khủng hoảng kinh tế thập niên 1980",
            icon: <FiTrendingUp className="w-6 h-6" />,
            className: "col-span-12 md:col-span-6"
        },
        {
            type: 'image' as const,
            data: 'https://dhtn.ttxvn.org.vn/Images/images/Boi%20Duong%20Nghiep%20Vu/Noi%20San%20Thong%20Tan/Nam%202021/So%206/NSTT/TR7_1.jpg',
            title: "Chỉ thị 100-CT/TW (1981) - Khoán sản phẩm",
            icon: <FiTarget className="w-6 h-6" />,
            className: "col-span-12 md:col-span-12"
        },
        {
            type: 'text' as const,
            data: `**Đường lối Đổi mới được hình thành trên cơ sở:**

- **Tổng kết thực tiễn:** Cách mạng Việt Nam qua 30 năm
- **Vận dụng sáng tạo:** Chủ nghĩa Mác-Lênin
- **Tiếp thu kinh nghiệm:** Cách mạng thế giới
- **Nhận thức mới:** Về chủ nghĩa xã hội trong thời đại mới

**Sự phát triển của cuộc cách mạng khoa học và công nghệ:**
- **"Kiểu dòng thác":** Sự bùng nổ công nghệ cuối thế kỷ XX
- **Yêu cầu mới:** Phải có cách nhìn mới, nhận thức mới
- **Quyết định chiến lược:** Thay đổi để tồn tại và phát triển

**Mặc dù những thử nghiệm trước đó chưa đủ để giải quyết tận gốc cuộc khủng hoảng, chúng đã tạo tiền đề quan trọng, giúp Đảng có được những nhận thức mới và định hình đường lối Đổi mới một cách toàn diện hơn.**`,
            title: "Tổng Kết Thực Tiễn và Nhận Thức Mới",
            icon: <FiTarget className="w-6 h-6" />,
            className: "col-span-12 md:col-span-8 text-xl leading-relaxed"
        },
        {
            type: 'image' as const,
            data: 'https://file.qdnd.vn/data/images/0/2016/04/22/phucthang/22042016tcq01.jpg?w=578',
            title: "Hội nghị Trung ương 6 - Bước đầu đổi mới",
            icon: <FiRefreshCw className="w-6 h-6" />,
            className: "col-span-12 md:col-span-4"
        },

        // Section 2.2: Pillars of Doi Moi Policy
        {
            type: 'text' as const,
            data: `## 2.2. Các Trụ Cột của Đường Lối Đổi Mới

Đường lối Đổi mới do Đại hội VI (1986) đề ra đã xác định một nguyên tắc cốt lõi: **đổi mới phải toàn diện và đồng bộ, nhưng lấy đổi mới kinh tế làm trọng tâm**.

**Triết lý cốt lõi:**
- **Nhận thức đúng vấn đề:** Khủng hoảng cốt lõi là sự trì trệ của kinh tế và cơ chế quản lý
- **Tập trung giải phóng sức sản xuất:** Đổi mới kinh tế trước, tạo nền tảng cho các đổi mới khác
- **Đồng bộ và toàn diện:** Các mặt kinh tế, chính trị, văn hóa, xã hội phát triển hài hòa

**Việc lựa chọn "đổi mới tư duy" làm bước đột phá và lấy "đổi mới kinh tế làm trọng tâm" là một lựa chọn chiến lược then chốt, đã giải phóng sức sản xuất, tạo động lực cho sự phát triển chưa từng có trong lịch sử dân tộc.**`,
            title: "2.2. Các Trụ Cột Của Đường Lối Đổi Mới",
            icon: <FiShield className="w-6 h-6" />,
            className: "col-span-12 md:col-span-8 text-xl leading-relaxed"
        },
        {
            type: 'image' as const,
            data: 'https://imgcdn.tapchicongthuong.vn/tcct-media/23/11/3/dai-hoi-vi_6544e661b5222.jpg',
            title: "Đổi mới tư duy - Bước đột phá chiến lược",
            icon: <FiRefreshCw className="w-6 h-6" />,
            className: "col-span-12 md:col-span-4"
        },
        {
            type: 'text' as const,
            data: `**Về kinh tế - Trọng tâm của Đổi mới:**

- **Xóa bỏ cơ chế cũ:** Kế hoạch hóa tập trung, quan liêu, bao cấp
- **Hình thành cơ chế mới:** Thị trường có sự quản lý của Nhà nước
- **Phát triển nền kinh tế:** Hàng hóa nhiều thành phần theo định hướng xã hội chủ nghĩa
- **Mở rộng quan hệ kinh tế:** Đối ngoại rộng mở

**Về chính trị - Đổi mới chủ động và vững chắc:**

- **Xây dựng Nhà nước pháp quyền:** "Của dân, do dân, vì dân"
- **Thực hiện nền dân chủ:** Xã hội chủ nghĩa, không đa nguyên chính trị
- **Phù hợp với đổi mới kinh tế:** Đổi mới chính trị theo kịp kinh tế
- **Tăng cường vai trò lãnh đạo:** Của Đảng trong nền kinh tế thị trường`,
            title: "Đổi Mới Kinh Tế - Trọng Tâm",
            icon: <FiDollarSign className="w-6 h-6" />,
            className: "col-span-12 md:col-span-6 text-xl leading-relaxed"
        },
        {
            type: 'image' as const,
            data: 'https://imgcdn.tapchicongthuong.vn/thumb/w_1000/tcct-media/23/12/18/chuyen-giao-quyen-tu-chu-cho-cac-xi-nghiep-nhung-nam-1986-1995_657fb70499fa3.jpg',
            title: "Nền kinh tế hàng hóa nhiều thành phần",
            icon: <FiTrendingUp className="w-6 h-6" />,
            className: "col-span-12 md:col-span-6"
        },
        {
            type: 'text' as const,
            data: `**Về văn hóa - Xã hội:**

- **Đổi mới văn hóa:** Xây dựng nền văn hóa tiên tiến, đậm đà bản sắc dân tộc
- **Cải thiện đời sống:** Nhân dân là mục tiêu, động lực và chủ thể của đổi mới
- **Đảm bảo công bằng xã hội:** Giảm nghèo, tạo việc làm, phát triển bền vững
- **Phát huy sức mạnh toàn dân tộc:** Trong công cuộc đổi mới và phát triển

**Những nguyên tắc cơ bản:**

- **Toàn diện nhưng có trọng tâm:** Kinh tế là trọng tâm, các mặt khác hỗ trợ
- **Đồng bộ và có kế thừa:** Giữ vững những thành tựu, đổi mới những hạn chế
- **Tự lực tự cường:** Phát huy nội lực, tranh thủ ngoại lực
- **Thực tiễn là tiêu chuẩn:** Kiểm nghiệm bằng thực tiễn cách mạng Việt Nam`,
            title: "Đổi Mới Văn Hóa - Xã Hội",
            icon: <FiHeart className="w-6 h-6" />,
            className: "col-span-12 md:col-span-6 text-xl leading-relaxed"
        },
        {
            type: 'image' as const,
            data: 'https://hdll.vn/FileUpload/Images/bho.jpg',
            title: "Văn hóa Việt Nam tiên tiến, đậm đà bản sắc",
            icon: <FiHome className="w-6 h-6" />,
            className: "col-span-12 md:col-span-6"
        },

        // Conclusion - Chapter Summary
        {
            type: 'text' as const,
            data: `## Kết Luận Chương II: Ý Nghĩa Lịch Sử của Đường Lối Đổi Mới

Đường lối Đổi mới do Đại hội VI (1986) đề ra không chỉ là một quyết định chiến lược thông thường mà là một bước ngoặt lịch sử mang tính quyết định đối với số phận dân tộc.

**Những thành tựu cốt lõi:**

- **Giải phóng sức sản xuất:** Đổi mới kinh tế làm trọng tâm
- **Thay đổi tư duy lãnh đạo:** Từ kế hoạch hóa sang thị trường
- **Đồng bộ và toàn diện:** Các mặt kinh tế, chính trị, văn hóa, xã hội
- **Tự lực tự cường:** Phát huy nội lực, tranh thủ ngoại lực

**Sự chuyển mình lịch sử:**
- Từ khủng hoảng kinh tế-xã hội trầm trọng
- Sang nền kinh tế thị trường định hướng xã hội chủ nghĩa
- Từ quốc gia thiếu thốn, khép kín
- Sang nền kinh tế năng động, hội nhập quốc tế

**Bài học quý giá:**
- **Nhận thức đúng thực tiễn:** Khủng hoảng là động lực thay đổi
- **Tổng kết sáng tạo:** Vận dụng chủ nghĩa Mác-Lênin vào điều kiện Việt Nam
- **Quyết tâm chính trị:** Dũng cảm thay đổi để tồn tại và phát triển
- **Tầm nhìn chiến lược:** Đặt lợi ích quốc gia, dân tộc lên trên hết

Đường lối Đổi mới đã mở ra kỷ nguyên mới cho đất nước, tạo nền tảng vững chắc cho mọi thành tựu vĩ đại của Việt Nam hiện nay.`,
            title: "Kết Luận Chương II",
            icon: <FiHeart className="w-6 h-6" />,
            className: "col-span-12 text-2xl leading-relaxed"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex justify-center items-center">
            <div className="w-[70%] py-4">
                {/* 12-column grid container */}
                <div className="grid grid-cols-12 gap-4 ">
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
