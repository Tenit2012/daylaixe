import Image from 'next/image';
import Link from 'next/link';
import { Quote } from 'lucide-react';
import { isPlaceholderValue, siteConfig } from '@/config/site';
import { Section } from '@/components/ui/section';
import { buttonClasses } from '@/components/ui/button';

export function AboutTeacherSection() {
  const { teacher } = siteConfig;
  const experienceText = isPlaceholderValue(teacher.yearsOfExperience)
    ? 'Số năm kinh nghiệm sẽ được cập nhật'
    : `${teacher.yearsOfExperience} kinh nghiệm hướng dẫn học viên`;
  const centerText = isPlaceholderValue(teacher.centerName)
    ? 'Tên trung tâm sẽ được cập nhật'
    : teacher.centerName;

  return (
    <Section id="gioi-thieu" ariaLabelledBy="gioi-thieu-heading">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14">
        <div className="overflow-hidden rounded-card border border-line bg-surface-muted shadow-card">
          <Image
            src="/images/about/chan-dung-thay.svg"
            alt="Vị trí đặt ảnh chân dung của thầy dạy lái xe"
            width={600}
            height={750}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="h-auto w-full"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-600">
            Về thầy
          </p>
          <h2 id="gioi-thieu-heading" className="mt-3 text-2xl sm:text-3xl">
            {isPlaceholderValue(teacher.name)
              ? 'Người trực tiếp hướng dẫn bạn'
              : `Thầy ${teacher.name}`}
          </h2>
          <p className="mt-1.5 text-[0.9375rem] font-medium text-brand-600">
            {teacher.title}
          </p>

          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-line bg-surface-muted p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                Kinh nghiệm
              </dt>
              <dd className="mt-1 text-[0.9375rem] font-medium text-brand-900">
                {experienceText}
              </dd>
            </div>
            <div className="rounded-lg border border-line bg-surface-muted p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                Nơi giảng dạy
              </dt>
              <dd className="mt-1 text-[0.9375rem] font-medium text-brand-900">
                {centerText}
              </dd>
            </div>
          </dl>

          <div className="mt-6 space-y-4 text-[0.9375rem] leading-relaxed text-ink-muted">
            <p>
              <strong className="font-semibold text-brand-900">
                Phong cách hướng dẫn:
              </strong>{' '}
              chia mỗi thao tác thành các bước nhỏ, giải thích bằng ngôn ngữ đời
              thường và cho học viên lặp lại đến khi thành phản xạ. Tôi không hối
              thúc, cũng không bỏ qua lỗi cho xong buổi.
            </p>
            <p>
              <strong className="font-semibold text-brand-900">
                Triết lý đào tạo:
              </strong>{' '}
              học viên cần hiểu vì sao mình sai chứ không chỉ biết phải làm gì.
              Hiểu được nguyên nhân thì ra đường thật mới tự xử lý được tình
              huống mới.
            </p>
          </div>

          <blockquote className="mt-6 rounded-card border-l-4 border-accent-500 bg-accent-50 p-5">
            <Quote aria-hidden="true" className="h-6 w-6 text-accent-500" />
            <p className="mt-2 text-[0.9375rem] font-medium italic leading-relaxed text-brand-900">
              {siteConfig.messaging.philosophy}
            </p>
          </blockquote>

          <div className="mt-6">
            <Link href="/gioi-thieu" className={buttonClasses('outline', 'md')}>
              Xem chi tiết về thầy
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
