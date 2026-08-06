import type { BlogPost } from '@/types/content';

export const post: BlogPost = {
  slug: 'cach-chuan-bi-truoc-buoi-hoc-lai-dau-tien',
  title: 'Cách chuẩn bị trước buổi học lái đầu tiên',
  description:
    'Những việc nên làm trước buổi thực hành đầu tiên để bạn bớt bỡ ngỡ, từ trang phục, giấy tờ đến tâm lý khi lần đầu ngồi vào ghế lái.',
  publishedAt: '2025-04-08',
  updatedAt: '2025-06-19',
  author: 'Thầy dạy lái xe',
  category: 'Kinh nghiệm học lái',
  readingTimeMinutes: 6,
  coverImage: {
    src: '/images/blog/buoi-hoc-dau-tien.svg',
    alt: 'Hình minh họa buổi học lái xe đầu tiên trong sân tập',
    width: 1200,
    height: 630,
  },
  tags: ['buổi học đầu tiên', 'chuẩn bị', 'người mới học lái'],
  relatedSlugs: [
    'cach-giu-binh-tinh-khi-lai-xe-lan-dau',
    'nguoi-moi-nen-hoc-lai-xe-so-san-hay-so-tu-dong',
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Buổi đầu tiên thường quyết định cảm giác của bạn với cả khóa học. Chuẩn bị tốt không giúp bạn lái giỏi ngay, nhưng giúp bạn không phải lo những thứ lẽ ra không cần lo.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Chuẩn bị về trang phục',
      id: 'trang-phuc',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Giày đế mỏng, ôm chân. Tránh dép lê, guốc cao hoặc giày đế quá dày vì bạn sẽ khó cảm nhận lực đạp.',
        'Quần áo thoải mái, không quá bó ở phần đầu gối và vai.',
        'Nếu bạn đeo kính, mang theo kính bạn dùng hằng ngày để nhìn rõ biển báo và gương.',
        'Buộc gọn tóc dài để không vướng tầm nhìn khi quay đầu quan sát.',
      ],
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Về giày dép',
      text: 'Đây là chi tiết nhỏ nhưng ảnh hưởng thật. Nhiều học viên đạp ga nặng hơn ý muốn chỉ vì đi giày đế dày, khiến bàn chân mất cảm giác.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Chuẩn bị về giấy tờ và thông tin',
      id: 'giay-to',
    },
    {
      type: 'paragraph',
      text: 'Buổi thực hành đầu tiên thường chưa cần mang nhiều giấy tờ, nhưng bạn nên nắm rõ mình đang học khóa nào, hạng nào và lịch các buổi tiếp theo. Nếu hồ sơ còn thiếu mục gì, hãy hỏi ngay để bổ sung sớm thay vì để dồn tới sát ngày.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Chuẩn bị về thể trạng',
      id: 'the-trang',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Ngủ đủ giấc đêm trước. Buổi đầu cần tập trung nhiều hơn bạn nghĩ.',
        'Ăn nhẹ trước khi học, tránh học lúc quá đói hoặc quá no.',
        'Không dùng đồ uống có cồn trước buổi học, kể cả một lượng nhỏ.',
        'Mang theo nước uống, nhất là khi học vào buổi trưa hoặc chiều nắng.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Chuẩn bị về tâm lý',
      id: 'tam-ly',
    },
    {
      type: 'paragraph',
      text: 'Gần như ai cũng hồi hộp ở buổi đầu, kể cả người trông rất bình tĩnh. Điều này hoàn toàn bình thường và thường tan đi sau khoảng ba mươi phút ngồi sau vô lăng.',
    },
    {
      type: 'paragraph',
      text: 'Một điều tôi luôn nói với học viên trước khi khởi động xe: buổi đầu không có mục tiêu lái đẹp. Mục tiêu duy nhất là làm quen với cảm giác điều khiển một chiếc xe. Bạn không cần chứng minh gì với ai trong buổi này.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Buổi đầu tiên thường diễn ra thế nào',
      id: 'dien-bien',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Làm quen vị trí ghế lái: chỉnh ghế sao cho chân đạp hết bàn đạp mà đầu gối vẫn hơi cong.',
        'Chỉnh gương chiếu hậu trong và hai gương ngoài, nhận biết điểm mù.',
        'Nhận biết các bộ phận: vô lăng, cần số, phanh tay, đèn, tín hiệu, gạt mưa.',
        'Tập cảm nhận chân ga và chân phanh khi xe đứng yên, sau đó cho xe lăn bánh chậm trong sân.',
        'Tập dừng xe êm, đây là kỹ năng quan trọng hơn nhiều người nghĩ.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Những câu hỏi bạn nên hỏi ngay buổi đầu',
      id: 'cau-hoi-nen-hoi',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Lộ trình các buổi tiếp theo sẽ đi theo trình tự nào?',
        'Mục tiêu cụ thể của buổi hôm nay là gì?',
        'Có phần nào tôi cần luyện thêm ở nhà không, ví dụ lý thuyết hoặc mô phỏng?',
        'Khi thấy chưa hiểu, tôi nên nói lại vào lúc nào để không làm gián đoạn?',
      ],
    },
    {
      type: 'quote',
      text: 'Học viên hỏi nhiều thường tiến bộ nhanh hơn học viên im lặng làm theo. Không có câu hỏi nào là ngớ ngẩn trong buổi đầu.',
    },
    {
      type: 'paragraph',
      text: 'Nếu bạn sắp có buổi học đầu tiên và còn băn khoăn điều gì, cứ nhắn trước cho tôi. Trao đổi trước vài phút thường giúp buổi học đầu nhẹ nhàng hơn nhiều.',
    },
  ],
};
