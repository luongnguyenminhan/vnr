'use client';

import { FiBarChart, FiBook, FiGlobe, FiHeart, FiHome, FiImage, FiShield, FiTarget, FiTrendingUp } from 'react-icons/fi';
import Card from '../ui/Card';

export default function ChapterIII() {
    // Card data structure for Phần III: Cơ đồ, tiềm lực, vị thế và uy tín
    const cardsData = [
        {
            type: 'text' as const,
            title: 'Phần III — Thành tựu sau Đổi mới',
            icon: <FiBook className="w-6 h-6" />,
            className: 'col-span-12 text-2xl leading-relaxed',
            data: `# Phần III — Cơ đồ, Tiềm lực, Vị thế và Uy tín (Chi tiết)\n\n**Mở đầu tóm tắt:** Trình bày 4 chuyển biến cốt lõi sau gần bốn thập kỷ Đổi mới: (1) Quy mô & chất lượng kinh tế; (2) Tiềm lực khoa học–công nghệ & sản xuất; (3) Phúc lợi xã hội & nguồn nhân lực; (4) Vị thế & uy tín quốc tế qua hội nhập và đóng góp.`
        },
        // 3.1 (split sub-sections)
        {
            type: 'text' as const,
            title: '3.1.1. Mở rộng quy mô & cải thiện thu nhập',
            icon: <FiTrendingUp className="w-6 h-6" />,
            className: 'col-span-4 text-xl leading-relaxed',
            data: `- Quy mô GDP tăng mạnh (1985 → 2024).\n- Thu nhập bình quân đầu người cải thiện; hình thành tầng lớp trung lưu đô thị.`
        },
        { type: 'image' as const, title: 'Biểu đồ tăng trưởng GDP 1985–2024 (giá thực)', icon: <FiImage className="w-6 h-6" />, className: 'col-span-8', data: 'https://media.vneconomy.vn/images/upload/2025/01/17/anh-t20-1.png' },
        {
            type: 'text' as const,
            title: '3.1.2. Cơ cấu chuyển dịch công nghiệp hóa – dịch vụ hóa',
            icon: <FiBarChart className="w-6 h-6" />,
            className: 'col-span-4 text-xl leading-relaxed',
            data: `- Tỉ trọng công nghiệp & dịch vụ tăng; nổi bật chế biến chế tạo, logistics, tài chính, CNTT.\n- Tham gia sâu chuỗi giá trị; gia tăng hàm lượng giá trị gia tăng.`
        },
        { type: 'image' as const, title: 'Chuỗi sản xuất điện tử: từ linh kiện đến sản phẩm hoàn chỉnh', icon: <FiImage className="w-6 h-6" />, className: 'col-span-8', data: 'https://etdvietnam.com/upload/images/bai-viet/Linh-Kien1.jpg' },
        {
            type: 'text' as const,
            title: '3.1.3. Ngoại thương & thu hút vốn nước ngoài',
            icon: <FiGlobe className="w-6 h-6" />,
            className: 'col-span-6 text-xl leading-relaxed',
            data: `- Kim ngạch xuất–nhập khẩu quy mô lớn (~700 tỷ USD).\n- FDI duy trì ổn định, bổ sung công nghệ, việc làm, kỹ năng.`
        },
        { type: 'image' as const, title: 'Cảng container hiện đại và luồng hàng xuất khẩu', icon: <FiImage className="w-6 h-6" />, className: 'col-span-6', data: 'https://bcp.cdnchinhphu.vn/334894974524682240/2023/6/25/dong-tam-16876335238351735289292.jpg' },
        // 3.2 (split sub-sections)
        {
            type: 'text' as const,
            title: '3.2.1. Doanh nghiệp nòng cốt & Make-in-Vietnam',
            icon: <FiBarChart className="w-6 h-6" />,
            className: 'col-span-6 text-xl leading-relaxed',
            data: `- Các "nhà vô địch" nội địa phát triển năng lực thiết kế, tích hợp, xuất khẩu dịch vụ.\n- Từ lắp ráp sang thiết kế một số sản phẩm dân dụng.`
        },
        { type: 'image' as const, title: 'Phòng thí nghiệm phát triển sản phẩm công nghệ tại doanh nghiệp Việt', icon: <FiImage className="w-6 h-6" />, className: 'col-span-6', data: 'https://yaskawavn.com/data/upload/YASKAWA_866%20(2)(2).jpg' },

        { type: 'image' as const, title: 'Không gian co-working / vườn ươm startup công nghệ', icon: <FiImage className="w-6 h-6" />, className: 'col-span-12', data: 'https://cafefcdn.com/2019/1/10/khong-gian-co-working-len-toi-1000m2-tai-rehoboth-1547115772299445413879.jpg' },
        {
            type: 'text' as const,
            title: '3.2.2. Hệ sinh thái đổi mới sáng tạo & startup',
            icon: <FiGlobe className="w-6 h-6" />,
            className: 'col-span-12 text-xl leading-relaxed',
            data: `- Vườn ươm, quỹ VC, trung tâm đổi mới thúc đẩy thương mại hóa.\n- Giáo dục STEM, kỹ năng số hỗ trợ kinh tế tri thức.`
        },
        {
            type: 'text' as const,
            title: '3.2.3. Chuyển đổi số & hạ tầng số quốc gia',
            icon: <FiTrendingUp className="w-6 h-6" />,
            className: 'col-span-12 md:col-span-8 text-xl leading-relaxed',
            data: `- Hạ tầng viễn thông, nền tảng số thúc đẩy TMĐT, thanh toán số, chính phủ số.\n- Hệ sinh thái dữ liệu & an ninh mạng củng cố nền kinh tế số.`
        },
        { type: 'image' as const, title: 'Trung tâm dữ liệu và hạ tầng viễn thông hiện đại', icon: <FiImage className="w-6 h-6" />, className: 'col-span-12 md:col-span-4', data: 'https://htv.mediacdn.vn/thumb_w/640/155334506109014016/2025/8/20/fpt-25-175568045218154670959.jpg' },
        // 3.3 (split sub-sections)
        {
            type: 'text' as const,
            title: '3.3.1. Phúc lợi cơ bản & giảm nghèo',
            icon: <FiHome className="w-6 h-6" />,
            className: 'col-span-12 text-xl leading-relaxed',
            data: `- Tỷ lệ nghèo giảm sâu; chính sách kinh tế gắn an sinh.\n- Mở rộng y tế cơ sở, tăng tỷ lệ hoàn thành giáo dục cơ bản.`
        },
        { type: 'image' as const, title: 'Lớp học STEM', icon: <FiImage className="w-6 h-6" />, className: 'col-span-5', data: 'https://smk.edu.vn/wp-content/uploads/2024/01/Loi-ich-cua-STEAM-voi-mam-non-2.jpeg' },
        { type: 'image' as const, title: 'Trạm y tế xã hiện đại', icon: <FiImage className="w-6 h-6" />, className: 'col-span-7', data: 'https://thainguyen.gov.vn/image/journal/article?img_id=14118849&t=1756078041340' },
        {
            type: 'text' as const,
            title: '3.3.2. Chất lượng nguồn nhân lực',
            icon: <FiHeart className="w-6 h-6" />,
            className: 'col-span-12 md:col-span-8 text-xl leading-relaxed',
            data: `- Dịch chuyển sang lao động kỹ năng cao; đầu tư đào tạo nghề & đại học.\n- Tầng lớp trung lưu gia tăng tạo động lực tiêu dùng & đổi mới.`
        },
        { type: 'image' as const, title: 'Sinh viên kỹ thuật làm thí nghiệm tại phòng lab', icon: <FiImage className="w-6 h-6" />, className: 'col-span-12 md:col-span-4', data: 'https://daihoc.fpt.edu.vn/wp-content/uploads/2023/04/trai-nghiem-thu-vi-tai-truong-cong-nghe-dh-fpt_1-1024x728.jpeg' },
        // 3.4
        {
            type: 'text' as const,
            title: '3.4. An ninh quốc phòng & tự chủ chiến lược',
            icon: <FiShield className="w-6 h-6" />,
            className: 'col-span-12 md:col-span-8 text-xl leading-relaxed',
            data: `### 3.4.1. Hiện đại hóa & cân bằng phát triển\n- Nâng cao năng lực phòng thủ, công nghiệp quốc phòng hỗ trợ chủ quyền.\n- Quản trị rủi ro địa chính trị bảo đảm môi trường ổn định cho phát triển.`
        },
        { type: 'image' as const, title: 'Vận hành hệ thống thông tin liên lạc quân sự nội địa', icon: <FiImage className="w-6 h-6" />, className: 'col-span-12 md:col-span-4', data: 'https://file3.qdnd.vn/data/images/0/2024/07/20/upload_2134/1%2014.jpg?w=400' },
        // 3.5 (split sub-sections)
        {
            type: 'text' as const,
            title: '3.5.1. Hội nhập đa phương & FTA',
            icon: <FiGlobe className="w-6 h-6" />,
            className: 'col-span-12 md:col-span-8 text-xl leading-relaxed',
            data: `- Tham gia WTO, CPTPP, EVFTA, nhiều FTA → mở rộng thị trường & cải cách thể chế.\n- Nâng vị thế địa-kinh tế trong ASEAN & Châu Á–TBD.`
        },
        { type: 'image' as const, title: 'Lễ ký hiệp định thương mại tự do — bàn ký & cờ các bên', icon: <FiImage className="w-6 h-6" />, className: 'col-span-12 md:col-span-4', data: 'https://file3.qdnd.vn/data/images/0/2023/07/25/nguyenthao/vifta.jpeg?dpi=150&quality=100&w=870' },
        {
            type: 'text' as const,
            title: '3.5.2. Ngoại giao chủ động & đóng góp toàn cầu',
            icon: <FiTarget className="w-6 h-6" />,
            className: 'col-span-4 text-xl leading-relaxed',
            data: `- Tham gia cơ chế LHQ, gìn giữ hòa bình, đề xuất sáng kiến.\n- Ngoại giao kinh tế & văn hóa xây dựng uy tín mềm.`
        },
        { type: 'image' as const, title: 'Đoàn đại biểu phát biểu tại Đại hội đồng LHQ', icon: <FiImage className="w-6 h-6" />, className: 'col-span-8', data: 'https://bcp.cdnchinhphu.vn/zoom/600_315/334894974524682240/2024/9/25/vnapotaltongbithuchutichnuocphatbieutaiphienthaoluanchungcapcaodaihoidonglienhopquockhoa79stand-17272218104191789735435-5-0-421-665-crop-1727221914396349842391.jpg' },
        // 3.6
        // 3.7 Conclusion
        {
            type: 'text' as const,
            title: '3.6. Kết luận',
            icon: <FiHeart className="w-6 h-6" />,
            className: 'col-span-12 text-2xl leading-relaxed',
            data: `## Kết luận\nTổng hòa: 
            (1) Quy mô kinh tế mở rộng & cơ cấu chuyển dịch; 
            (2) Tiềm lực khoa học–công nghệ tăng; 
            (3) Phúc lợi & nguồn nhân lực cải thiện; 
            (4) Tự chủ chiến lược nhất định; 
            (5) Vị thế quốc tế cao hơn qua hội nhập & ngoại giao chủ động.\n\n> **“Đất nước ta chưa bao giờ có được cơ đồ, tiềm lực, vị thế và uy tín quốc tế như ngày nay.”**\n\nĐây là nhận định dựa trên bằng chứng liên ngành và cũng là lời nhắc cần củng cố thành tựu bằng chính sách dài hạn, phát triển bền vững & nâng cao sức chống chịu.`
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
                            className={cardData.className || ''}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
