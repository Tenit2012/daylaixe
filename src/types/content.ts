/** Kieu du lieu chung cho toan bo content layer. */

export interface Course {
  slug: string;
  /** Ten hien thi day du, vi du: "Hạng B - số tự động". */
  name: string;
  /** Ten ngan dung trong dropdown cua form dang ky. */
  shortName: string;
  /** Ma hang GPLX (B, C1...) hoac 'BO_TUC' / 'SA_HINH' cho khoa ky nang. */
  licenseClass: string;
  /** Mo ta ngan 1-2 cau, dung cho card va meta description. */
  summary: string;
  /** Mo ta dai hon cho trang chi tiet. */
  description: string;
  /** Khoa hoc phu hop voi ai. */
  suitableFor: string[];
  /** Loai xe su dung khi hoc thuc hanh. */
  vehicleType: string;
  /** Thoi gian du kien, vi du "khoảng 3 tháng". */
  estimatedDuration: string;
  /** Cac phan noi dung se duoc hoc. */
  curriculum: Array<{ title: string; details: string }>;
  /** Ho so can chuan bi. */
  requiredDocuments: string[];
  /**
   * Hoc phi. `null` nghia la CHUA cau hinh -> UI hien thi cau moi lien he.
   * Khong bao gio dien so uoc chung o day.
   */
  tuition: CourseTuition | null;
  /** Cau hoi thuong gap rieng cua khoa nay. */
  faqs: Faq[];
  /** Diem noi bat hien thi tren card. */
  highlights: string[];
  /** Anh minh hoa (SVG placeholder trong /public/images). */
  image: ImageAsset;
  /** Hien thi noi bat tren trang chu. */
  featured: boolean;
  /** Thu tu sap xep (nho hon hien truoc). */
  order: number;
}

export interface CourseTuition {
  /** Chuoi hien thi, vi du "12.000.000 đ". De trong neu chua chot. */
  displayValue: string;
  /** Cac khoan da bao gom trong hoc phi. */
  included: string[];
  /** Cac khoan co the phat sinh them. */
  mayIncurAdditional: string[];
  /** Ghi chu them ve hoc phi. */
  note?: string;
}

export interface Faq {
  question: string;
  answer: string;
  /** Nhom cau hoi, dung de loc tren trang FAQ. */
  category?: string;
}

/**
 * CAM NHAN HOC VIEN
 *
 * LICH SU: khoi nay tung bi go khoi website ngay 13/08/2026 vi toan bo cam
 * nhan deu la noi dung mau. Duoc dung lai ngay 14/08/2026 theo yeu cau cua
 * chu website, voi dieu kien nhan "Noi dung mau" hien CA O PRODUCTION chu
 * khong chi o dev nhu ban truoc.
 *
 * QUY TAC BAT BUOC khi dong vao du lieu nay:
 *   1. `isPlaceholder: true`  -> giao dien TU DONG hien nhan "Noi dung mau"
 *      tren tung the va mot dong thong bao dau khoi. Khong duoc go nhan de
 *      cho no trong giong phan hoi that.
 *   2. `isPlaceholder: false` -> CHI dat khi do la loi that cua hoc vien
 *      that VA da xin phep ho. Luc do nhan tu bien mat.
 *   3. KHONG dua cam nhan vao JSON-LD dang `review`/`aggregateRating` tru khi
 *      kiem chung duoc - Google phat nang du lieu co cau truc gia.
 *
 * LUU Y NEU CHAY GOOGLE ADS: cam nhan mau, du co nhan, van la rui ro ve
 * chinh sach trinh bay sai su that. Nen thay bang cam nhan that truoc khi
 * bat quang cao. Xem them docs/CONTENT_GUIDE.md
 */
export interface Testimonial {
  id: string;
  /** Ten hien thi. Voi noi dung mau: dung ten chung chung. */
  name: string;
  /** Khoa hoc lien quan - dung slug cua Course de loc duoc. */
  courseSlug: string;
  /** Nam/thang hoc, dang chuoi tu do. */
  period: string;
  quote: string;
  /**
   * BAT BUOC. `true` nghia la noi dung mau do doi ngu viet de minh hoa
   * bo cuc, KHONG phai phan hoi cua hoc vien that.
   */
  isPlaceholder: boolean;
  /** Anh dai dien - dung avatar chu cai khi khong co anh that. */
  avatarInitial: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: GalleryCategory;
  image: ImageAsset;
  isPlaceholder: boolean;
}

export type GalleryCategory =
  | 'xe-tap-lai'
  | 'cabin-mo-phong'
  | 'san-tap'
  | 'sa-hinh'
  | 'duong-truong'
  | 'ly-thuyet'
  | 'huong-dan';

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** Video tu luu tren chinh website (khong nhung tu YouTube). */
export interface VideoAsset {
  id: string;
  title: string;
  description: string;
  /** Duong dan file MP4 trong /public. */
  src: string;
  /**
   * Anh hien truoc khi bam play. BAT BUOC: the <video> dung `preload="none"`
   * nen khong co poster thi nguoi dung chi thay mot o den.
   */
  poster: ImageAsset;
  /** Do dai tinh bang giay - hien cho nguoi dung biet truoc khi bam. */
  durationSeconds: number;
}

export interface LearningStep {
  order: number;
  title: string;
  description: string;
  /** Ten icon cua lucide-react (map trong component). */
  icon: string;
  /** Thoi luong uoc tinh cua buoc nay. */
  duration?: string;
}

export type BlockContent =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string; id: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | {
      type: 'callout';
      tone: 'info' | 'warning' | 'tip';
      title: string;
      text: string;
    }
  | { type: 'quote'; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: BlogCategory;
  /** Thoi gian doc uoc tinh, tinh bang phut. */
  readingTimeMinutes: number;
  coverImage: ImageAsset;
  /** Tu khoa phu tro SEO - viet tu nhien, khong nhoi nhet. */
  tags: string[];
  content: BlockContent[];
  /** Slug cac bai viet lien quan. */
  relatedSlugs: string[];
}

export type BlogCategory =
  | 'Kinh nghiệm học lái'
  | 'Chuẩn bị hồ sơ'
  | 'Kỹ năng lái xe'
  | 'Tâm lý khi lái xe';
