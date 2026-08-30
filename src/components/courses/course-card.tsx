'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CarFront, Clock, Users, Wallet } from 'lucide-react';
import type { Course } from '@/types/content';
import { buttonClasses } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics/track';
import { AnalyticsEvent, CtaLocation } from '@/lib/analytics/events';
import { trackAttributes } from '@/lib/analytics/attributes';

interface CourseCardProps {
  course: Course;
  /** Uu tien tai anh (chi bat cho card dau tien tren trang chu). */
  priority?: boolean;
  /**
   * Cap cua the tieu de trong card.
   *
   * Mac dinh h3 vi tren trang chu card nam duoi mot muc co <h2> ("Khóa học").
   * Nhung o trang danh sach /khoa-hoc thi card nam THANG duoi <h1>, luc do
   * dung h3 se nhay cap h1 -> h3, khien nguoi dung trinh doc man hinh mat mot
   * bac dieu huong. Lighthouse bat loi nay o dot QA 14/08/2026.
   */
  headingLevel?: 2 | 3;
}

export function CourseCard({
  course,
  priority = false,
  headingLevel = 3,
}: CourseCardProps) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3';

  return (
    /*
      `hover-lift` gom ca ba chuyen dong cua the (nhac the, phong anh, day mui
      ten) vao mot goc CSS duy nhat, va toan bo nam trong
      @media (hover: hover) and (pointer: fine).

      Vi sao phai chan bang media query: tren dien thoai, mot lan cham se kich
      hoat :hover roi GIU nguyen trang thai do cho den khi nguoi dung cham cho
      khac - the se dinh o vi tri bi nhac len. Chan tu goc la cach duy nhat
      chac chan, khong the sua bang JavaScript.

      `focus-within` di kem `:hover` de nguoi dieu huong bang ban phim cung
      thay dung phan hoi do khi tab vao the.
    */
    <article className="hover-lift card-base flex h-full flex-col overflow-hidden p-0 shadow-card focus-within:shadow-card-hover hover:shadow-card-hover">
      <Link
        href={`/khoa-hoc/${course.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="hover-zoom-frame block overflow-hidden bg-surface-muted"
      >
        <Image
          src={course.image.src}
          alt=""
          width={course.image.width}
          height={course.image.height}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="hover-zoom-target h-auto w-full"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Heading className="text-lg sm:text-xl">
          <Link
            href={`/khoa-hoc/${course.slug}`}
            onClick={() =>
              trackEvent(AnalyticsEvent.ViewCourse, {
                course: course.slug,
                location: CtaLocation.CourseCard,
              })
            }
            {...trackAttributes(
              AnalyticsEvent.ViewCourse,
              CtaLocation.CourseCard,
              course.slug,
            )}
            className="rounded transition-colors hover:text-brand-600"
          >
            {course.name}
          </Link>
        </Heading>

        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
          {course.summary}
        </p>

        <dl className="mt-4 space-y-2 text-sm text-ink-muted">
          {/*
            Hoc phi dat DAU danh sach vi day la cau hoi dau tien cua nguoi dang
            can nhac. Truoc day the khoa hoc khong he neu gia, nguoi xem phai
            bam vao tung khoa moi thay - dung luc ho con dang so sanh.

            Khoa chua chot hoc phi van giu mot dong o day thay vi an di: mot o
            trong giua danh sach khien nguoi doc tuong web loi, con cau "Lien
            he de nhan bao gia" thi noi dung ban chat va khop voi bang so sanh
            o trang /hoc-phi-lo-trinh.
          */}
          <div className="flex items-start gap-2">
            <dt className="sr-only">Học phí</dt>
            <Wallet
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500"
            />
            <dd
              className={
                course.tuition ? 'font-semibold text-brand-900' : undefined
              }
            >
              {course.tuition
                ? `${course.tuition.displayValue} trọn gói`
                : 'Liên hệ để nhận báo giá'}
            </dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="sr-only">Phù hợp với</dt>
            <Users
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500"
            />
            <dd>{course.suitableFor[0]}</dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="sr-only">Loại xe</dt>
            <CarFront
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500"
            />
            <dd>{course.vehicleType}</dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="sr-only">Thời gian dự kiến</dt>
            <Clock
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500"
            />
            <dd>{course.estimatedDuration}</dd>
          </div>
        </dl>

        {/*
          Hai CTA xep doc va chiem tron chieu ngang o MOI kich thuoc man hinh.
          Ly do:
           - Khong dung `flex-1` trong container `flex-col`: thuoc tinh do an
             vao TRUC DOC (flex-basis: 0%) khien nut co lai theo chieu cao noi
             dung thay vi giu dung chieu cao da dat.
           - Khong xep hai nut canh nhau: card trong luoi 2-3 cot chi rong
             ~360px, moi nut con ~115px nen nhan tieng Viet bi xuong 2 dong o
             cac moc 640px va 1024px.
        */}
        <div className="mt-5 grid grid-cols-1 gap-2 pt-1">
          <Link
            href={`/khoa-hoc/${course.slug}`}
            onClick={() =>
              trackEvent(AnalyticsEvent.ViewCourse, {
                course: course.slug,
                location: CtaLocation.CourseCard,
              })
            }
            className={buttonClasses('outline', 'md')}
          >
            Xem chi tiết
            <ArrowRight
              aria-hidden="true"
              className="hover-nudge-target h-4 w-4"
            />
          </Link>
          {/* Day la y dinh DANG KY gan voi mot khoa hoc cu the - su kien
              co gia tri kinh doanh cao nhat tren luoi khoa hoc, truoc day
              hoan toan khong duoc ghi nhan. */}
          <Link
            href={`/khoa-hoc/${course.slug}#lien-he-nhanh`}
            onClick={() =>
              trackEvent(AnalyticsEvent.RegistrationClick, {
                course: course.slug,
                location: CtaLocation.CourseCard,
              })
            }
            {...trackAttributes(
              AnalyticsEvent.RegistrationClick,
              CtaLocation.CourseCard,
              course.slug,
            )}
            className={buttonClasses('primary', 'md')}
          >
            Liên hệ tư vấn
          </Link>
        </div>
      </div>
    </article>
  );
}
