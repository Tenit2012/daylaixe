import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryLeadRepository } from '@/features/leads/infrastructure/in-memory-lead-repository';
import type { CreateLeadData } from '@/features/leads/domain/lead';

function makeLeadData(overrides: Partial<CreateLeadData> = {}): CreateLeadData {
  return {
    fullName: 'Nguyễn Văn An',
    phone: '0912345678',
    normalizedPhone: '0912345678',
    interestedCourse: 'hang-b-so-tu-dong',
    location: 'TP. Thủ Đức',
    preferredContactTime: 'toi',
    note: 'Ghi chú thử',
    sourcePage: '/',
    ...overrides,
  };
}

describe('InMemoryLeadRepository', () => {
  let repository: InMemoryLeadRepository;

  beforeEach(() => {
    repository = new InMemoryLeadRepository();
  });

  it('tao lead voi trang thai mac dinh NEW', async () => {
    const lead = await repository.create(makeLeadData());
    expect(lead.id).toBeTruthy();
    expect(lead.status).toBe('NEW');
    expect(lead.adminNote).toBeNull();
  });

  it('tim duoc lead theo id', async () => {
    const created = await repository.create(makeLeadData());
    const found = await repository.findById(created.id);
    expect(found?.id).toBe(created.id);
  });

  it('tra ve null khi id khong ton tai', async () => {
    expect(await repository.findById('khong-ton-tai')).toBeNull();
  });

  it('cap nhat trang thai va ghi chu', async () => {
    const created = await repository.create(makeLeadData());
    const updated = await repository.update(created.id, {
      status: 'CONTACTED',
      adminNote: 'Đã gọi lúc 19h.',
    });

    expect(updated?.status).toBe('CONTACTED');
    expect(updated?.adminNote).toBe('Đã gọi lúc 19h.');
  });

  it('tra ve null khi cap nhat lead khong ton tai', async () => {
    expect(await repository.update('khong-ton-tai', { status: 'NEW' })).toBeNull();
  });

  it('tim duoc lead trung so dien thoai trong cua so thoi gian', async () => {
    await repository.create(makeLeadData());
    const recent = await repository.findRecentByPhone('0912345678', 60_000);
    expect(recent).not.toBeNull();
  });

  it('khong coi la trung khi so dien thoai khac', async () => {
    await repository.create(makeLeadData());
    expect(await repository.findRecentByPhone('0987654321', 60_000)).toBeNull();
  });

  it('khong coi la trung khi ban ghi da qua cua so thoi gian', async () => {
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date('2026-01-01T10:00:00Z'));
      await repository.create(makeLeadData());

      // Sau 10 phut, cua so chong trung 5 phut khong con hieu luc.
      vi.setSystemTime(new Date('2026-01-01T10:10:00Z'));
      expect(
        await repository.findRecentByPhone('0912345678', 5 * 60 * 1000),
      ).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });

  describe('list', () => {
    beforeEach(async () => {
      await repository.create(
        makeLeadData({ fullName: 'Nguyễn Văn An', normalizedPhone: '0912345678' }),
      );
      await repository.create(
        makeLeadData({
          fullName: 'Trần Thị Bình',
          phone: '0987654321',
          normalizedPhone: '0987654321',
          interestedCourse: 'bo-tuc-tay-lai',
        }),
      );
      await repository.create(
        makeLeadData({
          fullName: 'Lê Minh Cường',
          phone: '0977123456',
          normalizedPhone: '0977123456',
          interestedCourse: 'luyen-sa-hinh',
        }),
      );
    });

    it('tra ve toan bo khi khong loc', async () => {
      const result = await repository.list({});
      expect(result.total).toBe(3);
      expect(result.items).toHaveLength(3);
      expect(result.page).toBe(1);
    });

    it('loc theo ten (khong phan biet hoa thuong)', async () => {
      const result = await repository.list({ search: 'trần thị' });
      expect(result.total).toBe(1);
      expect(result.items[0]?.fullName).toBe('Trần Thị Bình');
    });

    it('loc theo so dien thoai', async () => {
      const result = await repository.list({ search: '0977' });
      expect(result.total).toBe(1);
      expect(result.items[0]?.fullName).toBe('Lê Minh Cường');
    });

    it('loc theo khoa hoc', async () => {
      const result = await repository.list({ course: 'bo-tuc-tay-lai' });
      expect(result.total).toBe(1);
    });

    it('loc theo trang thai', async () => {
      const all = await repository.list({});
      const first = all.items[0];
      expect(first).toBeDefined();
      if (!first) return;

      await repository.update(first.id, { status: 'ENROLLED' });
      const result = await repository.list({ status: 'ENROLLED' });
      expect(result.total).toBe(1);
    });

    it('phan trang dung', async () => {
      const page1 = await repository.list({ page: 1, pageSize: 2 });
      expect(page1.items).toHaveLength(2);
      expect(page1.totalPages).toBe(2);

      const page2 = await repository.list({ page: 2, pageSize: 2 });
      expect(page2.items).toHaveLength(1);
    });

    it('sap xep moi nhat truoc theo mac dinh', async () => {
      const result = await repository.list({});
      const timestamps = result.items.map((lead) => lead.createdAt.getTime());
      const sorted = [...timestamps].sort((a, b) => b - a);
      expect(timestamps).toEqual(sorted);
    });

    it('gioi han pageSize toi da', async () => {
      const result = await repository.list({ pageSize: 9999 });
      expect(result.pageSize).toBeLessThanOrEqual(100);
    });
  });

  it('dem duoc so luong theo trang thai', async () => {
    const a = await repository.create(makeLeadData());
    await repository.create(makeLeadData({ normalizedPhone: '0987654321' }));
    await repository.update(a.id, { status: 'ENROLLED' });

    const counts = await repository.countByStatus();
    expect(counts.NEW).toBe(1);
    expect(counts.ENROLLED).toBe(1);
  });
});
