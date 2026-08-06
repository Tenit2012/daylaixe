# Hướng dẫn biên tập nội dung

Tài liệu này dành cho người cập nhật nội dung website. Bạn không cần biết lập
trình sâu — chỉ cần sửa đúng file được chỉ ra và giữ đúng định dạng.

---

## 0. Nguyên tắc bắt buộc

Đây là những quy tắc không được vi phạm, kể cả khi muốn nội dung "hấp dẫn hơn".

### 0.1 Không dùng ngôn từ cam kết kết quả

**Tuyệt đối không** dùng:

- "Bao đậu"
- "Cam kết đậu 100%"
- "Chống trượt"
- "Rẻ nhất thị trường"
- Bất kỳ cách diễn đạt nào hàm ý bảo đảm kết quả kỳ sát hạch

Có một unit test tự động (`tests/unit/content.test.ts`) kiểm tra các cụm từ này.
Nếu bạn thêm chúng vào nội dung, `npm run test` sẽ báo lỗi.

**Thay bằng:** mô tả cách làm cụ thể. Ví dụ thay "cam kết đậu" bằng
"luyện từng bài sa hình đến khi thao tác thành phản xạ".

### 0.2 Không dùng số liệu giả

Không viết "đã đào tạo 5.000 học viên", "tỷ lệ đỗ 98%" nếu không có số liệu thật
kiểm chứng được. Các chỉ báo tạo niềm tin trên trang chủ được viết theo hướng
**định tính** ("Hướng dẫn dễ hiểu", "Lịch học linh hoạt") thay vì con số.

### 0.3 Không trình bày nội dung mẫu như dữ liệu thật

Mọi cảm nhận học viên hiện có đều là **bản mẫu do đội ngũ biên tập viết** để minh
họa bố cục. Chúng được đánh dấu `isPlaceholder: true` và giao diện hiển thị nhãn
"Nội dung mẫu" kèm một hộp cảnh báo giải thích rõ điều này.

### 0.4 Không khẳng định quy định pháp luật chưa kiểm chứng

Điều kiện dự học, danh mục hồ sơ, lệ phí và tiêu chí chấm điểm đều do quy định
hiện hành xác định và có thể thay đổi. Nội dung nên viết theo hướng:

> "Danh mục hồ sơ có thể thay đổi theo quy định hiện hành. Bạn hãy liên hệ để
> nhận danh sách được cập nhật đúng tại thời điểm nộp."

### 0.5 Không hard-code học phí trong FAQ

Học phí chỉ được khai báo ở trường `tuition` của từng khóa học. FAQ và các đoạn
văn khác chỉ nói về **cách tính** và **các khoản gồm những gì**, không nêu con số.
Có test tự động kiểm tra điều này.

### 0.6 Giữ nguyên disclaimer

Câu disclaimer ở footer khẳng định website không phải cổng thông tin chính thức
của Trường Đại học An ninh Nhân dân hoặc Trung tâm đào tạo lái xe. Không được xóa
hoặc làm nhẹ đi. Nó nằm trong `src/config/site.ts` và có test bảo vệ.

Cũng không được dùng logo, màu sắc hay cách trình bày khiến người xem hiểu nhầm
đây là trang chính thức của một đơn vị nào.

---

## 1. Sửa thông tin cơ bản của thầy

Toàn bộ thông tin liên hệ và nhận diện nằm ở **một nơi duy nhất**.

**Cách 1 (khuyến nghị)** — sửa file `.env` ở thư mục gốc:

