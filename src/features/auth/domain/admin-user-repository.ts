import type { AdminRole } from './session';

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt: Date | null;
}

export interface AdminUserRepository {
  findByEmail(email: string): Promise<AdminUser | null>;
  recordLogin(id: string, at: Date): Promise<void>;
}
