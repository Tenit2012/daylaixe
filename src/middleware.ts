import { NextResponse, type NextRequest } from 'next/server';
import {
  CSRF_COOKIE_NAME,
  SESSION_COOKIE_NAME,
} from '@/features/auth/domain/session';
import { verifySessionToken } from '@/features/auth/infrastructure/session-token';

/**
 * Middleware cho toan bo route `/admin/*`:
 *
 *  1. Tao cookie CSRF neu chua co. Phai lam o day vi Next.js khong cho phep
 *     ghi cookie trong lúc render Server Component.
 *  2. Bao ve moi route admin (tru trang dang nhap) bang cach xac thuc chu ky
 *     JWT cua session. Middleware chay tren Edge runtime nen khong truy van
 *     database; tang Server Component van kiem tra lai session.
 */

const CSRF_TOKEN_BYTES = 32;
const CSRF_MAX_AGE_SECONDS = 60 * 60 * 4;

/** Sinh token ngau nhien bang Web Crypto (co san tren Edge runtime). */
function generateCsrfToken(): string {
  const bytes = new Uint8Array(CSRF_TOKEN_BYTES);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join(
    '',
  );
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // --- 1) Bao dam luon co token CSRF cho cac form trong khu vuc admin ---
  const existingCsrf = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const csrfToken =
    existingCsrf && existingCsrf.length >= 32
      ? existingCsrf
      : generateCsrfToken();
  const needsCsrfCookie = csrfToken !== existingCsrf;

  if (needsCsrfCookie) {
    // Ghi vao request de trang duoc render trong cung request nay doc duoc.
    request.cookies.set(CSRF_COOKIE_NAME, csrfToken);
  }

  const attachCsrf = (response: NextResponse): NextResponse => {
    if (needsCsrfCookie) {
      response.cookies.set(CSRF_COOKIE_NAME, csrfToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: CSRF_MAX_AGE_SECONDS,
      });
    }
    return response;
  };

  // --- 2) Trang dang nhap luon truy cap duoc ---
  if (pathname === '/admin/login') {
    return attachCsrf(NextResponse.next({ request }));
  }

  // --- 3) Cac route admin con lai yeu cau session hop le ---
  const secret = process.env.AUTH_SECRET ?? '';
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = secret ? await verifySessionToken(token, secret) : null;

  if (!session) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('next', `${pathname}${search}`);

    const response = attachCsrf(NextResponse.redirect(loginUrl));
    // Xoa cookie hong/het han de khong lap vo han vong redirect.
    if (token) {
      response.cookies.set(SESSION_COOKIE_NAME, '', { path: '/', maxAge: 0 });
    }
    return response;
  }

  return attachCsrf(NextResponse.next({ request }));
}

export const config = {
  matcher: ['/admin/:path*'],
};
