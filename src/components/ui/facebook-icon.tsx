import { cn } from '@/lib/utils/cn';

interface FacebookIconProps {
  className?: string;
}

/**
 * Bieu tuong chu "f" cua Facebook.
 *
 * Ve truc tiep bang SVG (khong dung icon cua lucide-react vi bo icon
 * thuong hieu ben do da bi danh dau deprecated). Mau lay theo `currentColor`
 * nen dung duoc ca tren nen dam (nut xanh Facebook) lan nen sang (footer).
 */
export function FacebookIcon({ className }: FacebookIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn('h-[1.125rem] w-[1.125rem] shrink-0', className)}
    >
      <path d="M14.02 21.94v-7.75h2.6l.49-3.02h-3.09V9.21c0-.83.28-1.56 1.06-1.56h2.05V5.02c-.36-.05-1.12-.16-2.56-.16-3 0-4.76 1.59-4.76 5.2v2.11H7.34v3.02h2.47v7.75a10.02 10.02 0 0 0 4.21 0Z" />
    </svg>
  );
}
