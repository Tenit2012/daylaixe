import type { Faq } from '@/types/content';
import { generalFaqs } from '@/content/faqs';
import { Section, SectionHeading } from '@/components/ui/section';
import { Accordion } from '@/components/ui/accordion';

interface FaqSectionProps {
  faqs?: Faq[];
  title?: string;
  description?: string;
  tone?: 'default' | 'muted';
  id?: string;
}

export function FaqSection({
  faqs = generalFaqs,
  title = 'Câu hỏi thường gặp',
  description = 'Những điều học viên hay hỏi trước khi đăng ký. Chưa thấy câu trả lời bạn cần thì cứ nhắn cho thầy.',
  tone = 'muted',
  id = 'cau-hoi',
}: FaqSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <Section id={id} tone={tone} ariaLabelledBy={`${id}-heading`}>
      <SectionHeading
        id={`${id}-heading`}
        eyebrow="Giải đáp"
        title={title}
        description={description}
      />
      <div className="mx-auto mt-10 max-w-3xl">
        <Accordion
          items={faqs.map((faq) => ({
            question: faq.question,
            answer: faq.answer,
          }))}
        />
      </div>
    </Section>
  );
}
