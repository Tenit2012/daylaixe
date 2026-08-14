import type { NextConfig } from 'next';

/**
 * Cau hinh cho STATIC EXPORT tren Cloudflare Pages.
 *
 * `npm run build` sinh ra thu muc `out/` chua HTML/CSS/JS tinh - khong can
 * Node.js chay nen, khong can server. Xem docs/CLOUDFLARE_PAGES_DEPLOY.md.
 *
 * HAI DIEU BI MAT KHI DUNG `output: 'export'` - da co phuong an thay the:
 *
 *  1. `headers()` KHONG con hieu luc. Header bao mat duoc khai bao trong
 *     `public/_headers` - dinh dang rieng cua Cloudflare Pages, file nay
 *     duoc copy nguyen ven vao `out/`.
 *  2. Toi uu anh cua Next.js KHONG con hieu luc (`images.unoptimized`).
 *     Bu lai, anh da duoc cat va nen san sang dinh dang WebP boi
 *     `node scripts/process-photos.mjs`, nen kich thuoc file van nho.
 */
const nextConfig: NextConfig = {
  output: 'export',

  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    /**
     * Bat buoc voi static export: khong co may chu nao de toi uu anh luc
     * chay. Anh duoc toi uu san o buoc build asset thay vi luc phuc vu.
     */
    unoptimized: true,
  },

  /**
   * Sinh `out/khoa-hoc/index.html` thay vi `out/khoa-hoc.html`.
   * Cloudflare Pages phuc vu ca hai duoc, nhung dang thu muc cho URL nhat
   * quan hon khi nguoi dung go thieu/thua dau `/` o cuoi.
   */
  trailingSlash: true,
};

export default nextConfig;
