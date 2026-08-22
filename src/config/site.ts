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
    /** Ten day du cua trung tam noi thay giang day. */
    centerName: publicEnv.NEXT_PUBLIC_CENTER_NAME,
    /** Ten rut gon - dung o badge, breadcrumb, cho hep. */
    centerShortName:
      publicEnv.NEXT_PUBLIC_CENTER_SHORT_NAME ||
      publicEnv.NEXT_PUBLIC_CENTER_NAME,
    /**
     * Ten CUC NGAN - chi dung o header tren man hinh rong 1280px tro len.
     *
     * Vi sao can bac thu ba: o dai do, header phai chua 7 muc menu + so dien
     * thoai + nut CTA. Do thuc te chi con khoang 300px cho khoi thuong hieu,
     * trong khi `centerShortName` da chiem hon 330px va TRAN DE LEN MENU.
     * Bac nay giu duoc phan quan trong nhat cua ten ("Sat hach Lai xe" +
     * "An ninh Nhan dan") trong khoang vua du.
     *
     * Khong tu dong cat chuoi dai: cat may moc se ra
     * "Trung tam Sat hach Lai xe - Truong Dai h..." tuc la mat dung phan
     * mang y nghia. Bien rieng cho phep viet tay ban ngan dung ngu phap.
     */
    centerCompactName:
      publicEnv.NEXT_PUBLIC_CENTER_COMPACT_NAME ||
      publicEnv.NEXT_PUBLIC_CENTER_SHORT_NAME ||
      publicEnv.NEXT_PUBLIC_CENTER_NAME,
    /**
     * DU LIEU THAT DA XAC NHAN: thay la giao vien CO HUU cua trung tam,
     * khong phai cong tac vien hay moi gioi tuyen sinh. Day la chi tiet
     * quan trong nhat de phan biet voi "co tuyen sinh" nen duoc tach rieng
     * thay vi gop vao `title`.
     */
    employmentStatus: 'Giáo viên cơ hữu',
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
    biography: `Với ${experienceLabel.toLowerCase()} kinh nghiệm giảng dạy trong vai trò giáo viên cơ hữu tại ${
      publicEnv.NEXT_PUBLIC_CENTER_NAME
    }, ${
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
    /** Vi tri cu the ben trong trung tam - vi du "Lầu 2, trong khuôn viên trung tâm". */
    consultLocation: publicEnv.NEXT_PUBLIC_CONSULT_LOCATION,
    trainingArea: publicEnv.NEXT_PUBLIC_TRAINING_AREA,
    googleMapsUrl: publicEnv.NEXT_PUBLIC_GOOGLE_MAPS_URL,
    /** Vi du: "7:00 - 20:00 hằng ngày". */
    hours: publicEnv.NEXT_PUBLIC_CONTACT_HOURS,
  },

  url: publicEnv.NEXT_PUBLIC_SITE_URL.replace(/\/$/, ''),

  seo: {
    /**
     * Google cat tieu de o khoang 60 ky tu. Ban cu ("Học lái xe cùng thầy
     * Tùng — giáo viên cơ hữu tại Thủ Đức, TP.HCM") dai 64 ky tu nen bi cat
     * mat dung phan dia danh - tu khoa quan trong nhat cho tim kiem dia
     * phuong. Ban nay dua dia danh len truoc va van vua 56 ky tu.
     */
    defaultTitle: isPlaceholderValue(teacherName)
      ? 'Học lái xe Thủ Đức, TP.HCM — giáo viên cơ hữu'
      : `Học lái xe Thủ Đức, TP.HCM — Thầy ${teacherName}, giáo viên cơ hữu`,
    titleTemplate: isPlaceholderValue(teacherName)
      ? '%s | Học lái xe cùng thầy'
      : `%s | Thầy ${teacherName}`,
    /**
     * Google cat mo ta o khoang 155-160 ky tu. Cau nay co y NGAN, khong nhet
     * ten day du cua trung tam (rat dai) vao - ten do da nam o <h1> va o
     * JSON-LD roi. Uu tien cua mo ta la lam nguoi doc bam vao, khong phai
     * nhoi tu khoa.
     */
    defaultDescription: `Học lái xe cùng ${
      isPlaceholderValue(teacherName) ? 'thầy' : `thầy ${teacherName}`
    } — giáo viên cơ hữu, ${experienceLabel.toLowerCase()} kinh nghiệm. Học và thi tại trung tâm ở Thủ Đức, TP.HCM. Tư vấn trực tiếp, không trung gian.`,
    /** Dung cho og:locale va thuoc tinh lang cua the <html>. */
    locale: 'vi_VN',
    lang: 'vi',
    /**
     * Anh hien thi khi chia se link len Zalo/Facebook. Phai la anh bitmap
     * (jpg/png) - nhieu ung dung nhan tin KHONG doc duoc SVG.
     */
    ogImage: '/images/og/og-default.jpg',
    keywords: seoKeywords,
  },

  messaging: {
    /**
     * Tieu de chinh o hero. Neu ba dieu nay: DAY LA AI (giao vien co huu),
     * HOC O DAU (ten trung tam), DANG KY VOI AI (truc tiep voi thay) -
     * chinh la ba cau hoi ma bao cao TRUST_AUDIT cham diem thap nhat.
     */
    heroTitle: `Học lái xe cùng giáo viên cơ hữu tại ${publicEnv.NEXT_PUBLIC_CENTER_NAME}`,
    /**
     * Ba dieu can noi ngay duoi tieu de hero, moi dieu MOT MUC RIENG.
     *
     * Truoc day day la MOT chuoi duy nhat, ba y dinh vao nhau bang dau "•".
     * Cach do hong khi xuong dong: dau cham roi vao dau hoac cuoi dong tuy be
     * ngang man hinh, va cum "he dan su va he Cong an" bi cat doi giua hai
     * dong. Doc thanh mot cau lan man thay vi ba dieu ro rang.
     *
     * Tach thanh mang de moi muc la mot khoi khong the vo: trinh duyet chi
     * duoc xuong dong GIUA cac muc, khong bao gio cat ngang mot y. Dau cham
     * tron giờ la phan tu duoc ve, thuoc ve muc dung sau no, nen khong bao gio
     * bi mo coi o dau dong.
     */
    heroHighlights: [
      `${experienceLabel} kinh nghiệm giảng dạy`,
      `Hướng dẫn ${studentGroups}`,
      `Đăng ký trực tiếp với ${
        isPlaceholderValue(teacherName) ? 'thầy' : `thầy ${teacherName}`
      }`,
    ],
    secondary:
      'Tư vấn khóa học phù hợp, hướng dẫn chuẩn bị hồ sơ và sắp xếp lịch học. Bạn trao đổi trực tiếp với thầy, đăng ký và học tại trung tâm.',
    philosophy:
      'Tôi không chỉ hướng dẫn học viên vượt qua kỳ thi, mà còn mong mỗi học viên đủ bình tĩnh và tự tin để lái xe an toàn sau khi nhận bằng.',
    feeNotConfigured:
      'Học phí và lịch khai giảng do trung tâm công bố và có thể thay đổi theo từng đợt. Bạn liên hệ để nhận thông tin được cập nhật tại thời điểm đăng ký.',
  },

  /**
   * Disclaimer BAT BUOC hien thi o footer va cac trang phap ly.
   *
   * LUU Y VE CACH DIEN DAT: thay LA giao vien co huu cua trung tam - day la
   * du lieu that da xac nhan nen website noi ro. Nhung website nay van la
   * trang CA NHAN cua thay, khong phai cong thong tin chinh thuc cua trung
   * tam hay nha truong. Hai y do khong mau thuan nhau va phai duoc neu CUNG
   * NHAU: neu chi neu y dau se thanh mao danh, neu chi neu y sau se thanh
   * phu nhan chinh moi quan he co that.
   */
  disclaimer: isPlaceholderValue(teacherName)
    ? `Đây là trang cá nhân của giáo viên cơ hữu tại ${publicEnv.NEXT_PUBLIC_CENTER_NAME}, dùng để tư vấn và hướng dẫn học viên. Đây không phải cổng thông tin chính thức của Trung tâm hay Nhà trường. Lịch khai giảng, học phí và quy định đào tạo do Trung tâm công bố và cần được xác nhận lại tại thời điểm đăng ký.`
    : `Đây là trang cá nhân của thầy ${teacherName} — giáo viên cơ hữu tại ${publicEnv.NEXT_PUBLIC_CENTER_NAME} — dùng để tư vấn và hướng dẫn học viên. Đây không phải cổng thông tin chính thức của Trung tâm hay Nhà trường. Lịch khai giảng, học phí và quy định đào tạo do Trung tâm công bố và cần được xác nhận lại tại thời điểm đăng ký.`,

  analytics: {
    /**
     * Ma Google Tag Manager (dang GTM-XXXXXXX).
     *
     * DAY LA LOP CHINH. Khi da co ma nay, website chi day su kien vao
     * `dataLayer`; viec chuyen tiep sang GA4, Google Ads hay cong cu khac do
     * GTM quyet dinh - khong can sua ma nguon va build lai.
     *
     * De trong thi khong nhung GTM. Xem docs/analytics-tracking.md.
     */
    gtmId: publicEnv.NEXT_PUBLIC_GTM_ID,
    /**
     * Ma do GA4 (dang G-XXXXXXXXXX).
     *
     * CHI dung khi CHUA cau hinh GTM. Neu ca hai cung co, website co tinh
     * KHONG nhung gtag.js - vi GA4 gan nhu chac chan da nam trong GTM, gan
     * them lan nua se lam moi luot xem va moi su kien bi dem hai lan.
     * Xem `shouldLoadDirectGa()` trong src/lib/analytics/track.ts.
     */
    gaMeasurementId: publicEnv.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    facebookPixelId: publicEnv.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
    /** Facebook Pixel mac dinh TAT, chi bat khi khai bao ro rang. */
    facebookPixelEnabled:
      publicEnv.NEXT_PUBLIC_ENABLE_FACEBOOK_PIXEL === 'true' &&
      publicEnv.NEXT_PUBLIC_FACEBOOK_PIXEL_ID.length > 0,
  },

  /**
   * Chan index toan site (dung cho ban preview/demo gui Thay Tung).
   * Bat bang bien moi truong NEXT_PUBLIC_NOINDEX="true".
   */
  noindex: publicEnv.NEXT_PUBLIC_NOINDEX === 'true',

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
