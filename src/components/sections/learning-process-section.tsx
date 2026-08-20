import type { LearningStep } from '@/types/content';
import { learningProcess } from '@/content/learning-process';
import { Section, SectionHeading } from '@/components/ui/section';
import { getIcon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { staggerDelay } from '@/lib/utils/stagger';

interface LearningProcessSectionProps {
  tone?: 'default' | 'muted';
  /**
   * Danh sach buoc. Mac dinh la lo trinh 9 buoc day du.
   * Trang chu truyen vao ban rut gon 7 buoc (`registrationProcess`) de nguoi
   * doc nam duoc duong di trong mot lan luot man hinh.
   */
  steps?: LearningStep[];
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function LearningProcessSection({
  tone = 'default',
  steps = learningProcess,
  id = 'lo-trinh',
  eyebrow = 'Lộ trình',
  title = 'Lộ trình học từ lúc liên hệ đến khi nhận bằng',
  description = 'Bạn luôn biết mình đang ở bước nào và bước tiếp theo cần chuẩn bị gì.',
}: LearningProcessSectionProps) {
  return (
    <Section id={id} tone={tone} ariaLabelledBy={`${id}-heading`}>
      <SectionHeading
        id={`${id}-heading`}
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <ol className="relative mt-10 space-y-5 sm:space-y-0">
        {/*
          Duong ke doc noi cac buoc - chi hien tren man hinh lon.

          Duong nay TU VE TU TREN XUONG khi nguoi doc cuon toi, bang
          `transform: scaleY` voi goc bien dang o canh tren. Day la hinh anh
          truc tiep cua chinh noi dung muc nay: mot lo trinh co diem bat dau va
          tien dan ve phia truoc. Dung scaleY thay vi doi chieu cao that de
          trinh duyet khong phai tinh lai bo cuc o moi khung hinh.
        */}
        <Reveal
          variant="line"
          className="absolute left-[1.375rem] top-4 hidden h-[calc(100%-2rem)] w-0.5 bg-line sm:block"
        />

        {steps.map((step, index) => {
          const Icon = getIcon(step.icon);
          return (
            <Reveal
              as="li"
              key={step.order}
              delay={staggerDelay(index)}
              className="relative sm:pb-6 sm:pl-16"
            >
              {/*
                `journey-dot`: vong tron doi sang mau cam khi dung buoc nay hien
                ra. Cac buoc sang len lan luot theo nhip cuon, tao cam giac di
                qua tung chang thay vi ca lo trinh bat sang cung mot luc.
              */}
              <span className="journey-dot absolute left-0 top-0 hidden h-11 w-11 items-center justify-center rounded-full border-2 border-brand-200 bg-surface text-brand-700 sm:flex">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>

              <div className="card-base p-4 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-800 text-xs font-bold text-white sm:hidden">
                    {step.order}
                  </span>
                  <h3 className="text-base sm:text-lg">
                    <span className="hidden sm:inline">
                      Bước {step.order}.{' '}
                    </span>
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
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
