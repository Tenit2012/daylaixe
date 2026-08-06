'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CarFront, Clock, Users } from 'lucide-react';
import type { Course } from '@/types/content';
import { buttonClasses } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics/track';
import { AnalyticsEvent } from '@/lib/analytics/events';
import { cn } from '@/lib/utils/cn';

interface CourseCardProps {
  course: Course;
  /** Uu tien tai anh (chi bat cho card dau tien tren trang chu). */
  priority?: boolean;
}

export function CourseCard({ course, priority = false }: CourseCardProps) {
  return (
    <article className="card-base flex h-full flex-col overflow-hidden p-0 transition-shadow duration-150 hover:shadow-card-hover">
      <Link
        href={`/khoa-hoc/${course.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="block overflow-hidden bg-surface-muted"
      >
        <Image
          src={course.image.src}
          alt=""
          width={course.image.width}
          height={course.image.height}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-auto w-full"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl">
          <Link
            href={`/khoa-hoc/${course.slug}`}
            onClick={() =>
              trackEvent(AnalyticsEvent.ClickCourse, { course: course.slug })
            }
            className="rounded transition-colors hover:text-brand-600"
          >
            {course.name}
          </Link>
        </h3>

        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
          {course.summary}
        </p>

        <dl className="mt-4 space-y-2 text-sm text-ink-muted">
          <div className="flex items-start gap-2">
            <dt className="sr-only">Phù hợp với</dt>
            <Users aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
            <dd>{course.suitableFor[0]}</dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="sr-only">Loại xe</dt>
            <CarFront aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
            <dd>{course.vehicleType}</dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="sr-only">Thời gian dự kiến</dt>
            <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
            <dd>{course.estimatedDuration}</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-col gap-2 pt-1 sm:flex-row">
          <Link
            href={`/khoa-hoc/${course.slug}`}
            onClick={() =>
              trackEvent(AnalyticsEvent.ClickCourse, { course: course.slug })
            }
            className={cn(buttonClasses('outline', 'sm'), 'flex-1')}
          >
            Xem chi tiết
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link
            href={`/khoa-hoc/${course.slug}#dang-ky`}
            onClick={() =>
              trackEvent(AnalyticsEvent.OpenForm, {
                location: 'course_card',
                course: course.slug,
              })
            }
            className={cn(buttonClasses('primary', 'sm'), 'flex-1')}
          >
            Đăng ký tư vấn
          </Link>
        </div>
      </div>
    </article>
  );
}
