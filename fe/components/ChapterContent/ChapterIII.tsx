'use client';

import { FiBook, FiHeart, FiHome, FiShield, FiTarget, FiTrendingUp, FiBarChart, FiRefreshCw, FiGlobe } from 'react-icons/fi';
import Card from '../ui/Card';

export default function ChapterIII() {
    // Card data structure
    const cardsData = [
        // Header card (spans 12 columns)
        {
            type: 'text' as const,
            data: `# Chương IV: Tổng Hợp và Đối Chiếu - Sự Khác Biệt Giữa Hai Giai Đoạn Lịch Sử

## Đối Chiếu Hai Giai Đoạn

Sự đối chiếu giữa hai giai đoạn lịch sử là cách trực quan nhất để nhận thấy sự phát triển vượt bậc của Việt Nam. Bảng dưới đây tóm tắt những khác biệt cơ bản giữa thời kỳ Bao cấp và thời kỳ Đổi mới.`,
            title: "Tổng Quan Chương IV",
            icon: <FiBook className="w-5 h-5" />,
            className: "col-span-12"
        },

        // Comparison Table (spans 12 columns)
        {
            type: 'text' as const,
            data: `## Bảng So Sánh Chi Tiết

| Chỉ số | Thời kỳ Bao cấp (1986) | Thời kỳ Đổi mới (2022-2024) |
|--------|------------------------|-----------------------------|
| **Lạm phát** | 774,7% | Ổn định ở mức thấp |
| **Quy mô kinh tế** | ~ 26,88 tỷ USD | ~ 409 tỷ USD (2022) |
| **GDP bình quân đầu người** | Thấp (Vài trăm USD đầu 90s) | 4.110 USD (2022), dự kiến 4.622,54 USD (2024) |
| **Tỷ lệ nghèo** | Cao (>58% năm 1993) | Giảm mạnh (2,23% năm 2021) |
| **Chỉ số HDI** | Thuộc nhóm Trung bình | Thuộc nhóm Cao |
| **Vai trò quốc tế** | Cô lập, thiếu thốn | Đóng vai trò dẫn dắt trong ASEAN, có tiếng nói tại Liên Hợp Quốc |`,
            title: "Bảng Đối Chiếu",
            icon: <FiBarChart className="w-5 h-5" />,
            className: "col-span-12"
        },

        // Economic Comparison (spans 6 columns)
        {
            type: 'text' as const,
            data: `## So Sánh Về Kinh Tế

### Lạm Phát
- **Bao cấp (1986):** 774,7%
- **Đổi mới (2022-2024):** Ổn định, thấp
- **Sự khác biệt:** Từ siêu lạm phát sang ổn định

### Quy Mô GDP
- **Bao cấp:** 26,88 tỷ USD
- **Đổi mới:** 409 tỷ USD
- **Sự khác biệt:** Tăng 15 lần

### GDP Bình Quân
- **Bao cấp:** Vài trăm USD
- **Đổi mới:** 4.110 USD (2022)
- **Sự khác biệt:** Tăng 38 lần

### Tăng Trưởng
- **Bao cấp:** Trì trệ, không phát triển
- **Đổi mới:** 7% mỗi năm`,
            title: "So Sánh Kinh Tế",
            icon: <FiTrendingUp className="w-5 h-5" />,
            className: "col-span-6"
        },

        // Social Comparison (spans 6 columns)
        {
            type: 'text' as const,
            data: `## So Sánh Về Xã Hội

### Tỷ Lệ Nghèo
- **Bao cấp (1993):** 58% hộ nghèo
- **Đổi mới (2021):** 2,23% hộ nghèo
- **Sự khác biệt:** Giảm 55,77 điểm phần trăm

### Nghèo Cùng Cực
- **Bao cấp (1990s):** 40%
- **Đổi mới (2020):** Dưới 5%
- **Sự khác biệt:** Giảm 35 điểm phần trăm

### Chỉ Số HDI
- **Bao cấp:** Nhóm Trung bình
- **Đổi mới:** Nhóm Cao
- **Sự khác biệt:** Thăng hạng

### Chất Lượng Đời Sống
- **Bao cấp:** Thiếu thốn, xếp hàng
- **Đổi mới:** Sung túc, tự do mua sắm`,
            title: "So Sánh Xã Hội",
            icon: <FiHome className="w-5 h-5" />,
            className: "col-span-6"
        },

        // International Comparison (spans 8 columns)
        {
            type: 'text' as const,
            data: `## So Sánh Về Quốc Tế

### Vị Thế Thương Mại
- **Bao cấp:** Đóng cửa, cô lập
- **Đổi mới:** Top 22 thế giới, đối tác lớn

### Vai Trò Ngoại Giao
- **Bao cấp:** Thiếu thốn, hạn chế
- **Đổi mới:** Dẫn dắt ASEAN, có tiếng nói LHQ

### Uy Tín Quốc Tế
- **Bao cấp:** Thấp, không được công nhận
- **Đổi mới:** Thăng hạng mạnh về thương hiệu

### Hội Nhập
- **Bao cấp:** Khép kín, hạn chế
- **Đổi mới:** Ký nhiều FTA, hội nhập sâu

### Chỉ Số Hạnh Phúc
- **Bao cấp:** Không có dữ liệu
- **Đổi mới:** Top 46/2025, tăng mạnh`,
            title: "So Sánh Quốc Tế",
            icon: <FiGlobe className="w-5 h-5" />,
            className: "col-span-8"
        },

        // System Comparison (spans 4 columns)
        {
            type: 'text' as const,
            data: `## So Sánh Về Hệ Thống

### Kinh Tế
- **Bao cấp:** Kế hoạch hóa tập trung
- **Đổi mới:** Thị trường định hướng XHCN

### Quản Lý
- **Bao cấp:** Quan liêu, cồng kềnh
- **Đổi mới:** Linh hoạt, hiệu quả

### Quyền Tự Do
- **Bao cấp:** Hạn chế
- **Đổi mới:** Được đảm bảo

### Tiềm Năng
- **Bao cấp:** Bị kìm hãm
- **Đổi mới:** Được giải phóng`,
            title: "So Sánh Hệ Thống",
            icon: <FiShield className="w-5 h-5" />,
            className: "col-span-4"
        },

        // Transformation Evidence (spans 12 columns)
        {
            type: 'text' as const,
            data: `## Minh Chứng Cho Sự Chuyển Mình

Sự khác biệt về mặt số liệu cho thấy một quá trình chuyển mình mang tính lịch sử. Từ một nền kinh tế bị bóp nghẹt bởi cơ chế tập trung, phụ thuộc hoàn toàn vào hệ thống phân phối và tem phiếu, người dân Việt Nam ngày nay được sống trong một nền kinh tế năng động, thịnh vượng, với quyền tự do mua sắm và kinh doanh được đảm bảo.

Từ một quốc gia vừa gượng dậy sau chiến tranh, thiếu thốn và cô lập, Việt Nam đã vươn lên trở thành một quốc gia có tiếng nói, đóng góp tích cực vào các vấn đề khu vực và toàn cầu.`,
            title: "Minh Chứng Chuyển Mình",
            icon: <FiRefreshCw className="w-5 h-5" />,
            className: "col-span-12"
        },

        // Key Differences (spans 6 columns)
        {
            type: 'text' as const,
            data: `## Những Khác Biệt Cốt Lõi

### Tư Duy
- **Bao cấp:** Ổn định, bảo thủ
- **Đổi mới:** Đổi mới, sáng tạo

### Phương Pháp
- **Bao cấp:** Tập trung, mệnh lệnh
- **Đổi mới:** Phân tán, thị trường

### Quan Hệ
- **Bao cấp:** Phụ thuộc vào phân phối
- **Đổi mới:** Tự chủ, tự do

### Tiềm Năng
- **Bao cấp:** Bị kìm hãm
- **Đổi mới:** Được khơi dậy

### Tương Lai
- **Bao cấp:** Bế tắc
- **Đổi mới:** Mở rộng, phát triển

### Tâm Lý Xã Hội
- **Bao cấp:** Lo lắng, bất an
- **Đổi mới:** Tự tin, lạc quan`,
            title: "Khác Biệt Cốt Lõi",
            icon: <FiTarget className="w-5 h-5" />,
            className: "col-span-12"
        },

        // Detailed Comparison (spans 12 columns)
        {
            type: 'text' as const,
            data: `## Bảng So Sánh Chi Tiết Mở Rộng

| **Chỉ số** | **Thời kỳ Bao cấp (1986)** | **Thời kỳ Đổi mới (2022-2024)** |
|------------|----------------------------|----------------------------------|
| **Lạm phát** | 774,7% | Ổn định ở mức thấp |
| **Quy mô kinh tế** | ~26,88 tỷ USD | ~409 tỷ USD (tăng 15 lần) |
| **GDP bình quân đầu người** | Vài trăm USD | 4.110 USD (tăng 38 lần) |
| **Tỷ lệ nghèo** | 58% hộ nghèo (1993) | 2,23% hộ nghèo (2021) |
| **Chỉ số HDI** | Nhóm Trung bình | Nhóm Cao |
| **Vai trò quốc tế** | Cô lập, thiếu thốn | Dẫn dắt ASEAN, có tiếng nói LHQ |
| **Hệ thống kinh tế** | Kế hoạch hóa tập trung | Thị trường định hướng XHCN |
| **Tình trạng hàng hóa** | Thiếu hụt trầm trọng | Dồi dào, đa dạng |
| **Tự do mua sắm** | Tem phiếu, phân phối | Tự do, siêu thị |
| **Tâm lý người dân** | Lo lắng, bất an | Tự tin, lạc quan |`,
            title: "Bảng So Sánh Mở Rộng",
            icon: <FiBarChart className="w-5 h-5" />,
            className: "col-span-12"
        },

        // Impact on People (spans 6 columns)
        {
            type: 'text' as const,
            data: `## Tác Động Đến Người Dân

### Đời Sống Hàng Ngày
- **Bao cấp:** Tem phiếu, sổ gạo, xếp hàng
- **Đổi mới:** Tự do mua sắm, siêu thị

### Cơ Hội
- **Bao cấp:** Hạn chế, thiếu thốn
- **Đổi mới:** Mở rộng, phong phú

### Tâm Lý
- **Bao cấp:** Lo lắng, bất an
- **Đổi mới:** Tự tin, lạc quan

### Khát Vọng
- **Bao cấp:** Sinh tồn
- **Đổi mới:** Phát triển, thịnh vượng

### Tôn Trọng
- **Bao cấp:** Thấp (đối với hệ thống)
- **Đổi mới:** Cao (đối với thành quả)`,
            title: "Tác Động Đến Người Dân",
            icon: <FiHeart className="w-5 h-5" />,
            className: "col-span-5"
        },

        // Image placeholders
        {
            type: 'image' as const,
            data: 'https://hnm.1cdn.vn/2016/11/13/hanoimoi.com.vn-uploads-album-20161113-_72057346-88c1-4140-ac13-9675a54fe63c.jpg',
            title: "Thời kỳ bao cấp",
            icon: <FiHome className="w-5 h-5" />,
            className: "col-span-7"
        },
        {
            type: 'image' as const,
            data: 'https://icdn.dantri.com.vn/thumb_w/960/2019/08/30/giao-thong-ha-noi-1567142314122.jpg',
            title: "Thời kỳ đổi mới",
            icon: <FiTrendingUp className="w-5 h-5" />,
            className: "col-span-6"
        },
        {
            type: 'image' as const,
            data: 'https://hn.ss.bfcplatform.vn/tckt/2021/05/21A05006-2.jpg',
            title: "Việt Nam hiện đại",
            icon: <FiGlobe className="w-5 h-5" />,
            className: "col-span-6"
        },

        // Conclusion (spans 12 columns)
        {
            type: 'text' as const,
            data: `## Kết Luận Sự Đối Chiếu

Sự thăng hạng về danh tiếng trên các bảng xếp hạng quốc tế về kinh doanh, ngoại giao và chỉ số hạnh phúc là minh chứng không thể chối cãi cho sự gia tăng "uy tín" và "vị thế" của đất nước.

Sự khác biệt này không chỉ là một sự so sánh lịch sử, mà còn là nền tảng để trân trọng những giá trị hiện đại và tiếp tục vững bước trên con đường phát triển. Việt Nam hôm nay là kết quả của sự nỗ lực, quyết tâm và tầm nhìn chiến lược của một dân tộc kiên cường, đã và đang làm nên những điều phi thường.

Những câu chuyện về sổ gạo và tem phiếu không chỉ là ký ức về sự khó khăn, mà còn là lời nhắc nhở mạnh mẽ về sự phụ thuộc và thiếu tự chủ. Ngược lại, những con số ấn tượng về tăng trưởng GDP, giảm nghèo, và thăng hạng trên trường quốc tế là minh chứng sống động cho sự tự do, thịnh vượng và uy tín của Việt Nam hiện tại.`,
            title: "Kết Luận Đối Chiếu",
            icon: <FiShield className="w-5 h-5" />,
            className: "col-span-12"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex justify-center items-center">
            <div className="w-[70%] py-4">
                {/* 12-column grid container */}
                <div className="grid grid-cols-12 gap-4 auto-rows-min">
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
