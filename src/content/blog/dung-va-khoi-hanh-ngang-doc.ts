import type { BlogPost } from '@/types/content';

export const post: BlogPost = {
  slug: 'dung-va-khoi-hanh-ngang-doc-het-troi-xe',
  title: 'Dừng và khởi hành ngang dốc: hết trôi xe, hết chết máy',
  description:
    'Vì sao xe trôi và vì sao xe chết máy ở bài lên dốc, cách tìm điểm bám côn trên chính chiếc xe bạn tập, và bài tập tách động tác giúp qua bài này trong vài buổi.',
  publishedAt: '2026-08-04',
  updatedAt: '2026-08-04',
  author: 'Thầy dạy lái xe',
  category: 'Kỹ năng lái xe',
  readingTimeMinutes: 8,
  coverImage: {
    src: '/images/blog/khoi-hanh-ngang-doc.svg',
    alt: 'Hình minh họa bài dừng và khởi hành xe ngang dốc',
    width: 1200,
    height: 630,
  },
  tags: ['lên dốc', 'côn số sàn', 'luyện sa hình', 'chết máy'],
  relatedSlugs: [
    'nhung-loi-thuong-gap-khi-hoc-sa-hinh',
    'bai-ghep-xe-doc-va-ngang-huong-dan-tung-buoc',
    'nguoi-moi-nen-hoc-lai-xe-so-san-hay-so-tu-dong',
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Nếu có một bài khiến học viên số sàn mất ngủ trước ngày thi thì đó là bài dừng và khởi hành ngang dốc. Nhưng bài này có cấu trúc rất rõ ràng: chỉ có hai kiểu hỏng, và mỗi kiểu có một nguyên nhân cơ học cụ thể. Hiểu được cơ chế thì phần còn lại chỉ là lặp lại cho quen.',
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Bài này dành cho ai',
      text: 'Nội dung tập trung vào xe số sàn, nơi bài lên dốc khó nhất. Với xe số tự động, phần khó chỉ còn là canh vị trí dừng đúng vạch — bạn có thể đọc lướt phần côn và tập trung vào mục điểm dừng.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Hai kiểu hỏng và nguyên nhân cơ học',
      id: 'hai-kieu-hong',
    },
    {
      type: 'paragraph',
      text: 'Xe trôi về sau xảy ra khi bạn nhả phanh trong lúc động cơ chưa truyền đủ lực xuống bánh. Trọng lực thắng, xe lùi. Xe chết máy xảy ra ngược lại: bạn nhả côn nhanh hơn mức động cơ kịp nhận tải, động cơ bị ghì lại và tắt.',
    },
    {
      type: 'paragraph',
      text: 'Cả hai đều là vấn đề thời điểm, không phải vấn đề sức mạnh. Đạp ga to hơn không cứu được xe trôi nếu côn chưa bám, và cũng không cứu được chết máy nếu bạn nhả côn quá nhanh.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Điểm bám côn: thứ bạn phải tìm trên chính xe mình tập',
      id: 'diem-bam-con',
    },
    {
      type: 'paragraph',
      text: 'Mỗi chiếc xe có một vị trí bàn đạp côn mà tại đó lực bắt đầu truyền xuống bánh. Đó là điểm bám. Không có con số chung cho mọi xe, và đây là lý do bạn nên tập nhiều trên chiếc xe sẽ dùng khi thi, hoặc ít nhất làm quen lại vài giây nếu xe thi khác xe tập.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Ở mặt phẳng, vào số một, không đạp ga.',
        'Nhả côn thật chậm cho tới khi cảm thấy đầu xe hơi nhấc lên hoặc tiếng máy trầm xuống. Dừng chân ngay tại đó.',
        'Ghi nhớ cảm giác ở bắp chân tại vị trí này. Đó là điểm bám của chiếc xe đó.',
        'Lặp lại vài chục lần cho tới khi tìm được nó mà không cần nghĩ.',
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Dấu hiệu nhận biết đáng tin nhất',
      text: 'Đừng nhìn vòng tua. Hãy nghe tiếng máy trầm xuống và cảm nhận thân xe hơi rung nhẹ. Tai và cảm giác nhanh hơn mắt, và trong phòng thi bạn cũng không rảnh để liếc đồng hồ.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Trình tự khởi hành ngang dốc',
      id: 'trinh-tu-khoi-hanh',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Dừng xe đúng vị trí quy định, giữ phanh chân.',
        'Kéo phanh tay nếu bạn dùng phương pháp phanh tay. Vào số một.',
        'Nhả côn từ từ tới đúng điểm bám và giữ nguyên chân côn ở đó.',
        'Mớm nhẹ ga cho máy khỏe hơn một chút, vẫn giữ nguyên chân côn.',
        'Khi cảm thấy xe muốn tiến, nhả phanh tay. Xe sẽ đi lên, không trôi.',
        'Sau khi xe đã lăn bánh ổn định mới nhả nốt côn.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Điểm mà học viên hay làm sai là bước ba và bốn: họ nhả côn tới điểm bám rồi tiếp tục nhả thêm trong lúc nhả phanh. Hãy tách bạch — chân côn đứng yên hoàn toàn trong lúc bạn thao tác phanh.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Bài tập tách động tác',
      id: 'bai-tap-tach-dong-tac',
    },
    {
      type: 'paragraph',
      text: 'Đừng tập cả chuỗi ngay từ đầu. Khi có quá nhiều việc phải làm cùng lúc, bạn sẽ vội và hỏng ở khâu yếu nhất. Hãy tách ra:',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Buổi đầu, chỉ tập tìm điểm bám ở mặt phẳng. Không lên dốc, không tính giờ.',
        'Buổi hai, tập giữ xe đứng yên trên dốc bằng côn trong vài giây, chưa cần đi.',
        'Buổi ba, ghép thêm thao tác nhả phanh và cho xe đi lên.',
        'Buổi bốn, ghép bài này vào chuỗi sa hình đầy đủ để làm quen với nhịp thi thật.',
      ],
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Đừng giữ côn quá lâu',
      text: 'Giữ xe đứng trên dốc bằng côn là kỹ thuật để dùng trong vài giây, không phải để dùng lâu. Giữ lâu làm nóng và mòn lá côn. Trong bài thi bạn chỉ cần vài giây, còn ngoài đường thật hãy dùng phanh.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Canh điểm dừng cho đúng vạch',
      id: 'canh-diem-dung',
    },
    {
      type: 'paragraph',
      text: 'Phần thứ hai của bài là dừng đúng phạm vi cho phép, không quá vạch và không quá xa vạch. Cách làm ổn định nhất là chọn một điểm mốc cố định trên nắp ca-pô hoặc trên trụ kính so với vạch kẻ, rồi luôn dùng đúng mốc đó.',
    },
    {
      type: 'paragraph',
      text: 'Điều kiện để mốc này đáng tin: bạn phải ngồi ở đúng một tư thế mọi lần. Chỉ cần chỉnh ghế lên xuống một nấc là mốc lệch hẳn. Đây là lý do tôi luôn yêu cầu học viên chỉnh ghế trước rồi mới bắt đầu, kể cả trong lúc tập.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Nếu lỡ chết máy giữa bài',
      id: 'neu-chet-may',
    },
    {
      type: 'paragraph',
      text: 'Bình tĩnh, đạp côn, đạp phanh, khởi động lại và làm lại đúng trình tự. Điều tệ nhất bạn có thể làm là cuống lên rồi nhả côn nhanh hơn cho kịp — đó chính là cách chết máy lần thứ hai.',
    },
    {
      type: 'paragraph',
      text: 'Trong lúc luyện, tôi thường cố tình để học viên chết máy một lần rồi yêu cầu xử lý ngay tại chỗ. Khi bạn đã xử lý tình huống đó vài lần trong sân tập, nó không còn làm bạn hoảng trong phòng thi nữa.',
    },
    {
      type: 'paragraph',
      text: 'Nếu bạn đang vướng ở bài này và không rõ mình sai ở khâu nào, nhắn cho tôi. Thường chỉ cần ngồi cạnh quan sát một lượt là chỉ ra được ngay bạn đang nhả côn sớm hay nhả phanh sớm.',
    },
  ],
};
