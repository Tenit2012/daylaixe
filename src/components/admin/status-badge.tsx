import {
  LEAD_STATUS_LABELS,
  LEAD_STATUS_TONES,
  isLeadStatus,
} from '@/features/leads/domain/lead-status';
import { Badge } from '@/components/ui/card';

export function StatusBadge({ status }: { status: string }) {
  if (!isLeadStatus(status)) {
    return <Badge tone="neutral">{status}</Badge>;
  }
  return (
    <Badge tone={LEAD_STATUS_TONES[status]}>{LEAD_STATUS_LABELS[status]}</Badge>
  );
}
