# Website tuyển sinh cá nhân — Thầy dạy lái xe

Landing page cá nhân của Thầy Tùng — **giáo viên cơ hữu** tại Trung tâm Dạy
nghề, Đào tạo và Sát hạch Lái xe, Trường Đại học An ninh Nhân dân. Mục tiêu:
chứng minh người dạy và nơi học là có thật, rồi đưa học viên tới ba kênh liên hệ
trực tiếp — **điện thoại, Zalo, Facebook**.

Đây là **website tĩnh hoàn toàn**: không biểu mẫu, không database, không trang
quản trị, không API route. `npm run build` sinh ra thư mục `out/` deploy thẳng
lên **Cloudflare Pages** — xem [`docs/CLOUDFLARE_PAGES_DEPLOY.md`](docs/CLOUDFLARE_PAGES_DEPLOY.md).

> **Lưu ý quan trọng — hai ý phải đi cùng nhau**
> Thầy Tùng **là giáo viên cơ hữu** của Trung tâm (dữ liệu đã xác nhận), nhưng
> website này là trang **cá nhân** của thầy, **không phải** cổng thông tin chính
> thức của Trung tâm hay Nhà trường. Nêu thiếu vế đầu thành phủ nhận quan hệ có
> thật; thiếu vế sau thành mạo danh. Disclaimer đầy đủ hiển thị ở footer mọi
> trang và trong các trang pháp lý.

---

## 1. Tính năng chính

**Trang chủ** xếp theo đúng thứ tự câu hỏi của người đang cân nhắc đăng ký:
hero → dải bằng chứng → về thầy → video buổi học thật → học ở đâu (địa chỉ +
bản đồ) → quy trình 6 bước → khóa học → cách thầy hướng dẫn → album ảnh → FAQ →
liên hệ.

- Danh sách khóa học và trang chi tiết cho từng khóa (route động, prerender sẵn).
- Trang học phí & lộ trình với bảng so sánh khóa học và lộ trình 9 bước đầy đủ.
- Blog kiến thức với 8 bài viết nguyên bản, mục lục tự động, bài viết liên quan.
- Trang liên hệ, chính sách bảo mật, điều khoản sử dụng.
- CTA theo kích thước màn hình: dưới 1024px là thanh ngang cố định đáy màn hình,
  từ 1024px trở lên là hai nút nổi góc phải. Không popup, không đếm ngược.
- SEO: metadata từng trang, canonical, Open Graph, Twitter Card, `robots.txt`,
  `sitemap.xml`, `manifest.webmanifest`, breadcrumb, JSON-LD (Person,
  EducationalOrganization, Course, FAQPage, Article, BreadcrumbList,
  ProfessionalService). **Không** sinh rating/review giả.

**Ba kênh liên hệ**

Nút Gọi, Zalo và Facebook dùng chung một cơ chế: đường dẫn được dựng từ
`src/config/site.ts`. Khi giá trị trong `.env` còn là placeholder dạng
`[Facebook URL]`, nút Gọi/Zalo hiển thị trạng thái "đang cập nhật" còn nút
Facebook tự ẩn — không bao giờ tạo ra link hỏng.

**Cảm nhận học viên** đã được gỡ khỏi website ở đợt refactor 13/08/2026 vì toàn
bộ là nội dung mẫu. Hướng dẫn khôi phục khi có cảm nhận thật nằm trong
`src/types/content.ts`.

---

## 2. Công nghệ sử dụng

| Thành phần               | Lựa chọn                                             |
| ------------------------ | ---------------------------------------------------- |
| Framework                | Next.js 15 (App Router, React Server Components)     |
| Ngôn ngữ                 | TypeScript (strict mode, `noUncheckedIndexedAccess`) |
| UI                       | Tailwind CSS 3 + design tokens dạng CSS variables    |
| Icon                     | lucide-react (+ icon Zalo/Facebook tự vẽ)            |
| Kiểm tra biến môi trường | Zod                                                  |
| Unit test                | Vitest + React Testing Library                       |
| E2E test                 | Playwright                                           |
| Chất lượng mã            | ESLint 9 (flat config) + Prettier                    |

Nội dung website được quản lý bằng **TypeScript data files** trong `src/content/`
— không phụ thuộc CMS bên ngoài.

---

## 3. Cấu trúc thư mục

```text
src/
  app/                      # App Router
    page.tsx                # Trang chủ
    gioi-thieu/
    khoa-hoc/               # Danh sách + [slug] chi tiết
    hoc-phi-lo-trinh/
    kien-thuc/              # Blog + [slug] bài viết
    lien-he/
    chinh-sach-bao-mat/
    dieu-khoan-su-dung/
    sitemap.ts, robots.ts, manifest.ts, not-found.tsx, error.tsx
  components/
    layout/                 # header, footer, CTA mobile + CTA nổi, analytics
    sections/               # các section của trang chủ và trang con
    courses/ blog/ gallery/ ui/
  config/site.ts            # ★ Toàn bộ thông tin có thể thay đổi
  content/                  # courses, faqs, gallery, trust, videos,
                            # registration-process, learning-process, blog/...
  lib/                      # analytics, env, seo, utils, validation
  types/
assets/{photos,videos}/     # File GỐC chưa xử lý - không phục vụ ra web
public/
  images/{teacher,center,courses,gallery,blog,brand,og}/
  videos/
  _headers                  # Header HTTP cho Cloudflare Pages
scripts/                    # Xử lý ảnh/video, sinh placeholder, kiểm tra placeholder
tests/{unit,e2e}/
docs/
out/                        # ★ Kết quả build - thư mục deploy lên Cloudflare
```

