import type { BlogPost } from '@/types/content';

export const post: BlogPost = {
  slug: 'cach-giu-binh-tinh-khi-lai-xe-lan-dau',
  title: 'Cách giữ bình tĩnh khi lái xe lần đầu',
  description:
    'Hồi hộp trong những lần cầm lái đầu tiên là chuyện bình thường. Bài viết chia sẻ cách chuẩn bị tâm lý và những việc làm được ngay khi thấy căng thẳng.',
  publishedAt: '2025-06-24',
  updatedAt: '2025-07-15',
  author: 'Thầy dạy lái xe',
  category: 'Tâm lý khi lái xe',
  readingTimeMinutes: 6,
  coverImage: {
    src: '/images/blog/giu-binh-tinh.svg',
    alt: 'Hình minh họa người lái xe hít thở sâu trước khi khởi hành',
    width: 1200,
    height: 630,
  },
  tags: ['tâm lý lái xe', 'lần đầu cầm lái', 'giữ bình tĩnh'],
  relatedSlugs: [
    'cach-chuan-bi-truoc-buoi-hoc-lai-dau-tien',
    'co-bang-nhung-khong-dam-lai-xe-phai-lam-sao',
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Tim đập nhanh, tay đổ mồ hôi, chân hơi run khi đặt lên bàn đạp — đây là phản ứng bình thường của cơ thể trước một việc mới và có phần rủi ro. Bạn không phải người duy nhất trải qua chuyện này.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Hiểu vì sao mình căng thẳng',
      id: 'vi-sao-cang-thang',
    },
    {
      type: 'paragraph',
      text: 'Căng thẳng khi lái xe lần đầu thường đến từ ba nguồn: sợ gây tai nạn, sợ bị đánh giá, và cảm giác không kiểm soát được cỗ máy đang di chuyển. Hiểu rõ mình đang lo điều gì giúp bạn xử lý đúng nguyên nhân.',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Nếu bạn sợ gây tai nạn: hãy nhớ xe tập lái có bộ phanh phụ và người hướng dẫn ngồi cạnh.',
        'Nếu bạn sợ bị đánh giá: hãy nói thẳng với người hướng dẫn rằng bạn cần được nhắc nhẹ nhàng.',
        'Nếu bạn thấy mất kiểm soát: hãy giảm tốc độ. Gần như mọi cảm giác mất kiểm soát đều dịu đi khi xe chậm lại.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Việc làm được ngay trước khi khởi hành',
      id: 'truoc-khi-khoi-hanh',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Ngồi yên ba mươi giây, hít vào chậm bằng mũi và thở ra dài hơn nhịp hít vào.',
        'Chỉnh ghế và gương thật thoải mái. Tư thế gò bó làm tăng cảm giác căng.',
        'Đặt hai tay ở vị trí ổn định trên vô lăng và thả lỏng vai.',
        'Nhắc lại trong đầu mục tiêu của buổi hôm nay, thường chỉ đơn giản là đi chậm và dừng êm.',
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Mẹo nhỏ nhưng hiệu quả',
      text: 'Nếu bạn thấy mình đang nín thở khi lái, hãy chủ động nói ra thành tiếng những gì mình quan sát: "có xe máy bên phải", "đèn vàng phía trước". Việc nói ra buộc bạn thở đều và giúp não sắp xếp thông tin.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Khi đang lái mà thấy hoảng',
      id: 'khi-dang-lai',
    },
    {
      type: 'paragraph',
      text: 'Điều quan trọng nhất là đừng cố gồng để chạy tiếp. Hãy giảm tốc, bật tín hiệu và tìm chỗ an toàn để tấp vào. Dừng lại một hai phút rồi đi tiếp tốt hơn nhiều so với việc chạy trong trạng thái mất tập trung.',
    },
    {
      type: 'paragraph',
      text: 'Nếu có người hướng dẫn ngồi cạnh, hãy nói ngay khi bạn thấy quá tải. Không cần cố chịu đựng đến hết buổi. Một người hướng dẫn tốt sẽ điều chỉnh bài tập, không trách bạn vì điều đó.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Xây dựng sự tự tin qua từng buổi',
      id: 'xay-dung-tu-tin',
    },
    {
      type: 'paragraph',
      text: 'Tự tin không đến từ một buổi học đột phá mà đến từ việc lặp lại đủ nhiều lần cho tới khi thao tác trở thành phản xạ. Mỗi buổi bạn nên có một mục tiêu nhỏ và cụ thể, ví dụ hôm nay chỉ tập dừng xe êm ở mười điểm khác nhau.',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Ghi lại sau mỗi buổi: hôm nay mình làm được gì tốt hơn hôm trước.',
        'Tránh so sánh tiến độ với người khác trong cùng khóa.',
        'Học đều đặn quan trọng hơn học nhiều trong một buổi rồi nghỉ dài.',
        'Nhìn nhận sai sót như thông tin để sửa, không phải bằng chứng về năng lực.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Về sự hồi hộp trong kỳ thi',
      id: 'hoi-hop-khi-thi',
    },
    {
      type: 'paragraph',
      text: 'Nhiều học viên chạy rất tốt lúc tập nhưng mất bình tĩnh khi thi. Cách chuẩn bị hiệu quả là mô phỏng điều kiện thi trong lúc luyện: chạy trọn bài không dừng, không được nhắc, và chấp nhận bị đánh giá. Khi cảm giác đó trở nên quen thuộc, ngày thi sẽ bớt lạ lẫm.',
    },
    {
      type: 'quote',
      text: 'Bình tĩnh không phải là không còn thấy lo. Bình tĩnh là vẫn thực hiện đúng các thao tác đã tập, kể cả khi đang lo.',
    },
  ],
};
