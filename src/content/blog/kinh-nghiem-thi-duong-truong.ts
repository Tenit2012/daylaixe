import type { BlogPost } from '@/types/content';

export const post: BlogPost = {
  slug: 'thi-duong-truong-nhung-loi-mat-diem-oan',
  title: 'Thi đường trường: những lỗi khiến bạn mất điểm oan',
  description:
    'Phần đường trường ngắn nhưng nhiều người chủ quan sau khi qua sa hình. Bài viết chỉ ra các lỗi hay gặp khi chuyển số, quan sát, giữ làn và xử lý hiệu lệnh.',
  publishedAt: '2026-08-11',
  updatedAt: '2026-08-11',
  author: 'Thầy dạy lái xe',
  category: 'Kỹ năng lái xe',
  readingTimeMinutes: 7,
  coverImage: {
    src: '/images/blog/thi-duong-truong.svg',
    alt: 'Hình minh họa phần thi thực hành lái xe trên đường trường',
    width: 1200,
    height: 630,
  },
  tags: ['đường trường', 'thi sát hạch', 'lỗi thường gặp', 'chuyển số'],
  relatedSlugs: [
    'ngay-thi-sat-hach-chuan-bi-va-trinh-tu',
    'nhung-loi-khien-bi-truat-quyen-sat-hach',
    'kinh-nghiem-lai-xe-duong-dong-tai-tphcm',
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Phần đường trường thường diễn ra sau sa hình và ngắn hơn nhiều. Chính vì ngắn và có vẻ dễ mà nó lấy đi điểm của khá nhiều học viên. Sau khi vượt qua phần khó, tâm lý buông lỏng rất tự nhiên — và đó là lúc những lỗi cơ bản nhất xuất hiện.',
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Trước khi đọc tiếp',
      text: 'Cách tổ chức phần đường trường, quãng đường và các hiệu lệnh cụ thể do quy định hiện hành và từng trung tâm sát hạch xác định. Bài viết nêu những lỗi tôi thấy học viên hay mắc, không thay thế cho hướng dẫn chính thức tại nơi bạn dự thi.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Lỗi khi xuất phát',
      id: 'loi-khi-xuat-phat',
    },
    {
      type: 'paragraph',
      text: 'Nhiều học viên vừa qua sa hình xong, tinh thần còn đang ở bài trước, nên lên xe là đi luôn. Trình tự trước khi xe lăn bánh vẫn phải nguyên vẹn: dây an toàn, ghế, gương, số, tín hiệu, quan sát. Không có ngoại lệ chỉ vì đây là phần dễ hơn.',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Quên bật tín hiệu khi rời vị trí đỗ.',
        'Không quan sát gương và điểm mù trước khi nhập làn.',
        'Nhả phanh tay chưa hết nên xe ì và máy gằn.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Lỗi khi chuyển số',
      id: 'loi-khi-chuyen-so',
    },
    {
      type: 'paragraph',
      text: 'Đây là nhóm lỗi đặc trưng của phần đường trường, vì sa hình gần như chỉ chạy số thấp. Khi được yêu cầu tăng số, học viên hay mắc mấy lỗi sau.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Tăng số khi tốc độ chưa đủ, làm xe gằn và giật. Hãy để xe đạt đà rồi mới chuyển.',
        'Nhìn xuống cần số trong lúc chuyển. Tay phải nhớ vị trí số, mắt phải ở trên đường.',
        'Giữ chân trên bàn đạp côn sau khi đã chuyển xong. Chân côn phải rời hẳn ra khi không dùng.',
        'Quên về số thấp khi giảm tốc, dẫn tới xe gằn hoặc chết máy khi dừng.',
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Cách tập cho quen',
      text: 'Trong các buổi tập, hãy yêu cầu giáo viên cho chạy một đoạn đủ dài để bạn tăng và giảm số vài lần liên tiếp. Chỉ tập trong sa hình thì bạn sẽ không có phản xạ này.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Lỗi giữ làn và giữ tốc độ',
      id: 'loi-giu-lan-toc-do',
    },
    {
      type: 'paragraph',
      text: 'Hai lỗi trái ngược nhưng đều bị trừ điểm: đi quá chậm gây cản trở, và đi nhanh hơn mức phù hợp với đoạn đường. Nguyên tắc an toàn là giữ tốc độ đều, không tăng giảm đột ngột, và luôn phù hợp với biển báo cùng điều kiện thực tế.',
    },
    {
      type: 'paragraph',
      text: 'Về giữ làn, lỗi hay gặp là xe trôi dần sang một bên vì học viên nhìn quá gần đầu xe. Hãy nhìn xa về phía trước; tay lái sẽ tự giữ xe thẳng theo hướng mắt nhìn. Đây là cùng một nguyên lý với bài đường vòng quanh co trong sa hình.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Lỗi khi nhận hiệu lệnh',
      id: 'loi-khi-nhan-hieu-lenh',
    },
    {
      type: 'paragraph',
      text: 'Học viên hay đoán trước hiệu lệnh vì đã nghe người thi trước kể lại. Đoán trước là cách nhanh nhất để làm sai, vì thứ tự và thời điểm có thể khác. Hãy nghe hết hiệu lệnh rồi mới thao tác.',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'Thao tác trước khi hiệu lệnh kết thúc.',
        'Thao tác vội mà bỏ qua bước quan sát và ra tín hiệu.',
        'Hỏi lại giữa chừng vì không nghe rõ nhưng đã kịp đánh lái.',
      ],
    },
    {
      type: 'heading',
      level: 2,
      text: 'Lỗi khi dừng xe kết thúc bài',
      id: 'loi-khi-dung-ket-thuc',
    },
    {
      type: 'paragraph',
      text: 'Kết thúc cũng phải đủ trình tự như lúc bắt đầu: ra tín hiệu, quan sát, tấp vào đúng vị trí, về số phù hợp, kéo phanh tay, rồi mới tắt máy và tháo dây an toàn. Nhiều người vì mừng đã xong nên tháo dây trước khi xe dừng hẳn.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Cách chuẩn bị riêng cho phần này',
      id: 'cach-chuan-bi-rieng',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Yêu cầu được chạy thử đúng cung đường thi nếu trung tâm cho phép.',
        'Tập chuyển số tăng và giảm trên đoạn đường dài, không chỉ tập trong sân.',
        'Tập nghe hiệu lệnh và thao tác chậm một nhịp, để bỏ thói quen đoán trước.',
        'Chạy liền mạch cả sa hình rồi tới đường trường trong một buổi, để quen với việc phải giữ tập trung sau khi phần khó đã qua.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Nếu bạn sắp thi và chưa từng chạy thử phần đường trường trong điều kiện gần giống thi thật, hãy nhắn cho tôi để sắp một buổi. Phần này không khó, nhưng nó phạt rất nặng sự chủ quan.',
    },
  ],
};
