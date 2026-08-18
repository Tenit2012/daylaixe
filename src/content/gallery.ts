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
    id: 'g-07',
    title: 'Xe tập lái hạng B',
    description:
      'Xe con tập lái đỗ trong nhà xe của trung tâm, mỗi xe có số hiệu riêng và mang biển "TẬP LÁI".',
    category: 'xe-tap-lai',
    image: {
      src: '/images/center/xe-tap-lai-hang-b.webp',
      alt: 'Xe con tập lái màu vàng cát gắn biển TẬP LÁI, đỗ trong nhà xe có bảng đánh số xe',
      width: 592,
      height: 444,
    },
    isPlaceholder: false,
  },
  /*
   * `g-11` va `g-10` la CUNG MOT chiec xe (bien 51F-292.97) chup hai goc.
   * Co y xep xen ke - de canh nhau tren luoi 3 cot trong nhu dang bi lap anh.
   */
  {
    id: 'g-11',
    title: 'Đầu xe gắn biển TẬP LÁI',
    description:
      'Mỗi xe dùng cho buổi thực hành đều gắn biển "TẬP LÁI" phía trước theo đúng quy định.',
    category: 'xe-tap-lai',
    image: {
      src: '/images/center/xe-tap-lai-chinh-dien.webp',
      alt: 'Đầu xe con tập lái màu trắng nhìn chính diện, gắn biển TẬP LÁI màu xanh cạnh biển số',
      width: 592,
      height: 444,
    },
    isPlaceholder: false,
  },
  {
    id: 'g-09',
    title: 'Trong buổi thực hành',
    description:
      'Học viên ngồi ghế lái trên xe số tự động trong giờ thực hành, tập làm quen vô lăng và các thao tác cơ bản.',
    category: 'huong-dan',
    image: {
      src: '/images/center/trong-buoi-thuc-hanh.webp',
      alt: 'Học viên ngồi ghế lái, tay đặt cạnh vô lăng xe số tự động trong buổi thực hành',
      width: 789,
      height: 592,
    },
    isPlaceholder: false,
  },
  {
    id: 'g-10',
    title: 'Xe tập lái tại sân',
    description:
      'Xe con tập lái đỗ tại khu vực sân của trung tâm, nơi học viên nhận xe trước mỗi buổi thực hành.',
    category: 'san-tap',
    image: {
      src: '/images/center/xe-tap-lai-goc-cheo.webp',
      alt: 'Xe con tập lái màu trắng gắn biển TẬP LÁI đỗ cạnh thanh chắn tại sân trung tâm',
      width: 789,
      height: 592,
    },
    isPlaceholder: false,
  },
  {
    id: 'g-08',
    title: 'Xe tải tập lái hạng C1',
    description:
      'Xe tải dùng cho các buổi thực hành hạng C1, mang biển "TẬP LÁI" theo quy định.',
    category: 'xe-tap-lai',
    image: {
      src: '/images/center/xe-tai-tap-lai-c1.webp',
      alt: 'Xe tải thùng màu trắng gắn biển TẬP LÁI đỗ tại sân tập của trung tâm',
      width: 789,
      height: 592,
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
