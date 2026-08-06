import type { BlockContent, BlogPost } from '@/types/content';

import { post as soSanHaySoTuDong } from './so-san-hay-so-tu-dong';
import { post as loiThuongGapSaHinh } from './loi-thuong-gap-khi-hoc-sa-hinh';
import { post as chuanBiBuoiDauTien } from './chuan-bi-truoc-buoi-hoc-dau-tien';
import { post as coBangKhongDamLai } from './co-bang-nhung-khong-dam-lai';
import { post as quyTrinhDangKy } from './quy-trinh-dang-ky-hoc-lai-xe';
import { post as duongDongTphcm } from './kinh-nghiem-lai-xe-duong-dong-tphcm';
import { post as giuBinhTinh } from './cach-giu-binh-tinh-khi-lai-xe';
import { post as boTucTayLai } from './khi-nao-nen-bo-tuc-tay-lai';

/**
 * Danh sach bai viet.
 *
 * CACH THEM BAI MOI: xem docs/CONTENT_GUIDE.md
 *  1. Tao file moi trong thu muc nay, export `post: BlogPost`.
 *  2. Import va them vao mang `blogPosts` ben duoi.
 *  3. Muc luc (table of contents) duoc sinh tu dong tu cac block `heading`.
 */
const allPosts: BlogPost[] = [
  soSanHaySoTuDong,
  loiThuongGapSaHinh,
  chuanBiBuoiDauTien,
  coBangKhongDamLai,
  quyTrinhDangKy,
  duongDongTphcm,
  giuBinhTinh,
  boTucTayLai,
];

/** Bai viet sap xep theo ngay dang, moi nhat truoc. */
export const blogPosts: BlogPost[] = [...allPosts].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}

/** Cac chuyen muc hien co, kem so luong bai. */
export function getBlogCategories(): Array<{ label: string; count: number }> {
  const counts = new Map<string, number>();
  for (const post of blogPosts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }
  return [...counts.entries()].map(([label, count]) => ({ label, count }));
}

/**
 * Bai viet lien quan. Uu tien danh sach khai bao thu cong trong
 * `relatedSlugs`, sau do bo sung bai cung chuyen muc cho du so luong.
 */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return blogPosts.slice(0, limit);

  const explicit = current.relatedSlugs
    .map((relatedSlug) => getPostBySlug(relatedSlug))
    .filter((post): post is BlogPost => post !== undefined);

  const sameCategory = blogPosts.filter(
    (post) =>
      post.slug !== slug &&
      post.category === current.category &&
      !explicit.some((item) => item.slug === post.slug),
  );

  const others = blogPosts.filter(
    (post) =>
      post.slug !== slug &&
      !explicit.some((item) => item.slug === post.slug) &&
      !sameCategory.some((item) => item.slug === post.slug),
  );

  return [...explicit, ...sameCategory, ...others].slice(0, limit);
}

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Sinh muc luc tu cac block heading cua bai viet. */
export function buildTableOfContents(content: BlockContent[]): TocEntry[] {
  return content
    .filter(
      (block): block is Extract<BlockContent, { type: 'heading' }> =>
        block.type === 'heading',
    )
    .map((block) => ({ id: block.id, text: block.text, level: block.level }));
}

/** Uoc luong thoi gian doc neu bai viet chua khai bao (khoang 200 tu/phut). */
export function estimateReadingTime(content: BlockContent[]): number {
  let words = 0;
  for (const block of content) {
    switch (block.type) {
      case 'paragraph':
      case 'quote':
        words += block.text.split(/\s+/).length;
        break;
      case 'heading':
        words += block.text.split(/\s+/).length;
        break;
      case 'list':
        words += block.items.join(' ').split(/\s+/).length;
        break;
      case 'callout':
        words += `${block.title} ${block.text}`.split(/\s+/).length;
        break;
    }
  }
  return Math.max(1, Math.round(words / 200));
}
