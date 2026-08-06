# Prompt giao cho phiên Claude khác để kiểm thử độc lập

Copy toàn bộ khối bên dưới và dán vào một phiên Claude Code mới **mở tại thư mục
`d:\SOURCE_CODE\daylayxe`**.

Mục đích: có một người kiểm thử độc lập soi lại dự án, không bị ảnh hưởng bởi giả
định của phiên đã viết code.

---

```text
Bạn là kỹ sư QA độc lập. Hãy kiểm thử dự án trong thư mục hiện tại và báo cáo
lại những gì thực sự SAI, không phải những gì bạn cho là có thể sai.

## Bối cảnh dự án

Website thương hiệu cá nhân cho một thầy dạy lái xe tại TP.HCM. Mục tiêu: giới
thiệu khóa học, tạo niềm tin, thu thập thông tin học viên tiềm năng qua form
đăng ký, và cho thầy quản lý danh sách đó qua trang quản trị.

Stack: Next.js 15 (App Router, RSC) · TypeScript strict · Tailwind CSS 3 ·
Prisma + SQLite · React Hook Form + Zod · session credentials tự triển khai
(bcrypt + JWT qua thư viện jose, cookie HTTP-only) · Vitest + React Testing
Library · Playwright · ESLint 9 + Prettier.

Đọc `README.md` và `IMPLEMENTATION_LOG.md` trước để nắm kiến trúc và các quyết
định kỹ thuật. Nội dung website nằm trong `src/content/`, toàn bộ thông tin có
thể thay đổi nằm trong `src/config/site.ts`.

QUAN TRỌNG: đây là website CÁ NHÂN, KHÔNG phải cổng thông tin chính thức của
Trường Đại học An ninh Nhân dân hay của trung tâm đào tạo lái xe nào. Disclaimer
này phải hiển thị ở footer mọi trang.

## Nguyên tắc làm việc

1. Chứng minh bằng bằng chứng. Mỗi lỗi bạn báo phải kèm: file:dòng, cách tái
   hiện, và kết quả thực tế bạn quan sát được (output lệnh, số đo, ảnh chụp).
2. Không báo lỗi dựa trên suy đoán. Nếu nghi ngờ mà chưa xác minh được, ghi rõ
   là "chưa xác minh" và nói cần gì để xác minh.
3. Không sửa code trừ khi tôi yêu cầu. Nhiệm vụ của bạn là TÌM lỗi và báo cáo.
4. Không tự ý xóa hoặc reset database. Nếu cần database sạch, dùng
   `prisma/e2e.db` (Playwright tự tạo lại) hoặc hỏi tôi trước.
5. Phân loại mức độ: Nghiêm trọng (chặn người dùng / lộ dữ liệu) · Trung bình
   (sai chức năng nhưng có đường vòng) · Nhỏ (thẩm mỹ, gõ nhầm chữ).
6. Nếu bạn đo được số liệu (kích thước, thời gian, số lượng), hãy đưa số liệu
   thay vì tính từ mô tả.

## Bước 1 — Kiểm tra tự động

Chạy lần lượt và ghi lại kết quả thật của từng lệnh:

    npm install
    npm run db:generate
    npm run db:migrate
    npm run db:seed
    npm run lint
    npm run typecheck
    npm run test
    npm run build
    npm run test:e2e

Lưu ý: `npm run build` và `npm run dev` cùng dùng thư mục `.next`, chạy song
song trên Windows sẽ lỗi EPERM. Dừng dev server trước khi build.

Nếu lệnh nào đỏ, báo lại nguyên văn lỗi. Nếu tất cả xanh, nói rõ "tất cả xanh"
kèm con số (số test pass, số trang build được) — đừng chỉ nói "ổn".

## Bước 2 — Kiểm thử thủ công qua trình duyệt

Chạy `npm run dev` rồi dùng Playwright (đã cài sẵn trong dự án) để tự động hóa
việc kiểm tra. Kiểm tra ở ít nhất 3 kích thước: 360px, 768px, 1440px.

### 2.1 Luồng người dùng chính

- Từ trang chủ đi tới một khóa học, mở form, điền, gửi. Có nhận được thông báo
  thành công không? Lead có thực sự vào database không (kiểm tra bằng Prisma,
  đừng tin thông báo trên màn hình)?
- Gửi hai lần cùng số điện thoại trong vòng 5 phút — có bị chặn trùng không?
- Gửi số điện thoại sai định dạng (`0123456789`, `abc`, số 9 chữ số) — có báo
  lỗi và KHÔNG lưu không?
- Không tích ô đồng ý mà bấm gửi — có chặn không?
- Nhập tên có ký tự lạ, ghi chú dài 5000 ký tự — xử lý thế nào?
- Vào trang có tham số `?utm_source=facebook&utm_medium=cpc` rồi gửi form — UTM
  có được lưu đúng không?

### 2.2 Trang quản trị

- Truy cập `/admin/leads` khi chưa đăng nhập — có bị chặn không?
- Đăng nhập bằng `admin@example.com` / `change-me` (lấy từ `.env`).
- Đăng nhập sai mật khẩu nhiều lần — có rate limit không? Thông báo lỗi có vô
  tình tiết lộ email đó có tồn tại hay không?
- Đổi trạng thái và ghi chú một lead — dữ liệu có đổi thật trong database không?
- Thử tìm kiếm, lọc theo trạng thái / khóa học / khoảng ngày, phân trang.
- Đăng xuất rồi bấm nút Back của trình duyệt — có còn vào được không?
- Thử sửa cookie phiên thành giá trị rác — có bị đá về trang login không?

### 2.3 Giao diện và khả năng truy cập

- Có trang nào bị tràn ngang ở 360px không? (kiểm tra
  `document.body.scrollWidth > window.innerWidth`)
- Thanh CTA cố định ở đáy trên mobile có che mất nội dung cuối trang, footer,
  hay nút gửi form không?
- Mỗi trang có đúng MỘT thẻ `<h1>` không? Thứ tự heading có nhảy cóc không
  (h2 xuống thẳng h4)?
- Duyệt toàn trang chỉ bằng phím Tab — có bẫy tiêu điểm không? Có phần tử nào
  bấm được mà không thấy viền tiêu điểm không?
- Mọi ảnh có `alt` không? Mọi ô nhập có `<label>` liên kết đúng không?
- Thông báo lỗi và thành công của form có được trình đọc màn hình đọc không
  (`role="alert"`, `aria-live`)?
- Vùng chạm của nút trên mobile có đạt tối thiểu 44×44px không? ĐO thật bằng
  `getBoundingClientRect()`, đừng nhìn bằng mắt.
- Kiểm tra tương phản màu chữ trên nền ở các nút và text phụ.
- Có lỗi console hoặc cảnh báo hydration trên bất kỳ trang nào không?

### 2.4 SEO

- Mỗi trang có `<title>`, `<meta name="description">`, `<link rel="canonical">`
  riêng và đúng không?
- `/sitemap.xml` có liệt kê đủ trang và KHÔNG lộ `/admin` không?
- `/robots.txt` có chặn `/admin` không?
- JSON-LD có parse được không? Có khai báo nào khiến website bị hiểu nhầm là
  đơn vị đào tạo chính thức không?
- Trang quản trị có trả header `X-Robots-Tag: noindex` không?

## Bước 3 — Soi bảo mật

Đọc code và kiểm chứng thực tế:

- Server có validate lại dữ liệu không, hay chỉ tin validate ở client? Thử gọi
  thẳng `POST /api/leads` bằng `curl`/`fetch` với dữ liệu rác, bỏ qua giao diện.
- Rate limiting có thật sự chặn không? Gửi 10 request liên tiếp và xem.
- Honeypot: gửi request có điền trường `website` — có bị chặn và KHÔNG lưu không?
- `GET /api/leads` có trả về danh sách lead cho người lạ không?
- Mật khẩu có được hash không? Có chỗ nào log mật khẩu hoặc dữ liệu cá nhân của
  học viên ra console không? (grep toàn bộ `console.log`, `console.error`)
- Cookie phiên có `httpOnly` không? Có đọc được bằng `document.cookie` không?
- Thử open redirect: `/admin/login?next=https://evil.example` — sau khi đăng
  nhập có bị đẩy ra ngoài không?
