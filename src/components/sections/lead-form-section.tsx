import { Clock, MapPin, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Section, SectionHeading } from '@/components/ui/section';
import { LeadForm } from '@/components/forms/lead-form';
import { CallButton, ZaloButton } from '@/components/ui/contact-buttons';

interface LeadFormSectionProps {
  defaultCourse?: string;
  title?: string;
  description?: string;
  formLocation?: string;
  tone?: 'default' | 'muted';
}

export function LeadFormSection({
  defaultCourse,
  title = 'Đăng ký nhận tư vấn',
  description = 'Để lại thông tin, thầy sẽ gọi lại tư vấn khóa học phù hợp với nhu cầu và thời gian của bạn.',
  formLocation = 'section',
  tone = 'default',
}: LeadFormSectionProps) {
  return (
    <Section id="dang-ky" tone={tone} ariaLabelledBy="dang-ky-heading">
      <SectionHeading
        id="dang-ky-heading"
        eyebrow="Đăng ký"
        title={title}
        description={description}
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12">
        <LeadForm defaultCourse={defaultCourse} formLocation={formLocation} />

        <aside className="space-y-5">
          <div className="card-base">
            <h3 className="text-lg">Muốn trao đổi ngay?</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
              Nếu bạn cần câu trả lời nhanh, gọi hoặc nhắn Zalo là cách nhanh
              nhất. Thầy trả lời trực tiếp, không qua tổng đài.
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              <CallButton location="form_sidebar" size="md" />
              <ZaloButton location="form_sidebar" size="md" />
            </div>
          </div>

          <div className="card-base">
            <h3 className="text-lg">Thông tin liên hệ</h3>
            <ul className="mt-3 space-y-3 text-sm text-ink-muted">
              <li className="flex items-start gap-2.5">
                <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
                <span>Thời gian liên hệ: {siteConfig.contact.hours}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
                <span>Khu vực đào tạo: {siteConfig.contact.trainingArea}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-success-600" />
                <span>
                  Thông tin của bạn chỉ dùng để liên hệ tư vấn, không chia sẻ cho
                  bên thứ ba.
                </span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}
