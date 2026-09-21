import type { Metadata } from 'next';
import { AlertTriangle, Check } from 'lucide-react';
import { getCourseBySlug, sortedCourses } from '@/content/courses';
import { siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { Section, SectionHeading } from '@/components/ui/section';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card } from '@/components/ui/card';
import { LearningProcessSection } from '@/components/sections/learning-process-section';
import { ContactSection } from '@/components/sections/contact-section';
import { JsonLd } from '@/components/ui/json-ld';
import { buttonClasses } from '@/components/ui/button';
import { AnalyticsEvent, CtaLocation } from '@/lib/analytics/events';
import { TrackedLink } from '@/components/ui/tracked-link';
import { TuitionPanel } from '@/components/courses/tuition-panel';
import { CallButton, ZaloButton } from '@/components/ui/contact-buttons';
import type { Course, CourseTuition } from '@/types/content';

export const metadata: Metadata = buildPageMetadata({
  title: 'Học phí học lái xe ô tô tại Thủ Đức',
  description:
    'So sánh học phí 5 khóa học lái xe tại trung tâm ở Thủ Đức, TP.HCM: khoản nào đã bao gồm, khoản nào có thể phát sinh, và lộ trình từ nộp hồ sơ đến ngày sát hạch.',
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
  /*
   * Cau nay TRUOC DAY viet "luyen them gio ngoai chuong trinh duoc thoa thuan
   * rieng", tuc la doc ra thanh mot khoan phai tra them. Tu 16/09/2026 hai
   * khoa hang B ghi ro trong danh sach "da bao gom" rang phan thuc hanh duoc
   * ho tro khong gioi han gio - de nguyen cau cu thi hai cho trong cung mot
   * trang noi nguoc nhau. Cau moi giu lai dieu KIEN co that (lich san tap,
   * lich cua thay) ma khong bien no thanh khoan tien.
   */
  'Phần thực hành được hỗ trợ theo chính sách đào tạo của thầy và Trung tâm. Lịch luyện thêm còn phụ thuộc lịch sân tập và lịch dạy, nên bạn hãy báo trước để thầy sắp xếp.',
];

/**
 * Hai khoa duoc dua len thanh the rieng phia tren bang so sanh.
 *
 * Chi hai hang B: day la hai khoa co muc tron goi chot va co danh sach quyen
 * loi day du, nen the moi noi duoc dieu ma bang khong noi duoc - 18,9tr /
 * 18,5tr MUA DUOC GI. Ba khoa con lai (C1 tinh theo dot, bo tuc va sa hinh
 * chua chot gia) khong co du du lieu de lap day mot the; de chung o bang so
 * sanh ben duoi dung hon la ve the rong.
 *
 * Loc theo `tuition != null` co chu dich: neu mot slug bi doi ten hoac hoc
 * phi bi dua ve `null`, trang van dung - chi mat the do, thay vi sap ca trang
 * bang mot loi doc thuoc tinh cua `undefined`.
 */
const featuredTuitionSlugs = ['hang-b-so-tu-dong', 'hang-b-so-san'];

export default function TuitionPage() {
  const featuredTuitionCourses = featuredTuitionSlugs
    .map((slug) => getCourseBySlug(slug))
    .filter(
      (course): course is Course & { tuition: CourseTuition } =>
        course?.tuition != null,
    );

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
          title="Học phí học lái xe tại Thủ Đức"
          description="Mức trọn gói của từng khóa được ghi ngay trong bảng dưới đây, kèm giải thích khoản nào đã bao gồm và khoản nào có thể phát sinh."
        />

        {/*
          Hai the hang B nam canh nhau tu `md` tro len, xep doc tren dien
          thoai. Moc `md` chu khong phai `lg`: moi the la mot danh sach chu
          ngan, den 768px la du rong de hai cot con doc thoai mai - cho doi
          den 1024px se de trong nua man hinh tablet.
        */}
        {featuredTuitionCourses.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {featuredTuitionCourses.map((course) => (
              <div
                key={course.slug}
                className="card-base flex flex-col p-5 sm:p-6"
              >
                <TuitionPanel
                  tuition={course.tuition}
                  courseName={course.shortName}
                  headingLevel={4}
                  className="flex-1"
                  footer={
                    <div className="flex flex-col gap-2.5">
                      <ZaloButton
                        location={CtaLocation.Pricing}
                        course={course.slug}
                        size="md"
                        label="Nhắn Zalo hỏi lịch học"
                      />
                      <CallButton
                        location={CtaLocation.Pricing}
                        course={course.slug}
                        size="md"
                        label="Gọi thầy Tùng"
                      />
                    </div>
                  }
                />
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-6 rounded-card border border-brand-200 bg-brand-50 p-5">
          <h2 className="text-lg">Học phí rõ ngay từ đầu</h2>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
            Những khoản đã bao gồm và những khoản có thể phát sinh đều được
            thông tin trước để bạn chủ động chi phí, thay vì biết thêm khoản
            mới khi đã học được nửa khóa.
          </p>
        </div>

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
                <tr
                  key={course.slug}
                  className="align-top hover:bg-surface-muted"
                >
                  <th
                    scope="row"
                    className="px-4 py-4 font-semibold text-brand-900"
                  >
                    <TrackedLink
                      href={`/khoa-hoc/${course.slug}`}
                      event={AnalyticsEvent.ViewCourse}
                      location={CtaLocation.Pricing}
                      course={course.slug}
                      className="rounded hover:text-brand-600 hover:underline"
                    >
                      {course.name}
                    </TrackedLink>
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
                      /*
                       * Chua chot hoc phi -> dua thang nguoi doc toi trang
                       * Lien he. De dang chu tinh thi o giua bang so sanh no
                       * thanh ngo cut: doc xong khong biet di dau tiep.
                       * Gach chan luon hien vi trong mot bang du lieu, chu
                       * chi doi mau khong du de nhan ra la bam duoc.
                       */
                      <TrackedLink
                        href="/lien-he"
                        event={AnalyticsEvent.RegistrationClick}
                        location={CtaLocation.Pricing}
                        course={course.slug}
                        aria-label={`Liên hệ để nhận báo giá khóa ${course.name}`}
                        className="rounded font-semibold text-accent-700 underline underline-offset-4 hover:text-accent-800"
                      >
                        Liên hệ để nhận báo giá
                      </TrackedLink>
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
                Học phí do trung tâm công bố, và bạn đóng trực tiếp cho trung
                tâm chứ không đóng cho tôi. Tôi không thu bất kỳ khoản nào riêng
                và không nhận tiền đặt cọc giữ chỗ.
              </p>
              <p>
                Bảng trên là mức trọn gói trung tâm đang công bố, tôi ghi thẳng
                ra đây để bạn tính được ngân sách trước khi gọi. Phần thực hành
                đã nằm trong mức trọn gói nên bạn không phải trả thêm theo số
                giờ. Con số cuối cùng của bạn có thể lệch đôi chút vì các khoản
                liên quan đến hồ sơ tại thời điểm đăng ký.
              </p>
              <p>
                Khi bạn liên hệ, tôi sẽ hỏi rõ nhu cầu rồi xác nhận lại mức
                trung tâm đang áp dụng đúng đợt khai giảng của bạn, gồm: phần
                học phí đào tạo, các khoản bắt buộc theo quy định, và những
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
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-[0.9375rem] text-ink-muted"
                >
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
            <AlertTriangle
              aria-hidden="true"
              className="h-6 w-6 text-accent-600"
            />
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
            <TrackedLink
              href="#lien-he-nhanh"
              event={AnalyticsEvent.ViewPricing}
              location={CtaLocation.Pricing}
              className={buttonClasses('primary', 'lg')}
            >
              Nhận thông tin học phí mới nhất
            </TrackedLink>
          </div>
        </div>
      </Section>

      <ContactSection
        location={CtaLocation.Pricing}
        title="Nhận bảng chi phí và lịch khai giảng"
        description="Gọi hoặc nhắn tin cho thầy để nhận bảng chi phí chi tiết cùng lịch khai giảng gần nhất."
      />

      <JsonLd data={buildBreadcrumbJsonLd(crumbs)} />
    </>
  );
}
