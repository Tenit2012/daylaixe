import 'server-only';
import { PrismaClient } from '@prisma/client';

/**
 * Prisma client dung chung.
 * Luu tren globalThis o development de tranh tao hang loat ket noi
 * moi lan Next.js hot-reload.
 */
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['warn', 'error']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
