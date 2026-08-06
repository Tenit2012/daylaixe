import type { Metadata, Viewport } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/config/site';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { MobileCtaBar } from '@/components/layout/mobile-cta-bar';
import { AnalyticsScripts } from '@/components/layout/analytics-scripts';
import { JsonLd } from '@/components/ui/json-ld';
import {
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
  robots: {
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const localService = buildLocalServiceJsonLd();

  return (
    <html lang={siteConfig.seo.lang} className={beVietnamPro.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Bỏ qua và tới nội dung chính
        </a>

        <SiteHeader />

        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>

        <SiteFooter />
        <MobileCtaBar />

        <JsonLd data={buildWebsiteJsonLd()} />
        <JsonLd data={buildPersonJsonLd()} />
        {localService ? <JsonLd data={localService} /> : null}

        <AnalyticsScripts />
      </body>
    </html>
  );
}
