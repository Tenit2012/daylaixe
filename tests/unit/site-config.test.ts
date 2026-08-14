import { describe, expect, it } from 'vitest';
import {
  getUnresolvedPlaceholders,
  isPlaceholderValue,
  legalNav,
  mainNav,
  siteConfig,
} from '@/config/site';

describe('isPlaceholderValue', () => {
  it('nhan dien chuoi dang [Ten]', () => {
    expect(isPlaceholderValue('[Tên thầy]')).toBe(true);
    expect(isPlaceholderValue('  [Số điện thoại]  ')).toBe(true);
  });

  it('khong nham gia tri that la placeholder', () => {
    expect(isPlaceholderValue('Nguyễn Văn A')).toBe(false);
    expect(isPlaceholderValue('0912345678')).toBe(false);
    expect(isPlaceholderValue('')).toBe(false);
  });
});

describe('siteConfig', () => {
  it('co day du cac nhom cau hinh bat buoc', () => {
    expect(siteConfig.brandName.length).toBeGreaterThan(0);
    expect(siteConfig.teacher).toBeDefined();
    expect(siteConfig.contact).toBeDefined();
    expect(siteConfig.seo).toBeDefined();
    expect(siteConfig.messaging).toBeDefined();
    expect(siteConfig.analytics).toBeDefined();
  });

  it('siteUrl khong ket thuc bang dau gach cheo', () => {
    expect(siteConfig.url.endsWith('/')).toBe(false);
    expect(siteConfig.url.startsWith('http')).toBe(true);
  });

  /**
   * Disclaimer phai neu DONG THOI hai y: thay LA giao vien co huu cua trung
   * tam (quan he co that), NHUNG day khong phai cong thong tin chinh thuc.
   * Thieu y dau -> phu nhan quan he co that; thieu y sau -> thanh mao danh.
   */
  /**
   * LUU Y: cac test duoi day KHONG kiem tra gia tri that ("An ninh Nhan dan",
   * "Vo Nguyen Giap"...) vi moi truong test khong nap file .env - config se roi
   * ve placeholder. Chung kiem tra dieu quan trong hon va luon dung: phan van
   * ban CO DINH duoc viet dung, va gia tri tu config duoc NOI vao dung cho.
   */
  it('disclaimer neu ca quan he that lan gioi han cua website', () => {
    expect(siteConfig.disclaimer).toContain('giáo viên cơ hữu');
    expect(siteConfig.disclaimer).toContain(
      'không phải cổng thông tin chính thức',
    );
    // Ten trung tam phai duoc noi vao, du la gia tri that hay placeholder.
    expect(siteConfig.disclaimer).toContain(siteConfig.teacher.centerName);
  });

  it('hero neu ro day la ai, hoc o dau, dang ky voi ai', () => {
    expect(siteConfig.messaging.heroTitle).toContain('giáo viên cơ hữu');
    expect(siteConfig.messaging.heroTitle).toContain(
      siteConfig.teacher.centerName,
    );
    expect(siteConfig.messaging.heroSubtitle).toContain('kinh nghiệm');
    expect(siteConfig.messaging.heroSubtitle).toContain('Đăng ký trực tiếp');
  });

  it('triet ly dao tao dung nguyen van', () => {
    expect(siteConfig.messaging.philosophy).toBe(
      'Tôi không chỉ hướng dẫn học viên vượt qua kỳ thi, mà còn mong mỗi học viên đủ bình tĩnh và tự tin để lái xe an toàn sau khi nhận bằng.',
    );
  });

  it('SEO description neu ro vi tri cong tac va dia diem hoc', () => {
    const description = siteConfig.seo.defaultDescription;
    expect(description).toContain('giáo viên cơ hữu');
    expect(description).toContain('Thủ Đức');
    expect(description).toContain('không trung gian');
  });

  /**
   * Google cat mo ta o khoang 160 ky tu. Vuot nguong la cau cuoi bi cat giua
   * chung tren trang ket qua tim kiem.
   *
   * CAN THAN: moi truong test KHONG nap .env nen `teacherName` la placeholder
   * "[Tên thầy]" -> chuoi o day ngan hon ban that. Do thang do dai chuoi hien
   * tai la BAY: no tung cho ket qua 154 ky tu trong khi ban production that su
   * la 162. Vi vay phai do tren TRUONG HOP XAU NHAT: thay ten hien tai bang
   * mot ten dai hop ly.
   *
   * Kiem tra tren HTML that da build nam o tests/e2e/landing-page.spec.ts.
   */
  it('SEO description khong vuot 160 ky tu ke ca voi ten thay dai', () => {
    const LONGEST_REALISTIC_NAME = 'Nguyễn Văn Thành'; // 16 ky tu
    const worstCase = siteConfig.seo.defaultDescription.replace(
      siteConfig.teacher.name,
      LONGEST_REALISTIC_NAME,
    );

    expect(
      worstCase.length,
      `mo ta dai ${worstCase.length} ky tu: "${worstCase}"`,
    ).toBeLessThanOrEqual(160);
  });

  it('khong dung tu ngu cam ket ket qua thi', () => {
    const haystack = JSON.stringify(siteConfig).toLowerCase();
    for (const phrase of ['bao đậu', 'cam kết đậu', 'chống trượt', 'rẻ nhất']) {
      expect(haystack).not.toContain(phrase);
    }
  });

  it('Facebook Pixel mac dinh tat', () => {
    expect(siteConfig.analytics.facebookPixelEnabled).toBe(false);
  });

  it('bo tu khoa SEO gom cac tu khoa dia phuong', () => {
    expect(siteConfig.seo.keywords).toContain('học lái xe TP.HCM');
    expect(siteConfig.seo.keywords).toContain('học lái xe Thủ Đức');
  });
});

