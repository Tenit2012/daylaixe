import { expect, test } from '@playwright/test';
import { deleteLeadsByPhonePrefix, findLeadByPhone } from './helpers/db';

/**
 * FLOW 1: Hoc vien dang ky tu van
 *
 * Trang chu -> chon khoa hoc -> mo form -> dien thong tin -> gui
 * -> thay thong bao thanh cong -> xac nhan lead da duoc luu vao database.
 */

// Dai so danh rieng cho E2E de khong dung du lieu seed.
const E2E_PHONE_PREFIX = '09355';

test.describe('Đăng ký tư vấn học lái xe', () => {
  test.beforeEach(async () => {
    await deleteLeadsByPhonePrefix(E2E_PHONE_PREFIX);
  });

  test.afterAll(async () => {
    await deleteLeadsByPhonePrefix(E2E_PHONE_PREFIX);
  });

  test('gửi đăng ký thành công từ trang chi tiết khóa học', async ({ page }) => {
    const phone = `${E2E_PHONE_PREFIX}10001`;

    // 1) Mo trang chu
    await page.goto('/');
    await expect(
      page.getByRole('heading', { level: 1 }),
    ).toContainText('tận tình từ buổi đầu đến ngày thi sát hạch');

    // 2) Vao trang danh sach khoa hoc roi chon mot khoa
    await page.getByRole('link', { name: 'Xem tất cả khóa học' }).click();
    await expect(page).toHaveURL(/\/khoa-hoc$/);

    await page
      .getByRole('link', { name: 'Hạng B - Số tự động', exact: true })
      .first()
      .click();
    await expect(page).toHaveURL(/\/khoa-hoc\/hang-b-so-tu-dong$/);

    // 3) Mo form dang ky o cuoi trang chi tiet
    const form = page.locator('#dang-ky');
    await form.scrollIntoViewIfNeeded();
    await expect(
      form.getByRole('heading', { name: /Đăng ký tư vấn khóa/ }),
    ).toBeVisible();

    // Khoa hoc phai duoc chon san dung khoa dang xem
    const courseSelect = page.getByLabel('Khóa học quan tâm');
    await expect(courseSelect).toHaveValue('hang-b-so-tu-dong');

    // 4) Dien thong tin
    await page.getByRole('checkbox').check();
    await page.getByLabel('Họ và tên').fill('Nguyễn Thị Kiểm Thử');
    await page.getByLabel('Số điện thoại', { exact: false }).first().fill(phone);
    await page.getByLabel('Khu vực bạn đang sinh sống').fill('TP. Thủ Đức');
    await page
      .getByLabel('Khung giờ muốn được liên hệ')
      .selectOption('toi');
    await page
      .getByLabel('Ghi chú thêm')
      .fill('Đây là dữ liệu kiểm thử tự động.');

    // 5) Gui form
    await page.getByRole('button', { name: /Gửi thông tin đăng ký/ }).click();

    // 6) Thay thong bao thanh cong
    await expect(
      page.getByText('Đã nhận thông tin của bạn'),
    ).toBeVisible({ timeout: 15_000 });

    // 7) Xac nhan lead ton tai trong database
    const lead = await findLeadByPhone(phone);
    expect(lead).not.toBeNull();
    expect(lead?.fullName).toBe('Nguyễn Thị Kiểm Thử');
    expect(lead?.interestedCourse).toBe('hang-b-so-tu-dong');
    expect(lead?.location).toBe('TP. Thủ Đức');
    expect(lead?.preferredContactTime).toBe('toi');
    expect(lead?.status).toBe('NEW');
    expect(lead?.sourcePage).toBe('/khoa-hoc/hang-b-so-tu-dong');
  });

  test('ghi nhận tham số UTM khi người dùng đến từ chiến dịch', async ({
    page,
  }) => {
    const phone = `${E2E_PHONE_PREFIX}10002`;

    await page.goto(
      '/lien-he?utm_source=facebook&utm_medium=social&utm_campaign=e2e-test',
    );

    await page.getByRole('checkbox').check();
    await page.getByLabel('Họ và tên').fill('Trần Văn UTM');
    await page.getByLabel('Số điện thoại', { exact: false }).first().fill(phone);
    await page
      .getByLabel('Khóa học quan tâm')
      .selectOption('bo-tuc-tay-lai');
    await page.getByRole('button', { name: /Gửi thông tin đăng ký/ }).click();

    await expect(
      page.getByText('Đã nhận thông tin của bạn'),
    ).toBeVisible({ timeout: 15_000 });

    const lead = await findLeadByPhone(phone);
    expect(lead?.utmSource).toBe('facebook');
    expect(lead?.utmMedium).toBe('social');
    expect(lead?.utmCampaign).toBe('e2e-test');
  });

  test('hiển thị lỗi và không lưu khi số điện thoại không hợp lệ', async ({
    page,
  }) => {
    await page.goto('/lien-he#dang-ky');

    // Tich o dong y truoc: thong bao loi xuat hien sau se lam dich chuyen
    // vi tri cac phan tu ben duoi.
    await page.getByRole('checkbox').check();
    await page.getByLabel('Họ và tên').fill('Lê Số Sai');
    await page
      .getByLabel('Số điện thoại', { exact: false })
      .first()
      .fill('0123456789');
    await page
      .getByLabel('Khóa học quan tâm')
      .selectOption('hang-b-so-san');
    await page.getByRole('button', { name: /Gửi thông tin đăng ký/ }).click();

    await expect(
      page.getByText(/Số điện thoại không hợp lệ/),
    ).toBeVisible();

    const lead = await findLeadByPhone('0123456789');
    expect(lead).toBeNull();
  });

  test('không cho gửi khi chưa đồng ý cung cấp thông tin', async ({ page }) => {
    await page.goto('/lien-he#dang-ky');

    await page.getByLabel('Họ và tên').fill('Phạm Chưa Đồng Ý');
    await page
      .getByLabel('Số điện thoại', { exact: false })
      .first()
      .fill(`${E2E_PHONE_PREFIX}10003`);
    await page
      .getByLabel('Khóa học quan tâm')
      .selectOption('luyen-sa-hinh');
    await page.getByRole('button', { name: /Gửi thông tin đăng ký/ }).click();

    await expect(page.getByText(/Vui lòng đồng ý/)).toBeVisible();

    const lead = await findLeadByPhone(`${E2E_PHONE_PREFIX}10003`);
    expect(lead).toBeNull();
  });

  test('thanh CTA cố định hiển thị trên màn hình điện thoại', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const ctaBar = page.getByRole('navigation', { name: 'Liên hệ nhanh' });
    await expect(ctaBar).toBeVisible();
    await expect(ctaBar.getByText('Đăng ký')).toBeVisible();

    // Thanh CTA khong duoc che noi dung cuoi trang: body co padding-bottom.
    const paddingBottom = await page.evaluate(
      () => getComputedStyle(document.body).paddingBottom,
    );
    expect(Number.parseFloat(paddingBottom)).toBeGreaterThan(0);
  });
});
