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
 * nhan deu la noi dung minh hoa. Duoc dung lai ngay 14/08/2026 theo yeu cau
 * chu website, voi dieu kien nhan "Minh hoa trai nghiem" hien CA O PRODUCTION chu
 * khong chi o dev nhu ban truoc.
 *
 * QUY TAC BAT BUOC khi dong vao du lieu nay:
 *   1. `isPlaceholder: true`  -> giao dien TU DONG hien nhan minh hoa
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
  /**
   * Nhan phan loai tinh huong/doi tuong - dung de hien thi tren the va de loc.
   * Chuoi tu do, KHONG bat buoc khop ten khoa hoc that (vi du 'Nguoi moi bat
   * dau', 'Nguoi di lam' khong phai san pham khoa hoc nao ca).
   */
  situation: string;
  /** Nam/thang hoc, dang chuoi tu do. Chi co y nghia khi la cam nhan THAT. */
  period: string;
  quote: string;
  /**
   * BAT BUOC. `true` nghia la trai nghiem minh hoa do doi ngu viet de mo ta
   * bo cuc, KHONG phai phan hoi cua hoc vien that.
   */
  isPlaceholder: boolean;
  /**
   * Ten hoc vien - CHI dien khi day la cam nhan THAT da duoc hoc vien dong y.
   * Bo trong (undefined) voi noi dung minh hoa - khong dat ten nguoi cho tinh
   * huong hu cau.
   */
  name?: string;
  /** Anh dai dien chu cai - chi dung kem `name`, cho cam nhan that. */
  avatarInitial?: string;
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
  | 'huong-dan'
  | 'co-so';

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
  | { type: 'quote'; text: string }
  | {
      /**
       * Anh hoac so do minh hoa chen giua noi dung bai viet - vi du so do
       * duong di cua xe trong mot bai sa hinh cu the. Khac voi `coverImage`
       * cua ca bai (chi mot anh dau trang), block nay dat duoc o BAT KY vi
       * tri nao trong `content` de minh hoa dung doan dang noi toi.
       */
      type: 'image';
      src: string;
      alt: string;
      width: number;
      height: number;
      /** Chu thich hien duoi anh - vi du ghi ro day la so do minh hoa. */
      caption?: string;
    };

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
