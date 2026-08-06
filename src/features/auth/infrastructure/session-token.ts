import { SignJWT, jwtVerify } from 'jose';
import {
  isAdminRole,
  SESSION_MAX_AGE_SECONDS,
  type AdminSession,
} from '../domain/session';

/**
 * Ky va xac thuc session token bang JWT (HS256).
 *
 * Dung `jose` vi thu vien nay chay duoc ca o Node runtime lan Edge runtime,
 * nho vay middleware co the xac thuc session ma khong can goi database.
 */

const ISSUER = 'daylayxe';
const AUDIENCE = 'daylayxe-admin';

function getSecretKey(secret: string): Uint8Array {
  if (!secret || secret.length < 32) {
    throw new Error('AUTH_SECRET phai co toi thieu 32 ky tu');
  }
  return new TextEncoder().encode(secret);
}

export interface SessionPayloadInput {
  userId: string;
  email: string;
  name: string;
  role: string;
}

/** Tao JWT cho phien dang nhap. */
export async function signSessionToken(
  payload: SessionPayloadInput,
  secret: string,
  maxAgeSeconds: number = SESSION_MAX_AGE_SECONDS,
): Promise<string> {
  const key = getSecretKey(secret);
  const nowSeconds = Math.floor(Date.now() / 1000);

  return new SignJWT({
    email: payload.email,
    name: payload.name,
    role: payload.role,
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setSubject(payload.userId)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt(nowSeconds)
    .setExpirationTime(nowSeconds + maxAgeSeconds)
    .sign(key);
}

/**
 * Xac thuc token. Tra ve `null` khi token thieu, sai chu ky, het han
 * hoac payload khong dung dinh dang - khong nem loi ra ngoai.
 */
export async function verifySessionToken(
  token: string | undefined | null,
  secret: string,
): Promise<AdminSession | null> {
  if (!token) return null;

  try {
    const key = getSecretKey(secret);
    const { payload } = await jwtVerify(token, key, {
      issuer: ISSUER,
      audience: AUDIENCE,
      algorithms: ['HS256'],
    });

    const { sub, email, name, role, exp } = payload;

    if (
      typeof sub !== 'string' ||
      typeof email !== 'string' ||
      typeof name !== 'string' ||
      typeof exp !== 'number' ||
      !isAdminRole(role)
    ) {
      return null;
    }

    return { userId: sub, email, name, role, exp };
  } catch {
    return null;
  }
}
