'use client';

import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';
import {
  buildMapsHref,
  buildPhoneHref,
  buildZaloHref,
} from '@/lib/utils/cta-links';
import { formatVietnamesePhone } from '@/lib/validation/phone';
import { trackEvent } from '@/lib/analytics/track';
import { AnalyticsEvent } from '@/lib/analytics/events';
import { buttonClasses } from './button';
import { cn } from '@/lib/utils/cn';

type Size = 'sm' | 'md' | 'lg';

interface CtaProps {
  location: string;
  size?: Size;
  className?: string;
  label?: string;
}

/**
 * Nut goi dien. Duong dan lay tu config; neu chua cau hinh thi khong
 * render nut hong ma hien thi trang thai "dang cap nhat".
 */
export function CallButton({
  location,
  size = 'md',
  className,
  label,
}: CtaProps) {
  const href = buildPhoneHref(siteConfig.contact.phone);
  const text =
    label ?? `Gọi ${formatVietnamesePhone(siteConfig.contact.phone)}`;

  if (!href) {
    return (
      <span
        className={cn(
          buttonClasses('outline', size, className),
          'cursor-not-allowed opacity-60',
        )}
      >
        <Phone aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" />
        Số điện thoại đang cập nhật
      </span>
    );
  }

  return (
    <a
      href={href}
      onClick={() => trackEvent(AnalyticsEvent.ClickPhone, { location })}
      className={buttonClasses('primary', size, className)}
    >
      <Phone aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" />
      {text}
    </a>
  );
}

/** Nut nhan Zalo. */
export function ZaloButton({
  location,
  size = 'md',
  className,
  label = 'Nhắn Zalo cho thầy',
}: CtaProps) {
  const href = buildZaloHref(
    siteConfig.contact.zaloUrl,
    siteConfig.contact.phone,
  );

  if (!href) {
    return (
      <span
        className={cn(
          buttonClasses('outline', size, className),
          'cursor-not-allowed opacity-60',
        )}
      >
        <MessageCircle aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" />
        Zalo đang cập nhật
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent(AnalyticsEvent.ClickZalo, { location })}
      className={buttonClasses('success', size, className)}
    >
      <MessageCircle aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" />
      {label}
    </a>
  );
}

/** Link mo Google Maps. */
export function MapsLink({
  location,
  className,
  label = 'Xem trên Google Maps',
}: {
  location: string;
  className?: string;
  label?: string;
}) {
  const href = buildMapsHref(siteConfig.contact.googleMapsUrl);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent(AnalyticsEvent.ClickMaps, { location })}
      className={cn(
        'inline-flex items-center gap-1.5 rounded text-sm font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900',
        className,
      )}
    >
      <MapPin aria-hidden="true" className="h-4 w-4" />
      {label}
    </a>
  );
}
