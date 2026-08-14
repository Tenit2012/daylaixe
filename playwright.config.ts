import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.E2E_PORT ?? 3100);
const baseURL = process.env.E2E_BASE_URL ?? `http://127.0.0.1:${PORT}`;

/**
 * E2E chay tren CHINH thu muc `out/` - dung thu se duoc deploy len Cloudflare.
 *
 * Truoc day dung `next start`, nhung `next start` KHONG chay duoc voi
 * `output: 'export'`. Quan trong hon: phuc vu truc tiep `out/` bang mot may
 * chu tinh moi kiem chung dung thu ma nguoi dung thuc su nhan duoc, ke ca cach
 * `trailingSlash` sinh ra thu muc con.
 *
 * Bat buoc chay `npm run build` truoc.
 */
export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL,
    trace: 'on-first-retry',
    locale: 'vi-VN',
    timezoneId: 'Asia/Ho_Chi_Minh',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `npx serve out -l ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
