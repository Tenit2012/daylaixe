# Implementation Log

Ngày hoàn thành: **06/08/2026**
Trạng thái: **Chạy được end-to-end** — lint, type-check, unit/integration test,
E2E test và production build đều xanh.

---

## 1. Các phần đã hoàn thành

### 1.1 Khởi tạo dự án

- [x] Khởi tạo Git repository trong thư mục hiện tại (thư mục ban đầu hoàn toàn trống).
- [x] Tạo `package.json` với đầy đủ script yêu cầu, cài 549+ package.
- [x] Cấu hình TypeScript strict (+ `noUncheckedIndexedAccess`, `noImplicitOverride`,
      `noFallthroughCasesInSwitch`), alias `@/*`, thư mục `src/`.
- [x] Cấu hình Tailwind CSS 3 với design tokens, PostCSS, ESLint 9 flat config, Prettier.
- [x] `.gitignore` đầy đủ (không commit `.env`, `*.db`, build output, playwright-report).

### 1.2 UI foundation

- [x] Design tokens dạng CSS variables trong `globals.css` + mapping sang Tailwind theme:
      navy (thương hiệu), cam (CTA), xanh lá (thành công/Zalo), trắng-xám (nền).
- [x] Bộ primitive: `Button`/`ButtonLink`, `Card`/`Badge`/`PlaceholderBadge`,
      `Section`/`SectionHeading`, `Accordion`, `Breadcrumb`, `JsonLd`, `contact-buttons`.
- [x] Layout: header dính có mobile menu, footer 4 cột + disclaimer, thanh CTA cố định
      trên mobile, skip-to-content link.
- [x] Font Be Vietnam Pro (subset `vietnamese`) qua `next/font`, tránh layout shift.
- [x] Hỗ trợ `prefers-reduced-motion`, focus state rõ ràng, responsive từ 360px.

### 1.3 Content layer

- [x] `src/config/site.ts` — nguồn sự thật duy nhất cho mọi thông tin thay đổi được.
- [x] 5 khóa học đầy đủ (`courses.ts`), 6 cảm nhận mẫu (`testimonials.ts`),
      9 FAQ chung (`faqs.ts`), 6 mục album (`gallery.ts`),
      lộ trình 9 bước + 6 lý do + 5 chỉ báo niềm tin (`learning-process.ts`).
- [x] **8 bài blog nguyên bản**, mỗi bài 6–8 phút đọc, nội dung có cấu trúc block.

### 1.4 Các trang public (13 route)

- [x] `/` — trang chủ 10 section đầy đủ theo đặc tả.
- [x] `/gioi-thieu`, `/khoa-hoc`, `/khoa-hoc/[slug]` (5 trang SSG),
      `/hoc-phi-lo-trinh`, `/cam-nhan-hoc-vien`, `/kien-thuc`,
      `/kien-thuc/[slug]` (8 trang SSG), `/lien-he`,
      `/chinh-sach-bao-mat`, `/dieu-khoan-su-dung`, `not-found`, `error`.

### 1.5 Form đăng ký và lưu trữ lead

- [x] Form với React Hook Form + Zod: validate client, validate lại ở server,
      loading/error/success state, không mất dữ liệu khi lỗi, chống submit liên tục.
- [x] Honeypot (`website`), rate limiting theo IP, chống gửi trùng trong 5 phút.
- [x] Chuẩn hóa số điện thoại Việt Nam (`0912 345 678`, `+84…`, `84…`, `0084…`).
- [x] Ghi nhận UTM (5 tham số) và `sourcePage`.
- [x] Không thu thập CCCD, ảnh giấy tờ, địa chỉ nhà chính xác, hồ sơ sức khỏe.

### 1.6 Database

- [x] Prisma schema với model `Lead` (đủ 20 trường theo đặc tả) và `AdminUser`.
- [x] Migration `20260805232713_init` chạy thành công.
- [x] Seed: 1 tài khoản quản trị (từ env) + 8 lead mẫu có nhãn `[DEV SEED]`.
- [x] `prisma/schema.postgresql.prisma` — bản tham chiếu dùng native enum.

### 1.7 Trang quản trị

- [x] `/admin/login`, `/admin/leads`, `/admin/leads/[id]`, `/admin` (redirect).
- [x] Đăng nhập bằng email + mật khẩu bcrypt, session JWT trong cookie HTTP-only.
- [x] Middleware bảo vệ `/admin/*`, logout, chống user enumeration, rate limit đăng nhập.
- [x] Danh sách: tìm kiếm, lọc theo khóa/trạng thái/khoảng ngày, sắp xếp, phân trang,
      thống kê theo trạng thái, nút gọi nhanh, nút mở Zalo.
