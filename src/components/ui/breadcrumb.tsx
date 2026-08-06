import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  name: string;
  path: string;
}

interface BreadcrumbProps {
  items: Crumb[];
  className?: string;
}

/** Breadcrumb hien thi; JSON-LD tuong ung duoc sinh rieng o tung trang. */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Đường dẫn" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-subtle">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page" className="font-medium text-ink-muted">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className="rounded transition-colors hover:text-brand-700 hover:underline"
                  >
                    {item.name}
                  </Link>
                  <ChevronRight
                    aria-hidden="true"
                    className="h-4 w-4 text-line-strong"
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
