import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface FieldWrapperProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Bao mot truong nhap lieu: label lien ket dung `htmlFor`, gợi ý va
 * thong bao loi duoc noi qua `aria-describedby` o phia input.
 */
export function FieldWrapper({
  id,
  label,
  required,
  hint,
  error,
  children,
  className,
}: FieldWrapperProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-semibold text-brand-900">
        {label}
        {required ? (
          <span className="ml-1 text-danger-600" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 text-xs font-normal text-ink-subtle">
            (không bắt buộc)
          </span>
        )}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="text-xs text-ink-subtle">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-start gap-1 text-sm font-medium text-danger-600"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function describedBy(
  id: string,
  hasHint: boolean,
  hasError: boolean,
): string | undefined {
  const ids = [
    hasHint ? `${id}-hint` : null,
    hasError ? `${id}-error` : null,
  ].filter(Boolean);
  return ids.length > 0 ? ids.join(' ') : undefined;
}

export const inputClasses =
  'w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[0.9375rem] text-ink ' +
  'placeholder:text-ink-subtle transition-colors ' +
  'focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 ' +
  'disabled:cursor-not-allowed disabled:bg-surface-sunken';

export const inputErrorClasses =
  'border-danger-500 focus:border-danger-500 focus:ring-danger-500/25';
