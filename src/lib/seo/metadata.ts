import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Tao Metadata cho tung trang: canonical, Open Graph, Twitter Card.
 * Dung chung de moi trang co cau truc SEO nhat quan.
 */

export interface PageMetadataInput {
  title: string;
  description: string;
  /** Duong dan tuong doi, vi du '/khoa-hoc'. */
  path: string;
  /** Duong dan anh OG rieng cua trang (neu co). */
  image?: string;
  /** Danh cho trang bai viet. */
  publishedTime?: string;
  modifiedTime?: string;
  type?: 'website' | 'article';
  /** Chan cong cu tim kiem index trang nay. */
  noIndex?: boolean;
  keywords?: string[];
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${normalized === '/' ? '' : normalized}`;
}

export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const url = absoluteUrl(input.path);
  const image = input.image ?? siteConfig.seo.ogImage;
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords ?? siteConfig.seo.keywords,
    alternates: { canonical: url },
    robots: input.noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
        },
    openGraph: {
      type: input.type ?? 'website',
      url,
      siteName: siteConfig.brandName,
      title: input.title,
      description: input.description,
      locale: siteConfig.seo.locale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: input.title,
        },
      ],
      ...(input.type === 'article'
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [imageUrl],
    },
  };
}
