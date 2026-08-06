import 'server-only';
import type { Prisma, PrismaClient } from '@prisma/client';
import { prisma as defaultPrisma } from '@/lib/db/prisma';
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
import { isLeadStatus, type LeadStatus } from '../domain/lead-status';

type PrismaLead = Prisma.LeadGetPayload<Record<string, never>>;

/** Chuyen ban ghi Prisma sang entity domain, chuan hoa `status`. */
function toDomain(record: PrismaLead): Lead {
  const status: LeadStatus = isLeadStatus(record.status)
    ? record.status
    : 'NEW';

  return {
    id: record.id,
    fullName: record.fullName,
    phone: record.phone,
    normalizedPhone: record.normalizedPhone,
    interestedCourse: record.interestedCourse,
    location: record.location,
    preferredContactTime: record.preferredContactTime,
    note: record.note,
    sourcePage: record.sourcePage,
    utmSource: record.utmSource,
    utmMedium: record.utmMedium,
    utmCampaign: record.utmCampaign,
    utmContent: record.utmContent,
    utmTerm: record.utmTerm,
    status,
    adminNote: record.adminNote,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

/** Chuoi rong -> null, de database khong luu gia tri rong vo nghia. */
function emptyToNull(value: string | null | undefined): string | null {
  if (value === undefined || value === null) return null;
  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
}

export class PrismaLeadRepository implements LeadRepository {
  constructor(private readonly db: PrismaClient = defaultPrisma) {}

  async create(data: CreateLeadData): Promise<Lead> {
    const record = await this.db.lead.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        normalizedPhone: data.normalizedPhone,
        interestedCourse: data.interestedCourse,
        location: emptyToNull(data.location),
        preferredContactTime: emptyToNull(data.preferredContactTime),
        note: emptyToNull(data.note),
        sourcePage: emptyToNull(data.sourcePage),
        utmSource: emptyToNull(data.utmSource),
        utmMedium: emptyToNull(data.utmMedium),
        utmCampaign: emptyToNull(data.utmCampaign),
        utmContent: emptyToNull(data.utmContent),
        utmTerm: emptyToNull(data.utmTerm),
        status: 'NEW',
      },
    });
    return toDomain(record);
  }

  async findById(id: string): Promise<Lead | null> {
    const record = await this.db.lead.findUnique({ where: { id } });
    return record ? toDomain(record) : null;
  }

  async list(options: LeadListOptions): Promise<PaginatedLeads> {
    const page = Math.max(1, Math.floor(options.page ?? 1));
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(1, Math.floor(options.pageSize ?? DEFAULT_PAGE_SIZE)),
    );

    const where = this.buildWhere(options);

    const [total, records] = await Promise.all([
      this.db.lead.count({ where }),
      this.db.lead.findMany({
        where,
        orderBy: {
          createdAt: options.sort === 'oldest' ? 'asc' : 'desc',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return {
      items: records.map(toDomain),
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    };
  }

  async update(id: string, data: UpdateLeadData): Promise<Lead | null> {
    const existing = await this.db.lead.findUnique({ where: { id } });
    if (!existing) return null;

    const record = await this.db.lead.update({
      where: { id },
      data: {
        ...(data.status !== undefined ? { status: data.status } : {}),
        ...(data.adminNote !== undefined
          ? { adminNote: emptyToNull(data.adminNote) }
          : {}),
      },
    });
    return toDomain(record);
  }

  async findRecentByPhone(
    normalizedPhone: string,
    withinMs: number,
  ): Promise<Lead | null> {
    const since = new Date(Date.now() - withinMs);
    const record = await this.db.lead.findFirst({
      where: {
        normalizedPhone,
        createdAt: { gte: since },
      },
      orderBy: { createdAt: 'desc' },
    });
    return record ? toDomain(record) : null;
  }

  async countByStatus(): Promise<Record<string, number>> {
    const rows = await this.db.lead.groupBy({
      by: ['status'],
      _count: { _all: true },
    });

    const result: Record<string, number> = {};
    for (const row of rows) {
      result[row.status] = row._count._all;
    }
    return result;
  }

  private buildWhere(options: LeadListOptions): Prisma.LeadWhereInput {
    const conditions: Prisma.LeadWhereInput[] = [];

    const search = options.search?.trim();
    if (search) {
      // SQLite khong ho tro `mode: 'insensitive'` cua Prisma; `contains`
      // tren SQLite da khong phan biet hoa thuong voi ky tu ASCII.
      conditions.push({
        OR: [
          { fullName: { contains: search } },
          { phone: { contains: search } },
          { normalizedPhone: { contains: search.replace(/\D/g, '') } },
        ],
      });
    }

    if (options.status && options.status !== 'all') {
      conditions.push({ status: options.status });
    }

    if (options.course && options.course !== 'all') {
      conditions.push({ interestedCourse: options.course });
    }

    if (options.dateFrom) {
      const from = new Date(`${options.dateFrom}T00:00:00.000Z`);
      if (!Number.isNaN(from.getTime())) {
        conditions.push({ createdAt: { gte: from } });
      }
    }

    if (options.dateTo) {
      const to = new Date(`${options.dateTo}T23:59:59.999Z`);
      if (!Number.isNaN(to.getTime())) {
        conditions.push({ createdAt: { lte: to } });
      }
    }

    return conditions.length > 0 ? { AND: conditions } : {};
  }
}

/** Instance mac dinh dung trong ung dung. */
export const leadRepository: LeadRepository = new PrismaLeadRepository();