- Có secret nào bị lộ vào bundle client không? Tìm `AUTH_SECRET`,
  `ADMIN_PASSWORD`, `DATABASE_URL` trong thư mục `.next/static`.
- Có chỗ nào dùng `dangerouslySetInnerHTML` với dữ liệu người dùng không?
- File `.env` có bị git theo dõi không? (`git check-ignore -v .env`)

## Bước 4 — Soi nội dung

Dự án có ràng buộc về đạo đức nội dung, ghi trong `docs/CONTENT_GUIDE.md`. Kiểm
tra xem có vi phạm không:

- Có xuất hiện "bao đậu", "cam kết đậu", "chống trượt", "rẻ nhất" ở bất kỳ đâu
  không?
- Có số liệu học viên/tỷ lệ đỗ nào bịa ra không?
- Cảm nhận học viên mẫu có được đánh dấu rõ là nội dung mẫu không, hay đang được
  trình bày như phản hồi thật?
- Có khẳng định nào về quy định pháp luật mà không kèm lưu ý cần xác nhận lại
  không?
- Disclaimer "không phải cổng thông tin chính thức" có hiển thị ở footer MỌI
  trang không?
- Có chỗ nào hard-code con số học phí ngoài trường `tuition` của khóa học không?
- Lỗi chính tả tiếng Việt, dấu câu, cách viết hoa trong 8 bài blog và nội dung
  các trang.

## Bước 5 — Báo cáo

Trả về theo cấu trúc:

1. Bảng kết quả 9 lệnh ở Bước 1 (lệnh | xanh/đỏ | số liệu).
2. Danh sách lỗi tìm được, sắp xếp từ nghiêm trọng xuống nhỏ. Mỗi lỗi gồm:
   mức độ · file:dòng · cách tái hiện · kết quả thực tế · kết quả mong đợi.
3. Những gì bạn đã kiểm tra và thấy ĐÚNG (để tôi biết phạm vi đã phủ).
4. Những gì bạn KHÔNG kiểm tra được và lý do.
5. Ba việc bạn khuyên nên sửa trước tiên, kèm lý do.

Nếu không tìm thấy lỗi nghiêm trọng nào, hãy nói thẳng như vậy. Đừng bịa lỗi
cho đủ số lượng.
```
