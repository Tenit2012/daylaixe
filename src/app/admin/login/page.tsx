import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Car, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { getSession } from '@/lib/auth/session';
import { getCsrfToken } from '@/lib/auth/csrf';
import { sanitizeInternalPath } from '@/lib/security/sanitize';
import { LoginForm } from '@/components/admin/login-form';

export const metadata: Metadata = {
  title: 'Đăng nhập quản trị',
  robots: { index: false, follow: false, nocache: true },
};

/** Trang dang nhap luon render dong vi phu thuoc cookie. */
export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const session = await getSession();
  const params = await searchParams;
  const nextParam = Array.isArray(params.next) ? params.next[0] : params.next;
  const next = sanitizeInternalPath(nextParam, '/admin/leads');

  if (session) redirect(next);

  // Cookie CSRF do middleware tao ra (xem src/middleware.ts).
  const csrfToken = await getCsrfToken();

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-surface-muted px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-800 text-white">
            <Car aria-hidden="true" className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-2xl">Đăng nhập quản trị</h1>
          <p className="mt-2 text-sm text-ink-muted">
            Khu vực quản lý học viên tiềm năng của {siteConfig.brandName}
          </p>
        </div>

        <div className="mt-7 rounded-card border border-line bg-surface p-6 shadow-card sm:p-7">
          <LoginForm csrfToken={csrfToken} next={next} />
        </div>

        <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-ink-subtle">
          <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-success-600" />
          Khu vực này chỉ dành cho quản trị viên. Tài khoản được cấu hình qua biến
          môi trường và khởi tạo bằng lệnh seed.
        </p>

        <p className="mt-4 text-center text-sm">
          <Link
            href="/"
            className="rounded text-brand-700 underline-offset-4 hover:underline"
          >
            Quay lại trang chủ
          </Link>
        </p>
      </div>
    </div>
  );
}
