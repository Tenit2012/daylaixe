import type {
  CreateLeadData,
  Lead,
  LeadListOptions,
  PaginatedLeads,
  UpdateLeadData,
} from './lead';

/**
 * Hop dong truy cap du lieu Lead.
 *
 * Tang application chi phu thuoc vao interface nay, khong biet Prisma.
 * Nho vay co the thay bang implementation trong bo nho khi viet test,
 * hoac doi sang PostgreSQL/Supabase ma khong sua business logic.
 */
export interface LeadRepository {
  create(data: CreateLeadData): Promise<Lead>;

  findById(id: string): Promise<Lead | null>;

  list(options: LeadListOptions): Promise<PaginatedLeads>;

  update(id: string, data: UpdateLeadData): Promise<Lead | null>;

  /**
   * Tim lead trung so dien thoai duoc tao trong `withinMs` mili giay gan day.
   * Dung de chan viec gui trung form nhieu lan lien tiep.
   */
  findRecentByPhone(
    normalizedPhone: string,
    withinMs: number,
  ): Promise<Lead | null>;

  /** Thong ke so luong theo trang thai - hien thi o dau trang danh sach. */
  countByStatus(): Promise<Record<string, number>>;
}
