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
