import {
  AlertCircle,
  BadgeCheck,
  BookOpen,
  Building2,
  CalendarClock,
  Car,
  ClipboardCheck,
  Footprints,
  FileText,
  GraduationCap,
  Handshake,
  /*
    Doi ten khi import: `Infinity` la mot binding toan cuc cua JavaScript.
    Import thang se che mat no trong pham vi file - khong gay loi o day nhung
    la mot cai bay im lang cho bat ky ai them code vao file sau nay.
  */
  Infinity as InfinityIcon,
  Lightbulb,
  ListChecks,
  MapPin,
  MessageCircle,
  MessagesSquare,
  MonitorPlay,
  PhoneCall,
  Receipt,
  Route,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  type LucideIcon,
} from 'lucide-react';

/**
 * Anh xa ten icon (khai bao dang chuoi trong content layer) sang component.
 * Nho vay file content khong phai import truc tiep tu lucide-react.
 */
const iconMap: Record<string, LucideIcon> = {
  AlertCircle,
  BadgeCheck,
  BookOpen,
  Building2,
  CalendarClock,
  Car,
  ClipboardCheck,
  FileText,
  Footprints,
  GraduationCap,
  Handshake,
  Infinity: InfinityIcon,
  Lightbulb,
  ListChecks,
  MapPin,
  MessageCircle,
  MessagesSquare,
  MonitorPlay,
  PhoneCall,
  Receipt,
  Route,
  ShieldCheck,
  Stethoscope,
  UserCheck,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? ShieldCheck;
}
