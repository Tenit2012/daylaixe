import { z } from 'zod';

/**
 * Bien moi truong CONG KHAI (duoc nhung vao bundle client).
 *
 * Bat buoc doc `process.env.NEXT_PUBLIC_X` mot cach TINH (khong dung
 * `process.env[key]`) de Next.js thay the duoc gia tri luc build.
 *
 * ===========================================================================
 * GIA TRI THAT NAM NGAY TRONG `.default(...)` BEN DUOI - KHONG CAN FILE .env
 * ===========================================================================
 *
 * Truoc day moi gia tri deu mac dinh la placeholder `[...]`, va gia tri that
 * chi nam trong `.env` - mot file bi `.gitignore` chan. Cach do de lai hai cai
 * bay, ca hai deu da no mot lan:
 *
 *  1. `.env` LECH khoi `.env.example` ma khong ai thay. Ten trung tam trong
 *     `.env` thieu hai chu "Trung tam", tao ra cau vo nghia ngay trong <h1>
 *     trang chu suot mot thoi gian dai.
 *  2. Deploy MA QUEN khai bien. Website nay xuat tinh len Cloudflare Pages;
 *     neu ban dung khong co bien moi truong thi `NEXT_PUBLIC_SITE_URL` rot ve
 *     `http://localhost:3000`, keo theo canonical va toan bo sitemap tro toi
 *     localhost. Hong am tham, khong co gi bao loi.
 *
 * Nay gia tri that la MAC DINH, nen `npm run build` tren may bat ky - hoac
 * tren Cloudflare Pages khong khai gi ca - deu ra dung mot ket qua.
 *
 * Bien moi truong VAN duoc ton trong neu co: dat `NEXT_PUBLIC_X` se ghi de
 * mac dinh. Dung cho ban xem thu (`NEXT_PUBLIC_NOINDEX="true"`) hoac khi doi
 * thong tin gap ma chua kip sua ma nguon.
 *
 * Nhung truong CHUA CO du lieu that (YouTube, GTM, GA, Pixel) van giu mac
 * dinh rong hoac `[...]` - giao dien tu an chung di thay vi sinh link hong.
 */
const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('https://thaytungdaylaixe.com'),
  NEXT_PUBLIC_TEACHER_NAME: z.string().min(1).default('Tùng'),
  NEXT_PUBLIC_TEACHER_TITLE: z.string().min(1).default('Giáo viên cơ hữu'),
  NEXT_PUBLIC_PHONE_NUMBER: z.string().min(1).default('0971397882'),
  NEXT_PUBLIC_ZALO_URL: z.string().min(1).default('https://zalo.me/0971397882'),
  NEXT_PUBLIC_CONTACT_EMAIL: z.string().min(1).default('thaytungdaihocanninh@gmail.com'),
  NEXT_PUBLIC_FACEBOOK_URL: z.string().default('https://www.facebook.com/TUNG8888882'),
  NEXT_PUBLIC_YOUTUBE_URL: z.string().default('[YouTube URL]'),
  NEXT_PUBLIC_ADDRESS: z.string().min(1).default('Km 18 Võ Nguyên Giáp, Linh Trung, Thủ Đức, TP.HCM'),
  NEXT_PUBLIC_TRAINING_AREA: z.string().min(1).default('TP. Thủ Đức và các quận lân cận, TP.HCM'),
  NEXT_PUBLIC_GOOGLE_MAPS_URL: z.string().default('[Google Maps URL]'),
  NEXT_PUBLIC_CENTER_NAME: z
    .string()
    .min(1)
    .default(
      'Trung tâm Dạy nghề, Đào tạo và Sát hạch Lái xe — Trường Đại học An ninh Nhân dân',
    ),
  /** Ten rut gon cua trung tam - dung o cho hep nhu badge, breadcrumb. */
  NEXT_PUBLIC_CENTER_SHORT_NAME: z.string().default('Trung tâm Sát hạch Lái xe – ĐH An ninh Nhân dân'),
  NEXT_PUBLIC_CENTER_COMPACT_NAME: z.string().default('Trung tâm Sát hạch Lái xe'),
  /**
   * Vi tri cu the ben trong trung tam de hoc vien tim duoc cho tu van
   * (vi du "Lầu 2, trong khuôn viên trung tâm").
   */
  NEXT_PUBLIC_CONSULT_LOCATION: z.string().default('Lầu 2, trong khuôn viên trung tâm'),
  /**
   * Nhan kinh nghiem dang CHU, khong phai so.
   * Du lieu that duoc thay xac nhan la "gan 20 nam" - de nguyen dang uoc
   * luong nay, khong duoc lam tron thanh "20 nam".
   */
  NEXT_PUBLIC_EXPERIENCE_LABEL: z.string().min(1).default('Gần 20 năm'),
  /**
   * Nhom hoc vien thay da truc tiep huong dan.
   * Dat o day de neu trung tam dung ten goi chinh thuc khac (vi du cach
   * goi khac cho "hệ Công an") thi chi sua mot cho, khong phai sua component.
   */
  NEXT_PUBLIC_STUDENT_GROUPS: z
    .string()
    .min(1)
    .default('học viên hệ dân sự và hệ Công an'),
  NEXT_PUBLIC_STUDENT_GROUPS_SHORT: z
    .string()
    .min(1)
    .default('học viên dân sự và Công an'),
  NEXT_PUBLIC_CONTACT_HOURS: z.string().min(1).default('7:00 - 20:00 hằng ngày'),
  /**
   * Toa do trung tam, dung cho `geo` trong JSON-LD (local SEO).
   *
   * DE TRONG khi chua co so do thuc. Bo trong thi JSON-LD BO HAN truong
   * `geo` thay vi ghi null - mot cap toa do doan mo se chi diem trung tam
   * vao sai cho tren ban do cua Google, te hon la khong khai bao gi.
   *
   * Cach lay: mo Google Maps -> chuot phai dung vi tri trung tam -> so dau
   * tien la latitude, so thu hai la longitude.
   */
  NEXT_PUBLIC_CENTER_LAT: z.string().default('10.8707802'),
  NEXT_PUBLIC_CENTER_LNG: z.string().default('106.8054619'),
  NEXT_PUBLIC_GTM_ID: z.string().default(''),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().default(''),
  NEXT_PUBLIC_FACEBOOK_PIXEL_ID: z.string().default(''),
  NEXT_PUBLIC_ENABLE_FACEBOOK_PIXEL: z.string().default('false'),
  NEXT_PUBLIC_SHOW_PLACEHOLDER_BADGE: z.string().default(''),
  /**
   * Dat "true" tren cac ban PREVIEW/DEMO (vi du link gui Thay Tung xem) de
   * chan cong cu tim kiem lap chi muc toan site. Mac dinh rong = cho phep index.
   */
  NEXT_PUBLIC_NOINDEX: z.string().default(''),
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;

