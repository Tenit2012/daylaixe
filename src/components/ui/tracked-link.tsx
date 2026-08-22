'use client';

import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics/track';
import { trackAttributes } from '@/lib/analytics/attributes';
import type {
  AnalyticsEventName,
  CtaLocationName,
} from '@/lib/analytics/events';

/**
 * Lien ket co ghi nhan su kien.
 *
 * VI SAO CAN COMPONENT NAY: chan trang, trang hoc phi va cac trang danh sach
 * deu la Server Component. Muon gan \`onClick\` vao mot lien ket trong do thi
 * phai them 'use client' cho CA file - tuc la day toan bo chan trang (danh
 * sach lien ket, gio lam viec, disclaimer, ban do...) sang phia trinh duyet
 * chi de theo doi vai cu bam. Boc rieng lien ket vao component nho nay giu
 * cho phan con lai van render o may chu.
 *
 * Tu nhan biet lien ket ngoai: http(s), tel:, mailto:, sms: dung the <a>
 * thuong; duong dan noi bo dung <Link> cua Next de dieu huong khong tai lai
 * trang. Lien ket http(s) ra ngoai tu dong co target="_blank" kem
 * rel="noopener noreferrer".
 *
 * KHONG lam thay doi giao dien: component chi truyen thang \`className\` va
 * \`children\`, khong tu them kieu dang nao.
 */

interface TrackedLinkProps extends Omit<
  ComponentPropsWithoutRef<'a'>,
  'href' | 'onClick'
> {
  href: string;
  event: AnalyticsEventName;
  location: CtaLocationName;
  /** Slug khoa hoc gan voi lien ket, neu co. */
  course?: string;
  /** Slug bai viet gan voi lien ket, neu co. */
  article?: string;
  children: ReactNode;
  className?: string;
}

export function TrackedLink({
  href,
  event,
  location,
  course,
  article,
  children,
  className,
  ...rest
}: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent(event, { location, course, article });
  };

  const attributes = trackAttributes(event, location, course ?? article);
  const isExternalProtocol = /^(https?:|tel:|mailto:|sms:)/i.test(href);

  if (isExternalProtocol) {
    const isHttp = /^https?:/i.test(href);
    return (
      <a
        href={href}
        onClick={handleClick}
        className={className}
        {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...attributes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      {...attributes}
      {...rest}
    >
      {children}
    </Link>
  );
}