/**
 * Du lieu kinh nghiem la THONG TIN THAT da duoc xac nhan (07/08/2026).
 * Cac test duoi day bao ve dung hai dieu:
 *  1. Khong bien uoc luong "gan 20 nam" thanh con so tuyet doi "20 nam".
 *  2. Khong bia them thanh tich, so lieu, chuc vu hay cap bac.
 */
describe('thong tin kinh nghiem (VERIFIED_REAL_DATA)', () => {
  it('luu duoi dang nhan chu, khong phai so', () => {
    expect(typeof siteConfig.teacher.experienceLabel).toBe('string');
    expect(siteConfig.teacher.experienceLabel.length).toBeGreaterThan(0);
    // Khong duoc la mot chuoi chi gom chu so.
    expect(siteConfig.teacher.experienceLabel).not.toMatch(/^\d+$/);
  });

  it('giu nguyen tinh uoc luong, khong lam tron thanh con so tuyet doi', () => {
    const label = siteConfig.teacher.experienceLabel.toLowerCase();
    // Chi ap dung khi du lieu goc la mot uoc luong ("gan N nam").
    const approximate = label.match(/gần\s+(\d+)\s*năm/);
    if (!approximate) return;

    const years = approximate[1];

    // Bat ky cau van nao nhac toi so nam deu phai giu chu "gan" di kem,
    // khong duoc rut gon thanh "20 năm".
    for (const sentence of Object.values(siteConfig.experience)) {
      const text = sentence.toLowerCase();
      if (!text.includes(`${years} năm`)) continue;
      expect(text, `cau van lam tron mat chu "gần": ${sentence}`).toContain(
        `gần ${years} năm`,
      );
    }
  });

  it('nhac du ca hai nhom hoc vien trong doan gioi thieu', () => {
    const bio = siteConfig.experience.biography.toLowerCase();
    expect(bio).toContain('dân sự');
    expect(bio).toContain('công an');
  });

  it('cach goi nhom hoc vien nam trong config de doi duoc wording', () => {
    expect(siteConfig.teacher.studentGroups.length).toBeGreaterThan(0);
    expect(siteConfig.teacher.studentGroupsShort.length).toBeGreaterThan(0);
  });

  it('khong bia so lieu, thanh tich, chuc vu hay cap bac', () => {
    const haystack = [
      ...Object.values(siteConfig.experience),
      siteConfig.teacher.studentGroups,
      siteConfig.teacher.studentGroupsShort,
    ]
      .join(' ')
      .toLowerCase();

    for (const phrase of [
      'tỷ lệ',
      'đạt giải',
      'danh hiệu',
      'huân chương',
      'bằng khen',
      'thượng úy',
      'đại úy',
      'thiếu tá',
      'trung tá',
      'thượng tá',
      'đại tá',
      'trưởng phòng',
      'chỉ huy',
    ]) {
      expect(haystack, `khong duoc chua cum: ${phrase}`).not.toContain(phrase);
    }

    // Khong duoc nhac so luong hoc vien dang con so.
    expect(haystack).not.toMatch(/\d[\d.,]*\s*(học viên|hoc vien)/);
  });
});

describe('dieu huong', () => {
  it('mainNav co du cac muc bat buoc', () => {
    const hrefs = mainNav.map((item) => item.href);
    for (const href of [
      '/',
      '/gioi-thieu',
      '/khoa-hoc',
      '/hoc-phi-lo-trinh',
      '/kien-thuc',
      '/lien-he',
    ]) {
      expect(hrefs).toContain(href);
    }
  });

  it('legalNav co chinh sach bao mat va dieu khoan', () => {
    const hrefs = legalNav.map((item) => item.href);
    expect(hrefs).toContain('/chinh-sach-bao-mat');
    expect(hrefs).toContain('/dieu-khoan-su-dung');
  });
});

describe('getUnresolvedPlaceholders', () => {
  it('liet ke duoc cac placeholder chua thay (o cau hinh mac dinh)', () => {
    const unresolved = getUnresolvedPlaceholders();
    expect(Array.isArray(unresolved)).toBe(true);
    // Moi truong test dung gia tri placeholder mac dinh.
    expect(unresolved).toContain('Tên thầy');
  });
});
