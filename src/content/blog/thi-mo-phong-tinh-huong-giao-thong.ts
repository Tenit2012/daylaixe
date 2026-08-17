import type { BlogPost } from '@/types/content';

export const post: BlogPost = {
  slug: 'thi-mo-phong-tinh-huong-giao-thong-vi-sao-mat-diem',
  title: 'Thi mô phỏng tình huống giao thông: vì sao nhiều người mất điểm',
  description:
    'Phần thi mô phỏng đánh giá thời điểm bạn nhận ra nguy hiểm. Bài viết phân tích vì sao bấm sớm hay muộn đều mất điểm và cách luyện phản xạ cho đúng nhịp.',
  publishedAt: '2026-06-19',
  updatedAt: '2026-06-19',
  author: 'Thầy dạy lái xe',
  category: 'Kỹ năng lái xe',
  readingTimeMinutes: 8,
  coverImage: {
    src: '/images/blog/thi-mo-phong.svg',
    alt: 'Hình minh họa phần thi mô phỏng tình huống giao thông trên máy tính',
    width: 1200,
    height: 630,
  },
  tags: ['thi mô phỏng', 'tình huống giao thông', 'thi sát hạch', 'phản xạ'],
  relatedSlugs: [
    'on-thi-ly-thuyet-lai-xe-khong-phai-hoc-thuoc-long',
    'ngay-thi-sat-hach-chuan-bi-va-trinh-tu',
    'cach-giu-binh-tinh-khi-lai-xe-lan-dau',
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Phần mô phỏng thường là phần học viên bất ngờ nhất. Nhiều người lái tốt, lý thuyết chắc, nhưng vẫn mất điểm ở đây vì hiểu sai bản chất của nó. Phần này không kiểm tra bạn có nhận ra nguy hiểm hay không — hầu như ai xem cũng nhận ra. Nó kiểm tra bạn nhận ra vào lúc nào.',
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Trước khi đọc tiếp',
      text: 'Bài viết mô tả cách luyện tập dựa trên kinh nghiệm hướng dẫn. Số lượng tình huống, cách tính điểm và phần mềm sử dụng đều theo quy định hiện hành và có thể thay đổi. Bạn hãy xác nhận lại tại cơ sở đào tạo trước ngày thi.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Cơ chế chấm điểm quyết định cách bạn luyện',
      id: 'co-che-cham-diem',
    },
    {
      type: 'paragraph',
      text: 'Mỗi tình huống là một đoạn phim ngắn quay từ góc nhìn người lái. Trong đoạn phim có một mốc thời gian nguy hiểm bắt đầu xuất hiện và một mốc thời gian đã quá muộn để xử lý. Bạn bấm càng gần đầu khoảng đó thì điểm càng cao; bấm ngoài khoảng — dù sớm hơn hay muộn hơn — thì không có điểm.',
    },
    {
      type: 'paragraph',
      text: 'Chính chi tiết "bấm sớm cũng không được điểm" là thứ khiến nhiều người mất điểm. Học viên lo lắng nên bấm ngay khi đoạn phim vừa chạy, hoặc bấm mỗi khi thấy bất cứ chuyển động nào. Cách đó gần như chắc chắn hỏng.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Ba kiểu mất điểm phổ biến',
      id: 'ba-kieu-mat-diem',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Bấm phòng thủ: bấm liên tục cho chắc. Kết quả là lần bấm đúng bị lẫn giữa những lần bấm sai, và tình huống coi như hỏng.',
        'Bấm theo thói quen xem phim: chờ tới lúc va chạm sắp xảy ra mới bấm. Lúc đó đã quá muộn, vì bài thi tính từ khi dấu hiệu đầu tiên xuất hiện.',
        'Bấm nhầm dấu hiệu: thấy một chiếc xe chạy ngang vô hại thì bấm, trong khi nguy hiểm thật lại nằm ở đứa trẻ khuất sau xe đỗ.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Nguy hiểm bắt đầu từ dấu hiệu, không phải từ va chạm',
      id: 'nguy-hiem-bat-dau-tu-dau-hieu',
    },
    {
      type: 'paragraph',
      text: 'Đây là điểm mấu chốt. Trong hầu hết tình huống, luôn có một dấu hiệu xuất hiện trước khi mọi thứ thành nguy hiểm rõ ràng. Nhiệm vụ của bạn là nhận ra dấu hiệu đó.',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Quả bóng lăn ra đường — đứa trẻ sẽ chạy theo sau.',
        'Một chiếc xe đỗ bên đường bật đèn xi nhan hoặc có người vừa mở hé cửa.',
        'Xe phía trước phanh gấp hoặc đèn phanh sáng bất thường.',
        'Người đi bộ đứng sát mép đường và quay đầu nhìn sang bên kia.',
        'Xe máy len giữa hai làn, hướng bánh trước đang chếch dần về phía bạn.',
        'Đoạn đường bị che khuất tầm nhìn: khúc cua gấp, xe tải lớn phía trước, cây cối rậm.',
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Câu hỏi tự đặt khi xem mỗi tình huống',
      text: 'Nếu ngay lúc này tôi phải phanh, tôi đã có lý do chưa? Khi câu trả lời chuyển từ "chưa" sang "rồi", đó là thời điểm bấm.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Cách luyện để có nhịp bấm đúng',
      id: 'cach-luyen-nhip-bam',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Lượt đầu, xem hết tình huống mà không bấm gì cả. Chỉ để biết chuyện gì xảy ra.',
        'Lượt hai, xem lại và tự nói to ra thời điểm bạn nghĩ nguy hiểm bắt đầu, kèm lý do.',
        'Lượt ba mới bấm thật. So sánh điểm nhận được với thời điểm bạn vừa dự đoán.',
        'Ghi lại những tình huống bạn bấm lệch nhiều nhất và xem lại riêng chúng.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Đừng cày cả bộ tình huống liên tục trong một buổi. Mắt mỏi thì phản xạ chậm hẳn, và bạn sẽ luyện thành thói quen bấm sai. Mỗi buổi khoảng hai mươi tới ba mươi tình huống là đủ.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Phần này thật ra dạy bạn một thói quen tốt',
      id: 'thoi-quen-tot',
    },
    {
      type: 'paragraph',
      text: 'Tôi thích phần mô phỏng hơn nhiều người nghĩ, vì nó rèn đúng thứ mà người mới lái thiếu nhất: nhìn xa và đọc trước tình huống. Người lái lâu năm không phản xạ nhanh hơn người mới bao nhiêu, họ chỉ nhận ra vấn đề sớm hơn vài giây. Vài giây đó là toàn bộ khác biệt.',
    },
    {
      type: 'paragraph',
      text: 'Khi ra đường thật, hãy giữ nguyên thói quen này: liên tục hỏi bản thân chuyện gì có thể xảy ra tiếp theo ở khoảng đường phía trước. Nó có ích hơn nhiều so với việc phản ứng thật nhanh khi mọi thứ đã xảy ra rồi.',
    },
    {
      type: 'paragraph',
      text: 'Nếu bạn luyện mãi mà vẫn hay bấm lệch, nhắn cho tôi vài tình huống bạn hay sai. Thường chỉ cần chỉ ra bạn đang nhìn nhầm chỗ nào là gỡ được.',
    },
  ],
};
