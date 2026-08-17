import type { LearningStep } from '@/types/content';

/**
 * Quy trinh 7 buoc tu luc lien he den khi thi sat hach.
 *
 * Vi sao rut tu 9 buoc xuong 7: day la landing page, nguoi doc can nam duoc
 * duong di trong mot lan luot man hinh. Cac buoc chi tiet hon (chuan bi ho so,
 * luyen mo phong, luyen sa hinh, nhan bang) van con day du o trang
 * /hoc-phi-lo-trinh - o day chi neu cac moc lon. Rieng buoc kham suc khoe duoc
 * tach thanh muc rieng (thay vi gop vao "chuan bi ho so" nhu ban 9 buoc) vi
 * day la buoc hoc vien hay hoi va can biet som de sap xep thoi gian.
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
      'Gọi điện hoặc nhắn Zalo, thầy trả lời trực tiếp, không qua tổng đài.',
    icon: 'PhoneCall',
    duration: 'Ngay trong ngày',
  },
  {
    order: 2,
    title: 'Tư vấn chọn khóa',
    description:
      'Thầy hỏi nhu cầu, loại xe và thời gian rảnh của bạn, rồi tư vấn hạng bằng và hình thức học phù hợp.',
    icon: 'MessagesSquare',
    duration: '1 buổi trao đổi',
  },
  {
    order: 3,
    title: 'Khám sức khỏe',
    description:
      'Bạn khám sức khỏe theo quy định tại cơ sở y tế đủ điều kiện. Thầy hướng dẫn nơi khám và giấy tờ cần mang theo.',
    icon: 'Stethoscope',
    duration: 'Trước khi nộp hồ sơ',
  },
  {
    order: 4,
    title: 'Đăng ký tại trung tâm',
    description:
      'Bạn nộp hồ sơ kèm giấy khám sức khỏe, đóng học phí theo mức trung tâm công bố. Thầy đi cùng khi làm thủ tục.',
    icon: 'ClipboardCheck',
    duration: 'Theo lịch của trung tâm',
  },
  {
    order: 5,
    title: 'Học lý thuyết',
    description:
      'Ôn bộ câu hỏi lý thuyết theo chương trình trung tâm, tập trung vào phần dễ nhầm thay vì học vẹt.',
    icon: 'BookOpen',
    duration: 'Theo lịch khóa học',
  },
  {
    order: 6,
    title: 'Học thực hành',
    description:
      'Tập trên cabin mô phỏng, sân sa hình rồi ra đường thực tế, có thầy ngồi kèm giải thích từng thao tác.',
    icon: 'Car',
    duration: 'Theo lịch khóa học',
  },
  {
    order: 7,
    title: 'Thi sát hạch',
    description:
      'Thi lý thuyết, mô phỏng, sa hình và đường trường tại trung tâm, được thầy hướng dẫn làm quen trước với quy trình và sân thi.',
    icon: 'GraduationCap',
    duration: 'Theo lịch sát hạch',
  },
];
