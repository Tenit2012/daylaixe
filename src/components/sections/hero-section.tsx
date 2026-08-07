import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarClock,
  GraduationCap,
  Handshake,
  MapPin,
  MessageCircle,
  Phone,
  Receipt,
  ShieldCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { trustIndicators } from '@/content/learning-process';
import { formatVietnamesePhone } from '@/lib/validation/phone';
import { buttonClasses } from '@/components/ui/button';
import { CallButton, ZaloButton } from '@/components/ui/contact-buttons';
import { isPlaceholderValue } from '@/config/site';

const trustIcons: Record<string, LucideIcon> = {
  MessageCircle,
  CalendarClock,
  Receipt,
  Handshake,
  ShieldCheck,
};

export function HeroSection() {
  const phoneConfigured = !isPlaceholderValue(siteConfig.contact.phone);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-surface">
      <div className="container-page py-10 sm:py-14 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            {/* Thong tin kinh nghiem da duoc thay xac nhan - lay tu config */}
            <p className="inline-flex items-center gap-2 rounded-pill border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 sm:text-sm">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 text-accent-600" />
              {siteConfig.experience.short}
            </p>

            <h1 className="mt-5 text-[1.75rem] leading-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {siteConfig.messaging.primary}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {siteConfig.messaging.secondary}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ZaloButton location="hero" size="lg" />
              <Link
                href="/khoa-hoc"
                className={buttonClasses('outline', 'lg')}
              >
                Xem khóa học
              </Link>
            </div>

            <dl className="mt-7 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-6">
              <div className="flex items-center gap-2">
                <dt className="sr-only">Số điện thoại</dt>
                <Phone aria-hidden="true" className="h-4 w-4 text-accent-600" />
                <dd className="font-semibold text-brand-900">
                  {phoneConfigured
                    ? formatVietnamesePhone(siteConfig.contact.phone)
                    : 'Số điện thoại đang cập nhật'}
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="sr-only">Khu vực đào tạo</dt>
                <MapPin aria-hidden="true" className="h-4 w-4 text-accent-600" />
                <dd className="text-ink-muted">
                  Khu vực đào tạo: {siteConfig.contact.trainingArea}
                </dd>
              </div>
            </dl>

            {/*
              Chi bao tao niem tin.
              Muc dau la du lieu that da xac nhan (nhom hoc vien thay da huong
              dan), lay tu config. Cac muc con lai dien dat dinh tinh - KHONG
              dung so lieu hoc vien, ty le thi dau hay thanh tich.
            */}
            <ul className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <li className="flex items-center gap-2.5 rounded-lg border border-brand-200 bg-brand-50 px-3 py-2.5 text-sm font-semibold text-brand-900 sm:col-span-2">
                <GraduationCap
                  aria-hidden="true"
                  className="h-[1.125rem] w-[1.125rem] flex-shrink-0 text-brand-700"
                />
                {siteConfig.experience.audienceShort}
              </li>
              {trustIndicators.map((indicator) => {
                const Icon = trustIcons[indicator.icon] ?? ShieldCheck;
                return (
                  <li
                    key={indicator.label}
                    className="flex items-center gap-2.5 rounded-lg border border-line bg-white/70 px-3 py-2.5 text-sm font-medium text-brand-900"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-[1.125rem] w-[1.125rem] flex-shrink-0 text-success-600"
                    />
                    {indicator.label}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-card border border-line bg-white shadow-card">
              <Image
                src="/images/hero/thay-va-xe-tap-lai.svg"
                alt="Hình minh họa giáo viên đứng cạnh xe tập lái tại sân tập"
                width={900}
                height={700}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full"
              />
            </div>

            <div className="mt-4 flex justify-center lg:hidden">
              <CallButton location="hero_mobile" size="md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
