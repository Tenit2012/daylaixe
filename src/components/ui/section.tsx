import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Nen sang mac dinh, `muted` cho nen xam nhat, `brand` cho nen navy. */
  tone?: 'default' | 'muted' | 'brand';
  /** Bo padding doc mac dinh. */
  flush?: boolean;
  ariaLabelledBy?: string;
}

const toneStyles = {
  default: 'bg-surface',
  muted: 'bg-surface-muted',
  brand: 'bg-brand-900 text-brand-50',
} as const;

export function Section({
  id,
  children,
  className,
  tone = 'default',
  flush = false,
  ariaLabelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(toneStyles[tone], !flush && 'section-spacing', className)}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  /** The heading dung cho tieu de - mac dinh h2. */
  as?: 'h1' | 'h2';
  inverted?: boolean;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'center',
  as: Tag = 'h2',
  inverted = false,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        'mx-auto max-w-3xl',
        align === 'center' ? 'text-center' : 'text-left',
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'mb-3 text-sm font-semibold uppercase tracking-wider',
            inverted ? 'text-accent-300' : 'text-accent-600',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        id={id}
        className={cn(
          'text-balance text-2xl sm:text-3xl lg:text-[2.125rem] lg:leading-tight',
          inverted && 'text-white',
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed sm:text-[1.0625rem]',
            inverted ? 'text-brand-100' : 'text-ink-muted',
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
