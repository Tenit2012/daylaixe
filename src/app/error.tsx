'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { buttonClasses } from '@/components/ui/button';

/**
 * Trang loi chung. KHONG hien thi stack trace cho nguoi dung.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Chi ghi log ma dinh danh loi, khong log noi dung chi tiet ra trinh duyet.
    console.error('[app-error]', error.digest ?? 'khong co ma loi');
  }, [error]);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <h1 className="text-2xl sm:text-3xl">Đã có lỗi xảy ra</h1>
      <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-muted">
        Trang gặp sự cố khi tải nội dung. Bạn thử tải lại giúp thầy nhé. Nếu vẫn
        không được, hãy liên hệ trực tiếp qua số điện thoại ở cuối trang.
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className={buttonClasses('primary', 'md')}
        >
          Thử lại
        </button>
        <Link href="/" className={buttonClasses('outline', 'md')}>
          Về trang chủ
        </Link>
      </div>

      {error.digest ? (
        <p className="mt-6 text-xs text-ink-subtle">Mã lỗi: {error.digest}</p>
      ) : null}
    </div>
  );
}
