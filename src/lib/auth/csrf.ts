import 'server-only';
import { timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { CSRF_COOKIE_NAME } from '@/features/auth/domain/session';

/**
 * CSRF protection theo mo hinh double-submit cookie.
 *
 * Cookie CSRF duoc TAO TRONG MIDDLEWARE (src/middleware.ts), vi Next.js chi
 * cho phep ghi cookie trong Server Action hoac Route Handler - khong ghi duoc
 * trong lúc render Server Component.
 *
 * Cac ham o day chi DOC cookie va so sanh gia tri.
 * Next.js Server Actions da tu kiem tra header Origin/Host; day la lop
 * bao ve thu hai cho form dang nhap.
 */

/** Doc token CSRF hien tai. Tra ve chuoi rong neu chua co. */
export async function getCsrfToken(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get(CSRF_COOKIE_NAME)?.value ?? '';
}

/** So sanh chuoi theo thoi gian hang so de tranh timing attack. */
export function safeCompare(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufferA = Buffer.from(a, 'utf8');
  const bufferB = Buffer.from(b, 'utf8');
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}

/** Kiem tra token nguoi dung gui len co khop cookie khong. */
export async function verifyCsrfToken(
  submittedToken: unknown,
): Promise<boolean> {
  if (typeof submittedToken !== 'string' || submittedToken.length === 0) {
    return false;
  }
  const expected = await getCsrfToken();
  if (!expected) return false;
  return safeCompare(submittedToken, expected);
}
