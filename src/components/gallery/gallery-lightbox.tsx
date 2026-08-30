'use client';

import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryItem } from '@/types/content';

interface GalleryLightboxProps {
  items: GalleryItem[];
  /** Chi so anh dang mo. `null` = dong. */
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

/**
 * Khung xem anh phong to.
 *
 * VI SAO KHONG PHAI "FULL MAN HINH" DUNG NGHIA:
 * 8/10 anh nguon chi ~1200-1280px canh dai (da qua nen cua ung dung nhan tin).
 * Keo chung tran vien man hinh 1920px la phong to 1,5-3,2 lan -> mo nhoe. Ma
 * album nay ton tai de CHUNG MINH (xe that, bien so that, cong trung tam
 * that), nen mot tam anh mo lam hong dung muc dich cua no.
 *
 * Gioi han o `max-h-[82vh]` va `max-w-[min(1100px,92vw)]` khien moi anh deu
 * duoc THU NHO lai chu khong phong to - net cang, dong thoi van du lon de doc
 * bien so. Doi khi kem hon ve do "hoanh trang" nhung dung hon ve muc dich.
 *
 * DIEU KHIEN BAN PHIM: Esc dong, mui ten trai/phai chuyen anh, Tab bi giu
 * trong hop thoai. Focus duoc tra ve dung thumbnail vua bam - viec nay do
 * `GalleryGrid` lo, vi chi no biet nut nao da mo hop thoai.
 */
export function GalleryLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isOpen = index !== null;
  const item = isOpen ? items[index] : undefined;

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  /*
   * Khoa cuon trang nen phia sau.
   *
   * Dat lai dung gia tri CU thay vi gan cung 'auto': neu mot khoi khac cung
   * dang khoa cuon (vi du menu mobile), gan 'auto' se mo khoa nham cho ca no.
   */
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  /* Dua focus vao hop thoai ngay khi mo, de nguoi dung ban phim khong bi bo
     lai o cuoi trang. */
  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
        return;
      }
      if (event.key !== 'Tab') return;

      /*
       * Bay focus: hop thoai la lop phu che toan trang, neu de Tab chay ra
       * ngoai thi nguoi dung ban phim se "lac" vao trang phia sau ma khong
       * thay minh dang o dau - va khong co cach nao quay lai nut Dong.
       */
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose, goPrev, goNext]);

  if (!isOpen || !item) return null;

  // Anh chua co ban day du (hinh minh hoa SVG) thi dung thang ban trong luoi.
  const source = item.fullImage ?? item.image;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Ảnh: ${item.title}`}
      /*
       * Bam vao NEN thi dong, nhung bam vao anh hoac phan chu thi khong.
       * Kiem tra `event.target === event.currentTarget` thay vi bat su kien
       * noi bot: nguoi dung boi den mot dong mo ta roi tha chuot ra ngoai
       * vung chu se vo tinh dong hop thoai neu dung cach kia.
       */
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-black/90 p-4 sm:p-6"
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Đóng ảnh phóng to"
        className="absolute right-3 top-3 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5 sm:top-5"
      >
        <X aria-hidden="true" className="h-5 w-5" />
      </button>

      <figure className="flex max-w-[min(1100px,92vw)] flex-col items-center gap-3">
        <Image
          src={source.src}
          alt={item.image.alt}
          width={source.width}
          height={source.height}
          priority
          className="h-auto max-h-[82vh] w-auto max-w-full rounded-lg object-contain"
        />
        <figcaption className="max-w-[65ch] text-center">
          <h3 className="text-base font-semibold text-white">{item.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-white/75">
            {item.description}
          </p>
        </figcaption>
      </figure>

      {items.length > 1 ? (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Ảnh trước"
            className="rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          {/* `aria-live` de nguoi dung trinh doc man hinh biet da chuyen sang
              anh thu may ma khong can do lai ca hop thoai. */}
          <span
            aria-live="polite"
            className="min-w-[4.5rem] text-center text-sm tabular-nums text-white/80"
          >
            {index + 1} / {items.length}
          </span>
          <button
            type="button"
            onClick={goNext}
            aria-label="Ảnh tiếp theo"
            className="rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
