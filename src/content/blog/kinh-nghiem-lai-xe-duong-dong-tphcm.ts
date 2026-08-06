import type { BlogPost } from '@/types/content';

export const post: BlogPost = {
  slug: 'kinh-nghiem-lai-xe-duong-dong-tai-tphcm',
  title: 'Kinh nghiệm lái xe đường đông tại TP.HCM',
  description:
    'Những thói quen giúp bạn lái xe an toàn hơn trong dòng giao thông đông đúc của TP.HCM, đặc biệt khi phải chia sẻ mặt đường với rất nhiều xe máy.',
  publishedAt: '2025-06-02',
  updatedAt: '2025-08-25',
  author: 'Thầy dạy lái xe',
  category: 'Kỹ năng lái xe',
  readingTimeMinutes: 8,
  coverImage: {
    src: '/images/blog/duong-dong-tphcm.svg',
    alt: 'Hình minh họa giao thông đông đúc với ô tô và xe máy',
    width: 1200,
    height: 630,
  },
  tags: ['lái xe TP.HCM', 'đường đông', 'lái xe an toàn'],
  relatedSlugs: [
    'cach-giu-binh-tinh-khi-lai-xe-lan-dau',
    'co-bang-nhung-khong-dam-lai-xe-phai-lam-sao',
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Lái xe ở TP.HCM có đặc thù riêng: mật độ xe máy rất cao, nhiều giao lộ nhỏ, và dòng xe thay đổi liên tục. Người mới thường bị choáng không phải vì thiếu kỹ năng điều khiển, mà vì phải xử lý quá nhiều thông tin cùng lúc.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Giữ khoảng cách theo thời gian, không theo mét',
      id: 'khoang-cach',
    },
    {
      type: 'paragraph',
      text: 'Ước lượng khoảng cách bằng mét rất khó khi đang lái. Cách dễ hơn: chọn một mốc cố định bên đường, khi xe trước đi qua mốc thì bắt đầu đếm. Nếu bạn tới mốc đó nhanh hơn khoảng hai giây thì bạn đang bám quá gần.',
    },
    {
      type: 'paragraph',
      text: 'Trong dòng đông chậm, khoảng cách vẫn cần đủ để bạn nhìn thấy điểm tiếp xúc của bánh sau xe trước với mặt đường. Đó là mức tối thiểu để bạn còn không gian xoay xở nếu xe trước dừng đột ngột.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Xe máy không di chuyển theo làn cố định',
      id: 'xe-may',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Luôn giả định có xe máy ở điểm mù bên phải khi bạn định rẽ phải.',
        'Trước khi mở cửa xe khi đã đỗ, nhìn gương và quay đầu kiểm tra một lần nữa.',
        'Khi rẽ trái qua dòng xe máy ngược chiều, nhích từ từ và giữ nhịp đều để người khác đoán được ý định của bạn.',
        'Bật tín hiệu sớm hơn bình thường, vì xe máy cần thời gian để phản ứng và nhường.',
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Nguyên tắc dễ nhớ',
      text: 'Đi đều và dễ đoán an toàn hơn đi nhanh rồi phanh gấp. Người xung quanh phản ứng dựa trên việc họ đoán được bạn sắp làm gì.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Quan sát xa hơn đầu xe của mình',
      id: 'quan-sat-xa',
    },
    {
      type: 'paragraph',
      text: 'Người mới thường chỉ nhìn xe ngay phía trước. Hãy tập nhìn vượt qua đó, quan sát hai đến ba xe phía xa. Khi thấy đèn phanh của xe xa sáng lên, bạn có thêm vài giây để giảm tốc mượt mà thay vì đạp phanh gấp.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Giao lộ và các con hẻm nhỏ',
      id: 'giao-lo',
    },
    {
      type: 'paragraph',
      text: 'TP.HCM có rất nhiều lối ra vào hẻm không có đèn tín hiệu. Khi đi ngang các lối này, hãy giảm nhẹ tốc độ và đưa mắt liếc vào miệng hẻm. Đây là nơi thường xuất hiện xe bất ngờ nhập vào dòng.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Chuẩn bị cho giờ cao điểm',
      id: 'gio-cao-diem',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Xem tuyến đường trước khi đi, biết trước sẽ rẽ ở đâu để không phải chuyển làn gấp.',
        'Vào làn đúng hướng rẽ sớm, đừng đợi tới sát giao lộ.',
        'Chấp nhận đi chậm. Cố lách vài mét thường không rút ngắn thời gian nhưng làm tăng rủi ro.',
        'Nếu lỡ điểm rẽ, cứ đi tiếp và vòng lại. Đừng dừng giữa dòng để lùi.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Trời mưa',
      id: 'troi-mua',
    },
    {
      type: 'paragraph',
      text: 'Mưa ở TP.HCM thường đến rất nhanh và làm mặt đường trơn ngay lập tức. Khi mưa bắt đầu, hãy giảm tốc, tăng khoảng cách và bật đèn để xe khác nhìn thấy bạn. Ở những đoạn ngập, tránh đi sát mép đường vì bạn khó biết bên dưới có hố hoặc miệng cống hay không.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Đỗ xe trong khu vực đông',
      id: 'do-xe',
    },
    {
      type: 'paragraph',
      text: 'Tìm chỗ đỗ ở nơi đông là một kỹ năng riêng. Nếu bạn chưa quen đỗ song song, hãy chọn chỗ rộng hơn nhu cầu thật và chấp nhận đi bộ thêm một đoạn. Việc cố ép xe vào chỗ quá hẹp khi đang bị xe phía sau chờ là tình huống dễ gây căng thẳng nhất với người mới.',
    },
    {
      type: 'quote',
      text: 'Lái xe ở thành phố đông không đòi hỏi phản xạ siêu phàm. Nó đòi hỏi bạn nhìn xa hơn, quyết định sớm hơn và chấp nhận đi chậm hơn một chút.',
    },
    {
      type: 'paragraph',
      text: 'Nếu bạn muốn luyện riêng tuyến đường mình hay đi trong thành phố, hãy nhắn cho tôi tuyến cụ thể. Chúng ta sắp xếp buổi học chạy đúng tuyến đó vào khung giờ bạn thường phải đi.',
    },
  ],
};
