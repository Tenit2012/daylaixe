import 'server-only';
import type { PrismaClient } from '@prisma/client';
import { prisma as defaultPrisma } from '@/lib/db/prisma';
import type {
  AdminUser,
  AdminUserRepository,
} from '../domain/admin-user-repository';
import { isAdminRole } from '../domain/session';

export class PrismaAdminUserRepository implements AdminUserRepository {
  constructor(private readonly db: PrismaClient = defaultPrisma) {}

  async findByEmail(email: string): Promise<AdminUser | null> {
    const record = await this.db.adminUser.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!record) return null;

    return {
      id: record.id,
      email: record.email,
      passwordHash: record.passwordHash,
      name: record.name,
      role: isAdminRole(record.role) ? record.role : 'STAFF',
      isActive: record.isActive,
      lastLoginAt: record.lastLoginAt,
    };
  }

  async recordLogin(id: string, at: Date): Promise<void> {
    await this.db.adminUser.update({
      where: { id },
      data: { lastLoginAt: at },
    });
  }
}

export const adminUserRepository: AdminUserRepository =
  new PrismaAdminUserRepository();
