import type { BlogPost } from '@/types/content';

export const post: BlogPost = {
  slug: 'ngay-thi-sat-hach-chuan-bi-va-trinh-tu',
  title: 'Ngày thi sát hạch: chuẩn bị gì và mọi thứ diễn ra thế nào',
  description:
    'Toàn bộ những gì diễn ra trong ngày thi sát hạch, thứ cần mang theo, cách phân bổ sức cho ba phần thi và những sai lầm khiến học viên hỏng ngay từ khâu chờ đợi.',
  publishedAt: '2026-07-03',
  updatedAt: '2026-07-03',
  author: 'Thầy dạy lái xe',
  category: 'Chuẩn bị hồ sơ',
  readingTimeMinutes: 8,
  coverImage: {
    src: '/images/blog/ngay-thi-sat-hach.svg',
    alt: 'Hình minh họa học viên chuẩn bị cho ngày thi sát hạch',
    width: 1200,
    height: 630,
  },
  tags: ['ngày thi', 'thi sát hạch', 'chuẩn bị hồ sơ', 'kinh nghiệm thi'],
  relatedSlugs: [
    'on-thi-ly-thuyet-lai-xe-khong-phai-hoc-thuoc-long',
    'nhung-loi-khien-bi-truat-quyen-sat-hach',
    'quy-trinh-dang-ky-hoc-lai-xe-cho-nguoi-moi',
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Phần lớn học viên trượt không phải vì lái kém. Họ trượt vì ngày thi diễn ra khác với những gì họ tưởng tượng, và sự khác biệt đó làm họ mất bình tĩnh ngay trước khi lên xe. Bài này mô tả một ngày thi thường diễn ra ra sao, để bạn không bị bất ngờ.',
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Lưu ý quan trọng',
      text: 'Trình tự, giấy tờ và cách tổ chức có thể khác nhau giữa các trung tâm sát hạch và thay đổi theo quy định hiện hành. Hãy hỏi lại cơ sở đào tạo của bạn để có thông tin đúng cho kỳ thi của mình. Những gì mô tả dưới đây là khung chung để bạn hình dung.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Chuẩn bị từ tối hôm trước',
      id: 'chuan-bi-toi-hom-truoc',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Chuẩn bị sẵn giấy tờ tùy thân theo hướng dẫn của cơ sở đào tạo, để chung một chỗ dễ lấy.',
        'Kiểm tra lại giờ tập trung và địa điểm. Trung tâm sát hạch thường không phải nơi bạn học hằng ngày.',
        'Chuẩn bị giày đế mỏng, vừa chân. Đây là chi tiết nhỏ nhưng ảnh hưởng thật tới cảm giác chân ga chân phanh.',
        'Ngủ đủ. Thức khuya ôn thêm vài chục câu lý thuyết không bù lại được một buổi sáng đầu óc chậm chạp.',
      ],
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Đừng mặc đồ mới hay đi giày mới',
      text: 'Ngày thi không phải lúc thử thứ gì mới. Giày cao gót, dép lê hay giày đế dày đều làm bạn mất cảm giác chân — thứ bạn đã quen suốt khóa học.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Đến sớm và làm gì trong lúc chờ',
      id: 'den-som-va-cho-doi',
    },
    {
      type: 'paragraph',
      text: 'Hãy đến sớm hơn giờ tập trung một khoảng đủ để không phải chạy vội. Nhưng phần quan trọng hơn là bạn làm gì trong lúc chờ, vì thời gian chờ ở trung tâm sát hạch thường dài hơn bạn nghĩ.',
    },
    {
      type: 'paragraph',
      text: 'Đây là lúc nhiều học viên tự phá hỏng tâm lý của mình: đứng nghe người khác kể chuyện vừa trượt, xem người trước chạy sa hình rồi tự so sánh, hoặc ôn dồn lý thuyết trong trạng thái căng thẳng. Cả ba đều không giúp gì.',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Nếu được phép quan sát, hãy xem để nhớ lại bố cục sân, vị trí các bài, hướng xuất phát — chứ không phải để chấm điểm người khác.',
        'Nhẩm lại trình tự trước khi xe lăn bánh của riêng bạn: dây an toàn, ghế, gương, số, tín hiệu, quan sát.',
        'Tách khỏi những nhóm đang bàn tán về chuyện trượt. Lo lắng lây rất nhanh.',
        'Uống đủ nước, tránh để bụng quá đói hoặc quá no.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Phần lý thuyết',
      id: 'phan-ly-thuyet',
    },
    {
      type: 'paragraph',
      text: 'Thường là phần thi đầu tiên và làm trên máy tính. Hai điều cần nhớ: đọc kỹ câu hỏi trước khi chọn, và nếu bộ đề cho phép quay lại câu trước thì hãy để dành những câu phân vân, đừng đứng lại quá lâu ở một câu.',
    },
    {
      type: 'paragraph',
      text: 'Với nhóm câu điểm liệt, hãy đọc chậm gấp đôi. Đây là nhóm mà sai một câu là hỏng cả bài, nên vài giây đọc lại là thứ đáng bỏ thời gian nhất trong toàn bộ kỳ thi.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Phần thực hành trong sa hình',
      id: 'phan-sa-hinh',
    },
    {
      type: 'paragraph',
      text: 'Đây là phần được chấm tự động qua thiết bị gắn trên xe. Xe thi thường không phải chiếc bạn tập hằng ngày, nên hãy dành những giây đầu tiên để làm quen: độ nặng của vô lăng, độ nhạy của chân phanh, vị trí cần số.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Chỉnh ghế và gương trước khi báo sẵn sàng. Đừng ngại mất mấy giây cho việc này.',
        'Đi chậm hơn cảm giác bình thường của bạn. Gần như không ai trượt vì đi chậm, rất nhiều người trượt vì vội.',
        'Nếu lỡ sai một bài, gạt nó sang một bên ngay lập tức và tập trung vào bài kế tiếp. Tiếc nuối là thứ kéo theo lỗi dây chuyền.',
        'Nghe kỹ hiệu lệnh của thiết bị và giám khảo, đừng đoán trước.',
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Điều tôi nhắc học viên ngay trước khi lên xe',
      text: 'Bạn không cần chạy đẹp, bạn chỉ cần chạy đủ. Cố gắng hoàn hảo là lý do khiến nhiều người căng cứng rồi mắc lỗi ở bài dễ nhất.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Phần đường trường',
      id: 'phan-duong-truong',
    },
    {
      type: 'paragraph',
      text: 'Phần này ngắn nhưng nhiều người chủ quan. Sau khi qua sa hình, tâm lý thường buông lỏng vì nghĩ phần khó đã xong. Hãy giữ nguyên mức tập trung: thao tác đúng trình tự, quan sát và ra tín hiệu đầy đủ, giữ tốc độ ổn định theo hiệu lệnh.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Những sai lầm không liên quan tới kỹ năng lái',
      id: 'sai-lam-ngoai-ky-nang',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Đến muộn rồi vào thi trong trạng thái thở gấp.',
        'Quên giấy tờ, phải gọi người nhà mang tới trong lúc đang tới lượt.',
        'Uống cà phê quá nhiều cho tỉnh táo, kết quả là tay run.',
        'Nhận quá nhiều lời khuyên khác nhau ngay trước giờ thi rồi rối, không biết nghe ai.',
        'Cố nhớ mẹo của người khác thay vì làm theo cách mình đã tập suốt khóa.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Nếu kết quả không như mong muốn',
      id: 'neu-khong-nhu-mong-muon',
    },
    {
      type: 'paragraph',
      text: 'Trượt một phần nào đó không phải chuyện hiếm và cũng không nói lên rằng bạn không hợp với việc lái xe. Điều quan trọng là biết chính xác mình mất điểm ở đâu để luyện đúng chỗ đó, thay vì học lại từ đầu cho tốn thời gian.',
    },
    {
      type: 'paragraph',
      text: 'Nếu bạn sắp tới ngày thi và muốn chạy thử trọn vẹn một lượt trong điều kiện giống thi thật, cứ nhắn cho tôi. Một buổi chạy đúng nhịp thi thường có ích hơn nhiều buổi tập rời rạc.',
    },
  ],
};
