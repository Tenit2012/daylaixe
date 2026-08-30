import { describe, expect, it } from 'vitest';
import { absoluteUrl, pageUrl } from '@/lib/seo/metadata';
import { buildCourseJsonLd } from '@/lib/seo/structured-data';
import { sortedCourses } from '@/content/courses';
import { siteConfig } from '@/config/site';

/**
 * Hai ham nay trong giong nhau nhung KHONG thay the nhau duoc.
 *
 * next.config.ts dat `trailingSlash: true`, nen dia chi that cua mot TRANG
 * luon ket thuc bang dau gach cheo, con duong dan toi mot FILE thi khong.
 * Dot QA 14/08/2026 phat hien sitemap va JSON-LD dung nham `absoluteUrl` cho
 * trang, khien URL lech voi canonical va bien moi dong sitemap thanh mot lan
 * chuyen huong 308.
 */
describe('pageUrl - dung cho TRANG', () => {
  it('luon ket thuc bang dau gach cheo', () => {
    expect(pageUrl('/')).toBe(`${siteConfig.url}/`);
    expect(pageUrl('/khoa-hoc')).toBe(`${siteConfig.url}/khoa-hoc/`);
    expect(pageUrl('/kien-thuc/abc')).toBe(`${siteConfig.url}/kien-thuc/abc/`);
  });

  it('khong nhan doi dau gach cheo khi dau vao da co san', () => {
    expect(pageUrl('/khoa-hoc/')).toBe(`${siteConfig.url}/khoa-hoc/`);
    expect(pageUrl('/khoa-hoc/')).not.toContain('//khoa-hoc');
  });

  it('tu them dau gach cheo dau neu thieu', () => {
    expect(pageUrl('khoa-hoc')).toBe(`${siteConfig.url}/khoa-hoc/`);
  });
});

describe('absoluteUrl - dung cho FILE', () => {
  it('khong them dau gach cheo cuoi vao duong dan tep', () => {
    const url = absoluteUrl('/images/og/og-default.jpg');
    expect(url).toBe(`${siteConfig.url}/images/og/og-default.jpg`);
    expect(url.endsWith('/')).toBe(false);
  });

  it('goc website khong co dau gach cheo thua', () => {
    expect(absoluteUrl('/')).toBe(siteConfig.url);
  });
});

/**
 * `offers` la khoi so lieu DUY NHAT duoc phep co trong JSON-LD cua site nay
 * (aggregateRating, so hoc vien, ty le dau deu bi cam - xem dau file
 * src/lib/seo/structured-data.ts). No chi hop le chung nao con so bao cho
 * Google TRUNG voi con so website dang hien.
 *
 * Hai test duoi khoa dung hai huong sai:
 *  - bao mot con so KHAC voi `tuition` -> Google hien gia sai;
 *  - bao gia cho khoa chua chot hoc phi -> bia so.
 */
describe('buildCourseJsonLd - offers', () => {
  it('bao dung muc gia cua khoa da chot hoc phi', () => {
    const priced = sortedCourses.filter((course) => course.tuition?.amountVnd);
    expect(priced.length).toBeGreaterThan(0);

    for (const course of priced) {
      const offers = buildCourseJsonLd(course).offers as Record<
        string,
        unknown
      >;
      expect(offers, `khoa ${course.slug} thieu offers`).toBeDefined();
      expect(offers.price).toBe(String(course.tuition?.amountVnd));
      expect(offers.priceCurrency).toBe('VND');
    }
  });

  it('khong sinh offers cho khoa chua chot hoc phi', () => {
    const unpriced = sortedCourses.filter((course) => !course.tuition);
    expect(unpriced.length).toBeGreaterThan(0);

    for (const course of unpriced) {
      expect(
        buildCourseJsonLd(course).offers,
        `khoa ${course.slug} khong duoc co offers`,
      ).toBeUndefined();
    }
  });
});