```env
NEXT_PUBLIC_TEACHER_NAME="Nguyễn Văn A"
NEXT_PUBLIC_TEACHER_TITLE="Giáo viên dạy thực hành lái xe"
NEXT_PUBLIC_PHONE_NUMBER="0912345678"
NEXT_PUBLIC_ZALO_URL="https://zalo.me/0912345678"
NEXT_PUBLIC_CONTACT_EMAIL="thay.a@example.com"
NEXT_PUBLIC_ADDRESS="123 Đường ABC, TP. Thủ Đức, TP.HCM"
NEXT_PUBLIC_TRAINING_AREA="TP. Thủ Đức và các quận lân cận"
NEXT_PUBLIC_GOOGLE_MAPS_URL="https://maps.app.goo.gl/..."
NEXT_PUBLIC_CENTER_NAME="Trung tâm đào tạo lái xe ..."
NEXT_PUBLIC_YEARS_OF_EXPERIENCE="hơn 10 năm"
NEXT_PUBLIC_CONTACT_HOURS="7:00 - 20:00 hằng ngày"
```

Sau khi sửa, khởi động lại dev server (`npm run dev`).

**Cách 2** — sửa giá trị mặc định trong `src/config/site.ts`.

### Điều gì xảy ra khi chưa cấu hình?

Website vẫn chạy bình thường. Giá trị chưa cấu hình hiện ở dạng `[Tên thầy]`, và
giao diện tự động:

- Ẩn hoặc vô hiệu hóa nút gọi / nút Zalo thay vì tạo link hỏng.
- Hiển thị "Số điện thoại đang cập nhật", "Địa chỉ sẽ được cập nhật"…
- Bỏ trường tương ứng ra khỏi JSON-LD để không đưa dữ liệu giả cho công cụ tìm kiếm.

---

## 2. Thêm hoặc sửa khóa học

File: `src/content/courses.ts`

```ts
{
  slug: 'ten-khoa-hoc-khong-dau',   // duy nhất, chữ thường, gạch ngang
  name: 'Tên đầy đủ hiển thị',
  shortName: 'Tên ngắn',            // dùng trong dropdown form đăng ký
  licenseClass: 'B',                // 'B' | 'C1' | 'BO_TUC' | 'SA_HINH'
  summary: 'Mô tả 1-2 câu cho card và meta description.',
  description: 'Đoạn mô tả dài cho trang chi tiết.',
  suitableFor: ['Đối tượng 1', 'Đối tượng 2'],
  vehicleType: 'Loại xe dùng khi thực hành',
  estimatedDuration: 'Khoảng 3 tháng, tùy lịch học và lịch sát hạch',
  curriculum: [
    { title: 'Tên phần học', details: 'Mô tả nội dung phần này.' },
  ],
  requiredDocuments: ['Giấy tờ 1', 'Giấy tờ 2'],
  tuition: null,                    // xem mục 2.1
  faqs: [{ question: '...', answer: '...' }],
  highlights: ['Điểm nổi bật 1', 'Điểm nổi bật 2'],
  image: {
    src: '/images/courses/ten-khoa-hoc.svg',
    alt: 'Mô tả ảnh cho người dùng trình đọc màn hình',
    width: 800,
    height: 500,
  },
  featured: true,                   // hiện trên trang chủ
  order: 6,                         // thứ tự hiển thị
}
```

Sau khi thêm, những thứ sau **tự động cập nhật**: trang `/khoa-hoc`, trang chi
tiết `/khoa-hoc/<slug>`, dropdown trong mọi form đăng ký, bảng so sánh trên trang
học phí, `sitemap.xml`, JSON-LD `Course`.

### 2.1 Học phí

```ts
// Chưa chốt học phí — giao diện hiển thị câu "Vui lòng liên hệ..."
tuition: null,

// Đã chốt học phí
tuition: {
  displayValue: '12.000.000 đ',
  included: ['Học phí đào tạo lý thuyết', 'Giờ thực hành theo chương trình'],
  mayIncurAdditional: ['Lệ phí sát hạch', 'Khám sức khỏe', 'Giờ thực hành thêm'],
  note: 'Mức thu cần được xác nhận lại tại thời điểm đăng ký.',
},
```

**Không bao giờ điền số ước chừng.** Nếu chưa có con số chính thức, để `null`.

