/**
 * Tao (hoac cap nhat) tai khoan quan tri dau tien - AN TOAN CHO PRODUCTION.
 *
 * Chay:
 *   npm run admin:create
 *
 * Nguyen tac:
 *  - Email lay tu bien moi truong ADMIN_EMAIL. KHONG hard-code.
 *  - Mat khau lay tu ADMIN_PASSWORD; neu khong dat, script TU SINH mat khau
 *    ngau nhien manh va in ra MOT LAN o terminal (khong luu plain text o dau).
 *  - Mat khau luon duoc bam bcrypt (12 rounds) truoc khi ghi database.
 *  - KHONG tao lead demo. KHONG in credential ra bat ky UI nao.
 *  - Idempotent: chay lai se cap nhat mat khau cho email do (upsert).
 *
 * Yeu cau moi truong: DATABASE_URL tro toi PostgreSQL (Neon) da chay migration.
 */
import { randomBytes } from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;
const MIN_PASSWORD_LENGTH = 12;

/** Sinh mat khau ngau nhien de doc, an toan bang crypto. */
function generatePassword(): string {
  // base64url ~ 22 ky tu tu 16 byte, khong co ky tu gay roi khi copy.
  return randomBytes(16).toString('base64url');
}

function maskEmail(email: string): string {
  const [user = '', domain = ''] = email.split('@');
  const head = user.slice(0, 3);
  return `${head}${'*'.repeat(Math.max(1, user.length - head.length))}@${domain.replace(/^[^.]*/, '***')}`;
}

async function main(): Promise<void> {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!email) {
    throw new Error(
      'Thieu ADMIN_EMAIL. Dat bien moi truong ADMIN_EMAIL roi chay lai. Xem .env.example.',
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    throw new Error(`ADMIN_EMAIL khong hop le: ${email}`);
  }

  const provided = process.env.ADMIN_PASSWORD?.trim();
  let password = provided ?? '';
  let generated = false;

  if (!password) {
    password = generatePassword();
    generated = true;
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      `ADMIN_PASSWORD phai co it nhat ${MIN_PASSWORD_LENGTH} ky tu.`,
    );
  }
  if (password === 'change-me' || password === 'replace-me') {
    throw new Error('Khong duoc dung mat khau mac dinh. Dat ADMIN_PASSWORD that.');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const prisma = new PrismaClient();

  try {
    const user = await prisma.adminUser.upsert({
      where: { email },
      update: { passwordHash, isActive: true },
      create: {
        email,
        passwordHash,
        name: process.env.ADMIN_NAME?.trim() || 'Quản trị viên',
        role: 'OWNER',
        isActive: true,
      },
    });

    console.log('\n✅ Tai khoan quan tri da san sang.');
    console.log(`   Email : ${maskEmail(user.email)}`);
    if (generated) {
      // In DAY DU mat khau vua sinh MOT LAN duy nhat o terminal.
      // Luu lai ngay; script se khong the hien thi lai.
      console.log(`   Mat khau (luu ngay, chi hien 1 lan): ${password}`);
    } else {
      console.log('   Mat khau : (lay tu ADMIN_PASSWORD - khong in ra)');
    }
    console.log('   Vao trang quan tri tai: /admin/login\n');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(
    'Tao admin that bai:',
    error instanceof Error ? error.message : error,
  );
  process.exitCode = 1;
});
