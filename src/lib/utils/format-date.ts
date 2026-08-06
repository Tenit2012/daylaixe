/**
 * Dinh dang ngay thang theo tieng Viet.
 * Dung `Intl` voi timezone co dinh de server va client render giong nhau
 * (tranh loi hydration).
 */

const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'Asia/Ho_Chi_Minh',
});

const dateTimeFormatter = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Asia/Ho_Chi_Minh',
});

export function formatVietnameseDate(input: string | Date): string {
  const date = typeof input === 'string' ? new Date(input) : input;
  if (Number.isNaN(date.getTime())) return '';
  return dateFormatter.format(date);
}

export function formatVietnameseDateTime(input: string | Date): string {
  const date = typeof input === 'string' ? new Date(input) : input;
  if (Number.isNaN(date.getTime())) return '';
  return dateTimeFormatter.format(date);
}

/** Chuoi yyyy-mm-dd dung cho thuoc tinh `datetime` va input type="date". */
export function toIsoDateString(input: Date): string {
  return input.toISOString().slice(0, 10);
}
