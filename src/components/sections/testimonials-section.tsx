import Link from 'next/link';
import { Info } from 'lucide-react';
import {
  hasPlaceholderTestimonials,
  testimonials,
  testimonialsDisclosure,
} from '@/content/testimonials';
import { Section, SectionHeading } from '@/components/ui/section';
import { TestimonialCard } from '@/components/testimonials/testimonial-card';
import { buttonClasses } from '@/components/ui/button';

interface TestimonialsSectionProps {
  limit?: number;
  tone?: 'default' | 'muted';
}

/**
 * Khoi cam nhan rut gon dat tren trang chu.
 *
 * Danh sach rong -> KHONG render gi ca. Nho vay muon tat khoi nay chi can
 * de `testimonials` thanh `[]`, khong phai di sua tung trang goi no.
 */
export function TestimonialsSection({
  limit = 3,
  tone = 'muted',
}: TestimonialsSectionProps) {
  const items = testimonials.slice(0, limit);
  if (items.length === 0) return null;

  return (
    <Section id="cam-nhan" tone={tone} ariaLabelledBy="cam-nhan-heading">
      <SectionHeading
        id="cam-nhan-heading"
        eyebrow="Cảm nhận"
        title="Cảm nhận học viên"
        description="Những chia sẻ về quá trình học, viết lại bằng đúng giọng của người học."
      />

      {hasPlaceholderTestimonials() ? (
        <p className="mx-auto mt-6 flex max-w-2xl items-start gap-2.5 rounded-lg border border-accent-200 bg-accent-50 p-4 text-sm leading-relaxed text-ink-muted">
          <Info
            aria-hidden="true"
            className="mt-0.5 h-[1.125rem] w-[1.125rem] flex-shrink-0 text-accent-600"
          />
          <span>{testimonialsDisclosure}</span>
        </p>
      ) : null}

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((testimonial) => (
          <li key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} />
          </li>
        ))}
      </ul>

      <div className="mt-9 text-center">
        <Link
          href="/cam-nhan-hoc-vien"
          className={buttonClasses('outline', 'md')}
        >
          Xem tất cả cảm nhận
        </Link>
      </div>
    </Section>
  );
}
