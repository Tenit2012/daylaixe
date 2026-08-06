import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryLeadRepository } from '@/features/leads/infrastructure/in-memory-lead-repository';
import { LeadService } from '@/features/leads/application/lead-service';
import { RateLimiter } from '@/lib/rate-limit/rate-limiter';

/**
 * Integration test cho luong gui form dang ky:
 * schema -> service -> repository, khong mock tang giua.
 */

const validSubmission = {
  fullName: 'Nguyễn Văn An',
  phone: '0912 345 678',
  interestedCourse: 'hang-b-so-tu-dong',
  location: 'TP. Thủ Đức',
  preferredContactTime: 'toi',
  note: 'Em chỉ rảnh buổi tối.',
  consent: true,
  website: '',
  sourcePage: '/khoa-hoc/hang-b-so-tu-dong',
  utmSource: 'facebook',
  utmMedium: 'social',
  utmCampaign: 'khai-giang',
};

describe('LeadService.submit', () => {
  let repository: InMemoryLeadRepository;
  let service: LeadService;

  beforeEach(() => {
    repository = new InMemoryLeadRepository();
    service = new LeadService(
      repository,
      new RateLimiter({ limit: 5, windowMs: 60_000 }),
    );
  });

  it('luu lead thanh cong voi du lieu hop le', async () => {
    const result = await service.submit(validSubmission, {
      clientKey: 'ip-1',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.leadId).toBeTruthy();
      expect(result.message).toContain('Đã nhận thông tin');
    }
  });

  it('ghi dung du lieu vao repository', async () => {
    await service.submit(validSubmission, { clientKey: 'ip-1' });

    const stored = repository.getAll();
    expect(stored).toHaveLength(1);

    const lead = stored[0];
    expect(lead).toBeDefined();
    if (!lead) return;

    expect(lead.fullName).toBe('Nguyễn Văn An');
    expect(lead.normalizedPhone).toBe('0912345678');
    expect(lead.interestedCourse).toBe('hang-b-so-tu-dong');
    expect(lead.status).toBe('NEW');
    expect(lead.sourcePage).toBe('/khoa-hoc/hang-b-so-tu-dong');
    expect(lead.utmSource).toBe('facebook');
    expect(lead.utmCampaign).toBe('khai-giang');
  });

  it('chuan hoa so dien thoai truoc khi luu', async () => {
    await service.submit(
      { ...validSubmission, phone: '+84 912 345 678' },
      { clientKey: 'ip-1' },
    );

    const lead = repository.getAll()[0];
    expect(lead?.normalizedPhone).toBe('0912345678');
  });

  it('bao loi khi thieu truong bat buoc', async () => {
    const result = await service.submit(
      { ...validSubmission, fullName: '' },
      { clientKey: 'ip-1' },
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe('VALIDATION_ERROR');
      expect(result.fieldErrors?.fullName).toBeDefined();
    }
    expect(repository.getAll()).toHaveLength(0);
  });

  it('bao loi khi so dien thoai khong hop le', async () => {
    const result = await service.submit(
      { ...validSubmission, phone: '0123456789' },
      { clientKey: 'ip-1' },
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe('VALIDATION_ERROR');
      expect(result.fieldErrors?.phone).toBeDefined();
    }
    expect(repository.getAll()).toHaveLength(0);
  });

  it('bao loi khi chua dong y cung cap thong tin', async () => {
    const result = await service.submit(
      { ...validSubmission, consent: false },
      { clientKey: 'ip-1' },
    );

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fieldErrors?.consent).toBeDefined();
    expect(repository.getAll()).toHaveLength(0);
  });

  it('phat hien honeypot va KHONG luu du lieu', async () => {
    const result = await service.submit(
      { ...validSubmission, website: 'http://spam.example' },
      { clientKey: 'ip-1' },
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe('SPAM_DETECTED');
      // Thong bao giong truong hop thanh cong de bot khong biet bi phat hien.
      expect(result.message).toContain('Đã nhận thông tin');
    }
    expect(repository.getAll()).toHaveLength(0);
  });

  it('chan gui trung cung so dien thoai trong thoi gian ngan', async () => {
    const first = await service.submit(validSubmission, { clientKey: 'ip-1' });
    expect(first.ok).toBe(true);

    const second = await service.submit(validSubmission, { clientKey: 'ip-2' });
    expect(second.ok).toBe(false);
    if (!second.ok) expect(second.code).toBe('DUPLICATE');

    expect(repository.getAll()).toHaveLength(1);
  });

  it('cho phep gui lai sau khi qua cua so chong trung', async () => {
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date('2026-01-01T10:00:00Z'));
      const first = await service.submit(validSubmission, { clientKey: 'ip-1' });
      expect(first.ok).toBe(true);

      // Vuot qua cua so chong trung 5 phut.
      vi.setSystemTime(new Date('2026-01-01T10:06:00Z'));
      const second = await service.submit(validSubmission, {
        clientKey: 'ip-1',
      });
      expect(second.ok).toBe(true);
      expect(repository.getAll()).toHaveLength(2);
    } finally {
      vi.useRealTimers();
    }
  });

  it('chan khi vuot gioi han rate limit theo IP', async () => {
    const limitedService = new LeadService(
      repository,
      new RateLimiter({ limit: 2, windowMs: 60_000 }),
    );

    await limitedService.submit(
      { ...validSubmission, phone: '0912345671' },
      { clientKey: 'ip-1' },
    );
    await limitedService.submit(
      { ...validSubmission, phone: '0912345672' },
      { clientKey: 'ip-1' },
    );
    const third = await limitedService.submit(
      { ...validSubmission, phone: '0912345673' },
      { clientKey: 'ip-1' },
    );

    expect(third.ok).toBe(false);
    if (!third.ok) {
      expect(third.code).toBe('RATE_LIMITED');
      expect(third.retryAfterSeconds).toBeGreaterThan(0);
    }
    expect(repository.getAll()).toHaveLength(2);
  });

  it('rate limit tinh rieng cho tung IP', async () => {
    const limitedService = new LeadService(
      repository,
      new RateLimiter({ limit: 1, windowMs: 60_000 }),
    );

    const a = await limitedService.submit(
      { ...validSubmission, phone: '0912345671' },
      { clientKey: 'ip-1' },
    );
    const b = await limitedService.submit(
      { ...validSubmission, phone: '0912345672' },
      { clientKey: 'ip-2' },
    );

    expect(a.ok).toBe(true);
    expect(b.ok).toBe(true);
  });

  it('khong nem loi khi repository that bai, tra ve UNKNOWN_ERROR', async () => {
    const failingService = new LeadService(
      {
        create: async () => {
          throw new Error('database khong san sang');
        },
        findById: async () => null,
        list: async () => ({
          items: [],
          total: 0,
          page: 1,
          pageSize: 20,
          totalPages: 1,
        }),
        update: async () => null,
        findRecentByPhone: async () => null,
        countByStatus: async () => ({}),
      },
      new RateLimiter({ limit: 5, windowMs: 60_000 }),
    );

    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    const result = await failingService.submit(validSubmission, {
      clientKey: 'ip-1',
    });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('UNKNOWN_ERROR');

    // Log khong duoc chua du lieu ca nhan cua nguoi dung.
    const loggedText = consoleSpy.mock.calls.flat().join(' ');
    expect(loggedText).not.toContain('Nguyễn Văn An');
    expect(loggedText).not.toContain('0912345678');

    consoleSpy.mockRestore();
  });
});

