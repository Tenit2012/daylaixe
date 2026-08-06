'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Loader2, LogIn, TriangleAlert } from 'lucide-react';
import {
  loginAction,
  type LoginFormState,
} from '@/features/auth/presentation/auth-actions';
import { Button } from '@/components/ui/button';
import { inputClasses } from '@/components/forms/form-field';
import { cn } from '@/lib/utils/cn';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      aria-busy={pending}
      className="mt-2 w-full"
    >
      {pending ? (
        <>
          <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
          Đang đăng nhập...
        </>
      ) : (
        <>
          <LogIn aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" />
          Đăng nhập
        </>
      )}
    </Button>
  );
}

interface LoginFormProps {
  csrfToken: string;
  next: string;
}

export function LoginForm({ csrfToken, next }: LoginFormProps) {
  const [state, formAction] = useActionState<LoginFormState | null, FormData>(
    loginAction,
    null,
  );

  const emailError = state?.fieldErrors?.email?.[0];
  const passwordError = state?.fieldErrors?.password?.[0];

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <input type="hidden" name="next" value={next} />

      <div role="status" aria-live="polite">
        {state && !state.ok && state.message ? (
          <div className="flex items-start gap-3 rounded-lg border border-danger-500/30 bg-danger-50 p-4">
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
        <label htmlFor="admin-email" className="text-sm font-semibold text-brand-900">
          Email
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          aria-required="true"
          aria-invalid={emailError ? 'true' : undefined}
          aria-describedby={emailError ? 'admin-email-error' : undefined}
          className={cn(inputClasses)}
        />
        {emailError ? (
          <p id="admin-email-error" role="alert" className="text-sm text-danger-600">
            {emailError}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="admin-password"
          className="text-sm font-semibold text-brand-900"
        >
          Mật khẩu
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-required="true"
          aria-invalid={passwordError ? 'true' : undefined}
          aria-describedby={passwordError ? 'admin-password-error' : undefined}
          className={cn(inputClasses)}
        />
        {passwordError ? (
          <p
            id="admin-password-error"
            role="alert"
            className="text-sm text-danger-600"
          >
            {passwordError}
          </p>
        ) : null}
      </div>

      <SubmitButton />
    </form>
  );
}
