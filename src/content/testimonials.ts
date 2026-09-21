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
 * chu se tu an, khong hien khung trong.
 *
 * Xem them docs/CONTENT_GUIDE.md
 * ============================================================================
 */

/** Nhan hien tren the va dung de doi chieu trong test. */
export const ILLUSTRATIVE_LABEL = 'Tình huống minh họa';

/**
 * Nhan cho muc CO ANH THAT nhung LOI NHAN XET CHUA duoc nguoi do duyet.
 *
 * Khac `ILLUSTRATIVE_LABEL`: o day nguoi trong anh la that va da dong y cho
 * dung anh, chi rieng cau chu la do doi ngu soan ho. Vi vay khong the deo
 * nhan "tinh huong minh hoa" (sai - nguoi that), cung khong the de tran
 * (sai - ho chua noi cau do).
 */
export const PENDING_APPROVAL_LABEL = 'Nội dung chờ học viên duyệt';

/**
 * Gia tri `period` cho muc da duoc chinh hoc vien duyet loi.
 *
 * KHONG phai thoi gian hoc that: khoa hoc cu the cua tung nguoi chua duoc
 * xac nhan, ma `period` chi hien thi khi the co `name` VA khong co anh (xem
 * `TestimonialCard`). Dat mot chuoi mo ta trung tinh o day de khong ai doc
 * luot roi tuong day la thang/nam co that.
 *
 * Khi biet khoa hoc that cua tung nguoi: thay bang chuoi rieng cho tung muc,
 * vi du 'Tháng 6/2026'.
 */
export const APPROVED_PERIOD_LABEL = 'Đã học tại Thầy Tùng';

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
 * ============================================================================
 * NAM MUC CO ANH HOC VIEN THAT - DOC KY TRUOC KHI SUA
 * ============================================================================
 * Khac hoan toan `testimonials` o tren: nguoi trong anh la NGUOI THAT.
 *
 * TRANG THAI HIEN TAI (20/09/2026):
 *   - ANH      : chu website xac nhan DA XIN PHEP dung tren website. OK.
 *   - LOI VIET : chu website xac nhan da gui dung cau chu duoi day cho tung
 *                nguoi doc va TAT CA dong y nguyen van (20/09/2026). OK -
 *                vi the khong con `quotePendingApproval`.
 *   - TEN      : dang VIET TAT theo dung mong muon cua cac ban (20/09/2026).
 *                Chu website cung cap ten day du, `name` o day la ban rut
 *                gon - KHONG doc tu bang ten tren ao trong anh.
 *
 * KHONG doi `name` thanh ho ten day du neu khong co xac nhan moi: cac ban
 * dong y hien ten RUT GON, khong phai ten day du. Test trong
 * `tests/unit/testimonials-display.test.tsx` chan viec do.
 *
 * CO Y: `sp-03` va `sp-05` HIEN CUNG mot ten 'Anh T.'. Day la lua chon cua
 * chu website (20/09/2026) sau khi da duoc neu ro rang hai the se trong nhu
 * cung mot nguoi viet hai cam nhan. Dung "sua" lai thanh hai ten khac nhau
 * neu khong co yeu cau moi.
 *
 * Nguoi nao khong muon dung nua thi XOA CA MUC va xoa file anh tuong ung
 * trong `public/images/students/`.
 *
 * Anh do `scripts/process-photos.mjs` sinh ra tu `assets/photos/`. Ten file
 * danh so, KHONG theo ten nguoi - doi ten that sau nay khong phai sua anh.
 * ============================================================================
 */
