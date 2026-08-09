import { cn } from '@/lib/utils/cn';

interface ZaloIconProps {
  /**
   * `onDark`  - dung tren nen mau dam (nut nen xanh Zalo, footer navy).
   * `onLight` - dung tren nen sang (the o trang Lien he, bang quan tri).
   */
  tone?: 'onDark' | 'onLight';
  className?: string;
}

/**
 * Bieu tuong cho cac nut/lien ket dan toi Zalo.
 *
 * Anh duoc nap tu file trong `public/images/brand/`. Muon thay bang logo
 * Zalo chinh thuc thi chi can GHI DE hai file svg do - khong phai sua bat ky
 * dong code nao. Huong dan chi tiet nam ngay trong file svg va trong
 * `docs/REQUIRED_ASSETS.md`.
 *
 * Dung the <img> thay vi next/image vi day la icon rat nho, khong can toi
 * co che toi uu anh va se khong bao gio can srcset.
 */
export function ZaloIcon({ tone = 'onDark', className }: ZaloIconProps) {
  const src =
    tone === 'onDark'
      ? '/images/brand/zalo-logo.svg'
      : '/images/brand/zalo-logo-color.svg';

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden="true"
      width={20}
      height={20}
      className={cn('h-[1.125rem] w-[1.125rem] shrink-0', className)}
    />
  );
}
