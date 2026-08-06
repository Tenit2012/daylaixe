import { z } from 'zod';
import { courseOptions } from '@/content/courses';
import { normalizeVietnamesePhone } from '@/lib/validation/phone';
import {
  sanitizeMultilineText,
  sanitizeText,
} from '@/lib/security/sanitize';
import { LEAD_STATUSES } from './lead-status';

/**
 * ============================================================================
 * Schema xac thuc du lieu form dang ky tu van.
 * ============================================================================
 * Dung CHUNG cho client (react-hook-form) va server (Server Action / API route).
 * Server LUON validate lai, khong tin du lieu tu client.
 *
 * KHONG thu thap: so CCCD, anh giay to, dia chi nha chinh xac, ho so suc khoe.
 */

const FIELD_LIMITS = {
  fullName: 80,
  phone: 20,
  location: 120,
  preferredContactTime: 60,
  note: 1000,
  sourcePage: 200,
  utm: 120,
} as const;

export { FIELD_LIMITS };

const courseValues = courseOptions.map((option) => option.value);

/** Khung gio muon duoc lien he. */
export const CONTACT_TIME_OPTIONS = [
  { value: 'sang', label: 'Buổi sáng (8:00 - 11:00)' },
  { value: 'trua', label: 'Buổi trưa (11:00 - 13:30)' },
  { value: 'chieu', label: 'Buổi chiều (13:30 - 17:00)' },
  { value: 'toi', label: 'Buổi tối (17:00 - 20:00)' },
  { value: 'bat-ky', label: 'Khung giờ nào cũng được' },
] as const;

const contactTimeValues = CONTACT_TIME_OPTIONS.map((option) => option.value);

/** Ten nguoi Viet: chu cai (co dau), khoang trang, dau nhay va gach ngang. */
const NAME_PATTERN =
  /^[\p{L}\p{M}][\p{L}\p{M}\s'’.-]*[\p{L}\p{M}.]$/u;

export const leadFormSchema = z.object({
  fullName: z
    .string({ required_error: 'Vui lòng nhập họ và tên' })
    .transform((value) => sanitizeText(value, FIELD_LIMITS.fullName))
    .pipe(
      z
        .string()
        .min(2, 'Họ và tên cần ít nhất 2 ký tự')
        .max(FIELD_LIMITS.fullName, 'Họ và tên quá dài')
        .regex(NAME_PATTERN, 'Họ và tên chỉ gồm chữ cái và khoảng trắng'),
    ),

  phone: z
    .string({ required_error: 'Vui lòng nhập số điện thoại' })
    .trim()
    .max(FIELD_LIMITS.phone, 'Số điện thoại không hợp lệ')
    .refine(
      (value) => normalizeVietnamesePhone(value) !== null,
      'Số điện thoại không hợp lệ. Ví dụ đúng: 0912 345 678',
    ),

  interestedCourse: z
    .string({ required_error: 'Vui lòng chọn khóa học quan tâm' })
    .refine(
      (value) => courseValues.includes(value),
      'Khóa học được chọn không hợp lệ',
    ),

  location: z
    .string()
    .optional()
    .transform((value) =>
      value ? sanitizeText(value, FIELD_LIMITS.location) : '',
    )
    .pipe(z.string().max(FIELD_LIMITS.location, 'Khu vực quá dài')),

  preferredContactTime: z
    .string()
    .optional()
    .transform((value) => value ?? '')
    .refine(
      (value) => value === '' || contactTimeValues.includes(value as never),
      'Khung giờ liên hệ không hợp lệ',
    ),

  note: z
    .string()
    .optional()
    .transform((value) =>
      value ? sanitizeMultilineText(value, FIELD_LIMITS.note) : '',
    )
    .pipe(z.string().max(FIELD_LIMITS.note, 'Ghi chú tối đa 1000 ký tự')),

  consent: z
    .boolean({
      required_error:
        'Vui lòng đồng ý cho phép sử dụng thông tin để liên hệ tư vấn',
      invalid_type_error:
        'Vui lòng đồng ý cho phép sử dụng thông tin để liên hệ tư vấn',
    })
    .refine((value) => value === true, {
      message:
        'Vui lòng đồng ý cho phép sử dụng thông tin để liên hệ tư vấn',
    }),

  /**
   * Honeypot: truong an voi nguoi dung that. Bot thuong tu dien vao.
   * Gia tri KHONG bao gio duoc luu vao database.
   */
  website: z.string().max(200).optional().default(''),
});

export type LeadFormInput = z.input<typeof leadFormSchema>;
export type LeadFormValues = z.output<typeof leadFormSchema>;

/** Metadata do server tu bo sung - client khong duoc phep tu quyet dinh. */
export const leadMetadataSchema = z.object({
  sourcePage: z
    .string()
    .optional()
    .transform((value) =>
      value ? sanitizeText(value, FIELD_LIMITS.sourcePage) : '',
    ),
  utmSource: z.string().max(FIELD_LIMITS.utm).optional(),
  utmMedium: z.string().max(FIELD_LIMITS.utm).optional(),
  utmCampaign: z.string().max(FIELD_LIMITS.utm).optional(),
  utmContent: z.string().max(FIELD_LIMITS.utm).optional(),
  utmTerm: z.string().max(FIELD_LIMITS.utm).optional(),
});

export type LeadMetadata = z.infer<typeof leadMetadataSchema>;

/** Schema day du ma Server Action nhan duoc. */
export const leadSubmissionSchema = leadFormSchema.and(leadMetadataSchema);
export type LeadSubmission = z.output<typeof leadSubmissionSchema>;

/** Schema cap nhat lead o trang quan tri. */
export const leadUpdateSchema = z.object({
  id: z.string().min(1, 'Thiếu mã hồ sơ'),
  status: z.enum(LEAD_STATUSES, {
    errorMap: () => ({ message: 'Trạng thái không hợp lệ' }),
  }),
  adminNote: z
    .string()
    .optional()
    .transform((value) => (value ? sanitizeMultilineText(value, 2000) : ''))
    .pipe(z.string().max(2000, 'Ghi chú tối đa 2000 ký tự')),
});

export type LeadUpdateInput = z.input<typeof leadUpdateSchema>;
export type LeadUpdateValues = z.output<typeof leadUpdateSchema>;
