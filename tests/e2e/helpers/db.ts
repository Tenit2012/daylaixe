import { join } from 'node:path';
import { PrismaClient } from '@prisma/client';

/**
 * Ket noi toi database RIENG cua E2E (prisma/e2e.db).
 * Dung duong dan tuyet doi de khong phu thuoc thu muc lam viec.
 */
export const E2E_DATABASE_FILE = join(process.cwd(), 'prisma', 'e2e.db');
export const E2E_DATABASE_URL = `file:${E2E_DATABASE_FILE}`;

/** Bien moi truong truyen cho tien trinh con (prisma CLI, next start). */
export const E2E_ENV = {
  ...process.env,
  DATABASE_URL: 'file:./e2e.db',
};

export function createE2EPrismaClient(): PrismaClient {
  return new PrismaClient({
    datasourceUrl: E2E_DATABASE_URL,
    log: ['error'],
  });
}

/** Chay mot truy van tren database E2E roi tu dong dong ket noi. */
export async function withE2EDatabase<T>(
  callback: (prisma: PrismaClient) => Promise<T>,
): Promise<T> {
  const prisma = createE2EPrismaClient();
  try {
    return await callback(prisma);
  } finally {
    await prisma.$disconnect();
  }
}

/** Tim lead theo so dien thoai da chuan hoa. */
export function findLeadByPhone(normalizedPhone: string) {
  return withE2EDatabase((prisma) =>
    prisma.lead.findFirst({
      where: { normalizedPhone },
      orderBy: { createdAt: 'desc' },
    }),
  );
}

/** Xoa cac lead do test tao ra (theo tien to so dien thoai). */
export function deleteLeadsByPhonePrefix(prefix: string) {
  return withE2EDatabase((prisma) =>
    prisma.lead.deleteMany({
      where: { normalizedPhone: { startsWith: prefix } },
    }),
  );
}
