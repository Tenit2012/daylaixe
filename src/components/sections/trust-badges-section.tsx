import { trustBadges } from '@/content/trust';
import { cn } from '@/lib/utils/cn';
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
/*
  Tailwind chi giu lai cac class xuat hien nguyen ven trong ma nguon, nen do
  tre phai la chuoi tinh - khong duoc ghep kieu `motion-delay-${index}`.
*/
const badgeDelayClass = [
  'motion-delay-1',
  'motion-delay-2',
  'motion-delay-3',
  'motion-delay-4',
] as const;

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

      {/*
        Dai nay dung animation CSS thuan (`hero-in`) chu KHONG dung Reveal.

        Ly do: tren man hinh desktop no nam ngay duoi hero va da lo mot phan
        trong man hinh dau. Co che Reveal lam mo phan tu di roi cho JavaScript
        hydrate xong moi hien lai - voi noi dung o vi tri nay, do la mot khoang
        trong nguoi dung nhin thay duoc. Animation CSS chay ngay tu lan son dau
        nen khong co khoang trong nao.
      */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trustBadges.map((badge, index) => {
          const Icon = getIcon(badge.icon);
          return (
            <li
              key={badge.label}
              className={cn(
                'hero-in flex items-start gap-3 rounded-card border border-line bg-surface p-4',
                badgeDelayClass[Math.min(index, badgeDelayClass.length - 1)],
              )}
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
