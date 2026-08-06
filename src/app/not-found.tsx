import Link from 'next/link';
import { buttonClasses } from '@/components/ui/button';
import { mainNav } from '@/config/site';

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-6xl font-bold text-brand-200">404</p>
      <h1 className="mt-4 text-2xl sm:text-3xl">Không tìm thấy trang này</h1>
      <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-muted">
        Có thể đường dẫn đã thay đổi hoặc bạn gõ nhầm địa chỉ. Bạn thử quay lại
        trang chủ hoặc chọn một mục bên dưới.
      </p>

      <div className="mt-7">
        <Link href="/" className={buttonClasses('primary', 'lg')}>
          Về trang chủ
        </Link>
      </div>

      <nav aria-label="Liên kết gợi ý" className="mt-8">
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded text-brand-700 underline-offset-4 hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
