import { cn } from '@/lib/utils/cn';

/**
 * Bieu tuong thuong hieu, dung CHUNG cho header, footer va favicon.
 *
 * VI SAO CO FILE NAY: truoc day header va footer dung icon `Car` cua thu vien
 * lucide, con `public/icon.svg` lai la mot hinh khac han. Nghia la tab trinh
 * duyet va header hien HAI mark khac nhau - nguoi dung mo nhieu tab khong nhan
 * ra dau la trang cua thay. Hinh o day duoc ve trung khop voi
 * `public/icon.svg`; SUA MOT CAI THI PHAI SUA CA HAI.
 *
 * VI SAO KHONG DUNG THANG <img src="/icon.svg">: mark nay nam trong header
 * DINH tren moi trang, tuc la no phai co mat ngay o lan ve dau tien. Mot the
 * <img> la mot request rieng, den sau HTML, nen o ket noi cham se thay o trong
 * roi hinh nhay vao. Inline thi khong. Doi lai, hai ban sao phai duoc sua cung
 * luc - xem canh bao o tren.
 *
 * VI SAO BO NEN TRANG BO GOC CUA icon.svg: file goc ve san mot "app tile"
 * (rect trang, rx=104, co do bong) vi no con dung lam favicon/icon PWA, noi
 * khong ai boc them gi ben ngoai. O day thi chinh <span> nay da la cai tile
 * do roi, nen giu lai se thanh tile long trong tile.
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
 */

interface BrandMarkProps {
  className?: string;
  /**
   * `solid`   - nen trang dac, dung tren nen sang (header).
   * `onDark`  - nen trang mo, dung tren nen navy (footer).
   *
   * CA HAI DEU NEN SANG, khong phai so sot. Hinh trong icon.svg dung tong
   * xanh luc dam (#0F766E / #065F46); dat len nen navy brand-800 (#182F58)
   * thi hai mau gan nhau qua, vo lang chim han vao nen. Giu nen sang o ca hai
   * noi la cach duy nhat giu dung bang mau goc cua icon ma khong phai ve lai
   * mot phien ban mau khac - tuc la lai tao ra hai mark khac nhau.
   */
  tone?: 'solid' | 'onDark';
}

export function BrandMark({ className, tone = 'solid' }: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-xl',
        tone === 'solid' ? 'bg-white' : 'bg-white/90',
        className,
      )}
    >
      {/*
        viewBox cat sat noi dung (bo le 24px cua "app tile" trong file goc) de
        hinh an het o vuong thay vi noi mot hinh nho giua khoang trang.
      */}
      <svg
        viewBox="40 40 432 432"
        className="h-full w-full"
        role="presentation"
        focusable="false"
      >
        <defs>
          {/*
            id phai co tien to rieng: mark nay xuat hien HAI lan tren cung mot
            trang (header + footer). id trung nhau trong cung document thi
            tham chieu url(#...) cua ban thu hai se tro ve ban thu nhat.
          */}
          <linearGradient id="bm-green" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0F766E" />
            <stop offset="1" stopColor="#065F46" />
          </linearGradient>
          <linearGradient id="bm-mint" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#A7F3D0" />
            <stop offset="1" stopColor="#34D399" />
          </linearGradient>
        </defs>

        {/* Mu tot nghiep */}
        <path d="M132 144 256 88l124 56-124 58z" fill="url(#bm-green)" />
        <path d="M166 160v52c31 30 149 30 180 0v-52l-90 42z" fill="#0F766E" />
        <path
          d="M380 145v58"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <rect x="369" y="196" width="22" height="38" rx="8" fill="#F59E0B" />

        {/* Mang mau bac ha */}
        <path
          d="M129 202c-43 49-57 118-30 178 11 25 28 47 50 65l39-26c-45-34-62-94-42-147 9-24 24-44 43-60z"
          fill="url(#bm-mint)"
          opacity=".85"
        />

        {/* Vo lang */}
        <circle
          cx="256"
          cy="294"
          r="118"
          fill="none"
          stroke="url(#bm-green)"
          strokeWidth="38"
        />
        <circle cx="256" cy="294" r="42" fill="url(#bm-green)" />
        <path
          d="M219 276 171 245M293 276l48-31M232 326l-31 51M280 326l31 51"
          fill="none"
          stroke="#065F46"
          strokeWidth="27"
          strokeLinecap="round"
        />
        <text
          x="256"
          y="313"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="58"
          fontWeight="700"
          fill="#FFFFFF"
        >
          T
        </text>

        {/* Con duong */}
        <path
          d="M92 449c77-70 143-86 216-68 55 14 83 2 122-36"
          fill="none"
          stroke="url(#bm-green)"
          strokeWidth="60"
          strokeLinecap="round"
        />
        <path
          d="M110 447c69-56 126-68 191-52 56 14 94 2 129-31"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="34 27"
        />
      </svg>
    </span>
  );
}
