import type { Metadata } from 'next';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { isPlaceholderValue, siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import {
  buildEmailHref,
  buildMapsHref,
  buildPhoneHref,
  buildZaloHref,
} from '@/lib/utils/cta-links';
import { formatVietnamesePhone } from '@/lib/validation/phone';
import { Section, SectionHeading } from '@/components/ui/section';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card } from '@/components/ui/card';
import { CallButton, MapsLink, ZaloButton } from '@/components/ui/contact-buttons';
import { LeadFormSection } from '@/components/sections/lead-form-section';
import { JsonLd } from '@/components/ui/json-ld';

export const metadata: Metadata = buildPageMetadata({
  title: 'Liên hệ tư vấn học lái xe',
  description:
    'Thông tin liên hệ: số điện thoại, Zalo, email và khu vực đào tạo. Để lại thông tin để được thầy tư vấn khóa học phù hợp.',
  path: '/lien-he',
});

const contactTips = [
  {
    title: 'Gọi điện khi cần trả lời ngay',
    description:
      'Phù hợp khi bạn cần hỏi nhanh về lịch khai giảng hoặc học phí. Nếu thầy đang trên xe dạy học viên, hãy nhắn tin để thầy gọi lại.',
  },
  {
    title: 'Nhắn Zalo khi cần gửi thông tin',
    description:
      'Thuận tiện để gửi ảnh giấy tờ cần kiểm tra hình thức, hoặc trao đổi lịch học theo tuần.',
  },
  {
    title: 'Điền biểu mẫu khi bận',
    description:
      'Bạn để lại thông tin và khung giờ muốn được liên hệ, thầy sẽ chủ động gọi vào đúng khung giờ đó.',
  },
];