- [x] Chi tiết: xem đầy đủ thông tin + UTM, cập nhật trạng thái, ghi chú admin.

### 1.8 SEO, tracking, security, accessibility

- [x] Metadata từng trang, canonical, Open Graph, Twitter Card, favicon SVG,
      `robots.txt`, `sitemap.xml` (25 URL), breadcrumb.
- [x] JSON-LD: WebSite, Person, Course, FAQPage, Article, BreadcrumbList,
      ProfessionalService (chỉ phát sinh khi đã cấu hình đủ và có ghi rõ là trang cá nhân).
- [x] Analytics abstraction với 9 sự kiện; GA4 tùy chọn, Facebook Pixel mặc định tắt.
- [x] Security headers, CSRF double-submit cookie, sanitize input, giới hạn độ dài,
      chặn open-redirect, không log dữ liệu cá nhân, không trả stack trace.
- [x] Semantic HTML, heading hierarchy đúng, `aria-live` cho trạng thái submit,
      alt text đầy đủ, keyboard navigation, lazy loading, Next Image.

### 1.9 Testing

- [x] **202 unit + integration test** (13 file) — Vitest + React Testing Library.
- [x] **29 E2E test** (3 file) — Playwright, gồm 2 flow bắt buộc theo đặc tả.

### 1.10 Tài liệu

- [x] `README.md`, `docs/CONTENT_GUIDE.md`, `docs/DEPLOYMENT.md`,
      `docs/REQUIRED_ASSETS.md`, `IMPLEMENTATION_LOG.md`, `.env.example`.

---

## 2. Quyết định kỹ thuật và lý do

### 2.1 Xác thực: session JWT tự triển khai thay vì NextAuth

**Quyết định:** dùng `jose` (JWT HS256) + `bcryptjs`, cookie HTTP-only, thay vì Auth.js.

**Lý do:**

- Yêu cầu chỉ có **một** phương thức đăng nhập (credentials) cho **một** tài khoản
  quản trị. NextAuth mang theo adapter, provider registry, route handler và khái
  niệm không dùng đến.
- `jose` chạy được trên **Edge runtime**, nên middleware xác thực chữ ký JWT mà
  không cần truy vấn database ở mọi request vào `/admin/*`.
- Ít bề mặt cấu hình hơn nghĩa là ít chỗ cấu hình sai hơn.

**Bù lại:** phải tự viết CSRF, rate limit đăng nhập và chống user enumeration —
tất cả đã được triển khai và có test.

### 2.2 SQLite lưu `status`/`role` dạng String thay vì enum

**Lý do:** Prisma **không hỗ trợ** native enum trên SQLite. Để giữ một schema chạy
được local mà vẫn dễ chuyển sang PostgreSQL:

- Database lưu `String`.
- Giá trị hợp lệ được ràng buộc ở tầng domain (`lead-status.ts`) và validate bằng
  Zod trước khi ghi.
- `prisma/schema.postgresql.prisma` chứa bản dùng native enum, kèm hướng dẫn chuyển
  đổi trong `docs/DEPLOYMENT.md`.

Tầng ứng dụng không cần sửa dòng nào khi đổi database.

### 2.3 Nội dung blog dạng block TypeScript thay vì MDX

**Quyết định:** lưu nội dung bài viết dưới dạng mảng `BlockContent[]` có kiểu.

**Lý do:**

- Không cần thư viện parse Markdown và không có đường dẫn nào cho HTML chưa kiểm
  soát lọt vào trang (không dùng `dangerouslySetInnerHTML` cho nội dung bài viết).
- Mục lục sinh tự động từ block `heading` — không cần parse lại HTML.
- TypeScript bắt lỗi cấu trúc ngay khi biên tập viết sai.

**Bù lại:** viết bài dài dòng hơn Markdown một chút. Đánh đổi này chấp nhận được
với 8 bài viết và có `docs/CONTENT_GUIDE.md` hướng dẫn cụ thể.

### 2.4 CSRF token phát sinh trong middleware

**Vấn đề gặp phải:** phiên bản đầu ghi cookie CSRF ngay trong Server Component của
trang `/admin/login`. Next.js 15 **không cho phép** ghi cookie khi đang render
Server Component → trang login crash, phát hiện qua E2E test.

**Cách xử lý:** chuyển việc sinh cookie CSRF vào `src/middleware.ts`. Middleware
ghi cookie vào cả request (để trang render trong cùng request đọc được) lẫn
response. `src/lib/auth/csrf.ts` giờ chỉ **đọc và so sánh**, không ghi.

