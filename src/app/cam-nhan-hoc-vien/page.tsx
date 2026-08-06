import type { Metadata } from 'next';
import Image from 'next/image';
import { Info, PlayCircle } from 'lucide-react';
import { testimonialVideos } from '@/content/testimonials';
import { galleryItems } from '@/content/gallery';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { Section, SectionHeading } from '@/components/ui/section';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { TestimonialFilter } from '@/components/testimonials/testimonial-filter';
import { GalleryGrid } from '@/components/gallery/gallery-grid';
import { LeadFormSection } from '@/components/sections/lead-form-section';
import { JsonLd } from '@/components/ui/json-ld';

export const metadata: Metadata = buildPageMetadata({
  title: 'Cảm nhận học viên',
  description:
    'Chia sẻ của học viên về quá trình học lái xe, từ buổi đầu làm quen tay lái đến ngày thi sát hạch.',
  path: '/cam-nhan-hoc-vien',
});

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

        <div className="mx-auto mt-6 flex max-w-3xl items-start gap-2.5 rounded-lg border border-accent-200 bg-accent-50 p-4 text-sm leading-relaxed text-ink-muted">
          <Info
            aria-hidden="true"
            className="mt-0.5 h-[1.125rem] w-[1.125rem] flex-shrink-0 text-accent-600"
          />
          <span>
            Các cảm nhận đang hiển thị là <strong>nội dung mẫu</strong> do đội ngũ
            biên tập viết để minh họa bố cục trang. Đây không phải phản hồi của
            học viên thật. Khi có cảm nhận thật được học viên đồng ý chia sẻ,
            chúng sẽ thay thế toàn bộ nội dung mẫu này.
          </span>
        </div>

        <div className="mt-10">
          <TestimonialFilter />
        </div>
      </Section>

      <Section tone="muted" ariaLabelledBy="videos-heading">
        <SectionHeading
          id="videos-heading"
          eyebrow="Video"
          title="Video cảm nhận"
          description="Khu vực dành cho video chia sẻ của học viên. Video chỉ được đăng khi học viên đồng ý."
        />

        <ul className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
          {testimonialVideos.map((video) => (
            <li key={video.id} className="card-base overflow-hidden p-0">
              <figure>
                <div className="relative bg-brand-900">
                  <Image
                    src={video.posterImage}
                    alt={`Vị trí đặt video: ${video.title}`}
                    width={800}
                    height={450}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="h-auto w-full opacity-90"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle
                      aria-hidden="true"
                      className="h-14 w-14 text-white/85"
                    />
                  </span>
                </div>
                <figcaption className="p-4">
                  <h3 className="text-base">{video.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    {video.description}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>

      <Section ariaLabelledBy="album-heading">
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

      <LeadFormSection
        formLocation="testimonials_page"
        tone="muted"
        title="Muốn bắt đầu như các học viên khác?"
        description="Để lại thông tin, thầy sẽ liên hệ tư vấn khóa học phù hợp với bạn."
      />

      <JsonLd data={buildBreadcrumbJsonLd(crumbs)} />
    </>
  );
}
