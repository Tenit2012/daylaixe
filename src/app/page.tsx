import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero-section';
import { TrustBadgesSection } from '@/components/sections/trust-badges-section';
import { AboutTeacherSection } from '@/components/sections/about-teacher-section';
import { LessonVideoSection } from '@/components/sections/lesson-video-section';
import { WhereToStudySection } from '@/components/sections/where-to-study-section';
import { LearningProcessSection } from '@/components/sections/learning-process-section';
import { CoursesSection } from '@/components/sections/courses-section';
import { WhyChooseSection } from '@/components/sections/why-choose-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { StudentPhotosSection } from '@/components/sections/student-photos-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { FaqSection } from '@/components/sections/faq-section';
import { ContactSection } from '@/components/sections/contact-section';
import { JsonLd } from '@/components/ui/json-ld';
import { buildFaqJsonLd } from '@/lib/seo/structured-data';
import { generalFaqs } from '@/content/faqs';
import { registrationProcess } from '@/content/registration-process';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/config/site';
import { CtaLocation } from '@/lib/analytics/events';

export const metadata: Metadata = buildPageMetadata({
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  path: '/',
});

/**
 * Trang chu = landing page.
 *
 * Thu tu cac muc bam theo dung thu tu cau hoi cua mot nguoi dang can nhac
 * bo ra 20-30 trieu dong:
 *   1. Day la ai, hoc o dau?          -> Hero
 *   2. Co gi bao dam khong?           -> TrustBadges
 *   3. Nguoi day la ai?               -> AboutTeacher
 *   4. Cho toi xem thay day di.       -> LessonVideo
 *   5. Hoc o cho nao, den the nao?    -> WhereToStudy
 *   6. Dang ky ra sao?                -> LearningProcess (ban 6 buoc)
 *   7. Co nhung khoa nao?             -> Courses
 *   8. Thay day the nao?              -> WhyChoose
 *   9. Ai da hoc roi?                 -> StudentPhotos (anh hoc vien that)
 *  10. Cho xem them hinh anh.         -> Gallery
 *  11. Nguoi hoc roi noi gi?          -> Testimonials (tinh huong minh hoa)
 *  12. Toi con thac mac.              -> FAQ
 *  13. Lien he thoi.                  -> ContactSection
 *
 * Buoc 9 dat NGAY SAU WhyChoose: vua doc xong ly do nen chon thay thi gap
 * ngay nguoi that da hoc - do la cho bang chung co suc nang nhat. Khoi nay
 * TACH RIENG khoi buoc 11 vi hai khoi co muc do xac thuc khac nhau; xem ghi
 * chu trong `student-photos-section.tsx`.
 *
 * Nen sang/toi xen ke duoc chi dinh thu cong o day thay vi de tung component
 * tu quyet - vi thu tu cac muc con thay doi.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadgesSection />
      <AboutTeacherSection />
      <LessonVideoSection location={CtaLocation.Home} tone="muted" />
      <WhereToStudySection tone="default" />
      <LearningProcessSection
        tone="muted"
        steps={registrationProcess}
        id="quy-trinh"
        eyebrow="Quy trình"
        title="Đăng ký và học như thế nào"
        description="Bảy bước từ lúc bạn gọi cho thầy đến ngày thi sát hạch. Bạn luôn biết mình đang ở bước nào."
      />
      <CoursesSection />
      <WhyChooseSection />
      {/*
        Chi 3/5 the o trang chu + nut dan sang /hoc-vien: trang chu da rat
        dai, va hien du 5 the o day thi trang /hoc-vien thanh ban sao y het,
        khong con ly do de bam vao.
      */}
      <StudentPhotosSection
        location={CtaLocation.Home}
        tone="muted"
        limit={3}
        showAllLink
      />
      <GallerySection />
      {/*
        limit=6 thay vi mac dinh 3: trang /cam-nhan-hoc-vien da bi xoa
        (20/09/2026) nen khong con cho nao xem day du 10 tinh huong nua.
      */}
      <TestimonialsSection tone="default" limit={6} />
      <FaqSection tone="default" />
      <ContactSection location={CtaLocation.Home} tone="muted" />

      <JsonLd data={buildFaqJsonLd(generalFaqs)} />
    </>
  );
}
