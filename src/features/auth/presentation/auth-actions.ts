'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginRateLimiter } from '@/lib/rate-limit/rate-limiter';
import { getClientIp } from '@/lib/utils/request-context';
import { sanitizeInternalPath } from '@/lib/security/sanitize';
import { createSession, destroySession } from '@/lib/auth/session';
import { verifyCsrfToken } from '@/lib/auth/csrf';
import { adminUserRepository } from '../infrastructure/prisma-admin-user-repository';
import { verifyPassword } from '../infrastructure/password';
import { AuthService } from '../application/auth-service';

const authService = new AuthService(
  adminUserRepository,
  verifyPassword,
  loginRateLimiter,
);

export interface LoginFormState {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
}

/**
 * Server Action xu ly dang nhap trang quan tri.
 *
 * Cac lop bao ve:
 *  - Kiem tra CSRF token (double-submit cookie).
 *  - Rate limit theo IP.
 *  - Thong bao loi chung chung, khong tiet lo email co ton tai hay khong.
 *  - Duong dan redirect duoc kiem tra chi la duong dan noi bo.
 */
export async function loginAction(
  _prevState: LoginFormState | null,
  formData: FormData,
): Promise<LoginFormState> {
  const csrfOk = await verifyCsrfToken(formData.get('csrfToken'));
  if (!csrfOk) {
    return {
      ok: false,
      message: 'Phiên đăng nhập đã hết hạn. Vui lòng tải lại trang và thử lại.',
    };
  }

  const headerList = await headers();
  const clientIp = getClientIp(headerList);

  const result = await authService.authenticate(
    {
      email: formData.get('email'),
      password: formData.get('password'),
    },
    `login:${clientIp}`,
  );

  if (!result.ok) {
    return {
      ok: false,
      message: result.message,
      fieldErrors: result.fieldErrors,
    };
  }

  await createSession(result.session);

  const next = sanitizeInternalPath(formData.get('next'), '/admin/leads');
  redirect(next);
}

/** Dang xuat: xoa cookie phien roi quay ve trang dang nhap. */
export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect('/admin/login');
}
