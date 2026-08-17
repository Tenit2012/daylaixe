import type { BlogPost } from '@/types/content';

export const post: BlogPost = {
  slug: 'bai-ghep-xe-doc-va-ngang-huong-dan-tung-buoc',
  title: 'Bài ghép xe dọc và ngang: hướng dẫn từng bước',
  description:
    'Cách chọn điểm chuẩn, dùng gương và canh thời điểm đánh lái cho bài ghép xe dọc và ghép ngang, kèm cách xử lý khi đã vào lệch mà chưa muốn bỏ bài.',
  publishedAt: '2026-07-24',
  updatedAt: '2026-07-24',
  author: 'Thầy dạy lái xe',
  category: 'Kỹ năng lái xe',
  readingTimeMinutes: 9,
  coverImage: {
    src: '/images/blog/bai-ghep-xe.svg',
    alt: 'Hình minh họa bài ghép xe dọc và ghép ngang trong sa hình',
    width: 1200,
    height: 630,
  },
  tags: ['ghép xe', 'lùi chuồng', 'luyện sa hình', 'kỹ thuật lái'],
  relatedSlugs: [
    'nhung-loi-thuong-gap-khi-hoc-sa-hinh',
    'nhung-loi-khien-bi-truat-quyen-sat-hach',
    'dung-va-khoi-hanh-ngang-doc-het-troi-xe',
  ],
  content: [
    {
      type: 'paragraph',
      text: 'Ghép xe là bài khiến nhiều học viên nản nhất, và cũng là bài dễ tiến bộ nhanh nhất khi bạn hiểu đúng nguyên lý. Điều đầu tiên cần bỏ đi là ý nghĩ rằng ghép xe cần cảm giác thiên phú. Nó không cần. Nó cần điểm chuẩn cố định và một trình tự lặp lại được.',
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Về các điểm mốc trong bài này',
      text: 'Mỗi dòng xe có kích thước và vị trí gương khác nhau, nên điểm mốc cụ thể phải do bạn tự xác định trên chính chiếc xe mình tập, dưới sự hướng dẫn của giáo viên. Bài viết chỉ hướng dẫn cách tìm mốc, không đưa ra con số áp dụng cho mọi xe.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Nguyên lý chung: xe lùi thì đuôi đi trước',
      id: 'nguyen-ly-chung',
    },
    {
      type: 'paragraph',
      text: 'Khi tiến, bạn lái đầu xe và đuôi đi theo. Khi lùi thì ngược lại: đuôi xe quyết định hướng, còn đầu xe quét ra ngoài. Đây là lý do nhiều người lùi bị chạm vạch ở phía đầu xe dù đuôi vào rất đẹp.',
    },
    {
      type: 'paragraph',
      text: 'Ghi nhớ đơn giản: khi lùi, đánh vô lăng về phía nào thì đuôi xe đi về phía đó. Muốn đuôi sang phải thì đánh lái sang phải. Nhiều học viên bị rối vì cố suy luận ngược, trong khi thực tế nó thuận chiều.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Bước quan trọng nhất nằm trước khi bạn bắt đầu lùi',
      id: 'buoc-truoc-khi-lui',
    },
    {
      type: 'paragraph',
      text: 'Đây là điều tôi phải nhắc gần như mọi học viên: bài ghép xe được quyết định ở vị trí chuẩn bị, không phải ở lúc lùi. Nếu xe đứng đúng vị trí và đúng khoảng cách so với chuồng, phần lùi chỉ là lặp lại một động tác đã biết. Nếu vị trí chuẩn bị lệch, bạn sẽ phải chữa suốt cả bài và thường là chữa không kịp.',
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Quy tắc tôi luôn dạy',
      text: 'Thà mất năm giây chỉnh lại vị trí chuẩn bị còn hơn mất cả bài vì lùi từ chỗ lệch. Đừng ngại tiến lên làm lại.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Ghép xe dọc: trình tự bốn bước',
      id: 'ghep-xe-doc-trinh-tu',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Đưa xe chạy song song và giữ khoảng cách ổn định với mép chuồng. Khoảng cách này phải giống nhau ở mọi lần tập — đó là biến số bạn kiểm soát được.',
        'Tiến tới khi một điểm mốc trên thân xe của bạn ngang với mép chuồng. Mốc này do bạn và giáo viên xác định trên chính chiếc xe đang tập, thường là trụ cửa hoặc tay nắm cửa sau.',
        'Dừng hẳn, vào số lùi, đánh hết lái về phía chuồng và lùi thật chậm trong khi quan sát gương phía chuồng.',
        'Khi thân xe đã chếch vào và bạn thấy toàn bộ chuồng trong gương, trả lái dần để xe thẳng theo trục chuồng rồi lùi nốt.',
      ],
    },
    {
      type: 'image',
      src: '/images/blog/so-do-ghep-doc.svg',
      alt: 'Sơ đồ minh họa bài ghép xe dọc: vị trí chuẩn bị, điểm đánh lái và vị trí hoàn tất',
      width: 800,
      height: 520,
      caption:
        'Sơ đồ nguyên lý ba bước trên — không thay thế cho điểm mốc thật bạn xác định cùng giáo viên trên chính chiếc xe đang tập.',
    },
    {
      type: 'paragraph',
      text: 'Toàn bộ bài này nên đi ở tốc độ chậm nhất mà xe còn bò được. Với xe số sàn, đó thường là nhả côn tới điểm bám rồi giữ nguyên, không thêm ga. Xe càng chậm, bạn càng nhiều thời gian đọc gương và sửa.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Ghép xe ngang: khác biệt nằm ở góc vào',
      id: 'ghep-xe-ngang',
    },
    {
      type: 'paragraph',
      text: 'Ghép ngang khó hơn với nhiều người vì xe phải đi qua một góc chếch rồi mới thẳng lại được. Sai lầm phổ biến nhất là đánh lái quá sớm, khiến đuôi xe vào chuồng nhưng đầu xe quét sang cán vạch bên kia.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Giữ khoảng cách với hàng xe hoặc mép chuồng đúng bằng khoảng cách bạn vẫn tập, không rộng hơn cũng không hẹp hơn.',
        'Lùi thẳng trước, chỉ đánh lái khi điểm mốc của bạn đã đi qua mép chuồng. Đánh sớm là nguyên nhân số một.',
        'Đánh lái dứt khoát về phía chuồng, quan sát bánh sau qua gương để biết đuôi đã vào đủ chưa.',
        'Khi đuôi đã vào, trả lái ngược lại để kéo đầu xe theo. Đây là bước nhiều người quên nên đầu xe còn nằm ngoài.',
        'Chỉnh thẳng và lùi nốt tới vị trí dừng.',
      ],
    },
    {
      type: 'image',
      src: '/images/blog/so-do-ghep-ngang.svg',
      alt: 'Sơ đồ minh họa bài ghép xe ngang: vị trí chuẩn bị, điểm đánh lái và vị trí hoàn tất',
      width: 800,
      height: 480,
      caption:
        'Ghép ngang có thêm một góc chếch giữa vị trí chuẩn bị và chuồng — đây là chỗ nhiều học viên đánh lái sớm quá.',
    },
    {
      type: 'image',
      src: '/images/center/san-tap-xe-tap-lai.webp',
      alt: 'Xe tập lái màu bạc gắn biển TẬP LÁI đỗ trong ô kẻ vạch vàng tại sân tập',
      width: 960,
      height: 720,
      caption:
        'Ảnh chụp thật tại sân tập của trung tâm — nơi học viên luyện bài ghép xe trước khi ra sa hình chính thức.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Dùng gương thế nào cho đúng',
      id: 'dung-guong-dung-cach',
    },
    {
      type: 'paragraph',
      text: 'Học viên hay mắc lỗi chỉ nhìn một bên gương suốt cả bài. Bên đó vào đẹp nhưng bên kia đã chạm vạch từ lúc nào. Hãy tập thói quen liếc luân phiên: gương phía chuồng để canh khoảng cách, gương bên kia để kiểm tra đầu xe không quét ra ngoài.',
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Chỉnh gương trước khi vào bài',
      text: 'Gương ngoài nên chỉnh sao cho bạn thấy được một phần thân xe ở mép trong. Phần thân xe đó là thước đo để bạn biết mình đang cách vạch bao xa. Không thấy thân xe thì bạn đang đoán chứ không phải đang canh.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Khi đã vào lệch mà chưa muốn bỏ',
      id: 'khi-vao-lech',
    },
    {
      type: 'paragraph',
      text: 'Nếu bạn phát hiện xe đang lệch nhưng chưa chạm vạch, còn kịp cứu. Nguyên tắc là tiến lên một đoạn ngắn để giảm góc lệch rồi lùi lại, chứ không phải cố đánh lái mạnh hơn trong lúc vẫn đang lùi. Đánh lái mạnh khi đã lệch chỉ làm đầu xe quét rộng thêm.',
    },
    {
      type: 'paragraph',
      text: 'Nếu đã chạm vạch thì đừng cố chữa nữa, hãy hoàn thành bài cho gọn và giữ tâm lý cho các bài sau. Một bài mất điểm không đồng nghĩa với cả kỳ thi hỏng, nhưng mất bình tĩnh thì kéo theo cả chuỗi.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Cách luyện cho nhanh vào',
      id: 'cach-luyen-nhanh-vao',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Tập riêng động tác đưa xe vào vị trí chuẩn bị, lặp mười lần liền, chưa lùi gì cả.',
        'Sau đó mới tập lùi, và lùi thật chậm để kịp quan sát.',
        'Khi đã vào được, tập lại đúng động tác đó thêm ba lần liên tiếp không sai để cơ thể ghi nhớ.',
        'Cuối buổi, ghép bài này vào chuỗi sa hình đầy đủ, vì trong thi thật bạn sẽ vào bài với tâm lý khác hẳn lúc tập lẻ.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Nếu bạn tập mãi mà vẫn hay lệch, thường vấn đề nằm ở vị trí chuẩn bị hoặc ở chỗ ngồi chưa cố định giữa các lần. Nhắn cho tôi biết bạn đang vướng ở bước nào, chúng ta xử lý đúng bước đó.',
    },
  ],
};
