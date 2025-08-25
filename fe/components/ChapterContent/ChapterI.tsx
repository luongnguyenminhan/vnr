'use client';

import { FiAlertTriangle, FiBook, FiClock, FiDollarSign, FiHeart, FiShield, FiShoppingBag, FiTarget, FiTrendingUp, FiUsers } from 'react-icons/fi';
import Card from '../ui/Card';

export default function ChapterI() {
    // Card data structure
    const cardsData = [
        // Main Header
        {
            type: 'text' as const,
            data: `# Chương I: Một Thập Kỷ Gian Khó - Chân Dung Thời Kỳ Bao Cấp (1975-1986)
    ## Tổng Quan Thời Kỳ Bao Cấp
    Thời kỳ Bao cấp (1975-1986) là một giai đoạn đặc biệt trong lịch sử Việt Nam sau Đại thắng mùa Xuân năm 1975. Đây là thời kỳ mà đất nước vừa trải qua chiến tranh tàn phá, vừa phải đối mặt với những thách thức nội tại và đối ngoại vô cùng nặng nề. Mặc dù có những thuận lợi to lớn từ chiến thắng, nhưng những khó khăn về kinh tế-xã hội, những hậu quả chiến tranh và sự cô lập quốc tế đã tạo nên một "ma trận" thách thức mà không một mô hình kinh tế nào có thể dễ dàng vượt qua.`,
            title: "Chương I: Thời Kỳ Bao Cấp",
            icon: <FiBook className="w-6 h-6" />,
            className: "col-span-12 text-2xl leading-relaxed"
        },
        {
            type: 'image' as const,
            data: 'https://baoquangbinh.vn/dataimages/202204/original/images731654_IMG_20220422_112009.jpg',
            title: "Đại Thắng Mùa Xuân 1975",
            icon: <FiTarget className="w-6 h-6" />,
            className: "col-span-7"
        },

        // Section 1.1: Historical Context
        {
            type: 'text' as const,
            data: `## 1.1. Bối Cảnh Lịch Sử và Những Thách Thức Chồng Chất
    Sau Đại thắng mùa Xuân năm 1975, Tổ quốc Việt Nam hoàn toàn độc lập, thống nhất, bước vào một kỷ nguyên mới với nhiều thuận lợi to lớn. Tuy nhiên, cùng với đó là những thách thức nội tại và đối ngoại vô cùng nặng nề.
    **Điểm xuất phát của Việt Nam về kinh tế-xã hội còn ở trình độ thấp:**
    - Hàng triệu người đã thiệt mạng và bị thương tật
    - Hơn 4.8 triệu người phải gánh chịu di chứng từ chất độc da cam
    - Nền kinh tế ở cả hai miền đều kiệt quệ
    - Miền Bắc đã trải qua 21 năm xây dựng trong điều kiện chiến tranh
    **Những thách thức nội tại đó càng trở nên gay gắt hơn bởi bối cảnh quốc tế đầy phức tạp:**
    - Việt Nam đã phải tiến hành cuộc chiến tranh bảo vệ biên giới
    - Huy động nguồn lực đáng kể cho quốc phòng
    - Các thế lực thù địch cấu kết bao vây, cấm vận và phá hoại`,
            title: "1.1. Bối Cảnh Lịch Sử và Thách Thức",
            icon: <FiAlertTriangle className="w-6 h-6" />,
            className: "col-span-5 text-xl leading-relaxed"
        },
        {
            type: 'image' as const,
            data: 'https://quantri.thhg.vn/wp-content/uploads/2025/04/vna_potal_90_nam_dcs_viet_nam_dang_lanh_dao_ca_nuoc_vuot_qua_kho_khan_sau_chien_tranh_1975_%E2%80%93_1986__152249855_stand.jpg',
            title: "Hậu quả chiến tranh và tái thiết",
            icon: <FiShield className="w-6 h-6" />,
            className: "col-span-4"
        },
        {
            type: 'text' as const,
            data: `**Những yếu tố này đã tạo ra một "ma trận" thách thức:**

    - **Vòng xoáy tiêu cực:** Hậu quả chiến tranh + Sự cô lập quốc tế
    - **Ngăn cản phát triển:** Không thể tập trung nguồn lực cho kinh tế
    - **Đối phó chiến tranh biên giới:** Làm cạn kiệt nguồn lực
    - **Làm trầm trọng khủng hoảng:** Các mục tiêu Đại hội IV không đạt được

    **Kết luận:** Đây là những thách thức mà không một mô hình kinh tế nào có thể dễ dàng vượt qua, lý giải tại sao các nỗ lực của Đảng đã không đạt được mục tiêu đề ra.`,
            title: "Ma Trận Thách Thức",
            icon: <FiTarget className="w-6 h-6" />,
            className: "col-span-8 text-xl leading-relaxed"
        },

        // Section 1.2: Economic Mechanism
        {
            type: 'text' as const,
            data: `## 1.2. Cơ Chế Kinh Tế Kế Hoạch Hóa Tập Trung và Những Hệ Lụy

    Đặc điểm nổi bật nhất của giai đoạn này là sự áp dụng mô hình kinh tế kế hoạch hóa tập trung, quan liêu, bao cấp trên cả nước, nơi kinh tế tư nhân bị xóa bỏ hoàn toàn, nhường chỗ cho kinh tế do nhà nước chỉ huy.

    **Nền kinh tế được xây dựng dựa trên hai thành phần chính:**
    - **Quốc doanh:** Trong công nghiệp, thương nghiệp
    - **Tập thể:** Trong nông nghiệp với hợp tác xã là nòng cốt

    **Thay vì tập trung phát triển những ngành mũi nhọn, chiến lược kinh tế lại ưu tiên:**
    - Phát triển công nghiệp nặng một cách tràn lan
    - Không phù hợp với thực tiễn kinh tế Việt Nam`,
            title: "1.2. Cơ Chế Kinh Tế Bao Cấp",
            icon: <FiDollarSign className="w-6 h-6" />,
            className: "col-span-4 text-xl leading-relaxed"
        },
        {
            type: 'image' as const,
            data: 'https://36hn.wordpress.com/wp-content/uploads/2023/04/002.jpg?w=870',
            title: "Công nghiệp hóa tràn lan",
            icon: <FiTrendingUp className="w-6 h-6" />,
            className: "col-span-8"
        },
        {
            type: 'image' as const,
            data: 'https://baokhanhhoa.vn/file/e7837c02857c8ca30185a8c39b582c03/102023/ghep_20231020181937.jpg',
            title: "Tem phiếu thời bao cấp",
            icon: <FiShoppingBag className="w-6 h-6" />,
            className: "col-span-8"
        },
        {
            type: 'text' as const,
            data: `**Cơ chế phân phối và quản lý cũng thể hiện rõ tính bao cấp:**

    - **Tem phiếu:** Hàng hóa phân phối theo chế độ tem phiếu
    - **Hạn chế tiền mặt:** Không được mua bán tự do trên thị trường
    - **"Ngăn sông, cấm chợ":** Cấm vận chuyển hàng hóa giữa các địa phương
    - **Kìm hãm thương mại:** Thiếu sự lưu thông và kết nối

    **Hậu quả của mô hình này là vô cùng nghiêm trọng:**
    - Kinh tế đất nước bị trì trệ, giảm sút trầm trọng
    - Lưu thông phân phối rối ren, giá cả tăng vọt
    - Nhập khẩu tăng gấp 4-5 lần xuất khẩu
    - Đời sống nhân dân, cán bộ, công nhân viên, lực lượng vũ trang vô cùng khó khăn`,
            title: "Hệ Thống Phân Phối Bao Cấp",
            icon: <FiShoppingBag className="w-6 h-6" />,
            className: "col-span-4 text-xl leading-relaxed"
        },

        {
            type: 'image' as const,
            data: 'https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/03/28/5-suu-tam-tem-phieu-1616868823419.jpg?width=260&s=t2nkZLhK_j3SLJMGzzXxfg',
            title: "Sổ gạo thời bao cấp",
            icon: <FiShoppingBag className="w-6 h-6" />,
            className: "col-span-8"
        },
        // Section 1.3: Daily Life Experiences
        {
            type: 'text' as const,
            data: `## 1.3. Trải Nghiệm Đời Sống và "Văn Hóa Xếp Hàng"

    Những ký ức về thời kỳ bao cấp (1976-1986) vẫn sống động trong tâm trí của nhiều thế hệ người Việt Nam. Đó là một thời kỳ mà mọi nhu yếu phẩm, từ lương thực, thực phẩm như gạo, thịt, cá, bìa đậu phụ đến những vật dụng nhỏ nhất như kim, chỉ, que diêm, đều được nhà nước "bao cấp" và phân phối bằng tem phiếu theo định mức ít ỏi.

    **Đặc trưng nổi bật nhất:**
    - **Sổ mua lương thực:** Từng người được cấp một cuốn sổ hàng tháng
    - **Câu nói "trông như mất sổ gạo":** Diễn tả sự việc vô cùng tồi tệ
    - **Thiếu thốn vật chất trầm trọng:** Tất cả mọi thứ đều khan hiếm`,
            title: "1.3. Đời Sống Thời Bao Cấp",
            icon: <FiUsers className="w-6 h-6" />,
            className: "col-span-4 text-xl leading-relaxed"
        },

        {
            type: 'image' as const,
            data: 'https://i.ex-cdn.com/nongnghiepmoitruong.vn/files/f1/2019/1/10/ky-niem-tet-1154014969.jpg',
            title: "Văn hóa xếp hàng thời bao cấp",
            icon: <FiUsers className="w-6 h-6" />,
            className: "col-span-12"
        },
        {
            type: 'text' as const,
            data: `**"Văn hóa xếp hàng" - biểu tượng của thời kỳ bao cấp:**

    - **Diễn ra "nơi nơi, người người, nhà nhà, ngày ngày":** Ở mọi cửa hàng và khu chợ
    - **Xếp hàng "rồng rắn lên mây":** Từ 3-4 giờ sáng
    - **Dùng gạch vỡ, rổ rá, bìa giấy vụn để "giữ chỗ":** Cách ứng phó với khan hiếm
    - **Tạo nên một xã hội khan hiếm và bất bình đẳng:** Trong phân phối

    **Tác động tâm lý và xã hội:**
    - **Sự thiếu thốn:** Không chỉ gây khó khăn vật chất mà còn kìm hãm năng động, sáng tạo
    - **Kiểm soát chặt chẽ:** Mọi hoạt động sản xuất, trao đổi đều bị kiểm soát
    - **Uể oải, mệt mỏi:** Trong dân chúng, kéo dài quá lâu
    - **Hạn chế tự chủ:** Tạo nên cảm giác hy sinh đã kéo dài quá lâu`,
            title: "Văn Hóa Xếp Hàng",
            icon: <FiClock className="w-6 h-6" />,
            className: "col-span-12 text-xl leading-relaxed"
        },

        // Conclusion - Chapter Summary
        {
            type: 'text' as const,
            data: `## Kết Luận Chương I: Bài Học Từ Thời Kỳ Bao Cấp
    Thời kỳ Bao cấp (1975-1986) là một giai đoạn đầy gian khó và thử thách trong lịch sử Việt Nam hiện đại. Những khó khăn về kinh tế-xã hội, hậu quả chiến tranh, và sự cô lập quốc tế đã tạo nên một "ma trận" thách thức vô cùng phức tạp.
    **Những bài học quý giá:**
    - **Mô hình kinh tế không phù hợp:** Kế hoạch hóa tập trung bao cấp đã thất bại
    - **Thiếu thốn và khan hiếm:** Ảnh hưởng sâu sắc đến đời sống nhân dân
    - **Văn hóa xếp hàng:** Biểu tượng của sự trì trệ và thiếu hiệu quả
    - **Cần thiết phải thay đổi:** Tạo tiền đề cho công cuộc Đổi mới 1986
    **Ý nghĩa lịch sử:**
    - Lý giải tại sao Việt Nam cần Đổi mới
    - Giải thích sự chuyển mình thần kỳ sau 1986
    - Bài học về sự dũng cảm thay đổi và khát vọng vươn lên
    Thời kỳ này không chỉ là một giai đoạn lịch sử mà còn là lời nhắc nhở về những sai lầm trong quá khứ, đồng thời là động lực để Việt Nam tiếp tục đổi mới và phát triển trong tương lai.`,
            title: "Kết Luận Chương I",
            icon: <FiHeart className="w-6 h-6" />,
            className: "col-span-12 text-2xl leading-relaxed"
        },
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
