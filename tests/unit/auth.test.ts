/**
 * @vitest-environment node
 *
 * Chay o moi truong Node thay vi jsdom: `jose` kiem tra
 * `instanceof Uint8Array`, ma TextEncoder cua jsdom tao ra Uint8Array
 * thuoc realm khac nen phep kiem tra do se that bai.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * bcrypt cost 12 co tinh cham (~0.5 giay moi lan bam/so sanh) - do la muc dich
 * cua no. Mot so test o day goi 3-4 lan lien tiep, khi chay song song voi cac
 * file test khac thi de vuot nguong 5 giay mac dinh cua Vitest va bao fail gia.
 * Noi long thoi gian cho rieng file nay thay vi ha cost (ha cost se lam test
 * khong con kiem chung dung cau hinh that).
 */
vi.setConfig({ testTimeout: 30_000, hookTimeout: 30_000 });
import { hashPassword, verifyPassword } from '@/features/auth/infrastructure/password';
import {
  signSessionToken,
  verifySessionToken,
} from '@/features/auth/infrastructure/session-token';
import { AuthService } from '@/features/auth/application/auth-service';
import { RateLimiter } from '@/lib/rate-limit/rate-limiter';
import { isAdminRole } from '@/features/auth/domain/session';
import { loginSchema } from '@/features/auth/domain/credentials-schema';
import type {
  AdminUser,
  AdminUserRepository,
} from '@/features/auth/domain/admin-user-repository';

const SECRET = 'test-secret-value-at-least-32-characters-long';

describe('password hashing', () => {
  it('bam mat khau va xac thuc lai duoc', async () => {
    const hash = await hashPassword('mat-khau-an-toan');
    expect(hash).not.toBe('mat-khau-an-toan');
    expect(hash.length).toBeGreaterThan(50);
    expect(await verifyPassword('mat-khau-an-toan', hash)).toBe(true);
  });

  it('tu choi mat khau sai', async () => {
    const hash = await hashPassword('mat-khau-an-toan');
    expect(await verifyPassword('mat-khau-sai', hash)).toBe(false);
  });

  it('hai lan bam cung mot mat khau cho hash khac nhau (co salt)', async () => {
    const a = await hashPassword('cung-mot-mat-khau');
    const b = await hashPassword('cung-mot-mat-khau');
    expect(a).not.toBe(b);
  });

  it('nem loi khi mat khau rong', async () => {
    await expect(hashPassword('')).rejects.toThrow();
  });

  it('tra ve false thay vi nem loi khi hash sai dinh dang', async () => {
    expect(await verifyPassword('abc', 'khong-phai-hash')).toBe(false);
    expect(await verifyPassword('abc', '')).toBe(false);
  });
});

describe('session token', () => {
  const payload = {
    userId: 'user_1',
    email: 'admin@example.com',
    name: 'Quản trị viên',
    role: 'OWNER',
  };

  it('ky va xac thuc token thanh cong', async () => {
    const token = await signSessionToken(payload, SECRET);
    const session = await verifySessionToken(token, SECRET);

    expect(session).not.toBeNull();
    expect(session?.userId).toBe('user_1');
    expect(session?.email).toBe('admin@example.com');
    expect(session?.role).toBe('OWNER');
  });

  it('tu choi token ky bang secret khac', async () => {
    const token = await signSessionToken(payload, SECRET);
    const other = 'another-secret-value-at-least-32-characters';
    expect(await verifySessionToken(token, other)).toBeNull();
  });

  it('tu choi token bi sua doi', async () => {
    const token = await signSessionToken(payload, SECRET);
    const tampered = `${token.slice(0, -3)}abc`;
    expect(await verifySessionToken(tampered, SECRET)).toBeNull();
  });

  it('tu choi token het han', async () => {
    const token = await signSessionToken(payload, SECRET, -10);
    expect(await verifySessionToken(token, SECRET)).toBeNull();
  });

  it('tra ve null khi khong co token', async () => {
    expect(await verifySessionToken(undefined, SECRET)).toBeNull();
    expect(await verifySessionToken(null, SECRET)).toBeNull();
    expect(await verifySessionToken('', SECRET)).toBeNull();
  });

  it('tu choi khi role khong hop le', async () => {
    const token = await signSessionToken(
      { ...payload, role: 'SUPERADMIN' },
      SECRET,
    );
    expect(await verifySessionToken(token, SECRET)).toBeNull();
  });

  it('nem loi khi secret qua ngan', async () => {
    await expect(signSessionToken(payload, 'ngan')).rejects.toThrow();
  });
});

describe('isAdminRole', () => {
  it('chi chap nhan OWNER va STAFF', () => {
    expect(isAdminRole('OWNER')).toBe(true);
    expect(isAdminRole('STAFF')).toBe(true);
    expect(isAdminRole('ADMIN')).toBe(false);
    expect(isAdminRole(null)).toBe(false);
  });
});

