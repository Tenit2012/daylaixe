import type { GalleryItem } from '@/types/content';

/**
 * KY KIEM TRA, XET HOAN THANH CHUONG TRINH DAO TAO LAI XE
 * ===========================================================================
 * Ba anh chup tai buoi kiem tra hoan thanh chuong trinh dao tao lai xe,
 * khoa K77A - 78T, ngay 05/09/2026, do chu website cung cap.
 *
 * VI SAO TACH RA KHOI `gallery.ts`:
 * `galleryItems` duoc dung o HAI noi (trang chu, /gioi-thieu).
 * Nhom anh nay chi thuoc ve MOT trang - /gioi-thieu - nen de chung vao mang
 * cu se tu dong day chung ra ca ba trang. Mot mang rieng giu quyen quyet dinh
 * "hien o dau" nam o trang, khong nam o file du lieu.
 *
 * QUY TAC MO TA (giong `gallery.ts`): chi ghi NHUNG GI NHIN THAY trong anh.
 * Ten khoa, ngay thang va ten don vi duoi day deu doc duoc trong chinh tam
 * anh dau tien, khong phai thong tin suy dien tu ben ngoai.
 *
 * DIEM CAN LUU Y VE TEN DON VI: phong trong anh ghi "TRUNG TAM GIAO DUC NGHE
 * NGHIEP, DAO TAO LAI XE, NGOAI NGU TIN HOC" - khac voi ten dang dung o
 * `NEXT_PUBLIC_CENTER_NAME`. Mo ta o day trich dung chu tren phong; khong tu
 * sua thanh ten kia va cung khong sua nguoc lai, vi chua ro ten nao la ten
 * phap dinh hien hanh.
 *
 * `isPlaceholder: false` cho ca ba - day la anh chup that.
 */
export const completionExamItems: GalleryItem[] = [
  {
    id: 'kt-01',
    title: 'Kỳ kiểm tra hoàn thành chương trình',
    description:
      'Phông của buổi ghi rõ: "Kỳ kiểm tra, xét hoàn thành chương trình đào tạo lái xe" — khóa K77A · 78T, năm 2026, TP. Hồ Chí Minh ngày 05 tháng 9 năm 2026.',
    category: 'ky-kiem-tra',
    image: {
      src: '/images/center/phong-ky-kiem-tra-hoan-thanh.webp',
      alt: 'Phông đỏ ghi "Kỳ kiểm tra, xét hoàn thành chương trình đào tạo lái xe" khóa K77A · 78T năm 2026, của Trung tâm Giáo dục nghề nghiệp, Đào tạo lái xe, Ngoại ngữ Tin học — Trường Đại học An ninh Nhân dân',
      width: 1200,
      height: 900,
    },
    fullImage: {
      src: '/images/gallery-full/phong-ky-kiem-tra-hoan-thanh.webp',
      width: 1200,
      height: 1600,
    },
    isPlaceholder: false,
  },
  {
    id: 'kt-02',
    title: 'Hội trường buổi kiểm tra',
    description:
      'Toàn cảnh hội trường: học viên ngồi tại bàn, phía trước là phông của buổi và cờ Tổ quốc, hai bên tường treo bảng sơ đồ tình huống giao thông.',
    category: 'ky-kiem-tra',
    image: {
      src: '/images/center/hoi-truong-ky-kiem-tra.webp',
      alt: 'Hội trường đông học viên ngồi tại bàn, phía trước là phông đỏ của kỳ kiểm tra hoàn thành chương trình đào tạo lái xe và cờ Tổ quốc',
      width: 1200,
      height: 900,
    },
    fullImage: {
      src: '/images/gallery-full/hoi-truong-ky-kiem-tra.webp',
      width: 1200,
      height: 1600,
    },
    isPlaceholder: false,
  },
  {
    id: 'kt-03',
    title: 'Học viên trong buổi kiểm tra',
    description:
      'Học viên ngồi tại bàn trong hội trường, trên tay là giấy tờ của buổi kiểm tra. Trên tường là các bảng sơ đồ tình huống giao thông dùng trong chương trình học.',
    category: 'ky-kiem-tra',
    image: {
      src: '/images/center/hoc-vien-tai-ky-kiem-tra.webp',
      alt: 'Học viên ngồi tại bàn trong hội trường, cầm giấy tờ trên tay; trên tường treo các bảng sơ đồ tình huống giao thông',
      width: 1200,
      height: 900,
    },
    fullImage: {
      src: '/images/gallery-full/hoc-vien-tai-ky-kiem-tra.webp',
      width: 1200,
      height: 1600,
    },
    isPlaceholder: false,
  },
];
