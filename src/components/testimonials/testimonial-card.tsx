import { Quote, Tag } from 'lucide-react';
import type { Testimonial } from '@/types/content';
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
 *
 * Khong dung avatar chu cai + ten cho noi dung minh hoa - lam vay se goi y
 * day la mot nguoi co that. Chi hien avatar/ten khi `testimonial.name` co
 * gia tri, tuc la cam nhan THAT da duoc hoc vien dong y dung ten.
 */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
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

      <figcaption className="mt-5 flex items-center gap-2.5 border-t border-line pt-4">
        {testimonial.name ? (
          <>
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
              {!testimonial.isPlaceholder && testimonial.period ? (
                <span className="block truncate text-xs text-ink-subtle">
                  {testimonial.situation} · {testimonial.period}
                </span>
              ) : null}
            </span>
          </>
        ) : (
          <>
            <Tag
              aria-hidden="true"
              className="h-4 w-4 flex-shrink-0 text-brand-400"
            />
            <span className="truncate text-sm font-medium text-ink-muted">
              {testimonial.situation}
            </span>
          </>
        )}
      </figcaption>
    </figure>
  );
}
