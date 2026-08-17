import type { BlogPost } from '@/types/content';

export const post: BlogPost = {
  slug: 'lo-trinh-on-luyen-30-ngay-truoc-ngay-thi',
  title: 'Lộ trình ôn luyện 30 ngày trước ngày thi sát hạch',
  description:
    'Kế hoạch bốn tuần chia rõ từng giai đoạn cho lý thuyết, mô phỏng, sa hình và đường trường, kèm tiêu chí tự đánh giá để biết khi nào bạn thật sự sẵn sàng đăng ký thi.',
  publishedAt: '2026-08-16',
  updatedAt: '2026-08-16',
  author: 'Thầy dạy lái xe',
  category: 'Kinh nghiệm học lái',
  readingTimeMinutes: 10,
  coverImage: {
    src: '/images/blog/lo-trinh-30-ngay.svg',
    alt: 'Hình minh họa lộ trình ôn luyện bốn tuần trước ngày thi sát hạch',
    width: 1200,
    height: 630,
  },
  tags: [
    'lộ trình ôn thi',
    'kế hoạch luyện tập',
    'thi sát hạch',
    'hành trang thi',
  ],
  relatedSlugs: [
    'on-thi-ly-thuyet-lai-xe-khong-phai-hoc-thuoc-long',
    'ngay-thi-sat-hach-chuan-bi-va-trinh-tu',
    'nhung-loi-khien-bi-truat-quyen-sat-hach',
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Học viên hay hỏi tôi nên ôn thế nào cho hiệu quả trong tháng cuối. Câu trả lời không phải là học nhiều hơn, mà là học đúng thứ vào đúng giai đoạn. Bốn tuần cuối có cấu trúc riêng: tuần đầu để bù chỗ hổng, tuần cuối để giữ phong độ, và bạn không nên đảo ngược thứ tự đó.',
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Cách dùng bài này',
      text: 'Đây là khung tham khảo, không phải lịch cứng. Số buổi thực hành bạn có phụ thuộc vào chương trình của cơ sở đào tạo và lịch khai giảng. Hãy điều chỉnh cho vừa với lịch thật của mình, giữ nguyên thứ tự các giai đoạn.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Nguyên tắc chung của cả tháng',
      id: 'nguyen-tac-chung',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Học đều mỗi ngày một ít tốt hơn dồn vào cuối tuần. Trí nhớ vận động và trí nhớ quy tắc đều cần lặp lại cách quãng.',
        'Luôn ghi lại lỗi sau mỗi buổi. Ba dòng là đủ: sai ở đâu, vì sao, lần sau làm khác thế nào.',
        'Không nạp kiến thức mới trong những ngày cuối. Giai đoạn đó chỉ để củng cố.',
        'Ưu tiên phần yếu nhất, đừng ôn lại phần đã tốt vì nó cho cảm giác dễ chịu.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Tuần 1 — dựng nền và tìm chỗ hổng',
      id: 'tuan-1',
    },
    {
      type: 'paragraph',
      text: 'Mục tiêu tuần này không phải làm tốt, mà là biết chính xác mình đang yếu chỗ nào. Đừng ngại kết quả xấu ở tuần đầu — đó là dữ liệu, không phải điểm số.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Lý thuyết: đi hết bộ câu hỏi một lượt theo nhóm chủ đề. Đọc kỹ giải thích của câu sai, chưa cần thuộc.',
        'Mô phỏng: xem qua các tình huống mà chưa bấm, chỉ để biết có những dạng nguy hiểm nào.',
        'Thực hành: chạy trọn sa hình vài lần để xác định bài nào yếu nhất.',
        'Cuối tuần: lập một danh sách ngắn gồm những chỗ đang yếu ở cả ba phần.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Tuần 2 — tuần nặng nhất, xử lý chỗ yếu',
      id: 'tuan-2',
    },
    {
      type: 'paragraph',
      text: 'Đây là tuần bạn làm việc thật sự. Toàn bộ thời gian dồn vào danh sách chỗ yếu vừa lập, không chạy lan man.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Lý thuyết: làm lại riêng những câu đã sai. Bắt đầu ôn nhóm câu điểm liệt mỗi ngày và duy trì tới ngày thi.',
        'Mô phỏng: luyện có bấm, mỗi buổi khoảng hai mươi tới ba mươi tình huống, không cày liên tục cho mỏi mắt.',
        'Thực hành: tách riêng bài đang yếu ra tập, không tính giờ, không ghép chuỗi. Làm được rồi thì lặp ba lần liên tiếp không sai.',
        'Với xe số sàn, nếu yếu ở dốc thì tuần này dành hẳn thời gian cho điểm bám côn.',
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Cách tập hiệu quả nhất ở tuần này',
      text: 'Tách nhỏ động tác ra tập riêng rồi mới ghép lại. Chạy đi chạy lại cả bài mà hy vọng lần sau khá hơn là cách tốn thời gian nhất.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Tuần 3 — ghép lại và mô phỏng điều kiện thi',
      id: 'tuan-3',
    },
    {
      type: 'paragraph',
      text: 'Sang tuần này, những phần rời rạc phải được nối lại thành một chuỗi liên tục. Đây là điểm nhiều học viên bỏ qua: họ tập tốt từng bài nhưng chưa bao giờ chạy trọn vẹn trong điều kiện giống thi thật.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Lý thuyết: chuyển sang làm đề ngẫu nhiên có bấm giờ, mỗi ngày hai tới ba đề.',
        'Mô phỏng: luyện xen kẽ các dạng tình huống thay vì làm theo thứ tự quen thuộc.',
        'Thực hành: chạy trọn sa hình không nghỉ giữa chừng, có bấm giờ, nhờ người ngồi cạnh chấm như giám khảo.',
        'Ghép luôn phần đường trường ngay sau sa hình trong cùng một buổi, để quen với việc giữ tập trung sau khi phần khó đã qua.',
      ],
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Đừng bỏ qua phần đường trường',
      text: 'Phần này ngắn và có vẻ dễ nên hay bị tập qua loa. Nó phạt rất nặng sự chủ quan: quên tín hiệu, chuyển số sai nhịp, tháo dây an toàn trước khi xe dừng hẳn.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Tuần 4 — giữ phong độ, không nạp thêm',
      id: 'tuan-4',
    },
    {
      type: 'paragraph',
      text: 'Tuần cuối là tuần dễ bị làm hỏng nhất, vì lo lắng khiến người ta học dồn. Nguyên tắc ngược lại: giảm khối lượng, giữ tần suất.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Lý thuyết: chỉ ôn câu điểm liệt và những câu vẫn còn sai. Không mở thêm nguồn tài liệu mới.',
        'Thực hành: duy trì một tới hai buổi chạy trọn chuỗi, không cố sửa thêm kỹ thuật mới.',
        'Ba ngày cuối: giảm hẳn cường độ. Ngủ đủ quan trọng hơn ôn thêm vài chục câu.',
        'Chuẩn bị giấy tờ, giày dép và kiểm tra lại giờ, địa điểm tập trung.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Tiêu chí tự đánh giá: khi nào thật sự sẵn sàng',
      id: 'tieu-chi-san-sang',
    },
    {
      type: 'paragraph',
      text: 'Đừng đăng ký lịch thi dựa trên cảm giác. Hãy dùng tiêu chí đo được. Tôi thường gợi ý học viên dùng bộ tiêu chí sau.',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Ba đề lý thuyết ngẫu nhiên liên tiếp đều đạt, và không sai câu điểm liệt nào.',
        'Chạy trọn sa hình đạt ít nhất ba lần liên tiếp, không phải một lần may mắn.',
        'Có thể chạy tiếp bình thường sau khi vừa mắc lỗi ở một bài.',
        'Thực hiện trình tự trước khi xe lăn bánh mà không cần nhắc.',
        'Phần đường trường đã chạy thử ít nhất một lần trong điều kiện gần giống thi thật.',
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Nếu chưa đạt đủ tiêu chí',
      text: 'Lùi lịch thi lại vài tuần thường rẻ hơn và nhẹ đầu hơn nhiều so với thi rồi trượt rồi ôn lại từ trạng thái nản.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Phần nhiều người bỏ quên: chuẩn bị tâm lý',
      id: 'chuan-bi-tam-ly',
    },
    {
      type: 'paragraph',
      text: 'Rất nhiều học viên chạy tốt suốt khóa nhưng vào thi thì tay run và quên trình tự. Đó không phải vấn đề kỹ năng lái, mà là vì hoàn cảnh thi quá lạ so với những gì họ đã quen.',
    },
    {
      type: 'paragraph',
      text: 'Cách chữa là làm cho hoàn cảnh đó bớt lạ: bấm giờ khi tập, nhờ người chấm, tập cả những lần chạy ngay sau khi vừa sai. Khi cơ thể đã trải qua các tình huống đó trong sân tập, phòng thi không còn là điều gì mới.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Tóm lại một câu cho mỗi tuần',
      id: 'tom-lai',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Tuần 1: tìm ra mình yếu ở đâu.',
        'Tuần 2: xử lý đúng những chỗ đó, tách nhỏ ra mà tập.',
        'Tuần 3: ghép lại thành chuỗi và tập trong điều kiện giống thi.',
        'Tuần 4: giữ nguyên phong độ, ngủ đủ, không nạp thêm.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Nếu bạn đang ở tuần nào đó trong lộ trình này mà thấy chưa yên tâm, cứ nhắn cho tôi biết bạn đang vướng phần nào. Chúng ta sắp lịch cho đúng phần đó thay vì chạy lại toàn bộ từ đầu.',
    },
  ],
};