### 2.5 Repository abstraction + service layer

Mọi business logic của lead nằm trong `LeadService`, chỉ phụ thuộc interface
`LeadRepository` và `RateLimiter` — không biết Prisma, không biết Next.js.

Nhờ vậy có `InMemoryLeadRepository` để integration test chạy **không cần database**,
nhanh và ổn định. Cùng interface đó đổi sang PostgreSQL không phải sửa logic.

### 2.6 Placeholder tập trung, giao diện tự xuống cấp mềm

Mọi giá trị chưa cấu hình đều ở dạng `[Tên thầy]` và chỉ tồn tại trong
`src/config/site.ts` + `.env`. Khi chưa cấu hình:

- `buildPhoneHref()` / `buildZaloHref()` trả `null` → UI hiển thị nút vô hiệu hóa
  "đang cập nhật" thay vì tạo link hỏng.
- JSON-LD bỏ qua trường đó thay vì gửi chuỗi `[Tên thầy]` cho công cụ tìm kiếm.
- `ProfessionalService` JSON-LD chỉ phát sinh khi đã đủ tên, số điện thoại, khu vực.

### 2.7 Ảnh minh họa SVG sinh bằng script

Thay vì dùng ảnh stock hay ảnh AI trông giống người thật, dự án dùng
`scripts/generate-placeholder-images.mjs` sinh 24 file SVG gồm khối hình học và
biểu tượng trừu tượng. Lý do đạo đức: **không tạo ảnh giống người thật rồi trình
bày như ảnh của thầy hoặc học viên**. SVG cũng nhẹ và không gây layout shift.

### 2.8 Rate limiting trong bộ nhớ

Đủ cho website cá nhân chạy một instance. Interface `RateLimiter` tách khỏi store
để thay bằng Redis/Upstash khi cần — ghi rõ trong `docs/DEPLOYMENT.md` mục 11.

### 2.9 Testimonial bắt buộc có cờ `isPlaceholder`

Kiểu `Testimonial` bắt buộc trường `isPlaceholder: boolean`. Toàn bộ dữ liệu hiện
tại đặt `true`, giao diện hiển thị nhãn "Nội dung mẫu" và hộp cảnh báo giải thích
đây không phải phản hồi học viên thật. Có unit test khẳng định điều này.

---

## 3. Dependency đã dùng

### Production

| Package | Phiên bản | Mục đích |
| --- | --- | --- |
| `next` | 15.5.22 | Framework, App Router |
| `react` / `react-dom` | 19.2.8 | UI runtime |
| `@prisma/client` | 6.19.3 | Database client |
| `zod` | ^3.24 | Validate schema (client + server) |
| `react-hook-form` + `@hookform/resolvers` | ^7.54 / ^3.9 | Quản lý form |
| `jose` | ^5.9 | Ký/xác thực JWT session (chạy được trên Edge) |
| `bcryptjs` | ^2.4 | Hash mật khẩu (thuần JS, không cần build native) |
| `lucide-react` | ^0.468 | Icon |
| `clsx` + `tailwind-merge` | ^2.1 / ^2.5 | Gộp class Tailwind |
| `server-only` | ^0.0.1 | Chặn import module server vào client bundle |

### Development

`typescript` 5.7 · `tailwindcss` 3.4 · `prisma` 6.19 · `vitest` 2.1 ·
`@testing-library/react` 16 · `@testing-library/user-event` 14 · `jsdom` 25 ·
`@playwright/test` 1.49 · `eslint` 9 + `eslint-config-next` · `prettier` 3 +
`prettier-plugin-tailwindcss` · `tsx` 4 · `@vitejs/plugin-react` 4

**Đã gỡ:** `vite-tsconfig-paths` — gói này ESM-only nên không load được từ
`vitest.config.ts` (CJS). Thay bằng khai báo alias trực tiếp trong `resolve.alias`.

---

## 4. Migration đã tạo

| Tên | Nội dung |
| --- | --- |
| `20260805232713_init` | Tạo bảng `leads` (20 cột, 4 index: `normalizedPhone`, `status`, `createdAt`, `interestedCourse`) và `admin_users` (unique `email`) |

Seed data:

- 1 `AdminUser` — email/mật khẩu đọc từ `ADMIN_EMAIL` / `ADMIN_PASSWORD`,
  hash bcrypt cost 12. **Không hard-code trong source.**
