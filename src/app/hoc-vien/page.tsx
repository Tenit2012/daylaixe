import type { Metadata } from 'next';
import { StudentPhotosSection } from '@/components/sections/student-photos-section';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { JsonLd } from '@/components/ui/json-ld';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { CtaLocation } from '@/lib/analytics/events';

export const metadata: Metadata = buildPageMetadata({
  title: 'Học viên nói gì về Thầy Tùng',
  description:
    'Chia sẻ của học viên sau quá trình học và thực hành lái xe cùng Thầy Tùng tại trung tâm.',
  path: '/hoc-vien',
});

/**
 * Trang cam nhan hoc vien.
 *
 * THAY CHO `/cam-nhan-hoc-vien` da xoa ngay 20/09/2026. Khac biet co ban:
 * trang cu chu yeu la 10 TINH HUONG MINH HOA (noi dung do doi ngu viet),
 * trang nay chi co cam nhan cua NGUOI THAT da dong y ca anh lan loi.
 *
 * KHONG co JSON-LD dang `Review`/`AggregateRating`. Du day la cam nhan that,
 * khai bao du lieu co cau truc dang danh gia se khien Google hien sao tren
 * ket qua tim kiem - ngu y day la diem so tu mot nen tang danh gia, dieu
 * khong dung voi nam loi chia se nay.
 *
 * Toan bo phan hien thi nam trong `StudentPhotosSection` - dung chung voi
 * trang chu de sua mot cho la ca hai noi cung doi.
 */
export default function StudentsPage() {
  const crumbs = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Học viên', path: '/hoc-vien' },
  ];

  return (
    <>
      <div className="border-b border-line bg-surface-muted">
        <div className="container-page py-4">
          <Breadcrumb items={crumbs} />
        </div>
      </div>

      <StudentPhotosSection
        location={CtaLocation.TestimonialsPage}
        headingAs="h1"
      />

      <JsonLd data={buildBreadcrumbJsonLd(crumbs)} />
    </>
  );
}
