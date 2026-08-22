import { z } from 'zod';

/**
 * Bien moi truong CONG KHAI (duoc nhung vao bundle client).
 *
 * Bat buoc doc `process.env.NEXT_PUBLIC_X` mot cach TINH (khong dung
 * `process.env[key]`) de Next.js thay the duoc gia tri luc build.
 *
 * Toan bo gia tri deu co fallback dang placeholder `[...]` nen website
 * van chay duoc khi chua cau hinh xong - dung cho giai doan phat trien.
 */
const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_TEACHER_NAME: z.string().min(1).default('[Tên thầy]'),
  NEXT_PUBLIC_TEACHER_TITLE: z.string().min(1).default('[Chức danh]'),
  NEXT_PUBLIC_PHONE_NUMBER: z.string().min(1).default('[Số điện thoại]'),
  NEXT_PUBLIC_ZALO_URL: z.string().min(1).default('[Zalo URL]'),
  NEXT_PUBLIC_CONTACT_EMAIL: z.string().min(1).default('[Email]'),
  NEXT_PUBLIC_FACEBOOK_URL: z.string().default('[Facebook URL]'),
  NEXT_PUBLIC_YOUTUBE_URL: z.string().default('[YouTube URL]'),
  NEXT_PUBLIC_ADDRESS: z.string().min(1).default('[Địa chỉ]'),
  NEXT_PUBLIC_TRAINING_AREA: z.string().min(1).default('[Khu vực đào tạo]'),
  NEXT_PUBLIC_GOOGLE_MAPS_URL: z.string().default('[Google Maps URL]'),
  NEXT_PUBLIC_CENTER_NAME: z.string().min(1).default('[Tên trung tâm]'),
  /** Ten rut gon cua trung tam - dung o cho hep nhu badge, breadcrumb. */
  NEXT_PUBLIC_CENTER_SHORT_NAME: z.string().default(''),
  NEXT_PUBLIC_CENTER_COMPACT_NAME: z.string().default(''),
  /**
   * Vi tri cu the ben trong trung tam de hoc vien tim duoc cho tu van
   * (vi du "Lầu 2, trong khuôn viên trung tâm").
   */
  NEXT_PUBLIC_CONSULT_LOCATION: z.string().default(''),
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
  NEXT_PUBLIC_CONTACT_HOURS: z.string().min(1).default('[Thời gian liên hệ]'),
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
