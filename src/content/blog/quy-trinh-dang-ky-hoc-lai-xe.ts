import type { BlogPost } from '@/types/content';

export const post: BlogPost = {
  slug: 'quy-trinh-dang-ky-hoc-lai-xe-cho-nguoi-moi',
  title: 'Quy trình đăng ký học lái xe cho người mới',
  description:
    'Các bước từ lúc tìm hiểu đến khi bắt đầu buổi học đầu tiên, kèm những câu hỏi nên hỏi trước khi nộp hồ sơ để tránh phát sinh ngoài dự tính.',
  publishedAt: '2025-05-13',
  updatedAt: '2025-08-20',
  author: 'Thầy dạy lái xe',
  category: 'Chuẩn bị hồ sơ',
  readingTimeMinutes: 7,
  coverImage: {
    src: '/images/blog/quy-trinh-dang-ky.svg',
    alt: 'Hình minh họa các bước đăng ký học lái xe',
    width: 1200,
    height: 630,
  },
  tags: ['đăng ký học lái xe', 'hồ sơ', 'người mới'],
  relatedSlugs: [
    'nguoi-moi-nen-hoc-lai-xe-so-san-hay-so-tu-dong',
    'cach-chuan-bi-truoc-buoi-hoc-lai-dau-tien',
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Nhiều người muốn học lái nhưng ngại phần thủ tục vì không biết bắt đầu từ đâu. Thực tế quy trình không phức tạp, chỉ cần đi đúng thứ tự và hỏi rõ ngay từ đầu.',
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Lưu ý quan trọng',
      text: 'Danh mục hồ sơ, điều kiện dự học và lệ phí được xác định theo quy định hiện hành và có thể thay đổi. Bài viết mô tả trình tự chung; bạn hãy xác nhận lại chi tiết tại cơ sở đào tạo ở thời điểm đăng ký.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Bước 1: Xác định nhu cầu của bạn',
      id: 'buoc-1-nhu-cau',
    },
    {
      type: 'paragraph',
      text: 'Trước khi hỏi học phí, hãy trả lời ba câu hỏi: bạn sẽ lái loại xe gì, bạn rảnh vào khung giờ nào, và bạn cần có bằng trong khoảng thời gian bao lâu. Ba câu này quyết định khóa học phù hợp hơn bất cứ điều gì khác.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Bước 2: Liên hệ để được tư vấn',
      id: 'buoc-2-tu-van',
    },
    {
      type: 'paragraph',
      text: 'Ở bước này bạn nên hỏi rõ và ghi lại câu trả lời. Những câu đáng hỏi nhất:',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Khóa học gồm bao nhiêu giờ lý thuyết và bao nhiêu giờ thực hành?',
        'Học phí đã bao gồm những khoản nào, còn khoản nào có thể phát sinh?',
        'Lịch học thực hành được sắp xếp ra sao, tôi có được chọn khung giờ không?',
        'Sân tập ở đâu và tôi đi lại thế nào cho thuận tiện?',
        'Nếu tôi bận đột xuất thì đổi buổi được không?',
        'Ai sẽ là người trực tiếp hướng dẫn tôi?',
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Dấu hiệu nên cẩn trọng',
      text: 'Nếu nơi tư vấn né tránh câu hỏi về chi phí phát sinh, hoặc dùng những lời hứa như bảo đảm kết quả thi, bạn nên tìm hiểu thêm trước khi quyết định.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Bước 3: Khám sức khỏe',
      id: 'buoc-3-suc-khoe',
    },
    {
      type: 'paragraph',
      text: 'Bạn cần giấy khám sức khỏe do cơ sở y tế đủ điều kiện cấp. Nên hỏi trước nơi khám được chấp nhận và thời hạn hiệu lực của giấy để không phải khám lại. Đây là khoản chi phí riêng, thường không nằm trong học phí.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Bước 4: Chuẩn bị và nộp hồ sơ',
      id: 'buoc-4-ho-so',
    },
    {
      type: 'paragraph',
      text: 'Hồ sơ thường gồm đơn đề nghị học và sát hạch theo mẫu, giấy tờ tùy thân, giấy khám sức khỏe và ảnh thẻ. Trước khi đi nộp, hãy chụp lại toàn bộ giấy tờ để có bản lưu của riêng bạn.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Kiểm tra đủ số lượng ảnh thẻ và đúng kích thước được hướng dẫn.',
        'Đối chiếu thông tin cá nhân trên các giấy tờ cho khớp nhau, đặc biệt là họ tên và ngày sinh.',
        'Giữ lại biên nhận hoặc xác nhận đã nộp hồ sơ.',
        'Hỏi rõ khi nào có lịch khai giảng dự kiến.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Bước 5: Nhận lịch và bắt đầu học',
      id: 'buoc-5-bat-dau',
    },
    {
      type: 'paragraph',
      text: 'Sau khi hồ sơ được tiếp nhận, bạn sẽ nhận lịch học lý thuyết và lịch thực hành. Hãy lưu lại lịch vào điện thoại và chủ động xác nhận với người hướng dẫn trước mỗi buổi để tránh nhầm giờ hoặc nhầm sân.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Những nhầm lẫn hay gặp',
      id: 'nham-lan',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Nghĩ rằng nộp hồ sơ xong là học được ngay — thực tế còn phụ thuộc lịch khai giảng.',
        'Không hỏi rõ khoản phát sinh nên bị bất ngờ ở giữa khóa.',
        'Chọn khóa theo mức phí thấp nhất mà không xem số giờ thực hành đi kèm.',
        'Để hồ sơ dồn tới sát ngày khai giảng mới bổ sung.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Nếu bạn muốn được hướng dẫn từng bước và nhận danh sách giấy tờ được cập nhật đúng thời điểm, cứ nhắn cho tôi. Tôi sẽ đi cùng bạn từ khâu hồ sơ chứ không chỉ phần dạy lái.',
    },
  ],
};
