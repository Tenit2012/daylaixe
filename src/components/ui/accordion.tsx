'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Chi so muc mo san khi tai trang. `-1` la dong het. */
  defaultOpenIndex?: number;
  className?: string;
}

/**
 * Accordion dung cho FAQ.
 * Dieu huong ban phim hoat dong nho dung the <button> that,
 * kem aria-expanded / aria-controls de tro giup man hinh doc dung.
 */
export function Accordion({
  items,
  defaultOpenIndex = 0,
  className,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex);
  const baseId = useId();

  return (
    <div
      className={cn(
        'divide-y divide-line rounded-card border border-line bg-surface',
        className,
      )}
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-brand-900 transition-colors hover:bg-surface-muted sm:px-6 sm:py-5"
              >
                <span className="flex-1">{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
            </h3>
            {/*
              Truoc day panel dung thuoc tinh `hidden`, khong the tao chuyen
              dong duoc: `hidden` bat/tat tuc thi, khong co trang thai trung
              gian de chuyen doi.

              Ban moi dung grid-template-rows 0fr -> 1fr. Vi sao khong dung
              max-height: max-height buoc phai doan truoc mot con so lon hon
              moi cau tra loi, khien cau ngan mo xong tu lau ma hieu ung van
              con chay, con cau dai thi bi cat. 0fr -> 1fr cho dung chieu cao
              that cua tung cau.

              Giu nguyen kha nang tiep can: `visibility: hidden` van loai noi
              dung dang dong khoi cay tro nang (trinh doc man hinh khong doc
              phai), chi khac la no doi den cuoi hieu ung moi ap dung - xem
              .faq-panel trong globals.css. aria-expanded/aria-controls tren
              nut khong doi.
            */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              data-open={isOpen}
              className="faq-panel"
            >
              <div className="faq-panel-inner">
                <div className="px-5 pb-5 text-[0.9375rem] leading-relaxed text-ink-muted sm:px-6 sm:pb-6">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
