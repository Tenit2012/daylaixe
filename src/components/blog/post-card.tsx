import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Clock } from 'lucide-react';
import type { BlogPost } from '@/types/content';
import { formatVietnameseDate } from '@/lib/utils/format-date';

interface PostCardProps {
  post: BlogPost;
  priority?: boolean;
  /**
   * Cap cua the tieu de trong card. Xem giai thich day du o CourseCard:
   * mac dinh h3 (card nam duoi mot muc co <h2>), nhung trang danh sach
   * /kien-thuc dat card thang duoi <h1> nen phai truyen 2.
   */
  headingLevel?: 2 | 3;
}

export function PostCard({
  post,
  priority = false,
  headingLevel = 3,
}: PostCardProps) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3';

  return (
    <article className="card-base flex h-full flex-col overflow-hidden p-0 transition-shadow duration-150 hover:shadow-card-hover">
      <Link
        href={`/kien-thuc/${post.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="block bg-surface-muted"
      >
        <Image
          src={post.coverImage.src}
          alt=""
          width={post.coverImage.width}
          height={post.coverImage.height}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-auto w-full"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">
          {post.category}
        </p>
        <Heading className="mt-2 text-lg leading-snug">
          <Link
            href={`/kien-thuc/${post.slug}`}
            className="rounded transition-colors hover:text-brand-600"
          >
            {post.title}
          </Link>
        </Heading>
        <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
          {post.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line pt-3 text-xs text-ink-subtle">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
            <time dateTime={post.publishedAt}>
              {formatVietnameseDate(post.publishedAt)}
            </time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden="true" className="h-3.5 w-3.5" />
            {post.readingTimeMinutes} phút đọc
          </span>
        </div>
      </div>
    </article>
  );
}
