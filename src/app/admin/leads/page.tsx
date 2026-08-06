import type { Metadata } from 'next';
import { Suspense } from 'react';
import { requireSession } from '@/lib/auth/session';
import { leadRepository } from '@/features/leads/infrastructure/prisma-lead-repository';
import { isLeadStatus, LEAD_STATUS_LABELS } from '@/features/leads/domain/lead-status';
import { DEFAULT_PAGE_SIZE } from '@/features/leads/domain/lead';
import { AdminShell } from '@/components/admin/admin-shell';
import { LeadFilters } from '@/components/admin/lead-filters';
import { LeadTable } from '@/components/admin/lead-table';
import { Pagination } from '@/components/admin/pagination';

export const metadata: Metadata = {
  title: 'Danh sách học viên tiềm năng',
  robots: { index: false, follow: false, nocache: true },
};

/** Luon lay du lieu moi nhat, khong cache. */
export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function readParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
): string | undefined {
  const value = params[key];
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/** Chi chap nhan chuoi ngay dang yyyy-mm-dd. */
function readDateParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
): string | undefined {
  const value = readParam(params, key);
  if (!value) return undefined;
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : undefined;
}

export default async function AdminLeadsPage({ searchParams }: PageProps) {
  const session = await requireSession('/admin/leads');
  const params = await searchParams;

  const statusParam = readParam(params, 'status');
  const pageParam = Number.parseInt(readParam(params, 'page') ?? '1', 10);

  const options = {
    search: readParam(params, 'q'),
    status:
      statusParam && isLeadStatus(statusParam) ? statusParam : ('all' as const),
    course: readParam(params, 'course') ?? 'all',
    dateFrom: readDateParam(params, 'from'),
    dateTo: readDateParam(params, 'to'),
    page: Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1,
    pageSize: DEFAULT_PAGE_SIZE,
    sort:
      readParam(params, 'sort') === 'oldest'
        ? ('oldest' as const)
        : ('newest' as const),
  };

  const [result, statusCounts] = await Promise.all([
    leadRepository.list(options),
    leadRepository.countByStatus(),
  ]);

  // Query string hien tai, bo tham so `page` de Pagination tu them lai.
  const baseParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (key === 'page') continue;
    const raw = Array.isArray(value) ? value[0] : value;
    if (typeof raw === 'string' && raw.trim().length > 0) {
      baseParams.set(key, raw);
    }
  }

  const totalLeads = Object.values(statusCounts).reduce(
    (sum, count) => sum + count,
    0,
  );

  return (
    <AdminShell session={session}>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl">Học viên tiềm năng</h1>
          <p className="mt-1.5 text-sm text-ink-muted">
            Toàn bộ thông tin do người dùng gửi qua biểu mẫu trên website.
          </p>
        </div>

        {/* Tong quan theo trang thai */}
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          <li className="rounded-lg border border-line bg-surface px-3 py-2.5">
            <p className="text-xs font-medium text-ink-subtle">Tổng cộng</p>
            <p className="mt-0.5 text-xl font-bold text-brand-900">
              {totalLeads}
            </p>
          </li>
          {Object.entries(LEAD_STATUS_LABELS).map(([status, label]) => (
            <li
              key={status}
              className="rounded-lg border border-line bg-surface px-3 py-2.5"
            >
              <p className="text-xs font-medium text-ink-subtle">{label}</p>
              <p className="mt-0.5 text-xl font-bold text-brand-900">
                {statusCounts[status] ?? 0}
              </p>
            </li>
          ))}
        </ul>

        <Suspense
          fallback={
            <div className="rounded-card border border-line bg-surface p-5 text-sm text-ink-muted">
              Đang tải bộ lọc...
            </div>
          }
        >
          <LeadFilters />
        </Suspense>

        <LeadTable leads={result.items} />

        <Pagination
          page={result.page}
          totalPages={result.totalPages}
          total={result.total}
          pageSize={result.pageSize}
          baseQuery={baseParams.toString()}
        />
      </div>
    </AdminShell>
  );
}
