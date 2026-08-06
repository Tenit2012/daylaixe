'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { CheckCircle2, Loader2, Save, TriangleAlert } from 'lucide-react';
import {
  updateLeadAction,
  type UpdateLeadFormState,
} from '@/features/leads/presentation/admin-lead-actions';
import { leadStatusOptions } from '@/features/leads/domain/lead-status';
import { Button } from '@/components/ui/button';
import { inputClasses } from '@/components/forms/form-field';
import { cn } from '@/lib/utils/cn';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="md" disabled={pending} aria-busy={pending}>
      {pending ? (
        <>
          <Loader2 aria-hidden="true" className="h-[1.125rem] w-[1.125rem] animate-spin" />
          Đang lưu...
        </>
      ) : (
        <>
          <Save aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" />
          Lưu thay đổi
        </>
      )}
    </Button>
  );
}

interface LeadUpdateFormProps {
  leadId: string;
  currentStatus: string;
  currentNote: string;
}

export function LeadUpdateForm({
  leadId,
  currentStatus,
  currentNote,
}: LeadUpdateFormProps) {
  const [state, formAction] = useActionState<UpdateLeadFormState | null, FormData>(
    updateLeadAction,
    null,
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={leadId} />

      <div role="status" aria-live="polite">
        {state?.ok ? (
          <div className="flex items-center gap-2.5 rounded-lg border border-success-100 bg-success-50 p-3.5">
            <CheckCircle2
              aria-hidden="true"
              className="h-5 w-5 flex-shrink-0 text-success-600"
            />
            <p className="text-sm font-medium text-success-700">
              {state.message}
            </p>
          </div>
        ) : null}

        {state && !state.ok && state.message ? (
          <div className="flex items-start gap-2.5 rounded-lg border border-danger-500/30 bg-danger-50 p-3.5">
            <TriangleAlert
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-danger-600"
            />
            <p className="text-sm font-medium text-danger-700">
              {state.message}
            </p>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="lead-status" className="text-sm font-semibold text-brand-900">
          Trạng thái xử lý
        </label>
        <select
          id="lead-status"
          name="status"
          defaultValue={currentStatus}
          className={cn(inputClasses)}
        >
          {leadStatusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="lead-admin-note"
          className="text-sm font-semibold text-brand-900"
        >
          Ghi chú của thầy
        </label>
        <p id="lead-admin-note-hint" className="text-xs text-ink-subtle">
          Ghi lại nội dung đã trao đổi để lần liên hệ sau không phải hỏi lại.
        </p>
        <textarea
          id="lead-admin-note"
          name="adminNote"
          rows={5}
          maxLength={2000}
          defaultValue={currentNote}
          aria-describedby="lead-admin-note-hint"
          placeholder="Ví dụ: Đã gọi lúc 19h, học viên muốn học số tự động, hẹn gọi lại cuối tuần."
          className={cn(inputClasses, 'resize-y')}
        />
      </div>

      <SubmitButton />
    </form>
  );
}
