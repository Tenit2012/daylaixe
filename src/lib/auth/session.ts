import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getServerEnv } from '@/lib/env/server';
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  type AdminSession,
} from '@/features/auth/domain/session';
import {
  signSessionToken,
  verifySessionToken,
  type SessionPayloadInput,
} from '@/features/auth/infrastructure/session-token';

/**
 * Doc/ghi session cookie phia server.
 *
 * Cookie duoc dat:
 *  - httpOnly: JavaScript cua trinh duyet khong doc duoc.
 *  - secure: bat o production (HTTPS).
 *  - sameSite: 'lax' - du de chan CSRF cho dieu huong thong thuong,
 *    dong thoi khong lam hong luong redirect sau khi dang nhap.
 *  - path: '/' de middleware doc duoc tren moi route.
 */

export async function createSession(
  payload: SessionPayloadInput,
): Promise<void> {
  const env = getServerEnv();
  const token = await signSessionToken(payload, env.AUTH_SECRET);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

/** Tra ve session hien tai hoac `null` neu chua dang nhap. */
export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const env = getServerEnv();
  return verifySessionToken(token, env.AUTH_SECRET);
}

/**
 * Bat buoc phai dang nhap. Neu chua, redirect ve trang login kem
 * duong dan quay lai (da duoc kiem tra la duong dan noi bo).
 */
export async function requireSession(
  returnTo = '/admin/leads',
): Promise<AdminSession> {
  const session = await getSession();
  if (!session) {
    redirect(`/admin/login?next=${encodeURIComponent(returnTo)}`);
  }
  return session;
}
