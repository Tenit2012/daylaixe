import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  // Ban preview/demo: chan toan bo cong cu tim kiem.
  if (siteConfig.noindex) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
      sitemap: `${siteConfig.url}/sitemap.xml`,
      host: siteConfig.url,
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Trang quan tri va API khong duoc lap chi muc.
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
