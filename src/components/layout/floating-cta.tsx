'use client';

import { Phone } from 'lucide-react';
import { ZaloIcon } from '@/components/ui/zalo-icon';
import { siteConfig } from '@/config/site';
import { buildPhoneHref, buildZaloHref } from '@/lib/utils/cta-links';
import { trackEvent } from '@/lib/analytics/track';
import { AnalyticsEvent, CtaLocation } from '@/lib/analytics/events';
import { trackAttributes } from '@/lib/analytics/attributes';

/**
 * Nut lien he noi o goc phai man hinh - CHI hien tu breakpoint lg tro len.
 *
 * Duoi lg da co `MobileCtaBar` chay ngang day man hinh; hien ca hai se che
 * mat noi dung tren dien thoai. Hai component bo sung cho nhau chu khong
 * trung nhau:
 *   < lg  -> thanh ngang co dinh o day (MobileCtaBar)
 *   >= lg -> hai nut tron noi o goc (component nay)
 *
 * KHONG dung popup, khong tu bung, khong dem nguoc - chi la loi tat luon
 * trong tam mat.
 */
export function FloatingCta() {
  const phoneHref = buildPhoneHref(siteConfig.contact.phone);
  const zaloHref = buildZaloHref(
    siteConfig.contact.zaloUrl,
    siteConfig.contact.phone,
  );

  if (!phoneHref && !zaloHref) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden flex-col gap-3 lg:flex">
      {zaloHref ? (
        <a
          href={zaloHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent(AnalyticsEvent.ContactZalo, {
              location: CtaLocation.FloatingCta,
            })
          }
          {...trackAttributes(
            AnalyticsEvent.ContactZalo,
            CtaLocation.FloatingCta,
          )}
          className="group flex h-14 items-center gap-3 rounded-pill bg-zalo px-4 text-sm font-semibold text-white shadow-sticky transition-colors hover:bg-zalo-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zalo focus-visible:ring-offset-2"
        >
          <ZaloIcon className="h-6 w-6" />
          <span>Nhắn Zalo</span>
        </a>
      ) : null}

      {phoneHref ? (
        <a
          href={phoneHref}
          onClick={() =>
            trackEvent(AnalyticsEvent.ContactPhone, {
              location: CtaLocation.FloatingCta,
            })
          }
          {...trackAttributes(
            AnalyticsEvent.ContactPhone,
            CtaLocation.FloatingCta,
          )}
          className="group flex h-14 items-center gap-3 rounded-pill bg-accent-500 px-4 text-sm font-semibold text-white shadow-sticky transition-colors hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
        >
          <Phone aria-hidden="true" className="h-6 w-6" />
          <span>Gọi ngay</span>
        </a>
      ) : null}
    </div>
  );
}
