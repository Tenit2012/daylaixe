import type { Testimonial } from '@/types/content';

/**
 * ============================================================================
 * QUAN TRONG VE DAO DUC NOI DUNG - DOC TRUOC KHI SUA
 * ============================================================================
 * Toan bo muc duoi day co `isPlaceholder: true`: day la TRAI NGHIEM MINH HOA
 * dung tren cac tinh huong hoc lai xe thuong gap, KHONG phai phan hoi cua
 * mot hoc vien co that.
 *
 * Giao dien tu dong bao ve dieu do: moi the deo nhan "Minh hoa trai nghiem"
 * va dau khoi co mot doan noi ro. Nhan nay hien CA O PRODUCTION.
 *
 * CACH THAY BANG CAM NHAN THAT:
 *   1. Xin phep hoc vien truoc khi dang - bat buoc, ke ca khi chi dung ten
 *      viet tat.
 *   2. Chep dung loi ho noi. KHONG sua theo huong phong dai, khong ghep loi
 *      cua nhieu nguoi thanh mot.
 *   3. Doi `isPlaceholder: false` va dat `period` thanh thoi gian hoc that
 *      (vi du 'Tháng 6/2026') -> nhan tu bien mat, dong thoi gian hien ra.
 *   4. Xoa cac muc minh hoa con lai. Khong de lan lon that/minh hoa trong
 *      cung mot danh sach.
 *
 * Muon TAT hoan toan khoi cam nhan: de mang nay rong `[]`. Khoi tren trang
 * chu va luoi tren /cam-nhan-hoc-vien se tu an, khong hien khung trong.
 *
 * Xem them docs/CONTENT_GUIDE.md
 * ============================================================================
 */

/** Nhan hien tren the va dung de doi chieu trong test. */
export const ILLUSTRATIVE_LABEL = 'Minh họa trải nghiệm';

export const testimonials: Testimonial[] = [
  {
    id: 'tm-01',
    name: 'Người mới bắt đầu học lái',
    courseSlug: 'hang-b-so-tu-dong',
    period: ILLUSTRATIVE_LABEL,
    quote:
      'Lúc đầu mình khá run vì chưa từng cầm vô lăng. Thầy không cho ra đường ngay mà hướng dẫn làm quen xe, tập chân ga – chân phanh và cách quan sát trước. Sau vài buổi mình thấy tự tin hơn rất nhiều, đặc biệt là khi xử lý những tình huống cơ bản.',
    isPlaceholder: true,
    avatarInitial: 'A',
  },
  {
    id: 'tm-02',
    name: 'Học số sàn từ đầu',
    courseSlug: 'hang-b-so-san',
    period: ILLUSTRATIVE_LABEL,
    quote:
      'Phần khó nhất với mình là lên dốc và nhả côn. Thầy giải thích rất kỹ từng bước, cho tập lại nhiều lần và sửa đúng lỗi mình đang gặp. Mình thích cách dạy có giải thích lý do chứ không chỉ bảo làm theo.',
    isPlaceholder: true,
    avatarInitial: 'B',
  },
  {
    id: 'tm-03',
    name: 'Bổ túc tay lái',
    courseSlug: 'bo-tuc-tay-lai',
    period: ILLUSTRATIVE_LABEL,
    quote:
      'Mình đã có bằng nhưng lâu không lái nên khá ngại. Thầy cho chạy đúng những tuyến đường mình thường đi, hướng dẫn cách canh khoảng cách, quay đầu và vào hầm gửi xe. Sau khóa bổ túc mình đã tự lái đi làm hằng ngày.',
    isPlaceholder: true,
    avatarInitial: 'C',
  },
  {
    id: 'tm-04',
    name: 'Luyện sa hình',
    courseSlug: 'luyen-sa-hinh',
    period: ILLUSTRATIVE_LABEL,
    quote:
      'Mình từng làm sai bài ghép ngang nên rất mất tự tin. Thầy chỉ ra đúng chỗ sai, hướng dẫn cách canh điểm và cho tập đến khi làm được ổn định. Điều mình thích là thầy nói thẳng nhưng rất dễ hiểu.',
    isPlaceholder: true,
    avatarInitial: 'D',
  },
  {
    id: 'tm-05',
    name: 'Học C1 phục vụ công việc',
    courseSlug: 'hang-c1',
    period: ILLUSTRATIVE_LABEL,
    quote:
      'Mình cần học C1 để phục vụ công việc nên khá quan tâm phần thực hành. Thầy hướng dẫn kỹ cách điều khiển xe dài, lùi xe và xử lý trong không gian hẹp. Hồ sơ và lịch học cũng được hướng dẫn rõ ràng nên mình không bị lúng túng.',
    isPlaceholder: true,
    avatarInitial: 'E',
  },
  {
    id: 'tm-06',
    name: 'Người đi làm bận rộn',
    courseSlug: 'hang-b-so-tu-dong',
    period: ILLUSTRATIVE_LABEL,
    quote:
      'Mình chỉ rảnh buổi tối và cuối tuần. Thầy sắp xếp lịch khá linh hoạt nên mình vẫn theo được khóa học mà không phải nghỉ làm nhiều. Mỗi buổi học đều có mục tiêu rõ ràng nên cảm giác tiến bộ khá nhanh.',
    isPlaceholder: true,
    avatarInitial: 'F',
  },
];

/**
 * Doan giai thich dat ngay dau khoi cam nhan.
 *
 * Viet o dang mo ta ro noi dung NAY LA GI (tinh huong minh hoa) chu khong chi
 * phu dinh "khong phai that" - nguoi doc hieu nhanh hon va it thay bi lap lo.
 */
export const testimonialsDisclosure =
  'Những chia sẻ dưới đây là trải nghiệm minh họa dựa trên các tình huống học lái xe thường gặp. Mục đích là giúp anh/chị hình dung quá trình học và phương pháp hướng dẫn. Khi có phản hồi thực tế từ học viên được đồng ý chia sẻ, chúng tôi sẽ cập nhật thay thế các nội dung minh họa này.';

/**
 * Nhung dieu nguoi hoc thuong quan tam, dat cuoi trang cam nhan.
 *
 * Day la mong muon chung cua nguoi di hoc, KHONG phai loi hua ve dich vu -
 * giu nguyen giong mo ta de khong bien thanh cam ket khong kiem chung duoc.
 */
export const commonConcerns = [
  'Học đúng tại trung tâm.',
  'Được hướng dẫn trực tiếp.',
  'Lịch học rõ ràng.',
  'Không bị thúc ép.',
  'Có người sửa lỗi cụ thể trong quá trình thực hành.',
];

/** Loc cam nhan theo khoa hoc. `all` tra ve toan bo. */
export function getTestimonialsByCourse(courseSlug: string): Testimonial[] {
  if (courseSlug === 'all') return testimonials;
  return testimonials.filter((item) => item.courseSlug === courseSlug);
}

/** Chi lay cam nhan THAT (da xin phep hoc vien). */
export function getRealTestimonials(): Testimonial[] {
  return testimonials.filter((item) => !item.isPlaceholder);
}

/**
 * Con muc nao la noi dung minh hoa khong.
 *
 * Giao dien dung ham nay de quyet dinh co hien doan giai thich hay khong.
 * Khi tat ca deu la cam nhan that, doan do tu bien mat.
 */
export function hasPlaceholderTestimonials(): boolean {
  return testimonials.some((item) => item.isPlaceholder);
}
