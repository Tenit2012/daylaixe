import Link from 'next/link';
import {
  Car,
  Clock,
  Facebook,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from 'lucide-react';
import { legalNav, mainNav, siteConfig } from '@/config/site';
import {
  buildEmailHref,
  buildExternalHref,
  buildMapsHref,
  buildPhoneHref,
  buildZaloHref,
} from '@/lib/utils/cta-links';
import { formatVietnamesePhone } from '@/lib/validation/phone';
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
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <Car aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="text-base font-bold">{siteConfig.brandName}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-brand-200">
              {siteConfig.messaging.secondary}
            </p>
            {(facebookHref || youtubeHref) && (
              <div className="mt-5 flex items-center gap-3">
                {facebookHref ? (
                  <a
                    href={facebookHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Trang Facebook"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <Facebook aria-hidden="true" className="h-4 w-4" />
                  </a>
                ) : null}
                {youtubeHref ? (
                  <a
                    href={youtubeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Kênh YouTube"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <Youtube aria-hidden="true" className="h-4 w-4" />
                  </a>
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
                <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-300" />
                {phoneHref ? (
                  <a href={phoneHref} className="hover:text-white hover:underline">
                    {formatVietnamesePhone(siteConfig.contact.phone)}
                  </a>
                ) : (
                  <span className="text-brand-300">Số điện thoại đang cập nhật</span>
                )}
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-300" />
                {zaloHref ? (
                  <a
                    href={zaloHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    Nhắn Zalo cho thầy
                  </a>
                ) : (
                  <span className="text-brand-300">Zalo đang cập nhật</span>
                )}
              </li>
              <li className="flex items-start gap-2.5">
                <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-300" />
                {emailHref ? (
                  <a href={emailHref} className="break-all hover:text-white hover:underline">
                    {siteConfig.contact.email}
                  </a>
                ) : (
                  <span className="text-brand-300">Email đang cập nhật</span>
                )}
              </li>
              <li className="flex items-start gap-2.5">
                <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-300" />
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
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-300" />
                <span>{addressText}</span>
              </li>
              {mapsHref ? (
                <li>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-accent-300 hover:text-accent-200 hover:underline"
                  >
                    Xem trên Google Maps
                  </a>
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
                  <Link href={item.href} className="hover:text-white hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white hover:underline">
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
                <Link href={item.href} className="hover:text-white hover:underline">
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
