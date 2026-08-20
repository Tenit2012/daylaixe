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
import { Reveal } from '@/components/ui/reveal';
import { staggerDelay } from '@/lib/utils/stagger';

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
        eyebrow="Trải nghiệm"
        title="Trải nghiệm học lái xe"
        description="Những tình huống thường gặp trong quá trình học và cách thầy hướng dẫn xử lý."
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

      {/*
        CHI hien dan khi cuon toi - khong hover nhac the, khong dem sao, khong
        chuyen canh tu dong. Muc nay la TINH HUONG MINH HOA chu khong phai danh
        gia cua hoc vien that; moi hieu ung lam no "song" hon muc can thiet deu
        day nguoi doc ve phia hieu nham do. Nhan canh bao phia tren giu nguyen
        trang thai tinh, khong bi hieu ung nao che hay lam mo.
      */}
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((testimonial, index) => (
          <Reveal
            as="li"
            key={testimonial.id}
            delay={staggerDelay(index)}
            className="h-full"
          >
            <TestimonialCard testimonial={testimonial} />
          </Reveal>
        ))}
      </ul>

      <div className="mt-9 text-center">
        <Link
          href="/cam-nhan-hoc-vien"
          className={buttonClasses('outline', 'md')}
        >
          Xem tất cả trải nghiệm
        </Link>
      </div>
    </Section>
  );
}
