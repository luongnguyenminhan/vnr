'use client';

import { FiBook, FiClock, FiHeart, FiHome, FiMap, FiMusic, FiShield, FiShoppingBag, FiTrendingUp } from 'react-icons/fi';
import Card from '../ui/Card';

export default function ChapterI() {
    // Card data structure
    const cardsData = [
        // Header card (spans 12 columns)
        {
            type: 'text' as const,
            data: `# Chương I: Ký Ức Gian Nan - Thời Kỳ Bao Cấp Qua Những Trải Nghiệm

## Bối Cảnh Lịch Sử và Kinh Tế

Thời kỳ Bao cấp là tên gọi để chỉ giai đoạn lịch sử từ đầu năm 1976 đến cuối năm 1986, khi hầu hết mọi sinh hoạt kinh tế của Việt Nam đều diễn ra dưới nền kinh tế kế hoạch hóa, một đặc trưng của nền kinh tế theo mô hình xã hội chủ nghĩa tập trung.`,
            title: "Tổng Quan Chương I",
            icon: <FiBook className="w-5 h-5" />,
            className: "col-span-12"
        },

        // Introduction (spans 8 columns)
        {
            type: 'text' as const,
            data: `Trong giai đoạn này, nền kinh tế tư nhân dần bị xóa bỏ, nhường chỗ cho khối kinh tế tập thể và kinh tế nhà nước, trong đó Nhà nước nắm độc quyền phân phối và chỉ huy toàn bộ hoạt động sản xuất và lưu thông hàng hóa.

Nền kinh tế được miêu tả là hết sức khó khăn và trì trệ. Đây được coi là một giai đoạn "cực khổ nhất" của người dân và nền kinh tế Việt Nam trong thế kỷ 20. Nền kinh tế không có tích lũy, tăng trưởng thấp và thậm chí không phát triển.`,
            title: "Bối Cảnh Kinh Tế",
            icon: <FiClock className="w-5 h-5" />,
            className: "col-span-8"
        },

        // Economic Data (spans 4 columns)
        {
            type: 'text' as const,
            data: `## Các Chỉ Số Kinh Tế

- **Lạm phát:** 774,7% (năm 1986)
- **Tình trạng:** Kinh tế trì trệ, thiếu hụt trầm trọng
- **Nguyên nhân:** Cơ chế kế hoạch hóa tập trung
- **Hậu quả:** Khủng hoảng kinh tế-xã hội nghiêm trọng`,
            title: "Thống Kê Kinh Tế",
            icon: <FiTrendingUp className="w-5 h-5" />,
            className: "col-span-4"
        },

        // Daily Life Experience (spans 12 columns)
        {
            type: 'text' as const,
            data: `## Trải Nghiệm Đời Sống Thường Nhật

Trong một nền kinh tế bị siết chặt bởi cơ chế kế hoạch hóa, cuộc sống hàng ngày của người dân được định hình bởi một hệ thống phân phối đặc thù, mà trong đó tem phiếu và sổ gạo là những vật dụng thiết yếu nhất.

Để mua bất kỳ món hàng gì, người dân đều phải sử dụng tem phiếu, bởi việc trao đổi bằng tiền mặt bị hạn chế. Chế độ hộ khẩu được thiết lập không chỉ để quản lý dân cư mà còn để phân phối lương thực, thực phẩm theo đầu người, với sổ gạo là minh chứng rõ ràng nhất cho cơ chế này.`,
            title: "Cuộc Sống Hàng Ngày",
            icon: <FiHome className="w-5 h-5" />,
            className: "col-span-12"
        },

        // Food Distribution System (spans 6 columns)
        {
            type: 'text' as const,
            data: `## Hệ Thống Phân Phối Lương Thực

### Tem Phiểu và Sổ Gạo
- **Tem phiếu:** Phương tiện mua sắm thiết yếu
- **Sổ gạo:** Giấy chứng nhận phân phối lương thực
- **Mục đích:** Kiểm soát phân phối hàng hóa
- **Hậu quả:** Thiếu hụt hàng hóa trầm trọng

### Khó Khăn Trong Mua Sắm
- Mua gạo, vải, dầu hỏa trở thành "thử thách"
- Hình ảnh "xếp hàng mua vé xong mới xếp hàng lấy phở"
- Nỗi lo mất sổ gạo - "mặt như mất sổ gạo"
- Sự phụ thuộc tuyệt đối vào hệ thống phân phối`,
            title: "Tem Phiểu & Sổ Gạo",
            icon: <FiShoppingBag className="w-5 h-5" />,
            className: "col-span-6"
        },

        // Personal Stories (spans 6 columns)
        {
            type: 'text' as const,
            data: `## Hồi Ức Cá Nhân

### Những Câu Chuyện Sống Động
- Cuốn sách "Sống thời bao cấp" của Ngô Minh
- Những tháng ngày "quay cuồng" với nỗi lo cơm áo
- Sự khác biệt giữa thế hệ cũ và thế hệ trẻ
- Từ "xa lắc xa lơ" đến "siêu thực" với thế hệ sau

### Bài Học Từ Quá Khứ
- Nỗi lo cơm áo gạo tiền
- Sự thiếu thốn của hàng hóa thiết yếu
- Ý nghĩa của tem phiếu trong đời sống
- Tầm quan trọng của tự do mua sắm

### Câu Chuyện Thực Tế
- Người dân xếp hàng mua vé xong mới xếp hàng lấy phở
- Mua gạo, vải, dầu hỏa trở thành "thử thách trần ai"
- Nỗi lo mất sổ gạo - "mặt như mất sổ gạo"
- Sự phụ thuộc tuyệt đối vào hệ thống phân phối`,
            title: "Ký Ức & Bài Học",
            icon: <FiHeart className="w-5 h-5" />,
            className: "col-span-6"
        },

        // Cultural Impact (spans 6 columns)
        {
            type: 'text' as const,
            data: `## Tác Động Văn Hóa

### Những Cụm Từ Mới
- "Mặt như mất sổ gạo" - biểu hiện lo lắng tột độ
- "Xếp hàng" - hoạt động thường nhật
- "Tem phiếu" - khái niệm trung tâm

### Sự Thay Đổi Tư Duy
- Từ tự do mua sắm sang phân phối theo kế hoạch
- Từ thị trường tự do sang tem phiếu
- Từ sung túc sang thiếu thốn

### Hệ Thống Quản Lý
- Việc in ấn, phát hành tem phiếu phức tạp
- Thống kê, tính toán thủ công tốn kém
- Tem phiếu vừa là công cụ phân phối vừa là tiền tệ
- Vòng luẩn quẩn của thiếu hiệu quả và khó khăn`,
            title: "Tác Động Văn Hóa",
            icon: <FiMusic className="w-5 h-5" />,
            className: "col-span-6"
        },

        // Additional Economic Details (spans 6 columns)
        {
            type: 'text' as const,
            data: `## Chi Tiết Kinh Tế

### Tình Trạng Lạm Phát
- Đạt đỉnh 774,7% vào năm 1986
- Làm suy giảm nghiêm trọng sức mua
- Tạo ra khủng hoảng kinh tế-xã hội
- Động lực chính cho Công cuộc Đổi mới

### Tình Trạng Thiếu Hụt
- Thiếu hụt hàng hóa cơ bản nhất
- Từ lương thực đến hàng tiêu dùng
- Hệ thống tem phiếu kiểm soát phân phối
- Khủng hoảng kinh tế-xã hội nghiêm trọng`,
            title: "Chi Tiết Kinh Tế",
            icon: <FiTrendingUp className="w-5 h-5" />,
            className: "col-span-6"
        },

        // Management System (spans 8 columns)
        {
            type: 'text' as const,
            data: `## Hệ Thống Quản Lý Tem Phiểu

Việc in ấn, phát hành và quản lý tem phiếu đòi hỏi sự phối hợp phức tạp của nhiều ban ngành và sử dụng các phương pháp thống kê, tính toán thủ công, tốn kém nhân lực và vật lực.

Tem phiếu không chỉ là một cơ chế phân phối mà còn mang chức năng và giá trị của tiền tệ. Điều này cho thấy rằng sự thiếu hiệu quả không chỉ nằm ở bản chất của nền kinh tế mà còn ở chính hệ thống quản lý cồng kềnh, quan liêu, tạo ra một vòng luẩn quẩn của sự thiếu hụt và khó khăn.`,
            title: "Quản Lý Tem Phiểu",
            icon: <FiShield className="w-5 h-5" />,
            className: "col-span-8"
        },

        // Cultural Impact (spans 4 columns)
        {
            type: 'text' as const,
            data: `## Tác Động Văn Hóa

### Những Cụm Từ Mới
- "Mặt như mất sổ gạo" - biểu hiện lo lắng tột độ
- "Xếp hàng" - hoạt động thường nhật
- "Tem phiếu" - khái niệm trung tâm

### Sự Thay Đổi Tư Duy
- Từ tự do mua sắm sang phân phối theo kế hoạch
- Từ thị trường tự do sang tem phiếu
- Từ sung túc sang thiếu thốn`,
            title: "Tác Động Văn Hóa",
            icon: <FiMusic className="w-5 h-5" />,
            className: "col-span-4"
        },

        // Image placeholders
        {
            type: 'image' as const,
            data: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
            title: "Tem phiếu thời bao cấp",
            icon: <FiShoppingBag className="w-5 h-5" />,
            className: "col-span-4"
        },
        {
            type: 'image' as const,
            data: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
            title: "Cửa hàng phân phối",
            icon: <FiHome className="w-5 h-5" />,
            className: "col-span-4"
        },
        {
            type: 'image' as const,
            data: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
            title: "Người dân xếp hàng",
            icon: <FiMap className="w-5 h-5" />,
            className: "col-span-4"
        },

        // Legacy and Lessons (spans 12 columns)
        {
            type: 'text' as const,
            data: `## Di Sản và Bài Học

Những trải nghiệm này là một phần đời không thể nào quên đối với những người đã từng sống trong giai đoạn ấy. Tuy nhiên, đối với thế hệ sinh sau thời Đổi mới, những câu chuyện về tem phiếu và xếp hàng lại trở nên "xa lắc xa lơ, có phần siêu thực".

Sự khác biệt này cho thấy một sự thay đổi cơ bản trong cấu trúc kinh tế và xã hội, nơi những nỗi lo toan của quá khứ đã nhường chỗ cho sự tự do và sung túc của hiện tại. Những câu chuyện về sổ gạo và tem phiếu không chỉ là ký ức về sự khó khăn, mà còn là lời nhắc nhở mạnh mẽ về sự phụ thuộc và thiếu tự chủ.`,
            title: "Di Sản Thời Bao Cấp",
            icon: <FiHeart className="w-5 h-5" />,
            className: "col-span-12"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full px-32 py-4">
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