describe('LeadService.update', () => {
  let repository: InMemoryLeadRepository;
  let service: LeadService;

  beforeEach(() => {
    repository = new InMemoryLeadRepository();
    service = new LeadService(
      repository,
      new RateLimiter({ limit: 100, windowMs: 60_000 }),
    );
  });

  it('cap nhat trang thai va ghi chu cua admin', async () => {
    const created = await service.submit(validSubmission, {
      clientKey: 'ip-1',
    });
    expect(created.ok).toBe(true);
    if (!created.ok) return;

    const result = await service.update({
      id: created.leadId,
      status: 'CONTACTED',
      adminNote: 'Đã gọi lúc 19h, hẹn gọi lại cuối tuần.',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.lead.status).toBe('CONTACTED');
      expect(result.lead.adminNote).toBe(
        'Đã gọi lúc 19h, hẹn gọi lại cuối tuần.',
      );
    }

    const stored = await repository.findById(created.leadId);
    expect(stored?.status).toBe('CONTACTED');
  });

  it('tu choi trang thai khong hop le', async () => {
    const created = await service.submit(validSubmission, {
      clientKey: 'ip-1',
    });
    expect(created.ok).toBe(true);
    if (!created.ok) return;

    const result = await service.update({
      id: created.leadId,
      status: 'KHONG_TON_TAI' as never,
      adminNote: '',
    });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fieldErrors?.status).toBeDefined();
  });

  it('bao loi khi khong tim thay ho so', async () => {
    const result = await service.update({
      id: 'khong-ton-tai',
      status: 'CONTACTED',
      adminNote: '',
    });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.message).toContain('Không tìm thấy');
  });

  it('cat bot ghi chu qua dai', async () => {
    const created = await service.submit(validSubmission, {
      clientKey: 'ip-1',
    });
    expect(created.ok).toBe(true);
    if (!created.ok) return;

    const result = await service.update({
      id: created.leadId,
      status: 'NEW',
      adminNote: 'a'.repeat(5000),
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.lead.adminNote?.length).toBeLessThanOrEqual(2000);
    }
  });
});
