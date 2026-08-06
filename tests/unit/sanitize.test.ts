import { describe, expect, it } from 'vitest';
import {
  escapeSpreadsheetValue,
  sanitizeInternalPath,
  sanitizeMultilineText,
  sanitizeText,
} from '@/lib/security/sanitize';

describe('sanitizeText', () => {
  it('gom khoang trang thua va cat hai dau', () => {
    expect(sanitizeText('  Nguyễn   Văn   An  ')).toBe('Nguyễn Văn An');
  });

  it('bo ky tu dieu khien', () => {
    expect(sanitizeText(`Nguyen${String.fromCharCode(0)}Van`)).toBe(
      'NguyenVan',
    );
  });

  it('bo ky tu zero-width', () => {
    expect(sanitizeText(`An${String.fromCharCode(0x200b)}An`)).toBe('AnAn');
  });

  it('cat theo do dai toi da', () => {
    expect(sanitizeText('a'.repeat(200), 50).length).toBe(50);
  });

  it('tra ve chuoi rong voi gia tri khong phai chuoi', () => {
    expect(sanitizeText(null)).toBe('');
    expect(sanitizeText(123)).toBe('');
    expect(sanitizeText(undefined)).toBe('');
  });

  it('giu nguyen dau tieng Viet', () => {
    expect(sanitizeText('Đường Nguyễn Huệ, Quận 1')).toBe(
      'Đường Nguyễn Huệ, Quận 1',
    );
  });
});

describe('sanitizeMultilineText', () => {
  it('giu ky tu xuong dong', () => {
    expect(sanitizeMultilineText('dong 1\ndong 2')).toBe('dong 1\ndong 2');
  });

  it('chuan hoa CRLF ve LF', () => {
    expect(sanitizeMultilineText('dong 1\r\ndong 2')).toBe('dong 1\ndong 2');
  });

  it('gom nhieu dong trong lien tiep', () => {
    expect(sanitizeMultilineText('a\n\n\n\n\nb')).toBe('a\n\nb');
  });

  it('cat theo do dai toi da', () => {
    expect(sanitizeMultilineText('a'.repeat(5000), 100).length).toBe(100);
  });
});

describe('escapeSpreadsheetValue', () => {
  it('them dau nhay truoc cong thuc', () => {
    expect(escapeSpreadsheetValue('=SUM(A1:A2)')).toBe("'=SUM(A1:A2)");
    expect(escapeSpreadsheetValue('+1234')).toBe("'+1234");
    expect(escapeSpreadsheetValue('-1234')).toBe("'-1234");
    expect(escapeSpreadsheetValue('@cmd')).toBe("'@cmd");
  });

  it('giu nguyen gia tri binh thuong', () => {
    expect(escapeSpreadsheetValue('Nguyễn Văn An')).toBe('Nguyễn Văn An');
    expect(escapeSpreadsheetValue('0912345678')).toBe('0912345678');
  });
});

describe('sanitizeInternalPath', () => {
  it('chap nhan duong dan noi bo', () => {
    expect(sanitizeInternalPath('/admin/leads')).toBe('/admin/leads');
    expect(sanitizeInternalPath('/admin/leads?status=NEW')).toBe(
      '/admin/leads?status=NEW',
    );
  });

  it('chan URL tuyet doi ra ben ngoai', () => {
    expect(sanitizeInternalPath('https://evil.example')).toBe('/admin/leads');
    expect(sanitizeInternalPath('http://evil.example')).toBe('/admin/leads');
  });

  it('chan duong dan bat dau bang hai dau gach cheo', () => {
    expect(sanitizeInternalPath('//evil.example')).toBe('/admin/leads');
  });

  it('chan duong dan chua dau gach nguoc', () => {
    expect(sanitizeInternalPath('/admin\\..\\evil')).toBe('/admin/leads');
  });

  it('chan chuoi chua ky tu dieu khien', () => {
    expect(sanitizeInternalPath(`/admin${String.fromCharCode(10)}evil`)).toBe(
      '/admin/leads',
    );
  });

  it('dung fallback voi gia tri khong phai chuoi', () => {
    expect(sanitizeInternalPath(null)).toBe('/admin/leads');
    expect(sanitizeInternalPath(undefined, '/khac')).toBe('/khac');
  });
});
