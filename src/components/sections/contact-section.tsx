import { Clock, MapPin, PhoneCall } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Section, SectionHeading } from '@/components/ui/section';
import {
  CallButton,
  FacebookButton,
  ZaloButton,
} from '@/components/ui/contact-buttons';
import { formatVietnamesePhone } from '@/lib/validation/phone';
import { isPlaceholderValue } from '@/config/site';
import { Reveal } from '@/components/ui/reveal';
import { CtaLocation, type CtaLocationName } from '@/lib/analytics/events';

interface ContactSectionProps {
  title?: string;
  description?: string;
  /** Vi tri CTA gui kem su kien analytics. */
  location?: CtaLocationName;
  tone?: 'default' | 'muted';
}

/**
 * Khoi keu goi lien he cuoi moi trang.
 *
 * Thay cho form dang ky truoc day: hoc vien lien he thang qua dien thoai,
 * Zalo hoac Facebook thay vi de lai thong tin. Nho vay website khong con
 * luu bat ky du lieu ca nhan nao.
 *
 * Neo `#lien-he-nhanh` duoc giu co dinh de cac lien ket dieu huong tu thanh
 * CTA mobile va cac trang khac van cuon dung toi day.
 */
export function ContactSection({
  title = 'Liên hệ nhận tư vấn',
  description = 'Gọi điện hoặc nhắn tin cho thầy để được tư vấn khóa học phù hợp với nhu cầu và thời gian của bạn. Thầy trả lời trực tiếp, không qua tổng đài.',
  location = CtaLocation.ContactSection,
  tone = 'default',
}: ContactSectionProps) {
  const hasPhone = !isPlaceholderValue(siteConfig.contact.phone);

  return (
    <Section
      id="lien-he-nhanh"
      tone={tone}
      ariaLabelledBy="lien-he-nhanh-heading"
    >
      <SectionHeading
        id="lien-he-nhanh-heading"
        eyebrow="Liên hệ"
        title={title}
        description={description}
      />

      <Reveal className="mx-auto mt-10 max-w-3xl">
        <div className="card-base text-center">
          {hasPhone ? (
            <p className="flex flex-col items-center gap-1.5">
              <span className="text-sm font-semibold uppercase tracking-wider text-ink-subtle">
                Số điện thoại của thầy
              </span>
              <span className="inline-flex items-center gap-2.5 text-2xl font-bold text-brand-900 sm:text-3xl">
                <PhoneCall
                  aria-hidden="true"
                  className="h-6 w-6 text-accent-500"
                />
                {formatVietnamesePhone(siteConfig.contact.phone)}
              </span>
            </p>
          ) : null}

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <CallButton location={location} size="lg" />
            <ZaloButton location={location} size="lg" />
            <FacebookButton location={location} size="lg" />
          </div>

          <ul className="mt-7 grid gap-3 border-t border-line pt-6 text-left text-sm text-ink-muted sm:grid-cols-2">
            <li className="flex items-start gap-2.5">
              <Clock
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500"
              />
              <span>Thời gian liên hệ: {siteConfig.contact.hours}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500"
              />
              <span>Khu vực đào tạo: {siteConfig.contact.trainingArea}</span>
            </li>
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
