import { learningProcess } from '@/content/learning-process';
import { Section, SectionHeading } from '@/components/ui/section';
import { getIcon } from '@/components/ui/icon';

interface LearningProcessSectionProps {
  tone?: 'default' | 'muted';
}

export function LearningProcessSection({
  tone = 'default',
}: LearningProcessSectionProps) {
  return (
    <Section id="lo-trinh" tone={tone} ariaLabelledBy="lo-trinh-heading">
      <SectionHeading
        id="lo-trinh-heading"
        eyebrow="Lộ trình"
        title="Lộ trình học từ lúc liên hệ đến khi nhận bằng"
        description="Bạn luôn biết mình đang ở bước nào và bước tiếp theo cần chuẩn bị gì."
      />

      <ol className="relative mt-10 space-y-5 sm:space-y-0">
        {/* Duong ke doc noi cac buoc - chi hien tren man hinh lon */}
        <div
          aria-hidden="true"
          className="absolute left-[1.375rem] top-4 hidden h-[calc(100%-2rem)] w-0.5 bg-line sm:block"
        />

        {learningProcess.map((step) => {
          const Icon = getIcon(step.icon);
          return (
            <li key={step.order} className="relative sm:pb-6 sm:pl-16">
              <span className="absolute left-0 top-0 hidden h-11 w-11 items-center justify-center rounded-full border-2 border-brand-200 bg-surface text-brand-700 sm:flex">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>

              <div className="card-base p-4 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-800 text-xs font-bold text-white sm:hidden">
                    {step.order}
                  </span>
                  <h3 className="text-base sm:text-lg">
                    <span className="hidden sm:inline">Bước {step.order}. </span>
                    {step.title}
                  </h3>
                  {step.duration ? (
                    <span className="rounded-pill bg-surface-sunken px-2.5 py-0.5 text-xs font-medium text-ink-subtle">
                      {step.duration}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
