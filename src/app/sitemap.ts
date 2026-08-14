import type { MetadataRoute } from 'next';
import { getAllCourseSlugs } from '@/content/courses';
import { blogPosts } from '@/content/blog';
import { pageUrl } from '@/lib/seo/metadata';

/**
 * Bat buoc khi dung `output: 'export'`: bao cho Next.js biet route nay
 * sinh ra mot lan luc build va khong bao gio doi theo request. Thieu dong
 * nay thi `next build` dung han voi loi "not configured on route".
 */
export const dynamic = 'force-static';

/**
 * Sitemap. Trang quan tri KHONG duoc liet ke o day.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  }> = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/khoa-hoc', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/hoc-phi-lo-trinh', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/gioi-thieu', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/lien-he', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/kien-thuc', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/cam-nhan-hoc-vien', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/chinh-sach-bao-mat', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/dieu-khoan-su-dung', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: pageUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const courseEntries: MetadataRoute.Sitemap = getAllCourseSlugs().map(
    (slug) => ({
      url: pageUrl(`/khoa-hoc/${slug}`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    }),
  );

  const postEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: pageUrl(`/kien-thuc/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...courseEntries, ...postEntries];
}
