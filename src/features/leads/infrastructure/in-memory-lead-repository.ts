import {
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  type CreateLeadData,
  type Lead,
  type LeadListOptions,
  type PaginatedLeads,
  type UpdateLeadData,
} from '../domain/lead';
import type { LeadRepository } from '../domain/lead-repository';

/**
 * Repository luu trong bo nho.
 * Dung cho unit/integration test va cho phep chay thu business logic
 * ma khong can database. KHONG dung o production.
 */
export class InMemoryLeadRepository implements LeadRepository {
  private leads: Lead[] = [];
  private sequence = 0;

  constructor(initial: Lead[] = []) {
    this.leads = [...initial];
    this.sequence = initial.length;
  }

  async create(data: CreateLeadData): Promise<Lead> {
    this.sequence += 1;
    const now = new Date();
    const lead: Lead = {
      id: `lead_${this.sequence}`,
      fullName: data.fullName,
      phone: data.phone,
      normalizedPhone: data.normalizedPhone,
      interestedCourse: data.interestedCourse,
      location: data.location ?? null,
      preferredContactTime: data.preferredContactTime ?? null,
      note: data.note ?? null,
      sourcePage: data.sourcePage ?? null,
      utmSource: data.utmSource ?? null,
      utmMedium: data.utmMedium ?? null,
      utmCampaign: data.utmCampaign ?? null,
      utmContent: data.utmContent ?? null,
      utmTerm: data.utmTerm ?? null,
      status: 'NEW',
      adminNote: null,
      createdAt: now,
      updatedAt: now,
    };
    this.leads.push(lead);
    return lead;
  }

  async findById(id: string): Promise<Lead | null> {
    return this.leads.find((lead) => lead.id === id) ?? null;
  }

  async list(options: LeadListOptions): Promise<PaginatedLeads> {
    const page = Math.max(1, Math.floor(options.page ?? 1));
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(1, Math.floor(options.pageSize ?? DEFAULT_PAGE_SIZE)),
    );

    let filtered = [...this.leads];

    const search = options.search?.trim().toLowerCase();
    if (search) {
      const digits = search.replace(/\D/g, '');
      filtered = filtered.filter(
        (lead) =>
          lead.fullName.toLowerCase().includes(search) ||
          lead.phone.includes(search) ||
          (digits.length > 0 && lead.normalizedPhone.includes(digits)),
      );
    }

    if (options.status && options.status !== 'all') {
      filtered = filtered.filter((lead) => lead.status === options.status);
    }

    if (options.course && options.course !== 'all') {
      filtered = filtered.filter(
        (lead) => lead.interestedCourse === options.course,
      );
    }

    if (options.dateFrom) {
      const from = new Date(`${options.dateFrom}T00:00:00.000Z`).getTime();
      if (!Number.isNaN(from)) {
        filtered = filtered.filter((lead) => lead.createdAt.getTime() >= from);
      }
    }

    if (options.dateTo) {
      const to = new Date(`${options.dateTo}T23:59:59.999Z`).getTime();
      if (!Number.isNaN(to)) {
        filtered = filtered.filter((lead) => lead.createdAt.getTime() <= to);
      }
    }

    filtered.sort((a, b) =>
      options.sort === 'oldest'
        ? a.createdAt.getTime() - b.createdAt.getTime()
        : b.createdAt.getTime() - a.createdAt.getTime(),
    );

    const total = filtered.length;
    const start = (page - 1) * pageSize;

    return {
      items: filtered.slice(start, start + pageSize),
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    };
  }

  async update(id: string, data: UpdateLeadData): Promise<Lead | null> {
    const index = this.leads.findIndex((lead) => lead.id === id);
    if (index === -1) return null;

    const existing = this.leads[index];
    if (!existing) return null;

    const updated: Lead = {
      ...existing,
      ...(data.status !== undefined ? { status: data.status } : {}),
      ...(data.adminNote !== undefined
        ? { adminNote: data.adminNote === '' ? null : data.adminNote }
        : {}),
      updatedAt: new Date(),
    };
    this.leads[index] = updated;
    return updated;
  }

  async findRecentByPhone(
    normalizedPhone: string,
    withinMs: number,
  ): Promise<Lead | null> {
    const threshold = Date.now() - withinMs;
    const matches = this.leads
      .filter(
        (lead) =>
          lead.normalizedPhone === normalizedPhone &&
          lead.createdAt.getTime() >= threshold,
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return matches[0] ?? null;
  }

  async countByStatus(): Promise<Record<string, number>> {
    const result: Record<string, number> = {};
    for (const lead of this.leads) {
      result[lead.status] = (result[lead.status] ?? 0) + 1;
    }
    return result;
  }

  /** Tien ich cho test. */
  getAll(): Lead[] {
    return [...this.leads];
  }

  clear(): void {
    this.leads = [];
    this.sequence = 0;
  }
}