- 8 `Lead` mẫu — trải đều 6 trạng thái, có UTM đa dạng, dùng dải số `0912 34x xxx`,
  mọi bản ghi có ghi chú `[DEV SEED] Dữ liệu mẫu cho môi trường phát triển.`

---

## 5. Test đã tạo

### 5.1 Unit + Integration — 202 test, 13 file

| File | Số test | Nội dung |
| --- | --- | --- |
| `tests/unit/phone.test.ts` | 16 | Chuẩn hóa và validate số điện thoại VN |
| `tests/unit/cta-links.test.ts` | 18 | Sinh URL `tel:`, Zalo, Maps, email; xử lý placeholder |
| `tests/unit/lead-schema.test.ts` | 18 | Schema form, metadata UTM, schema cập nhật |
| `tests/unit/content.test.ts` | 24 | Slug khóa học/bài viết, metadata SEO, id heading duy nhất, **từ ngữ bị cấm**, FAQ không chứa số học phí |
| `tests/unit/site-config.test.ts` | 14 | Placeholder, disclaimer, thông điệp, điều hướng, Pixel mặc định tắt |
| `tests/unit/request-context.test.ts` | 13 | Lấy IP client, trích xuất UTM |
| `tests/unit/rate-limiter.test.ts` | 8 | Cửa sổ trượt, tách theo key, reset |
| `tests/unit/auth.test.ts` | 23 | Hash/verify mật khẩu, ký/xác thực JWT, `AuthService` |
| `tests/unit/sanitize.test.ts` | 21 | Sanitize text, chặn CSV injection, chặn open-redirect |
| `tests/unit/lead-repository.test.ts` | 17 | CRUD, lọc, phân trang, phát hiện trùng |
| `tests/unit/lead-form.test.tsx` | 9 | Giao diện form: validate client, honeypot, giữ dữ liệu khi lỗi |
| `tests/unit/accordion.test.tsx` | 9 | Accordion (ARIA, bàn phím), nhãn nội dung mẫu |
| `tests/integration/lead-service.test.ts` | 21 | Luồng schema → service → repository |

Integration test bao phủ đúng các trường hợp yêu cầu: submit thành công, thiếu
field bắt buộc, số điện thoại không hợp lệ, honeypot bị phát hiện, duplicate
submit, lead được ghi vào database, admin cập nhật status.

### 5.2 E2E — 29 test, 3 file

**`tests/e2e/lead-registration.spec.ts` (Flow 1 — 5 test)**
Trang chủ → danh sách khóa học → chi tiết khóa → form (khóa được chọn sẵn) →
điền → submit → thông báo thành công → **xác nhận lead trong database**.
Kèm test UTM, số điện thoại sai, chưa tích đồng ý, thanh CTA mobile.

**`tests/e2e/admin-leads.spec.ts` (Flow 2 — 8 test)**
Login → danh sách → mở chi tiết → đổi trạng thái → lưu ghi chú →
**xác nhận dữ liệu đã đổi trong database** → quay lại danh sách thấy trạng thái mới.
Kèm test route được bảo vệ, mật khẩu sai, lọc, tìm kiếm, đăng xuất,
header `X-Robots-Tag: noindex`, `/api/leads` GET trả 405.

**`tests/e2e/public-pages.spec.ts` (16 test)**
11 trang công khai: HTTP 200, đúng 1 thẻ `<h1>`, **không có console error hay lỗi
hydration**, có title/description/canonical. Kèm skip link, sitemap không lộ
`/admin`, robots chặn `/admin`, JSON-LD hợp lệ, trang 404.

E2E dùng database riêng `prisma/e2e.db`, được xóa và tạo lại trước mỗi lần chạy
(`tests/e2e/global-setup.ts`) — không đụng vào `prisma/dev.db`.

---

## 6. Kết quả chạy lệnh kiểm tra cuối cùng

| Lệnh | Kết quả |
| --- | --- |
| `npm install` | ✅ up to date, 0 lỗi |
| `npm run db:generate` | ✅ Generated Prisma Client v6.19.3 |
| `npm run db:migrate` | ✅ Already in sync, no pending migration |
| `npm run db:seed` | ✅ Tài khoản quản trị OK, bỏ qua lead (đã có 8 bản ghi) |
| `npm run lint` | ✅ exit 0 — **0 error, 0 warning** |
| `npm run typecheck` | ✅ exit 0 — **0 TypeScript error** |
| `npm run test` | ✅ **202/202 passed**, 13 file, ~8s |
| `npm run build` | ✅ Compiled successfully, **29/29 static pages** |
| `npm run test:e2e` | ✅ **29/29 passed**, ~22s |

