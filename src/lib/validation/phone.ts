/**
 * Chuan hoa va kiem tra so dien thoai di dong Viet Nam.
 *
 * Chap nhan cac dang nguoi dung hay nhap:
 *   0912 345 678 / 0912-345-678 / +84912345678 / 84912345678 / 84 912 345 678
 * Ket qua chuan hoa luon la 10 chu so bat dau bang so 0: 0912345678
 */

/** Cac dau so di dong hop le tai Viet Nam (sau khi chuan hoa ve 0xx). */
export const VN_MOBILE_PREFIXES = [
  // Viettel
  '032',
  '033',
  '034',
  '035',
  '036',
  '037',
  '038',
  '039',
  '086',
  '096',
  '097',
  '098',
  // Vinaphone
  '081',
  '082',
  '083',
  '084',
  '085',
  '088',
  '091',
  '094',
  // MobiFone
  '070',
  '076',
  '077',
  '078',
  '079',
  '089',
  '090',
  '093',
  // Vietnamobile
  '052',
  '056',
  '058',
  '092',
  // Gmobile
  '059',
  '099',
] as const;

/** Bo moi ky tu khong phai chu so, giu dau + o dau neu co. */
function stripFormatting(input: string): string {
  const trimmed = input.trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');
  return hasPlus ? `+${digits}` : digits;
}

/**
 * Chuan hoa so dien thoai ve dang `0xxxxxxxxx`.
 * Tra ve `null` neu khong the chuan hoa thanh so di dong VN hop le.
 */
export function normalizeVietnamesePhone(input: string): string | null {
  if (typeof input !== 'string') return null;

  let value = stripFormatting(input);
  if (value.length === 0) return null;

  // Tien to quay so quoc te 00 -> quy ve dang +
  if (value.startsWith('00')) {
    value = `+${value.slice(2)}`;
  }

  // +84... hoac 84... -> 0...
  if (value.startsWith('+84')) {
    value = `0${value.slice(3)}`;
  } else if (value.startsWith('84') && value.length === 11) {
    value = `0${value.slice(2)}`;
  }

  if (!/^0\d{9}$/.test(value)) return null;

  const prefix = value.slice(0, 3);
  if (
    !VN_MOBILE_PREFIXES.includes(prefix as (typeof VN_MOBILE_PREFIXES)[number])
  ) {
    return null;
  }

  return value;
}

/** Kiem tra nhanh mot chuoi co phai so di dong VN hop le hay khong. */
export function isValidVietnamesePhone(input: string): boolean {
  return normalizeVietnamesePhone(input) !== null;
}

/** Hien thi de doc: 0912345678 -> 0912 345 678 */
export function formatVietnamesePhone(input: string): string {
  const normalized = normalizeVietnamesePhone(input);
  if (!normalized) return input;
  return `${normalized.slice(0, 4)} ${normalized.slice(4, 7)} ${normalized.slice(7)}`;
}

/** Dang quoc te dung cho link `tel:` va Zalo: 0912345678 -> +84912345678 */
export function toInternationalPhone(input: string): string | null {
  const normalized = normalizeVietnamesePhone(input);
  if (!normalized) return null;
  return `+84${normalized.slice(1)}`;
}
