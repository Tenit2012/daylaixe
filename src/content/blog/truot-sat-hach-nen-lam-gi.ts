import type { BlogPost } from '@/types/content';

export const post: BlogPost = {
  slug: 'truot-sat-hach-roi-thi-lai-nen-lam-gi',
  title: 'Trượt sát hạch rồi thi lại: nên làm gì trước tiên',
  description:
    'Trượt một phần thi không có nghĩa bạn không hợp với việc lái xe. Cách xác định đúng chỗ mất điểm, dựng lại kế hoạch luyện tập và giữ tâm lý cho lần thi sau.',
  publishedAt: '2026-08-15',
  updatedAt: '2026-08-15',
  author: 'Thầy dạy lái xe',
  category: 'Tâm lý khi lái xe',
  readingTimeMinutes: 7,
  coverImage: {
    src: '/images/blog/truot-sat-hach.svg',
    alt: 'Hình minh họa học viên chuẩn bị lại sau khi trượt sát hạch',
    width: 1200,
    height: 630,
  },
  tags: ['thi lại', 'tâm lý', 'thi sát hạch', 'kế hoạch luyện tập'],
  relatedSlugs: [
    'cach-giu-binh-tinh-khi-lai-xe-lan-dau',
    'nhung-loi-khien-bi-truat-quyen-sat-hach',
    'ngay-thi-sat-hach-chuan-bi-va-trinh-tu',
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Trong các khóa tôi hướng dẫn, năm nào cũng có học viên trượt một phần nào đó. Điều tôi thấy rõ là kết quả lần thi sau phụ thuộc rất nhiều vào những gì họ làm trong tuần đầu tiên sau khi trượt — chứ không phụ thuộc vào việc họ trượt nặng hay nhẹ.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Việc đầu tiên: xác định chính xác mình mất điểm ở đâu',
      id: 'xac-dinh-cho-mat-diem',
    },
    {
      type: 'paragraph',
      text: 'Nghe thì hiển nhiên, nhưng phần lớn học viên không làm được việc này. Họ nhớ cảm giác "chạy hỏng" chứ không nhớ hỏng ở bài nào, vì lúc đó đang căng thẳng. Kết quả là họ đăng ký luyện lại từ đầu, tốn thời gian và tiền cho những phần vốn đã tốt.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Ghi lại ngay trong ngày, càng sớm càng nhớ rõ: trượt ở phần nào, bài nào, thiết bị báo lỗi gì.',
        'Nếu có phiếu kết quả hoặc thông báo lỗi, giữ lại và đọc kỹ.',
        'Phân loại: đây là lỗi kỹ thuật (chưa làm được động tác) hay lỗi tâm lý (làm được lúc tập nhưng hỏng lúc thi)?',
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Vì sao phải phân loại',
      text: 'Hai loại lỗi này cần cách chữa hoàn toàn khác nhau. Lỗi kỹ thuật cần tập thêm động tác. Lỗi tâm lý mà tập thêm động tác thì gần như vô ích — bạn vốn đã làm được rồi.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Nếu là lỗi kỹ thuật',
      id: 'neu-la-loi-ky-thuat',
    },
    {
      type: 'paragraph',
      text: 'Đây là trường hợp dễ xử lý hơn. Bạn biết mình chưa làm được gì, và chỉ cần luyện đúng phần đó. Nguyên tắc là tách nhỏ động tác ra rồi ghép lại, thay vì chạy đi chạy lại cả bài và hy vọng lần sau khá hơn.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Tách động tác đang sai ra tập riêng, không tính giờ, không ghép bài.',
        'Khi đã làm được, lặp lại ba lần liên tiếp không sai để cơ thể ghi nhớ.',
        'Ghép trở lại vào chuỗi đầy đủ và chạy trọn vẹn như điều kiện thi.',
        'Chỉ đăng ký lịch thi khi chạy trọn chuỗi đạt vài lần liên tiếp, không phải một lần may mắn.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Nếu là lỗi tâm lý',
      id: 'neu-la-loi-tam-ly',
    },
    {
      type: 'paragraph',
      text: 'Đây là trường hợp phổ biến hơn nhiều so với mọi người nghĩ. Học viên chạy tốt suốt khóa, vào thi thì tay run, quên trình tự, hoặc sai một bài rồi hỏng dây chuyền các bài sau.',
    },
    {
      type: 'paragraph',
      text: 'Cách chữa không nằm ở chạy thêm cho giỏi hơn, mà nằm ở làm cho hoàn cảnh thi bớt lạ. Não người căng thẳng vì gặp tình huống chưa quen, nên việc cần làm là biến nó thành quen.',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Chạy trọn vẹn cả sa hình không dừng giữa chừng, có bấm giờ, lặp nhiều lần.',
        'Nhờ người ngồi cạnh quan sát và chấm như giám khảo, để quen cảm giác bị đánh giá.',
        'Cố tình tập cả những lần chạy sau khi vừa mắc lỗi, để luyện phản xạ gạt lỗi cũ sang một bên.',
        'Nếu được, tập trên chính loại xe và sân sẽ dùng khi thi.',
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Bài tập tôi hay dùng',
      text: 'Trong lúc luyện, tôi cố tình để học viên sai một bài rồi yêu cầu chạy tiếp ngay lập tức, không dừng để tiếc. Sau vài lần, việc lỡ sai không còn kéo theo cả chuỗi nữa. Đây là kỹ năng tách biệt hẳn với kỹ năng lái.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Đừng vội đăng ký thi lại quá sớm',
      id: 'dung-voi-thi-lai',
    },
    {
      type: 'paragraph',
      text: 'Tâm lý thường gặp là muốn thi lại ngay cho xong, cho đỡ mang cảm giác nặng nề. Nhưng nếu bạn chưa sửa được đúng chỗ đã sai, lần thi sau chỉ lặp lại kết quả cũ và làm bạn nản thêm.',
    },
    {
      type: 'paragraph',
      text: 'Hãy đặt một tiêu chí rõ ràng cho bản thân trước khi đăng ký lại — ví dụ chạy trọn sa hình đạt ba lần liên tiếp, hoặc ba đề lý thuyết ngẫu nhiên liên tiếp đều đạt và không sai câu điểm liệt. Có tiêu chí thì bạn biết mình đã sẵn sàng thật hay chỉ đang nóng ruột.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Một điều đáng nói về chuyện trượt',
      id: 'mot-dieu-dang-noi',
    },
    {
      type: 'paragraph',
      text: 'Tôi đã gặp nhiều học viên trượt lần đầu rồi sau này lái rất chắc tay, và cũng gặp người qua ngay lần đầu nhưng vài tháng sau vẫn không dám tự chạy ra đường. Kết quả một kỳ thi không nói lên bạn sẽ là người lái xe thế nào.',
    },
    {
      type: 'paragraph',
      text: 'Điều đáng quan tâm hơn là bạn có thật sự làm chủ được chiếc xe hay không. Một kỳ thi trượt buộc bạn quay lại luyện kỹ phần còn yếu — về lâu dài đó thường là điều tốt cho chính bạn.',
    },
    {
      type: 'paragraph',
      text: 'Nếu bạn vừa trượt và chưa biết bắt đầu lại từ đâu, cứ nhắn cho tôi biết bạn mất điểm ở phần nào. Chúng ta lên kế hoạch cho đúng phần đó, không bắt bạn học lại những thứ bạn đã làm được.',
    },
  ],
};
