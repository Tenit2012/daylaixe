import type { Testimonial } from '@/types/content';

/**
 * ============================================================================
 * QUAN TRONG VE DAO DUC NOI DUNG - DOC TRUOC KHI SUA
 * ============================================================================
 * Toan bo muc duoi day co `isPlaceholder: true`: day la TINH HUONG MINH HOA
 * dung tren cac tinh huong hoc lai xe thuong gap, KHONG phai phan hoi cua
 * mot hoc vien co that.
 *
 * Giao dien tu dong bao ve dieu do: moi the deo nhan "Tinh huong minh hoa"
 * va dau khoi co mot doan noi ro. Nhan nay hien CA O PRODUCTION.
 *
 * CACH THAY BANG CAM NHAN THAT:
 *   1. Xin phep hoc vien truoc khi dang - bat buoc, ke ca khi chi dung ten
 *      viet tat.
 *   2. Chep dung loi ho noi. KHONG sua theo huong phong dai, khong ghep loi
 *      cua nhieu nguoi thanh mot.
 *   3. Dat `name` (va `avatarInitial` neu muon co avatar), doi `isPlaceholder:
 *      false` va dat `period` thanh thoi gian hoc that (vi du 'Tháng 6/2026')
 *      -> nhan tu bien mat, ten va thoi gian hien ra thay cho nhan tinh huong.
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
export const ILLUSTRATIVE_LABEL = 'Tình huống minh họa';

export const testimonials: Testimonial[] = [
  {
    id: 'tm-01',
    situation: 'Người mới bắt đầu',
    period: ILLUSTRATIVE_LABEL,
    quote:
      'Trước giờ mình chưa từng lái xe nên lúc mới học cũng hơi run. Thầy cho làm quen từng bước, từ cách chỉnh ghế, vô-lăng rồi mới bắt đầu chạy. Tập vài buổi thấy tự tin hơn hẳn.',
    isPlaceholder: true,
  },
  {
    id: 'tm-02',
    situation: 'Luyện sa hình',
    period: ILLUSTRATIVE_LABEL,
    quote:
      'Mình tưởng phần sa hình khó lắm, nhất là mấy đoạn phải canh xe. Thầy chỉ cho từng mốc cần nhìn và cho chạy lại nhiều lần nên dần dần mình nhớ được cách xử lý.',
    isPlaceholder: true,
  },
  {
    id: 'tm-03',
    situation: 'Bổ túc tay lái',
    period: ILLUSTRATIVE_LABEL,
    quote:
      'Mình có bằng rồi nhưng bỏ xe khá lâu nên lúc ngồi lại cũng không tự tin lắm. Học lại một thời gian thấy tay lái ổn hơn, nhất là mấy tình huống trong đường đông.',
    isPlaceholder: true,
  },
  {
    id: 'tm-04',
    situation: 'Người đi làm',
    period: ILLUSTRATIVE_LABEL,
    quote:
      'Mình đi làm cả ngày nên ban đầu cũng lo không sắp xếp được lịch học. Trao đổi trước với thầy thì hai bên thống nhất được thời gian phù hợp, đỡ phải nghỉ làm nhiều.',
    isPlaceholder: true,
  },
  {
    id: 'tm-05',
    situation: 'Hạng B số tự động',
    period: ILLUSTRATIVE_LABEL,
    quote:
      'Mình chọn học số tự động vì chủ yếu cần xe để đi làm và đi lại hằng ngày. Thầy hướng dẫn khá kỹ phần quan sát và xử lý tình huống chứ không chỉ tập cho biết chạy xe.',
    isPlaceholder: true,
  },
  {
    id: 'tm-06',
    situation: 'Hạng B số sàn',
    period: ILLUSTRATIVE_LABEL,
    quote:
      'Phần mình ngại nhất là côn với số, mấy buổi đầu xe hay tắt máy. Thầy cho tập riêng từng thao tác rồi kết hợp lại, tập nhiều nên sau đó đỡ bị cuống hơn.',
    isPlaceholder: true,
  },
  {
    id: 'tm-07',
    situation: 'Thực hành đường phố',
    period: ILLUSTRATIVE_LABEL,
    quote:
      'Mình chạy trong sân thì còn ổn chứ ra đường đông là khá căng. Thầy cho tập những đoạn đường phù hợp trước rồi mới tăng dần, chủ yếu nhắc mình quan sát và xử lý bình tĩnh.',
    isPlaceholder: true,
  },
  {
    id: 'tm-08',
    situation: 'Học để phục vụ công việc',
    period: ILLUSTRATIVE_LABEL,
    quote:
      'Mình học bằng lái chủ yếu để phục vụ công việc nên quan trọng nhất là sau này phải tự tin lái được. Thầy có hướng dẫn thêm những tình huống thực tế chứ không chỉ tập đúng bài thi.',
    isPlaceholder: true,
  },
  {
    id: 'tm-09',
    situation: 'Học bài bản',
    period: ILLUSTRATIVE_LABEL,
    quote:
      'Mình không đặt nặng chuyện học thật nhanh, chủ yếu muốn hiểu cách lái và xử lý cho đúng. Thầy thường để mình tự làm rồi mới sửa những chỗ chưa ổn nên cũng dễ nhớ hơn.',
    isPlaceholder: true,
  },
  {
    id: 'tm-10',
    situation: 'Ôn thi sát hạch',
    period: ILLUSTRATIVE_LABEL,
    quote:
      'Gần tới ngày thi mình khá áp lực vì sợ vào bài lại quên thao tác. Thầy cho ôn lại từng bài, nhất là những chỗ mình hay mắc lỗi. Nhờ vậy lúc vào sân mình bình tĩnh hơn.',
    isPlaceholder: true,
  },
];

/**
 * Doan giai thich dat ngay dau khoi cam nhan.
 *
 * Viet o dang mo ta ro noi dung NAY LA GI (tinh huong minh hoa) chu khong chi
 * phu dinh "khong phai that" - nguoi doc hieu nhanh hon va it thay bi lap lo.
 */
export const testimonialsDisclosure =
  'Lưu ý: Các nội dung dưới đây là tình huống minh họa dựa trên những băn khoăn thường gặp khi học lái xe, không phải lời nhận xét của một học viên cụ thể. Khi có phản hồi thực tế được học viên đồng ý chia sẻ, nội dung sẽ được cập nhật thay thế.';

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
