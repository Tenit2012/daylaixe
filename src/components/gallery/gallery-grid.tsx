'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import type { GalleryItem } from '@/types/content';
import { siteConfig } from '@/config/site';
import { PlaceholderBadge } from '@/components/ui/card';
import { Reveal } from '@/components/ui/reveal';
import { staggerDelay } from '@/lib/utils/stagger';
import { GalleryLightbox } from '@/components/gallery/gallery-lightbox';

interface GalleryGridProps {
  items: GalleryItem[];
  columns?: 2 | 3;
}

export function GalleryGrid({ items, columns = 3 }: GalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /*
   * Nho nut nao da mo hop thoai de TRA FOCUS ve dung cho khi dong.
   *
   * Khong tra focus thi nguoi dung ban phim bi day ve dau trang sau moi lan
   * xem anh - o album 10 anh nghia la phai Tab lai tu dau muoi lan.
   */
  const triggersRef = useRef<Array<HTMLButtonElement | null>>([]);
  const lastOpenedRef = useRef<number | null>(null);

  function open(index: number) {
    lastOpenedRef.current = index;
    setOpenIndex(index);
  }

  function close() {
    const index = lastOpenedRef.current;
    setOpenIndex(null);
    if (index !== null) triggersRef.current[index]?.focus();
  }

  return (
    <>
      <ul
        className={
          columns === 2
            ? 'grid gap-4 sm:grid-cols-2'
            : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
        }
      >
        {items.map((item, index) => (
          <Reveal
            as="li"
            key={item.id}
            delay={staggerDelay(index)}
            className="hover-lift card-base overflow-hidden p-0 shadow-card hover:shadow-card-hover"
          >
            <figure>
              {/*
                Khung ti le co dinh 4:3: album tron ca anh chup that (4:3 va 16:9)
                lan hinh minh hoa SVG. Neu de anh tu quyet chieu cao thi luoi se
                bi so le. `object-cover` cat phan thua thay vi bop meo anh.

                Chinh vi `object-cover` cat that ma anh chup DOC bi mat hon nua
                khung - do la ly do co nut phong to: no mo ban KHONG CAT.
              */}
              <button
                type="button"
                ref={(node) => {
                  triggersRef.current[index] = node;
                }}
                onClick={() => open(index)}
                aria-label={`Phóng to ảnh: ${item.title}`}
                className="hover-zoom-frame group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600"
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="hover-zoom-target h-full w-full object-cover"
                />
                {/*
                  Dau hieu bam duoc. Chi hien khi ro chuot hoac khi nut nhan
                  focus - tren dien thoai khong co con tro nen no khong bao gio
                  che anh, ma o do ca tam anh von da la vung cham.
                */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2.5 top-2.5 rounded-full bg-black/55 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </span>
                {item.isPlaceholder && siteConfig.showPlaceholderBadge ? (
                  <span className="absolute right-3 top-3">
                    <PlaceholderBadge />
                  </span>
                ) : null}
              </button>
              <figcaption className="p-4">
                <h3 className="text-base">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>

      <GalleryLightbox
        items={items}
        index={openIndex}
        onClose={close}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
