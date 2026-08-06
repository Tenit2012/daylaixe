import { describe, expect, it } from 'vitest';
import {
  extractUtmParams,
  getClientIp,
  hasUtmParams,
} from '@/lib/utils/request-context';

function makeHeaders(map: Record<string, string>) {
  return {
    get: (name: string) => map[name.toLowerCase()] ?? null,
  };
}

describe('getClientIp', () => {
  it('lay IP dau tien trong x-forwarded-for', () => {
    const headers = makeHeaders({
      'x-forwarded-for': '203.0.113.5, 70.41.3.18, 150.172.238.178',
    });
    expect(getClientIp(headers)).toBe('203.0.113.5');
  });

  it('dung x-real-ip khi khong co x-forwarded-for', () => {
    expect(getClientIp(makeHeaders({ 'x-real-ip': '198.51.100.7' }))).toBe(
      '198.51.100.7',
    );
  });

  it('uu tien x-forwarded-for hon x-real-ip', () => {
    const headers = makeHeaders({
      'x-forwarded-for': '203.0.113.5',
      'x-real-ip': '198.51.100.7',
    });
    expect(getClientIp(headers)).toBe('203.0.113.5');
  });

  it('tra ve "unknown" khi khong co header nao', () => {
    expect(getClientIp(makeHeaders({}))).toBe('unknown');
  });

  it('bo qua header rong', () => {
    expect(getClientIp(makeHeaders({ 'x-forwarded-for': '   ' }))).toBe(
      'unknown',
    );
  });
});

describe('extractUtmParams', () => {
  it('doc du 5 tham so UTM tu query string', () => {
    const utm = extractUtmParams(
      '?utm_source=facebook&utm_medium=cpc&utm_campaign=thang9&utm_content=banner1&utm_term=hoc+lai+xe',
    );
    expect(utm).toEqual({
      utmSource: 'facebook',
      utmMedium: 'cpc',
      utmCampaign: 'thang9',
      utmContent: 'banner1',
      utmTerm: 'hoc lai xe',
    });
  });

  it('doc duoc tu URL day du', () => {
    const utm = extractUtmParams(
      'https://example.com/khoa-hoc?utm_source=zalo&utm_medium=message',
    );
    expect(utm.utmSource).toBe('zalo');
    expect(utm.utmMedium).toBe('message');
  });

  it('nhan URLSearchParams truc tiep', () => {
    const params = new URLSearchParams({ utm_source: 'google' });
    expect(extractUtmParams(params).utmSource).toBe('google');
  });

  it('bo qua tham so rong', () => {
    const utm = extractUtmParams('?utm_source=&utm_medium=email');
    expect(utm.utmSource).toBeUndefined();
    expect(utm.utmMedium).toBe('email');
  });

  it('tra ve doi tuong rong khi khong co UTM', () => {
    expect(extractUtmParams('?page=2')).toEqual({});
    expect(extractUtmParams('')).toEqual({});
    expect(extractUtmParams(null)).toEqual({});
    expect(extractUtmParams(undefined)).toEqual({});
  });

  it('cat bot gia tri qua dai', () => {
    const utm = extractUtmParams(`?utm_source=${'a'.repeat(300)}`);
    expect(utm.utmSource?.length).toBe(120);
  });
});

describe('hasUtmParams', () => {
  it('phan biet co va khong co UTM', () => {
    expect(hasUtmParams({ utmSource: 'facebook' })).toBe(true);
    expect(hasUtmParams({})).toBe(false);
  });
});
