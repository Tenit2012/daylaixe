/**
 * Bo su kien tracking cua website.
 *
 * Ten dat theo snake_case cho tuong thich GA4. Moi ten o day cung chinh la
 * ten su kien duoc day vao `dataLayer` cua Google Tag Manager, nen khi tao
 * Trigger trong GTM hay dung dung chuoi nay - xem docs/analytics-tracking.md.
 *
 * QUY TAC DAT TEN:
 *  - `contact_*`  : hanh dong lien he truc tiep (dien thoai, Zalo).
 *  - `view_*`     : nguoi dung xem/mo mot noi dung co gia tri kinh doanh.
 *  - `click_*`    : bam vao mot lien ket ra ngoai hoac tien ich.
 *  - `form_*`     : vong doi bieu mau.
 *
 * KHONG track moi nut tren website. Chi track hanh dong co y nghia kinh doanh
 * - de bao cao GA4 con doc duoc, va de khong ton ngan sach su kien cua GA4.
 */
export const AnalyticsEvent = {
  /** Bam nut/lien ket goi dien (moi link `tel:`). */
  ContactPhone: 'contact_phone',
  /** Bam nut/lien ket nhan Zalo. */
  ContactZalo: 'contact_zalo',
  /** Bam vao mot khoa hoc de xem chi tiet. */
  ViewCourse: 'view_course',
  /** Bam nut lien he/dang ky gan voi mot khoa hoc cu the. */
  RegistrationClick: 'registration_click',
  /** Mo trang hoac khoi hoc phi. */
  ViewPricing: 'view_pricing',
  /** Mo trang hoac khoi dia diem hoc. */
  ViewLocation: 'view_location',
  /** Bam mo Google Maps chi duong. */
  ClickGoogleMap: 'click_google_map',
  /** Bam lien ket Facebook. */
  ClickFacebook: 'click_facebook',
  /** Bam lien ket YouTube. */
  ClickYoutube: 'click_youtube',
  /** Bam lien ket email (mailto). */
  ClickEmail: 'click_email',
  /** Bam nut phat video buoi hoc. */
  ClickVideo: 'click_video',
  /** Bam vao mot bai viet trong muc Kien thuc. */
  ViewArticle: 'view_article',

  /**
   * HAI SU KIEN DUOI DAY CHUA DUOC DUNG O DAU CA - va do la dung.
   *
   * Website hien khong co bieu mau nao (da kiem tra: khong co the <form>,
   * khong co onSubmit). Nguoi dung lien he qua dien thoai, Zalo hoac Facebook;
   * website khong thu thap va khong luu bat ky du lieu ca nhan nao.
   *
   * Giu ten o day de khi nao thuc su them bieu mau thi da co san hop dong
   * dat ten, khong phai nghi lai va khong bi lech voi GTM da cau hinh.
   * KHI THEM: chi gui `form_name`, TUYET DOI khong gui ten/so dien thoai/
   * email/noi dung tu van vao GA4.
   */
  FormStart: 'form_start',
  FormSubmit: 'form_submit',
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

/**
 * Vi tri cua CTA tren giao dien.
 *
 * VI SAO PHAI LA KIEU CO RANG BUOC thay vi mot chuoi tu do: mot nut "Nhan
 * Zalo" xuat hien o gan chuc cho khac nhau. Neu moi cho tu go mot chuoi, chi
 * can mot lan go "moblie_bar" thay vi "mobile_bar" la GA4 lang le tach thanh
 * hai phan doan rieng, va bao cao "CTA nao hieu qua nhat" tro nen sai ma
 * khong ai biet. TypeScript chan loi do ngay luc bien dich.
 */
export const CtaLocation = {
  /** Thanh dieu huong tren cung. */
  Header: 'header',
  /** Khoi dau trang chu. */
  Hero: 'hero',
  /** Trang chu - cac khoi ngoai hero. */
  Home: 'home',
  /** Trang gioi thieu ve thay. */
  AboutPage: 'about_page',
  /** Trang danh sach khoa hoc. */
  CourseList: 'course_list',
  /** Trang cam nhan hoc vien. */
  TestimonialsPage: 'testimonials_page',
  /** Trong the khoa hoc o luoi. */
  CourseCard: 'course_card',
  /** Trang chi tiet mot khoa hoc - khoi CTA chinh. */
  CoursePage: 'course_page',
  /** Trang chi tiet khoa hoc - khoi hoc phi. */
  CoursePageFee: 'course_page_fee',
  /** Trang chi tiet khoa hoc - cot ben phai. */
  CoursePageSidebar: 'course_page_sidebar',
  /** Trang/khoi hoc phi va lo trinh. */
  Pricing: 'pricing',
  /** Dai keu goi hanh dong giua trang. */
  CtaBanner: 'cta_banner',
  /** Khoi lien he cuoi moi trang. */
  ContactSection: 'contact_section',
  /** Trang lien he. */
  ContactPage: 'contact_page',
  /** Khoi "Hoc o dau". */
  WhereToStudy: 'where_to_study',
  /** Chan trang. */
  Footer: 'footer',
  /** Thanh CTA co dinh day man hinh - chi tren mobile. */
  MobileSticky: 'mobile_sticky',
  /** Nut noi goc phai man hinh - chi tren desktop. */
  FloatingCta: 'floating_cta',
  /** Khoi video buoi hoc. */
  LessonVideo: 'lesson_video',
  /** Muc kien thuc / bai viet. */
  Article: 'article',
} as const;

export type CtaLocationName = (typeof CtaLocation)[keyof typeof CtaLocation];

/**
 * Tham so di kem su kien.
 *
 * KHONG BAO GIO dat vao day: ho ten, so dien thoai, dia chi email, dia chi
 * nha, noi dung tin nhan tu van, hay bat ky du lieu nao nhan dang duoc ca
 * nhan. GA4 cam gui du lieu nhan dang ca nhan, va viec do cung vi pham chinh
 * cam ket rieng tu ma website dang neu o trang chinh sach bao mat.
 *
 * Duoc phep: dinh danh khoa hoc (slug), vi tri CTA, ten bieu mau, duong dan
 * trang - deu la du lieu ve NOI DUNG, khong phai ve NGUOI DUNG.
 */
export type AnalyticsPayload = Record<
  string,
  string | number | boolean | undefined
>;
