/**
 * Mo website bang mot trinh duyet SACH - khong co tien ich mo rong nao.
 *
 * VI SAO CAN:
 * Cac tien ich nhu Bitdefender, trinh quan ly mat khau... chen them thuoc
 * tinh vao DOM (`bis_skin_checked`, `__processed_...`) TRUOC khi React kip
 * hydrate. React thay DOM khac voi thu no tao ra nen bao "hydration
 * mismatch". Day KHONG phai loi cua website - nhung no lam nhieu bang loi
 * cua Next.js va che mat loi that.
 *
 * Script nay dung Chromium di kem Playwright (da co san trong devDependencies),
 * chay voi profile trong nen chac chan khong co tien ich nao.
 *
 * Dung:  npm run dev:clean-browser
 * (chay song song voi `npm run dev`)
 */
import { chromium } from '@playwright/test';

const url = process.env.CLEAN_BROWSER_URL ?? 'http://localhost:3000';

const browser = await chromium.launch({
  headless: false,
  args: ['--disable-extensions', '--window-size=1440,900'],
});

const context = await browser.newContext({
  viewport: null,
  locale: 'vi-VN',
  timezoneId: 'Asia/Ho_Chi_Minh',
});

const page = await context.newPage();

// Bao lai moi loi console de biet ngay co van de that hay khong.
let issues = 0;
page.on('console', (message) => {
  if (message.type() === 'error') {
    issues += 1;
    console.error(`[loi console] ${message.text()}`);
  }
});
page.on('pageerror', (error) => {
  issues += 1;
  console.error(`[loi javascript] ${error.message}`);
});

try {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  console.log(`Da mo ${url} bang trinh duyet sach (khong co tien ich mo rong).`);
  console.log('Dong cua so trinh duyet de ket thuc.');
} catch (error) {
  console.error(
    `Khong mo duoc ${url}. Da chay "npm run dev" chua?`,
    error instanceof Error ? error.message : error,
  );
}

// Giu tien trinh song cho den khi nguoi dung dong trinh duyet.
await new Promise((resolve) => browser.on('disconnected', resolve));
console.log(
  issues === 0
    ? 'Ket thuc. Khong ghi nhan loi console nao.'
    : `Ket thuc. Da ghi nhan ${issues} loi console - day la loi that, khong phai do tien ich.`,
);
