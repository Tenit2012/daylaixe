/** Thong tin phien dang nhap luu trong cookie (da ky bang JWT). */
export interface AdminSession {
  /** Id cua AdminUser. */
  userId: string;
  email: string;
  name: string;
  role: AdminRole;
  /** Thoi diem het han (epoch giay). */
  exp: number;
}

export const ADMIN_ROLES = ['OWNER', 'STAFF'] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export function isAdminRole(value: unknown): value is AdminRole {
  return (
    typeof value === 'string' && (ADMIN_ROLES as readonly string[]).includes(value)
  );
}

/** Ten cookie chua session. Tien to `__Host-` chi dung o production HTTPS. */
export const SESSION_COOKIE_NAME = 'daylayxe_admin_session';

/** Ten cookie chua CSRF token cho form dang nhap. */
export const CSRF_COOKIE_NAME = 'daylayxe_csrf';

/** Thoi han phien: 8 gio. */
export const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;
