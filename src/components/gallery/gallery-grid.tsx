import Image from 'next/image';
import type { GalleryItem } from '@/types/content';
import { siteConfig } from '@/config/site';
import { PlaceholderBadge } from '@/components/ui/card';

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
      {items.map((item) => (
        <li
          key={item.id}
          className="card-base overflow-hidden p-0 transition-shadow duration-150 hover:shadow-card-hover"
        >
          <figure>
            <div className="relative bg-surface-muted">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full"
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
        </li>
      ))}
    </ul>
  );
}
