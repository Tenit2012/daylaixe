import type { GalleryCategory, GalleryItem } from '@/types/content';

/**
 * Album hinh anh.
 *
 * `isPlaceholder` phan biet hai loai anh:
 *  - `false` = ANH CHUP THAT tai noi thay giang day. Mo ta phai dung dung
 *    nhung gi nhin thay trong anh, KHONG them chi tiet suy dien.
 *  - `true`  = hinh minh hoa SVG ve san, chua co anh that thay the. Giao dien
 *    tu gan nhan "Noi dung mau" cho nhung anh nay (khi bat
 *    NEXT_PUBLIC_SHOW_PLACEHOLDER_BADGE).
 *
 * Anh that duoc xep TRUOC anh minh hoa.
 * Anh goc nam trong `assets/photos/`, chuyen sang ban dung cho web bang
 * `node scripts/process-photos.mjs`.
 * Danh sach anh con thieu: docs/REQUIRED_ASSETS.md
 */
export const galleryItems: GalleryItem[] = [
  {
    id: 'g-01',
    title: 'Thầy hướng dẫn học viên',
    description:
      'Thầy cầm vô lăng làm mẫu thao tác cho học viên ngay trong buổi tập trên cabin.',
    category: 'huong-dan',
    image: {
      src: '/images/teacher/thay-tung-huong-dan-hoc-vien.webp',
      alt: 'Thầy dạy lái xe cầm vô lăng hướng dẫn thao tác cho học viên ngồi trên cabin học lái',
      width: 1200,
      height: 900,
    },
    isPlaceholder: false,
  },
  {
    id: 'g-03',
    title: 'Xe tập lái',
    description:
      'Dàn xe tải dùng cho các buổi thực hành, mỗi xe đều mang biển "TẬP LÁI" theo quy định.',
    category: 'xe-tap-lai',
    image: {
      src: '/images/center/dan-xe-tap-lai.webp',
      alt: 'Dàn xe tải tập lái màu xanh xếp thành hàng, giáo viên đứng cạnh từng xe',
      width: 1200,
      height: 674,
    },
    isPlaceholder: false,
  },
  {
    id: 'g-04',
    title: 'Sân tập',
    description:
      'Xe tập lái đỗ trong ô kẻ vạch tại sân tập — nơi học viên luyện bài ghép xe trước khi ra đường thực tế.',
    category: 'san-tap',
    image: {
      src: '/images/center/san-tap-xe-tap-lai.webp',
      alt: 'Xe tập lái màu bạc gắn biển TẬP LÁI đỗ trong ô kẻ vạch vàng tại sân tập',
      width: 960,
      height: 720,
    },
    isPlaceholder: false,
  },
  {
    id: 'g-05',
    title: 'Cổng trung tâm',
    description:
      'Cổng Trung tâm Dạy nghề, Đào tạo và Sát hạch Lái xe — Trường Đại học An ninh Nhân dân, nơi diễn ra các buổi học và sát hạch.',
    category: 'co-so',
    image: {
      src: '/images/center/cong-truong.webp',
      alt: 'Cổng Trung tâm Dạy nghề, Đào tạo và Sát hạch Lái xe - Trường Đại học An ninh Nhân dân, có đội ngũ đứng chụp ảnh phía trước',
      width: 1200,
      height: 561,
    },
    isPlaceholder: false,
  },
  {
    id: 'g-06',
    title: 'Thầy Tùng',
    description: 'Thầy Tùng mặc đồng phục trung tâm, chụp cùng xe tại nơi làm việc.',
    category: 'huong-dan',
    image: {
      src: '/images/teacher/thay-tung-ben-xe.webp',
      alt: 'Thầy dạy lái xe mặc đồng phục xanh đứng cạnh xe ô tô, tay đặt trên nắp capo',
      width: 598,
      height: 449,
    },
    isPlaceholder: false,
  },
];

export const galleryCategories: Array<{
  value: GalleryCategory | 'all';
  label: string;
}> = [
  { value: 'all', label: 'Tất cả' },
  { value: 'huong-dan', label: 'Hướng dẫn' },
  { value: 'co-so', label: 'Cơ sở' },
  { value: 'cabin-mo-phong', label: 'Cabin mô phỏng' },
  { value: 'xe-tap-lai', label: 'Xe tập lái' },
  { value: 'san-tap', label: 'Sân tập' },
  { value: 'sa-hinh', label: 'Sa hình' },
  { value: 'duong-truong', label: 'Đường trường' },
  { value: 'ly-thuyet', label: 'Lý thuyết' },
];

export function getGalleryByCategory(
  category: GalleryCategory | 'all',
): GalleryItem[] {
  if (category === 'all') return galleryItems;
  return galleryItems.filter((item) => item.category === category);
}
