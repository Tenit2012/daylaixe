import { Quote } from 'lucide-react';
import type { Testimonial } from '@/types/content';
import { siteConfig } from '@/config/site';
import { getCourseLabel } from '@/content/courses';
import { PlaceholderBadge } from '@/components/ui/card';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/**
 * Card cam nhan hoc vien.
 *
 * Khi `isPlaceholder` la true, card LUON hien thi ro day la noi dung mau
 * (o moi truong dev) va khong bao gio duoc trinh bay nhu phan hoi that.
 */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const showBadge = testimonial.isPlaceholder && siteConfig.showPlaceholderBadge;

  return (
    <figure className="card-base flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <Quote aria-hidden="true" className="h-7 w-7 flex-shrink-0 text-brand-200" />
        {showBadge ? <PlaceholderBadge /> : null}
      </div>

      <blockquote className="mt-3 flex-1">
        <p className="text-[0.9375rem] leading-relaxed text-ink-muted">
          “{testimonial.quote}”
        </p>
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700"
        >
          {testimonial.avatarInitial}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-brand-900">
            {testimonial.name}
          </span>
          <span className="block truncate text-xs text-ink-subtle">
            {getCourseLabel(testimonial.courseSlug)}
            {testimonial.isPlaceholder ? ` · ${testimonial.period}` : ''}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
