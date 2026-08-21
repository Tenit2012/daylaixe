import Image from 'next/image';
import { BadgeCheck, Building2, MapPin, Phone } from 'lucide-react';
import { isPlaceholderValue, siteConfig } from '@/config/site';
import { formatVietnamesePhone } from '@/lib/validation/phone';
import { CallButton, ZaloButton } from '@/components/ui/contact-buttons';

/**
 * Hero cua landing page.
 *
 * Tieu de co y DAI va co y neu thang ten trung tam. Bao cao TRUST_AUDIT ket
 * luan nguoi xem roi trang vi khong tra loi duoc "hoc o dau" va "day la ai";
 * mot tieu de ngan gon kieu "Hoc lai xe cung thay" khong giai quyet duoc dieu
 * do. Hai nut CTA tuong ung hai muc do san sang khac nhau cua nguoi doc:
 * goi ngay (san sang), nhan Zalo (con ngai goi).
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
            <p className="hero-in inline-flex items-center gap-2 rounded-pill border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 sm:text-sm">
              <BadgeCheck
                aria-hidden="true"
                className="h-4 w-4 text-success-600"
              />
              {teacher.employmentStatus}
              {isPlaceholderValue(teacher.name)
                ? ''
                : ` · Thầy ${teacher.name}`}
            </p>

            <h1 className="hero-in-lcp mt-5 text-balance text-[1.75rem] leading-tight sm:text-[2.125rem] lg:text-[2.5rem]">
              {messaging.heroTitle}
            </h1>

            {/*
              Danh sach thay vi mot doan van - xem ghi chu `heroHighlights`
              trong config. Moi muc la mot o rieng nen trinh duyet chi xuong
              dong GIUA cac muc, khong cat ngang mot y. Cham tron di kem muc
              cua no nen khong bao gio dung mot minh o dau dong.
            */}
            <ul className="hero-in motion-delay-2 mt-5 flex max-w-xl flex-col gap-y-2 text-base leading-relaxed text-ink-muted sm:text-lg">
              {messaging.heroHighlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"
                  />
                  {/*
                    `text-balance` chia dong cho deu nhau. Thieu no, muc
                    "Huong dan hoc vien he dan su va he Cong an" o man hinh
                    390px bi vat xuong dong hai chi con moi chu "an" dung mot
                    minh - mat chu lac nhu vay lam ca khoi trong cau tha.
                  */}
                  <span className="text-balance">{item}</span>
                </li>
              ))}
            </ul>

            <div className="hero-in motion-delay-3 mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CallButton location="hero" size="lg" />
              <ZaloButton location="hero" size="lg" />
            </div>

            <dl className="hero-in motion-delay-4 mt-7 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-6">
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

          {/*
            KHUNG ANH NAY CO Y KHONG CO HIEU UNG NAO.

            Day la anh LCP cua trang (priority + fetchPriority="high"). Chrome
            khong ghi nhan mot phan tu dang opacity < 1 la da hien, nen bat ky
            hieu ung mo dan nao dat len day cung day thang moc LCP lui lai dung
            bang do tre cong thoi gian chay. Ca hieu ung phong to cung rui ro
            vi lam thay doi kich thuoc vung son ma LCP dung de do.

            Cam giac "song dong" cua hero da duoc tao boi cot chu ben trai;
            khong dang danh doi Core Web Vitals de them mot hieu ung nua o day.
          */}
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
              <p className="hero-in motion-delay-4 mt-3 flex items-start gap-2 text-sm leading-relaxed text-ink-subtle">
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
