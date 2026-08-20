'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, X } from 'lucide-react';
import { isPlaceholderValue, mainNav, siteConfig } from '@/config/site';
import { buildPhoneHref } from '@/lib/utils/cta-links';
import { formatVietnamesePhone } from '@/lib/validation/phone';
import { trackEvent } from '@/lib/analytics/track';
import { AnalyticsEvent } from '@/lib/analytics/events';
import { buttonClasses } from '@/components/ui/button';
import { BrandMark } from '@/components/ui/brand-mark';
import { cn } from '@/lib/utils/cn';

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const phoneHref = buildPhoneHref(siteConfig.contact.phone);
  const hasCenterName = !isPlaceholderValue(siteConfig.teacher.centerName);

  // Dong menu khi doi trang.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Khoa cuon trang khi menu mo tren mobile.
  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85">
      {/*
        Header dung khung rong hon phan noi dung (80rem thay vi 72rem) de
        7 muc menu, so dien thoai va nut CTA nam vua mot hang o 1280px.
      */}
      <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3 lg:h-[4.5rem]">
          {/*
            Khoi thuong hieu.

            Dong phu TRUOC DAY la "Tu van & huong dan hoc lai xe" - dung nhung
            vo nghia: bat ky trung tam nao cung viet duoc cau do. Header la
            phan DINH tren moi trang va moi lan cuon, tuc la cho dat nhat cua
            website; dung no cho mot cau chung chung la lang phi.

            Nay dong phu neu dung thu nguoi xem can biet: thay day O DAU. Ten
            trung tam lay tu `centerShortName` (bien moi truong) chu khong go
            cung, de doi trung tam thi khong bi lech giua cac noi.

            KHONG dat huy hieu/phu hieu cua Truong Dai hoc An ninh Nhan dan o
            day - xem ghi chu day du trong components/ui/brand-mark.tsx. Quan
            he la that nen duoc noi bang CHU; phu hieu se thanh mao danh.
          */}
          <Link
            href="/"
            className="flex min-w-0 shrink items-center gap-2.5 rounded-md py-1 text-brand-900"
            aria-label={`${siteConfig.brandName} - về trang chủ`}
          >
            <BrandMark className="h-9 w-9" />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-[0.95rem] font-bold sm:text-base">
                {siteConfig.brandName}
              </span>
              {hasCenterName ? (
                <>
                  {/*
                    Hai bien the do BE NGANG header rat khac nhau theo man hinh:
                     - 1024-1279px va >=1536px: menu vua van con cho -> ban day du.
                     - 1280-1535px: 7 muc menu + so dien thoai + nut CTA chiem het
                       hang, do duoc chi con ~130px cho khoi nay -> an di nhu cu.
                     - <640px: menu thu thanh nut hamburger nen co cho, nhung khong
                       du cho ban day du -> ban rut gon.
                  */}
                  {/* <640px: dung ban CUC NGAN chu khong phai ban rut gon.
                      Ban rut gon bi cat thanh "...Truong Dai hoc A..." - tuc la
                      mat dung "An ninh Nhan dan", phan mang toan bo y nghia.
                      Ban cuc ngan vua du chieu ngang nen hien tron ven. */}
                  <span className="truncate text-[0.6875rem] font-medium text-ink-subtle sm:hidden">
                    {siteConfig.teacher.centerCompactName}
                  </span>

                  {/* 640-1279px: menu van la hamburger, rong rai nhat - ban day du. */}
                  <span className="hidden whitespace-nowrap text-[0.6875rem] font-medium text-ink-subtle sm:block xl:hidden">
                    {siteConfig.teacher.employmentStatus} ·{' '}
                    {siteConfig.teacher.centerShortName}
                  </span>

                  {/* >=1280px: 7 muc menu + so dien thoai + nut CTA da chiem gan
                      het hang. Do duoc chi con khoang 300px, nen dung ban cuc
                      ngan. Truoc day khoang nay AN han dong phu - tuc la o dung
                      man hinh may tinh de ban, header khong he noi thay day o
                      dau. */}
                  <span className="hidden whitespace-nowrap text-[0.6875rem] font-medium text-ink-subtle xl:block">
                    {siteConfig.teacher.centerCompactName}
                  </span>
                </>
              ) : null}
            </span>
          </Link>

          {/*
            Dieu huong desktop.
            `shrink-0` + `whitespace-nowrap`: mac dinh flex item duoc phep co
            lai, khien chu trong tung muc bi vat xuong 2 dong khi hang chat.
            Dung nhan rut gon (shortLabel) de 7 muc vua mot hang.
          */}
          <nav
            aria-label="Điều hướng chính"
            className="hidden shrink-0 xl:block"
          >
            <ul className="flex items-center gap-0.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cn(
                      'block whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium transition-colors',
                      isActive(item.href)
                        ? 'text-brand-800 underline decoration-accent-500 decoration-2 underline-offset-8'
                        : 'text-ink-muted hover:text-brand-800',
                    )}
                  >
                    {item.shortLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {phoneHref ? (
              <a
                href={phoneHref}
                onClick={() =>
                  trackEvent(AnalyticsEvent.ClickPhone, { location: 'header' })
                }
                className="hidden items-center gap-2 whitespace-nowrap rounded-md px-2 py-1.5 text-sm font-semibold text-brand-800 hover:text-accent-600 md:inline-flex"
              >
                <Phone aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span>{formatVietnamesePhone(siteConfig.contact.phone)}</span>
              </a>
            ) : null}

            <Link
              href="/lien-he#lien-he-nhanh"
              className={cn(
                buttonClasses('primary', 'sm'),
                'hidden whitespace-nowrap sm:inline-flex',
              )}
            >
              Liên hệ tư vấn
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-brand-800 transition-colors hover:bg-surface-muted xl:hidden"
            >
              {isMenuOpen ? (
                <X aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        hidden={!isMenuOpen}
        className="border-t border-line bg-surface xl:hidden"
      >
        <nav
          aria-label="Điều hướng trên điện thoại"
          className="container-page py-3"
        >
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'block rounded-md px-3 py-3 text-[0.9375rem] font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-brand-50 text-brand-800'
                      : 'text-ink-muted hover:bg-surface-muted',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/lien-he#lien-he-nhanh"
            className={cn(buttonClasses('primary', 'md'), 'mt-3 w-full')}
          >
            Liên hệ tư vấn
          </Link>
        </nav>
      </div>
    </header>
  );
}
