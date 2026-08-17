'use client';

import { useMemo, useState } from 'react';
import { testimonials } from '@/content/testimonials';
import { TestimonialCard } from './testimonial-card';
import { cn } from '@/lib/utils/cn';

/**
 * Bo loc tinh huong theo nhom (`situation`).
 * Loc phia client tren tap du lieu tinh - khong goi mang. Danh sach nut loc
 * tu sinh tu cac gia tri `situation` dang co trong `testimonials`, nen luon
 * khop du lieu ma khong can dong bo tay voi danh sach khoa hoc.
 */
export function TestimonialFilter() {
  const [activeSituation, setActiveSituation] = useState<string>('all');

  const filters = useMemo(() => {
    const uniqueSituations = Array.from(
      new Set(testimonials.map((item) => item.situation)),
    );
    return [
      { value: 'all', label: 'Tất cả' },
      ...uniqueSituations.map((situation) => ({
        value: situation,
        label: situation,
      })),
    ];
  }, []);

  const visible = useMemo(
    () =>
      activeSituation === 'all'
        ? testimonials
        : testimonials.filter((item) => item.situation === activeSituation),
    [activeSituation],
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Lọc theo tình huống"
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {filters.map((filter) => {
          const isActive = activeSituation === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveSituation(filter.value)}
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
        Đang hiển thị {visible.length} tình huống
        {activeSituation === 'all' ? '' : ' thuộc nhóm đã chọn'}.
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
          Chưa có tình huống nào cho nhóm này.
        </p>
      )}
    </div>
  );
}