---

## 3. Thêm câu hỏi thường gặp

FAQ chung toàn site: `src/content/faqs.ts`

```ts
{
  question: 'Câu hỏi ngắn gọn, đúng cách người học hay hỏi?',
  answer: 'Trả lời cụ thể, giọng đời thường, tối thiểu vài câu.',
  category: 'Chọn khóa học',   // Bắt đầu học | Chọn khóa học | Lịch học | Hồ sơ | Học phí | Bổ túc | Địa điểm
}
```

FAQ riêng của một khóa: thêm vào trường `faqs` của khóa đó trong `courses.ts`.

FAQ chung được đưa vào JSON-LD `FAQPage` trên trang chủ, nên câu trả lời cần
chính xác và không hứa hẹn quá.

---

## 4. Thêm bài viết blog

**Bước 1** — tạo file mới trong `src/content/blog/`, ví dụ `bai-viet-moi.ts`:

```ts
import type { BlogPost } from '@/types/content';

export const post: BlogPost = {
  slug: 'duong-dan-bai-viet-khong-dau',
  title: 'Tiêu đề bài viết',
  description: 'Mô tả 1-2 câu, dùng cho SEO và card. Nên dài hơn 40 ký tự.',
  publishedAt: '2026-08-06',
  updatedAt: '2026-08-06',
  author: 'Thầy dạy lái xe',
  category: 'Kinh nghiệm học lái',  // hoặc: Chuẩn bị hồ sơ | Kỹ năng lái xe | Tâm lý khi lái xe
  readingTimeMinutes: 6,
  coverImage: {
    src: '/images/blog/anh-bia.svg',
    alt: 'Mô tả ảnh bìa',
    width: 1200,
    height: 630,
  },
  tags: ['từ khóa 1', 'từ khóa 2'],
  relatedSlugs: ['slug-bai-lien-quan-1', 'slug-bai-lien-quan-2'],
  content: [
    { type: 'paragraph', text: 'Đoạn mở đầu.' },
    { type: 'heading', level: 2, text: 'Tiêu đề mục', id: 'tieu-de-muc' },
    { type: 'paragraph', text: 'Nội dung mục.' },
    { type: 'list', ordered: false, items: ['Ý 1', 'Ý 2'] },
    { type: 'callout', tone: 'tip', title: 'Mẹo nhỏ', text: 'Nội dung mẹo.' },
    { type: 'quote', text: 'Câu trích đáng nhớ.' },
  ],
};
```

**Bước 2** — mở `src/content/blog/index.ts`, import và thêm vào mảng `allPosts`.

### Các loại block nội dung

| `type` | Thuộc tính | Dùng khi |
| --- | --- | --- |
| `paragraph` | `text` | Đoạn văn thường |
| `heading` | `level` (2 hoặc 3), `text`, `id` | Tiêu đề mục — `id` phải **duy nhất trong bài** |
| `list` | `ordered` (true/false), `items[]` | Danh sách gạch đầu dòng hoặc đánh số |
| `callout` | `tone` (`info`/`warning`/`tip`), `title`, `text` | Hộp lưu ý nổi bật |
| `quote` | `text` | Trích dẫn |

**Tự động sinh:** mục lục (từ các block `heading`), bài viết liên quan, metadata
SEO, canonical, Open Graph, JSON-LD `Article`, và mục trong `sitemap.xml`.

### Quy tắc viết bài

- Nội dung phải **nguyên bản**. Không sao chép từ website khác.
- Không khẳng định quy định pháp lý chưa kiểm chứng — dùng callout `warning` để
  nhắc người đọc xác nhận lại tại cơ sở đào tạo.
- Kết bài bằng lời mời liên hệ tự nhiên, không thúc ép.
- `id` của heading viết không dấu, chữ thường, gạch ngang. Có test tự động kiểm
  tra `id` không trùng nhau trong cùng một bài.

