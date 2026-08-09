import Link from 'next/link';
import { Phone } from 'lucide-react';
import { ZaloIcon } from '@/components/ui/zalo-icon';
import type { Lead } from '@/features/leads/domain/lead';
import { getCourseLabel } from '@/content/courses';
import { formatVietnameseDateTime } from '@/lib/utils/format-date';
import { formatVietnamesePhone } from '@/lib/validation/phone';
import { StatusBadge } from './status-badge';

interface LeadTableProps {
  leads: Lead[];
}

/** Nguon lead: uu tien utm_source, sau do la trang gui form. */
function describeSource(lead: Lead): string {
  if (lead.utmSource) {
    return [lead.utmSource, lead.utmMedium].filter(Boolean).join(' / ');
  }
  return lead.sourcePage ?? 'Trực tiếp';
}

export function LeadTable({ leads }: LeadTableProps) {
  if (leads.length === 0) {
    return (
      <div className="rounded-card border border-line bg-surface p-10 text-center">
        <p className="text-[0.9375rem] font-medium text-ink-muted">
          Chưa có hồ sơ nào khớp với bộ lọc hiện tại.
        </p>
        <p className="mt-1.5 text-sm text-ink-subtle">
          Thử xóa bớt điều kiện lọc hoặc mở rộng khoảng thời gian.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-card border border-line bg-surface">
      <table className="w-full min-w-[64rem] border-collapse text-left text-sm">
        <caption className="sr-only">Danh sách học viên tiềm năng</caption>
        <thead>
          <tr className="border-b border-line bg-surface-muted text-xs uppercase tracking-wide text-ink-subtle">
            <th scope="col" className="px-4 py-3 font-semibold">Họ tên</th>
            <th scope="col" className="px-4 py-3 font-semibold">Số điện thoại</th>
            <th scope="col" className="px-4 py-3 font-semibold">Khóa quan tâm</th>
            <th scope="col" className="px-4 py-3 font-semibold">Khu vực</th>
            <th scope="col" className="px-4 py-3 font-semibold">Trạng thái</th>
            <th scope="col" className="px-4 py-3 font-semibold">Nguồn</th>
            <th scope="col" className="px-4 py-3 font-semibold">Ngày tạo</th>
            <th scope="col" className="px-4 py-3 font-semibold">Ghi chú</th>
            <th scope="col" className="px-4 py-3 font-semibold">
              <span className="sr-only">Hành động</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {leads.map((lead) => {
            const phoneHref = `tel:+84${lead.normalizedPhone.slice(1)}`;
            const zaloHref = `https://zalo.me/${lead.normalizedPhone}`;

            return (
              <tr key={lead.id} className="align-top hover:bg-surface-muted">
                <th scope="row" className="px-4 py-3 font-semibold text-brand-900">
                  <Link
                    href={`/admin/leads/${lead.id}`}
                    className="rounded hover:text-brand-600 hover:underline"
                  >
                    {lead.fullName}
                  </Link>
                </th>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-ink">
                      {formatVietnamesePhone(lead.phone)}
                    </span>
                    <span className="flex items-center gap-2">
                      <a
                        href={phoneHref}
                        aria-label={`Gọi cho ${lead.fullName}`}
                        className="inline-flex items-center gap-1 rounded text-xs font-medium text-accent-700 hover:underline"
                      >
                        <Phone aria-hidden="true" className="h-3.5 w-3.5" />
                        Gọi
                      </a>
                      <a
                        href={zaloHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Mở Zalo của ${lead.fullName}`}
                        className="inline-flex items-center gap-1 rounded text-xs font-medium text-zalo hover:underline"
                      >
                        <ZaloIcon tone="onLight" className="h-3.5 w-3.5" />
                        Zalo
                      </a>
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-ink-muted">
                  {getCourseLabel(lead.interestedCourse)}
                </td>
                <td className="px-4 py-3 text-ink-muted">{lead.location ?? '—'}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="max-w-[12rem] px-4 py-3 text-xs text-ink-subtle">
                  <span className="line-clamp-2 break-words">
                    {describeSource(lead)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-ink-subtle">
                  {formatVietnameseDateTime(lead.createdAt)}
                </td>
                <td className="max-w-[14rem] px-4 py-3 text-xs text-ink-muted">
                  <span className="line-clamp-2 break-words">
                    {lead.adminNote || lead.note || '—'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Link
                    href={`/admin/leads/${lead.id}`}
                    className="rounded text-sm font-semibold text-brand-700 hover:underline"
                  >
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
