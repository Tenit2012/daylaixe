import type { Metadata, Viewport } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/config/site';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { MobileCtaBar } from '@/components/layout/mobile-cta-bar';
import { FloatingCta } from '@/components/layout/floating-cta';
import { AnalyticsScripts } from '@/components/layout/analytics-scripts';
import { JsonLd } from '@/components/ui/json-ld';
import {
  buildCenterJsonLd,
  buildLocalServiceJsonLd,
  buildPersonJsonLd,
  buildWebsiteJsonLd,
} from '@/lib/seo/structured-data';

/** Font ho tro day du dau tieng Viet. */
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.seo.keywords,
  applicationName: siteConfig.brandName,
  authors: [{ name: siteConfig.brandName }],
  creator: siteConfig.brandName,
  alternates: { canonical: '/' },
  robots: siteConfig.noindex
    ? {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false },
      }
    : {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
      },
  openGraph: {
    type: 'website',
    locale: siteConfig.seo.locale,
    url: siteConfig.url,
    siteName: siteConfig.brandName,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.seo.defaultTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [siteConfig.seo.ogImage],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  formatDetection: { telephone: true, address: false, email: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#182F58',
  colorScheme: 'light',
};

/**
 * Doan script noi tuyen gan class `motion-js` len <html>.
 *
 * VI SAO PHAI NOI TUYEN VA DAT TRONG <head>:
 * Toan bo hieu ung "hien dan khi cuon" hoat dong bang cach lam MO phan tu di
 * truoc roi moi hien lai. Neu quy tac lam mo do luon bat, thi khi JavaScript
 * khong chay - bot tim kiem cu, JS loi, nguoi dung tat JS - noi dung se ket
 * lai o trang thai VO HINH VINH VIEN. Do la loi nghiem trong ca ve SEO lan
 * kha nang tiep can.
 *
 * Dao nguoc lai: mac dinh moi thu HIEN. Chi khi script nay chay duoc (tuc la
 * chac chan co JavaScript de hien no lai) thi quy tac lam mo moi duoc bat.
 * Script chay dong bo trong <head> nen hoan tat TRUOC lan son dau - nguoi
 * dung khong thay canh noi dung hien roi bi an di.
 *
 * Dong thoi kiem tra luon `prefers-reduced-motion`: neu nguoi dung da chon
 * giam chuyen dong thi class khong duoc gan, moi thu hien ngay tu dau - manh
 * hon la de animation chay voi thoi luong 0.01ms.
 */
const MOTION_BOOTSTRAP = `(function(){try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion-js')}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const localService = buildLocalServiceJsonLd();
  const center = buildCenterJsonLd();

  return (
    <html
      lang={siteConfig.seo.lang}
      className={beVietnamPro.variable}
      suppressHydrationWarning
    >
      {/*
        `suppressHydrationWarning` tren <html> va <body>:

        Cac tien ich mo rong cua trinh duyet (Bitdefender, trinh quan ly mat
        khau, cong cu kiem tra chinh ta...) chen them thuoc tinh vao dung hai
        the nay TRUOC khi React kip hydrate - vi du `bis_register`,
        `__processed_<uuid>__`, `bis_skin_checked`. React thay DOM khac voi
        thu no tao ra nen bao hydration mismatch, du website hoan toan binh
        thuong.

        PHAM VI: thuoc tinh nay chi bo qua sai khac ngay TREN chinh the do,
        KHONG lan xuong cac phan tu con. Nghia la moi loi hydration that su
        trong cay component van duoc bao day du - khong che giau gi ca.
      */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOTSTRAP }} />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Bỏ qua và tới nội dung chính
        </a>

        <SiteHeader />

        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>

        <SiteFooter />
        <MobileCtaBar />
        <FloatingCta />

        <JsonLd data={buildWebsiteJsonLd()} />
        {center ? <JsonLd data={center} /> : null}
        <JsonLd data={buildPersonJsonLd()} />
        {localService ? <JsonLd data={localService} /> : null}

        <AnalyticsScripts />
      </body>
    </html>
  );
}
