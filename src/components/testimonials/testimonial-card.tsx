import { Quote } from 'lucide-react';
import type { Testimonial } from '@/types/content';
import { getCourseLabel } from '@/content/courses';
import { ILLUSTRATIVE_LABEL } from '@/content/testimonials';
import { PlaceholderBadge } from '@/components/ui/card';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/**
 * Card cam nhan hoc vien.
 *
 * KHAC BAN TRUOC (da bi go ngay 13/08/2026): nhan "Noi dung mau" bay gio
 * hien CA O PRODUCTION, khong con phu thuoc `siteConfig.showPlaceholderBadge`.
 * Ban truoc chi hien nhan o dev, nghia la khach vao web that van thay cam
 * nhan mau trong y het cam nhan that - dung thu da khien khoi nay bi go.
 * Neu can go nhan thi phai co cam nhan that va dat `isPlaceholder: false`,
 * chu khong sua o day.
 */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const courseLabel = getCourseLabel(testimonial.courseSlug);
  /*
   * Vai muc co tieu de dat trung ten khoa ("Bổ túc tay lái", "Luyện sa hình").
   * Khi do bo dong phu di cho khoi lap y hai lan lien nhau.
   */
  const showCourseLabel =
    courseLabel.toLowerCase() !== testimonial.name.toLowerCase();
  const periodSuffix =
    !testimonial.isPlaceholder && testimonial.period
      ? ` · ${testimonial.period}`
      : '';
  const subLine =
    `${showCourseLabel ? courseLabel : ''}${periodSuffix}`.replace(/^ · /, '');

  return (
    <figure className="card-base flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <Quote
          aria-hidden="true"
          className="h-7 w-7 flex-shrink-0 text-brand-200"
        />
        {testimonial.isPlaceholder ? (
          <PlaceholderBadge label={ILLUSTRATIVE_LABEL} />
        ) : null}
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
          {/*
            Muc minh hoa: chi hien ten khoa. Nhan o goc tren da noi ro day la
            minh hoa roi, lap lai o day chi lam dong chu dai them.
            Muc that: hien them thoi gian hoc (`period`) de nguoi doc biet
            phan hoi nay tu bao gio.
          */}
          {subLine ? (
            <span className="block truncate text-xs text-ink-subtle">
              {subLine}
            </span>
          ) : null}
        </span>
      </figcaption>
    </figure>
  );
}
