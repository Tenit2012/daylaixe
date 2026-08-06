import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  /** Query string hien tai (khong gom tham so `page`). */
  baseQuery: string;
}

function buildHref(baseQuery: string, page: number): string {
  const params = new URLSearchParams(baseQuery);
  if (page > 1) {
    params.set('page', String(page));
  } else {
    params.delete('page');
  }
  const query = params.toString();
  return query ? `/admin/leads?${query}` : '/admin/leads';
}

export function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  baseQuery,
}: PaginationProps) {
  if (total === 0) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const linkClass =
    'inline-flex h-9 items-center gap-1 rounded-md border border-line bg-surface px-3 text-sm font-medium text-brand-800 transition-colors hover:bg-surface-muted';
  const disabledClass = 'pointer-events-none opacity-40';

  return (
    <nav
      aria-label="Phân trang danh sách"
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-ink-muted">
        Hiển thị <strong className="text-brand-900">{from}</strong>–
        <strong className="text-brand-900">{to}</strong> trong tổng số{' '}
        <strong className="text-brand-900">{total}</strong> hồ sơ
      </p>

      <div className="flex items-center gap-2">
        <Link
          href={buildHref(baseQuery, page - 1)}
          aria-disabled={page <= 1}
          tabIndex={page <= 1 ? -1 : undefined}
          className={cn(linkClass, page <= 1 && disabledClass)}
        >
          <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          Trước
        </Link>

        <span className="text-sm text-ink-muted">
          Trang {page} / {totalPages}
        </span>

        <Link
          href={buildHref(baseQuery, page + 1)}
          aria-disabled={page >= totalPages}
          tabIndex={page >= totalPages ? -1 : undefined}
          className={cn(linkClass, page >= totalPages && disabledClass)}
        >
          Sau
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </nav>
  );
}