describe('loginSchema', () => {
  it('chuan hoa email ve chu thuong', () => {
    const result = loginSchema.safeParse({
      email: '  Admin@Example.COM ',
      password: 'abc123',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('admin@example.com');
    }
  });

  it('tu choi email sai dinh dang', () => {
    expect(
      loginSchema.safeParse({ email: 'khong-phai-email', password: 'abc' })
        .success,
    ).toBe(false);
  });

  it('tu choi mat khau rong', () => {
    expect(
      loginSchema.safeParse({ email: 'a@b.com', password: '' }).success,
    ).toBe(false);
  });
});

describe('AuthService', () => {
  let repository: AdminUserRepository;
  let recordLogin: ReturnType<typeof vi.fn>;
  let passwordHash: string;

  beforeEach(async () => {
    passwordHash = await hashPassword('dung-mat-khau');
    recordLogin = vi.fn(async () => {});

    const user: AdminUser = {
      id: 'user_1',
      email: 'admin@example.com',
      passwordHash,
      name: 'Quản trị viên',
      role: 'OWNER',
      isActive: true,
      lastLoginAt: null,
    };

    repository = {
      findByEmail: async (email) =>
        email === 'admin@example.com' ? user : null,
      recordLogin,
    };
  });

  function makeService(limit = 10) {
    return new AuthService(
      repository,
      verifyPassword,
      new RateLimiter({ limit, windowMs: 60_000 }),
    );
  }

  it('dang nhap thanh cong voi thong tin dung', async () => {
    const result = await makeService().authenticate(
      { email: 'admin@example.com', password: 'dung-mat-khau' },
      'ip-1',
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.session.email).toBe('admin@example.com');
      expect(result.session.role).toBe('OWNER');
    }
    expect(recordLogin).toHaveBeenCalledOnce();
  });

  it('tu choi mat khau sai', async () => {
    const result = await makeService().authenticate(
      { email: 'admin@example.com', password: 'sai-mat-khau' },
      'ip-1',
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('INVALID_CREDENTIALS');
  });

  it('khong tiet lo email co ton tai hay khong', async () => {
    const service = makeService();
    const unknownEmail = await service.authenticate(
      { email: 'khong-ton-tai@example.com', password: 'bat-ky' },
      'ip-1',
    );
    const wrongPassword = await service.authenticate(
      { email: 'admin@example.com', password: 'sai' },
      'ip-2',
    );

    expect(unknownEmail.ok).toBe(false);
    expect(wrongPassword.ok).toBe(false);
    if (!unknownEmail.ok && !wrongPassword.ok) {
      expect(unknownEmail.message).toBe(wrongPassword.message);
    }
  });

  it('tu choi tai khoan bi vo hieu hoa', async () => {
    repository = {
      findByEmail: async () => ({
        id: 'user_1',
        email: 'admin@example.com',
        passwordHash,
        name: 'Quản trị viên',
        role: 'OWNER' as const,
        isActive: false,
        lastLoginAt: null,
      }),
      recordLogin,
    };

    const result = await makeService().authenticate(
      { email: 'admin@example.com', password: 'dung-mat-khau' },
      'ip-1',
    );
    expect(result.ok).toBe(false);
  });

  it('chan sau khi thu sai qua nhieu lan', async () => {
    const service = makeService(2);

    await service.authenticate(
      { email: 'admin@example.com', password: 'sai' },
      'ip-1',
    );
    await service.authenticate(
      { email: 'admin@example.com', password: 'sai' },
      'ip-1',
    );
    const third = await service.authenticate(
      { email: 'admin@example.com', password: 'dung-mat-khau' },
      'ip-1',
    );

    expect(third.ok).toBe(false);
    if (!third.ok) expect(third.code).toBe('RATE_LIMITED');
  });

  it('xoa bo dem rate limit sau khi dang nhap thanh cong', async () => {
    const service = makeService(3);

    await service.authenticate(
      { email: 'admin@example.com', password: 'sai' },
      'ip-1',
    );
    const success = await service.authenticate(
      { email: 'admin@example.com', password: 'dung-mat-khau' },
      'ip-1',
    );
    expect(success.ok).toBe(true);

    // Sau khi reset, van con du luot cho lan dang nhap tiep theo.
    const again = await service.authenticate(
      { email: 'admin@example.com', password: 'dung-mat-khau' },
      'ip-1',
    );
    expect(again.ok).toBe(true);
  });

  it('bao loi validation khi thieu truong', async () => {
    const result = await makeService().authenticate(
      { email: '', password: '' },
      'ip-1',
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('VALIDATION_ERROR');
  });
});
