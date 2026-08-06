import Link from 'next/link';
import { Car, LogOut, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import type { AdminSession } from '@/features/auth/domain/session';
import { logoutAction } from '@/features/auth/presentation/auth-actions';
import { siteConfig } from '@/config/site';

interface AdminShellProps {
  session: AdminSession;
  children: ReactNode;
}

/** Khung chung cho cac trang quan tri: thanh tren + vung noi dung. */
export function AdminShell({ session, children }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-surface-muted">
      <header className="border-b border-line bg-brand-900 text-white">
        <div className="mx-auto flex max-w-[90rem] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
              <Car aria-hidden="true" className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold">Quản trị học viên tiềm năng</p>
              <p className="text-xs text-brand-200">{siteConfig.brandName}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <nav aria-label="Điều hướng quản trị">
              <Link
                href="/admin/leads"
                className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-brand-100 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Users aria-hidden="true" className="h-4 w-4" />
                Danh sách lead
              </Link>
            </nav>

            <span className="hidden text-sm text-brand-200 sm:inline">
              {session.name} · {session.email}
            </span>

            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md border border-white/25 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <LogOut aria-hidden="true" className="h-4 w-4" />
                Đăng xuất
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[90rem] px-4 py-6 sm:px-6 lg:py-8">
        {children}
      </div>
    </div>
  );
}
