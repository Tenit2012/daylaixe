import { trustBadges } from '@/content/trust';
import { getIcon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';

/**
 * Dai bang chung dat NGAY duoi hero.
 *
 * Muc dich: tra loi bon cau hoi "ai day / o dau / bao lau / dang ky voi ai"
 * truoc khi nguoi doc kip cuon xuong. Bao cao TRUST_AUDIT cho thay nguoi xem
 * roi trang o dung doan nay vi khong tra loi duoc may cau do.
 *
 * Co y KHONG dung the <h2>: day la dai thong tin bo tro cho hero chu khong
 * phai mot muc noi dung rieng, them tieu de se lam loang cau truc heading.
 */
export function TrustBadgesSection() {
  return (
    <Section
      tone="muted"
      className="!py-8 lg:!py-10"
      ariaLabelledBy="trust-badges-label"
    >
      <h2 id="trust-badges-label" className="sr-only">
        Vì sao có thể tin
      </h2>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trustBadges.map((badge) => {
          const Icon = getIcon(badge.icon);
          return (
            <li
              key={badge.label}
              className="flex items-start gap-3 rounded-card border border-line bg-surface p-4"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-success-50 text-success-600">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[0.9375rem] font-semibold text-brand-900">
                  {badge.label}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                  {badge.detail}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
