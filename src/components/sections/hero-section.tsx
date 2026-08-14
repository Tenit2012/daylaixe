import Image from 'next/image';
import { BadgeCheck, Building2, MapPin, Phone } from 'lucide-react';
import { isPlaceholderValue, siteConfig } from '@/config/site';
import { formatVietnamesePhone } from '@/lib/validation/phone';
import {
  CallButton,
  VisitCenterButton,
  ZaloButton,
} from '@/components/ui/contact-buttons';

/**
 * Hero cua landing page.
 *
 * Tieu de co y DAI va co y neu thang ten trung tam. Bao cao TRUST_AUDIT ket
 * luan nguoi xem roi trang vi khong tra loi duoc "hoc o dau" va "day la ai";
 * mot tieu de ngan gon kieu "Hoc lai xe cung thay" khong giai quyet duoc dieu
 * do. Ba nut CTA tuong ung ba muc do san sang khac nhau cua nguoi doc:
 * goi ngay (san sang), nhan Zalo (con ngai goi), den tan noi (muon kiem chung).
 */
export function HeroSection() {
  const { contact, teacher, messaging } = siteConfig;
  const phoneConfigured = !isPlaceholderValue(contact.phone);
  const hasAddress = !isPlaceholderValue(contact.address);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-surface">
      <div className="container-page py-10 sm:py-14 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-pill border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 sm:text-sm">
              <BadgeCheck
                aria-hidden="true"
                className="h-4 w-4 text-success-600"
              />
              {teacher.employmentStatus}
              {isPlaceholderValue(teacher.name)
                ? ''
                : ` · Thầy ${teacher.name}`}
            </p>

            <h1 className="mt-5 text-balance text-[1.75rem] leading-tight sm:text-[2.125rem] lg:text-[2.5rem]">
              {messaging.heroTitle}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {messaging.heroSubtitle}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CallButton location="hero" size="lg" />
              <ZaloButton location="hero" size="lg" />
              <VisitCenterButton location="hero" size="lg" />
            </div>

            <dl className="mt-7 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-6">
              {phoneConfigured ? (
                <div className="flex items-center gap-2">
                  <dt className="sr-only">Số điện thoại</dt>
                  <Phone
                    aria-hidden="true"
                    className="h-4 w-4 text-accent-600"
                  />
                  <dd className="font-semibold text-brand-900">
                    {formatVietnamesePhone(contact.phone)}
                  </dd>
                </div>
              ) : null}

              {hasAddress ? (
                <div className="flex items-start gap-2">
                  <dt className="sr-only">Địa chỉ trung tâm</dt>
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-600"
                  />
                  <dd className="text-ink-muted">{contact.address}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-card border border-line bg-white shadow-card">
              <Image
                src="/images/teacher/thay-tung-cabin.webp"
                alt={`${siteConfig.brandName} hướng dẫn học viên trên cabin học lái xe ô tô, chỉ vào màn hình mô phỏng`}
                width={1400}
                height={1050}
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full"
              />
            </div>

            {isPlaceholderValue(teacher.centerName) ? null : (
              <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-ink-subtle">
                <Building2
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                />
                Ảnh chụp tại {teacher.centerShortName}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
