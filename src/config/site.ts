import { publicEnv } from '@/lib/env/public';

/**
 * ============================================================================
 * NGUON SU THAT DUY NHAT cho moi thong tin co the thay doi cua website.
 * ============================================================================
 *
 * Cach doi thong tin thay giao, so dien thoai, Zalo...:
 *   1. Uu tien: sua file `.env` (cac bien NEXT_PUBLIC_*) roi restart dev server.
 *   2. Hoac sua truc tiep gia tri mac dinh trong file nay.
 *
 * KHONG rai placeholder `[Tên thầy]`, `[Số điện thoại]`... vao component.
 * Moi component phai doc tu `siteConfig`.
 */

/** Kiem tra mot gia tri co con la placeholder chua duoc thay hay khong. */
export function isPlaceholderValue(value: string): boolean {
  return /^\[.*\]$/.test(value.trim());
}

const teacherName = publicEnv.NEXT_PUBLIC_TEACHER_NAME;
const phoneNumber = publicEnv.NEXT_PUBLIC_PHONE_NUMBER;
const experienceLabel = publicEnv.NEXT_PUBLIC_EXPERIENCE_LABEL;
const studentGroups = publicEnv.NEXT_PUBLIC_STUDENT_GROUPS;

/**
 * Tu khoa SEO. Khai bao rieng (kieu `string[]` co the thay doi) vi
 * Metadata cua Next.js khong nhan mang readonly.
 */
const seoKeywords: string[] = [
  'học lái xe TP.HCM',
  'học lái xe Thủ Đức',
  'học bằng lái xe hạng B',
  'học lái xe số tự động',
  'học lái xe số sàn',
  'bổ túc tay lái',
  'luyện sa hình',
  'học lái xe cuối tuần',
];

