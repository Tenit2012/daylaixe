import { siteConfig } from '@/config/site';
import type { AnalyticsEventName, AnalyticsPayload } from './events';

/**
 * Lop truu tuong cho analytics.
 *
 * Nguyen tac: website PHAI chay binh thuong khi chua cau hinh analytics.
 * Moi ham o day deu no-op an toan neu thieu cau hinh hoac dang chay o server.
 */

interface WindowWithAnalytics extends Window {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
  fbq?: (...args: unknown[]) => void;
}

function getWindow(): WindowWithAnalytics | null {
  if (typeof window === 'undefined') return null;
  return window as WindowWithAnalytics;
}

/** Google Analytics 4 da duoc cau hinh chua. */
export function isGaEnabled(): boolean {
  return siteConfig.analytics.gaMeasurementId.trim().length > 0;
}

/** Facebook Pixel da duoc bat chua (mac dinh TAT). */
export function isFacebookPixelEnabled(): boolean {
  return siteConfig.analytics.facebookPixelEnabled;
}

/**
 * Gui mot su kien den moi provider dang bat.
 * An toan khi goi tu bat ky dau - khong bao gio throw.
 */
export function trackEvent(
  name: AnalyticsEventName,
  payload: AnalyticsPayload = {},
): void {
  const win = getWindow();
  if (!win) return;

  const cleanPayload = Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  );

  try {
    if (isGaEnabled() && typeof win.gtag === 'function') {
      win.gtag('event', name, cleanPayload);
    }

    if (isFacebookPixelEnabled() && typeof win.fbq === 'function') {
      win.fbq('trackCustom', name, cleanPayload);
    }

    if (process.env.NODE_ENV === 'development' && !isGaEnabled()) {
      // Giup kiem tra su kien khi chua gan GA - chi o moi truong dev.
      // eslint-disable-next-line no-console
      console.debug('[analytics]', name, cleanPayload);
    }
  } catch {
    // Analytics khong bao gio duoc lam hong trai nghiem nguoi dung.
  }
}

/** Gui page_view thu cong (dung khi dieu huong client-side). */
export function trackPageView(path: string): void {
  const win = getWindow();
  if (!win) return;
  if (!isGaEnabled() || typeof win.gtag !== 'function') return;

  try {
    win.gtag('event', 'page_view', {
      page_path: path,
      page_location: win.location?.href,
    });
  } catch {
    // bo qua
  }
}
