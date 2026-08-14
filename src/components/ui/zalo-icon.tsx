import { cn } from '@/lib/utils/cn';

interface ZaloIconProps {
  className?: string;
}

/**
 * Logo Zalo chinh chu, dung cho moi nut/lien ket dan toi Zalo.
 *
 * MOT FILE DUNG CHO MOI NEN. Truoc day cho nay co hai ban (don sac cho nen
 * dam, ban mau cho nen sang) vi logo con la hinh tam tu ve. Logo that doc
 * duoc tren ca ba nen cua website - nut xanh Zalo, footer navy va the nen
 * sang - nen khong can tach ban nua.
 *
 * Muon doi logo thi chi can GHI DE `public/images/brand/zalo-logo.svg`,
 * khong phai sua dong code nao.
 *
 * Dung the <img> thay vi next/image vi day la icon rat nho, khong can toi
 * co che toi uu anh va se khong bao gio can srcset.
 */
export function ZaloIcon({ className }: ZaloIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/brand/zalo-logo.svg"
      alt=""
      aria-hidden="true"
      width={20}
      height={20}
      className={cn('h-[1.125rem] w-[1.125rem] shrink-0', className)}
    />
  );
}
