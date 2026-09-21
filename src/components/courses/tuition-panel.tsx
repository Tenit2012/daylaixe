import { AlertTriangle, Check } from 'lucide-react';
import type { CourseTuition } from '@/types/content';
import { cn } from '@/lib/utils/cn';

/**
 * Cac cum duoc lam noi bat trong danh sach "Da bao gom".
 *
 * Ba diem nay la thu khien nguoi doc hieu 18,9tr / 18,5tr thuc su mua duoc
 * gi, nen chung phai doc ra duoc TRONG MOT LUOT LIEC chu khong chim giua
 * danh sach. Cach lam: to dam dung doan chu do trong cau, giu nguyen phan
 * con lai.
 *
 * VI SAO KHONG TACH THANH MOT MANG "highlights" RIENG trong `courses.ts`:
 * lam vay se phai viet cung mot loi hua o hai cho (mot ban day du trong
 * `included`, mot ban rut gon trong `highlights`), va hai ban do se troi
 * khoi nhau ngay lan dau ai do sua chinh sach. O day chi to dam lai chinh
 * chuoi da co - khong the lech.
 *
 * Cum phai khop CHINH XAC voi chuoi trong `packageIncludedHangB`. Neu doi
 * chu ben do ma quen sua o day thi phan to dam lang le bien mat; do la mat
 * nhan manh, khong phai sai noi dung, nen khong lam vo giao dien.
 */
const emphasisPhrases = [
  '1 kèm 1',
  'không giới hạn giờ',
  'Lệ phí thi tốt nghiệp, lệ phí sát hạch và lệ phí cấp giấy phép lái xe',
];

/** Tach mot dong thanh cac manh, danh dau manh nao can to dam. */
function emphasize(line: string) {
  const match = emphasisPhrases.find((phrase) => line.includes(phrase));
  if (!match) return <>{line}</>;

  const at = line.indexOf(match);
  return (
    <>
      {line.slice(0, at)}
      <strong className="font-semibold text-brand-900">{match}</strong>
      {line.slice(at + match.length)}
    </>
  );
}

interface TuitionPanelProps {
  tuition: CourseTuition;
  /** Ten khoa hien o dau the. Bo trong khi the da nam duoi tieu de khoa. */
  courseName?: string;
  /** Cap the tieu de cho hai muc "Da bao gom" / "Co the phat sinh". */
  headingLevel?: 3 | 4;
  /** CTA dat cuoi the. Trang chi tiet khoa da co CTA rieng nen de trong. */
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Khoi hoc phi dung chung cho trang chi tiet khoa hoc va trang
 * /hoc-phi-lo-trinh.
 *
 * Gop lam mot component vi truoc day hai trang tu ve lay khoi nay: trang
 * hoc phi chi in con so trong mot o cua bang, con trang khoa hoc in day du
 * hai danh sach. Nguoi so sanh gia o trang hoc phi vi the khong he thay
 * "da bao gom nhung gi" - dung cho quyet dinh duoc dat ra.
 */
export function TuitionPanel({
  tuition,
  courseName,
  headingLevel = 4,
  footer,
  className,
}: TuitionPanelProps) {
  const Heading = `h${headingLevel}` as 'h3' | 'h4';
  const NameHeading = `h${headingLevel === 4 ? 3 : 2}` as 'h2' | 'h3';

  return (
    <div className={cn('flex h-full flex-col', className)}>
      {courseName ? (
        <NameHeading className="text-lg uppercase tracking-wide text-ink-muted sm:text-xl">
          {courseName}
        </NameHeading>
      ) : null}

      <p
        className={cn(
          'text-3xl font-bold leading-tight text-brand-900 sm:text-4xl',
          courseName && 'mt-2',
        )}
      >
        {tuition.displayValue}
      </p>
      {tuition.headline ? (
        <p className="mt-1 text-sm text-ink-subtle">{tuition.headline}</p>
      ) : null}

      <div className="mt-5 space-y-4">
        <div>
          <Heading className="text-base text-success-700">Đã bao gồm</Heading>
          <ul className="mt-2.5 space-y-2 text-sm leading-relaxed text-ink-muted">
            {tuition.included.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-success-600"
                />
                <span>{emphasize(item)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Heading className="text-base text-accent-700">
            Có thể phát sinh
          </Heading>
          <ul className="mt-2.5 space-y-2 text-sm leading-relaxed text-ink-muted">
            {tuition.mayIncurAdditional.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <AlertTriangle
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-600"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {tuition.note ? (
        <p className="mt-4 text-sm leading-relaxed text-ink-subtle">
          {tuition.note}
        </p>
      ) : null}

      {/* `mt-auto` de CTA cua hai the canh nhau thang hang du hai danh sach
          quyen loi dai ngan khac nhau. */}
      {footer ? <div className="mt-auto pt-5">{footer}</div> : null}
    </div>
  );
}
