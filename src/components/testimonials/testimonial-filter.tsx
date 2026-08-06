'use client';

import { useMemo, useState } from 'react';
import { testimonials } from '@/content/testimonials';
import { sortedCourses } from '@/content/courses';
import { TestimonialCard } from './testimonial-card';
import { cn } from '@/lib/utils/cn';

/**
 * Bo loc cam nhan theo khoa hoc.
 * Loc phia client tren tap du lieu tinh - khong goi mang.
 */
export function TestimonialFilter() {
  const [activeCourse, setActiveCourse] = useState<string>('all');

  const filters = useMemo(() => {
    const usedSlugs = new Set(testimonials.map((item) => item.courseSlug));
    return [
      { value: 'all', label: 'Tất cả' },
      ...sortedCourses
        .filter((course) => usedSlugs.has(course.slug))
        .map((course) => ({ value: course.slug, label: course.shortName })),
    ];
  }, []);

  const visible = useMemo(
    () =>
      activeCourse === 'all'
        ? testimonials
        : testimonials.filter((item) => item.courseSlug === activeCourse),
    [activeCourse],
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Lọc cảm nhận theo khóa học"
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {filters.map((filter) => {
          const isActive = activeCourse === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveCourse(filter.value)}
              className={cn(
                'flex-shrink-0 rounded-pill border px-4 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'border-brand-800 bg-brand-800 text-white'
                  : 'border-line bg-surface text-ink-muted hover:border-brand-300 hover:text-brand-800',
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-ink-subtle">
        Đang hiển thị {visible.length} cảm nhận
        {activeCourse === 'all' ? '' : ' của khóa đã chọn'}.
      </p>

      {visible.length > 0 ? (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((testimonial) => (
            <li key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-card border border-line bg-surface-muted p-6 text-center text-sm text-ink-muted">
          Chưa có cảm nhận nào cho khóa học này.
        </p>
      )}
    </div>
  );
}
