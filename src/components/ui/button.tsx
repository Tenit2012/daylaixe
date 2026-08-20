import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'success'
  | 'zalo'
  | 'facebook';
type Size = 'sm' | 'md' | 'lg';

/*
  `active:scale-[0.98]` la vi tuong tac DUY NHAT them vao nut.

  Chon lun xuong khi bam thay vi nay len khi ro chuot vi hai ly do: no hoat
  dong giong nhau tren ca dien thoai lan may tinh (khong phu thuoc :hover), va
  no phan hoi dung khoanh khac nguoi dung cham vao - dung cho can tran an nhat
  khi bam nut goi dien.

  KHONG co hieu ung nao tu chay: nut nhap nhay hay dap nhu nhip tim tao cam
  giac gia tao ve su gap gap, khong phu hop voi mot trang gioi thieu giao vien
  day lai xe.

  `motion-reduce:` tat han hieu ung thay vi de no chay trong 0.01ms - nguoi
  bat che do giam chuyen dong khong nen thay bat ky cu giat nao.
*/
const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-pill font-semibold ' +
  'transition-[color,background-color,border-color,box-shadow,transform] duration-150 ' +
  'active:scale-[0.98] motion-reduce:active:scale-100 ' +
  'disabled:cursor-not-allowed disabled:opacity-60 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-accent-500 text-white hover:bg-accent-600 focus-visible:ring-accent-500 shadow-sm',
  secondary:
    'bg-brand-800 text-white hover:bg-brand-900 focus-visible:ring-brand-700 shadow-sm',
  outline:
    'border-2 border-brand-700 bg-transparent text-brand-800 hover:bg-brand-50 focus-visible:ring-brand-600',
  ghost:
    'bg-transparent text-brand-800 hover:bg-brand-50 focus-visible:ring-brand-500',
  success:
    'bg-success-600 text-white hover:bg-success-700 focus-visible:ring-success-600 shadow-sm',
  /** Chi dung cho nut dan toi Zalo. */
  zalo: 'bg-zalo text-white hover:bg-zalo-dark focus-visible:ring-zalo shadow-sm',
  /** Chi dung cho nut dan toi Facebook. */
  facebook:
    'bg-facebook text-white hover:bg-facebook-dark focus-visible:ring-facebook shadow-sm',
};

const sizeStyles: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-[3.25rem] px-7 text-base',
};

export function buttonClasses(
  variant: Variant = 'primary',
  size: Size = 'md',
  className?: string,
): string {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, size, className)}
      {...props}
    >
      {children}
    </button>
  );
}

interface ButtonLinkProps extends ComponentPropsWithoutRef<'a'> {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  /** Bat buoc cho link ngoai de mo tab moi an toan. */
  external?: boolean;
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  external,
  ...props
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);

  if (external || /^(https?:|tel:|mailto:|sms:)/i.test(href)) {
    const isHttp = /^https?:/i.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
