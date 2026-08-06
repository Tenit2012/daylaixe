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

  it('disclaimer neu ro khong phai cong thong tin chinh thuc', () => {
    expect(siteConfig.disclaimer).toContain(
      'không phải cổng thông tin chính thức',
    );
    expect(siteConfig.disclaimer).toContain('An ninh Nhân dân');
  });

  it('thong diep chinh va phu dung nhu yeu cau', () => {
    expect(siteConfig.messaging.primary).toContain(
      'tận tình từ buổi đầu đến ngày thi sát hạch',
    );
    expect(siteConfig.messaging.secondary).toContain('lịch học linh hoạt');
  });

  it('triet ly dao tao dung nguyen van', () => {
    expect(siteConfig.messaging.philosophy).toBe(
      'Tôi không chỉ hướng dẫn học viên vượt qua kỳ thi, mà còn mong mỗi học viên đủ bình tĩnh và tự tin để lái xe an toàn sau khi nhận bằng.',
    );
  });

  it('SEO description dung noi dung yeu cau', () => {
    expect(siteConfig.seo.defaultDescription).toBe(
      'Tư vấn học lái xe hạng B, C1 và bổ túc tay lái. Hướng dẫn tận tình, lịch học linh hoạt và minh bạch thông tin từ đăng ký đến ngày thi.',
    );
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

describe('dieu huong', () => {
  it('mainNav co du cac muc bat buoc', () => {
    const hrefs = mainNav.map((item) => item.href);
    for (const href of [
      '/',
      '/gioi-thieu',
      '/khoa-hoc',
      '/hoc-phi-lo-trinh',
      '/cam-nhan-hoc-vien',
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
