/**
 * Lam sach du lieu text nguoi dung nhap truoc khi luu hoac hien thi.
 *
 * Website khong bao gio render HTML tho tu nguoi dung (khong dung
 * dangerouslySetInnerHTML voi du lieu lead), nen muc tieu o day la:
 *  - Bo ky tu dieu khien va zero-width.
 *  - Gom khoang trang thua.
 *  - Chan cac chuoi de gay CSV formula injection khi export.
 *  - Gioi han do dai truoc khi ghi database.
 */

const ch = (code: number): string => String.fromCharCode(code);

/** Ky tu dieu khien C0 - loai bo hoan toan (ke ca xuong dong). */
const CONTROL_CHARS = new RegExp(
  `[${ch(0)}-${ch(8)}${ch(11)}${ch(12)}${ch(14)}-${ch(31)}${ch(127)}]`,
  'g',
);

/** Nhu tren nhung GIU lai ky tu xuong dong (char code 10). */
const CONTROL_CHARS_KEEP_NEWLINE = new RegExp(
  `[${ch(0)}-${ch(9)}${ch(11)}${ch(12)}${ch(14)}-${ch(31)}${ch(127)}]`,
  'g',
);

/** Zero-width space / non-joiner / joiner / BOM. */
const ZERO_WIDTH = new RegExp(`[${ch(0x200b)}-${ch(0x200d)}${ch(0xfeff)}]`, 'g');

/** Chuan hoa mot dong text (ho ten, khu vuc...). */
export function sanitizeText(input: unknown, maxLength = 500): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(CONTROL_CHARS, '')
    .replace(ZERO_WIDTH, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/** Chuan hoa text nhieu dong (ghi chu) - giu ky tu xuong dong. */
export function sanitizeMultilineText(input: unknown, maxLength = 2000): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(CONTROL_CHARS_KEEP_NEWLINE, '')
    .replace(ZERO_WIDTH, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxLength);
}

/**
 * Chan CSV/Excel formula injection khi xuat du lieu lead ra file.
 * Gia tri bat dau bang `=`, `+`, `-`, `@`, tab hoac CR se duoc them dau nhay don.
 */
export function escapeSpreadsheetValue(value: string): string {
  if (/^[=+\-@\t\r]/.test(value)) return `'${value}`;
  return value;
}

/**
 * Chi cho phep redirect noi bo (bat dau bang dung mot dau `/`),
 * tranh lo hong open-redirect qua tham so `?next=`.
 */
export function sanitizeInternalPath(
  input: unknown,
  fallback = '/admin/leads',
): string {
  if (typeof input !== 'string') return fallback;
  const value = input.trim();
  if (!value.startsWith('/')) return fallback;
  if (value.startsWith('//')) return fallback;
  if (value.includes('\\')) return fallback;
  // Regex rieng khong co co `g` vi `.test()` tren regex global la stateful.
  const hasControlChar = new RegExp(`[${ch(0)}-${ch(31)}${ch(127)}]`).test(
    value,
  );
  if (hasControlChar) return fallback;
  return value;
}
