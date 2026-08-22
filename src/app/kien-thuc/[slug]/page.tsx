import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CalendarDays, Clock, RefreshCw, UserRound } from 'lucide-react';
import {
  buildTableOfContents,
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from '@/content/blog';
import { isPlaceholderValue, siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
} from '@/lib/seo/structured-data';
import { formatVietnameseDate } from '@/lib/utils/format-date';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ArticleContent } from '@/components/blog/article-content';
import { PostCard } from '@/components/blog/post-card';
import { CtaLocation } from '@/lib/analytics/events';
import {
  CallButton,
  FacebookButton,
  ZaloButton,
} from '@/components/ui/contact-buttons';
import { JsonLd } from '@/components/ui/json-ld';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return buildPageMetadata({
      title: 'Không tìm thấy bài viết',
      description: 'Bài viết bạn tìm không tồn tại hoặc đã được đổi đường dẫn.',
      path: `/kien-thuc/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: post.title,
    description: post.description,
    path: `/kien-thuc/${post.slug}`,
    image: post.coverImage.src,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    keywords: post.tags,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const toc = buildTableOfContents(post.content);
  const related = getRelatedPosts(post.slug, 3);
  const authorName = isPlaceholderValue(siteConfig.teacher.name)
    ? post.author
    : `Thầy ${siteConfig.teacher.name}`;

  const crumbs = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Kiến thức', path: '/kien-thuc' },
    { name: post.title, path: `/kien-thuc/${post.slug}` },
  ];

  return (
    <>
      <div className="border-b border-line bg-surface-muted">
        <div className="container-page py-4">
          <Breadcrumb items={crumbs} />
        </div>
      </div>

      <article className="container-page py-8 lg:py-12">
        <div className="mx-auto max-w-prose">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">
            {post.category}
          </p>
          <h1 className="mt-3 text-2xl leading-tight sm:text-3xl lg:text-[2.25rem]">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            {post.description}
          </p>

          <dl className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-line py-3 text-sm text-ink-subtle">
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Tác giả</dt>
              <UserRound aria-hidden="true" className="h-4 w-4" />
              <dd>{authorName}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Ngày đăng</dt>
              <CalendarDays aria-hidden="true" className="h-4 w-4" />
              <dd>
                <time dateTime={post.publishedAt}>
                  {formatVietnameseDate(post.publishedAt)}
                </time>
              </dd>
            </div>
            {post.updatedAt !== post.publishedAt ? (
              <div className="flex items-center gap-1.5">
                <dt className="sr-only">Cập nhật lần cuối</dt>
                <RefreshCw aria-hidden="true" className="h-4 w-4" />
                <dd>
                  Cập nhật{' '}
                  <time dateTime={post.updatedAt}>
                    {formatVietnameseDate(post.updatedAt)}
                  </time>
                </dd>
              </div>
            ) : null}
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Thời gian đọc</dt>
              <Clock aria-hidden="true" className="h-4 w-4" />
              <dd>{post.readingTimeMinutes} phút đọc</dd>
            </div>
          </dl>
        </div>

        <div className="mx-auto mt-8 max-w-prose overflow-hidden rounded-card border border-line">
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            width={post.coverImage.width}
            height={post.coverImage.height}
            priority
            sizes="(max-width: 768px) 100vw, 46rem"
            className="h-auto w-full"
          />
        </div>

        {/* Muc luc */}
        {toc.length > 0 ? (
          <nav
            aria-labelledby="toc-heading"
            className="mx-auto mt-8 max-w-prose rounded-card border border-line bg-surface-muted p-5"
          >
            <h2 id="toc-heading" className="text-base">
              Nội dung bài viết
            </h2>
            <ol className="mt-3 space-y-1.5 text-[0.9375rem]">
              {toc.map((entry) => (
                <li
                  key={entry.id}
                  className={entry.level === 3 ? 'ml-5' : undefined}
                >
                  <a
                    href={`#${entry.id}`}
                    className="rounded text-ink-muted underline-offset-4 hover:text-brand-700 hover:underline"
                  >
                    {entry.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="mx-auto mt-8 max-w-prose">
          <ArticleContent content={post.content} />
        </div>

        {/* Tu khoa */}
        <div className="mx-auto mt-8 max-w-prose">
          <h2 className="sr-only">Từ khóa liên quan</h2>
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-pill border border-line bg-surface-muted px-3 py-1 text-xs font-medium text-ink-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA cuoi bai */}
        <aside className="mx-auto mt-10 max-w-prose rounded-card border border-brand-200 bg-brand-50 p-6 text-center sm:p-8">
          <h2 className="text-xl sm:text-2xl">
            Cần tư vấn cho trường hợp của bạn?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-muted">
            Mỗi người có xuất phát điểm khác nhau. Nhắn cho thầy vài dòng về
            tình trạng hiện tại, thầy sẽ gợi ý lộ trình phù hợp với bạn.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
            <ZaloButton
              location={CtaLocation.Article}
              article={post.slug}
              size="md"
            />
            <CallButton
              location={CtaLocation.Article}
              article={post.slug}
              size="md"
            />
            <FacebookButton
              location={CtaLocation.Article}
              article={post.slug}
              size="md"
            />
          </div>
        </aside>
      </article>

      {/* Bai viet lien quan */}
      {related.length > 0 ? (
        <section
          aria-labelledby="related-heading"
          className="section-spacing bg-surface-muted"
        >
          <div className="container-page">
            <h2 id="related-heading" className="text-2xl sm:text-3xl">
              Bài viết liên quan
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <JsonLd data={buildArticleJsonLd(post)} />
      <JsonLd data={buildBreadcrumbJsonLd(crumbs)} />
    </>
  );
}
