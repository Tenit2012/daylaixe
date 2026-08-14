import type { LearningStep } from '@/types/content';

/**
 * Quy trinh 6 buoc tu luc lien he den khi thi sat hach.
 *
 * Vi sao rut tu 9 buoc xuong 6: day la landing page, nguoi doc can nam duoc
 * duong di trong mot lan luot man hinh. Cac buoc chi tiet hon (chuan bi ho so,
 * luyen mo phong, luyen sa hinh, nhan bang) van con day du o trang
 * /hoc-phi-lo-trinh - o day chi neu cac moc lon.
 *
 * QUY TAC: khong hua thoi gian cu the ("dau trong 1 thang"), khong hua ket qua.
 * Cot `duration` chi mo ta do dai TUONG DOI, va noi ro cai gi do trung tam
 * quyet dinh chu khong phai thay.
 */
export const registrationProcess: LearningStep[] = [
  {
    order: 1,
    title: 'Liên hệ với thầy',
    description:
      'Bạn gọi điện hoặc nhắn Zalo. Thầy trả lời trực tiếp, không qua tổng đài.',
    icon: 'PhoneCall',
    duration: 'Ngay trong ngày',
  },
  {
    order: 2,
    title: 'Tư vấn chọn khóa',
    description:
      'Thầy hỏi về nhu cầu, loại xe bạn sẽ dùng và quỹ thời gian, rồi tư vấn hạng bằng và hình thức học phù hợp. Bạn có thể trao đổi qua điện thoại hoặc đến gặp trực tiếp tại trung tâm.',
    icon: 'MessagesSquare',
    duration: '1 buổi trao đổi',
  },
  {
    order: 3,
    title: 'Đăng ký tại trung tâm',
    description:
      'Bạn nộp hồ sơ và đóng học phí trực tiếp cho trung tâm theo mức trung tâm công bố. Thầy hướng dẫn bạn chuẩn bị giấy tờ và đi cùng bạn khi làm thủ tục.',
    icon: 'ClipboardCheck',
    duration: 'Theo lịch của trung tâm',
  },
  {
    order: 4,
    title: 'Học lý thuyết',
    description:
      'Học và ôn bộ câu hỏi lý thuyết theo chương trình của trung tâm, tập trung vào những phần dễ nhầm thay vì học vẹt.',
    icon: 'BookOpen',
    duration: 'Theo lịch khóa học',
  },
  {
    order: 5,
    title: 'Học thực hành',
    description:
      'Tập trên cabin mô phỏng, sân sa hình rồi ra đường thực tế. Thầy trực tiếp ngồi kèm và giải thích từng thao tác.',
    icon: 'Car',
    duration: 'Theo lịch khóa học',
  },
  {
    order: 6,
    title: 'Thi sát hạch',
    description:
      'Thi lý thuyết, mô phỏng, sa hình và đường trường tại trung tâm. Thầy hướng dẫn bạn làm quen trước với quy trình và sân thi.',
    icon: 'GraduationCap',
    duration: 'Theo lịch sát hạch',
  },
];
