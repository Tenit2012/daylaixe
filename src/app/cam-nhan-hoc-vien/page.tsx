import type { Metadata } from 'next';
import { Info } from 'lucide-react';
import { hasPlaceholderTestimonials } from '@/content/testimonials';
import { galleryItems } from '@/content/gallery';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { Section, SectionHeading } from '@/components/ui/section';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { TestimonialFilter } from '@/components/testimonials/testimonial-filter';
import { GalleryGrid } from '@/components/gallery/gallery-grid';
import { ContactSection } from '@/components/sections/contact-section';
import { JsonLd } from '@/components/ui/json-ld';

export const metadata: Metadata = buildPageMetadata({
  title: 'Cảm nhận học viên',
  description:
    'Chia sẻ của học viên về quá trình học lái xe, từ buổi đầu làm quen tay lái đến ngày thi sát hạch.',
  path: '/cam-nhan-hoc-vien',
});

/**
 * Trang cam nhan hoc vien.
 *
 * KHONG co JSON-LD dang `Review`/`AggregateRating`. Day la co y: khi cam
 * nhan con la noi dung mau thi khai bao du lieu co cau truc nhu that vua
 * sai su that vua bi Google phat. Chi them lai khi co cam nhan that kiem
 * chung duoc.
 */
export default function TestimonialsPage() {
  const crumbs = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Cảm nhận học viên', path: '/cam-nhan-hoc-vien' },
  ];

  return (
    <>
      <div className="border-b border-line bg-surface-muted">
        <div className="container-page py-4">
          <Breadcrumb items={crumbs} />
        </div>
      </div>

      <Section ariaLabelledBy="testimonials-heading">
        <SectionHeading
          id="testimonials-heading"
          as="h1"
          eyebrow="Cảm nhận"
          title="Cảm nhận học viên"
          description="Những chia sẻ về quá trình học. Bạn có thể lọc theo khóa học để xem cảm nhận sát với trường hợp của mình."
        />

        {hasPlaceholderTestimonials() ? (
          <div className="mx-auto mt-6 flex max-w-3xl items-start gap-2.5 rounded-lg border border-accent-200 bg-accent-50 p-4 text-sm leading-relaxed text-ink-muted">
            <Info
              aria-hidden="true"
              className="mt-0.5 h-[1.125rem] w-[1.125rem] flex-shrink-0 text-accent-600"
            />
            <span>
              Các cảm nhận đang hiển thị là <strong>nội dung mẫu</strong> do
              người làm website viết để minh họa bố cục trang. Đây không phải
              phản hồi của học viên thật. Khi có cảm nhận thật được học viên
              đồng ý chia sẻ, chúng sẽ thay thế toàn bộ nội dung mẫu này.
            </span>
          </div>
        ) : null}

        <div className="mt-10">
          <TestimonialFilter />
        </div>
      </Section>

      <Section tone="muted" ariaLabelledBy="album-heading">
        <SectionHeading
          id="album-heading"
          eyebrow="Album"
          title="Album học viên"
          description="Hình ảnh minh họa các buổi học. Ảnh có mặt học viên chỉ được đăng khi có sự đồng ý."
        />
        <div className="mt-10">
          <GalleryGrid items={galleryItems} />
        </div>
      </Section>

      <ContactSection
        location="testimonials_page"
        title="Muốn bắt đầu như các học viên khác?"
        description="Gọi hoặc nhắn Zalo cho thầy để được tư vấn khóa học phù hợp với bạn."
      />

      <JsonLd data={buildBreadcrumbJsonLd(crumbs)} />
    </>
  );
}
