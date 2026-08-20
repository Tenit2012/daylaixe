import Image from 'next/image';
import { Building2, MapPin, Navigation } from 'lucide-react';
import { isPlaceholderValue, siteConfig } from '@/config/site';
import { Section, SectionHeading } from '@/components/ui/section';
import { MapsLink } from '@/components/ui/contact-buttons';
import { Reveal } from '@/components/ui/reveal';

/**
 * "Hoc tai dau" - tra loi cau hoi ma bao cao TRUST_AUDIT cham thap nhat.
 *
 * Bao cao ghi: "Toi co hieu hoc o dau khong? -> Khong ro. Chi thay
 * 'TP. Thu Duc, TP.HCM'... khong co ten trung tam, khong co dia chi."
 * Muc nay neu ro TEN TRUNG TAM + DIA CHI + VI TRI PHONG TU VAN + BAN DO.
 */
export function WhereToStudySection({
  tone = 'default',
}: {
  tone?: 'default' | 'muted';
}) {
  const { contact, teacher } = siteConfig;

  const hasAddress = !isPlaceholderValue(contact.address);
  const hasCenterName = !isPlaceholderValue(teacher.centerName);

  return (
    <Section id="hoc-tai-dau" tone={tone} ariaLabelledBy="hoc-tai-dau-heading">
      <SectionHeading
        id="hoc-tai-dau-heading"
        eyebrow="Địa điểm"
        title="Học ở đâu"
        description="Toàn bộ quá trình học lý thuyết, thực hành và thi sát hạch đều diễn ra tại trung tâm. Bạn có thể đến tận nơi xem trước khi quyết định."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal
          variant="zoom"
          className="hover-zoom-frame overflow-hidden rounded-card border border-line bg-surface-muted shadow-card"
        >
          <Image
            src="/images/center/cong-truong.webp"
            alt={
              hasCenterName
                ? `Cổng ${teacher.centerName}`
                : 'Cổng trung tâm đào tạo lái xe'
            }
            width={1200}
            height={561}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="hover-zoom-target h-auto w-full"
          />
        </Reveal>

        <Reveal delay={90}>
          <dl className="space-y-5">
            {hasCenterName ? (
              <div className="flex items-start gap-3">
                <dt className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Building2 aria-hidden="true" className="h-5 w-5" />
                  <span className="sr-only">Nơi học</span>
                </dt>
                <dd>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                    Nơi học và thi sát hạch
                  </span>
                  <span className="mt-1 block text-[1.0625rem] font-semibold leading-snug text-brand-900">
                    {teacher.centerName}
                  </span>
                </dd>
              </div>
            ) : null}

            {hasAddress ? (
              <div className="flex items-start gap-3">
                <dt className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <MapPin aria-hidden="true" className="h-5 w-5" />
                  <span className="sr-only">Địa chỉ</span>
                </dt>
                <dd>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                    Địa chỉ
                  </span>
                  <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink-muted">
                    {contact.address}
                  </span>
                </dd>
              </div>
            ) : null}

            {contact.consultLocation ? (
              <div className="flex items-start gap-3">
                <dt className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                  <Navigation aria-hidden="true" className="h-5 w-5" />
                  <span className="sr-only">Chỗ gặp thầy</span>
                </dt>
                <dd>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                    Đến gặp thầy ở đâu
                  </span>
                  <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink-muted">
                    {contact.consultLocation}. Bạn nên gọi trước để thầy sắp xếp
                    thời gian tiếp.
                  </span>
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-6">
            <MapsLink
              location="where_to_study"
              label="Mở đường đi trên Google Maps"
            />
          </div>

          <p className="mt-6 rounded-card border-l-4 border-brand-600 bg-brand-50 p-4 text-sm leading-relaxed text-brand-900">
            Bạn nộp hồ sơ và đóng học phí trực tiếp cho trung tâm theo mức trung
            tâm công bố. Thầy hướng dẫn bạn chuẩn bị giấy tờ và đi cùng khi làm
            thủ tục.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
