import Script from 'next/script';
import { siteConfig } from '@/config/site';

/**
 * Nhung ma do luong.
 *
 * KIEN TRUC:  Website  ->  Google Tag Manager  ->  Google Analytics 4
 *
 * Khong cau hinh gi -> khong render script nao, website chay binh thuong.
 * Facebook Pixel MAC DINH TAT, chi bat khi dat
 * NEXT_PUBLIC_ENABLE_FACEBOOK_PIXEL="true".
 *
 * VE HIEU NANG: dung strategy="afterInteractive" cho tat ca. Google khuyen
 * dat GTM cang cao trong <head> cang tot, nhung dat dong bo o do se CHAN lan
 * son dau - doi lai vai chuc mili giay do chinh xac cua so lieu bang cach
 * lam cham trang cho MOI nguoi dung la doi khong dang. afterInteractive nap
 * ngay sau khi trang tuong tac duoc, van kip ghi nhan gan nhu moi luot.
 */
export function AnalyticsScripts() {
  const gtmId = siteConfig.analytics.gtmId.trim();
  const gaId = siteConfig.analytics.gaMeasurementId.trim();
  const pixelId = siteConfig.analytics.facebookPixelId.trim();
  const pixelEnabled = siteConfig.analytics.facebookPixelEnabled;

  /*
    CHOT CHAN VIEC DEM HAI LAN.

    Neu GTM dang chay thi gan nhu chac chan GA4 da duoc cau hinh BEN TRONG
    GTM. Gan them gtag.js o day nua se khien moi luot xem trang va moi su
    kien duoc dem hai lan - bao cao phong len gap doi ma khong he bao loi.
    Do la kieu sai nguy hiem nhat vi so lieu trong van "hop ly".

    Vi vay: co GTM thi GTM la duong duy nhat.
  */
  const shouldLoadDirectGa = Boolean(gaId) && !gtmId;

  return (
    <>
      {gtmId ? (
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      ) : null}

      {shouldLoadDirectGa ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}

      {pixelEnabled && pixelId ? (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}
    </>
  );
}

/**
 * Ban du phong cua GTM cho trinh duyet TAT JavaScript.
 *
 * Phai la phan tu DAU TIEN ben trong <body> theo tai lieu cua Google. Tach
 * rieng khoi `AnalyticsScripts` vi hai thu nam o hai vi tri khac nhau trong
 * cay DOM: script o cuoi <body>, con the nay o dau <body>.
 *
 * Gia tri thuc te khiem ton (rat it nguoi tat JavaScript) nhung the nay
 * khong ton gi khi khong cau hinh GTM, va Google Ads dung no de doi chieu
 * chuyen doi trong vai truong hop.
 */
export function GtmNoScript() {
  const gtmId = siteConfig.analytics.gtmId.trim();
  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
