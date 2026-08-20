/**
 * Do tre so le cho phan tu thu `index` trong mot luoi hoac danh sach.
 *
 * VI SAO HAM NAY NAM RIENG MOT FILE, KHONG NAM TRONG reveal.tsx:
 * `reveal.tsx` mo dau bang 'use client'. Moi thu duoc export tu mot module
 * client deu tro thanh "tham chieu phia trinh duyet" - Server Component chi
 * duoc phep RENDER no nhu component hoac truyen no lam props, KHONG duoc goi
 * truc tiep. Cac muc goi ham nay (khoa hoc, lo trinh, album...) deu la Server
 * Component, nen goi tu reveal.tsx se lam trang do loi 500 ngay khi tai.
 *
 * Dang ham thuan tuy khong co chi thi 'use client' nhu file nay chay duoc o ca
 * hai phia.
 *
 * CHAN TREN o `maxSteps`: luoi 12 bai viet ma cong don 70ms moi the thi the
 * cuoi phai doi 840ms sau khi da nam trong man hinh - nguoi doc cam thay trang
 * bi lag chu khong thay dep. Chan lai o 5 buoc (350ms) giu duoc cam giac so le
 * ma khong ai phai cho.
 */
export function staggerDelay(index: number, step = 70, maxSteps = 5): number {
  return Math.min(index, maxSteps) * step;
}
