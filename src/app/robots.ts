import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Bat buoc khi dung `output: 'export'`: bao cho Next.js biet route nay
 * sinh ra mot lan luc build va khong bao gio doi theo request. Thieu dong
 * nay thi `next build` dung han voi loi "not configured on route".
 */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  // Ban preview/demo: chan toan bo cong cu tim kiem.
  if (siteConfig.noindex) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
      sitemap: `${siteConfig.url}/sitemap.xml`,
      host: siteConfig.url,
    };
  }

  // Website la site tinh, khong co khu vuc rieng tu nao can chan.
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
