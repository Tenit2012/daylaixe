import type { AnalyticsEventName, CtaLocationName } from './events';

/**
 * Sinh cac thuoc tinh `data-track-*` cho mot phan tu CTA.
 *
 * MUC DICH: dinh danh on dinh cho tung CTA, doc duoc tu ca ma nguon lan cong
 * cu ben ngoai. Truoc day muon biet "nut nao vua duoc bam" thi chi con cach
 * doi chieu bang CHU tren nut - ma chu tren nut co the doi bat cu luc nao vi
 * ly do bien tap, va co nhieu nut trung chu ("Lien he tu van" xuat hien o
 * bay cho khac nhau). Thuoc tinh nay khong doi theo noi dung hien thi.
 *
 * QUAN TRONG - DUNG TAO TRIGGER "CLICK" TRONG GTM DUA TREN CAC THUOC TINH
 * NAY:
 * Ma nguon DA day su kien vao `dataLayer` ngay trong \`onClick\` cua tung nut.
 * Neu trong GTM lai tao them mot Trigger kieu "Click - All Elements" bat vao
 * \`data-track-event\`, thi moi lan bam se sinh HAI su kien cho cung mot hanh
 * dong. Trong GTM hay dung Trigger kieu "Custom Event" khop voi ten su kien
 * - xem docs/analytics-tracking.md.
 *
 * Cac thuoc tinh nay ton tai de: kiem thu thu cong, kiem tra nhanh bang
 * DevTools, va lam Data Layer/Element Variable khi can. Chung khong tu gui
 * du lieu di dau ca.
 */
export function trackAttributes(
  event: AnalyticsEventName,
  location: CtaLocationName,
  /** Dinh danh noi dung, vi du slug khoa hoc. KHONG BAO GIO la du lieu ca nhan. */
  target?: string,
): Record<string, string> {
  const attributes: Record<string, string> = {
    'data-track-event': event,
    'data-track-location': location,
  };

  if (target) attributes['data-track-target'] = target;

  return attributes;
}
