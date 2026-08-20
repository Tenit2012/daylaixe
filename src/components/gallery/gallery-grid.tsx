import Image from 'next/image';
import type { GalleryItem } from '@/types/content';
import { siteConfig } from '@/config/site';
import { PlaceholderBadge } from '@/components/ui/card';
import { Reveal } from '@/components/ui/reveal';
import { staggerDelay } from '@/lib/utils/stagger';

interface GalleryGridProps {
  items: GalleryItem[];
  columns?: 2 | 3;
}

export function GalleryGrid({ items, columns = 3 }: GalleryGridProps) {
  return (
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
            */}
            <div className="hover-zoom-frame relative aspect-[4/3] overflow-hidden bg-surface-muted">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="hover-zoom-target h-full w-full object-cover"
              />
              {item.isPlaceholder && siteConfig.showPlaceholderBadge ? (
                <span className="absolute right-3 top-3">
                  <PlaceholderBadge />
                </span>
              ) : null}
            </div>
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
  );
}
