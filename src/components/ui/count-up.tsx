'use client';

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';

/**
 * `useLayoutEffect` chi ton tai o phia trinh duyet. Goi no khi render tren
 * may chu se sinh canh bao, nen doi sang `useEffect` cho moi truong do.
 */
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

interface SplitLabel {
  before: string;
  value: number;
  after: string;
}

/**
 * Tach so nguyen DAU TIEN ra khoi mot chuoi co san.
 *
 *   "Gan 20 nam kinh nghiem giang day"
 *     -> { before: "Gan ", value: 20, after: " nam kinh nghiem giang day" }
 *
 * Tra ve `null` khi chuoi khong chua chu so nao.
 *
 * VI SAO PHAI TACH TU CHUOI thay vi nhan thang mot con so: con so duy nhat co
 * that tren website nam trong bien moi truong NEXT_PUBLIC_EXPERIENCE_LABEL,
 * duoi dang van ban tu do ("Gan 20 nam"). Website nay co quy tac ro rang la
 * KHONG bia ra so lieu - khong so hoc vien, khong ty le do, khong so khoa da
 * day. Vi vay dem so chi duoc phep chay tren con so da co san trong noi dung,
 * va neu quan tri vien doi nhan thanh mot chuoi khong co so ("Nhieu nam kinh
 * nghiem") thi component tu dong ngung dem va hien nguyen van ban.
 */
function splitFirstInteger(label: string): SplitLabel | null {
  const match = label.match(/\d+/);
  if (!match || match.index === undefined) return null;

  const value = Number.parseInt(match[0], 10);
  if (!Number.isFinite(value) || value <= 0) return null;

  return {
    before: label.slice(0, match.index),
    value,
    after: label.slice(match.index + match[0].length),
  };
}

/** Cham dan ve cuoi - giong kim dong ho tien den so cuoi roi dung han. */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const DURATION_MS = 1100;

interface CountUpProps {
  /** Chuoi goc, vi du "Gan 20 nam kinh nghiem giang day". */
  label: string;
  className?: string;
}

/**
 * Dem tang dan con so co san trong mot chuoi, khi chuoi do cuon vao man hinh.
 *
 * KHONG dung cho noi dung tren man hinh dau: component chi bat dau dem sau khi
 * React hydrate xong.
 */
export function CountUp({ label, className }: CountUpProps) {
  /*
    Ghi nho ket qua tach chuoi: khong co useMemo thi moi lan render lai (moi
    khung hinh trong luc dem) deu sinh ra mot doi tuong moi, khien cac effect
    ben duoi thay phu thuoc da doi va chay lai - hieu ung se tu khoi dong lai
    lien tuc va khong bao gio ket thuc.
  */
  const parts = useMemo(() => splitFirstInteger(label), [label]);
  const ref = useRef<HTMLSpanElement | null>(null);
  const frameRef = useRef<number | null>(null);

  /*
    Khoi tao bang gia tri THAT chu khong phai 0. Nho vay HTML sinh ra o may
    chu va lan render dau o trinh duyet giong het nhau (khong loi hydration),
    dong thoi khi khong co JavaScript thi con so van dung.
  */
  const [display, setDisplay] = useState(parts ? parts.value : 0);

  useIsomorphicLayoutEffect(() => {
    if (!parts) return;

    /*
      `motion-js` chi co khi JavaScript chay VA nguoi dung khong bat che do
      giam chuyen dong. Khong co class -> khong dem, giu nguyen con so that.
    */
    if (!document.documentElement.classList.contains('motion-js')) return;

    // Ha ve 0 TRUOC khi trinh duyet son, de khong thay con so nhay 20 -> 0.
    setDisplay(0);
  }, [parts]);

  useEffect(() => {
    const element = ref.current;
    if (!parts || !element) return;
    if (!document.documentElement.classList.contains('motion-js')) return;
    if (!('IntersectionObserver' in window)) {
      setDisplay(parts.value);
      return;
    }

    const target = parts.value;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          setDisplay(Math.round(easeOutCubic(progress) * target));

          /*
            Vong lap nay CO GIOI HAN: no tu dung khi progress cham 1 (khoang
            1,1 giay) va chi chay dung mot lan trong doi song cua trang. Day
            khong phai vong lap animation chay lien tuc.
          */
          if (progress < 1) {
            frameRef.current = requestAnimationFrame(tick);
          }
        };

        frameRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [parts]);

  // Chuoi khong co so -> hien nguyen van, khong gan quan sat, khong dem.
  if (!parts) return <span className={className}>{label}</span>;

  /*
    Khoa be ngang theo so chu so cua gia tri CUOI va dung chu so deu be ngang
    (tabular-nums). Neu khong, khi dem tu 9 len 10 con so rong them mot ky tu
    va day phan chu phia sau dich sang - vua giat mat vua tinh vao CLS.
  */
  const numberStyle: CSSProperties = {
    display: 'inline-block',
    minWidth: `${String(parts.value).length}ch`,
    fontVariantNumeric: 'tabular-nums',
  };

  return (
    <span ref={ref} className={className}>
      {parts.before}
      {/*
        Con so dang dem duoc giau khoi trinh doc man hinh, va thay bang mot
        ban sao chi trinh doc man hinh thay - luon la gia tri THAT. Neu khong,
        nguoi dung trinh doc man hinh co the nghe "0 nam kinh nghiem" neu ho
        doc dung luc hieu ung dang chay.
      */}
      <span aria-hidden="true" style={numberStyle}>
        {display}
      </span>
      <span className="sr-only">{parts.value}</span>
      {parts.after}
    </span>
  );
}
