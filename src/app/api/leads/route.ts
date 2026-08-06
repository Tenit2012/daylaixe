import { NextResponse, type NextRequest } from 'next/server';
import { leadRateLimiter } from '@/lib/rate-limit/rate-limiter';
import { getClientIp } from '@/lib/utils/request-context';
import { leadRepository } from '@/features/leads/infrastructure/prisma-lead-repository';
import { LeadService } from '@/features/leads/application/lead-service';

/**
 * API nhan dang ky tu van.
 *
 * Duong dan nay ton tai song song voi Server Action de:
 *  - Phuc vu tich hop tu ben ngoai (vi du landing page rieng).
 *  - Kiem thu tu dong khong phu thuoc vao co che Server Action.
 *
 * Bao mat: validate lai bang Zod, honeypot, rate limit theo IP, chan gui
 * trung. Phan hoi khong bao gio chua stack trace.
 */

const leadService = new LeadService(leadRepository, leadRateLimiter);

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request.headers);

  let payload: unknown;
  try {
    const contentType = request.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      payload = await request.json();
    } else {
      const formData = await request.formData();
      payload = Object.fromEntries(formData.entries());
    }
  } catch {
    return NextResponse.json(
      { ok: false, code: 'VALIDATION_ERROR', message: 'Dữ liệu gửi lên không hợp lệ.' },
      { status: 400 },
    );
  }

  // Chuan hoa `consent` ve boolean vi form-data luon gui chuoi.
  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;
    if (typeof record.consent === 'string') {
      record.consent = record.consent === 'true' || record.consent === 'on';
    }
  }

  const result = await leadService.submit(payload, {
    clientKey: `lead:${clientIp}`,
  });

  if (result.ok) {
    return NextResponse.json(
      { ok: true, message: result.message },
      { status: 201 },
    );
  }

  // Honeypot: tra ve 200 de bot khong biet minh bi phat hien.
  if (result.code === 'SPAM_DETECTED') {
    return NextResponse.json({ ok: true, message: result.message });
  }

  const statusByCode: Record<string, number> = {
    VALIDATION_ERROR: 422,
    RATE_LIMITED: 429,
    DUPLICATE: 409,
    UNKNOWN_ERROR: 500,
  };

  const response = NextResponse.json(
    {
      ok: false,
      code: result.code,
      message: result.message,
      fieldErrors: result.fieldErrors,
    },
    { status: statusByCode[result.code] ?? 400 },
  );

  if (result.code === 'RATE_LIMITED' && result.retryAfterSeconds) {
    response.headers.set('Retry-After', String(result.retryAfterSeconds));
  }

  return response;
}

/** Danh sach lead KHONG bao gio duoc doc cong khai. */
export function GET() {
  return NextResponse.json(
    { ok: false, message: 'Không hỗ trợ.' },
    { status: 405, headers: { Allow: 'POST' } },
  );
}
