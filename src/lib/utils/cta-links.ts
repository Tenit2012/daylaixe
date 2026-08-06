import { isPlaceholderValue } from '@/config/site';
import {
  normalizeVietnamesePhone,
  toInternationalPhone,
} from '@/lib/validation/phone';

/**
 * Tao cac duong dan CTA (goi dien / Zalo) tu gia tri trong config.
 * Khi config van con placeholder, tra ve `null` de UI vo hieu hoa nut
 * thay vi tao link hong.
 */

/** `tel:` URL. Uu tien dang quoc te de goi duoc tu ca nuoc ngoai. */
export function buildPhoneHref(phone: string): string | null {
  if (!phone || isPlaceholderValue(phone)) return null;
  const international = toInternationalPhone(phone);
  if (international) return `tel:${international}`;

  // So co dinh hoac hotline dang 1900xxxx: giu nguyen chu so.
  const digits = phone.replace(/[^\d+]/g, '');
  return digits.length >= 8 ? `tel:${digits}` : null;
}

/** `sms:` URL - dung cho tinh huong khong goi duoc. */
export function buildSmsHref(phone: string): string | null {
  if (!phone || isPlaceholderValue(phone)) return null;
  const international = toInternationalPhone(phone);
  return international ? `sms:${international}` : null;
}

/**
 * Zalo URL.
 * - Neu config da co URL day du (https://zalo.me/...) thi dung nguyen.
 * - Neu config chi co so dien thoai thi tu tao https://zalo.me/<so>.
 * - Neu chua cau hinh, thu suy ra tu so dien thoai lien he.
 */
export function buildZaloHref(
  zaloUrl: string,
  fallbackPhone?: string,
): string | null {
  if (zaloUrl && !isPlaceholderValue(zaloUrl)) {
    if (/^https?:\/\//i.test(zaloUrl)) return zaloUrl;
    const normalized = normalizeVietnamesePhone(zaloUrl);
    if (normalized) return `https://zalo.me/${normalized}`;
    return null;
  }

  if (fallbackPhone && !isPlaceholderValue(fallbackPhone)) {
    const normalized = normalizeVietnamesePhone(fallbackPhone);
    if (normalized) return `https://zalo.me/${normalized}`;
  }

  return null;
}

/** URL Google Maps; tra ve null neu chua cau hinh. */
export function buildMapsHref(mapsUrl: string): string | null {
  if (!mapsUrl || isPlaceholderValue(mapsUrl)) return null;
  if (!/^https?:\/\//i.test(mapsUrl)) return null;
  return mapsUrl;
}

/** `mailto:` URL. */
export function buildEmailHref(email: string): string | null {
  if (!email || isPlaceholderValue(email)) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return `mailto:${email}`;
}

/** Link mang xa hoi; bo qua neu chua cau hinh hoac khong phai http(s). */
export function buildExternalHref(url: string): string | null {
  if (!url || isPlaceholderValue(url)) return null;
  return /^https?:\/\//i.test(url) ? url : null;
}
