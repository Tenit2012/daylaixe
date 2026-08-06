import type { LeadStatus } from './lead-status';

/** Entity Lead o tang domain - doc lap voi Prisma. */
export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  normalizedPhone: string;
  interestedCourse: string;
  location: string | null;
  preferredContactTime: string | null;
  note: string | null;
  sourcePage: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  status: LeadStatus;
  adminNote: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/** Du lieu can thiet de tao mot lead moi. */
export interface CreateLeadData {
  fullName: string;
  phone: string;
  normalizedPhone: string;
  interestedCourse: string;
  location?: string | null;
  preferredContactTime?: string | null;
  note?: string | null;
  sourcePage?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
}

export interface UpdateLeadData {
  status?: LeadStatus;
  adminNote?: string | null;
}

/** Tieu chi loc danh sach lead o trang quan tri. */
export interface LeadListFilters {
  /** Tim theo ho ten hoac so dien thoai. */
  search?: string;
  status?: LeadStatus | 'all';
  course?: string | 'all';
  /** ISO date (yyyy-mm-dd) - tinh tu 00:00 ngay do. */
  dateFrom?: string;
  /** ISO date (yyyy-mm-dd) - tinh den 23:59:59 ngay do. */
  dateTo?: string;
}

export interface LeadListOptions extends LeadListFilters {
  page?: number;
  pageSize?: number;
  sort?: 'newest' | 'oldest';
}

export interface PaginatedLeads {
  items: Lead[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
