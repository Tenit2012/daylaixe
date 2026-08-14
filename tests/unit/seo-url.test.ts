import { describe, expect, it } from 'vitest';
import { absoluteUrl, pageUrl } from '@/lib/seo/metadata';
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
