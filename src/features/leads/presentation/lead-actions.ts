'use server';

import { headers } from 'next/headers';
import { leadRateLimiter } from '@/lib/rate-limit/rate-limiter';
import { getClientIp } from '@/lib/utils/request-context';
import { leadRepository } from '../infrastructure/prisma-lead-repository';
import {
  LeadService,
  type LeadSubmitResult,
} from '../application/lead-service';

const leadService = new LeadService(leadRepository, leadRateLimiter);

/**
 * Server Action nhan du lieu tu form dang ky tu van.
 *
 * Next.js tu kiem tra Origin/Host cho Server Action nen day da co lop
 * chong CSRF co ban. Ngoai ra service con: validate lai bang Zod, kiem tra
 * honeypot, rate limit theo IP va chan gui trung.
 */
export async function submitLeadAction(
  _prevState: LeadSubmitResult | null,
  formData: FormData,
): Promise<LeadSubmitResult> {
  const headerList = await headers();
  const clientIp = getClientIp(headerList);

  const raw = {
    fullName: formData.get('fullName'),
    phone: formData.get('phone'),
    interestedCourse: formData.get('interestedCourse'),
    location: formData.get('location') ?? '',
    preferredContactTime: formData.get('preferredContactTime') ?? '',
    note: formData.get('note') ?? '',
    consent: formData.get('consent') === 'on' || formData.get('consent') === 'true',
    website: formData.get('website') ?? '',
    sourcePage: formData.get('sourcePage') ?? '',
    utmSource: readOptional(formData, 'utmSource'),
    utmMedium: readOptional(formData, 'utmMedium'),
    utmCampaign: readOptional(formData, 'utmCampaign'),
    utmContent: readOptional(formData, 'utmContent'),
    utmTerm: readOptional(formData, 'utmTerm'),
  };

  return leadService.submit(raw, { clientKey: `lead:${clientIp}` });
}

function readOptional(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
