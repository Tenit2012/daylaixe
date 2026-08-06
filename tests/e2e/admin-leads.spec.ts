import { expect, test, type Page } from '@playwright/test';
import { withE2EDatabase } from './helpers/db';

/**
 * FLOW 2: Quan tri vien xu ly lead
 *
 * Dang nhap -> xem danh sach -> mo chi tiet mot lead -> doi trang thai
 * -> luu ghi chu -> xac nhan du lieu da thay doi trong database.
 */

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'change-me';

async function login(page: Page): Promise<void> {
  await page.goto('/admin/login');
  await page.getByLabel('Email').fill(ADMIN_EMAIL);
  await page.getByLabel('Mật khẩu').fill(ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await expect(page).toHaveURL(/\/admin\/leads/, { timeout: 15_000 });
}

test.describe('Trang quản trị học viên tiềm năng', () => {
  test('route admin được bảo vệ, chưa đăng nhập thì bị chuyển về trang login', async ({
    page,
  }) => {
    await page.goto('/admin/leads');
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(
      page.getByRole('heading', { name: 'Đăng nhập quản trị' }),
    ).toBeVisible();
  });

  test('từ chối đăng nhập với mật khẩu sai', async ({ page }) => {
    await page.goto('/admin/login');
    await page.getByLabel('Email').fill(ADMIN_EMAIL);
    await page.getByLabel('Mật khẩu').fill('mat-khau-hoan-toan-sai');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();

    await expect(
      page.getByText('Email hoặc mật khẩu không đúng.'),
    ).toBeVisible({ timeout: 15_000 });
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('đăng nhập, cập nhật trạng thái và ghi chú của một lead', async ({
    page,
  }) => {
    // 1) Dang nhap
    await login(page);

    // 2) Xem danh sach lead
    await expect(
      page.getByRole('heading', { name: 'Học viên tiềm năng' }),
    ).toBeVisible();

    const table = page.getByRole('table');
    await expect(table).toBeVisible();

    // Lay lead dau tien trong bang de thao tac
    const firstDetailLink = page
      .getByRole('link', { name: 'Xem chi tiết' })
      .first();
    await expect(firstDetailLink).toBeVisible();

    // 3) Mo chi tiet lead
    await firstDetailLink.click();
    await expect(page).toHaveURL(/\/admin\/leads\/[a-z0-9]+$/);

    const leadId = page.url().split('/').pop() as string;
    expect(leadId.length).toBeGreaterThan(0);

    // 4) Doi trang thai
    await page.getByLabel('Trạng thái xử lý').selectOption('ENROLLED');

    // 5) Luu ghi chu
    const note = `Ghi chú kiểm thử tự động lúc ${new Date().toISOString()}`;
    await page.getByLabel('Ghi chú của thầy').fill(note);
    await page.getByRole('button', { name: 'Lưu thay đổi' }).click();

    await expect(page.getByText('Đã lưu thay đổi.')).toBeVisible({
      timeout: 15_000,
    });

    // 6) Xac nhan du lieu da thay doi trong database
    const updated = await withE2EDatabase((prisma) =>
      prisma.lead.findUnique({ where: { id: leadId } }),
    );
    expect(updated?.status).toBe('ENROLLED');
    expect(updated?.adminNote).toBe(note);

    // 7) Trang thai moi hien thi tren danh sach
    await page.getByRole('link', { name: 'Quay lại danh sách' }).click();
    await expect(page).toHaveURL(/\/admin\/leads$/);
    await expect(
      page.getByRole('cell', { name: 'Đã đăng ký học' }).first(),
    ).toBeVisible();
  });

  test('lọc danh sách theo trạng thái', async ({ page }) => {
    await login(page);

    await page.getByLabel('Trạng thái').selectOption('NEW');
    await page.getByRole('button', { name: 'Áp dụng bộ lọc' }).click();

    await expect(page).toHaveURL(/status=NEW/);

    const rows = page.getByRole('row');
    // Header + it nhat mot dong du lieu (seed co lead trang thai NEW).
    expect(await rows.count()).toBeGreaterThan(1);
  });

  test('tìm kiếm theo số điện thoại', async ({ page }) => {
    await login(page);

    await page
      .getByLabel('Tìm theo tên hoặc số điện thoại')
      .fill('0912340001');
    await page.getByRole('button', { name: 'Áp dụng bộ lọc' }).click();

    await expect(page).toHaveURL(/q=0912340001/);
    await expect(page.getByRole('table')).toContainText('Nguyễn Văn An');
  });

  test('đăng xuất và mất quyền truy cập', async ({ page }) => {
    await login(page);

    await page.getByRole('button', { name: 'Đăng xuất' }).click();
    await expect(page).toHaveURL(/\/admin\/login/);

    await page.goto('/admin/leads');
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('trang quản trị không cho công cụ tìm kiếm lập chỉ mục', async ({
    request,
  }) => {
    const response = await request.get('/admin/login');
    const robotsTag = response.headers()['x-robots-tag'];
    expect(robotsTag).toContain('noindex');
  });

  test('API không cho đọc danh sách lead công khai', async ({ request }) => {
    const response = await request.get('/api/leads');
    expect(response.status()).toBe(405);
  });
});
