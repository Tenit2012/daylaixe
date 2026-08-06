import type { BlogPost } from '@/types/content';

export const post: BlogPost = {
  slug: 'khi-nao-nen-dang-ky-bo-tuc-tay-lai',
  title: 'Khi nào nên đăng ký bổ túc tay lái?',
  description:
    'Các dấu hiệu cho thấy bạn nên bổ túc tay lái, nội dung một khóa bổ túc thường gồm những gì và cách chọn nội dung luyện cho đúng nhu cầu.',
  publishedAt: '2025-07-09',
  updatedAt: '2025-08-28',
  author: 'Thầy dạy lái xe',
  category: 'Kinh nghiệm học lái',
  readingTimeMinutes: 6,
  coverImage: {
    src: '/images/blog/bo-tuc-tay-lai.svg',
    alt: 'Hình minh họa buổi bổ túc tay lái trên đường thực tế',
    width: 1200,
    height: 630,
  },
  tags: ['bổ túc tay lái', 'luyện lái xe', 'lấy lại tay lái'],
  relatedSlugs: [
    'co-bang-nhung-khong-dam-lai-xe-phai-lam-sao',
    'nhung-loi-thuong-gap-khi-hoc-sa-hinh',
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Bổ túc tay lái không chỉ dành cho người "lái kém". Đây là hình thức luyện tập có mục tiêu, phù hợp với nhiều tình huống khác nhau trong đời sống thực tế.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Những dấu hiệu bạn nên bổ túc',
      id: 'dau-hieu',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Bạn có bằng nhưng chưa từng tự lái một mình.',
        'Bạn đã nghỉ lái từ sáu tháng trở lên.',
        'Bạn chỉ quen chạy đường quen và né mọi tuyến đường mới.',
        'Bạn phải nhờ người khác đỗ xe giúp trong bãi hoặc hầm.',
        'Bạn sắp chuyển sang một chiếc xe khác hẳn về kích thước.',
        'Bạn sắp phải chạy đường dài hoặc chạy ban đêm mà chưa có kinh nghiệm.',
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Một cách nhìn khác',
      text: 'Nếu bạn thấy mình đang tránh né một loại tình huống lái xe nào đó, đó chính là nội dung bạn nên luyện. Né tránh lâu ngày làm nỗi ngại lớn dần thay vì nhỏ đi.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Một khóa bổ túc thường gồm những gì',
      id: 'noi-dung',
    },
    {
      type: 'paragraph',
      text: 'Khác với khóa học lấy bằng vốn đi theo chương trình cố định, bổ túc được thiết kế theo nhu cầu từng người. Buổi đầu thường là buổi đánh giá: bạn chạy một đoạn để người hướng dẫn xác định điểm cần cải thiện.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Buổi đánh giá: xác định bạn đang yếu phần nào và mục tiêu cụ thể của khóa.',
        'Lấy lại cảm giác xe: canh làn, canh khoảng cách hai bên, phanh và dừng êm.',
        'Đỗ xe và lùi xe: đỗ song song, đỗ vuông góc, lùi vào chỗ hẹp.',
        'Đường đông: nhích trong dòng xe, chuyển làn, qua giao lộ nhiều xe máy.',
        'Tình huống riêng: hầm chung cư, hẻm nhỏ, đường dốc, chạy đêm hoặc trời mưa.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Nên học xe số sàn hay số tự động khi bổ túc?',
      id: 'chon-xe',
    },
    {
      type: 'paragraph',
      text: 'Hãy luyện trên loại xe bạn sẽ thực sự lái. Nếu xe nhà bạn là số tự động thì không cần bổ túc trên xe số sàn. Ngược lại, nếu công việc yêu cầu bạn cầm lái xe số sàn thì nên luyện đúng loại đó, kể cả khi bạn học bằng trên xe số tự động.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Cần bao nhiêu buổi là đủ?',
      id: 'so-buoi',
    },
    {
      type: 'paragraph',
      text: 'Điều này phụ thuộc vào mục tiêu và điểm xuất phát của bạn. Một người chỉ cần luyện đỗ xe sẽ mất ít buổi hơn nhiều so với người muốn tự tin chạy toàn thành phố. Điều quan trọng là bạn nên được ước lượng số buổi ngay sau buổi đánh giá, để chủ động cả về thời gian lẫn chi phí.',
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Nên hỏi rõ trước khi bắt đầu',
      text: 'Cách tính chi phí theo buổi hay theo giờ, có tính thời gian di chuyển hay không, và điều gì xảy ra nếu bạn cần thêm buổi. Hỏi trước giúp cả hai bên thoải mái hơn về sau.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Cách tận dụng tối đa mỗi buổi',
      id: 'tan-dung',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Nói rõ ngay từ đầu điều bạn ngại nhất, đừng ngại thừa nhận.',
        'Chọn tuyến đường bạn thật sự cần đi thay vì tuyến chung chung.',
        'Đề nghị lặp lại một tình huống nhiều lần nếu bạn thấy chưa chắc.',
        'Sau mỗi buổi, tự ghi lại điều đã cải thiện và điều còn vướng.',
      ],
    },
    {
      type: 'quote',
      text: 'Bổ túc hiệu quả nhất khi bạn nói thật mình đang ngại gì. Người hướng dẫn không thể giúp bạn xử lý một nỗi lo mà họ không biết đến.',
    },
    {
      type: 'paragraph',
      text: 'Nếu bạn đang cân nhắc bổ túc, hãy nhắn cho tôi mô tả ngắn về tình trạng hiện tại và điều bạn muốn làm được sau khóa. Tôi sẽ đề xuất nội dung và số buổi phù hợp trước khi bạn quyết định.',
    },
  ],
};