---

## 5. Thêm hoặc sửa cảm nhận học viên

File: `src/content/testimonials.ts`

```ts
{
  id: 'tm-07',                       // duy nhất
  name: 'Tên hiển thị',
  courseSlug: 'hang-b-so-tu-dong',   // phải khớp slug của một khóa học
  period: 'Tháng 6/2026',
  quote: 'Nội dung cảm nhận, giữ đúng giọng của học viên.',
  isPlaceholder: false,              // ★ xem bên dưới
  avatarInitial: 'G',
}
```

### 5.1 Đánh dấu nội dung thật vs nội dung mẫu

Trường `isPlaceholder` là **bắt buộc** và có ý nghĩa pháp lý / đạo đức:

| Giá trị | Ý nghĩa | Giao diện |
| --- | --- | --- |
| `true` | Nội dung mẫu do biên tập viết | Hiện nhãn "Nội dung mẫu" + hộp cảnh báo giải thích |
| `false` | Phản hồi thật của học viên | Hiển thị bình thường |

**Chỉ đặt `false` khi cả ba điều sau đều đúng:**

1. Đây là phản hồi có thật của một học viên có thật.
2. Học viên đã **đồng ý** cho đăng công khai.
3. Nội dung **không bị sửa theo hướng phóng đại**. Sửa lỗi chính tả thì được;
   thêm câu khen mà học viên không nói thì không.

Đăng đánh giá giả là hành vi lừa dối người tiêu dùng. Đừng làm.

### 5.2 Bảo vệ thông tin học viên

- Không đăng họ tên đầy đủ nếu học viên không muốn — dùng tên rút gọn.
- Không đăng số điện thoại, địa chỉ nhà hay ảnh giấy tờ của học viên.
- Ảnh có mặt học viên chỉ đăng khi có sự đồng ý rõ ràng.
- Khi học viên yêu cầu gỡ, gỡ ngay và xóa cả dữ liệu trong trang quản trị.

### 5.3 Video cảm nhận

Danh sách video ở cuối `testimonials.ts`, trường `videoUrl` đang để `null` (chỉ
hiển thị khung chờ). Khi có video thật và học viên đồng ý, điền URL vào.

---

## 6. Sửa album hình ảnh

File: `src/content/gallery.ts`

Mỗi mục cần `image.alt` mô tả rõ nội dung ảnh (bắt buộc, phục vụ người dùng trình
đọc màn hình) và `isPlaceholder` đánh dấu ảnh minh họa hay ảnh thật.

Ảnh thật cần cung cấp và kích thước đề xuất: xem `docs/REQUIRED_ASSETS.md`.

**Không hotlink ảnh không rõ bản quyền.** Chỉ dùng ảnh tự chụp hoặc ảnh được phép
sử dụng, và đặt file trong thư mục `public/images/`.

---

## 7. Sửa lộ trình học và lý do chọn thầy

File: `src/content/learning-process.ts` — chứa ba nhóm dữ liệu:

- `learningProcess` — 9 bước từ liên hệ đến nhận bằng
- `whyChooseReasons` — các card "Vì sao nên học cùng thầy"
- `trustIndicators` — chỉ báo tạo niềm tin ở hero

Trường `icon` là tên icon của lucide-react. Danh sách icon được phép nằm trong
`src/components/ui/icon.tsx` — nếu dùng icon mới, thêm vào file đó trước.

---

## 8. Kiểm tra sau khi sửa nội dung

```bash
npm run test        # kiểm tra ràng buộc nội dung (từ ngữ cấm, slug, id heading...)
npm run typecheck   # kiểm tra sai kiểu dữ liệu
npm run build       # đảm bảo build được
```

Nếu `npm run test` báo lỗi ở `tests/unit/content.test.ts`, đọc kỹ thông báo —
thường là do vi phạm một trong các nguyên tắc ở mục 0.
