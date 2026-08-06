import { describe, expect, it } from 'vitest';
import {
  formatVietnamesePhone,
  isValidVietnamesePhone,
  normalizeVietnamesePhone,
  toInternationalPhone,
} from '@/lib/validation/phone';

describe('normalizeVietnamesePhone', () => {
  it('giu nguyen so hop le dang 0xxxxxxxxx', () => {
    expect(normalizeVietnamesePhone('0912345678')).toBe('0912345678');
  });

  it('bo khoang trang, dau gach ngang va dau cham', () => {
    expect(normalizeVietnamesePhone('0912 345 678')).toBe('0912345678');
    expect(normalizeVietnamesePhone('0912-345-678')).toBe('0912345678');
    expect(normalizeVietnamesePhone('0912.345.678')).toBe('0912345678');
    expect(normalizeVietnamesePhone('  0912345678  ')).toBe('0912345678');
  });

  it('chuyen dang quoc te +84 ve dang 0', () => {
    expect(normalizeVietnamesePhone('+84912345678')).toBe('0912345678');
    expect(normalizeVietnamesePhone('+84 912 345 678')).toBe('0912345678');
  });

  it('chuyen dang 84xxxxxxxxx ve dang 0', () => {
    expect(normalizeVietnamesePhone('84912345678')).toBe('0912345678');
  });

  it('chuyen dang 0084xxxxxxxxx ve dang 0', () => {
    expect(normalizeVietnamesePhone('0084912345678')).toBe('0912345678');
  });

  it('chap nhan cac dau so di dong pho bien', () => {
    const samples = [
      '0321234567',
      '0561234567',
      '0701234567',
      '0811234567',
      '0901234567',
      '0961234567',
      '0991234567',
    ];
    for (const sample of samples) {
      expect(normalizeVietnamesePhone(sample)).toBe(sample);
    }
  });

  it('tu choi so co do dai sai', () => {
    expect(normalizeVietnamesePhone('091234567')).toBeNull();
    expect(normalizeVietnamesePhone('09123456789')).toBeNull();
    expect(normalizeVietnamesePhone('')).toBeNull();
  });

  it('tu choi dau so khong thuoc mang di dong Viet Nam', () => {
    expect(normalizeVietnamesePhone('0123456789')).toBeNull();
    expect(normalizeVietnamesePhone('0281234567')).toBeNull();
    expect(normalizeVietnamesePhone('0111234567')).toBeNull();
  });

  it('tu choi gia tri khong phai chuoi', () => {
    expect(normalizeVietnamesePhone(null as unknown as string)).toBeNull();
    expect(normalizeVietnamesePhone(12345 as unknown as string)).toBeNull();
  });

  it('tu choi chuoi chua chu cai', () => {
    expect(normalizeVietnamesePhone('091234567a')).toBeNull();
  });
});

describe('isValidVietnamesePhone', () => {
  it('tra ve true voi so hop le', () => {
    expect(isValidVietnamesePhone('0912345678')).toBe(true);
    expect(isValidVietnamesePhone('+84 912 345 678')).toBe(true);
  });

  it('tra ve false voi so khong hop le', () => {
    expect(isValidVietnamesePhone('0123456789')).toBe(false);
    expect(isValidVietnamesePhone('abc')).toBe(false);
  });
});

describe('formatVietnamesePhone', () => {
  it('nhom chu so theo dang 0912 345 678', () => {
    expect(formatVietnamesePhone('0912345678')).toBe('0912 345 678');
    expect(formatVietnamesePhone('+84912345678')).toBe('0912 345 678');
  });

  it('giu nguyen chuoi khi khong chuan hoa duoc', () => {
    expect(formatVietnamesePhone('[Số điện thoại]')).toBe('[Số điện thoại]');
  });
});

describe('toInternationalPhone', () => {
  it('chuyen ve dang +84', () => {
    expect(toInternationalPhone('0912345678')).toBe('+84912345678');
  });

  it('tra ve null voi so khong hop le', () => {
    expect(toInternationalPhone('0123456789')).toBeNull();
  });
});
