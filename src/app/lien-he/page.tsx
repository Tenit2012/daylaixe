import type { Metadata } from 'next';
import { Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { ZaloIcon } from '@/components/ui/zalo-icon';
import { FacebookIcon } from '@/components/ui/facebook-icon';
import { isPlaceholderValue, siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import {
  buildEmailHref,
  buildExternalHref,
  buildMapsHref,
  buildPhoneHref,
  buildZaloHref,
} from '@/lib/utils/cta-links';
import { formatVietnamesePhone } from '@/lib/validation/phone';
import { Section, SectionHeading } from '@/components/ui/section';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card } from '@/components/ui/card';
import {
  CallButton,
  FacebookButton,
  MapsLink,
  ZaloButton,
} from '@/components/ui/contact-buttons';
import { ContactSection } from '@/components/sections/contact-section';
import { JsonLd } from '@/components/ui/json-ld';

export const metadata: Metadata = buildPageMetadata({
  title: 'Liên hệ tư vấn học lái xe',
  description:
    'Thông tin liên hệ: số điện thoại, Zalo, Facebook, email và khu vực đào tạo. Gọi hoặc nhắn tin để được thầy tư vấn khóa học phù hợp.',
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
    title: 'Nhắn Facebook nếu quen dùng Messenger',
    description:
      'Bạn có thể nhắn qua trang Facebook của thầy và để lại khung giờ muốn được gọi lại, thầy sẽ chủ động liên hệ vào đúng khung giờ đó.',
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
  const facebookHref = buildExternalHref(siteConfig.contact.facebookUrl);

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
          description="Bạn có thể gọi điện, nhắn Zalo hoặc nhắn Facebook. Cách nào cũng đến trực tiếp thầy, không qua tổng đài."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-zalo/10">
              <ZaloIcon className="h-[1.375rem] w-[1.375rem]" />
            </span>
            <h2 className="mt-4 text-lg">Zalo</h2>
            {zaloHref ? (
              <a
                href={zaloHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 block rounded text-[0.9375rem] font-semibold text-brand-800 hover:text-zalo hover:underline"
              >
                Nhắn tin cho thầy
              </a>
            ) : (
              <p className="mt-1.5 text-[0.9375rem] text-ink-subtle">
                Đang cập nhật
              </p>
            )}
          </Card>

          {facebookHref ? (
            <Card>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-facebook/10 text-facebook">
                <FacebookIcon className="h-[1.375rem] w-[1.375rem]" />
              </span>
              <h2 className="mt-4 text-lg">Facebook</h2>
              <a
                href={facebookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 block rounded text-[0.9375rem] font-semibold text-brand-800 hover:text-facebook hover:underline"
              >
                Nhắn tin cho thầy
              </a>
            </Card>
          ) : null}

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
          <FacebookButton location="contact_page" size="lg" />
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
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500"
                />
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
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500"
                />
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
              /*
                Anh ban do TINH tu tile OpenStreetMap, sinh boi
                `node scripts/build-map-image.mjs` va nam san trong public/.

                Vi sao khong nhung iframe Google Maps: trang nay khong co iframe
                ben thu ba nao. Mot iframe ban do keo theo 300-900 KB tai nguyen
                cua Google, dat cookie va gui dia chi IP cua khach sang Google
                ngay khi ho cuon toi - doi lap truong rieng tu cua ca website
                chi de hien mot lat ban do. Anh tinh nang ~157 KB, khong request
                ra ngoai, va van dua nguoi dung sang Google Maps khi ho bam.

                GIU DONG GHI CONG ben duoi: du lieu OpenStreetMap dung giay phep
                ODbL, bat buoc ghi cong o noi hien thi.
              */
              <figure className="relative h-full">
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-zoom-frame group block h-full overflow-hidden"
                >
                  {/*
                    Dung <img> thuong thay vi next/image - NGOAI LE co chu dich
                    so voi phan con lai cua ma nguon.

                    Ly do: next.config.ts dat `images.unoptimized: true` (bat
                    buoc voi output: 'export'), nen next/image o day khong toi
                    uu gi ca - no sinh ra dung mot the <img> voi width/height/
                    loading/decoding, KHONG co srcset. Doi lai no keo theo
                    ~5 KB JavaScript vao trang. Do la trang duy nhat trong site
                    truoc day khong tai component anh cua Next, nen chi phi do
                    la them moi hoan toan chu khong phai dung ghep.

                    Neu sau nay bo `output: 'export'' de Next toi uu anh luc
                    chay, hay doi lai thanh next/image de anh nay duoc toi uu
                    nhu moi anh khac.
                  */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/center/ban-do-trung-tam.webp"
                    alt={`Bản đồ khu vực quanh ${
                      isPlaceholderValue(siteConfig.teacher.centerName)
                        ? 'trung tâm đào tạo lái xe'
                        : siteConfig.teacher.centerShortName
                    }, ghim đỏ đánh dấu vị trí trung tâm`}
                    width={1200}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="hover-zoom-target h-full min-h-[16rem] w-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-brand-900/85 px-4 py-3 text-[0.9375rem] font-semibold text-white">
                    <MapPin aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" />
                    Mở bản đồ chỉ đường
                    <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  </span>
                </a>
                <figcaption className="absolute right-2 top-2 rounded bg-surface/90 px-2 py-1 text-[0.6875rem] leading-none text-ink-subtle">
                  <a
                    href="https://www.openstreetmap.org/copyright"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-dotted underline-offset-2 hover:text-ink-muted"
                  >
                    © OpenStreetMap contributors
                  </a>
                </figcaption>
              </figure>
            ) : (
              <div className="flex h-full min-h-[16rem] flex-col items-center justify-center gap-3 bg-surface-sunken p-8 text-center">
                <MapPin
                  aria-hidden="true"
                  className="h-10 w-10 text-ink-subtle"
                />
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

      <ContactSection location="contact_page" tone="muted" />

      <JsonLd data={buildBreadcrumbJsonLd(crumbs)} />
    </>
  );
}
