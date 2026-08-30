import type { Course, Faq } from '@/types/content';
import { sortedCourses } from '@/content/courses';

/**
 * Cau hoi thuong gap chung cho toan site.
 *
 * NGUYEN TAC NOI DUNG:
 *  - Khong hard-code con so hoc phi. Cau tra loi ve hoc phi duoc GHEP TU
 *    `courses.ts` - xem `buildTuitionAnswer()` ngay ben duoi.
 *  - Khong khang dinh quy dinh phap luat chua kiem chung; luon huong nguoi
 *    dung xac nhan lai tai thoi diem dang ky.
 *  - Khong dung tu ngu cam ket ket qua thi.
 */

type PricedCourse = Course & { tuition: NonNullable<Course['tuition']> };

function hasTuition(course: Course): course is PricedCourse {
  return course.tuition !== null;
}

/**
 * Cau tra loi cho cau hoi hoc phi - GHEP TU DU LIEU KHOA HOC, khong viet tay.
 *
 * VI SAO PHAI GHEP: cau tra loi nay duoc day vao JSON-LD FAQPage cua trang
 * chu. Neu viet tay con so vao day, den luc Trung tam doi hoc phi ma chi sua
 * `courses.ts`, Google se doc duoc mot muc gia KHAC voi muc website dang
 * hien - sai lech im lang, khong co canh bao nao. Ghep tu `sortedCourses`
 * thi doi gia mot cho la moi noi doi theo.
 *
 * Phan liet ke "da gom / chua gom" co y viet gon thay vi ghep tu mang: cau
 * tra loi FAQ can doc duoc trong mot hoi, con danh sach day du da nam o
 * trang /hoc-phi-lo-trinh va trang chi tiet tung khoa.
 */
function buildTuitionAnswer(): string {
  const priced = sortedCourses.filter(hasTuition);
  const unpriced = sortedCourses.filter((course) => course.tuition === null);

  const priceList = priced
    .map((course) => `${course.shortName} ${course.tuition.displayValue}`)
    .join(', ');

  const perSession =
    unpriced.length > 0
      ? ` Khóa ${unpriced
          .map((course) => course.shortName.toLowerCase())
          .join(
            ' và ',
          )} tính theo buổi, bạn liên hệ để thầy báo mức đang áp dụng.`
      : '';

  return (
    `Mức trọn gói trung tâm đang công bố: ${priceList}. ` +
    'Mức này đã gồm học phí lý thuyết và thực hành, xăng xe, bãi tập, giờ cabin và phần mềm mô phỏng, lệ phí thi sát hạch cùng lệ phí cấp bằng. ' +
    'Chưa gồm khám sức khỏe nếu bạn chưa có giấy còn hiệu lực, và phí thi lại nếu trượt. ' +
    'Trang Học phí & lộ trình liệt kê đầy đủ từng khoản.' +
    perSession
  );
}

export const generalFaqs: Faq[] = [
  {
    question: 'Người chưa từng lái xe có học được không?',
    answer:
      'Được. Phần lớn học viên của tôi đều bắt đầu từ con số không. Những buổi đầu chúng ta tập trong sân cho quen tay lái, chân ga, chân phanh rồi mới ra đường. Bạn không cần biết gì trước, chỉ cần đi học đều và hỏi ngay khi thấy chưa rõ.',
    category: 'Bắt đầu học',
  },
  {
    question: 'Nên học số sàn hay số tự động?',
    answer:
      'Điều này phụ thuộc vào chiếc xe bạn sẽ dùng sau này. Nếu chủ yếu chạy xe gia đình trong thành phố thì số tự động dễ làm quen hơn. Nếu bạn muốn cầm lái được nhiều loại xe hoặc công việc có liên quan đến xe số sàn thì nên học số sàn. Bạn nhắn cho tôi nhu cầu thực tế, tôi sẽ tư vấn cụ thể hơn.',
    category: 'Chọn khóa học',
  },
  {
    question: 'Có thể học vào cuối tuần không?',
    answer:
      'Có. Nhiều học viên của tôi đi làm giờ hành chính nên chỉ rảnh cuối tuần hoặc buổi tối. Chúng ta trao đổi lịch trước theo tuần để bạn chủ động sắp xếp công việc. Lịch cụ thể còn phụ thuộc vào lịch sân tập nên hãy liên hệ sớm để giữ khung giờ phù hợp.',
    category: 'Lịch học',
  },
  {
    question: 'Hồ sơ đăng ký gồm những gì?',
    answer:
      'Thông thường hồ sơ gồm đơn đề nghị học và sát hạch theo mẫu, giấy tờ tùy thân, giấy khám sức khỏe do cơ sở y tế đủ điều kiện cấp và ảnh thẻ. Danh mục chi tiết có thể thay đổi theo quy định hiện hành, vì vậy bạn hãy liên hệ để tôi gửi danh sách được cập nhật đúng tại thời điểm bạn nộp hồ sơ.',
    category: 'Hồ sơ',
  },
  {
    question: 'Thời gian học dự kiến bao lâu?',
    answer:
      'Với hạng B, quá trình từ lúc nộp hồ sơ đến khi thi sát hạch thường kéo dài khoảng ba tháng, phụ thuộc vào lịch khai giảng và lịch tổ chức sát hạch. Khóa bổ túc hoặc luyện sa hình thì tính theo số buổi bạn cần, có thể chỉ vài buổi.',
    category: 'Lịch học',
  },
  {
    question: 'Có được chủ động lịch thực hành không?',
    answer:
      'Có, trong phạm vi lịch sân tập cho phép. Tôi thường thống nhất lịch với học viên trước vài ngày. Nếu bạn bận đột xuất, hãy báo sớm để chúng ta đổi buổi thay vì bỏ buổi, vì học ngắt quãng lâu sẽ mất cảm giác lái.',
    category: 'Lịch học',
  },
  {
    question: 'Có bằng nhưng yếu tay lái nên học thế nào?',
    answer:
      'Bạn nên đăng ký khóa bổ túc tay lái. Buổi đầu tôi sẽ chạy cùng để xem bạn đang yếu phần nào — có người ngại đường đông, có người chỉ vướng khâu đỗ xe. Sau đó chúng ta chọn đúng nội dung cần luyện thay vì học lại từ đầu.',
    category: 'Bổ túc',
  },
  {
    question: 'Học phí gồm những khoản nào?',
    answer: buildTuitionAnswer(),
    category: 'Học phí',
  },
  {
    question: 'Địa điểm học thực hành ở đâu?',
    answer:
      'Phần thực hành diễn ra tại sân tập của cơ sở đào tạo và các tuyến đường thực tế trong khu vực đào tạo. Bạn liên hệ để tôi gửi vị trí cụ thể và hướng dẫn đường đi, cũng như khung giờ sân còn trống.',
    category: 'Địa điểm',
  },
];

/** Nhom cau hoi theo category - dung cho trang FAQ chi tiet. */
export function groupFaqsByCategory(faqs: Faq[]): Map<string, Faq[]> {
  const grouped = new Map<string, Faq[]>();
  for (const faq of faqs) {
    const key = faq.category ?? 'Khác';
    const bucket = grouped.get(key);
    if (bucket) {
      bucket.push(faq);
    } else {
      grouped.set(key, [faq]);
    }
  }
  return grouped;
}
