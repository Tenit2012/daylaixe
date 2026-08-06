import { expect, test } from '@playwright/test';

/**
 * Kiem tra suc khoe cua cac trang cong khai:
 *  - Tai duoc, tra ve HTTP 200.
 *  - Co dung mot the <h1>.
 *  - Khong sinh loi console (bao gom loi hydration cua React).
 *  - Co metadata SEO co ban.
 */

const publicRoutes = [
  '/',
  '/gioi-thieu',
  '/khoa-hoc',
  '/khoa-hoc/hang-b-so-tu-dong',
  '/hoc-phi-lo-trinh',
  '/cam-nhan-hoc-vien',
  '/kien-thuc',
  '/kien-thuc/nguoi-moi-nen-hoc-lai-xe-so-san-hay-so-tu-dong',
  '/lien-he',
  '/chinh-sach-bao-mat',
  '/dieu-khoan-su-dung',
];

for (const route of publicRoutes) {
  test(`trang ${route} tải được và không có lỗi console`, async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));

    const response = await page.goto(route);
    expect(response?.status(), `HTTP status cua ${route}`).toBe(200);

    // Dung mot the h1 tren moi trang.
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

    // Metadata SEO co ban.
    await expect(page).toHaveTitle(/.+/);
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute('content');
    expect(description?.length ?? 0).toBeGreaterThan(20);

    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute('href');
    expect(canonical).toBeTruthy();

    expect(pageErrors, `Loi JavaScript tren ${route}`).toEqual([]);
    expect(consoleErrors, `Loi console tren ${route}`).toEqual([]);
  });
}

test('có skip link để bỏ qua tới nội dung chính', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');

  const skipLink = page.getByRole('link', {
    name: 'Bỏ qua và tới nội dung chính',
  });
  await expect(skipLink).toBeFocused();
});

test('sitemap.xml liệt kê các trang chính và không lộ trang quản trị', async ({
  request,
}) => {
  const response = await request.get('/sitemap.xml');
  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toContain('/khoa-hoc');
  expect(body).toContain('/kien-thuc');
  expect(body).toContain('/chinh-sach-bao-mat');
  expect(body).not.toContain('/admin');
});

test('robots.txt chặn thu thập khu vực quản trị', async ({ request }) => {
  const response = await request.get('/robots.txt');
  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toContain('Disallow: /admin');
  expect(body).toContain('Sitemap:');
});

test('trang chủ có JSON-LD hợp lệ', async ({ page }) => {
  await page.goto('/');

  const blocks = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  expect(blocks.length).toBeGreaterThan(0);

  const types = blocks.map((raw) => JSON.parse(raw)['@type']);
  expect(types).toContain('WebSite');
  expect(types).toContain('Person');
  expect(types).toContain('FAQPage');
});

test('trang không tồn tại trả về 404', async ({ page }) => {
  const response = await page.goto('/duong-dan-khong-ton-tai');
  expect(response?.status()).toBe(404);
  await expect(page.getByText('Không tìm thấy trang này')).toBeVisible();
});
