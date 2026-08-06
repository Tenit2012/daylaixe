import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CarFront, CheckCircle2, Clock, FileText, Users } from 'lucide-react';
import { getAllCourseSlugs, getCourseBySlug } from '@/content/courses';
import { siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import {
  buildBreadcrumbJsonLd,
  buildCourseJsonLd,
  buildFaqJsonLd,
} from '@/lib/seo/structured-data';
import { Section } from '@/components/ui/section';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Accordion } from '@/components/ui/accordion';
import { CallButton, ZaloButton } from '@/components/ui/contact-buttons';
import { LeadFormSection } from '@/components/sections/lead-form-section';
import { JsonLd } from '@/components/ui/json-ld';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Sinh san toan bo trang chi tiet khoa hoc luc build. */
export function generateStaticParams() {
  return getAllCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return buildPageMetadata({
      title: 'Không tìm thấy khóa học',
      description: 'Khóa học bạn tìm không tồn tại hoặc đã được đổi tên.',
      path: `/khoa-hoc/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `Khóa học ${course.name}`,
    description: course.summary,
    path: `/khoa-hoc/${course.slug}`,
    image: course.image.src,
  });
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) notFound();

  const crumbs = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Khóa học', path: '/khoa-hoc' },
    { name: course.name, path: `/khoa-hoc/${course.slug}` },
  ];

  return (
    <>
      <div className="border-b border-line bg-surface-muted">
        <div className="container-page py-4">
          <Breadcrumb items={crumbs} />
        </div>
      </div>

      {/* Hero khoa hoc */}
      <section className="bg-gradient-to-b from-brand-50 to-surface">
        <div className="container-page py-10 lg:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-600">
                Khóa học
              </p>
              <h1 className="mt-3 text-3xl sm:text-4xl">{course.name}</h1>
              <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                {course.summary}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {course.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-white px-3 py-1.5 text-sm font-medium text-brand-800"
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="h-4 w-4 text-success-600"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <CallButton location={`course_${course.slug}`} size="lg" />
                <ZaloButton location={`course_${course.slug}`} size="lg" />
              </div>
            </div>

            <div className="overflow-hidden rounded-card border border-line bg-white shadow-card">
              <Image
                src={course.image.src}
                alt={course.image.alt}
                width={course.image.width}
                height={course.image.height}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <Section ariaLabelledBy="course-detail-heading">
        <h2 id="course-detail-heading" className="sr-only">
          Thông tin chi tiết khóa học
        </h2>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-12">
          <div className="space-y-10">
            <div>
              <h3 className="text-xl sm:text-2xl">Giới thiệu khóa học</h3>
              <p className="prose-article mt-3">{course.description}</p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl">Khóa học phù hợp với ai?</h3>
              <ul className="mt-4 space-y-2.5">
                {course.suitableFor.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-muted">
                    <Users
                      aria-hidden="true"
                      className="mt-0.5 h-[1.125rem] w-[1.125rem] flex-shrink-0 text-brand-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl">Nội dung học và lộ trình</h3>
              <ol className="mt-4 space-y-4">
                {course.curriculum.map((item, index) => (
                  <li key={item.title} className="card-base">
                    <div className="flex items-start gap-3">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-800 text-sm font-bold text-white">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="text-base">{item.title}</h4>
                        <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-muted">
                          {item.details}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl">Hồ sơ cần chuẩn bị</h3>
              <ul className="mt-4 space-y-2.5">
                {course.requiredDocuments.map((doc) => (
                  <li key={doc} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-muted">
                    <FileText
                      aria-hidden="true"
                      className="mt-0.5 h-[1.125rem] w-[1.125rem] flex-shrink-0 text-brand-500"
                    />
                    {doc}
                  </li>
                ))}
              </ul>
              <p className="mt-3 rounded-lg border border-accent-200 bg-accent-50 p-3.5 text-sm leading-relaxed text-ink-muted">
                Danh mục hồ sơ có thể thay đổi theo quy định hiện hành. Bạn hãy
                liên hệ để nhận danh sách được cập nhật đúng tại thời điểm nộp.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl">Học phí</h3>
              {course.tuition ? (
                <div className="mt-4 space-y-4">
                  <p className="text-2xl font-bold text-brand-900">
                    {course.tuition.displayValue}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="card-base">
                      <h4 className="text-base text-success-700">
                        Đã bao gồm
                      </h4>
                      <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
                        {course.tuition.included.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="card-base">
                      <h4 className="text-base text-accent-700">
                        Có thể phát sinh
                      </h4>
                      <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
                        {course.tuition.mayIncurAdditional.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {course.tuition.note ? (
                    <p className="text-sm text-ink-subtle">{course.tuition.note}</p>
                  ) : null}
                </div>
              ) : (
                <div className="mt-4 rounded-card border border-accent-200 bg-accent-50 p-5">
                  <p className="text-[0.9375rem] leading-relaxed text-ink-muted">
                    {siteConfig.messaging.feeNotConfigured}
                  </p>
                  <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                    <CallButton
                      location={`course_fee_${course.slug}`}
                      size="sm"
                    />
                    <ZaloButton
                      location={`course_fee_${course.slug}`}
                      size="sm"
                      label="Hỏi học phí qua Zalo"
                    />
                  </div>
                </div>
              )}
            </div>

            {course.faqs.length > 0 ? (
              <div>
                <h3 className="text-xl sm:text-2xl">
                  Câu hỏi thường gặp về khóa này
                </h3>
                <div className="mt-4">
                  <Accordion
                    items={course.faqs.map((faq) => ({
                      question: faq.question,
                      answer: faq.answer,
                    }))}
                    defaultOpenIndex={-1}
                  />
                </div>
              </div>
            ) : null}
          </div>

          {/* Cot thong tin nhanh */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card-base">
              <h3 className="text-lg">Thông tin nhanh</h3>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="flex items-center gap-2 font-semibold text-brand-900">
                    <CarFront aria-hidden="true" className="h-4 w-4 text-brand-500" />
                    Loại xe
                  </dt>
                  <dd className="mt-1 text-ink-muted">{course.vehicleType}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 font-semibold text-brand-900">
                    <Clock aria-hidden="true" className="h-4 w-4 text-brand-500" />
                    Thời gian dự kiến
                  </dt>
                  <dd className="mt-1 text-ink-muted">
                    {course.estimatedDuration}
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 font-semibold text-brand-900">
                    <FileText aria-hidden="true" className="h-4 w-4 text-brand-500" />
                    Hạng giấy phép
                  </dt>
                  <dd className="mt-1 text-ink-muted">
                    {course.licenseClass === 'BO_TUC' ||
                    course.licenseClass === 'SA_HINH'
                      ? 'Khóa kỹ năng, không cấp bằng mới'
                      : `Hạng ${course.licenseClass}`}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-col gap-2.5 border-t border-line pt-5">
                <CallButton location={`course_sidebar_${course.slug}`} size="md" />
                <ZaloButton location={`course_sidebar_${course.slug}`} size="md" />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <LeadFormSection
        defaultCourse={course.slug}
        formLocation={`course_${course.slug}`}
        tone="muted"
        title={`Đăng ký tư vấn khóa ${course.name}`}
        description="Thầy sẽ liên hệ để trao đổi về lịch học, hồ sơ và học phí được cập nhật mới nhất."
      />

      <JsonLd data={buildCourseJsonLd(course)} />
      <JsonLd data={buildBreadcrumbJsonLd(crumbs)} />
      {course.faqs.length > 0 ? (
        <JsonLd data={buildFaqJsonLd(course.faqs)} />
      ) : null}
    </>
  );
}
