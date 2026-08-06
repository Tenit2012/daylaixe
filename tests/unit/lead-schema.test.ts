import { describe, expect, it } from 'vitest';
import {
  leadFormSchema,
  leadSubmissionSchema,
  leadUpdateSchema,
} from '@/features/leads/domain/lead-schema';

const validInput = {
  fullName: 'Nguyễn Văn An',
  phone: '0912345678',
  interestedCourse: 'hang-b-so-tu-dong',
  location: 'TP. Thủ Đức',
  preferredContactTime: 'toi',
  note: 'Em chỉ rảnh buổi tối.',
  consent: true,
  website: '',
};

describe('leadFormSchema', () => {
  it('chap nhan du lieu hop le', () => {
    const result = leadFormSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('bo qua khoang trang thua trong ho ten', () => {
    const result = leadFormSchema.safeParse({
      ...validInput,
      fullName: '  Nguyễn   Văn   An  ',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.fullName).toBe('Nguyễn Văn An');
    }
  });

  it('bao loi khi thieu ho ten', () => {
    const result = leadFormSchema.safeParse({ ...validInput, fullName: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.fullName).toBeDefined();
    }
  });

  it('bao loi khi ho ten chua ky tu so', () => {
    const result = leadFormSchema.safeParse({
      ...validInput,
      fullName: 'Nguyen Van An 123',
    });
    expect(result.success).toBe(false);
  });

  it('bao loi khi so dien thoai khong hop le', () => {
    const result = leadFormSchema.safeParse({
      ...validInput,
      phone: '0123456789',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.phone?.[0]).toContain(
        'không hợp lệ',
      );
    }
  });

  it('chap nhan so dien thoai co dinh dang khoang trang', () => {
    const result = leadFormSchema.safeParse({
      ...validInput,
      phone: '0912 345 678',
    });
    expect(result.success).toBe(true);
  });

  it('bao loi khi khoa hoc khong nam trong danh sach', () => {
    const result = leadFormSchema.safeParse({
      ...validInput,
      interestedCourse: 'khoa-hoc-khong-ton-tai',
    });
    expect(result.success).toBe(false);
  });

  it('chap nhan gia tri "chua-xac-dinh" cho khoa hoc', () => {
    const result = leadFormSchema.safeParse({
      ...validInput,
      interestedCourse: 'chua-xac-dinh',
    });
    expect(result.success).toBe(true);
  });

  it('bao loi khi chua tich o dong y', () => {
    const result = leadFormSchema.safeParse({ ...validInput, consent: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.consent?.[0]).toContain(
        'đồng ý',
      );
    }
  });

  it('bao loi khi khung gio lien he khong hop le', () => {
    const result = leadFormSchema.safeParse({
      ...validInput,
      preferredContactTime: 'nua-dem',
    });
    expect(result.success).toBe(false);
  });

  it('cho phep bo trong cac truong khong bat buoc', () => {
    const result = leadFormSchema.safeParse({
      fullName: 'Trần Thị Bình',
      phone: '0987654321',
      interestedCourse: 'bo-tuc-tay-lai',
      consent: true,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.location).toBe('');
      expect(result.data.note).toBe('');
    }
  });

  it('cat bot ghi chu vuot qua gioi han do dai', () => {
    const result = leadFormSchema.safeParse({
      ...validInput,
      note: 'a'.repeat(3000),
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.note.length).toBeLessThanOrEqual(1000);
    }
  });

  it('giu lai gia tri honeypot de service kiem tra', () => {
    const result = leadFormSchema.safeParse({
      ...validInput,
      website: 'http://spam.example',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.website).toBe('http://spam.example');
    }
  });
});

describe('leadSubmissionSchema', () => {
  it('chap nhan metadata UTM kem theo', () => {
    const result = leadSubmissionSchema.safeParse({
      ...validInput,
      sourcePage: '/khoa-hoc/hang-b-so-tu-dong',
      utmSource: 'facebook',
      utmMedium: 'social',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.utmSource).toBe('facebook');
      expect(result.data.sourcePage).toBe('/khoa-hoc/hang-b-so-tu-dong');
    }
  });
});

describe('leadUpdateSchema', () => {
  it('chap nhan trang thai hop le', () => {
    const result = leadUpdateSchema.safeParse({
      id: 'lead_1',
      status: 'CONTACTED',
      adminNote: 'Đã gọi lúc 19h.',
    });
    expect(result.success).toBe(true);
  });

  it('tu choi trang thai khong hop le', () => {
    const result = leadUpdateSchema.safeParse({
      id: 'lead_1',
      status: 'KHONG_TON_TAI',
      adminNote: '',
    });
    expect(result.success).toBe(false);
  });

  it('tu choi khi thieu id', () => {
    const result = leadUpdateSchema.safeParse({
      id: '',
      status: 'NEW',
      adminNote: '',
    });
    expect(result.success).toBe(false);
  });
});