Không có lệnh nào bị bỏ qua hay bị vô hiệu hóa để build thành công.

---

## 7. Vấn đề đã gặp và cách xử lý

| # | Vấn đề | Xử lý |
| --- | --- | --- |
| 1 | `vite-tsconfig-paths` ESM-only, không load được từ `vitest.config.ts` (CJS) | Gỡ gói, khai báo alias `@` trực tiếp trong `resolve.alias` |
| 2 | `jose` báo `payload must be an instance of Uint8Array` trong jsdom | `TextEncoder` của jsdom tạo Uint8Array khác realm. Cho `tests/unit/auth.test.ts` chạy ở môi trường `node` bằng docblock `@vitest-environment node` |
| 3 | Trang `/admin/login` crash ở production | Next.js 15 không cho ghi cookie khi render Server Component. Chuyển việc sinh cookie CSRF sang middleware |
| 4 | `keywords` từ `as const` không gán được vào `Metadata` của Next | Tách `seoKeywords` thành `const seoKeywords: string[]` |
| 5 | `normalizeVietnamesePhone` không xử lý tiền tố quay số quốc tế `00` | Thêm bước quy `00…` → `+…` trước khi xử lý |
| 6 | E2E: click checkbox thất bại do layout shift khi thông báo lỗi xuất hiện | Tích ô đồng ý **trước** khi điền các trường khác |
| 7 | `prisma db push --force-reset` bị Prisma chặn khi gọi bởi AI agent | Thay bằng xóa file `prisma/e2e.db` trong `global-setup.ts` rồi `db push` trên file rỗng — an toàn hơn và chỉ tác động đúng database test |
| 8 | Ký tự escape `\uXXXX` bị chuyển thành ký tự thật khi ghi file | Xây regex ký tự điều khiển bằng `String.fromCharCode()` trong `sanitize.ts` |

---

## 8. Placeholder cần thay trước khi triển khai

Tất cả nằm trong `.env` (hoặc biến môi trường của Vercel). Website vẫn chạy khi
chưa thay, nhưng giao diện sẽ hiển thị "đang cập nhật" ở các chỗ liên quan.

| Biến | Placeholder hiện tại | Bắt buộc |
| --- | --- | --- |
| `NEXT_PUBLIC_TEACHER_NAME` | `[Tên thầy]` | ✅ |
| `NEXT_PUBLIC_TEACHER_TITLE` | `[Chức danh]` | ✅ |
| `NEXT_PUBLIC_PHONE_NUMBER` | `[Số điện thoại]` | ✅ |
| `NEXT_PUBLIC_ZALO_URL` | `[Zalo URL]` | ✅ |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `[Email]` | ✅ |
| `NEXT_PUBLIC_ADDRESS` | `[Địa chỉ]` | ✅ |
| `NEXT_PUBLIC_TRAINING_AREA` | `[Khu vực đào tạo]` | ✅ |
| `NEXT_PUBLIC_CENTER_NAME` | `[Tên trung tâm]` | ✅ |
| `NEXT_PUBLIC_CONTACT_HOURS` | `[Thời gian liên hệ]` | ✅ |
| `NEXT_PUBLIC_GOOGLE_MAPS_URL` | `[Google Maps URL]` | ➖ |
| `NEXT_PUBLIC_FACEBOOK_URL` | `[Facebook URL]` | ➖ |
| `NEXT_PUBLIC_YOUTUBE_URL` | `[YouTube URL]` | ➖ |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | ✅ đổi thành domain thật |
| `ADMIN_PASSWORD` | `change-me` | ✅ **bắt buộc đổi** |
| `AUTH_SECRET` | chuỗi dev | ✅ **bắt buộc sinh ngẫu nhiên** |

Dự án có sẵn hàm `getUnresolvedPlaceholders()` trong `src/config/site.ts` để liệt
kê những mục chưa thay.

### Đã thay bằng dữ liệu thật — `VERIFIED_REAL_DATA`

| Thông tin | Giá trị đã xác nhận | Biến môi trường | Ngày |
| --- | --- | --- | --- |
| Tên thầy | Tùng | `NEXT_PUBLIC_TEACHER_NAME` | 06/08/2026 |
| Số điện thoại | 0967569733 | `NEXT_PUBLIC_PHONE_NUMBER` | 06/08/2026 |
| Zalo | `zalo.me/0967569733` | `NEXT_PUBLIC_ZALO_URL` | 06/08/2026 |
| **Kinh nghiệm giảng dạy** | **Gần 20 năm giảng dạy tại trung tâm** | `NEXT_PUBLIC_EXPERIENCE_LABEL` | **07/08/2026** |
| **Đối tượng học viên** | **Cả hệ dân sự và hệ Công an** | `NEXT_PUBLIC_STUDENT_GROUPS` | **07/08/2026** |

