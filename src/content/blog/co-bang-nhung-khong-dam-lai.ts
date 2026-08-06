import type { BlogPost } from '@/types/content';

export const post: BlogPost = {
  slug: 'co-bang-nhung-khong-dam-lai-xe-phai-lam-sao',
  title: 'Có bằng nhưng không dám lái xe phải làm sao?',
  description:
    'Vì sao nhiều người có bằng lái vẫn không dám cầm vô lăng, và lộ trình thực tế để lấy lại sự tự tin mà không cần học lại từ đầu.',
  publishedAt: '2025-04-25',
  updatedAt: '2025-08-02',
  author: 'Thầy dạy lái xe',
  category: 'Tâm lý khi lái xe',
  readingTimeMinutes: 7,
  coverImage: {
    src: '/images/blog/co-bang-khong-dam-lai.svg',
    alt: 'Hình minh họa người ngồi trong xe còn do dự trước khi lái',
    width: 1200,
    height: 630,
  },
  tags: ['bổ túc tay lái', 'tự tin lái xe', 'lâu không lái'],
  relatedSlugs: [
    'khi-nao-nen-dang-ky-bo-tuc-tay-lai',
    'cach-giu-binh-tinh-khi-lai-xe-lan-dau',
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Rất nhiều người liên hệ với tôi bắt đầu bằng câu: "Em có bằng ba năm rồi mà chưa dám chạy lần nào." Đây là tình huống phổ biến hơn bạn tưởng, và hoàn toàn có cách xử lý.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Vì sao chuyện này xảy ra',
      id: 'vi-sao',
    },
    {
      type: 'paragraph',
      text: 'Kỳ sát hạch kiểm tra khả năng thực hiện đúng các bài trong điều kiện được kiểm soát. Đường phố thật thì khác: xe máy tạt ngang, người đi bộ băng qua, chỗ đỗ chật, và không ai nhắc bạn phải làm gì tiếp theo.',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Khoảng cách giữa kỹ năng thi và kỹ năng đi đường thật chưa được lấp đầy.',
        'Sau khi có bằng, nhiều người không có xe để duy trì thói quen nên kỹ năng mai một.',
        'Một lần va chạm nhẹ hoặc một tình huống giật mình đủ để tạo tâm lý né tránh lâu dài.',
        'Không có ai ngồi cạnh để trấn an trong những lần chạy đầu tiên.',
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Điều cần nói rõ',
      text: 'Không dám lái không có nghĩa là bạn không đủ khả năng lái. Đó thường chỉ là dấu hiệu bạn thiếu số giờ cầm lái trong điều kiện thật, chứ không phải thiếu năng lực.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Lộ trình lấy lại sự tự tin',
      id: 'lo-trinh',
    },
    {
      type: 'heading',
      level: 3,
      text: 'Bước 1: Làm quen lại trong điều kiện dễ',
      id: 'buoc-1',
    },
    {
      type: 'paragraph',
      text: 'Đừng bắt đầu bằng việc chạy giờ cao điểm. Buổi đầu nên là sân tập hoặc đường vắng vào khung giờ ít xe, chỉ để lấy lại cảm giác kích thước xe, chân ga và điểm phanh.',
    },
    {
      type: 'heading',
      level: 3,
      text: 'Bước 2: Chạy đúng tuyến bạn cần đi',
      id: 'buoc-2',
    },
    {
      type: 'paragraph',
      text: 'Đây là bước tôi thấy hiệu quả nhất. Thay vì chạy lung tung, hãy chọn tuyến bạn thật sự phải đi: từ nhà đến chỗ làm, đến trường của con, hoặc vào hầm chung cư nơi bạn ở. Chạy đi chạy lại tuyến đó vài lần cùng người hướng dẫn.',
    },
    {
      type: 'heading',
      level: 3,
      text: 'Bước 3: Xử lý riêng phần bạn sợ nhất',
      id: 'buoc-3',
    },
    {
      type: 'paragraph',
      text: 'Mỗi người sợ một thứ khác nhau. Có người ngại lùi vào chỗ hẹp, có người ngại rẽ trái qua dòng xe máy, có người chỉ ngại đường dốc trong hầm. Xác định đúng nỗi sợ rồi luyện riêng phần đó tiết kiệm thời gian hơn nhiều so với học lại toàn bộ.',
    },
    {
      type: 'heading',
      level: 3,
      text: 'Bước 4: Chạy một mình quãng ngắn',
      id: 'buoc-4',
    },
    {
      type: 'paragraph',
      text: 'Bước chuyển quan trọng là lần đầu tự chạy không có ai ngồi cạnh. Hãy bắt đầu bằng quãng thật ngắn và quen thuộc, vào khung giờ vắng. Cảm giác tự làm được một lần có giá trị hơn nhiều buổi tập có người kèm.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Cần bao nhiêu buổi?',
      id: 'bao-nhieu-buoi',
    },
    {
      type: 'paragraph',
      text: 'Không có con số chung. Có người chỉ cần vài buổi để lấy lại nhịp, có người cần nhiều hơn vì đã nghỉ quá lâu hoặc từng có trải nghiệm không tốt. Sau buổi đầu tiên, tôi thường nói thẳng ước lượng số buổi để bạn chủ động sắp xếp thời gian và chi phí.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Những điều nên tránh',
      id: 'nen-tranh',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Nhờ người thân không có kinh nghiệm hướng dẫn kèm theo lời trách móc — cách này thường làm bạn sợ hơn.',
        'Ép mình chạy đường đông ngay từ buổi đầu để "cho quen".',
        'So sánh bản thân với người học nhanh hơn. Nhịp mỗi người mỗi khác.',
        'Bỏ cuộc sau một buổi không suôn sẻ. Buổi thứ hai thường dễ chịu hơn nhiều.',
      ],
    },
    {
      type: 'quote',
      text: 'Mục tiêu không phải là hết sợ hoàn toàn. Một chút thận trọng khi lái xe là điều tốt. Mục tiêu là bạn kiểm soát được nỗi sợ thay vì để nó ngăn bạn cầm lái.',
    },
    {
      type: 'paragraph',
      text: 'Nếu bạn đang ở tình trạng này, hãy nhắn cho tôi và mô tả cụ thể điều bạn ngại nhất. Chúng ta sẽ bắt đầu từ đúng chỗ đó.',
    },
  ],
};