export default function ContactPage() {
  const crumbs = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Liên hệ', path: '/lien-he' },
  ];

  const phoneHref = buildPhoneHref(siteConfig.contact.phone);
  const zaloHref = buildZaloHref(
    siteConfig.contact.zaloUrl,
    siteConfig.contact.phone,
  );
  const emailHref = buildEmailHref(siteConfig.contact.email);
  const mapsHref = buildMapsHref(siteConfig.contact.googleMapsUrl);

  return (
    <>
      <div className="border-b border-line bg-surface-muted">
        <div className="container-page py-4">
          <Breadcrumb items={crumbs} />
        </div>
      </div>

      <Section ariaLabelledBy="contact-heading">
        <SectionHeading
          id="contact-heading"
          as="h1"
          eyebrow="Liên hệ"
          title="Liên hệ với thầy"
          description="Bạn có thể gọi điện, nhắn Zalo hoặc để lại thông tin trong biểu mẫu. Cách nào cũng đến trực tiếp thầy, không qua tổng đài."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
              <Phone aria-hidden="true" className="h-[1.375rem] w-[1.375rem]" />
            </span>
            <h2 className="mt-4 text-lg">Điện thoại</h2>
            {phoneHref ? (
              <a
                href={phoneHref}
                className="mt-1.5 block rounded text-[0.9375rem] font-semibold text-brand-800 hover:text-accent-600 hover:underline"
              >
                {formatVietnamesePhone(siteConfig.contact.phone)}
              </a>
            ) : (
              <p className="mt-1.5 text-[0.9375rem] text-ink-subtle">
                Đang cập nhật
              </p>
            )}
          </Card>

          <Card>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-success-50 text-success-600">
              <MessageCircle aria-hidden="true" className="h-[1.375rem] w-[1.375rem]" />
            </span>
            <h2 className="mt-4 text-lg">Zalo</h2>
            {zaloHref ? (
              <a
                href={zaloHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 block rounded text-[0.9375rem] font-semibold text-brand-800 hover:text-success-700 hover:underline"
              >
                Nhắn tin cho thầy
              </a>
            ) : (
              <p className="mt-1.5 text-[0.9375rem] text-ink-subtle">
                Đang cập nhật
              </p>
            )}
          </Card>

          <Card>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Mail aria-hidden="true" className="h-[1.375rem] w-[1.375rem]" />
            </span>
            <h2 className="mt-4 text-lg">Email</h2>
            {emailHref ? (
              <a
                href={emailHref}
                className="mt-1.5 block break-all rounded text-[0.9375rem] font-semibold text-brand-800 hover:text-brand-600 hover:underline"
              >
                {siteConfig.contact.email}
              </a>
            ) : (
              <p className="mt-1.5 text-[0.9375rem] text-ink-subtle">
                Đang cập nhật
              </p>
            )}
          </Card>

          <Card>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Clock aria-hidden="true" className="h-[1.375rem] w-[1.375rem]" />
            </span>
            <h2 className="mt-4 text-lg">Thời gian liên hệ</h2>
            <p className="mt-1.5 text-[0.9375rem] text-ink-muted">
              {isPlaceholderValue(siteConfig.contact.hours)
                ? 'Vui lòng nhắn tin, thầy sẽ phản hồi sớm nhất'
                : siteConfig.contact.hours}
            </p>
          </Card>
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <CallButton location="contact_page" size="lg" />
          <ZaloButton location="contact_page" size="lg" />
        </div>
      </Section>

      <Section tone="muted" ariaLabelledBy="location-heading">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 id="location-heading" className="text-2xl sm:text-3xl">
              Địa điểm học
            </h2>
            <ul className="mt-5 space-y-4 text-[0.9375rem] text-ink-muted">
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                <span>
                  <strong className="block font-semibold text-brand-900">
                    Địa chỉ
                  </strong>
                  {isPlaceholderValue(siteConfig.contact.address)
                    ? 'Địa chỉ sẽ được cập nhật. Bạn liên hệ để thầy gửi vị trí cụ thể.'
                    : siteConfig.contact.address}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                <span>
                  <strong className="block font-semibold text-brand-900">
                    Khu vực nhận học viên
                  </strong>
                  {siteConfig.contact.trainingArea}
                </span>
              </li>
            </ul>
            <div className="mt-5">
              <MapsLink location="contact_page" />
            </div>
          </div>

          <div className="overflow-hidden rounded-card border border-line bg-surface">
            {mapsHref ? (
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full min-h-[16rem] flex-col items-center justify-center gap-3 bg-brand-50 p-8 text-center transition-colors hover:bg-brand-100"
              >
                <MapPin aria-hidden="true" className="h-10 w-10 text-brand-600" />
                <span className="text-[0.9375rem] font-semibold text-brand-800">
                  Mở bản đồ chỉ đường
                </span>
              </a>
            ) : (
              <div className="flex h-full min-h-[16rem] flex-col items-center justify-center gap-3 bg-surface-sunken p-8 text-center">
                <MapPin aria-hidden="true" className="h-10 w-10 text-ink-subtle" />
                <p className="text-[0.9375rem] font-medium text-ink-muted">
                  Bản đồ sẽ hiển thị sau khi cấu hình đường dẫn Google Maps
                </p>
                <p className="text-sm text-ink-subtle">
                  Cấu hình biến NEXT_PUBLIC_GOOGLE_MAPS_URL trong file .env
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section ariaLabelledBy="tips-heading">
        <SectionHeading
          id="tips-heading"
          eyebrow="Hướng dẫn"
          title="Nên liên hệ bằng cách nào?"
          description="Mỗi cách liên hệ phù hợp với một tình huống khác nhau."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {contactTips.map((tip) => (
            <Card as="li" key={tip.title}>
              <h3 className="text-lg">{tip.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                {tip.description}
              </p>
            </Card>
          ))}
        </ul>
      </Section>

      <LeadFormSection formLocation="contact_page" tone="muted" />

      <JsonLd data={buildBreadcrumbJsonLd(crumbs)} />
    </>
  );
}
