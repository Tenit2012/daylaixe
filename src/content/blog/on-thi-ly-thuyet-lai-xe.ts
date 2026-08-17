import type { BlogPost } from '@/types/content';

export const post: BlogPost = {
  slug: 'on-thi-ly-thuyet-lai-xe-khong-phai-hoc-thuoc-long',
  title: 'Ôn thi lý thuyết lái xe: cách học không phải thuộc lòng',
  description:
    'Cách ôn bộ câu hỏi lý thuyết theo nhóm ý nghĩa thay vì học vẹt, cách xử lý nhóm câu điểm liệt và lịch ôn ba tuần cho người đi làm bận rộn.',
  publishedAt: '2026-06-05',
  updatedAt: '2026-06-05',
  author: 'Thầy dạy lái xe',
  category: 'Kinh nghiệm học lái',
  readingTimeMinutes: 9,
  coverImage: {
    src: '/images/blog/on-thi-ly-thuyet.svg',
    alt: 'Hình minh họa ôn tập bộ câu hỏi lý thuyết lái xe',
    width: 1200,
    height: 630,
  },
  tags: ['ôn thi lý thuyết', 'câu điểm liệt', 'thi sát hạch', 'mẹo ôn thi'],
  relatedSlugs: [
    'thi-mo-phong-tinh-huong-giao-thong-vi-sao-mat-diem',
    'ngay-thi-sat-hach-chuan-bi-va-trinh-tu',
    'cach-chuan-bi-truoc-buoi-hoc-lai-dau-tien',
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Phần lý thuyết là phần nhiều học viên xem nhẹ nhất và cũng là phần khiến nhiều người phải quay lại thi lần hai. Lý do gần như luôn giống nhau: học vẹt đáp án theo số thứ tự câu hỏi, đến khi đề đảo thứ tự thì không còn nhận ra câu nào với câu nào.',
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Trước khi đọc tiếp',
      text: 'Bài viết chia sẻ cách ôn tập, không thay thế bộ câu hỏi và quy chế thi chính thức. Số lượng câu hỏi, cấu trúc đề và điều kiện đạt đều theo quy định hiện hành và có thể thay đổi — bạn hãy xác nhận lại tại cơ sở đào tạo ở thời điểm dự thi.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Vì sao học thuộc đáp án lại phản tác dụng',
      id: 'vi-sao-hoc-thuoc-phan-tac-dung',
    },
    {
      type: 'paragraph',
      text: 'Khi bạn nhớ "câu 47 chọn ý 2", bạn đang nhớ một cặp số chứ không nhớ một quy tắc. Bộ nhớ dạng này rất dễ vỡ: chỉ cần đề trộn lại, hoặc câu hỏi được diễn đạt hơi khác, là bạn mất điểm dù "đã học rồi". Nó cũng vô dụng khi bạn ra đường thật.',
    },
    {
      type: 'paragraph',
      text: 'Cách bền hơn là hiểu vì sao đáp án đó đúng. Phần lớn câu hỏi trong bộ đề đều xoay quanh một số nguyên tắc lặp lại. Nắm được nguyên tắc, bạn trả lời được cả những câu chưa từng đọc.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Chia bộ câu hỏi thành nhóm ý nghĩa',
      id: 'chia-nhom-y-nghia',
    },
    {
      type: 'paragraph',
      text: 'Thay vì làm tuần tự từ câu đầu đến câu cuối, hãy gom câu hỏi theo chủ đề rồi học trọn từng chủ đề. Cách chia tôi hay hướng dẫn học viên:',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Nhóm khái niệm và quy tắc chung: định nghĩa các loại đường, phần đường, làn đường, thứ tự ưu tiên.',
        'Nhóm biển báo: học theo hình dạng và màu sắc trước, học từng biển sau.',
        'Nhóm sa hình nhường đường: đây là nhóm khiến nhiều người mất điểm nhất, cần luyện riêng.',
        'Nhóm kỹ thuật lái xe và cấu tạo xe: phần này gắn với những gì bạn đã làm trên xe nên dễ nhớ nhất.',
        'Nhóm văn hóa, đạo đức nghề nghiệp và xử lý tình huống.',
        'Nhóm câu điểm liệt: học riêng, học kỹ, xem mục bên dưới.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Mẹo với nhóm biển báo',
      id: 'meo-nhom-bien-bao',
    },
    {
      type: 'paragraph',
      text: 'Biển báo có logic hình học rất rõ. Nắm logic này bạn đoán đúng phần lớn biển chưa từng thấy: biển tròn viền đỏ mang tính cấm, biển tam giác viền đỏ mang tính cảnh báo nguy hiểm, biển tròn nền xanh mang tính bắt buộc phải làm, biển vuông hoặc chữ nhật nền xanh mang tính chỉ dẫn.',
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Cách nhớ nhanh',
      text: 'Hình dạng cho bạn biết đó là loại lệnh gì, hình vẽ bên trong cho bạn biết lệnh đó áp dụng cho ai. Nhớ theo thứ tự đó thì không lẫn giữa biển cấm và biển cảnh báo.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Nhóm sa hình nhường đường: học một quy trình cố định',
      id: 'nhom-sa-hinh-nhuong-duong',
    },
    {
      type: 'paragraph',
      text: 'Đây là nhóm câu có hình vẽ ngã tư với nhiều xe, hỏi xe nào đi trước. Nhiều học viên nhìn hình rồi đoán. Thay vào đó, hãy áp một trình tự cố định cho mọi câu:',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Có xe ưu tiên không (cứu hỏa, cứu thương, công an, quân sự đang làm nhiệm vụ)? Nếu có, xe đó đi trước.',
        'Có biển báo hoặc đèn tín hiệu điều khiển không? Nếu có, theo biển và đèn.',
        'Xe nào đã vào giao lộ trước? Xe đó thoát trước.',
        'Xét đường ưu tiên: xe trên đường ưu tiên đi trước.',
        'Cuối cùng mới xét bên phải trống và thứ tự rẽ phải, đi thẳng, rẽ trái.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Chạy đúng năm bước này cho mọi câu sa hình. Ban đầu chậm, nhưng sau khoảng ba chục câu bạn sẽ chạy hết quy trình trong đầu chỉ vài giây.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Nhóm câu điểm liệt phải học riêng',
      id: 'nhom-cau-diem-liet',
    },
    {
      type: 'paragraph',
      text: 'Trong bộ đề có một nhóm câu mà chỉ cần sai một câu là trượt cả bài lý thuyết, bất kể các câu khác bạn làm đúng bao nhiêu. Nhóm này xoay quanh những tình huống nguy hiểm nhất: nồng độ cồn, ma túy, chạy quá tốc độ ở mức nghiêm trọng, đi ngược chiều trên đường cao tốc, giao xe cho người không đủ điều kiện, các hành vi bị nghiêm cấm.',
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Đừng để mất bài vì nhóm này',
      text: 'Hãy tách riêng toàn bộ câu điểm liệt ra một danh sách và ôn nó mỗi ngày cho tới ngày thi, kể cả khi bạn đã thuộc. Đây là phần có tỷ lệ đánh đổi kém nhất: học thì nhanh, sai thì mất cả bài.',
    },
    {
      type: 'paragraph',
      text: 'Điểm chung của nhóm câu này là đáp án gần như luôn nghiêng về hướng an toàn nhất và tuân thủ nhất. Khi gặp một câu điểm liệt mà bạn phân vân, hãy chọn phương án thận trọng nhất — đó thường là đáp án đúng.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Lịch ôn ba tuần cho người đi làm',
      id: 'lich-on-ba-tuan',
    },
    {
      type: 'paragraph',
      text: 'Học viên của tôi phần lớn đi làm giờ hành chính, chỉ ôn được buổi tối. Lịch dưới đây giả định mỗi ngày bạn có khoảng ba mươi tới bốn mươi lăm phút.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Tuần 1 — đi hết bộ đề một lượt theo nhóm chủ đề, không cần nhớ, chỉ cần biết có những gì. Đọc kỹ phần giải thích của câu làm sai.',
        'Tuần 2 — làm lại riêng những câu đã sai ở tuần 1, cộng thêm ôn nhóm câu điểm liệt mỗi ngày. Đây là tuần nặng nhất.',
        'Tuần 3 — chuyển sang thi thử theo đề ngẫu nhiên, bấm giờ như thi thật. Mỗi ngày hai tới ba đề.',
        'Ba ngày cuối — chỉ ôn câu điểm liệt và những câu vẫn còn sai. Không nạp kiến thức mới.',
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Dấu hiệu bạn đã sẵn sàng',
      text: 'Không phải là thuộc hết, mà là ba đề ngẫu nhiên liên tiếp đều đạt và không sai câu điểm liệt nào. Nếu chưa được vậy, đừng vội đăng ký lịch thi.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Sai lầm hay gặp trong lúc ôn',
      id: 'sai-lam-khi-on',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Chỉ làm đề dễ để giữ cảm giác tự tin, né các nhóm câu mình yếu.',
        'Làm đề liên tục nhưng không bao giờ đọc lại lời giải thích của câu sai.',
        'Ôn dồn hết vào một hai ngày cuối. Trí nhớ dạng này rơi rất nhanh.',
        'Học trên nhiều nguồn khác nhau cùng lúc, dẫn tới lẫn lộn khi các nguồn chưa cập nhật giống nhau.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Phần lý thuyết không chỉ để qua bài thi',
      id: 'khong-chi-de-qua-bai-thi',
    },
    {
      type: 'paragraph',
      text: 'Tôi luôn nói với học viên rằng phần lý thuyết là phần duy nhất trong khóa học mà bạn sẽ dùng lại mỗi ngày sau này. Thứ tự nhường đường ở ngã tư, ý nghĩa của một biển báo lạ, khoảng cách an toàn — đó là những thứ bạn cần vào đúng lúc không có ai ngồi bên cạnh nhắc.',
    },
    {
      type: 'paragraph',
      text: 'Nếu bạn đang ôn mà thấy vướng ở một nhóm câu cụ thể, cứ nhắn cho tôi biết nhóm nào. Tôi sẽ chỉ cách gỡ đúng nhóm đó thay vì bảo bạn làm lại cả bộ đề từ đầu.',
    },
  ],
};
