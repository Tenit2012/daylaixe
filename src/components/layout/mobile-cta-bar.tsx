'use client';

import { Phone } from 'lucide-react';
import { ZaloIcon } from '@/components/ui/zalo-icon';
import { FacebookIcon } from '@/components/ui/facebook-icon';
import { siteConfig } from '@/config/site';
import {
  buildExternalHref,
  buildPhoneHref,
  buildZaloHref,
} from '@/lib/utils/cta-links';
import { trackEvent } from '@/lib/analytics/track';
import { AnalyticsEvent } from '@/lib/analytics/events';
import { cn } from '@/lib/utils/cn';

/**
 * Thanh CTA co dinh o day man hinh, chi hien tren mobile/tablet.
 *
 * Khong che footer: `body` da co `padding-bottom` bang bien
 * --mobile-cta-height (khai bao trong globals.css).
 *
 * So cot tu dieu chinh theo so kenh da cau hinh - neu chua khai bao
 * NEXT_PUBLIC_FACEBOOK_URL thi thanh nay chi con hai cot.
 */
const tileClasses =
  'flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-semibold ' +
  'transition-[color,background-color,transform] duration-150 active:scale-[0.97] motion-reduce:active:scale-100';

export function MobileCtaBar() {
  const phoneHref = buildPhoneHref(siteConfig.contact.phone);
  const zaloHref = buildZaloHref(
    siteConfig.contact.zaloUrl,
    siteConfig.contact.phone,
  );
  const facebookHref = buildExternalHref(siteConfig.contact.facebookUrl);

  return (
    <div
      className="bg-surface/98 fixed inset-x-0 bottom-0 z-40 border-t border-line shadow-sticky backdrop-blur lg:hidden"
      style={{ minHeight: 'var(--mobile-cta-height)' }}
    >
      <nav
        aria-label="Liên hệ nhanh"
        className={cn(
          'mx-auto grid max-w-content gap-2 px-3 py-2.5',
          facebookHref ? 'grid-cols-3' : 'grid-cols-2',
        )}
      >
        {phoneHref ? (
          <a
            href={phoneHref}
            onClick={() =>
              trackEvent(AnalyticsEvent.ClickPhone, { location: 'mobile_bar' })
            }
            className={cn(
              tileClasses,
              'bg-accent-500 text-white hover:bg-accent-600',
            )}
          >
            <Phone aria-hidden="true" className="h-5 w-5" />
            Gọi ngay
          </a>
        ) : (
          <span
            className={cn(tileClasses, 'bg-surface-sunken text-ink-subtle')}
          >
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
            className={cn(tileClasses, 'bg-zalo text-white hover:bg-zalo-dark')}
          >
            <ZaloIcon className="h-5 w-5" />
            Nhắn Zalo
          </a>
        ) : (
          <span
            className={cn(tileClasses, 'bg-surface-sunken text-ink-subtle')}
          >
            <ZaloIcon className="h-5 w-5" />
            Đang cập nhật
          </span>
        )}

        {facebookHref ? (
          <a
            href={facebookHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent(AnalyticsEvent.ClickFacebook, {
                location: 'mobile_bar',
              })
            }
            className={cn(
              tileClasses,
              'bg-facebook text-white hover:bg-facebook-dark',
            )}
          >
            <FacebookIcon className="h-5 w-5" />
            Facebook
          </a>
        ) : null}
      </nav>
    </div>
  );
}
