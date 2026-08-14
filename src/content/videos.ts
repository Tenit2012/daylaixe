import type { VideoAsset } from '@/types/content';

/**
 * Video quay tai buoi hoc that, tu luu tren website (khong nhung YouTube).
 *
 * Video goc nam trong `assets/videos/`, chuyen sang ban dung cho web bang
 * `node scripts/process-video.mjs`.
 *
 * QUY TAC: chi dang video co mat hoc vien khi hoc vien da dong y.
 */
export const lessonVideos: VideoAsset[] = [
  {
    id: 'v-01',
    title: 'Một buổi học thực tế',
    description:
      'Thầy ngồi ghế phụ hướng dẫn học viên cầm lái trên xe tập lái. Quay trực tiếp trong giờ học, không dàn dựng.',
    src: '/videos/buoi-hoc-thuc-te.mp4',
    poster: {
      src: '/images/teacher/buoi-hoc-thuc-te-poster.jpg',
      alt: 'Thầy dạy lái xe ngồi ghế phụ hướng dẫn học viên đang cầm vô lăng trong xe tập lái',
      width: 480,
      height: 854,
    },
    durationSeconds: 37,
  },
];
