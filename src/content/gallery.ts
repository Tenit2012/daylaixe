import type { GalleryCategory, GalleryItem } from '@/types/content';

/**
 * Album hinh anh.
 *
 * Toan bo anh hien tai la MINH HOA dang SVG duoc ve san trong /public/images,
 * khong phai anh chup that va khong mo phong nguoi that.
 * Danh sach anh that can cung cap: docs/REQUIRED_ASSETS.md
 */
export const galleryItems: GalleryItem[] = [
  {
    id: 'g-01',
    title: 'Xe tập lái',
    description:
      'Xe được sử dụng trong các buổi thực hành, có đầy đủ trang bị dành cho xe tập lái.',
    category: 'xe-tap-lai',
    image: {
      src: '/images/gallery/xe-tap-lai.svg',
      alt: 'Hình minh họa xe tập lái nhìn từ phía trước',
      width: 800,
      height: 600,
    },
    isPlaceholder: true,
  },
  {
    id: 'g-02',
    title: 'Sân tập',
    description:
      'Khu vực sân tập nơi học viên làm quen với xe trước khi ra đường thực tế.',
    category: 'san-tap',
    image: {
      src: '/images/gallery/san-tap.svg',
      alt: 'Hình minh họa sân tập lái xe với vạch kẻ và cọc tiêu',
      width: 800,
      height: 600,
    },
    isPlaceholder: true,
  },
  {
    id: 'g-03',
    title: 'Buổi học sa hình',
    description:
      'Luyện từng bài trong sa hình: ghép dọc, ghép ngang, đường vòng quanh co.',
    category: 'sa-hinh',
    image: {
      src: '/images/gallery/sa-hinh.svg',
      alt: 'Hình minh họa sơ đồ bài thi sa hình',
      width: 800,
      height: 600,
    },
    isPlaceholder: true,
  },
  {
    id: 'g-04',
    title: 'Buổi học đường trường',
    description:
      'Học viên chạy thực tế trên đường, tập quan sát và giữ khoảng cách an toàn.',
    category: 'duong-truong',
    image: {
      src: '/images/gallery/duong-truong.svg',
      alt: 'Hình minh họa xe chạy trên đường trường',
      width: 800,
      height: 600,
    },
    isPlaceholder: true,
  },
  {
    id: 'g-05',
    title: 'Buổi học lý thuyết',
    description:
      'Ôn bộ câu hỏi lý thuyết và phân tích các tình huống dễ nhầm lẫn.',
    category: 'ly-thuyet',
    image: {
      src: '/images/gallery/ly-thuyet.svg',
      alt: 'Hình minh họa buổi học lý thuyết với bảng và tài liệu',
      width: 800,
      height: 600,
    },
    isPlaceholder: true,
  },
  {
    id: 'g-06',
    title: 'Thầy hướng dẫn học viên',
    description:
      'Hướng dẫn trực tiếp trên xe, giải thích từng thao tác trong lúc thực hành.',
    category: 'huong-dan',
    image: {
      src: '/images/gallery/huong-dan.svg',
      alt: 'Hình minh họa giáo viên hướng dẫn học viên trong xe tập lái',
      width: 800,
      height: 600,
    },
    isPlaceholder: true,
  },
];

export const galleryCategories: Array<{
  value: GalleryCategory | 'all';
  label: string;
}> = [
  { value: 'all', label: 'Tất cả' },
  { value: 'xe-tap-lai', label: 'Xe tập lái' },
  { value: 'san-tap', label: 'Sân tập' },
  { value: 'sa-hinh', label: 'Sa hình' },
  { value: 'duong-truong', label: 'Đường trường' },
  { value: 'ly-thuyet', label: 'Lý thuyết' },
  { value: 'huong-dan', label: 'Hướng dẫn' },
];

export function getGalleryByCategory(
  category: GalleryCategory | 'all',
): GalleryItem[] {
  if (category === 'all') return galleryItems;
  return galleryItems.filter((item) => item.category === category);
}
