import type { RateLimiter } from '@/lib/rate-limit/rate-limiter';
import type { AdminUserRepository } from '../domain/admin-user-repository';
import { loginSchema } from '../domain/credentials-schema';
import type { AdminSession } from '../domain/session';

/**
 * Business logic dang nhap trang quan tri.
 *
 * Nguyen tac bao mat:
 *  - Khong tiet lo email co ton tai hay khong (thong bao loi giong nhau).
 *  - Luon chay qua ham so sanh mat khau ke ca khi khong tim thay user,
 *    de thoi gian phan hoi khong lo thong tin (chong user enumeration).
 *  - Khong bao gio log mat khau.
 */

export interface AuthenticateSuccess {
  ok: true;
  session: Omit<AdminSession, 'exp'>;
}

export interface AuthenticateFailure {
  ok: false;
  code: 'INVALID_CREDENTIALS' | 'RATE_LIMITED' | 'VALIDATION_ERROR';
  message: string;
  fieldErrors?: Record<string, string[]>;
  retryAfterSeconds?: number;
}

export type AuthenticateResult = AuthenticateSuccess | AuthenticateFailure;

const GENERIC_ERROR = 'Email hoặc mật khẩu không đúng.';

/** Hash gia dung khi khong tim thay user, de van ton thoi gian so sanh. */
const DUMMY_HASH =
  '$2a$12$C6UzMDM.H6dfI/f/IKcEeO1WPFxaBqZbCzM8gnzr7LK5rvbLKVNmy';

export interface PasswordVerifier {
  (plainPassword: string, passwordHash: string): Promise<boolean>;
}

export class AuthService {
  constructor(
    private readonly users: AdminUserRepository,
    private readonly verifyPassword: PasswordVerifier,
    private readonly rateLimiter: RateLimiter,
  ) {}

  async authenticate(
    rawInput: unknown,
    clientKey: string,
    now?: number,
  ): Promise<AuthenticateResult> {
    const limit = this.rateLimiter.check(clientKey, now);
    if (!limit.success) {
      return {
        ok: false,
        code: 'RATE_LIMITED',
        message:
          'Bạn đã thử đăng nhập quá nhiều lần. Vui lòng chờ ít phút rồi thử lại.',
        retryAfterSeconds: limit.retryAfterSeconds,
      };
    }

    const parsed = loginSchema.safeParse(rawInput);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return {
        ok: false,
        code: 'VALIDATION_ERROR',
        message: 'Thông tin đăng nhập chưa hợp lệ.',
        fieldErrors: Object.fromEntries(
          Object.entries(fieldErrors).filter(
            (entry): entry is [string, string[]] => Array.isArray(entry[1]),
          ),
        ),
      };
    }

    const { email, password } = parsed.data;

    let user = null;
    try {
      user = await this.users.findByEmail(email);
    } catch (error) {
      console.error(
        '[auth-service] Loi khi truy van tai khoan:',
        error instanceof Error ? error.message : 'loi khong xac dinh',
      );
      return { ok: false, code: 'INVALID_CREDENTIALS', message: GENERIC_ERROR };
    }

    const passwordMatches = await this.verifyPassword(
      password,
      user?.passwordHash ?? DUMMY_HASH,
    );

    if (!user || !user.isActive || !passwordMatches) {
      return { ok: false, code: 'INVALID_CREDENTIALS', message: GENERIC_ERROR };
    }

    // Dang nhap thanh cong -> xoa bo dem rate limit cua IP nay.
    this.rateLimiter.reset(clientKey);

    try {
      await this.users.recordLogin(user.id, new Date());
    } catch {
      // Khong chan dang nhap chi vi khong ghi duoc lastLoginAt.
    }

    return {
      ok: true,
      session: {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
