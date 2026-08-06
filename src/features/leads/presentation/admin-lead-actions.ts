'use server';

import { revalidatePath } from 'next/cache';
import { leadRateLimiter } from '@/lib/rate-limit/rate-limiter';
import { getSession } from '@/lib/auth/session';
import { leadRepository } from '../infrastructure/prisma-lead-repository';
import { LeadService } from '../application/lead-service';

const leadService = new LeadService(leadRepository, leadRateLimiter);

export interface UpdateLeadFormState {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
}

/**
 * Cap nhat trang thai va ghi chu cua mot lead.
 * Bat buoc dang nhap - kiem tra session ngay trong action, khong chi
 * dua vao middleware.
 */
export async function updateLeadAction(
  _prevState: UpdateLeadFormState | null,
  formData: FormData,
): Promise<UpdateLeadFormState> {
  const session = await getSession();
  if (!session) {
    return {
      ok: false,
      message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
    };
  }

  const id = formData.get('id');
  const result = await leadService.update({
    id: typeof id === 'string' ? id : '',
    status: formData.get('status') as never,
    adminNote:
      typeof formData.get('adminNote') === 'string'
        ? (formData.get('adminNote') as string)
        : '',
  });

  if (!result.ok) {
    return {
      ok: false,
      message: result.message,
      fieldErrors: result.fieldErrors,
    };
  }

  revalidatePath('/admin/leads');
  revalidatePath(`/admin/leads/${result.lead.id}`);

  return { ok: true, message: 'Đã lưu thay đổi.' };
}
