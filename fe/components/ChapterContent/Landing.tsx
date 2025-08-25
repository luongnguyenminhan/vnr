'use client';

import Card from '../ui/Card';

export default function Landing() {
    // Card data structure
    const cardsData = [
        {
            type: 'image' as const,
            title: '',
            className: 'col-span-12 text-2xl',
            data: 'https://i.ytimg.com/vi/77QuZlOWfro/maxresdefault.jpg'
        },
        {
            type: 'text' as const,
            title: '',
            className: 'col-span-7 text-2xl leading-relaxed',
            data: `# Hành Trình Thần Kỳ Của Dân Tộc Việt Nam
            Giai đoạn lịch sử Việt Nam từ sau Đại thắng mùa Xuân năm 1975 đến nay là một bức tranh đầy màu sắc và phức tạp, được định hình bởi hai thời kỳ lớn với những đặc trưng hoàn toàn khác biệt: Thời kỳ Bao cấp (1975-1986) và Công cuộc Đổi mới (từ 1986 đến nay). Nếu như thời kỳ đầu là một thập kỷ của những khó khăn chồng chất, của mô hình kinh tế chưa phù hợp và đời sống vật chất thiếu thốn, thì thời kỳ sau lại là một hành trình lột xác ngoạn mục, đưa đất nước từ bờ vực khủng hoảng vươn lên thành một nền kinh tế năng động, một quốc gia có uy tín trên trường quốc tế.`


        },
        {
            type: 'text' as const,
            title: '',
            className: 'col-span-5 text-2xl leading-relaxed',
            data: `Trang web này được thực hiện nhằm cung cấp một cái nhìn toàn diện và khách quan về sự chuyển mình vĩ đại đó. Bằng việc phân tích sâu các bối cảnh lịch sử, đặc điểm cơ chế kinh tế, và so sánh các chỉ số định lượng cùng các thành tựu cụ thể, báo cáo sẽ làm sáng tỏ và bảo vệ luận điểm cốt lõi rằng: "Đất nước ta chưa bao giờ có được cơ đồ, tiềm lực, vị thế và uy tín quốc tế như ngày nay". Đây không chỉ là một nhận định mang tính cảm tính mà là một kết luận có cơ sở vững chắc, được chứng minh bởi thực tiễn lịch sử và những bằng chứng cụ thể.`
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