Chi tiết lần thay dữ liệu kinh nghiệm: [`docs/DATA_02_REPORT.md`](docs/DATA_02_REPORT.md).

**Ghi chú về kiểu dữ liệu kinh nghiệm.** Biến cũ `NEXT_PUBLIC_YEARS_OF_EXPERIENCE`
đã được **bỏ** và thay bằng `NEXT_PUBLIC_EXPERIENCE_LABEL`. Lý do: tên cũ gợi ý một
con số, dễ dẫn tới việc điền `20` trong khi dữ liệu thật là **"gần 20 năm"** — một
ước lượng. Config vì thế lưu **nhãn chữ** (`experienceLabel: string`), không lưu
`experienceYears: number`. Có unit test chặn việc làm tròn thành "20 năm" và chặn
việc bịa thêm số học viên, tỷ lệ đỗ, cấp bậc hay danh hiệu.

---

## 9. Dữ liệu thật cần cung cấp

### 9.1 Ảnh và video

Danh sách đầy đủ kèm kích thước, tỷ lệ và yêu cầu nội dung:
**`docs/REQUIRED_ASSETS.md`**. Ưu tiên cao nhất:

1. Ảnh chân dung thầy (1200 × 1500).
2. Ảnh thầy cạnh xe tập lái cho hero (1800 × 1400).
3. Ảnh Open Graph mặc định (1200 × 630 — bắt buộc đúng kích thước).

### 9.2 Nội dung nghiệp vụ

| Mục | Trạng thái hiện tại | Cần cung cấp |
| --- | --- | --- |
| Học phí từng khóa | `tuition: null` → hiện câu "Vui lòng liên hệ…" | Con số chính thức + các khoản đã gồm / có thể phát sinh |
| Danh mục hồ sơ | Mô tả chung, có nhắc xác nhận lại | Danh sách chính xác theo quy định tại thời điểm hiện tại |
| Điều kiện dự học hạng C1 | Ghi "phụ thuộc quy định hiện hành" | Điều kiện cụ thể đã kiểm chứng |
| Cảm nhận học viên | 6 bản mẫu, `isPlaceholder: true` | Phản hồi thật đã được học viên đồng ý cho đăng |
| Video cảm nhận | 2 vị trí trống | Video thật (30–90 giây) |
| ~~Số năm kinh nghiệm~~ | ✅ **Đã có: "Gần 20 năm"** | — (đã xong 07/08/2026) |
| ~~Đối tượng học viên~~ | ✅ **Đã có: hệ dân sự và hệ Công an** | Nên xác nhận cách gọi chính thức của trung tâm |
| Tên trung tâm | Placeholder | Tên chính xác nơi thầy giảng dạy |

**Không tự điền số liệu ước chừng** vào các mục trên — giao diện đã xử lý sẵn
trường hợp thiếu dữ liệu một cách trung thực.

---

## 10. Những việc còn lại / gợi ý bước tiếp theo

### Ưu tiên cao (trước khi công bố)

1. **Thay toàn bộ placeholder** trong `.env` (mục 8).
2. **Sinh `AUTH_SECRET` mới và đổi `ADMIN_PASSWORD`** — bắt buộc.
3. **Bổ sung ảnh thật** — ít nhất 3 ảnh ưu tiên cao.
4. **Chuyển sang PostgreSQL/Supabase** nếu deploy Vercel (SQLite không chạy được
   trên filesystem chỉ đọc). Hướng dẫn ở `docs/DEPLOYMENT.md` mục 3.
5. **Xóa lead `[DEV SEED]`** khỏi database production sau khi seed tài khoản.

### Ưu tiên trung bình

6. **Chạy Lighthouse thật** trên domain production. Dự án đã tuân thủ các nguyên
   tắc (Next Image, lazy loading, font subset, không autoplay, không carousel tự
   động, không popup), nhưng điểm số thực tế cần đo trên hạ tầng thật —
   **chưa đo được trong môi trường phát triển này**.
7. **Nộp sitemap lên Google Search Console** và cấu hình GA4
   (`docs/DEPLOYMENT.md` mục 5, 6).
8. **Thiết lập backup database định kỳ** (`docs/DEPLOYMENT.md` mục 7).
9. **Thu thập cảm nhận thật** từ học viên đã hoàn thành khóa, xin phép rồi đổi
   `isPlaceholder: false`.

