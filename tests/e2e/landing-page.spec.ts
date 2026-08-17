import { expect, test } from '@playwright/test';

/**
 * Kiem tra cac yeu cau rieng cua LANDING PAGE (dot refactor 13/08/2026).
 *
 * Khac voi public-pages.spec.ts (kiem tra suc khoe chung), file nay kiem tra
 * dung nhung dieu quyet dinh chuyen doi va do tin cay:
 *   - Ba CTA cua hero co ton tai va tro dung noi.
 *   - Trang neu ro noi hoc va vi tri cong tac cua thay.
 *   - Anh that duoc tai thanh cong (khong phai o trong).
 *   - CTA hien dung cach o tung kich thuoc man hinh.
 *   - Khong con tu ngu kieu "co tuyen sinh".
 */

const PHONE = '0971397882';

test.describe('hero va CTA', () => {
  test('hero neu ro vi tri cong tac va noi hoc', async ({ page }) => {
    await page.goto('/');

    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText('giáo viên cơ hữu');
    await expect(h1).toContainText('An ninh Nhân dân');
  });

  test('ba CTA chinh cua hero tro dung noi', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('section').first();

    // Goi dien
    const call = hero.locator(`a[href^="tel:"]`).first();
    await expect(call).toBeVisible();
    await expect(call).toHaveAttribute('href', new RegExp(PHONE.slice(1)));

    // Zalo - phai mo tab moi va co rel an toan
    const zalo = hero.locator('a[href*="zalo.me"]').first();
    await expect(zalo).toBeVisible();
    await expect(zalo).toHaveAttribute('target', '_blank');
    await expect(zalo).toHaveAttribute('rel', /noopener/);

    // Den tan noi - mo Google Maps
    const maps = hero.locator('a[href*="maps"]').first();
    await expect(maps).toBeVisible();
    await expect(maps).toHaveAttribute('target', '_blank');
  });

  test('moi trang deu co it nhat mot CTA lien he', async ({ page }) => {
    for (const route of ['/', '/khoa-hoc', '/hoc-phi-lo-trinh', '/lien-he']) {
      await page.goto(route);
      const ctaCount = await page
        .locator('a[href^="tel:"], a[href*="zalo.me"]')
        .count();
      expect(ctaCount, `trang ${route} thieu CTA lien he`).toBeGreaterThan(0);
    }
  });
});

test.describe('bang chung tin cay', () => {
  test('trang chu neu dia chi va noi hoc cu the', async ({ page }) => {
    await page.goto('/');
    const body = page.locator('body');

    await expect(body).toContainText('Km 18 Võ Nguyên Giáp');
    await expect(body).toContainText('Giáo viên cơ hữu');
    await expect(body).toContainText('Lầu 2');
  });

  test('co day du sau buoc quy trinh dang ky', async ({ page }) => {
    await page.goto('/');
    const steps = page.locator('#quy-trinh ol > li');
    await expect(steps).toHaveCount(6);
    await expect(steps.first()).toContainText('Liên hệ');
    await expect(steps.last()).toContainText('Thi sát hạch');
  });

  test('khong dung tu ngu gay ap luc kieu "co tuyen sinh"', async ({
    page,
  }) => {
    await page.goto('/');
    const text = (
      (await page.locator('body').textContent()) ?? ''
    ).toLowerCase();

    for (const phrase of [
      'bao đậu',
      'cam kết đậu',
      'chống trượt',
      'rẻ nhất',
      'ưu đãi sốc',
      'kẻo hết chỗ',
      'nhanh tay',
      'số lượng có hạn',
    ]) {
      expect(text, `trang chu chua cum bi cam: ${phrase}`).not.toContain(
        phrase,
      );
    }
  });

  test('disclaimer o footer neu ca quan he that lan gioi han', async ({
    page,
  }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toContainText('giáo viên cơ hữu');
    await expect(footer).toContainText('không phải cổng thông tin chính thức');
  });
});

/**
 * Cac trang co anh. PHAI liet ke day du, khong chi trang chu.
 *
 * Ly do: dot refactor 13/08/2026 tung de sot mot the <img> tro toi anh da bi
 * xoa o trang /gioi-thieu. Build VAN PASS vi Next.js khong kiem tra file trong
 * public/ co ton tai hay khong, va TypeScript khong kiem duoc vi `src` chi la
 * chuoi. Chi co viec mo that trang trong trinh duyet moi phat hien ra.
 */
