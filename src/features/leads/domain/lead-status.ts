/**
 * Trang thai xu ly cua mot hoc vien tiem nang.
 *
 * Luu duoi dang String trong database (SQLite khong ho tro native enum),
 * nen day la nguon rang buoc gia tri duy nhat cua ung dung.
 */
export const LEAD_STATUSES = [
  'NEW',
  'CONTACTED',
  'CONSIDERING',
  'ENROLLED',
  'NOT_INTERESTED',
  'INVALID',
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: 'Mới',
  CONTACTED: 'Đã liên hệ',
  CONSIDERING: 'Đang cân nhắc',
  ENROLLED: 'Đã đăng ký học',
  NOT_INTERESTED: 'Không có nhu cầu',
  INVALID: 'Thông tin không hợp lệ',
};

/** Mau hien thi badge trang thai o trang admin. */
export const LEAD_STATUS_TONES: Record<
  LeadStatus,
  'neutral' | 'info' | 'warning' | 'success' | 'danger'
> = {
  NEW: 'info',
  CONTACTED: 'neutral',
  CONSIDERING: 'warning',
  ENROLLED: 'success',
  NOT_INTERESTED: 'neutral',
  INVALID: 'danger',
};

export function isLeadStatus(value: unknown): value is LeadStatus {
  return (
    typeof value === 'string' &&
    (LEAD_STATUSES as readonly string[]).includes(value)
  );
}

export function getLeadStatusLabel(value: string): string {
  return isLeadStatus(value) ? LEAD_STATUS_LABELS[value] : value;
}

export const leadStatusOptions: Array<{ value: LeadStatus; label: string }> =
  LEAD_STATUSES.map((status) => ({
    value: status,
    label: LEAD_STATUS_LABELS[status],
  }));
