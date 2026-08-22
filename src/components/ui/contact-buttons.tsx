'use client';

import { MapPin, Phone } from 'lucide-react';
import { ZaloIcon } from './zalo-icon';
import { FacebookIcon } from './facebook-icon';
import { siteConfig } from '@/config/site';
import {
  buildExternalHref,
  buildMapsHref,
  buildPhoneHref,
  buildZaloHref,
} from '@/lib/utils/cta-links';
import { formatVietnamesePhone } from '@/lib/validation/phone';
import { trackEvent } from '@/lib/analytics/track';
import { AnalyticsEvent, type CtaLocationName } from '@/lib/analytics/events';
import { trackAttributes } from '@/lib/analytics/attributes';
import { buttonClasses } from './button';
import { cn } from '@/lib/utils/cn';

type Size = 'sm' | 'md' | 'lg';

interface CtaProps {
  /**
   * Vi tri cua CTA tren giao dien. Kieu co rang buoc chu khong phai chuoi tu
   * do: mot nut "Nhan Zalo" xuat hien o gan chuc cho, chi can mot lan go sai
   * ("moblie_bar") la GA4 lang le tach thanh hai phan doan va bao cao "CTA
   * nao hieu qua nhat" tro nen sai ma khong ai biet.
   */
  location: CtaLocationName;
  /**
   * Slug khoa hoc gan voi CTA nay, neu co.
   *
   * VI SAO TACH RIENG KHOI `location`: truoc day cac trang khoa hoc truyen
   * `location={`course_${slug}`}`, tuc la gop CHO DAT NUT va NOI DUNG vao
   * cung mot tham so. Voi 5 khoa hoc x 3 vi tri + 18 bai viet, GA4 nhan 33
   * gia tri `location` khac nhau - bao cao "CTA nao hieu qua nhat" tro nen
   * vo dung vi moi dong chi con vai luot. Tach ra thi doc duoc ca hai chieu
   * doc lap: vi tri nao hieu qua, VA khoa hoc nao duoc quan tam.
   */
  course?: string;
  /** Slug bai viet gan voi CTA nay, neu co. */
  article?: string;
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
  course,
  article,
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
      onClick={() =>
        trackEvent(AnalyticsEvent.ContactPhone, { location, course, article })
      }
      {...trackAttributes(
        AnalyticsEvent.ContactPhone,
        location,
        course ?? article,
      )}
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
  course,
  article,
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
        <ZaloIcon />
        Zalo đang cập nhật
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent(AnalyticsEvent.ContactZalo, { location, course, article })
      }
      {...trackAttributes(
        AnalyticsEvent.ContactZalo,
        location,
        course ?? article,
      )}
      className={buttonClasses('zalo', size, className)}
    >
      <ZaloIcon />
      {label}
    </a>
  );
}

/**
 * Nut nhan qua Facebook.
 *
 * Khac voi Goi va Zalo: neu chua cau hinh URL thi KHONG render gi ca.
 * Ly do - so dien thoai va Zalo la kenh bat buoc nen can bao "dang cap nhat",
 * con Facebook la kenh bo sung, hien o trong se lam loang khoi CTA.
 */
export function FacebookButton({
  location,
  course,
  article,
  size = 'md',
  className,
  label = 'Nhắn Facebook',
}: CtaProps) {
  const href = buildExternalHref(siteConfig.contact.facebookUrl);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent(AnalyticsEvent.ClickFacebook, { location, course, article })
      }
      {...trackAttributes(
        AnalyticsEvent.ClickFacebook,
        location,
        course ?? article,
      )}
      className={buttonClasses('facebook', size, className)}
    >
      <FacebookIcon />
      {label}
    </a>
  );
}

/**
 * Nut "Den tu van tai trung tam" - mo chi duong Google Maps.
 *
 * Tach rieng khoi `MapsLink` (dang link chu) de dung o nhung noi can mot CTA
 * day du dang nut, phuc vu nhom nguoi doc muon kiem chung tan noi truoc khi
 * dang ky. Khong cau hinh Maps thi khong render - tot hon la mot nut chet.
 * Hien khong con noi nao goi component nay (da go khoi hero) - giu lai vi la
 * CTA hop le, co the dung lai o trang khac sau nay.
 */
export function VisitCenterButton({
  location,
  course,
  article,
  size = 'md',
  className,
  label = 'Đến tư vấn tại trung tâm',
}: CtaProps) {
  const href = buildMapsHref(siteConfig.contact.googleMapsUrl);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent(AnalyticsEvent.ClickGoogleMap, { location, course, article })
      }
      {...trackAttributes(AnalyticsEvent.ClickGoogleMap, location)}
      className={buttonClasses('outline', size, className)}
    >
      <MapPin aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" />
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
  location: CtaLocationName;
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
      onClick={() => trackEvent(AnalyticsEvent.ClickGoogleMap, { location })}
      {...trackAttributes(AnalyticsEvent.ClickGoogleMap, location)}
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
