'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

/**
 * MOT IntersectionObserver duy nhat cho toan bo trang.
 *
 * Vi sao khong tao moi Reveal mot observer: trang chu co khoang 40 khoi can
 * hien dan. Moi IntersectionObserver la mot doi tuong quan sat rieng ma trinh
 * duyet phai tinh giao cat o moi khung hinh cuon. Gop lai mot cai, trinh duyet
 * xu ly ca danh sach trong mot lan - day la khac biet do duoc tren thiet bi
 * yeu, khong phai toi uu ly thuyet.
 *
 * Observer duoc tao LUOI (chi khi Reveal dau tien gan vao trang), nen cac
 * trang khong dung Reveal khong phai tra chi phi nao.
 */
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined') return null;
  if (!('IntersectionObserver' in window)) return null;

  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          /*
            Bo theo doi ngay sau lan hien dau tien. Hieu ung nay chi chay MOT
            lan cho moi khoi - noi dung khong duoc nhap nhay lai moi lan nguoi
            dung cuon nguoc len. Bo theo doi cung lam danh sach quan sat ngan
            dan ve 0 khi nguoi dung cuon het trang.
          */
          sharedObserver?.unobserve(entry.target);
        }
      },
      {
        /*
          Lui bien duoi 12%: khoi bat dau hien khi no da vao han trong man
          hinh chu khong phai luc vua cham mep. Neu kich hoat ngay o mep,
          nguoi dung cuon nhanh se thay khoi van dang mo dan khi no da o giua
          man hinh - cam giac bi tre.
        */
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.05,
      },
    );
  }

  return sharedObserver;
}

const revealVariantClass = {
  rise: 'reveal',
  zoom: 'reveal-zoom',
  line: 'journey-line',
} as const;

interface RevealProps {
  /** Bo trong duoc - vi du khi Reveal dung cho duong ke trang tri. */
  children?: ReactNode;
  className?: string;
  /**
   * `rise`  - mo dan + nhich len tu duoi. Dung cho hau het noi dung.
   * `zoom`  - mo dan + thu nho ve dung ty le. Danh cho ANH, tao cam giac
   *           ong kinh lay net thay vi khoi chu truot vao.
   * `line`  - ve duong ke tu tren xuong (scaleY). Danh rieng cho duong noi
   *           cac buoc trong lo trinh hoc.
   */
  variant?: 'rise' | 'zoom' | 'line';
  /** Do tre (ms) - dung tao hieu ung so le trong luoi the. */
  delay?: number;
  /** The HTML duoc render. Mac dinh `div`. */
  as?: 'div' | 'li' | 'section' | 'header' | 'figure' | 'article';
}

/**
 * Boc mot khoi noi dung de no hien dan khi cuon toi.
 *
 * DIEM QUAN TRONG VE HIEU NANG: component nay la Client Component, nhung
 * `children` truyen vao van duoc render o phia MAY CHU. React coi children
 * nhu mot props da render san, khong keo cay con sang phia trinh duyet. Nho
 * vay boc bao nhieu section cung khong lam tang so Client Component that su,
 * va khong lam phinh goi JavaScript gui ve may nguoi dung.
 *
 * KHONG dung cho noi dung nam tren man hinh dau (hero). Quy tac lam mo chi
 * duoc go sau khi React hydrate xong; voi noi dung ngay dau trang, do la mot
 * khoang trong nguoi dung nhin thay duoc. Hero dung animation CSS thuan
 * (class `hero-in`) chay ngay tu lan son dau.
 */
export function Reveal({
  children,
  className,
  variant = 'rise',
  delay = 0,
  as = 'div',
}: RevealProps) {
  // Ep kieu ve 'div' de TypeScript suy ra dung kieu ref; the that su duoc
  // render van la gia tri cua `as`.
  const Tag = as as 'div';
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = getSharedObserver();

    /*
      Trinh duyet khong ho tro IntersectionObserver: hien ngay lap tuc.
      Khong bao gio de noi dung ket lai o trang thai vo hinh chi vi thieu mot
      API - noi dung quan trong hon hieu ung.
    */
    if (!observer) {
      element.classList.add('is-revealed');
      return;
    }

    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(revealVariantClass[variant], className)}
      style={
        delay > 0
          ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}

/*
  `staggerDelay` da chuyen sang src/lib/utils/stagger.ts.

  Ly do: file nay la module 'use client'. Moi thu export tu day deu thanh tham
  chieu phia trinh duyet, ma cac muc goi ham do (khoa hoc, lo trinh, album)
  deu la Server Component - goi truc tiep se lam trang do loi 500 khi tai.
*/
