import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Info, Lightbulb, TriangleAlert } from 'lucide-react';
import type { BlockContent } from '@/types/content';

/**
 * Render noi dung bai viet tu cac block co cau truc.
 *
 * KHONG dung dangerouslySetInnerHTML: moi block deu duoc render bang JSX,
 * nen khong co duong dan cho HTML chua kiem soat lot vao trang.
 */

/**
 * Cu phap lien ket noi tuyen trong van ban bai viet: `[chu neo](/duong-dan)`.
 *
 * VI SAO CAN: cac block noi dung deu la CHUOI THUAN, nen truoc day khong the
 * dat mot lien ket giua cau. Hau qua la 17 bai kien thuc khong tro duoc ve
 * trang khoa hoc hay trang hoc phi - toan bo gia tri dieu huong noi bo nam
 * lai o menu va footer, la nhung cho khong mang ngu canh.
 *
 * VI SAO KHONG DUNG MARKDOWN DAY DU: chi can dung mot thu nay. Keo mot bo
 * phan tich markdown vao se mo cua cho HTML tho, dung thu ma chu thich o dau
 * file cam.
 */
const INLINE_LINK = /\[([^\]]+)\]\((\/[A-Za-z0-9/_-]*)\)/g;

/**
 * Chi chap nhan duong dan NOI BO bat dau bang mot dau gach cheo.
 *
 * Bieu thuc o tren da chan `javascript:`, `//ten-mien-khac` va moi giao thuc
 * khac ngay tu buoc khop chuoi - nhung kiem tra lai o day de neu ai do noi
 * long bieu thuc ve sau thi cho nay van chan.
 */
function isInternalPath(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//');
}

/**
 * Tach mot chuoi thanh cac doan chu va cac lien ket.
 *
 * Tra ve mang `ReactNode` chu khong phai chuoi HTML - moi phan tu deu do
 * React tao ra, nen khong co duong nao de the la mat vao trang.
 */
function renderRichText(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  INLINE_LINK.lastIndex = 0;
  while ((match = INLINE_LINK.exec(text)) !== null) {
    const full = match[0];
    const label = match[1];
    const href = match[2];
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));

    if (label && href && isInternalPath(href)) {
      parts.push(
        <Link
          key={`${href}-${match.index}`}
          href={href}
          className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900"
        >
          {label}
        </Link>,
      );
    } else {
      // Duong dan khong hop le: giu nguyen chu, bo cu phap - khong sinh link hong.
      parts.push(full);
    }
    lastIndex = match.index + full.length;
  }

  if (lastIndex === 0) return text;
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

const calloutStyles = {
  info: {
    wrapper: 'border-brand-200 bg-brand-50',
    title: 'text-brand-800',
    Icon: Info,
    iconClass: 'text-brand-600',
  },
  warning: {
    wrapper: 'border-accent-200 bg-accent-50',
    title: 'text-accent-800',
    Icon: TriangleAlert,
    iconClass: 'text-accent-600',
  },
  tip: {
    wrapper: 'border-success-100 bg-success-50',
    title: 'text-success-700',
    Icon: Lightbulb,
    iconClass: 'text-success-600',
  },
} as const;

interface ArticleContentProps {
  content: BlockContent[];
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="prose-article">
      {content.map((block, index) => {
        switch (block.type) {
          case 'heading': {
            if (block.level === 2) {
              return (
                <h2
                  key={`${block.id}-${index}`}
                  id={block.id}
                  className="!mt-10 scroll-mt-24 text-xl text-brand-900 sm:text-2xl"
                >
                  {block.text}
                </h2>
              );
            }
            return (
              <h3
                key={`${block.id}-${index}`}
                id={block.id}
                className="!mt-8 scroll-mt-24 text-lg text-brand-900 sm:text-xl"
              >
                {block.text}
              </h3>
            );
          }

          case 'paragraph':
            return <p key={index}>{renderRichText(block.text)}</p>;

          case 'list': {
            const items = block.items.map((item, itemIndex) => (
              <li key={itemIndex} className="pl-1">
                {renderRichText(item)}
              </li>
            ));
            return block.ordered ? (
              <ol
                key={index}
                className="ml-5 list-decimal space-y-2 marker:text-brand-500"
              >
                {items}
              </ol>
            ) : (
              <ul
                key={index}
                className="ml-5 list-disc space-y-2 marker:text-brand-500"
              >
                {items}
              </ul>
            );
          }

          case 'callout': {
            const style = calloutStyles[block.tone];
            const { Icon } = style;
            return (
              <aside
                key={index}
                className={`rounded-card border p-4 sm:p-5 ${style.wrapper}`}
              >
                <div className="flex items-start gap-3">
                  <Icon
                    aria-hidden="true"
                    className={`mt-0.5 h-5 w-5 flex-shrink-0 ${style.iconClass}`}
                  />
                  <div>
                    <p className={`text-[0.9375rem] font-bold ${style.title}`}>
                      {block.title}
                    </p>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                      {renderRichText(block.text)}
                    </p>
                  </div>
                </div>
              </aside>
            );
          }

          case 'quote':
            return (
              <blockquote
                key={index}
                className="border-l-4 border-accent-500 bg-surface-muted py-3 pl-5 pr-4 text-[1.0625rem] font-medium italic text-brand-900"
              >
                {/*
                  Cau trich noi bat KHONG nen chua lien ket ve mat bien tap,
                  nhung van cho qua `renderRichText`: neu ai do lo tay dat cu
                  phap `[...](/...)` vao day, no se ra mot lien ket that chu
                  khong phoi bay dau ngoac vuong ra giua trang - dung loi da
                  xay ra mot lan.
                */}
                {renderRichText(block.text)}
              </blockquote>
            );

          case 'image':
            return (
              <figure key={index} className="!my-8">
                <div className="overflow-hidden rounded-card border border-line bg-surface-muted">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={block.width}
                    height={block.height}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 42rem"
                    className="h-auto w-full"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="mt-2.5 text-center text-sm text-ink-subtle">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
