import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, Check } from 'lucide-react';
import { sortedCourses } from '@/content/courses';
import { siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { Section, SectionHeading } from '@/components/ui/section';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card } from '@/components/ui/card';
import { LearningProcessSection } from '@/components/sections/learning-process-section';
import { LeadFormSection } from '@/components/sections/lead-form-section';
import { JsonLd } from '@/components/ui/json-ld';
import { buttonClasses } from '@/components/ui/button';

export const metadata: Metadata = buildPageMetadata({
  title: 'Học phí và lộ trình học lái xe',
  description:
    'So sánh các khóa học lái xe, quy trình học từ đăng ký đến ngày thi và cách thầy tư vấn học phí minh bạch.',
  path: '/hoc-phi-lo-trinh',
});

const transparencyPoints = [
  'Nói rõ từng khoản trước khi bạn quyết định đăng ký.',
  'Phân biệt rõ khoản thuộc học phí và khoản có thể phát sinh.',
  'Không thu thêm khoản nào mà chưa trao đổi trước với bạn.',
  'Giữ lại thông tin đã trao đổi để bạn đối chiếu khi cần.',
];

const notes = [
  'Học phí và lệ phí do cơ sở đào tạo và quy định hiện hành xác định, có thể thay đổi theo thời điểm.',
  'Lịch khai giảng phụ thuộc vào cơ sở đào tạo, không phải lúc nào cũng có khóa mở ngay.',
  'Chi phí khám sức khỏe và các khoản liên quan đến hồ sơ thường được tính riêng.',
  'Nếu bạn muốn luyện thêm giờ ngoài chương trình, phần này được thỏa thuận riêng trước khi học.',
];

export default function TuitionPage() {
  const crumbs = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Học phí & lộ trình', path: '/hoc-phi-lo-trinh' },
  ];

  return (
    <>
      <div className="border-b border-line bg-surface-muted">
        <div className="container-page py-4">
          <Breadcrumb items={crumbs} />
        </div>
      </div>

      <Section ariaLabelledBy="tuition-heading">
        <SectionHeading
          id="tuition-heading"
          as="h1"
          eyebrow="Học phí & lộ trình"
          title="Học phí và lộ trình học"
          description="Trang này giúp bạn so sánh các khóa học và hiểu rõ cách chi phí được tính, trước khi liên hệ để nhận mức học phí cập nhật."
        />

        {/* Bang so sanh khoa hoc */}
        <div className="mt-10 overflow-x-auto rounded-card border border-line">
          <table className="w-full min-w-[46rem] border-collapse bg-surface text-left text-sm">
            <caption className="sr-only">
              Bảng so sánh các khóa học lái xe
            </caption>
            <thead>
              <tr className="bg-brand-900 text-white">
                <th scope="col" className="px-4 py-3.5 font-semibold">
                  Khóa học
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold">
                  Phù hợp với
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold">
                  Loại xe
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold">
                  Thời gian dự kiến
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold">
                  Học phí
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {sortedCourses.map((course) => (
                <tr key={course.slug} className="align-top hover:bg-surface-muted">
                  <th scope="row" className="px-4 py-4 font-semibold text-brand-900">
                    <Link
                      href={`/khoa-hoc/${course.slug}`}
                      className="rounded hover:text-brand-600 hover:underline"
                    >
                      {course.name}
                    </Link>
                  </th>
                  <td className="px-4 py-4 text-ink-muted">
                    {course.suitableFor[0]}
                  </td>
                  <td className="px-4 py-4 text-ink-muted">
                    {course.vehicleType}
                  </td>
                  <td className="px-4 py-4 text-ink-muted">
                    {course.estimatedDuration}
                  </td>
                  <td className="px-4 py-4 text-ink-muted">
                    {course.tuition ? (
                      <span className="font-semibold text-brand-900">
                        {course.tuition.displayValue}
                      </span>
                    ) : (
                      <span className="text-accent-700">Liên hệ để nhận báo giá</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink-subtle">
          {siteConfig.messaging.feeNotConfigured}
        </p>
      </Section>

      <LearningProcessSection tone="muted" />

      <Section ariaLabelledBy="fee-consult-heading">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 id="fee-consult-heading" className="text-2xl sm:text-3xl">
              Cách thầy tư vấn học phí
            </h2>
            <div className="prose-article mt-4">
              <p>
                Tôi không đưa ra một con số chung cho mọi người, vì chi phí thực
                tế phụ thuộc vào khóa bạn chọn, số giờ thực hành bạn cần và các
                khoản liên quan đến hồ sơ tại thời điểm đăng ký.
              </p>
              <p>
                Khi bạn liên hệ, tôi sẽ hỏi rõ nhu cầu rồi gửi bảng chi phí gồm:
                phần học phí đào tạo, các khoản bắt buộc theo quy định, và những
                khoản chỉ phát sinh nếu bạn chủ động yêu cầu thêm.
              </p>
              <p>
                Bạn nên hỏi kỹ trước khi nộp hồ sơ. Việc biết trước toàn bộ chi
                phí giúp bạn chủ động và tránh cảm giác bị động ở giữa khóa.
              </p>
            </div>
          </div>

          <Card>
            <h2 className="text-xl">Chính sách minh bạch chi phí</h2>
            <ul className="mt-4 space-y-3">
              {transparencyPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-muted">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-[1.125rem] w-[1.125rem] flex-shrink-0 text-success-600"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section tone="muted" ariaLabelledBy="notes-heading">
        <div className="mx-auto max-w-3xl">
          <h2
            id="notes-heading"
            className="flex items-center gap-2.5 text-2xl sm:text-3xl"
          >
            <AlertTriangle aria-hidden="true" className="h-6 w-6 text-accent-600" />
            Các lưu ý quan trọng
          </h2>
          <ul className="mt-6 space-y-3">
            {notes.map((note) => (
              <li
                key={note}
                className="rounded-lg border border-line bg-surface p-4 text-[0.9375rem] leading-relaxed text-ink-muted"
              >
                {note}
              </li>
            ))}
          </ul>

          <div className="mt-8 text-center">
            <Link href="#dang-ky" className={buttonClasses('primary', 'lg')}>
              Nhận thông tin học phí mới nhất
            </Link>
          </div>
        </div>
      </Section>

      <LeadFormSection
        formLocation="tuition_page"
        title="Nhận bảng chi phí và lịch khai giảng"
        description="Để lại thông tin, thầy sẽ gửi bảng chi phí chi tiết cùng lịch khai giảng gần nhất."
      />

      <JsonLd data={buildBreadcrumbJsonLd(crumbs)} />
    </>
  );
}
