import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Trang quan tri khong bao gio duoc lap chi muc.
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-[70vh] bg-surface-muted">{children}</div>;
}
