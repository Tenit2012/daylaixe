import Image from 'next/image';
import { Quote, Tag } from 'lucide-react';
import type { Testimonial } from '@/types/content';
import {
  ILLUSTRATIVE_LABEL,
  PENDING_APPROVAL_LABEL,
} from '@/content/testimonials';
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
        {/*
          HAI nhan KHAC NHAU, khong gop lam mot:
            - isPlaceholder        -> ca tinh huong lan nguoi deu khong co that
            - quotePendingApproval -> nguoi THAT (da cho phep dung anh), nhung
                                      cau chu chua duoc chinh ho duyet
          Gop lai se lam mat thong tin ma nguoi doc can de hieu dung.
        */}
        {testimonial.isPlaceholder ? (
          <PlaceholderBadge label={ILLUSTRATIVE_LABEL} />
        ) : testimonial.quotePendingApproval ? (
          <PlaceholderBadge label={PENDING_APPROVAL_LABEL} />
        ) : null}
      </div>

      <blockquote className="mt-3 flex-1">
        <p className="text-[0.9375rem] leading-relaxed text-ink-muted">
          “{testimonial.quote}”
        </p>
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-2.5 border-t border-line pt-4">
        {testimonial.photo ? (
          <>
            {/*
              `loading="lazy"` + `sizes` co dinh 40px: anh nay nam duoi man
              hinh dau tien nen khong duoc phep tranh bang thong voi anh hero.
              Nguon da la 640x640 WebP (~24-44 KB) do
              `scripts/process-photos.mjs` cat san.
            */}
            <Image
              src={testimonial.photo.src}
              alt={testimonial.photo.alt}
              width={testimonial.photo.width}
              height={testimonial.photo.height}
              sizes="40px"
              loading="lazy"
              className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
            />
            <span className="min-w-0">
              {testimonial.name ? (
                <span className="block truncate text-sm font-semibold text-brand-900">
                  {testimonial.name}
                </span>
              ) : null}
              {/*
                CHUA co ten -> mo ta vai tro, KHONG bia ten. Gan ten placeholder
                vao mat nguoi that la gan cho ho mot danh tinh khong co that.
              */}
              <span className="block truncate text-xs text-ink-subtle">
                {testimonial.name
                  ? testimonial.situation
                  : 'Học viên học lái xe tại Thầy Tùng'}
              </span>
            </span>
          </>
        ) : testimonial.name ? (
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