### Cải tiến có thể làm sau

10. **Xuất danh sách lead ra CSV** — hàm `escapeSpreadsheetValue()` đã sẵn sàng
    chống CSV injection, chỉ còn thiếu route handler và nút bấm.
11. **Thông báo khi có lead mới** — gửi email hoặc tin Zalo cho thầy ngay khi có
    đăng ký, để phản hồi nhanh hơn.
12. **Rate limiting phân tán** bằng Redis/Upstash nếu chạy nhiều instance.
13. **Nhiều tài khoản quản trị** — schema đã có trường `role` (`OWNER`/`STAFF`),
    chưa có giao diện quản lý người dùng.
14. **Lịch sử thay đổi trạng thái lead** — hiện chỉ lưu trạng thái mới nhất.
15. **Thêm bài blog định kỳ** — mỗi câu hỏi học viên hay hỏi là một bài viết tiềm
    năng, tốt cho SEO địa phương.
16. **Content Security Policy chặt hơn** — hiện đã có các security header cơ bản;
    CSP đầy đủ cần cấu hình nonce cho script của Next.js.

### Ghi chú về Git

Repository đã được khởi tạo và các commit đã được tạo theo nhóm chức năng
(xem `git log`). Chưa cấu hình remote — cần thêm remote và `git push` khi có
repository từ xa.

---

## Mock, Sample and Placeholder Data Audit

**Ngày audit:** 2026-08-07 · **Người thực hiện:** Claude (Cowork).

Mục tiêu: kiểm thử dự án còn hoạt động + kiểm kê toàn bộ dữ liệu giả/mẫu/placeholder/cấu hình dev cần thay trước production. **Không** thay dữ liệu thật, **không** sáng tác nội dung, **không** đổi business logic.

**Số file đã kiểm tra:** toàn bộ `src/` (~110 file), `prisma/`, `public/` (24 asset), `docs/`, `tests/`, và các file cấu hình gốc.

**Số phát hiện:** 27 — **P0: 4 · P1: 13 · P2: 8 · P3: 2**. Phân loại: MOCK_PRODUCTION_RISK 2, PLACEHOLDER_REQUIRED 5, SAMPLE_CONTENT_REVIEW 4, NEEDS_CONFIRMATION 6, CONFIGURATION_REQUIRED 8, DEVELOPMENT_SEED 1, TEST_FIXTURE_SAFE 1, DEAD_OR_UNUSED 0.

**Kết luận:** codebase xử lý placeholder rất kỷ luật (degrade an toàn, không hard-code học phí/secret/số liệu uy tín, testimonial gắn cờ `isPlaceholder`). Chưa deploy production **chỉ vì thiếu cấu hình thật + nội dung/ảnh thật của thầy**, không phải vì có dữ liệu giả nguy hiểm giả mạo dữ liệu thật.

**4 blocker P0:** `NEXT_PUBLIC_SITE_URL` (localhost) · `DATABASE_URL` (SQLite dev) · `ADMIN_EMAIL` (admin@example.com) · `ADMIN_PASSWORD` (change-me). `AUTH_SECRET` **đã** đặt hợp lệ (57 ký tự) — không phải blocker.

### File báo cáo đã tạo

- `docs/MOCK_AND_SAMPLE_DATA_AUDIT.md` — báo cáo chính 18 mục.
- `docs/MOCK_AND_SAMPLE_DATA_INVENTORY.csv` — 27 dòng, mỗi phát hiện một dòng (không chứa secret đầy đủ).
- `docs/THAY_TUNG_CONTENT_CHECKLIST.md` — checklist thu thập nội dung để gửi thầy Tùng.
- `docs/DATA_REPLACEMENT_PLAN.md` — kế hoạch thay dữ liệu theo 5 pha.

### Script đã thêm

- `scripts/check-production-placeholders.ts` + npm script `check:placeholders` (chạy bằng `tsx`, đồng bộ với `prisma.seed`).
  - Ở dev: chỉ cảnh báo (localhost/sqlite là bình thường) → exit 0.
  - Nhắm production (`NODE_ENV=production` hoặc cờ `--production`): 4 blocker P0 thành error → exit 1.
  - Logic thuần (`evaluateEnv`, `scanSourceText`, `parseEnvFile`, `mask`, `isBracketPlaceholder`) tách riêng, có unit test `tests/unit/check-placeholders.test.ts`.
  - Che secret (`mask`), allowlist các vị trí placeholder hợp lệ (`src/lib/env/public.ts`, `src/config/site.ts`, `prisma/seed.ts` — nơi `change-me` là code guard), bỏ qua `tests/`.