export const siteConfig = {
  /** Ten thuong hieu ca nhan hien thi tren header/footer. */
  brandName: isPlaceholderValue(teacherName)
    ? 'Thầy dạy lái xe'
    : `Thầy ${teacherName}`,
  shortBrandName: 'Học lái xe cùng thầy',

  teacher: {
    name: teacherName,
    /** Chuc danh - vi du: "Giáo viên dạy thực hành lái xe". */
    title: publicEnv.NEXT_PUBLIC_TEACHER_TITLE,
    /**
     * DU LIEU THAT DA XAC NHAN.
     * Luu dang NHAN CHU ("Gần 20 năm"), khong luu so nguyen, de khong bien
     * mot con so uoc luong thanh con so tuyet doi ("20 năm").
     */
    experienceLabel: publicEnv.NEXT_PUBLIC_EXPERIENCE_LABEL,
    /**
     * DU LIEU THAT DA XAC NHAN: thay da truc tiep huong dan ca hai nhom.
     * Neu trung tam dung ten goi chinh thuc khac, chi can sua bien moi truong
     * NEXT_PUBLIC_STUDENT_GROUPS / _SHORT, khong phai sua component nao.
     */
    studentGroups: publicEnv.NEXT_PUBLIC_STUDENT_GROUPS,
    studentGroupsShort: publicEnv.NEXT_PUBLIC_STUDENT_GROUPS_SHORT,
    /** Ten trung tam noi thay dang giang day / ho tro tuyen sinh. */
    centerName: publicEnv.NEXT_PUBLIC_CENTER_NAME,
  },

  /**
   * Cac cau van ve kinh nghiem, soan san tai day de component chi viec
   * hien thi, khong tu ghep chuoi. Doi cach dien dat chi sua o mot cho.
   *
   * NGUYEN TAC: chi dien dat lai dung du lieu da duoc xac nhan. KHONG them
   * so hoc vien, ty le thi dau, thanh tich, chuc vu, cap bac hay danh hieu.
   */
  experience: {
    /** Dung cho badge/nhan ngan. */
    short: `${experienceLabel} kinh nghiệm giảng dạy lái xe tại trung tâm`,
    /** Nhan cuc ngan cho o thong tin dang danh sach. */
    compact: `${experienceLabel} kinh nghiệm giảng dạy`,
    /** Nhan mac dinh khi muon nhac ca hai nhom hoc vien. */
    withAudience: `${experienceLabel} kinh nghiệm hướng dẫn ${studentGroups}`,
    /** Dong hien thi trong trust indicator o hero. */
    audienceShort: `Dạy cả ${publicEnv.NEXT_PUBLIC_STUDENT_GROUPS_SHORT}`,
    /** Doan gioi thieu day du - dung o trang /gioi-thieu. */
    biography: `Với ${experienceLabel.toLowerCase()} kinh nghiệm giảng dạy tại trung tâm, ${
      isPlaceholderValue(teacherName) ? 'thầy' : `Thầy ${teacherName}`
    } đã trực tiếp hướng dẫn nhiều thế hệ học viên, từ học viên dân sự đến học viên thuộc lực lượng Công an. Kinh nghiệm thực tế lâu năm giúp thầy hiểu những khó khăn thường gặp của người mới học lái và có phương pháp hướng dẫn rõ ràng, dễ tiếp thu, chú trọng kỹ năng lái xe an toàn.`,
  },

  contact: {
    phone: phoneNumber,
    zaloUrl: publicEnv.NEXT_PUBLIC_ZALO_URL,
    email: publicEnv.NEXT_PUBLIC_CONTACT_EMAIL,
    facebookUrl: publicEnv.NEXT_PUBLIC_FACEBOOK_URL,
    youtubeUrl: publicEnv.NEXT_PUBLIC_YOUTUBE_URL,
    address: publicEnv.NEXT_PUBLIC_ADDRESS,
    trainingArea: publicEnv.NEXT_PUBLIC_TRAINING_AREA,
    googleMapsUrl: publicEnv.NEXT_PUBLIC_GOOGLE_MAPS_URL,
    /** Vi du: "7:00 - 20:00 hằng ngày". */
    hours: publicEnv.NEXT_PUBLIC_CONTACT_HOURS,
  },

  url: publicEnv.NEXT_PUBLIC_SITE_URL.replace(/\/$/, ''),

  seo: {
    defaultTitle: isPlaceholderValue(teacherName)
      ? 'Học lái xe cùng thầy tại TP.HCM'
      : `Học lái xe cùng thầy ${teacherName} tại TP.HCM`,
    titleTemplate: isPlaceholderValue(teacherName)
      ? '%s | Học lái xe cùng thầy'
      : `%s | Thầy ${teacherName}`,
    defaultDescription:
      'Tư vấn học lái xe hạng B, C1 và bổ túc tay lái. Hướng dẫn tận tình, lịch học linh hoạt và minh bạch thông tin từ đăng ký đến ngày thi.',
    /** Dung cho og:locale va thuoc tinh lang cua the <html>. */
    locale: 'vi_VN',
    lang: 'vi',
    ogImage: '/images/og/og-default.svg',
    keywords: seoKeywords,
  },

  messaging: {
    primary: isPlaceholderValue(teacherName)
      ? 'Học lái xe cùng thầy — tận tình từ buổi đầu đến ngày thi sát hạch.'
      : `Học lái xe cùng thầy ${teacherName} — tận tình từ buổi đầu đến ngày thi sát hạch.`,
    secondary:
      'Tư vấn khóa học phù hợp, hỗ trợ hồ sơ, lịch học linh hoạt và hướng dẫn thực hành dễ hiểu cho người mới.',
    philosophy:
      'Tôi không chỉ hướng dẫn học viên vượt qua kỳ thi, mà còn mong mỗi học viên đủ bình tĩnh và tự tin để lái xe an toàn sau khi nhận bằng.',
    feeNotConfigured:
      'Vui lòng liên hệ để nhận thông tin học phí và lịch khai giảng được cập nhật tại thời điểm đăng ký.',
  },

  /**
   * Disclaimer BAT BUOC hien thi o footer va cac trang lien quan.
   * Website nay la trang ca nhan, khong phai cong thong tin chinh thuc.
   */
  disclaimer: isPlaceholderValue(teacherName)
    ? 'Đây là website giới thiệu và tư vấn học viên của thầy dạy lái xe. Website không phải cổng thông tin chính thức của Trường Đại học An ninh Nhân dân hoặc Trung tâm đào tạo lái xe. Thông tin về lịch khai giảng, học phí và quy định đào tạo cần được xác nhận lại tại thời điểm đăng ký.'
    : `Đây là website giới thiệu và tư vấn học viên của thầy ${teacherName}. Website không phải cổng thông tin chính thức của Trường Đại học An ninh Nhân dân hoặc Trung tâm đào tạo lái xe. Thông tin về lịch khai giảng, học phí và quy định đào tạo cần được xác nhận lại tại thời điểm đăng ký.`,

  analytics: {
    gaMeasurementId: publicEnv.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    facebookPixelId: publicEnv.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
    /** Facebook Pixel mac dinh TAT, chi bat khi khai bao ro rang. */
    facebookPixelEnabled:
      publicEnv.NEXT_PUBLIC_ENABLE_FACEBOOK_PIXEL === 'true' &&
      publicEnv.NEXT_PUBLIC_FACEBOOK_PIXEL_ID.length > 0,
  },

  /** Hien thi nhan "Nội dung mẫu" tren testimonial/gallery placeholder. */
  showPlaceholderBadge:
    publicEnv.NEXT_PUBLIC_SHOW_PLACEHOLDER_BADGE === 'true' ||
    (publicEnv.NEXT_PUBLIC_SHOW_PLACEHOLDER_BADGE === '' &&
      process.env.NODE_ENV !== 'production'),
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Dieu huong chinh - dung chung cho header, footer va sitemap.
 */
/**
 * `label`      : nhan day du - dung o footer, menu mobile, trang 404.
 * `shortLabel` : nhan rut gon - dung o thanh dieu huong ngang tren desktop,
 *                noi 7 muc phai nam vua mot hang cung logo, so dien thoai
 *                va nut CTA.
 */
export const mainNav = [
  { label: 'Trang chủ', shortLabel: 'Trang chủ', href: '/' },
  { label: 'Giới thiệu', shortLabel: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Khóa học', shortLabel: 'Khóa học', href: '/khoa-hoc' },
  {
    label: 'Học phí & lộ trình',
    shortLabel: 'Học phí',
    href: '/hoc-phi-lo-trinh',
  },
  {
    label: 'Cảm nhận học viên',
    shortLabel: 'Cảm nhận',
    href: '/cam-nhan-hoc-vien',
  },
  { label: 'Kiến thức', shortLabel: 'Kiến thức', href: '/kien-thuc' },
  { label: 'Liên hệ', shortLabel: 'Liên hệ', href: '/lien-he' },
] as const;

export const legalNav = [
  { label: 'Chính sách bảo mật', href: '/chinh-sach-bao-mat' },
  { label: 'Điều khoản sử dụng', href: '/dieu-khoan-su-dung' },
] as const;

/** Danh sach placeholder chua duoc thay - dung cho canh bao o dev. */
export function getUnresolvedPlaceholders(): string[] {
  const candidates: Array<[string, string]> = [
    ['Tên thầy', siteConfig.teacher.name],
    ['Chức danh', siteConfig.teacher.title],
    ['Kinh nghiệm giảng dạy', siteConfig.teacher.experienceLabel],
    ['Tên trung tâm', siteConfig.teacher.centerName],
    ['Số điện thoại', siteConfig.contact.phone],
    ['Zalo URL', siteConfig.contact.zaloUrl],
    ['Email', siteConfig.contact.email],
    ['Địa chỉ', siteConfig.contact.address],
    ['Khu vực đào tạo', siteConfig.contact.trainingArea],
    ['Google Maps URL', siteConfig.contact.googleMapsUrl],
    ['Thời gian liên hệ', siteConfig.contact.hours],
  ];

  return candidates
    .filter(([, value]) => isPlaceholderValue(value))
    .map(([label]) => label);
}
