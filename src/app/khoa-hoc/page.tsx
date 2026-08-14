import type { Metadata } from 'next';
import { sortedCourses } from '@/content/courses';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { Section, SectionHeading } from '@/components/ui/section';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { CourseCard } from '@/components/courses/course-card';
import { ContactSection } from '@/components/sections/contact-section';
import { CtaBanner } from '@/components/sections/cta-banner';
import { JsonLd } from '@/components/ui/json-ld';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Các khóa học lái xe',
  description:
    'Danh sách khóa học lái xe hạng B số tự động, số sàn, hạng C1, bổ túc tay lái và luyện sa hình. Chọn khóa phù hợp với nhu cầu của bạn.',
  path: '/khoa-hoc',
});

export default function CoursesPage() {
  const crumbs = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Khóa học', path: '/khoa-hoc' },
  ];

  return (
    <>
      <div className="border-b border-line bg-surface-muted">
        <div className="container-page py-4">
          <Breadcrumb items={crumbs} />
        </div>
      </div>

      <Section ariaLabelledBy="courses-heading">
        <SectionHeading
          id="courses-heading"
          as="h1"
          eyebrow="Khóa học"
          title="Các khóa học lái xe"
          description="Mỗi khóa dưới đây phục vụ một nhu cầu khác nhau. Nếu chưa rõ mình hợp khóa nào, bạn cứ nhắn cho thầy để được tư vấn trước khi đăng ký."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedCourses.map((course, index) => (
            // headingLevel=2 vi o trang danh sach nay card nam thang duoi <h1>.
            <CourseCard
              key={course.slug}
              course={course}
              priority={index < 2}
              headingLevel={2}
            />
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-card border border-accent-200 bg-accent-50 p-5">
          <h2 className="text-lg">Về học phí</h2>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
            {siteConfig.messaging.feeNotConfigured}
          </p>
        </div>
      </Section>

      <CtaBanner
        title="Chưa biết nên chọn khóa nào?"
        description="Chỉ cần cho thầy biết bạn sẽ lái loại xe gì và rảnh vào khung giờ nào, thầy sẽ gợi ý khóa phù hợp nhất."
        location="courses_page"
      />

      <ContactSection location="courses_page" tone="muted" />

      <JsonLd data={buildBreadcrumbJsonLd(crumbs)} />
    </>
  );
}
