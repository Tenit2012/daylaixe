import {
  AlertCircle,
  BadgeCheck,
  BookOpen,
  CalendarClock,
  Car,
  ClipboardCheck,
  Footprints,
  FileText,
  Handshake,
  Lightbulb,
  ListChecks,
  MessageCircle,
  MonitorPlay,
  PhoneCall,
  Receipt,
  Route,
  ShieldCheck,
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
  CalendarClock,
  Car,
  ClipboardCheck,
  FileText,
  Footprints,
  Handshake,
  Lightbulb,
  ListChecks,
  MessageCircle,
  MonitorPlay,
  PhoneCall,
  Receipt,
  Route,
  ShieldCheck,
  UserCheck,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? ShieldCheck;
}
