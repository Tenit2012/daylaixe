import type { Testimonial } from '@/types/content';

/**
 * ============================================================================
 * QUAN TRONG VE DAO DUC NOI DUNG
 * ============================================================================
 * Toan bo muc duoi day co `isPlaceholder: true`, nghia la NOI DUNG MAU do
 * doi ngu bien tap viet ra de minh hoa bo cuc giao dien. Day KHONG phai
 * phan hoi cua hoc vien that va giao dien khong duoc trinh bay chung nhu
 * du lieu that.
 *
 * Khi co phan hoi that:
 *  1. Xin phep hoc vien truoc khi dang.
 *  2. Dat `isPlaceholder: false`.
 *  3. Khong sua loi van cua hoc vien theo huong phong dai.
 * Xem them docs/CONTENT_GUIDE.md
 */
export const testimonials: Testimonial[] = [
  {
    id: 'tm-01',
    name: 'Học viên khóa số tự động',
    courseSlug: 'hang-b-so-tu-dong',
    period: 'Nội dung mẫu',
    quote:
      'Buổi đầu mình khá run vì chưa từng ngồi ghế lái. Thầy cho tập chậm trong sân đến khi quen chân ga chân phanh rồi mới ra đường. Cách hướng dẫn dễ hiểu, không hối thúc nên mình bớt căng thẳng hẳn.',
    isPlaceholder: true,
    avatarInitial: 'A',
  },
  {
    id: 'tm-02',
    name: 'Học viên khóa số sàn',
    courseSlug: 'hang-b-so-san',
    period: 'Nội dung mẫu',
    quote:
      'Mình hay chết máy ở bài lên dốc. Thầy chỉ lại từng bước, giải thích rõ lúc nào nhả côn lúc nào mớm ga chứ không chỉ nói làm theo. Tập vài buổi là thấy chắc tay hơn nhiều.',
    isPlaceholder: true,
    avatarInitial: 'B',
  },
  {
    id: 'tm-03',
    name: 'Học viên khóa bổ túc',
    courseSlug: 'bo-tuc-tay-lai',
    period: 'Nội dung mẫu',
    quote:
      'Có bằng ba năm rồi mà mình chưa dám tự chạy. Thầy chạy cùng đúng tuyến đường đi làm của mình, chỉ cách canh làn và vào hầm chung cư. Giờ mình tự chạy đi làm được rồi.',
    isPlaceholder: true,
    avatarInitial: 'C',
  },
  {
    id: 'tm-04',
    name: 'Học viên luyện sa hình',
    courseSlug: 'luyen-sa-hinh',
    period: 'Nội dung mẫu',
    quote:
      'Mình trượt bài ghép ngang một lần nên khá nản. Thầy phân tích đúng chỗ mình sai và cho chạy lại đến khi thành phản xạ. Quan trọng là thầy nói thẳng chỗ nào chưa được chứ không khen cho qua chuyện.',
    isPlaceholder: true,
    avatarInitial: 'D',
  },
  {
    id: 'tm-05',
    name: 'Học viên khóa C1',
    courseSlug: 'hang-c1',
    period: 'Nội dung mẫu',
    quote:
      'Mình cần bằng để chạy xe tải nhẹ giao hàng. Thầy giải thích rõ khác biệt khi canh đường với xe dài và cho tập lùi nhiều lần. Hồ sơ cũng được hướng dẫn chuẩn bị từng bước.',
    isPlaceholder: true,
    avatarInitial: 'E',
  },
  {
    id: 'tm-06',
    name: 'Học viên đi làm bận rộn',
    courseSlug: 'hang-b-so-tu-dong',
    period: 'Nội dung mẫu',
    quote:
      'Mình chỉ rảnh cuối tuần và buổi tối. Thầy chủ động trao đổi lịch từ đầu tuần nên mình sắp xếp được, không bị dồn buổi hay phải nghỉ làm.',
    isPlaceholder: true,
    avatarInitial: 'F',
  },
];

/** Loc cam nhan theo khoa hoc. `all` tra ve toan bo. */
export function getTestimonialsByCourse(courseSlug: string): Testimonial[] {
  if (courseSlug === 'all') return testimonials;
  return testimonials.filter((item) => item.courseSlug === courseSlug);
}

/** Chi lay cam nhan that (da duoc xac nhan) - dung khi can du lieu that. */
export function getRealTestimonials(): Testimonial[] {
  return testimonials.filter((item) => !item.isPlaceholder);
}

/**
 * Video cam nhan.
 * De trong cho den khi co video that duoc hoc vien dong y chia se.
 * Xem danh sach can cung cap trong docs/REQUIRED_ASSETS.md
 */
export const testimonialVideos: Array<{
  id: string;
  title: string;
  description: string;
  posterImage: string;
  videoUrl: string | null;
}> = [
  {
    id: 'video-01',
    title: 'Chia sẻ của học viên khóa số tự động',
    description:
      'Vị trí dành cho video cảm nhận thật. Video sẽ được đăng sau khi học viên đồng ý chia sẻ.',
    posterImage: '/images/gallery/video-placeholder.svg',
    videoUrl: null,
  },
  {
    id: 'video-02',
    title: 'Chia sẻ của học viên khóa bổ túc',
    description:
      'Vị trí dành cho video cảm nhận thật. Video sẽ được đăng sau khi học viên đồng ý chia sẻ.',
    posterImage: '/images/gallery/video-placeholder.svg',
    videoUrl: null,
  },
];
