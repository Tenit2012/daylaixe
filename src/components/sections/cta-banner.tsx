import { Section } from '@/components/ui/section';
import { CtaLocation, type CtaLocationName } from '@/lib/analytics/events';
import {
  CallButton,
  FacebookButton,
  ZaloButton,
} from '@/components/ui/contact-buttons';

interface CtaBannerProps {
  title?: string;
  description?: string;
  location?: CtaLocationName;
}

export function CtaBanner({
  title = 'Còn băn khoăn chưa biết bắt đầu từ đâu?',
  description = 'Nhắn cho thầy vài dòng về nhu cầu và thời gian rảnh của bạn. Thầy sẽ tư vấn khóa học phù hợp, không thúc ép đăng ký.',
  location = CtaLocation.CtaBanner,
}: CtaBannerProps) {
  return (
    <Section tone="brand" ariaLabelledBy="cta-banner-heading">
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="cta-banner-heading" className="text-2xl text-white sm:text-3xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-brand-100">
          {description}
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <ZaloButton location={location} size="lg" />
          <CallButton location={location} size="lg" />
          <FacebookButton location={location} size="lg" />
        </div>
      </div>
    </Section>
  );
}