/** Chuyen chuoi rong thanh undefined de Zod ap dung gia tri mac dinh. */
function orUndefined(value: string | undefined): string | undefined {
  if (value === undefined) return undefined;
  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
}

const parsed = publicEnvSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: orUndefined(process.env.NEXT_PUBLIC_SITE_URL),
  NEXT_PUBLIC_TEACHER_NAME: orUndefined(process.env.NEXT_PUBLIC_TEACHER_NAME),
  NEXT_PUBLIC_TEACHER_TITLE: orUndefined(process.env.NEXT_PUBLIC_TEACHER_TITLE),
  NEXT_PUBLIC_PHONE_NUMBER: orUndefined(process.env.NEXT_PUBLIC_PHONE_NUMBER),
  NEXT_PUBLIC_ZALO_URL: orUndefined(process.env.NEXT_PUBLIC_ZALO_URL),
  NEXT_PUBLIC_CONTACT_EMAIL: orUndefined(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  NEXT_PUBLIC_FACEBOOK_URL: orUndefined(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  NEXT_PUBLIC_YOUTUBE_URL: orUndefined(process.env.NEXT_PUBLIC_YOUTUBE_URL),
  NEXT_PUBLIC_ADDRESS: orUndefined(process.env.NEXT_PUBLIC_ADDRESS),
  NEXT_PUBLIC_TRAINING_AREA: orUndefined(process.env.NEXT_PUBLIC_TRAINING_AREA),
  NEXT_PUBLIC_GOOGLE_MAPS_URL: orUndefined(
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL,
  ),
  NEXT_PUBLIC_CENTER_NAME: orUndefined(process.env.NEXT_PUBLIC_CENTER_NAME),
  NEXT_PUBLIC_CENTER_COMPACT_NAME: orUndefined(
    process.env.NEXT_PUBLIC_CENTER_COMPACT_NAME,
  ),
  NEXT_PUBLIC_CENTER_SHORT_NAME: orUndefined(
    process.env.NEXT_PUBLIC_CENTER_SHORT_NAME,
  ),
  NEXT_PUBLIC_CONSULT_LOCATION: orUndefined(
    process.env.NEXT_PUBLIC_CONSULT_LOCATION,
  ),
  NEXT_PUBLIC_EXPERIENCE_LABEL: orUndefined(
    process.env.NEXT_PUBLIC_EXPERIENCE_LABEL,
  ),
  NEXT_PUBLIC_STUDENT_GROUPS: orUndefined(
    process.env.NEXT_PUBLIC_STUDENT_GROUPS,
  ),
  NEXT_PUBLIC_STUDENT_GROUPS_SHORT: orUndefined(
    process.env.NEXT_PUBLIC_STUDENT_GROUPS_SHORT,
  ),
  NEXT_PUBLIC_CONTACT_HOURS: orUndefined(process.env.NEXT_PUBLIC_CONTACT_HOURS),
  NEXT_PUBLIC_CENTER_LAT: orUndefined(process.env.NEXT_PUBLIC_CENTER_LAT),
  NEXT_PUBLIC_CENTER_LNG: orUndefined(process.env.NEXT_PUBLIC_CENTER_LNG),
  NEXT_PUBLIC_GTM_ID: orUndefined(process.env.NEXT_PUBLIC_GTM_ID),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: orUndefined(
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  ),
  NEXT_PUBLIC_FACEBOOK_PIXEL_ID: orUndefined(
    process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
  ),
  NEXT_PUBLIC_ENABLE_FACEBOOK_PIXEL: orUndefined(
    process.env.NEXT_PUBLIC_ENABLE_FACEBOOK_PIXEL,
  ),
  NEXT_PUBLIC_SHOW_PLACEHOLDER_BADGE: orUndefined(
    process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_BADGE,
  ),
  NEXT_PUBLIC_NOINDEX: orUndefined(process.env.NEXT_PUBLIC_NOINDEX),
});

if (!parsed.success) {
  // Chi log ten bien bi sai, khong log gia tri.
  const fields = Object.keys(parsed.error.flatten().fieldErrors).join(', ');
  throw new Error(
    `Bien moi truong cong khai khong hop le: ${fields}. Xem lai file .env (tham chieu .env.example).`,
  );
}

export const publicEnv: PublicEnv = parsed.data;
