import { whyChooseReasons } from '@/content/learning-process';
import { Section, SectionHeading } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { getIcon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { staggerDelay } from '@/lib/utils/stagger';

export function WhyChooseSection() {
  return (
    <Section id="vi-sao" tone="muted" ariaLabelledBy="vi-sao-heading">
      <SectionHeading
        id="vi-sao-heading"
        eyebrow="Vì sao chọn thầy"
        title="Vì sao nên học cùng thầy?"
        description="Không phải vì lời hứa, mà vì cách đồng hành trong suốt quá trình học của bạn."
      />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseReasons.map((reason, index) => {
          const Icon = getIcon(reason.icon);
          return (
            <Reveal
              as="li"
              key={reason.title}
              delay={staggerDelay(index)}
              className="h-full"
            >
              <Card className="h-full" interactive>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon
                  aria-hidden="true"
                  className="h-[1.375rem] w-[1.375rem]"
                />
              </span>
              <h3 className="mt-4 text-lg">{reason.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {reason.description}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
