import bcrypt from 'bcryptjs';

/**
 * Bam va kiem tra mat khau.
 * Mat khau KHONG BAO GIO duoc luu hoac ghi log duoi dang plain text.
 */

const SALT_ROUNDS = 12;

export async function hashPassword(plainPassword: string): Promise<string> {
  if (typeof plainPassword !== 'string' || plainPassword.length === 0) {
    throw new Error('Mat khau khong duoc de trong');
  }
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

/**
 * So sanh mat khau voi hash. Tra ve `false` thay vi nem loi khi hash sai
 * dinh dang, de flow dang nhap khong lo thong tin ve nguyen nhan that bai.
 */
export async function verifyPassword(
  plainPassword: string,
  passwordHash: string,
): Promise<boolean> {
  if (typeof plainPassword !== 'string' || typeof passwordHash !== 'string') {
    return false;
  }
  if (plainPassword.length === 0 || passwordHash.length === 0) return false;

  try {
    return await bcrypt.compare(plainPassword, passwordHash);
  } catch {
    return false;
  }
}
