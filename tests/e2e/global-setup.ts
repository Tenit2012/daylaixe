import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { E2E_DATABASE_FILE, E2E_ENV } from './helpers/db';

/**
 * Chuan bi database rieng cho E2E truoc khi chay test.
 *
 * Quy trinh:
 *  1. Xoa file prisma/e2e.db (neu co) de moi lan chay deu bat dau tu trang thai sach.
 *  2. `prisma db push` tao lai schema tren file rong.
 *  3. `prisma db seed` tao tai khoan quan tri va vai lead mau.
 *
 * PHAM VI: chi tac dong len prisma/e2e.db. Database phat trien (prisma/dev.db)
 * va moi database khac khong bi dung toi - DATABASE_URL duoc ep cung thanh
 * "file:./e2e.db" trong E2E_ENV.
 */
export default function globalSetup(): void {
  const options = {
    env: E2E_ENV,
    stdio: 'inherit' as const,
    cwd: process.cwd(),
  };

  // Xoa database E2E cu (ke ca file journal cua SQLite).
  for (const file of [
    E2E_DATABASE_FILE,
    `${E2E_DATABASE_FILE}-journal`,
    `${E2E_DATABASE_FILE}-wal`,
    `${E2E_DATABASE_FILE}-shm`,
  ]) {
    if (existsSync(file)) {
      rmSync(file);
    }
  }
  console.log('[e2e] Da xoa database E2E cu (neu co).');

  console.log('[e2e] Tao schema cho database E2E (prisma/e2e.db)...');
  execSync('npx prisma db push --skip-generate', options);

  console.log('[e2e] Seed du lieu E2E...');
  execSync('npx prisma db seed', options);

  console.log('[e2e] Database E2E da san sang.');
}
