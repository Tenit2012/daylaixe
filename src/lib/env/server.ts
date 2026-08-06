import 'server-only';
import { z } from 'zod';

/**
 * Bien moi truong CHI DUNG O SERVER.
 * Tuyet doi khong import module nay tu Client Component.
 * `server-only` se lam build that bai neu vo tinh import nham.
 */
const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL la bat buoc'),
  ADMIN_EMAIL: z.string().email('ADMIN_EMAIL phai la email hop le'),
  ADMIN_PASSWORD: z.string().min(6, 'ADMIN_PASSWORD toi thieu 6 ky tu'),
  AUTH_SECRET: z.string().min(32, 'AUTH_SECRET toi thieu 32 ky tu'),
  GOOGLE_SITE_VERIFICATION: z.string().optional().default(''),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cached: ServerEnv | null = null;

/**
 * Doc va validate bien moi truong server. Ket qua duoc cache.
 * Loi duoc nem kem ten bien (khong kem gia tri) de khong lo secret.
 */
export function getServerEnv(): ServerEnv {
  if (cached) return cached;

  const parsed = serverEnvSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    AUTH_SECRET: process.env.AUTH_SECRET,
    GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
  });

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');
    throw new Error(
      `Bien moi truong server khong hop le -> ${issues}. Xem .env.example.`,
    );
  }

  cached = parsed.data;
  return cached;
}

export const isProduction = () => process.env.NODE_ENV === 'production';
