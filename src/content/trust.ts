import { siteConfig } from '@/config/site';

/**
 * Bon dieu can chung minh ngay trong man hinh dau tien.
 *
 * Bao cao docs/TRUST_AUDIT_REPORT.md cham "Tinh xac thuc" 4/20 va ket luan
 * nguoi xem KHONG loai tru duoc kha nang day la "co tuyen sinh". Bon muc duoi
 * day tra loi truc tiep bon cau hoi khien ho nghi ngo:
 *   ai day - o dau - bao lau - dang ky voi ai.
 *
 * QUY TAC: chi dua vao day dieu DA XAC NHAN. Khong them so hoc vien, ty le
 * dau, giai thuong hay bat ky con so nao chua co nguon.
 */
export interface TrustBadge {
  /** Ten icon cua lucide-react, map trong component. */
  icon: string;
  label: string;
  detail: string;
}

export const trustBadges: TrustBadge[] = [
  {
    icon: 'BadgeCheck',
    label: siteConfig.teacher.employmentStatus,
    detail:
      'Giảng dạy trực tiếp tại trung tâm, không phải cộng tác viên tuyển sinh.',
  },
  {
    icon: 'CalendarClock',
    label: `${siteConfig.teacher.experienceLabel} kinh nghiệm`,
    detail: `Đã hướng dẫn ${siteConfig.teacher.studentGroups}.`,
  },
  {
    icon: 'Building2',
    label: 'Học tại trung tâm',
    detail: 'Lý thuyết, sa hình và sát hạch đều diễn ra tại trung tâm.',
  },
  {
    icon: 'MessagesSquare',
    label: 'Tư vấn trực tiếp',
    detail: 'Bạn trao đổi thẳng với thầy, không qua tổng đài hay trung gian.',
  },
];
