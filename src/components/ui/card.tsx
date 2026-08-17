import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Them hieu ung hover nhe (dung cho card co the click). */
  interactive?: boolean;
  as?: 'div' | 'article' | 'li';
}

export function Card({
  children,
  className,
  interactive = false,
  as: Tag = 'div',
}: CardProps) {
  return (
    <Tag
      className={cn(
        'card-base p-5 sm:p-6',
        interactive &&
          'transition-shadow duration-150 focus-within:shadow-card-hover hover:shadow-card-hover',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

interface BadgeProps {
  children: ReactNode;
  tone?: 'neutral' | 'info' | 'warning' | 'success' | 'danger' | 'accent';
  className?: string;
}

const badgeTones = {
  neutral: 'bg-surface-sunken text-ink-muted border-line',
  info: 'bg-brand-50 text-brand-700 border-brand-200',
  warning: 'bg-accent-50 text-accent-700 border-accent-200',
  success: 'bg-success-50 text-success-700 border-success-100',
  danger: 'bg-danger-50 text-danger-700 border-danger-500/30',
  accent: 'bg-accent-500 text-white border-accent-600',
} as const;

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-pill border px-2.5 py-0.5 text-xs font-semibold',
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Nhan canh bao noi dung chua phai du lieu that.
 * Bat buoc dung o moi noi hien thi testimonial/gallery chua phai du lieu that,
 * de nguoi xem khong hieu nham day la phan hoi cua hoc vien that.
 *
 * `label` cho phep doi chu cho hop ngu canh - vi du khoi cam nhan dung
 * "Minh hoa trai nghiem" vi noi dung o do mo ta tinh huong hoc thuong gap,
 * chinh xac hon la goi chung chung "Noi dung mau". Bo trong thi giu mac dinh.
 */
export function PlaceholderBadge({
  className,
  label = 'Nội dung mẫu',
}: {
  className?: string;
  label?: string;
}) {
  return (
    <Badge tone="warning" className={cn('uppercase', className)}>
      {label}
    </Badge>
  );
}
