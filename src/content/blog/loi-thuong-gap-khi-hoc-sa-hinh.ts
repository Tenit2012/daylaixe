import type { BlogPost } from '@/types/content';

export const post: BlogPost = {
  slug: 'nhung-loi-thuong-gap-khi-hoc-sa-hinh',
  title: 'Những lỗi thường gặp khi học sa hình',
  description:
    'Tổng hợp các lỗi học viên hay mắc trong từng bài sa hình, nguyên nhân phía sau và cách tự sửa trước khi bước vào kỳ sát hạch.',
  publishedAt: '2025-03-21',
  updatedAt: '2025-07-30',
  author: 'Thầy dạy lái xe',
  category: 'Kỹ năng lái xe',
  readingTimeMinutes: 8,
  coverImage: {
    src: '/images/blog/loi-sa-hinh.svg',
    alt: 'Hình minh họa sơ đồ sa hình với các bài thi',
    width: 1200,
    height: 630,
  },
  tags: ['luyện sa hình', 'lỗi thường gặp', 'thi sát hạch'],
  relatedSlugs: [
    'cach-giu-binh-tinh-khi-lai-xe-lan-dau',
    'khi-nao-nen-dang-ky-bo-tuc-tay-lai',
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Sau nhiều khóa hướng dẫn, tôi nhận ra phần lớn lỗi trong sa hình không đến từ việc học viên không biết lái, mà đến từ ba nguyên nhân lặp đi lặp lại: đi quá nhanh, nhìn sai điểm mốc và mất bình tĩnh khi lỡ sai một nhịp.',
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Trước khi đọc tiếp',
      text: 'Bài viết mô tả kinh nghiệm luyện tập, không thay thế cho nội dung và tiêu chí chấm điểm chính thức. Tiêu chí cụ thể của kỳ sát hạch cần được xác nhận theo quy định hiện hành tại thời điểm bạn dự thi.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Lỗi ở bài xuất phát',
      id: 'loi-bai-xuat-phat',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Quên bật tín hiệu xin đường hoặc bật rồi tắt quá sớm.',
        'Nhả phanh tay chưa hết nên xe ì, dễ bị hiểu là chưa sẵn sàng.',
        'Vội vàng đi ngay khi vừa ngồi vào ghế, chưa kịp chỉnh gương và dây an toàn.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Cách sửa: xây dựng một trình tự cố định và lặp lại đúng thứ tự đó mọi lần, kể cả khi tập. Thắt dây, chỉnh ghế, chỉnh gương, kiểm tra số, bật tín hiệu, quan sát rồi mới đi. Khi trình tự thành thói quen, bạn không phải nhớ nữa.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Lỗi ở bài dừng và khởi hành ngang dốc',
      id: 'loi-bai-len-doc',
    },
    {
      type: 'paragraph',
      text: 'Đây là bài khiến nhiều học viên căng thẳng nhất, đặc biệt với xe số sàn. Hai lỗi phổ biến là xe trôi về sau và chết máy.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Xe trôi: thường do nhả phanh trước khi côn kịp bám. Hãy giữ phanh cho đến khi cảm nhận đầu xe hơi nhấc lên rồi mới nhả.',
        'Chết máy: do nhả côn quá nhanh hoặc chưa mớm đủ ga. Tập riêng động tác nhả côn thật chậm ở mặt phẳng trước khi lên dốc.',
        'Dừng quá vạch hoặc chưa tới vạch: chọn một điểm mốc cố định trên nắp ca-pô so với vạch kẻ và luôn dùng đúng mốc đó.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Lỗi ở bài đường vòng quanh co',
      id: 'loi-bai-quanh-co',
    },
    {
      type: 'paragraph',
      text: 'Học viên hay cán vạch vì đánh lái muộn hoặc đi quá nhanh nên không kịp chỉnh. Ở bài này, tốc độ chậm là bạn của bạn. Xe càng chậm, bạn càng có thời gian sửa vô lăng.',
    },
    {
      type: 'paragraph',
      text: 'Một mẹo tôi hay hướng dẫn: thay vì nhìn sát đầu xe, hãy nhìn xa về phía lối ra của khúc cua. Mắt nhìn đâu, tay lái tự đi theo hướng đó. Nhìn quá gần khiến bạn phản ứng chậm và giật vô lăng.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Lỗi ở bài ghép xe dọc và ghép ngang',
      id: 'loi-bai-ghep-xe',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Không đưa xe về đúng vị trí chuẩn bị trước khi lùi, dẫn tới cả bài lệch theo.',
        'Chỉ nhìn một bên gương, quên kiểm tra bên còn lại.',
        'Khi thấy sai thì cố lùi tiếp thay vì tiến lên chỉnh lại.',
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Nguyên tắc tôi luôn nhắc học viên',
      text: 'Vào chưa chuẩn thì tiến lên làm lại, đừng cố lùi cho xong. Chỉnh lại tốn vài giây nhưng cứu được cả bài.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Lỗi ở bài qua ngã tư và đường sắt',
      id: 'loi-nga-tu',
    },
    {
      type: 'paragraph',
      text: 'Lỗi thường gặp là dừng sai vạch hoặc đi khi chưa quan sát đủ. Nhiều học viên vì lo hết giờ nên vội, trong khi phần lớn tình huống vẫn còn dư thời gian nếu giữ nhịp ổn định từ đầu.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Lỗi không nằm ở bài nào cả',
      id: 'loi-tam-ly',
    },
    {
      type: 'paragraph',
      text: 'Có một loại lỗi không thuộc bài nào: mất bình tĩnh sau khi lỡ sai. Học viên sai một bài rồi tiếc nuối, mất tập trung và kéo theo sai tiếp các bài sau. Trong lúc luyện, tôi thường cố tình để học viên sai rồi yêu cầu chạy tiếp ngay, để tập phản xạ gạt lỗi cũ sang một bên.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Cách tự kiểm tra trước ngày thi',
      id: 'tu-kiem-tra',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Chạy trọn vẹn toàn bộ sa hình không dừng giữa chừng, giống điều kiện thi thật.',
        'Ghi lại bài nào bị mất điểm và mất vì lý do gì.',
        'Luyện riêng bài đó ít nhất ba lần liên tiếp không sai.',
        'Chạy lại toàn bộ một lần nữa để chắc chắn phần đã sửa không kéo phần khác đi xuống.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Nếu bạn đang vướng ở một bài cụ thể và muốn luyện thêm, hãy nhắn cho tôi biết đó là bài nào. Chúng ta xử lý đúng bài đó thay vì chạy lại từ đầu cho tốn thời gian.',
    },
  ],
};