const pagesWithImages = [
  '/',
  '/gioi-thieu',
  '/khoa-hoc',
  '/khoa-hoc/hang-b-so-tu-dong',
  '/hoc-phi-lo-trinh',
  '/kien-thuc',
  '/kien-thuc/nguoi-moi-nen-hoc-lai-xe-so-san-hay-so-tu-dong',
  '/lien-he',
];

test.describe('hinh anh', () => {
  for (const route of pagesWithImages) {
    test(`moi anh tren ${route} deu tai duoc`, async ({ page }) => {
      await page.goto(route);
      // Cuon het trang de kich hoat cac anh dung loading="lazy".
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForLoadState('networkidle');

      const images = await page.evaluate(() =>
        Array.from(document.images).map((img) => ({
          src: img.currentSrc || img.src,
          /**
           * `naturalWidth === 0` moi la dau hieu dang tin cay cua anh hong.
           * Chi kiem `complete` la khong du: voi anh 404, trinh duyet van dat
           * `complete = true` (no da "xong" viec tai - ket qua la that bai).
           */
          broken: !img.complete || img.naturalWidth === 0,
        })),
      );

      const broken = images.filter((img) => img.broken).map((img) => img.src);

      expect(
        broken,
        `anh khong tai duoc o ${route}: ${broken.join(', ')}`,
      ).toEqual([]);
      // Chan truong hop trang bong mat het anh ma test van "xanh".
      expect(images.length, `${route} khong co anh nao`).toBeGreaterThan(0);
    });
  }

  test('anh hero co width/height de khong gay nhay layout', async ({
    page,
  }) => {
    await page.goto('/');
    const heroImage = page.locator('section').first().locator('img').first();
    await expect(heroImage).toHaveAttribute('width', /\d+/);
    await expect(heroImage).toHaveAttribute('height', /\d+/);
  });
});

