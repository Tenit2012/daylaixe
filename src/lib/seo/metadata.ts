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

/**
 * URL tuyet doi cho TAI NGUYEN TINH (anh, file). Khong them dau gach cheo
 * cuoi - `/images/og/og-default.jpg/` la duong dan sai.
 */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${normalized === '/' ? '' : normalized}`;
}

/**
 * URL chinh tac cua mot TRANG. Luon ket thuc bang dau gach cheo.
 *
 * Ly do ton tai rieng ham nay: next.config.ts dat `trailingSlash: true`, nen
 * dia chi that cua moi trang deu co dau gach cheo cuoi. Next.js tu chuan hoa
 * `alternates.canonical` theo quy tac do, NHUNG khong dung toi URL ta tu viet
 * trong sitemap. Ket qua o dot QA 14/08/2026: canonical la
 * `https://thaytungdaylaixe.vn/khoa-hoc/` con sitemap ghi
 * `https://thaytungdaylaixe.vn/khoa-hoc` - lech nhau, khien moi dong trong
 * sitemap tro thanh mot lan chuyen huong 308 tren Cloudflare Pages.
 */
export function pageUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${normalized.endsWith('/') ? normalized : `${normalized}/`}`;
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
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
          },
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
