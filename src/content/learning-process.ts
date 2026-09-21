import type { LearningStep } from '@/types/content';

/**
 * Lo trinh 9 buoc tu luc lien he den khi nhan giay phep lai xe.
 * `icon` la ten icon cua lucide-react, duoc map trong component timeline.
 */
export const learningProcess: LearningStep[] = [
  {
    order: 1,
    title: 'Liên hệ tư vấn',
    description:
      'Bạn gọi điện hoặc nhắn Zalo, mô tả nhu cầu và thời gian rảnh. Tôi trả lời trực tiếp, không qua tổng đài.',
    icon: 'PhoneCall',
    duration: 'Ngay trong ngày',
  },
  {
    order: 2,
    title: 'Chọn khóa học phù hợp',
    description:
      'Dựa trên loại xe bạn sẽ dùng và quỹ thời gian của bạn, chúng ta chốt khóa học và hình thức học.',
    icon: 'ListChecks',
    duration: '1 buổi trao đổi',
  },
  {
    order: 3,
    title: 'Chuẩn bị hồ sơ',
    description:
      'Tôi gửi danh sách giấy tờ được cập nhật và hướng dẫn từng bước, kể cả nơi khám sức khỏe.',
    icon: 'FileText',
    duration: 'Vài ngày',
  },
  {
    order: 4,
    title: 'Học lý thuyết',
    description:
      'Ôn bộ câu hỏi lý thuyết theo chương trình, tập trung vào phần dễ nhầm thay vì học vẹt.',
    icon: 'BookOpen',
    duration: 'Theo lịch khóa học',
  },
  {
    order: 5,
    title: 'Học thực hành',
    description:
      'Bắt đầu từ sân tập rồi ra đường thực tế. Mỗi buổi có mục tiêu rõ ràng để bạn biết mình đang tiến tới đâu.',
    icon: 'Car',
    duration: 'Trải dài suốt khóa',
  },
  {
    order: 6,
    title: 'Luyện phần mềm mô phỏng',
    description:
      'Làm quen các tình huống giao thông mô phỏng và cách nhận biết thời điểm cần phản ứng.',
    icon: 'MonitorPlay',
    duration: 'Vài buổi',
  },
  {
    order: 7,
    title: 'Luyện sa hình',
    description:
      'Chạy từng bài trong sa hình, xác định điểm mốc và sửa lỗi cho đến khi thao tác thành phản xạ.',
    icon: 'Route',
    duration: 'Trước kỳ thi',
  },
  {
    order: 8,
    title: 'Thi sát hạch',
    description:
      'Tôi hướng dẫn bạn chuẩn bị tâm lý, nhắc lại trình tự từng phần thi và những lỗi dễ mắc do hồi hộp.',
    icon: 'ClipboardCheck',
    duration: 'Theo lịch tổ chức',
  },
  {
    order: 9,
    title: 'Nhận giấy phép lái xe',
    description:
      'Sau khi có kết quả, bạn được hướng dẫn thủ tục nhận bằng. Cần luyện thêm cho vững tay lái thì cứ nhắn cho tôi.',
    icon: 'BadgeCheck',
    duration: 'Sau kỳ thi',
  },
];

/** Ly do nen hoc cung thay - hien thi dang card tren trang chu. */
export const whyChooseReasons: Array<{
  title: string;
  description: string;
  icon: string;
}> = [
  {
    /*
     * Dat DAU danh sach vi day la loi the khac biet nhat, va la thu duy nhat
     * o day tra loi truc tiep cau hoi "18,9 trieu thi duoc bao nhieu gio".
     *
     * GIOI HAN CUA CLAIM NAY - doc truoc khi viet lai cho "manh hon":
     * dieu da duoc xac nhan chi la KHONG GIOI HAN GIO THUC HANH. Khong duoc
     * suy rong thanh "hoc den khi dau", "bao dau", "khong gioi han xe/xang",
     * hay "muon hoc luc nao cung duoc" - lich van phu thuoc san tap va lich
     * day. Cung khong duoc them ve doi thu ("cac trung tam khac gioi han 30
     * gio"): khong co so lieu nao kiem chung duoc dieu do.
     */
    title: 'Không giới hạn giờ thực hành',
    description:
      'Bạn học theo năng lực thực tế, có thể luyện thêm để vững tay lái thay vì bị bó vào một gói số giờ cố định. Lịch cụ thể mình sắp xếp theo sân tập và giờ dạy.',
    icon: 'Infinity',
  },
  {
    title: 'Thầy trực tiếp tư vấn',
    description:
      'Bạn nhắn tin là tôi trả lời, không qua nhân viên trung gian. Nhờ vậy thông tin không bị tam sao thất bản.',
    icon: 'UserCheck',
  },
  {
    title: 'Hướng dẫn dễ hiểu cho người mới',
    description:
      'Tôi giải thích bằng ngôn ngữ đời thường, chia thao tác thành từng bước nhỏ thay vì nói thuật ngữ khó nhớ.',
    icon: 'Lightbulb',
  },
  {
    title: 'Chủ động trao đổi lịch học',
    description:
      'Lịch được thống nhất trước theo tuần, phù hợp với người đi làm giờ hành chính hoặc theo ca.',
    icon: 'CalendarClock',
  },
  {
    title: 'Giải thích kỹ các lỗi thường gặp',
    description:
      'Sai ở đâu tôi nói rõ nguyên nhân ở đó, để bạn hiểu và sửa được chứ không chỉ làm theo cho qua bài.',
    icon: 'AlertCircle',
  },
  {
    title: 'Theo sát quá trình học',
    description:
      'Tôi nắm được từng học viên đang ở đâu trong lộ trình, phần nào cần luyện thêm trước ngày thi.',
    icon: 'Footprints',
  },
  {
    title: 'Chú trọng kỹ năng lái xe thực tế',
    description:
      'Mục tiêu không dừng ở kỳ thi. Tôi muốn bạn ra đường thật vẫn bình tĩnh và xử lý được tình huống.',
    icon: 'ShieldCheck',
  },
];

/** Cac chi bao tao niem tin o hero - dien dat dinh tinh, khong dung so lieu. */
export const trustIndicators: Array<{ label: string; icon: string }> = [
  { label: 'Hướng dẫn dễ hiểu', icon: 'MessageCircle' },
  { label: 'Lịch học linh hoạt', icon: 'CalendarClock' },
  { label: 'Minh bạch thông tin', icon: 'Receipt' },
  { label: 'Đồng hành đến ngày thi', icon: 'Handshake' },
  { label: 'Chú trọng lái xe an toàn', icon: 'ShieldCheck' },
];