test.describe('responsive', () => {
  const viewports = [
    { name: '390px (dien thoai)', width: 390, height: 844 },
    { name: '768px (may tinh bang)', width: 768, height: 1024 },
    { name: '1024px (laptop nho)', width: 1024, height: 768 },
    { name: '1440px (man hinh lon)', width: 1440, height: 900 },
  ];

  for (const viewport of viewports) {
    test(`khong tran ngang o ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto('/');

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      // Cho phep lech 1px do lam tron cua trinh duyet.
      expect(overflow, 'trang bi tran ngang').toBeLessThanOrEqual(1);
    });
  }

  test('dien thoai hien thanh CTA duoi day, khong hien nut noi', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await expect(
      page.getByRole('navigation', { name: 'Liên hệ nhanh' }),
    ).toBeVisible();
  });

  test('man hinh lon hien nut noi', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    // Nut noi nam ngoai <main>, o goc phai duoi.
    const floating = page.locator('a[href^="tel:"]').last();
    await expect(floating).toBeVisible();
  });
});

/**
 * Cau truc tieu de phai lien mach: khong duoc nhay tu h1 thang xuong h3.
 *
 * Nguoi dung trinh doc man hinh thuong dieu huong bang cach nhay giua cac
 * tieu de; mot bac bi thieu lam ho tuong da bo sot noi dung. Dot QA
 * 14/08/2026 phat hien /khoa-hoc va /kien-thuc dat card (h3) thang duoi h1.
 */
test.describe('cau truc tieu de', () => {
  const routes = [
    '/',
    '/gioi-thieu',
    '/khoa-hoc',
    '/khoa-hoc/hang-b-so-tu-dong',
    '/hoc-phi-lo-trinh',
    '/kien-thuc',
    '/kien-thuc/nguoi-moi-nen-hoc-lai-xe-so-san-hay-so-tu-dong',
    '/lien-he',
    '/chinh-sach-bao-mat',
    '/dieu-khoan-su-dung',
  ];

  test('khong trang nao nhay cap tieu de', async ({ page }) => {
    const problems: string[] = [];

    for (const route of routes) {
      await page.goto(route);

      const levels = await page.evaluate(() =>
        Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(
          (el) => ({
            level: Number(el.tagName[1]),
            text: (el.textContent ?? '').trim().slice(0, 40),
          }),
        ),
      );

      const h1Count = levels.filter((h) => h.level === 1).length;
      if (h1Count !== 1) problems.push(`${route}: co ${h1Count} the <h1>`);

      let previous = 0;
      for (const heading of levels) {
        if (previous > 0 && heading.level > previous + 1)
          problems.push(
            `${route}: nhay h${previous} -> h${heading.level} tai "${heading.text}"`,
          );
        previous = heading.level;
      }
    }

    expect(
      problems,
      `loi cau truc tieu de:\n  ${problems.join('\n  ')}`,
    ).toEqual([]);
  });
});

test.describe('SEO', () => {
  test('trang chu co canonical, og va JSON-LD dung loai', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /thaytungdaylaixe\.vn/,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /og-default\.jpg$/,
    );

    const blocks = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const types = blocks.map((raw) => JSON.parse(raw)['@type']);

    expect(types).toContain('Person');
    expect(types).toContain('EducationalOrganization');
    expect(types).toContain('FAQPage');
  });

  test('khong sinh danh gia hay review gia trong JSON-LD', async ({ page }) => {
    await page.goto('/');
    const blocks = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();

    for (const raw of blocks) {
      expect(raw).not.toContain('aggregateRating');
      expect(raw).not.toContain('ratingValue');
      expect(raw).not.toContain('reviewCount');
    }
  });

  /**
   * Do do dai tren HTML DA BUILD, KHONG phai tren config, va tren MOI TRANG.
   *
   * Hai bai hoc da phai tra gia:
   *  1. Unit test chay khong nap .env nen ten thay/ten trung tam la
   *     placeholder, ngan hon ban that - do o do cho con so sai. Chi doc HTML
   *     that moi thay dung chuoi ma Google se doc.
   *  2. Ban dau test nay chi kiem trang chu. Dot QA 14/08/2026 phat hien
   *     /gioi-thieu dai 177 ky tu - lot luoi suot vi khong ai kiem no. Vi vay
   *     bay gio duyet toan bo route.
   */
  const allRoutes = [
    '/',
    '/gioi-thieu',
    '/khoa-hoc',
    '/khoa-hoc/hang-b-so-tu-dong',
    '/khoa-hoc/hang-b-so-san',
    '/khoa-hoc/hang-c1',
    '/khoa-hoc/bo-tuc-tay-lai',
    '/khoa-hoc/luyen-sa-hinh',
    '/hoc-phi-lo-trinh',
    '/kien-thuc',
    '/kien-thuc/nguoi-moi-nen-hoc-lai-xe-so-san-hay-so-tu-dong',
    '/kien-thuc/quy-trinh-dang-ky-hoc-lai-xe-cho-nguoi-moi',
    '/lien-he',
    '/chinh-sach-bao-mat',
    '/dieu-khoan-su-dung',
  ];

  test('moi trang co tieu de va mo ta trong nguong Google hien thi', async ({
    page,
  }) => {
    const tooLong: string[] = [];

    for (const route of allRoutes) {
      await page.goto(route);

      const title = (await page.title()) ?? '';
      const description =
        (await page
          .locator('meta[name="description"]')
          .getAttribute('content')) ?? '';

      expect(title.length, `${route} thieu <title>`).toBeGreaterThan(0);
      expect(
        description.length,
        `${route} thieu meta description`,
      ).toBeGreaterThan(0);

      // Google cat mo ta o ~160 ky tu va tieu de o ~60.
      if (description.length > 160)
        tooLong.push(`${route}: mo ta ${description.length} ky tu`);
      if (title.length > 60)
        tooLong.push(`${route}: tieu de ${title.length} ky tu`);
    }

    expect(tooLong, `bi Google cat:\n  ${tooLong.join('\n  ')}`).toEqual([]);
  });

  /**
   * next.config.ts dat `trailingSlash: true`. Neu sitemap ghi URL khong co
   * dau gach cheo cuoi thi moi dong deu la mot lan chuyen huong 308 - phi
   * ngan sach thu thap cua Google va lech voi canonical.
   */
  test('URL trong sitemap khop chinh xac voi canonical cua trang', async ({
    page,
    request,
  }) => {
    const xml = await (await request.get('/sitemap.xml')).text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => m[1])
      .filter((url): url is string => Boolean(url));

    expect(urls.length, 'sitemap rong').toBeGreaterThan(10);

    const mismatched: string[] = [];
    for (const url of urls) {
      expect(url, `URL sitemap thieu dau gach cheo cuoi: ${url}`).toMatch(
        /\/$/,
      );

      const path = new URL(url).pathname;
      await page.goto(path);
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute('href');
      if (canonical !== url)
        mismatched.push(`${url} -> canonical ${canonical}`);
    }

    expect(
      mismatched,
      `sitemap lech canonical:\n  ${mismatched.join('\n  ')}`,
    ).toEqual([]);
  });

  test('manifest tai duoc', async ({ request }) => {
    const response = await request.get('/manifest.webmanifest');
    expect(response.status()).toBe(200);
    const manifest = await response.json();
    expect(manifest.name.length).toBeGreaterThan(0);
  });
});
