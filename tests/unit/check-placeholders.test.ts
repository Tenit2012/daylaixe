import { describe, it, expect } from 'vitest';
import {
  evaluateEnv,
  scanSourceText,
  parseEnvFile,
  isBracketPlaceholder,
  mask,
} from '../../scripts/check-production-placeholders';

describe('check-production-placeholders helpers', () => {
  describe('mask', () => {
    it('che gia tri dai, khong lo secret', () => {
      expect(mask('super-secret-value')).toBe('sup***');
    });
    it('che hoan toan gia tri ngan', () => {
      expect(mask('abcd')).toBe('***');
    });
  });

  describe('isBracketPlaceholder', () => {
    it('nhan dien placeholder [...]', () => {
      expect(isBracketPlaceholder('[Email]')).toBe(true);
      expect(isBracketPlaceholder('  [Zalo URL] ')).toBe(true);
    });
    it('khong nham gia tri that', () => {
      expect(isBracketPlaceholder('Tùng')).toBe(false);
      expect(isBracketPlaceholder('https://zalo.me/0971397882')).toBe(false);
    });
  });

  describe('parseEnvFile', () => {
    it('doc KEY="value", KEY=value, bo qua comment', () => {
      const env = parseEnvFile(
        [
          '# comment',
          'A="hello"',
          "B='world'",
          'C=plain',
          '',
          'D = spaced ',
        ].join('\n'),
      );
      expect(env.A).toBe('hello');
      expect(env.B).toBe('world');
      expect(env.C).toBe('plain');
      expect(env.D).toBe('spaced');
    });
  });

  describe('evaluateEnv', () => {
    it('bao loi khi env con gia tri mau nguy hiem (production blockers, strict)', () => {
      // strict = true = nham production -> production-blocker thanh error.
      const findings = evaluateEnv(
        {
          NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
        },
        true,
      );
      const errorCodes = findings
        .filter((f) => f.severity === 'error')
        .map((f) => f.code);
      expect(errorCodes).toContain('ENV_FORBIDDEN'); // ít nhất một blocker
    });

    it('khong bao loi khi env da la gia tri production hop le', () => {
      const findings = evaluateEnv({
        NEXT_PUBLIC_SITE_URL: 'https://thaytungdaylaixe.vn',
        NEXT_PUBLIC_TEACHER_NAME: 'Tùng',
        NEXT_PUBLIC_PHONE_NUMBER: '0971397882',
        NEXT_PUBLIC_ZALO_URL: 'https://zalo.me/0971397882',
        NEXT_PUBLIC_TEACHER_TITLE: 'Giáo viên dạy thực hành lái xe',
        NEXT_PUBLIC_ADDRESS: 'TP. Thủ Đức',
        NEXT_PUBLIC_TRAINING_AREA: 'TP. Thủ Đức',
        NEXT_PUBLIC_CENTER_NAME: 'Trung tâm ABC',
        NEXT_PUBLIC_CONTACT_EMAIL: 'thaytung@gmail.com',
      });
      expect(findings.filter((f) => f.severity === 'error')).toHaveLength(0);
    });

    it('bao loi khi bien bat buoc con placeholder [...]', () => {
      const findings = evaluateEnv({
        NEXT_PUBLIC_TEACHER_NAME: '[Tên thầy]',
      });
      expect(findings.some((f) => f.code === 'ENV_PLACEHOLDER')).toBe(true);
    });
  });

  describe('scanSourceText', () => {
    it('bat literal nguy hiem trong source', () => {
      const text = [
        'const phone = "0900000000";',
        'const email = "example@example.com";',
        'const name = "[Tên thầy]";',
      ].join('\n');
      const findings = scanSourceText(text, 'src/some-file.ts');
      const codes = findings.map((f) => f.code);
      expect(codes).toContain('PHONE_0900');
      expect(codes).toContain('EMAIL_EXAMPLE');
      expect(codes).toContain('BRACKET_TEACHER');
      // Có số dòng cụ thể.
      const phoneFinding = findings.find((f) => f.code === 'PHONE_0900');
      expect(phoneFinding?.line).toBe(1);
    });

    it('khong bao dong voi source sach', () => {
      const text = 'export const x = siteConfig.contact.phone;';
      expect(scanSourceText(text, 'src/clean.ts')).toHaveLength(0);
    });
  });
});
