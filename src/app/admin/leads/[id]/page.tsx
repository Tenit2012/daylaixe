import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MessageCircle, Phone } from 'lucide-react';
import { requireSession } from '@/lib/auth/session';
import { leadRepository } from '@/features/leads/infrastructure/prisma-lead-repository';
import { getCourseLabel } from '@/content/courses';
import { CONTACT_TIME_OPTIONS } from '@/features/leads/domain/lead-schema';
import { formatVietnameseDateTime } from '@/lib/utils/format-date';
import { formatVietnamesePhone } from '@/lib/validation/phone';
import { AdminShell } from '@/components/admin/admin-shell';
import { StatusBadge } from '@/components/admin/status-badge';
import { LeadUpdateForm } from '@/components/admin/lead-update-form';

export const metadata: Metadata = {
  title: 'Chi tiết học viên tiềm năng',
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

function contactTimeLabel(value: string | null): string {
  if (!value) return '—';
  return (
    CONTACT_TIME_OPTIONS.find((option) => option.value === value)?.label ?? value
  );
}

export default async function AdminLeadDetailPage({ params }: PageProps) {
  const { id } = await params;
  const session = await requireSession(`/admin/leads/${id}`);
  const lead = await leadRepository.findById(id);

  if (!lead) notFound();

  const phoneHref = `tel:+84${lead.normalizedPhone.slice(1)}`;
  const zaloHref = `https://zalo.me/${lead.normalizedPhone}`;

  const utmEntries: Array<[string, string | null]> = [
    ['utm_source', lead.utmSource],
    ['utm_medium', lead.utmMedium],
    ['utm_campaign', lead.utmCampaign],
    ['utm_content', lead.utmContent],
    ['utm_term', lead.utmTerm],
  ];
  const hasUtm = utmEntries.some(([, value]) => Boolean(value));

  return (
    <AdminShell session={session}>
      <div className="flex flex-col gap-6">
        <div>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-brand-700 hover:underline"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Quay lại danh sách
          </Link>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl">{lead.fullName}</h1>
            <StatusBadge status={lead.status} />
          </div>
          <p className="mt-1.5 text-sm text-ink-muted">
            Gửi lúc {formatVietnameseDateTime(lead.createdAt)} · Cập nhật lần cuối{' '}
            {formatVietnameseDateTime(lead.updatedAt)}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="space-y-6">
            <section
              aria-labelledby="lead-info-heading"
              className="rounded-card border border-line bg-surface p-5 sm:p-6"
            >
              <h2 id="lead-info-heading" className="text-lg">
                Thông tin học viên gửi
              </h2>

              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                    Họ và tên
                  </dt>
                  <dd className="mt-1 text-[0.9375rem] font-medium text-brand-900">
                    {lead.fullName}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                    Số điện thoại
                  </dt>
                  <dd className="mt-1 text-[0.9375rem] font-medium text-brand-900">
                    {formatVietnamesePhone(lead.phone)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                    Khóa học quan tâm
                  </dt>
                  <dd className="mt-1 text-[0.9375rem] text-ink-muted">
                    {getCourseLabel(lead.interestedCourse)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                    Khu vực sinh sống
                  </dt>
                  <dd className="mt-1 text-[0.9375rem] text-ink-muted">
                    {lead.location ?? '—'}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                    Khung giờ muốn liên hệ
                  </dt>
                  <dd className="mt-1 text-[0.9375rem] text-ink-muted">
                    {contactTimeLabel(lead.preferredContactTime)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                    Trang gửi biểu mẫu
                  </dt>
                  <dd className="mt-1 break-all text-[0.9375rem] text-ink-muted">
                    {lead.sourcePage ?? '—'}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 border-t border-line pt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                  Ghi chú của học viên
                </h3>
                <p className="mt-1.5 whitespace-pre-line text-[0.9375rem] leading-relaxed text-ink-muted">
                  {lead.note ?? '— Không có ghi chú —'}
                </p>
              </div>
            </section>

            <section
              aria-labelledby="lead-utm-heading"
              className="rounded-card border border-line bg-surface p-5 sm:p-6"
            >
              <h2 id="lead-utm-heading" className="text-lg">
                Nguồn truy cập (UTM)
              </h2>
              {hasUtm ? (
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  {utmEntries.map(([key, value]) =>
                    value ? (
                      <div key={key}>
                        <dt className="text-xs font-mono text-ink-subtle">
                          {key}
                        </dt>
                        <dd className="mt-0.5 break-all text-[0.9375rem] text-ink-muted">
                          {value}
                        </dd>
                      </div>
                    ) : null,
                  )}
                </dl>
              ) : (
                <p className="mt-3 text-sm text-ink-subtle">
                  Không có tham số UTM. Học viên truy cập trực tiếp hoặc từ nguồn
                  không gắn tham số theo dõi.
                </p>
              )}
            </section>
          </div>

          <div className="space-y-6">
            <section
              aria-labelledby="lead-contact-heading"
              className="rounded-card border border-line bg-surface p-5 sm:p-6"
            >
              <h2 id="lead-contact-heading" className="text-lg">
                Liên hệ nhanh
              </h2>
              <div className="mt-4 flex flex-col gap-2.5">
                <a
                  href={phoneHref}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-pill bg-accent-500 px-5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-accent-600"
                >
                  <Phone aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" />
                  Gọi {formatVietnamesePhone(lead.phone)}
                </a>
                <a
                  href={zaloHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-pill bg-success-600 px-5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-success-700"
                >
                  <MessageCircle aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" />
                  Mở Zalo
                </a>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-ink-subtle">
                Liên kết Zalo được tạo từ số điện thoại đã chuẩn hóa. Nếu số này
                chưa đăng ký Zalo, liên kết có thể không mở được hồ sơ.
              </p>
            </section>

            <section
              aria-labelledby="lead-update-heading"
              className="rounded-card border border-line bg-surface p-5 sm:p-6"
            >
              <h2 id="lead-update-heading" className="text-lg">
                Cập nhật xử lý
              </h2>
              <div className="mt-4">
                <LeadUpdateForm
                  leadId={lead.id}
                  currentStatus={lead.status}
                  currentNote={lead.adminNote ?? ''}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
