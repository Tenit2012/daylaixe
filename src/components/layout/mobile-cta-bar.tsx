'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardList, Phone } from 'lucide-react';
import { ZaloIcon } from '@/components/ui/zalo-icon';
import { siteConfig } from '@/config/site';
import { buildPhoneHref, buildZaloHref } from '@/lib/utils/cta-links';
import { trackEvent } from '@/lib/analytics/track';
import { AnalyticsEvent } from '@/lib/analytics/events';

/**
 * Thanh CTA co dinh o day man hinh, chi hien tren mobile/tablet.
 *
 * Khong che footer hay nut submit: `body` da co `padding-bottom` bang
 * bien --mobile-cta-height (khai bao trong globals.css).
 * An o trang quan tri de khong vuong bang du lieu.
 */
export function MobileCtaBar() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) return null;

  const phoneHref = buildPhoneHref(siteConfig.contact.phone);
  const zaloHref = buildZaloHref(
    siteConfig.contact.zaloUrl,
    siteConfig.contact.phone,
  );

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/98 shadow-sticky backdrop-blur lg:hidden"
      style={{ minHeight: 'var(--mobile-cta-height)' }}
    >
      <nav
        aria-label="Liên hệ nhanh"
        className="mx-auto grid max-w-content grid-cols-3 gap-2 px-3 py-2.5"
      >
        {phoneHref ? (
          <a
            href={phoneHref}
            onClick={() =>
              trackEvent(AnalyticsEvent.ClickPhone, { location: 'mobile_bar' })
            }
            className="flex flex-col items-center justify-center gap-1 rounded-xl bg-accent-500 px-2 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-600"
          >
            <Phone aria-hidden="true" className="h-5 w-5" />
            Gọi ngay
          </a>
        ) : (
          <span className="flex flex-col items-center justify-center gap-1 rounded-xl bg-surface-sunken px-2 py-2 text-xs font-semibold text-ink-subtle">
            <Phone aria-hidden="true" className="h-5 w-5" />
            Đang cập nhật
          </span>
        )}

        {zaloHref ? (
          <a
            href={zaloHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent(AnalyticsEvent.ClickZalo, { location: 'mobile_bar' })
            }
            className="flex flex-col items-center justify-center gap-1 rounded-xl bg-zalo px-2 py-2 text-xs font-semibold text-white transition-colors hover:bg-zalo-dark"
          >
            <ZaloIcon className="h-5 w-5" />
            Nhắn Zalo
          </a>
        ) : (
          <span className="flex flex-col items-center justify-center gap-1 rounded-xl bg-surface-sunken px-2 py-2 text-xs font-semibold text-ink-subtle">
            <ZaloIcon tone="onLight" className="h-5 w-5" />
            Đang cập nhật
          </span>
        )}

        <Link
          href="/lien-he#dang-ky"
          onClick={() =>
            trackEvent(AnalyticsEvent.OpenForm, { location: 'mobile_bar' })
          }
          className="flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-brand-700 px-2 py-2 text-xs font-semibold text-brand-800 transition-colors hover:bg-brand-50"
        >
          <ClipboardList aria-hidden="true" className="h-5 w-5" />
          Đăng ký
        </Link>
      </nav>
    </div>
  );
}
