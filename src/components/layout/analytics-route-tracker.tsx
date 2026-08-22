'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics/track';

/**
 * Ghi nhan luot xem trang khi nguoi dung dieu huong trong ung dung.
 *
 * VI SAO CAN: Next.js App Router doi trang o PHIA TRINH DUYET - khong tai
 * lai tai lieu. GTM va gtag.js chi tu dem mot luot xem duy nhat luc tai trang
 * dau tien; moi lan bam sang trang khac sau do deu khong duoc ghi nhan. Neu
 * thieu component nay, GA4 se bao cao rang moi nguoi dung chi xem dung mot
 * trang roi thoat - so lieu sai hoan toan ve hanh vi doc website.
 *
 * VI SAO BO QUA LAN DAU (\`isFirstRender\`): luot xem dau tien DA duoc chinh
 * the GTM/gtag dem luc no nap xong. Goi them o day se thanh dem hai lan cho
 * trang dau - dung loai loi ma yeu cau da neu ro phai tranh.
 *
 * Component nay khong render gi ca; no chi lang nghe duong dan.
 */
export function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    trackPageView(pathname);
  }, [pathname]);

  return null;
}
