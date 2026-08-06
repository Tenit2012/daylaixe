import { describe, expect, it } from 'vitest';
import {
  buildEmailHref,
  buildExternalHref,
  buildMapsHref,
  buildPhoneHref,
  buildSmsHref,
  buildZaloHref,
} from '@/lib/utils/cta-links';

describe('buildPhoneHref', () => {
  it('tao tel: dang quoc te tu so di dong', () => {
    expect(buildPhoneHref('0912345678')).toBe('tel:+84912345678');
    expect(buildPhoneHref('0912 345 678')).toBe('tel:+84912345678');
  });

  it('tra ve null khi con la placeholder', () => {
    expect(buildPhoneHref('[Số điện thoại]')).toBeNull();
  });

  it('tra ve null khi chuoi rong', () => {
    expect(buildPhoneHref('')).toBeNull();
  });

  it('van tao link cho so co dinh / hotline', () => {
    expect(buildPhoneHref('02838123456')).toBe('tel:02838123456');
    expect(buildPhoneHref('19001234')).toBe('tel:19001234');
  });

  it('tra ve null khi so qua ngan', () => {
    expect(buildPhoneHref('123')).toBeNull();
  });
});

describe('buildSmsHref', () => {
  it('tao sms: dang quoc te', () => {
    expect(buildSmsHref('0912345678')).toBe('sms:+84912345678');
  });

  it('tra ve null voi placeholder', () => {
    expect(buildSmsHref('[Số điện thoại]')).toBeNull();
  });
});

describe('buildZaloHref', () => {
  it('giu nguyen URL day du', () => {
    expect(buildZaloHref('https://zalo.me/0912345678')).toBe(
      'https://zalo.me/0912345678',
    );
  });

  it('tao URL tu so dien thoai trong truong zalo', () => {
    expect(buildZaloHref('0912345678')).toBe('https://zalo.me/0912345678');
  });

  it('suy ra tu so dien thoai lien he khi zalo con la placeholder', () => {
    expect(buildZaloHref('[Zalo URL]', '0912345678')).toBe(
      'https://zalo.me/0912345678',
    );
  });

  it('tra ve null khi ca hai deu la placeholder', () => {
    expect(buildZaloHref('[Zalo URL]', '[Số điện thoại]')).toBeNull();
  });

  it('tra ve null khi gia tri khong phai URL va khong phai so hop le', () => {
    expect(buildZaloHref('zalo-cua-thay')).toBeNull();
  });
});

describe('buildMapsHref', () => {
  it('chap nhan URL https', () => {
    expect(buildMapsHref('https://maps.app.goo.gl/abc')).toBe(
      'https://maps.app.goo.gl/abc',
    );
  });

  it('tu choi placeholder va gia tri khong phai URL', () => {
    expect(buildMapsHref('[Google Maps URL]')).toBeNull();
    expect(buildMapsHref('maps.google.com')).toBeNull();
  });
});

describe('buildEmailHref', () => {
  it('tao mailto: cho email hop le', () => {
    expect(buildEmailHref('thay@example.com')).toBe('mailto:thay@example.com');
  });

  it('tu choi placeholder va email sai dinh dang', () => {
    expect(buildEmailHref('[Email]')).toBeNull();
    expect(buildEmailHref('khong-phai-email')).toBeNull();
  });
});

describe('buildExternalHref', () => {
  it('chap nhan http va https', () => {
    expect(buildExternalHref('https://facebook.com/abc')).toBe(
      'https://facebook.com/abc',
    );
  });

  it('tu choi placeholder va giao thuc khac', () => {
    expect(buildExternalHref('[Facebook URL]')).toBeNull();
    expect(buildExternalHref('javascript:alert(1)')).toBeNull();
  });
});
