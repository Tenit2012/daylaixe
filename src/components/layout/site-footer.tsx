import Link from 'next/link';
import { Clock, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { ZaloIcon } from '@/components/ui/zalo-icon';
import { FacebookIcon } from '@/components/ui/facebook-icon';
import { legalNav, mainNav, siteConfig } from '@/config/site';
import {
  buildEmailHref,
  buildExternalHref,
  buildMapsHref,
  buildPhoneHref,
  buildZaloHref,
} from '@/lib/utils/cta-links';
import { formatVietnamesePhone } from '@/lib/validation/phone';
import { BrandMark } from '@/components/ui/brand-mark';
import { TrackedLink } from '@/components/ui/tracked-link';
import { AnalyticsEvent, CtaLocation } from '@/lib/analytics/events';
import { isPlaceholderValue } from '@/config/site';

export function SiteFooter() {
  const phoneHref = buildPhoneHref(siteConfig.contact.phone);
  const zaloHref = buildZaloHref(
    siteConfig.contact.zaloUrl,
    siteConfig.contact.phone,
  );
  const emailHref = buildEmailHref(siteConfig.contact.email);
  const mapsHref = buildMapsHref(siteConfig.contact.googleMapsUrl);
  const facebookHref = buildExternalHref(siteConfig.contact.facebookUrl);
  const youtubeHref = buildExternalHref(siteConfig.contact.youtubeUrl);

  const hasCenterName = !isPlaceholderValue(siteConfig.teacher.centerName);
  const addressText = isPlaceholderValue(siteConfig.contact.address)
    ? 'Địa chỉ sẽ được cập nhật'
    : siteConfig.contact.address;
  const hoursText = isPlaceholderValue(siteConfig.contact.hours)
    ? 'Vui lòng nhắn tin, thầy sẽ phản hồi sớm nhất'
    : siteConfig.contact.hours;

  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Cot 1: thuong hieu */}
          <div>
            <div className="flex items-center gap-2.5 text-white">
              <BrandMark tone="onDark" className="h-9 w-9" />
              <span className="text-base font-bold">
                {siteConfig.brandName}
              </span>
            </div>

            {/*
              Noi thay day, dat ngay duoi ten.

              Truoc day cot nay chi co ten + mot doan mo ta chung chung, khong
              he neu ten trung tam - trong khi day la thong tin quyet dinh long
              tin cua nguoi doc. Footer co nguyen mot cot nen dung duoc TEN DAY
              DU, khong phai ban rut gon nhu tren header.
            */}
            {hasCenterName ? (
              <p className="mt-3.5 border-l-2 border-accent-500 pl-3 text-sm leading-relaxed text-white">
                <span className="font-semibold">
                  {siteConfig.teacher.employmentStatus}
                </span>
                <span className="mt-0.5 block text-brand-200">
                  {siteConfig.teacher.centerName}
                </span>
              </p>
            ) : null}

            <p className="mt-4 text-sm leading-relaxed text-brand-200">
              {siteConfig.messaging.secondary}
            </p>
            {(facebookHref || youtubeHref) && (
              <div className="mt-5 flex items-center gap-3">
                {facebookHref ? (
                  <TrackedLink
                    href={facebookHref}
                    event={AnalyticsEvent.ClickFacebook}
                    location={CtaLocation.Footer}
                    aria-label="Trang Facebook"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </TrackedLink>
                ) : null}
                {youtubeHref ? (
                  <TrackedLink
                    href={youtubeHref}
                    event={AnalyticsEvent.ClickYoutube}
                    location={CtaLocation.Footer}
                    aria-label="Kênh YouTube"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <Youtube aria-hidden="true" className="h-4 w-4" />
                  </TrackedLink>
                ) : null}
              </div>
            )}
          </div>

          {/* Cot 2: lien he */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Liên hệ
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-300"
                />
                {phoneHref ? (
                  <TrackedLink
                    href={phoneHref}
                    event={AnalyticsEvent.ContactPhone}
                    location={CtaLocation.Footer}
                    className="hover:text-white hover:underline"
                  >
                    {formatVietnamesePhone(siteConfig.contact.phone)}
                  </TrackedLink>
                ) : (
                  <span className="text-brand-300">
                    Số điện thoại đang cập nhật
                  </span>
                )}
              </li>
              <li className="flex items-start gap-2.5">
                <ZaloIcon className="mt-0.5 h-4 w-4" />
                {zaloHref ? (
                  <TrackedLink
                    href={zaloHref}
                    event={AnalyticsEvent.ContactZalo}
                    location={CtaLocation.Footer}
                    className="hover:text-white hover:underline"
                  >
                    Nhắn Zalo cho thầy
                  </TrackedLink>
                ) : (
                  <span className="text-brand-300">Zalo đang cập nhật</span>
                )}
              </li>
              <li className="flex items-start gap-2.5">
                <Mail
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-300"
                />
                {emailHref ? (
                  <TrackedLink
                    href={emailHref}
                    event={AnalyticsEvent.ClickEmail}
                    location={CtaLocation.Footer}
                    className="break-all hover:text-white hover:underline"
                  >
                    {siteConfig.contact.email}
                  </TrackedLink>
                ) : (
                  <span className="text-brand-300">Email đang cập nhật</span>
                )}
              </li>
              <li className="flex items-start gap-2.5">
                <Clock
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-300"
                />
                <span>{hoursText}</span>
              </li>
            </ul>
          </div>

          {/* Cot 3: dia diem */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Khu vực đào tạo
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-300"
                />
                <span>{addressText}</span>
              </li>
              {mapsHref ? (
                <li>
                  <TrackedLink
                    href={mapsHref}
                    event={AnalyticsEvent.ClickGoogleMap}
                    location={CtaLocation.Footer}
                    className="inline-flex items-center gap-1.5 text-accent-300 hover:text-accent-200 hover:underline"
                  >
                    Xem trên Google Maps
                  </TrackedLink>
                </li>
              ) : null}
              <li className="text-brand-200">
                Khu vực nhận học viên: {siteConfig.contact.trainingArea}
              </li>
            </ul>
          </div>

          {/* Cot 4: lien ket nhanh */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Liên kết nhanh
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer bat buoc */}
        <div className="mt-10 rounded-card border border-white/15 bg-white/[0.04] p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Lưu ý quan trọng
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-200">
            {siteConfig.disclaimer}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.brandName}. Trang thông tin
            cá nhân.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-white hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
