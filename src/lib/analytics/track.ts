import { siteConfig } from '@/config/site';
import type { AnalyticsEventName, AnalyticsPayload } from './events';

/**
 * Lop truu tuong cho analytics.
 *
 * KIEN TRUC:  Website  ->  Google Tag Manager  ->  Google Analytics 4
 *
 * Ma nguon KHONG goi thang GA4. No chi day su kien vao `dataLayer`; GTM doc
 * `dataLayer` roi quyet dinh chuyen tiep di dau. Nho vay them mot cong cu do
 * luong moi (Google Ads, Facebook CAPI...) chi la viec cau hinh trong GTM,
 * khong phai sua va build lai website.
 *
 * CHE DO DU PHONG: neu chua cau hinh GTM nhung DA co ma do GA4, ma nguon goi
 * thang `gtag` de khong mat du lieu trong giai doan chuyen tiep.
 *
 * Nguyen tac bat bien: website PHAI chay binh thuong khi chua cau hinh gi ca.
 * Moi ham o day deu khong lam gi mot cach an toan neu thieu cau hinh hoac
 * dang chay o phia may chu, va khong bao gio nem loi.
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

/** Google Tag Manager da duoc cau hinh chua. */
export function isGtmEnabled(): boolean {
  return siteConfig.analytics.gtmId.trim().length > 0;
}

/** Google Analytics 4 da duoc cau hinh chua (ma do gan truc tiep). */
export function isGaEnabled(): boolean {
  return siteConfig.analytics.gaMeasurementId.trim().length > 0;
}

/**
 * Co nen gan gtag.js truc tiep khong.
 *
 * DAY LA CHOT CHAN VIEC DEM HAI LAN. Neu GTM da chay va ben trong GTM co the
 * GA4 (cach cau hinh tieu chuan), ma website lai gan them gtag.js nua, thi
 * MOI luot xem trang va MOI su kien deu duoc dem hai lan. Bao cao se phong
 * len gap doi ma khong co dau hieu bao loi nao - kieu sai nguy hiem nhat vi
 * no trong nhu that.
 *
 * Vi vay: co GTM thi GTM la duong duy nhat.
 */
export function shouldLoadDirectGa(): boolean {
  return isGaEnabled() && !isGtmEnabled();
}

/** Facebook Pixel da duoc bat chua (mac dinh TAT). */
export function isFacebookPixelEnabled(): boolean {
  return siteConfig.analytics.facebookPixelEnabled;
}

/** Bo cac truong `undefined` de khong day khoa rong sang GA4. */
function clean(payload: AnalyticsPayload): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  );
}

/**
 * Gui mot su kien den lop do luong dang bat.
 * An toan khi goi tu bat ky dau - khong bao gio throw.
 */
export function trackEvent(
  name: AnalyticsEventName,
  payload: AnalyticsPayload = {},
): void {
  const win = getWindow();
  if (!win) return;

  const data = clean(payload);

  try {
    if (isGtmEnabled()) {
      /*
        Duong chinh. GTM doc khoa `event` de kich hoat Trigger; cac khoa con
        lai tro thanh Data Layer Variable dung duoc trong Tag.
      */
      win.dataLayer = win.dataLayer || [];
      win.dataLayer.push({ event: name, ...data });
    } else if (isGaEnabled() && typeof win.gtag === 'function') {
      // Du phong khi chua co GTM - xem ghi chu o shouldLoadDirectGa().
      win.gtag('event', name, data);
    }

    if (isFacebookPixelEnabled() && typeof win.fbq === 'function') {
      win.fbq('trackCustom', name, data);
    }

    if (
      process.env.NODE_ENV === 'development' &&
      !isGtmEnabled() &&
      !isGaEnabled()
    ) {
      // Giup kiem tra su kien khi chua gan ma do - chi o moi truong dev.
      // eslint-disable-next-line no-console
      console.debug('[analytics]', name, data);
    }
  } catch {
    // Analytics khong bao gio duoc lam hong trai nghiem nguoi dung.
  }
}

/**
 * Gui luot xem trang khi nguoi dung dieu huong trong ung dung.
 *
 * CHI dung cho dieu huong PHIA TRINH DUYET. Luot xem dau tien da duoc dem
 * boi chinh the GTM/gtag luc tai trang; goi lai o day se thanh dem hai lan.
 * Xem `AnalyticsRouteTracker` de biet cach lan dau duoc bo qua.
 */
export function trackPageView(path: string): void {
  const win = getWindow();
  if (!win) return;

  try {
    if (isGtmEnabled()) {
      win.dataLayer = win.dataLayer || [];
      /*
        Ten `spa_page_view` co y KHONG phai `page_view`.

        Ly do: trong GTM, the cau hinh GA4 thuong da bat san "Send a page view
        event when this configuration loads". Neu day them mot su kien ten
        `page_view` nua thi GA4 nhan hai luot cho cung mot lan dieu huong.
        Dat ten rieng de nguoi cau hinh GTM CHU DONG tao mot the GA4 Event
        rieng cho no - xem huong dan trong docs/analytics-tracking.md.
      */
      win.dataLayer.push({
        event: 'spa_page_view',
        page_path: path,
        page_location: win.location?.href,
        page_title: document?.title,
      });
      return;
    }

    if (isGaEnabled() && typeof win.gtag === 'function') {
      win.gtag('event', 'page_view', {
        page_path: path,
        page_location: win.location?.href,
        page_title: document?.title,
      });
    }
  } catch {
    // bo qua
  }
}
