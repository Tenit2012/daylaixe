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
    durationSeconds: 25,
  },
  {
    id: 'v-02',
    title: 'Thực hành tại sân tập',
    description:
      'Quay tại sân tập của trung tâm, ghi lại buổi thực hành lái xe thực tế.',
    src: '/videos/thuc-hanh-san-tap.mp4',
    poster: {
      src: '/images/center/thuc-hanh-san-tap-poster.jpg',
      alt: 'Thầy đứng cạnh xe tập lái tại sân tập của trung tâm',
      width: 640,
      height: 362,
    },
    durationSeconds: 46,
  },
  {
    id: 'v-03',
    title: 'Học viên tập lái xe tải',
    description:
      'Học viên cầm lái xe tải trong buổi thực hành hạng C1, quay trong điều kiện trời mưa.',
    src: '/videos/hoc-vien-lai-xe-tai.mp4',
    poster: {
      src: '/images/center/hoc-vien-lai-xe-tai-poster.jpg',
      alt: 'Học viên ngồi ghế lái xe tải, hai tay đặt trên vô lăng, bên ngoài trời mưa',
      width: 480,
      height: 848,
    },
    durationSeconds: 38,
  },
  {
    id: 'v-04',
    title: 'Thực hành xe tải trong sân',
    description:
      'Góc nhìn từ ghế lái khi học viên điều khiển xe tải chạy trong sân tập của trung tâm.',
    src: '/videos/thuc-hanh-xe-tai-trong-san.mp4',
    poster: {
      src: '/images/center/thuc-hanh-xe-tai-trong-san-poster.jpg',
      alt: 'Tay học viên cầm vô lăng xe tải, phía trước là sân tập của trung tâm',
      width: 480,
      height: 848,
    },
    durationSeconds: 69,
  },
];
