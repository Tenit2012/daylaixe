import type { BlogPost } from '@/types/content';

export const post: BlogPost = {
  slug: 'nhung-loi-khien-bi-truat-quyen-sat-hach',
  title: 'Những lỗi khiến bị truất quyền sát hạch và cách tránh',
  description:
    'Phân biệt lỗi bị trừ điểm với lỗi bị dừng bài ngay, các tình huống khiến học viên mất cả kỳ thi chỉ trong vài giây và thói quen giúp bạn không rơi vào chúng.',
  publishedAt: '2026-07-15',
  updatedAt: '2026-07-15',
  author: 'Thầy dạy lái xe',
  category: 'Kỹ năng lái xe',
  readingTimeMinutes: 7,
  coverImage: {
    src: '/images/blog/loi-truat-quyen.svg',
    alt: 'Hình minh họa các lỗi nghiêm trọng khi thi sát hạch lái xe',
    width: 1200,
    height: 630,
  },
  tags: ['lỗi thường gặp', 'truất quyền', 'thi sát hạch', 'trừ điểm'],
  relatedSlugs: [
    'nhung-loi-thuong-gap-khi-hoc-sa-hinh',
    'ngay-thi-sat-hach-chuan-bi-va-trinh-tu',
    'bai-ghep-xe-doc-va-ngang-huong-dan-tung-buoc',
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Trong sa hình có hai loại lỗi hoàn toàn khác nhau về hậu quả. Loại thứ nhất trừ của bạn một ít điểm, bạn vẫn còn cơ hội. Loại thứ hai dừng bài thi của bạn ngay tại chỗ, bất kể các bài trước đó bạn chạy tốt tới đâu. Hiểu rõ ranh giới giữa hai loại này thay đổi hẳn cách bạn luyện tập.',
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Trước khi đọc tiếp',
      text: 'Danh mục lỗi và mức xử lý do quy định hiện hành xác định và có thể thay đổi, cũng có thể khác nhau giữa các hạng giấy phép. Bài viết nêu những nhóm lỗi tôi thấy học viên hay mắc nhất, không thay thế cho tiêu chí chấm điểm chính thức. Hãy xác nhận lại tại cơ sở đào tạo của bạn.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Nhóm lỗi khiến bài thi dừng ngay',
      id: 'nhom-loi-dung-bai',
    },
    {
      type: 'paragraph',
      text: 'Đây là nhóm bạn phải thuộc như thuộc câu điểm liệt của phần lý thuyết. Điểm chung của chúng: đều là những hành vi mà ngoài đường thật sẽ gây nguy hiểm trực tiếp.',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Xe chết máy quá số lần cho phép, hoặc chết máy ở bài yêu cầu giữ xe đứng yên trên dốc.',
        'Bánh xe đè lên vạch giới hạn ở những bài không cho phép chạm vạch.',
        'Đi sai thứ tự bài, bỏ bài hoặc đi sai hướng quy định trong sa hình.',
        'Không dừng ở vị trí bắt buộc phải dừng, ví dụ vạch dừng trước đường sắt.',
        'Quá thời gian quy định cho toàn bài.',
        'Tự ý mở cửa xe hoặc rời vị trí lái khi bài thi đang diễn ra.',
      ],
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Điểm chung của cả nhóm',
      text: 'Không lỗi nào trong số này đến từ việc bạn lái kém. Chúng đến từ vội vàng, đoán trước hiệu lệnh, hoặc cố chữa một tình huống đã lỡ thay vì làm lại cho đúng.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Nhóm lỗi bị trừ điểm',
      id: 'nhom-loi-tru-diem',
    },
    {
      type: 'paragraph',
      text: 'Nhóm này không kết thúc bài thi ngay, nhưng tích lại thì vẫn đủ khiến bạn không đạt. Nguy hiểm của nhóm này là nó âm thầm.',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Quên bật hoặc tắt tín hiệu xin đường không đúng thời điểm.',
        'Dừng xe chưa tới vạch hoặc quá vạch trong phạm vi cho phép.',
        'Không thắt dây an toàn trước khi xe lăn bánh.',
        'Tốc độ không phù hợp với yêu cầu của bài.',
        'Rê côn, đạp côn quá sớm hoặc giữ côn khi không cần với xe số sàn.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Ba nguyên nhân gốc phía sau gần như mọi lỗi',
      id: 'ba-nguyen-nhan-goc',
    },
    {
      type: 'paragraph',
      text: 'Sau nhiều khóa hướng dẫn, tôi thấy dù lỗi hiện ra dưới hình thức nào thì cũng thường quy về ba nguyên nhân sau.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Đi quá nhanh so với mức cần thiết. Xe càng nhanh, thời gian bạn có để sửa càng ít, và mọi sai số nhỏ đều bị phóng đại.',
        'Nhìn quá gần đầu xe. Mắt nhìn gần khiến bạn phản ứng muộn và giật vô lăng thay vì chỉnh mượt.',
        'Cố cứu một tình huống đã hỏng. Vào chưa chuẩn mà cố lùi cho xong thường biến một lỗi trừ điểm thành một lỗi dừng bài.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Ba thói quen giúp tránh phần lớn lỗi nặng',
      id: 'ba-thoi-quen',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Một trình tự cố định trước khi xe lăn bánh, lặp y hệt mọi lần kể cả lúc tập: dây an toàn, ghế, gương, số, tín hiệu, quan sát.',
        'Nguyên tắc "chưa chuẩn thì làm lại": khi vào bài lệch, tiến lên chỉnh lại thay vì cố đi tiếp. Mất vài giây nhưng cứu cả bài.',
        'Chạy trọn vẹn cả sa hình không nghỉ giữa chừng ít nhất vài lần trước ngày thi, để quen với nhịp liên tục thay vì tập lẻ từng bài.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Cách tự soát lỗi sau mỗi buổi tập',
      id: 'tu-soat-loi',
    },
    {
      type: 'paragraph',
      text: 'Sau mỗi buổi, hãy ghi lại ba dòng: bài nào bị mất điểm, mất vì lý do gì, và lần sau sẽ làm khác đi ra sao. Chỉ ba dòng thôi nhưng nó biến buổi tập thành dữ liệu, thay vì thành cảm giác mơ hồ rằng "hôm nay chạy cũng tạm".',
    },
    {
      type: 'paragraph',
      text: 'Sau vài buổi bạn sẽ thấy danh sách lặp lại quanh một hai lỗi cố định. Đó chính là chỗ cần luyện riêng, và cũng là chỗ đáng nhắn cho thầy để được chỉ trực tiếp.',
    },
    {
      type: 'paragraph',
      text: 'Nếu bạn đang lặp mãi một lỗi mà không rõ vì sao, nhắn cho tôi mô tả lại tình huống. Phần lớn trường hợp chỉ cần chỉnh một chi tiết nhỏ trong tư thế ngồi hoặc điểm nhìn là hết.',
    },
  ],
};