export const studentPhotoTestimonials: Testimonial[] = [
  {
    id: 'sp-05',
    situation: 'Học để tự tin ra đường',
    period: APPROVED_PERIOD_LABEL,
    quote:
      'Thầy gần gũi, chạy sai là chỉ luôn lỗi với cách sửa. Không chỉ tập cho qua bài thi mà còn nhắc nhiều tình huống gặp ngoài đường thật. Với người mới như mình thì học kiểu này dễ theo.',
    isPlaceholder: false,
    name: 'Anh T.',
    photo: {
      src: '/images/students/hoc-vien-05.webp',
      alt: 'Học viên ngồi ghế lái trong buổi thực hành tại trung tâm',
      width: 640,
      height: 640,
    },
  },
  {
    id: 'sp-01',
    situation: 'Chưa từng cầm vô-lăng',
    period: APPROVED_PERIOD_LABEL,
    quote:
      'Thú thật là buổi đầu mình hơi run vì chưa từng cầm vô-lăng. Thầy cho đi chậm trong sân trước, sai chỗ nào nói luôn chỗ đó chứ không để dồn tới cuối buổi. Học một thời gian thì đỡ căng hơn nhiều.',
    isPlaceholder: false,
    name: 'Anh K.',
    photo: {
      src: '/images/students/hoc-vien-01.webp',
      alt: 'Học viên ngồi ghế lái trong buổi thực hành tại trung tâm',
      width: 640,
      height: 640,
    },
  },
  {
    id: 'sp-02',
    situation: 'Cần luyện lại phần còn yếu',
    period: APPROVED_PERIOD_LABEL,
    quote:
      'Điều mình thấy dễ chịu là phần nào chưa chắc thì được tập lại, không bị hối. Thầy cũng không kiểu chạy cho đủ buổi rồi thôi mà chỉ tới lúc mình làm được mới qua bài khác.',
    isPlaceholder: false,
    name: 'Anh D.',
    photo: {
      src: '/images/students/hoc-vien-02.webp',
      alt: 'Học viên ngồi ghế lái trong buổi thực hành tại trung tâm',
      width: 640,
      height: 640,
    },
  },
  {
    id: 'sp-03',
    situation: 'Hay mất điểm khi căn xe',
    period: APPROVED_PERIOD_LABEL,
    quote:
      'Trước mình ngán nhất mấy bài phải căn xe, cứ vào là lệch. Thầy chỉ điểm căn cần nhìn, rồi giải thích vì sao xe bị lệch chứ không bắt học thuộc. Hiểu được lý do thì tự nhiên nhớ lâu hơn.',
    isPlaceholder: false,
    name: 'Anh T.',
    photo: {
      src: '/images/students/hoc-vien-03.webp',
      alt: 'Học viên ngồi ghế lái trong buổi thực hành tại trung tâm',
      width: 640,
      height: 640,
    },
  },
  {
    id: 'sp-04',
    situation: 'Sắp xếp lịch quanh giờ làm',
    period: APPROVED_PERIOD_LABEL,
    quote:
      'Mình đi làm nên giờ giấc không cố định được. Trao đổi trước với thầy thì sắp xếp được buổi phù hợp. Trong lúc học có gì chưa hiểu cứ hỏi, thầy giải thích lại chứ không ngại nói đi nói lại.',
    isPlaceholder: false,
    name: 'Anh Q.',
    photo: {
      src: '/images/students/hoc-vien-04.webp',
      alt: 'Học viên ngồi ghế lái trong buổi thực hành tại trung tâm',
      width: 640,
      height: 640,
    },
  }
];

/** Con muc nao dang cho nguoi trong anh duyet loi khong. */
export function hasPendingApprovalQuotes(): boolean {
  return studentPhotoTestimonials.some((item) => item.quotePendingApproval);
}

/**
 * Canh bao dat ngay dau khoi anh hoc vien.
 *
 * CHI hien khi con muc `quotePendingApproval` - xem `StudentPhotosSection`.
 * Khi tat ca da duyet thi khoi khong hien doan nao ca (20/09/2026).
 *
 * Noi ro TUNG phan nao da duoc phep, phan nao chua - khong gop chung thanh
 * mot cau mo ho. Nguoi doc phai biet chinh xac ho dang nhin cai gi.
 */
export const studentPhotoDisclosure =
  'Lưu ý: Ảnh dưới đây là học viên thật, đã được đồng ý cho sử dụng trên website. Phần lời viết kèm theo do chúng tôi soạn và đang chờ chính học viên trong ảnh xác nhận, nên chưa phải nguyên văn lời của họ.';

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