Nguyên tắc phân tách: **Content** (`src/content`), **UI** (`src/components`),
**Cấu hình** (`src/config/site.ts`), **Tiện ích dùng chung** (`src/lib`).

Riêng với ảnh và video: `assets/` là **nguồn**, `public/` là **kết quả**.
Đừng sửa tay file trong `public/` — chạy `node scripts/process-photos.mjs` hoặc
`node scripts/process-video.mjs` để sinh lại. Chi tiết:
[`assets/README.md`](assets/README.md).

---

## 4. Yêu cầu môi trường

- **Node.js >= 20.9** (đã kiểm thử trên 20.14)
- **npm >= 10**
- Không cần database, không cần dịch vụ ngoài nào.

---

## 5. Cài đặt và chạy

```bash
# 1. Cài dependency
npm install

# 2. Tạo file .env từ mẫu rồi điền giá trị thật
cp .env.example .env        # Windows: copy .env.example .env

# 3. Chạy môi trường phát triển
npm run dev
```

Mở http://localhost:3000

### Các lệnh có sẵn

| Lệnh                         | Công dụng                                  |
| ---------------------------- | ------------------------------------------ |
| `npm run dev`                | Chạy dev server                            |
| `npm run build`              | Static export → sinh thư mục `out/`        |
| `npm run preview`            | Phục vụ `out/` tại http://localhost:4173   |
| `npm run lint`               | ESLint                                     |
| `npm run lint:fix`           | ESLint tự sửa                              |
| `npm run typecheck`          | `tsc --noEmit`                             |
| `npm run test`               | Unit test (Vitest)                         |
| `npm run test:watch`         | Vitest chế độ theo dõi                     |
| `npm run test:e2e`           | Playwright E2E (cần `npm run build` trước) |
| `npm run test:e2e:install`   | Tải trình duyệt cho Playwright             |
| `npm run format`             | Prettier                                   |
| `npm run check:placeholders` | Cảnh báo biến môi trường còn placeholder   |

---

## 6. Biến môi trường

Xem `.env.example` để có danh sách đầy đủ kèm chú thích. Tóm tắt:

| Biến                            | Bắt buộc | Ghi chú                                                                   |
| ------------------------------- | -------- | ------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | ✅       | Dùng cho canonical, OG, sitemap                                           |
| `NEXT_PUBLIC_TEACHER_NAME`      | ✅       | Tên thầy                                                                  |
| `NEXT_PUBLIC_PHONE_NUMBER`      | ✅       | Số điện thoại liên hệ                                                     |
| `NEXT_PUBLIC_ZALO_URL`          | ✅       | URL Zalo hoặc số điện thoại                                               |
| `NEXT_PUBLIC_CENTER_NAME`       | ✅       | Tên đầy đủ trung tâm — dùng ở `<h1>`, disclaimer, JSON-LD                 |
| `NEXT_PUBLIC_ADDRESS`           | ✅       | Địa chỉ trung tâm                                                         |
| `NEXT_PUBLIC_CONSULT_LOCATION`  | ➖       | Vị trí trong trung tâm, ví dụ "Lầu 2, trong khuôn viên trung tâm"         |
| `NEXT_PUBLIC_GOOGLE_MAPS_URL`   | ✅       | Thiếu thì nút "Đến tư vấn tại trung tâm" tự ẩn                            |
| `NEXT_PUBLIC_FACEBOOK_URL`      | ➖       | `facebook.com/...` hoặc `m.me/...`; để placeholder thì nút Facebook tự ẩn |
| `NEXT_PUBLIC_CONTACT_EMAIL`     | ✅       | Email liên hệ                                                             |
| `NEXT_PUBLIC_*` còn lại         | ➖       | Khu vực đào tạo, giờ liên hệ, YouTube...                                  |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ➖       | Để trống thì website vẫn chạy bình thường                                 |
| `GOOGLE_SITE_VERIFICATION`      | ➖       | Xác minh Google Search Console                                            |

Mọi biến `NEXT_PUBLIC_*` chưa cấu hình sẽ rơi về placeholder dạng `[Tên thầy]`,
và giao diện tự chuyển sang trạng thái "đang cập nhật" thay vì tạo link hỏng.

---

## 7. Cách thay đổi nội dung

### 7.1 Đổi tên thầy, số điện thoại, Zalo, Facebook

**Cách khuyến nghị** — sửa `.env` rồi khởi động lại server:

```env
NEXT_PUBLIC_TEACHER_NAME="Nguyễn Văn A"
NEXT_PUBLIC_PHONE_NUMBER="0912345678"
NEXT_PUBLIC_ZALO_URL="https://zalo.me/0912345678"
NEXT_PUBLIC_FACEBOOK_URL="https://www.facebook.com/ten.trang"
NEXT_PUBLIC_CONTACT_EMAIL="thay.a@example.com"
```

Toàn bộ header, footer, hero, nút gọi, nút Zalo, nút Facebook, disclaimer,
SEO title và JSON-LD đều đọc từ một nơi duy nhất:
[`src/config/site.ts`](src/config/site.ts).
Không có placeholder nào rải rác trong component.

Cách thứ hai: sửa trực tiếp giá trị mặc định trong `src/config/site.ts`.

### 7.2 Thêm khóa học

Mở [`src/content/courses.ts`](src/content/courses.ts), thêm một phần tử vào mảng
`courses`. Trang chi tiết `/khoa-hoc/<slug>`, sitemap, dropdown trong form đăng
ký và bảng so sánh học phí đều tự cập nhật.

Để trống học phí bằng `tuition: null` — giao diện sẽ hiển thị câu
"Vui lòng liên hệ để nhận thông tin học phí…". **Không tự điền số ước chừng.**

### 7.3 Thêm bài blog

1. Tạo file mới trong [`src/content/blog/`](src/content/blog/), export
   `post: BlogPost`.
2. Import và thêm vào mảng trong `src/content/blog/index.ts`.

Mục lục, thời gian đọc, bài viết liên quan, metadata SEO và JSON-LD `Article`
được sinh tự động.

### 7.4 Thêm FAQ và cảm nhận học viên

- FAQ chung: [`src/content/faqs.ts`](src/content/faqs.ts)
- FAQ riêng của khóa: trường `faqs` trong từng khóa học
- Cảm nhận: [`src/content/testimonials.ts`](src/content/testimonials.ts)

Mọi cảm nhận mẫu **bắt buộc** có `isPlaceholder: true`. Chỉ đặt `false` khi đó là
phản hồi thật và học viên đã đồng ý cho đăng. Xem
[`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md).

### 7.5 Thay ảnh

Ảnh hiện tại là hình minh họa SVG trong `public/images/`, được sinh bởi
`node scripts/generate-placeholder-images.mjs`.

Để thay bằng ảnh thật: đặt file vào đúng đường dẫn tương ứng rồi cập nhật `src`,
`width`, `height`, `alt` trong file content liên quan. Danh sách ảnh cần cung cấp
kèm kích thước đề xuất: [`docs/REQUIRED_ASSETS.md`](docs/REQUIRED_ASSETS.md).

---

## 8. Kiểm thử

```bash
npm run format:check   # Prettier
npm run lint           # ESLint
npm run typecheck      # tsc --noEmit
npm run test           # 91 unit test (Vitest)
npm run build          # bắt buộc trước khi chạy E2E - sinh ra out/
npm run test:e2e       # 33 E2E test chạy TRỰC TIẾP trên out/ (Playwright)
```

Lần đầu chạy E2E cần tải trình duyệt: `npm run test:e2e:install`.

E2E cố ý phục vụ thẳng thư mục `out/` thay vì chạy `next start` — vừa vì
`next start` không dùng được với static export, vừa để kiểm chứng đúng thứ sẽ
được deploy.

---

## 9. Triển khai

`npm run build` sinh ra thư mục **`out/`** — đẩy thẳng lên Cloudflare Pages.

| Trường                 | Giá trị                      |
| ---------------------- | ---------------------------- |
| Build command          | `npm run build`              |
| Build output directory | `out`                        |
| Framework preset       | Next.js (Static HTML Export) |

Hướng dẫn đầy đủ (biến môi trường, tên miền, DNS, header, xử lý sự cố):
[`docs/CLOUDFLARE_PAGES_DEPLOY.md`](docs/CLOUDFLARE_PAGES_DEPLOY.md).

---

## 10. Tài liệu khác

- [`docs/CLOUDFLARE_PAGES_DEPLOY.md`](docs/CLOUDFLARE_PAGES_DEPLOY.md) — hướng dẫn triển khai
- [`docs/REFACTOR_01_REPORT.md`](docs/REFACTOR_01_REPORT.md) — báo cáo đợt refactor 13/08/2026
- [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md) — hướng dẫn biên tập nội dung
- [`docs/REQUIRED_ASSETS.md`](docs/REQUIRED_ASSETS.md) — ảnh và video cần cung cấp
- [`docs/TRUST_AUDIT_REPORT.md`](docs/TRUST_AUDIT_REPORT.md) — audit độ tin cậy
- [`assets/README.md`](assets/README.md) — quy trình xử lý ảnh/video
- [`IMPLEMENTATION_LOG.md`](IMPLEMENTATION_LOG.md) — nhật ký triển khai, quyết định
  kỹ thuật và những việc còn lại
