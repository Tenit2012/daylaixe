'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, Send, TriangleAlert } from 'lucide-react';
import {
  CONTACT_TIME_OPTIONS,
  leadFormSchema,
  type LeadFormInput,
} from '@/features/leads/domain/lead-schema';
import { submitLeadAction } from '@/features/leads/presentation/lead-actions';
import type { LeadSubmitResult } from '@/features/leads/application/lead-service';
import { courseOptions } from '@/content/courses';
import { siteConfig } from '@/config/site';
import { buildPhoneHref, buildZaloHref } from '@/lib/utils/cta-links';
import { formatVietnamesePhone } from '@/lib/validation/phone';
import { extractUtmParams } from '@/lib/utils/request-context';
import { trackEvent } from '@/lib/analytics/track';
import { AnalyticsEvent } from '@/lib/analytics/events';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import {
  FieldWrapper,
  describedBy,
  inputClasses,
  inputErrorClasses,
} from './form-field';

interface LeadFormProps {
  /** Khoa hoc chon san khi form nam trong trang chi tiet khoa hoc. */
  defaultCourse?: string;
  /** Nhan cho nut gui. */
  submitLabel?: string;
  className?: string;
  /** Vi tri form - dung cho analytics. */
  formLocation?: string;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function LeadForm({
  defaultCourse,
  submitLabel = 'Gửi thông tin đăng ký',
  className,
  formLocation = 'page',
}: LeadFormProps) {
  const pathname = usePathname();
  const [state, setState] = useState<SubmitState>('idle');
  const [serverResult, setServerResult] = useState<LeadSubmitResult | null>(
    null,
  );
  const [utm, setUtm] = useState<Record<string, string>>({});
  const hasTrackedOpen = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormInput>({
    resolver: zodResolver(leadFormSchema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      phone: '',
      interestedCourse: defaultCourse ?? '',
      location: '',
      preferredContactTime: '',
      note: '',
      consent: false,
      website: '',
    },
  });

  // Ghi nhan UTM tu URL mot lan khi form duoc mount.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = extractUtmParams(window.location.search);
    setUtm(
      Object.fromEntries(
        Object.entries(params).filter(
          (entry): entry is [string, string] => typeof entry[1] === 'string',
        ),
      ),
    );
  }, []);

  const handleFirstInteraction = () => {
    if (hasTrackedOpen.current) return;
    hasTrackedOpen.current = true;
    trackEvent(AnalyticsEvent.OpenForm, { location: formLocation });
  };

  const onSubmit = handleSubmit(async (values) => {
    setState('submitting');
    setServerResult(null);
    trackEvent(AnalyticsEvent.SubmitForm, { location: formLocation });

    const formData = new FormData();
    formData.set('fullName', values.fullName ?? '');
    formData.set('phone', values.phone ?? '');
    formData.set('interestedCourse', values.interestedCourse ?? '');
    formData.set('location', values.location ?? '');
    formData.set('preferredContactTime', values.preferredContactTime ?? '');
    formData.set('note', values.note ?? '');
    formData.set('consent', values.consent ? 'true' : 'false');
    formData.set('website', values.website ?? '');
    formData.set('sourcePage', pathname);
    for (const [key, value] of Object.entries(utm)) {
      formData.set(key, value);
    }

    try {
      const result = await submitLeadAction(null, formData);
      setServerResult(result);

      if (result.ok) {
        setState('success');
        trackEvent(AnalyticsEvent.SubmitFormSuccess, {
          location: formLocation,
          course: values.interestedCourse,
        });
        reset({
          fullName: '',
          phone: '',
          interestedCourse: defaultCourse ?? '',
          location: '',
          preferredContactTime: '',
          note: '',
          consent: false,
          website: '',
        });
      } else if (result.code === 'SPAM_DETECTED') {
        // Khong tiet lo cho bot rang honeypot da bi phat hien.
        setState('success');
      } else {
        setState('error');
        trackEvent(AnalyticsEvent.SubmitFormError, {
          location: formLocation,
          reason: result.code,
        });
      }
    } catch {
      setState('error');
      setServerResult({
        ok: false,
        code: 'UNKNOWN_ERROR',
        message:
          'Không gửi được thông tin. Bạn kiểm tra lại kết nối mạng rồi thử lại giúp thầy nhé.',
      });
      trackEvent(AnalyticsEvent.SubmitFormError, {
        location: formLocation,
        reason: 'NETWORK',
      });
    }
  });

  // Dua tieu diem den thong bao ket qua de nguoi dung ban phim biet trang thai.
  useEffect(() => {
    if (state === 'success' || state === 'error') {
      statusRef.current?.focus();
    }
  }, [state]);

  const busy = state === 'submitting' || isSubmitting;
  const phoneHref = buildPhoneHref(siteConfig.contact.phone);
  const zaloHref = buildZaloHref(
    siteConfig.contact.zaloUrl,
    siteConfig.contact.phone,
  );

  const serverFieldError = (field: string): string | undefined => {
    if (!serverResult || serverResult.ok) return undefined;
    return serverResult.fieldErrors?.[field]?.[0];
  };

  if (state === 'success') {
    return (
      <div
        className={cn(
          'rounded-card border border-success-100 bg-success-50 p-6 text-center sm:p-8',
          className,
        )}
      >
        <div
          ref={statusRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="focus:outline-none"
        >
          <CheckCircle2
            aria-hidden="true"
            className="mx-auto h-12 w-12 text-success-600"
          />
          <h3 className="mt-4 text-xl text-success-700">
            Đã nhận thông tin của bạn
          </h3>
          <p className="mx-auto mt-2 max-w-md text-[0.9375rem] leading-relaxed text-ink-muted">
            Thầy sẽ liên hệ lại trong thời gian sớm nhất theo khung giờ bạn đã
            chọn. Nếu cần trao đổi ngay, bạn có thể gọi hoặc nhắn Zalo.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          {phoneHref ? (
            <a
              href={phoneHref}
              onClick={() =>
                trackEvent(AnalyticsEvent.ClickPhone, { location: 'form_success' })
              }
              className="inline-flex h-11 items-center justify-center rounded-pill bg-accent-500 px-5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-accent-600"
            >
              Gọi {formatVietnamesePhone(siteConfig.contact.phone)}
            </a>
          ) : null}
          {zaloHref ? (
            <a
              href={zaloHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent(AnalyticsEvent.ClickZalo, { location: 'form_success' })
              }
              className="inline-flex h-11 items-center justify-center rounded-pill bg-success-600 px-5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-success-700"
            >
              Nhắn Zalo cho thầy
            </a>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => {
            setState('idle');
            setServerResult(null);
          }}
          className="mt-5 rounded text-sm font-medium text-brand-700 underline underline-offset-4 hover:text-brand-900"
        >
          Gửi thêm một đăng ký khác
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocus={handleFirstInteraction}
      noValidate
      className={cn(
        'rounded-card border border-line bg-surface p-5 shadow-card sm:p-7',
        className,
      )}
      aria-describedby="lead-form-privacy"
    >
      {/* Vung thong bao trang thai cho tro giup man hinh doc */}
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="focus:outline-none"
      >
        {state === 'error' && serverResult && !serverResult.ok ? (
          <div className="mb-5 flex items-start gap-3 rounded-lg border border-danger-500/30 bg-danger-50 p-4">
            <TriangleAlert
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-danger-600"
            />
            <div>
              <p className="text-sm font-semibold text-danger-700">
                Chưa gửi được thông tin
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                {serverResult.message}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrapper
          id="lead-fullName"
          label="Họ và tên"
          required
          error={errors.fullName?.message ?? serverFieldError('fullName')}
        >
          <input
            {...register('fullName')}
            id="lead-fullName"
            type="text"
            autoComplete="name"
            placeholder="Ví dụ: Nguyễn Văn An"
            aria-required="true"
            aria-invalid={errors.fullName ? 'true' : undefined}
            aria-describedby={describedBy(
              'lead-fullName',
              false,
              Boolean(errors.fullName),
            )}
            className={cn(inputClasses, errors.fullName && inputErrorClasses)}
          />
        </FieldWrapper>

        <FieldWrapper
          id="lead-phone"
          label="Số điện thoại"
          required
          hint="Thầy sẽ gọi hoặc nhắn Zalo vào số này."
          error={errors.phone?.message ?? serverFieldError('phone')}
        >
          <input
            {...register('phone')}
            id="lead-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Ví dụ: 0912 345 678"
            aria-required="true"
            aria-invalid={errors.phone ? 'true' : undefined}
            aria-describedby={describedBy(
              'lead-phone',
              true,
              Boolean(errors.phone),
            )}
            className={cn(inputClasses, errors.phone && inputErrorClasses)}
          />
        </FieldWrapper>

        <FieldWrapper
          id="lead-interestedCourse"
          label="Khóa học quan tâm"
          required
          error={
            errors.interestedCourse?.message ??
            serverFieldError('interestedCourse')
          }
        >
          <select
            {...register('interestedCourse')}
            id="lead-interestedCourse"
            aria-required="true"
            aria-invalid={errors.interestedCourse ? 'true' : undefined}
            className={cn(
              inputClasses,
              errors.interestedCourse && inputErrorClasses,
            )}
          >
            <option value="">-- Chọn khóa học --</option>
            {courseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FieldWrapper>

        <FieldWrapper
          id="lead-location"
          label="Khu vực bạn đang sinh sống"
          hint="Ví dụ: Thủ Đức, Bình Thạnh... Chỉ cần tên quận hoặc phường."
          error={errors.location?.message ?? serverFieldError('location')}
        >
          <input
            {...register('location')}
            id="lead-location"
            type="text"
            placeholder="Ví dụ: TP. Thủ Đức"
            aria-describedby={describedBy(
              'lead-location',
              true,
              Boolean(errors.location),
            )}
            className={cn(inputClasses, errors.location && inputErrorClasses)}
          />
        </FieldWrapper>

        <FieldWrapper
          id="lead-preferredContactTime"
          label="Khung giờ muốn được liên hệ"
          className="sm:col-span-2"
          error={
            errors.preferredContactTime?.message ??
            serverFieldError('preferredContactTime')
          }
        >
          <select
            {...register('preferredContactTime')}
            id="lead-preferredContactTime"
            className={cn(
              inputClasses,
              errors.preferredContactTime && inputErrorClasses,
            )}
          >
            <option value="">-- Chọn khung giờ --</option>
            {CONTACT_TIME_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FieldWrapper>

        <FieldWrapper
          id="lead-note"
          label="Ghi chú thêm"
          className="sm:col-span-2"
          hint="Bạn muốn hỏi gì hoặc có yêu cầu riêng nào về lịch học?"
          error={errors.note?.message ?? serverFieldError('note')}
        >
          <textarea
            {...register('note')}
            id="lead-note"
            rows={4}
            maxLength={1000}
            placeholder="Ví dụ: Em chỉ rảnh buổi tối các ngày trong tuần và cả ngày thứ Bảy."
            aria-describedby={describedBy(
              'lead-note',
              true,
              Boolean(errors.note),
            )}
            className={cn(
              inputClasses,
              'resize-y',
              errors.note && inputErrorClasses,
            )}
          />
        </FieldWrapper>
      </div>

      {/* Honeypot: an voi nguoi dung that, bot thuong tu dien vao */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="lead-website">Để trống ô này</label>
        <input
          {...register('website')}
          id="lead-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-5">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-muted">
          <input
            {...register('consent')}
            type="checkbox"
            aria-required="true"
            aria-invalid={errors.consent ? 'true' : undefined}
            className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-line-strong text-accent-500 focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
          />
          <span>
            Tôi đồng ý cung cấp họ tên và số điện thoại để thầy liên hệ tư vấn
            khóa học.{' '}
            <span className="text-danger-600" aria-hidden="true">
              *
            </span>
          </span>
        </label>
        {errors.consent ? (
          <p role="alert" className="mt-1.5 text-sm font-medium text-danger-600">
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      <p id="lead-form-privacy" className="mt-4 text-xs leading-relaxed text-ink-subtle">
        Thông tin của bạn chỉ dùng để liên hệ tư vấn khóa học, không được chia sẻ
        hay bán cho bên thứ ba. Thầy không thu thập số căn cước, ảnh giấy tờ hay
        hồ sơ sức khỏe qua biểu mẫu này. Xem{' '}
        <a
          href="/chinh-sach-bao-mat"
          className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-900"
        >
          chính sách bảo mật
        </a>
        .
      </p>

      <Button
        type="submit"
        size="lg"
        disabled={busy}
        className="mt-5 w-full"
        aria-busy={busy}
      >
        {busy ? (
          <>
            <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
            Đang gửi...
          </>
        ) : (
          <>
            <Send aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" />
            {submitLabel}
          </>
        )}
      </Button>
    </form>
  );
}