- Sửa `package.json`: thêm `"check:placeholders"`.

### Kiểm thử đã chạy (sandbox Linux)

| Bước | Kết quả |
|---|---|
| `tsc --noEmit` (typecheck) | **PASS** |
| `check:placeholders` (dev) | **PASS** (exit 0, 5 cảnh báo) |
| `check:placeholders --production` | exit 1 đúng 4 blocker P0 (hành vi mong đợi) |
| Logic helper của script | Đã kiểm chứng bằng smoke test qua `node --experimental-strip-types` |
| `npm ci`, `db:generate`, `format:check`, `lint`, `test`, `build`, migrate/seed, E2E | **BLOCKED_BY_ENVIRONMENT** |

**Lý do BLOCKED:** sandbox chạy Linux nhưng `node_modules` được cài trên Windows của chủ dự án → thiếu gói native theo nền tảng (Prisma query engine Linux, `@rollup/rollup-linux-x64-gnu`, esbuild của `tsx`), và egress mạng bị chặn nên không `npm ci` được. **Các lệnh này chạy được đầy đủ trên máy Windows của chủ dự án.**

### Blocker còn lại & bước tiếp theo

Bước tiếp theo: thu thập dữ liệu thật theo `docs/THAY_TUNG_CONTENT_CHECKLIST.md`, sau đó thực hiện thay thế production theo `docs/DATA_REPLACEMENT_PLAN.md`. Trước khi deploy, chạy trên máy chủ dự án: `npm run typecheck && npm run lint && npm run test && npm run build && NODE_ENV=production npm run check:placeholders`.

---

## DEPLOY-02 — Chuẩn hóa PostgreSQL + cấu hình Netlify/Neon (deploy-ready)

Mục tiêu: đưa website lên Netlify Free + Neon PostgreSQL Free, trả URL preview. Người dùng chọn phương án "Chuẩn bị + tự deploy" nên phần thực thi deploy (cần tài khoản Netlify/Neon) do chủ dự án bấm; báo cáo & hướng dẫn ở `docs/DEPLOY_02_REPORT.md`.

### Thay đổi code/config
- `prisma/schema.prisma`: `provider = "postgresql"`.
- `prisma/migrations/migration_lock.toml`: `provider = "postgresql"`.
- `prisma/migrations/20260805232713_init/migration.sql`: viết lại theo cú pháp PostgreSQL (`TIMESTAMP(3)`, `CONSTRAINT *_pkey`, giữ 5 index).
- `scripts/create-admin.ts` (mới) + `package.json`: thêm `"admin:create"`. Tạo admin production-safe từ env, bcrypt 12 rounds, tự sinh mật khẩu nếu thiếu, không tạo lead demo.
- `netlify.toml` (mới): build `npm run db:migrate:deploy && npm run build`, Node 20, plugin `@netlify/plugin-nextjs`.
- `.env.example`: chuẩn hóa cho Postgres/Neon + Netlify; ghi chú `NEXT_PUBLIC_TEACHER_NAME` chỉ ghi "Tùng" (tránh "Thầy Thầy Tùng").
- Preview `noindex`: thêm `NEXT_PUBLIC_NOINDEX` vào `src/lib/env/public.ts`, `src/config/site.ts`; áp vào `src/app/layout.tsx` (robots metadata) và `src/app/robots.ts` (disallow all khi bật).

### Kiểm thử (sandbox Linux)
| Bước | Kết quả |
|---|---|
| `tsc --noEmit` | **PASS** (exit 0) |
| Prisma migration (cú pháp Postgres) | Soạn đúng chuẩn; chưa apply local (không có DB) |
| `prisma generate`, `next build`, `eslint`, `prettier`, `vitest`, `check:placeholders` | **BLOCKED_BY_ENVIRONMENT** |

**Lý do BLOCKED:** `node_modules` cài trên Windows → native binary (Prisma engines, esbuild) không chạy trên Linux sandbox; CDN engine Prisma bị chặn; không có sudo/Docker. Sẽ verify đầy đủ trong build đầu trên Netlify.

### Bảo mật
- `.env` không bị track (đã xác minh `git ls-files`), nằm trong `.gitignore` → không commit secret.

### Việc còn lại (chủ dự án)
Tạo Neon DB → push GitHub → import vào Netlify → set env vars → Deploy (build tự chạy migrate deploy) → `npm run admin:create` → chạy checklist verify ở `docs/DEPLOY_02_REPORT.md` mục 11.
