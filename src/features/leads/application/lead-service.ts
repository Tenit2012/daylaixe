import { normalizeVietnamesePhone } from '@/lib/validation/phone';
import { type RateLimiter } from '@/lib/rate-limit/rate-limiter';
import type { Lead, LeadListOptions, PaginatedLeads } from '../domain/lead';
import type { LeadRepository } from '../domain/lead-repository';
import {
  leadSubmissionSchema,
  leadUpdateSchema,
  type LeadUpdateInput,
} from '../domain/lead-schema';
import type { LeadStatus } from '../domain/lead-status';

/**
 * Business logic cua tinh nang thu thap hoc vien tiem nang.
 *
 * Service khong biet Next.js, khong biet Prisma - chi phu thuoc vao
 * `LeadRepository` va `RateLimiter`. Nho vay test duoc doc lap.
 */

export type LeadSubmitErrorCode =
  | 'VALIDATION_ERROR'
  | 'RATE_LIMITED'
  | 'DUPLICATE'
  | 'SPAM_DETECTED'
  | 'UNKNOWN_ERROR';

export interface LeadSubmitSuccess {
  ok: true;
  leadId: string;
  message: string;
}

export interface LeadSubmitFailure {
  ok: false;
  code: LeadSubmitErrorCode;
  message: string;
  /** Loi theo tung truong, dung de hien thi ngay duoi input tuong ung. */
  fieldErrors?: Record<string, string[]>;
  retryAfterSeconds?: number;
}

export type LeadSubmitResult = LeadSubmitSuccess | LeadSubmitFailure;

export interface SubmitContext {
  /** Khoa dung cho rate limiting, thuong la dia chi IP. */
  clientKey: string;
  now?: number;
}

/** Cua so coi hai lan gui cung so dien thoai la trung lap: 5 phut. */
export const DUPLICATE_WINDOW_MS = 5 * 60 * 1000;

const SUCCESS_MESSAGE =
  'Đã nhận thông tin của bạn. Thầy sẽ liên hệ lại trong thời gian sớm nhất.';

export class LeadService {
  constructor(
    private readonly repository: LeadRepository,
    private readonly rateLimiter: RateLimiter,
  ) {}

  /**
   * Xu ly mot lan gui form dang ky.
   * Khong bao gio nem loi ra ngoai - moi that bai deu tra ve `LeadSubmitFailure`
   * de tang tren khong lam lo stack trace cho nguoi dung.
   */
  async submit(
    rawInput: unknown,
    context: SubmitContext,
  ): Promise<LeadSubmitResult> {
    const parsed = leadSubmissionSchema.safeParse(rawInput);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return {
        ok: false,
        code: 'VALIDATION_ERROR',
        message: 'Thông tin chưa hợp lệ. Vui lòng kiểm tra lại các mục bên dưới.',
        fieldErrors: Object.fromEntries(
          Object.entries(fieldErrors).filter(
            (entry): entry is [string, string[]] => Array.isArray(entry[1]),
          ),
        ),
      };
    }

    const data = parsed.data;

    // 1) Honeypot: bot dien vao truong an. Tra ve "thanh cong gia" de bot
    //    khong biet minh bi phat hien, nhung KHONG luu gi vao database.
    if (data.website && data.website.trim().length > 0) {
      return {
        ok: false,
        code: 'SPAM_DETECTED',
        message: SUCCESS_MESSAGE,
      };
    }

    // 2) Rate limiting theo IP.
    const limit = this.rateLimiter.check(context.clientKey, context.now);
    if (!limit.success) {
      return {
        ok: false,
        code: 'RATE_LIMITED',
        message:
          'Bạn đã gửi khá nhiều lần trong thời gian ngắn. Vui lòng thử lại sau ít phút hoặc gọi điện trực tiếp cho thầy.',
        retryAfterSeconds: limit.retryAfterSeconds,
      };
    }

    const normalizedPhone = normalizeVietnamesePhone(data.phone);
    if (!normalizedPhone) {
      return {
        ok: false,
        code: 'VALIDATION_ERROR',
        message: 'Số điện thoại không hợp lệ.',
        fieldErrors: { phone: ['Số điện thoại không hợp lệ'] },
      };
    }

    try {
      // 3) Chan gui trung trong thoi gian ngan.
      const recent = await this.repository.findRecentByPhone(
        normalizedPhone,
        DUPLICATE_WINDOW_MS,
      );
      if (recent) {
        return {
          ok: false,
          code: 'DUPLICATE',
          message:
            'Thông tin của bạn đã được ghi nhận trước đó. Thầy sẽ liên hệ lại sớm, bạn không cần gửi thêm.',
        };
      }

      const lead = await this.repository.create({
        fullName: data.fullName,
        phone: data.phone.trim(),
        normalizedPhone,
        interestedCourse: data.interestedCourse,
        location: data.location,
        preferredContactTime: data.preferredContactTime,
        note: data.note,
        sourcePage: data.sourcePage,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        utmContent: data.utmContent,
        utmTerm: data.utmTerm,
      });

      return { ok: true, leadId: lead.id, message: SUCCESS_MESSAGE };
    } catch (error) {
      // Chi log thong bao loi, KHONG log du lieu ca nhan cua nguoi dung.
      console.error(
        '[lead-service] Khong luu duoc lead:',
        error instanceof Error ? error.message : 'loi khong xac dinh',
      );
      return {
        ok: false,
        code: 'UNKNOWN_ERROR',
        message:
          'Hệ thống đang gặp sự cố khi lưu thông tin. Bạn vui lòng thử lại hoặc gọi điện trực tiếp cho thầy.',
      };
    }
  }

  list(options: LeadListOptions): Promise<PaginatedLeads> {
    return this.repository.list(options);
  }

  getById(id: string): Promise<Lead | null> {
    return this.repository.findById(id);
  }

  countByStatus(): Promise<Record<string, number>> {
    return this.repository.countByStatus();
  }

  /** Cap nhat trang thai va ghi chu cua admin. */
  async update(
    input: LeadUpdateInput,
  ): Promise<
    | { ok: true; lead: Lead }
    | { ok: false; message: string; fieldErrors?: Record<string, string[]> }
  > {
    const parsed = leadUpdateSchema.safeParse(input);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return {
        ok: false,
        message: 'Dữ liệu cập nhật không hợp lệ.',
        fieldErrors: Object.fromEntries(
          Object.entries(fieldErrors).filter(
            (entry): entry is [string, string[]] => Array.isArray(entry[1]),
          ),
        ),
      };
    }

    try {
      const lead = await this.repository.update(parsed.data.id, {
        status: parsed.data.status as LeadStatus,
        adminNote: parsed.data.adminNote,
      });
      if (!lead) {
        return { ok: false, message: 'Không tìm thấy hồ sơ học viên.' };
      }
      return { ok: true, lead };
    } catch (error) {
      console.error(
        '[lead-service] Khong cap nhat duoc lead:',
        error instanceof Error ? error.message : 'loi khong xac dinh',
      );
      return { ok: false, message: 'Không cập nhật được. Vui lòng thử lại.' };
    }
  }
}
