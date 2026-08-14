import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Bat buoc khi dung `output: 'export'`: bao cho Next.js biet route nay
 * sinh ra mot lan luc build va khong bao gio doi theo request. Thieu dong
 * nay thi `next build` dung han voi loi "not configured on route".
 */
export const dynamic = 'force-static';

/**
 * Web app manifest.
 *
 * Muc dich o day KHONG phai bien website thanh ung dung cai dat duoc - ma de
 * Chrome tren Android hien dung ten va mau thuong hieu khi nguoi dung luu
 * trang vao man hinh chinh, va de Lighthouse khong tru diem muc Best Practices.
 *
 * `display: 'browser'` (khong phai 'standalone'): day la landing page co lien
 * ket ra Zalo va Google Maps, giu nguyen thanh dia chi cua trinh duyet giup
 * nguoi dung khong bi mac ket trong cua so khong co nut quay lai.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.seo.defaultTitle,
    short_name: siteConfig.shortBrandName,
    description: siteConfig.seo.defaultDescription,
    start_url: '/',
    display: 'browser',
    lang: siteConfig.seo.lang,
    background_color: '#FFFFFF',
    theme_color: '#182F58',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
