import Link from 'next/link';
import { Info } from 'lucide-react';
import {
  hasPendingApprovalQuotes,
  studentPhotoDisclosure,
  studentPhotoTestimonials,
} from '@/content/testimonials';
import { Section, SectionHeading } from '@/components/ui/section';
import { TestimonialCard } from '@/components/testimonials/testimonial-card';
import { CallButton, ZaloButton } from '@/components/ui/contact-buttons';
import { buttonClasses } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { staggerDelay } from '@/lib/utils/stagger';
import type { CtaLocationName } from '@/lib/analytics/events';

interface StudentPhotosSectionProps {
  location: CtaLocationName;
  tone?: 'default' | 'muted';
  /**
   * The tieu de. Tren trang chu day la mot muc trong nhieu muc nen dung `h2`
   * (mac dinh); tren `/hoc-vien` no la noi dung chinh cua trang nen phai la
   * `h1`, neu khong trang do se khong co `h1` nao.
   */
  headingAs?: 'h1' | 'h2';
  /** So the hien toi da. Bo trong = hien tat ca. */
  limit?: number;
  /** Hien nut dan sang `/hoc-vien` (dung o trang chu, khong dung o chinh no). */
  showAllLink?: boolean;
}

/**
 * Khoi anh hoc vien that.
 *
 * TACH RIENG khoi `TestimonialsSection` mot cach co y, khong tron chung mot
 * luoi: hai khoi co MUC DO XAC THUC KHAC NHAU (nguoi that + loi cho duyet,
 * so voi tinh huong minh hoa hoan toan). Tron lan vao nhau thi nguoi doc
 * khong con phan biet duoc dau la dau, va nhan tren tung the se thanh thu
 * trang tri chu khong con y nghia.
 *
 * Danh sach rong -> KHONG render gi. Muon tat khoi nay chi can de
 * `studentPhotoTestimonials` thanh `[]`.
 */
export function StudentPhotosSection({
  location,
  tone = 'default',
  headingAs = 'h2',
  limit,
  showAllLink = false,
}: StudentPhotosSectionProps) {
  if (studentPhotoTestimonials.length === 0) return null;

  const items = limit
    ? studentPhotoTestimonials.slice(0, limit)
    : studentPhotoTestimonials;
  const hasMore = items.length < studentPhotoTestimonials.length;

  return (
    <Section id="hoc-vien" tone={tone} ariaLabelledBy="hoc-vien-heading">
      <SectionHeading
        id="hoc-vien-heading"
        as={headingAs}
        eyebrow="Học viên"
        title="Học viên nói gì về Thầy Tùng?"
        description="Những chia sẻ từ học viên sau quá trình học và thực hành lái xe cùng Thầy Tùng."
      />

      {/*
        CHI hien khi con muc dang cho nguoi trong anh duyet loi.

        Da bo doan ghi nhan thuong truc "da duoc dong y cho su dung"
        (20/09/2026): khi tat ca deu da duyet thi cau do khong noi them gi
        cho khach dang tim cho hoc, chi lam nang dau khoi. Su dong y nam o
        viec da hoi va da duoc tra loi, khong nam o dong chu tren trang.

        Co che canh bao GIU NGUYEN de sau nay them hoc vien moi chua duyet
        thi nhan tu hien lai.
      */}
      {hasPendingApprovalQuotes() ? (
        <p className="mx-auto mt-6 flex max-w-3xl items-start gap-2.5 rounded-lg border border-accent-200 bg-accent-50 p-4 text-sm leading-relaxed text-ink-muted">
          <Info
            aria-hidden="true"
            className="mt-0.5 h-[1.125rem] w-[1.125rem] flex-shrink-0 text-accent-600"
          />
          <span>{studentPhotoDisclosure}</span>
        </p>
      ) : null}

      {/*
        3 the hang dau + 2 the hang sau tren desktop (lg:grid-cols-3), 2 cot
        o tablet, 1 cot doc tren dien thoai. KHONG dung carousel tu chay:
        noi dung dang cho duyet ma tu chuyen canh thi nguoi doc de bo qua
        nhan canh bao.

        KHONG hien sao danh gia: day khong phai review tu mot nen tang danh
        gia nao, them sao vao se tao cam giac sai ve nguon goc noi dung.
      */}
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Reveal
            as="li"
            key={item.id}
            delay={staggerDelay(index)}
            className="h-full"
          >
            <TestimonialCard testimonial={item} />
          </Reveal>
        ))}
      </ul>

      {showAllLink && hasMore ? (
        <div className="mt-9 text-center">
          <Link href="/hoc-vien" className={buttonClasses('outline', 'md')}>
            Xem tất cả cảm nhận
          </Link>
        </div>
      ) : null}

      <div className="mt-10 text-center">
        <p className="text-base font-semibold text-brand-900">
          Bạn cũng đang chuẩn bị học lái xe?
        </p>
        <p className="mx-auto mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-ink-muted">
          Trao đổi trực tiếp với thầy để được tư vấn khóa học và lịch học phù
          hợp.
        </p>
        {/*
          Dung lai `CallButton` / `ZaloButton` san co - keo theo dung so dien
          thoai, link Zalo va tracking GA4 dang dung o cac khoi khac. Khong tu
          dat URL hay so dien thoai moi o day.
        */}
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <CallButton location={location} size="md" />
          <ZaloButton location={location} size="md" />
        </div>
      </div>
    </Section>
  );
}
