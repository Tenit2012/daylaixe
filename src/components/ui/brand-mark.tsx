import { cn } from '@/lib/utils/cn';

/**
 * Bieu tuong thuong hieu, dung CHUNG cho header, footer va favicon.
 *
 * VI SAO CO FILE NAY: truoc day header va footer dung icon `Car` cua thu vien
 * lucide, con `public/icon.svg` lai la mot hinh xe tu ve khac han. Nghia la
 * tab trinh duyet va header hien HAI mark khac nhau - nguoi dung mo nhieu tab
 * khong nhan ra dau la trang cua thay. Hinh o day duoc ve trung khop voi
 * `public/icon.svg`; SUA MOT CAI THI PHAI SUA CA HAI.
 *
 * VI SAO KHONG DUA HUY HIEU TRUONG DAI HOC AN NINH NHAN DAN VAO DAY:
 * Day la co quan that thuoc Bo Cong an. Mot mark mang hinh khien, ngoi sao
 * hay phu hieu nganh dat tren trang CA NHAN se doc thanh mao danh to chuc, va
 * mau thuan truc tiep voi disclaimer bat buoc o src/config/site.ts - noi da
 * ghi ro website nay khong phai cong thong tin chinh thuc cua Trung tam hay
 * Nha truong.
 *
 * Quan he giua thay va trung tam la THAT nen website duoc phep noi ro - nhung
 * noi bang CHU (dong phu ben canh mark), khong bang phu hieu. Xem
 * `site-header.tsx` va `site-footer.tsx`.
 *
 * Ban than hinh nay co y chi mang nghia "hoc lai xe" chung chung. Mot bieu
 * tuong 36px khong the truyen dat duoc "day tai trung tam co ten cu the" - do
 * la viec cua chu, khong phai cua icon.
 */

interface BrandMarkProps {
  className?: string;
  /**
   * `solid`   - nen navy dac, dung tren nen sang (header).
   * `onDark`  - nen trang mo, dung tren nen navy (footer).
   */
  tone?: 'solid' | 'onDark';
}

export function BrandMark({ className, tone = 'solid' }: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center rounded-xl',
        tone === 'solid' ? 'bg-brand-800' : 'bg-white/10',
        className,
      )}
    >
      <svg
        viewBox="0 0 64 64"
        className="h-[62%] w-[62%]"
        role="presentation"
        focusable="false"
      >
        {/* Than xe */}
        <rect x="12" y="30" width="40" height="14" rx="6" fill="#FFFFFF" />
        {/* Mui/kinh chan gio - mau cam thuong hieu, tao diem nhan o co nho */}
        <path d="M 18 30 L 22 19 L 42 19 L 46 30 Z" fill="#FCB367" />
        {/* Banh xe */}
        <circle cx="21" cy="46" r="5" fill="#FFFFFF" />
        <circle cx="43" cy="46" r="5" fill="#FFFFFF" />
      </svg>
    </span>
  );
}
