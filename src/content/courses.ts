import type { Course } from '@/types/content';

/**
 * Danh sach khoa hoc.
 *
 * CACH THEM KHOA HOC MOI: xem docs/CONTENT_GUIDE.md
 *  - `slug` phai la duy nhat, chi gom chu thuong khong dau va dau gach ngang.
 *  - `tuition: null` khi chua chot hoc phi -> giao dien tu dong hien thi
 *    cau "Vui lòng liên hệ...". TUYET DOI khong dien so uoc chung.
 */
export const courses: Course[] = [
  {
    slug: 'hang-b-so-tu-dong',
    name: 'Hạng B - Số tự động',
    shortName: 'Hạng B số tự động',
    licenseClass: 'B',
    summary:
      'Khóa học dành cho người muốn lái xe con số tự động, thao tác đơn giản và dễ làm quen trong những buổi đầu.',
    description:
      'Xe số tự động chỉ có chân ga và chân phanh nên học viên có thể tập trung vào quan sát, giữ làn và xử lý tình huống ngay từ buổi đầu. Đây là lựa chọn phổ biến với người đi làm cần bằng lái nhanh để chạy xe gia đình trong thành phố. Trong khóa học, tôi hướng dẫn từ cách chỉnh ghế, gương, cầm vô lăng đến khi học viên tự tin chạy đường đông và hoàn thành bài sa hình.',
    suitableFor: [
      'Người chưa từng cầm vô lăng và muốn bắt đầu nhẹ nhàng',
      'Người đi làm bận rộn, cần lịch học linh hoạt',
      'Người sẽ chủ yếu lái xe gia đình trong nội thành',
      'Người từng ngại chân côn khi tập lái xe số sàn',
    ],
    vehicleType: 'Xe con 5 chỗ hộp số tự động',
    estimatedDuration: 'Khoảng 3 tháng, tùy lịch học và lịch sát hạch',
    curriculum: [
      {
        title: 'Làm quen xe và tư thế lái',
        details:
          'Chỉnh ghế, chỉnh gương, thắt dây an toàn, cách đặt tay trên vô lăng, làm quen chân ga và chân phanh trong sân tập.',
      },
      {
        title: 'Điều khiển cơ bản',
        details:
          'Khởi hành, dừng xe êm, giữ tốc độ ổn định, đánh lái và trả lái, tập cảm nhận kích thước xe.',
      },
      {
        title: 'Lý thuyết và mô phỏng',
        details:
          'Ôn bộ câu hỏi lý thuyết, luyện phần mềm mô phỏng các tình huống giao thông theo chương trình đào tạo hiện hành.',
      },
      {
        title: 'Bài thi sa hình',
        details:
          'Luyện lần lượt từng bài trong sa hình, phân tích lỗi thường gặp và cách tự kiểm tra trước khi vào bài.',
      },
      {
        title: 'Đường trường',
        details:
          'Chạy thực tế trên đường, tập quan sát gương, giữ khoảng cách, chuyển làn và xử lý giao lộ.',
      },
      {
        title: 'Ôn tập trước kỳ thi',
        details:
          'Chạy lại toàn bộ nội dung, rà soát điểm yếu của từng học viên và hướng dẫn tâm lý phòng thi.',
      },
    ],
    requiredDocuments: [
      'Đơn đề nghị học và sát hạch theo mẫu của cơ sở đào tạo',
      'Bản sao giấy tờ tùy thân theo yêu cầu tại thời điểm nộp hồ sơ',
      'Giấy khám sức khỏe do cơ sở y tế đủ điều kiện cấp',
      'Ảnh thẻ theo kích thước cơ sở đào tạo hướng dẫn',
    ],
    tuition: null,
    faqs: [
      {
        question: 'Học xe số tự động có lái được xe số sàn không?',
        answer:
          'Phạm vi được phép điều khiển của từng hạng giấy phép do quy định hiện hành xác định. Bạn hãy nhắn cho thầy để được tư vấn đúng nhu cầu sử dụng xe của mình trước khi chọn khóa, tránh phải học lại sau này.',
      },
      {
        question: 'Chưa từng lái xe thì bao lâu mới quen?',
        answer:
          'Phần lớn học viên bắt đầu thấy quen tay sau vài buổi thực hành đầu tiên. Tốc độ tiến bộ khác nhau ở mỗi người, nên tôi luôn điều chỉnh bài tập theo mức độ của từng học viên thay vì ép theo một khuôn chung.',
      },
    ],
    highlights: [
      'Thao tác đơn giản, dễ làm quen',
      'Phù hợp người mới hoàn toàn',
      'Tập trung vào quan sát và xử lý tình huống',
    ],
    image: {
      src: '/images/courses/hang-b-so-tu-dong.svg',
      alt: 'Minh họa khóa học lái xe hạng B số tự động',
      width: 800,
      height: 500,
    },
    featured: true,
    order: 1,
  },
  {
    slug: 'hang-b-so-san',
    name: 'Hạng B - Số sàn',
    shortName: 'Hạng B số sàn',
    licenseClass: 'B',
    summary:
      'Khóa học cho người muốn thành thạo cả xe số sàn, chủ động hơn khi cầm lái nhiều loại xe khác nhau.',
    description:
      'Xe số sàn đòi hỏi phối hợp côn, ga và số nên những buổi đầu sẽ vất vả hơn một chút. Đổi lại, học viên hiểu rõ cách xe vận hành và tự tin hơn khi phải cầm lái nhiều loại xe. Tôi hướng dẫn kỹ phần cảm nhận côn, giữ xe trên dốc và sang số đúng thời điểm để học viên không bị chết máy khi thi cũng như khi chạy thực tế.',
    suitableFor: [
      'Người muốn lái được cả xe số sàn lẫn số tự động',
      'Người dự định sử dụng xe tải nhẹ hoặc xe gia đình số sàn',
      'Người muốn hiểu sâu về cách vận hành của xe',
      'Người có thời gian luyện tập đều đặn',
    ],
    vehicleType: 'Xe con 5 chỗ hộp số sàn',
    estimatedDuration: 'Khoảng 3 tháng, tùy lịch học và lịch sát hạch',
    curriculum: [
      {
        title: 'Làm quen côn - ga - số',
        details:
          'Tập cảm nhận điểm bám côn, khởi hành không chết máy, phối hợp nhả côn và mớm ga.',
      },
      {
        title: 'Chuyển số và giữ tốc độ',
        details:
          'Lên số, về số đúng thời điểm, giữ tốc độ ổn định, xử lý khi xe ì hoặc gằn máy.',
      },
      {
        title: 'Dừng và khởi hành ngang dốc',
        details:
          'Bài tập trọng tâm của xe số sàn: kết hợp phanh tay, côn và ga để xe không trôi.',
      },
      {
        title: 'Lý thuyết và mô phỏng',
        details:
          'Ôn bộ câu hỏi lý thuyết và luyện phần mềm mô phỏng tình huống giao thông.',
      },
      {
        title: 'Bài thi sa hình',
        details:
          'Luyện từng bài sa hình với xe số sàn, chú trọng kiểm soát tốc độ chậm bằng côn.',
      },
      {
        title: 'Đường trường',
        details:
          'Chạy thực tế, tập chuyển số trong dòng xe đông và giữ khoảng cách an toàn.',
      },
    ],
    requiredDocuments: [
      'Đơn đề nghị học và sát hạch theo mẫu của cơ sở đào tạo',
      'Bản sao giấy tờ tùy thân theo yêu cầu tại thời điểm nộp hồ sơ',
      'Giấy khám sức khỏe do cơ sở y tế đủ điều kiện cấp',
      'Ảnh thẻ theo kích thước cơ sở đào tạo hướng dẫn',
    ],
    tuition: null,
    faqs: [
      {
        question: 'Học số sàn có khó hơn nhiều không?',
        answer:
          'Khó hơn ở vài buổi đầu vì phải làm quen chân côn. Sau khi cảm nhận được điểm bám côn thì mọi thứ nhẹ nhàng hơn nhiều. Tôi thường dành riêng buổi đầu chỉ để học viên tập côn cho quen chân.',
      },
      {
        question: 'Hay bị chết máy thì phải làm sao?',
        answer:
          'Chết máy là chuyện bình thường khi mới học, không phải dấu hiệu bạn không có năng khiếu. Nguyên nhân thường là nhả côn quá nhanh hoặc chưa mớm đủ ga. Chúng ta sẽ tập lại từng bước chậm cho đến khi thành phản xạ.',
      },
    ],
    highlights: [
      'Hiểu rõ cách xe vận hành',
      'Tự tin cầm lái nhiều loại xe',
      'Luyện kỹ bài dừng và khởi hành ngang dốc',
    ],
    image: {
      src: '/images/courses/hang-b-so-san.svg',
      alt: 'Minh họa khóa học lái xe hạng B số sàn',
      width: 800,
      height: 500,
    },
    featured: true,
    order: 2,
  },
  {
    slug: 'hang-c1',
    name: 'Hạng C1',
    shortName: 'Hạng C1',
    licenseClass: 'C1',
    summary:
      'Khóa học dành cho người có nhu cầu điều khiển xe tải nhẹ phục vụ công việc kinh doanh, vận chuyển.',
    description:
      'Hạng C1 phù hợp với người cần lái xe tải nhẹ cho công việc. So với xe con, xe tải có tầm nhìn, bán kính quay vòng và cách canh đường khác hẳn, nên phần thực hành sẽ tập trung vào cảm nhận kích thước xe, canh lề và lùi chuồng. Điều kiện dự học của hạng C1 do quy định hiện hành xác định, bạn nên liên hệ để được kiểm tra trước khi chuẩn bị hồ sơ.',
    suitableFor: [
      'Người cần lái xe tải nhẹ phục vụ công việc',
      'Người kinh doanh, vận chuyển hàng hóa quy mô nhỏ',
      'Người muốn mở rộng cơ hội việc làm liên quan đến lái xe',
      'Người đã quen lái xe con và muốn nâng hạng phù hợp nhu cầu',
    ],
    vehicleType: 'Xe tải hạng nhẹ theo cấu hình của cơ sở đào tạo',
    estimatedDuration:
      'Thường dài hơn hạng B, cần xác nhận theo lịch khai giảng',
    curriculum: [
      {
        title: 'Làm quen xe tải',
        details:
          'Khác biệt về tầm nhìn, gương, bán kính quay vòng và trọng tâm xe so với xe con.',
      },
      {
        title: 'Canh đường và canh lề',
        details:
          'Cảm nhận chiều rộng, chiều dài xe, giữ làn và vào cua không cán vạch.',
      },
      {
        title: 'Lùi và ghép chuồng',
        details:
          'Kỹ thuật lùi xe dài, sử dụng gương và điểm mốc để ghép chuồng chính xác.',
      },
      {
        title: 'Lý thuyết và mô phỏng',
        details: 'Ôn lý thuyết và luyện phần mềm mô phỏng theo chương trình.',
      },
      {
        title: 'Bài thi sa hình',
        details:
          'Luyện toàn bộ bài sa hình với xe tải, chú trọng kiểm soát tốc độ.',
      },
      {
        title: 'Đường trường',
        details:
          'Chạy thực tế, tập xử lý tình huống với xe có tải trọng và quán tính lớn hơn.',
      },
    ],
    requiredDocuments: [
      'Đơn đề nghị học và sát hạch theo mẫu của cơ sở đào tạo',
      'Bản sao giấy tờ tùy thân theo yêu cầu tại thời điểm nộp hồ sơ',
      'Giấy khám sức khỏe do cơ sở y tế đủ điều kiện cấp',
      'Ảnh thẻ theo kích thước cơ sở đào tạo hướng dẫn',
      'Giấy tờ liên quan đến điều kiện dự học của hạng C1 (nếu được yêu cầu)',
    ],
    tuition: null,
    faqs: [
      {
        question: 'Điều kiện học hạng C1 là gì?',
        answer:
          'Điều kiện dự học và dự sát hạch được xác định theo quy định hiện hành và có thể thay đổi. Bạn hãy liên hệ để thầy kiểm tra giúp trước khi chuẩn bị hồ sơ, tránh mất thời gian đi lại.',
      },
      {
        question: 'Chưa có bằng lái nào thì học C1 được không?',
        answer:
          'Việc này phụ thuộc vào quy định tại thời điểm đăng ký. Tôi sẽ hỏi rõ nhu cầu công việc của bạn rồi tư vấn lộ trình hợp lý nhất, có thể là học thẳng hoặc học hạng phù hợp trước.',
      },
    ],
    highlights: [
      'Phù hợp nhu cầu công việc vận chuyển',
      'Luyện kỹ canh lề và lùi chuồng',
      'Hướng dẫn kiểm tra điều kiện dự học trước khi làm hồ sơ',
    ],
    image: {
      src: '/images/courses/hang-c1.svg',
      alt: 'Minh họa khóa học lái xe hạng C1',
      width: 800,
      height: 500,
    },
    featured: true,
    order: 3,
  },
  {
    slug: 'bo-tuc-tay-lai',
    name: 'Bổ túc tay lái',
    shortName: 'Bổ túc tay lái',
    licenseClass: 'BO_TUC',
    summary:
      'Dành cho người đã có bằng nhưng lâu không chạy, còn ngại đường đông hoặc chưa tự tin cầm lái một mình.',
    description:
      'Rất nhiều người có bằng lái nhưng cất tủ vài năm rồi không dám chạy. Khóa bổ túc không đi theo giáo trình cứng mà bám vào đúng thứ bạn còn yếu: canh đường, đỗ xe, đi vào hẻm nhỏ, chạy giờ cao điểm hay lên xuống hầm chung cư. Buổi đầu tôi sẽ chạy cùng để đánh giá, sau đó chúng ta thống nhất nội dung cho các buổi tiếp theo.',
    suitableFor: [
      'Người có bằng nhưng lâu ngày không cầm lái',
      'Người ngại chạy đường đông hoặc giờ cao điểm',
      'Người chưa tự tin đỗ xe, lùi xe trong không gian hẹp',
      'Người sắp phải tự chạy xe đi làm, đưa đón gia đình',
    ],
    vehicleType: 'Xe số tự động hoặc số sàn, chọn theo nhu cầu của học viên',
    estimatedDuration: 'Theo số buổi bạn cần, thống nhất trước khi bắt đầu',
    curriculum: [
      {
        title: 'Buổi đánh giá',
        details:
          'Chạy thử một đoạn để xác định bạn đang yếu ở đâu và cần ưu tiên luyện gì.',
      },
      {
        title: 'Canh đường và giữ làn',
        details:
          'Lấy lại cảm giác kích thước xe, giữ khoảng cách hai bên, vào cua đúng làn.',
      },
      {
        title: 'Đỗ xe và lùi xe',
        details:
          'Đỗ song song, đỗ vuông góc, lùi vào chỗ hẹp, sử dụng gương và camera hỗ trợ.',
      },
      {
        title: 'Đường đông và giờ cao điểm',
        details:
          'Tập nhích xe trong dòng đông, chuyển làn an toàn, xử lý giao lộ nhiều xe máy.',
      },
      {
        title: 'Tình huống riêng theo nhu cầu',
        details:
          'Lên xuống hầm chung cư, đường hẻm nhỏ, đường trơn trời mưa, chạy ban đêm.',
      },
    ],
    requiredDocuments: [
      'Giấy phép lái xe còn hiệu lực',
      'Thông tin về nhu cầu và những tình huống bạn muốn luyện',
    ],
    tuition: null,
    faqs: [
      {
        question: 'Bổ túc cần học bao nhiêu buổi?',
        answer:
          'Không có con số cố định vì mỗi người yếu một phần khác nhau. Sau buổi đầu tiên, tôi sẽ nói thẳng bạn cần thêm khoảng bao nhiêu buổi cho mục tiêu của mình để bạn chủ động sắp xếp.',
      },
      {
        question: 'Có được chọn tuyến đường muốn tập không?',
        answer:
          'Được. Nếu bạn cần chạy quen tuyến đi làm hằng ngày hoặc tập vào hầm chung cư nơi bạn ở, hãy nói trước để chúng ta sắp xếp buổi học đúng tuyến đó.',
      },
    ],
    highlights: [
      'Nội dung bám theo điểm yếu của từng người',
      'Chọn được xe số sàn hoặc số tự động',
      'Tập đúng tuyến đường bạn hay đi',
    ],
    image: {
      src: '/images/courses/bo-tuc-tay-lai.svg',
      alt: 'Minh họa khóa bổ túc tay lái',
      width: 800,
      height: 500,
    },
    featured: true,
    order: 4,
  },
  {
    slug: 'luyen-sa-hinh',
    name: 'Luyện sa hình',
    shortName: 'Luyện sa hình',
    licenseClass: 'SA_HINH',
    summary:
      'Luyện tập trung các bài thi trong sa hình cho học viên sắp đến kỳ sát hạch hoặc từng trượt bài.',
    description:
      'Khóa này dành cho bạn đã học rồi nhưng còn vướng ở một vài bài sa hình, hoặc muốn chạy thêm cho chắc trước ngày thi. Chúng ta sẽ đi từng bài, xác định rõ điểm mốc, tốc độ vào bài và lỗi bạn hay mắc, rồi lặp lại đến khi thao tác thành phản xạ chứ không phải học thuộc.',
    suitableFor: [
      'Học viên sắp đến ngày sát hạch',
      'Người từng trượt một hoặc vài bài trong sa hình',
      'Người muốn luyện thêm cho chắc trước kỳ thi',
      'Người học ở nơi khác nhưng cần luyện thêm giờ',
    ],
    vehicleType: 'Xe tập lái phù hợp với hạng bạn đang thi',
    estimatedDuration: 'Theo số buổi đăng ký, thường tính theo giờ chạy sân',
    curriculum: [
      {
        title: 'Xuất phát và dừng xe nhường đường',
        details: 'Thứ tự thao tác, tín hiệu và điểm dừng chính xác.',
      },
      {
        title: 'Dừng và khởi hành ngang dốc',
        details:
          'Bài hay mất điểm nhất - luyện đến khi xe không trôi và không chết máy.',
      },
      {
        title: 'Đường vuông góc và đường vòng quanh co',
        details: 'Xác định điểm mốc đánh lái, giữ tốc độ chậm ổn định.',
      },
      {
        title: 'Ghép xe dọc và ghép xe ngang',
        details: 'Cách nhìn gương, chọn mốc và chỉnh lại khi vào chưa chuẩn.',
      },
      {
        title: 'Qua ngã tư có tín hiệu và đường sắt',
        details: 'Quan sát, canh thời gian đèn và điểm dừng đúng vạch.',
      },
      {
        title: 'Tăng tốc, tăng số và kết thúc',
        details: 'Hoàn thành bài cuối đúng tốc độ và tín hiệu yêu cầu.',
      },
    ],
    requiredDocuments: [
      'Thông tin khóa học và hạng thi bạn đang theo',
      'Lịch thi dự kiến (nếu đã có) để sắp xếp buổi luyện phù hợp',
    ],
    tuition: null,
    faqs: [
      {
        question: 'Trượt sa hình một lần có đáng lo không?',
        answer:
          'Không. Đa số trường hợp là do căng thẳng hoặc sai một điểm mốc nhỏ chứ không phải không lái được. Chúng ta xem lại đúng bài bạn bị mất điểm và luyện lại phần đó là chính.',
      },
      {
        question: 'Có luyện được đúng sân thi không?',
        answer:
          'Việc sử dụng sân tập phụ thuộc lịch của cơ sở đào tạo. Bạn nhắn cho thầy để được thông tin về sân và khung giờ còn trống tại thời điểm bạn muốn luyện.',
      },
    ],
    highlights: [
      'Đi sâu từng bài đang bị vướng',
      'Chỉ rõ điểm mốc và lỗi thường gặp',
      'Phù hợp học viên sắp đến ngày thi',
    ],
    image: {
      src: '/images/courses/luyen-sa-hinh.svg',
      alt: 'Minh họa khóa luyện sa hình',
      width: 800,
      height: 500,
    },
    featured: true,
    order: 5,
  },
];

/** Danh sach khoa hoc da sap xep theo thu tu hien thi. */
export const sortedCourses: Course[] = [...courses].sort(
  (a, b) => a.order - b.order,
);

/** Cac khoa hoc hien thi noi bat tren trang chu. */
export const featuredCourses: Course[] = sortedCourses.filter(
  (course) => course.featured,
);

/** Tim khoa hoc theo slug. Tra ve `undefined` neu khong ton tai. */
export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

/** Toan bo slug - dung cho generateStaticParams va sitemap. */
export function getAllCourseSlugs(): string[] {
  return sortedCourses.map((course) => course.slug);
}

/** Lua chon cho dropdown "Khóa học quan tâm" trong form dang ky. */
export const courseOptions: Array<{ value: string; label: string }> = [
  ...sortedCourses.map((course) => ({
    value: course.slug,
    label: course.shortName,
  })),
  { value: 'chua-xac-dinh', label: 'Chưa xác định - cần thầy tư vấn' },
];

/** Nhan hien thi cua mot gia tri khoa hoc (dung o trang admin). */
export function getCourseLabel(value: string): string {
  const option = courseOptions.find((item) => item.value === value);
  return option?.label ?? value;
}
