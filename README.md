# Website tuyển sinh cá nhân — Thầy dạy lái xe

Website thương hiệu cá nhân cho một thầy đang giảng dạy / hỗ trợ tuyển sinh tại
Trung tâm đào tạo lái xe. Mục tiêu: giới thiệu khóa học, tạo niềm tin, thu thập
thông tin học viên tiềm năng và giúp thầy quản lý danh sách đó qua trang quản trị.

> **Lưu ý quan trọng**
> Đây là website **cá nhân**, **không phải** cổng thông tin chính thức của
> Trường Đại học An ninh Nhân dân hoặc của Trung tâm đào tạo lái xe.
> Disclaimer này được hiển thị ở footer mọi trang và trong các trang chính sách.

---

## 1. Tính năng chính

**Phần công khai**

- Trang chủ đầy đủ: hero, lý do chọn thầy, khóa học nổi bật, lộ trình 9 bước,
  giới thiệu thầy, cảm nhận học viên, album ảnh, FAQ, form đăng ký.
- Danh sách khóa học và trang chi tiết cho từng khóa (route động).
- Trang học phí & lộ trình với bảng so sánh khóa học.
- Trang cảm nhận học viên có bộ lọc theo khóa.
- Blog kiến thức với 8 bài viết nguyên bản, mục lục tự động, bài viết liên quan.
- Trang liên hệ, chính sách bảo mật, điều khoản sử dụng.
- Thanh CTA cố định ở đáy màn hình trên điện thoại (Gọi / Zalo / Đăng ký).
- SEO: metadata từng trang, canonical, Open Graph, Twitter Card, `robots.txt`,
  `sitemap.xml`, breadcrumb, JSON-LD (Person, Course, FAQPage, Article,
  BreadcrumbList, ProfessionalService).

**Thu thập & quản lý học viên tiềm năng**

- Form đăng ký với validate cả phía client và server, honeypot, rate limiting,
  chống gửi trùng, chuẩn hóa số điện thoại Việt Nam, ghi nhận UTM và trang nguồn.
- Trang quản trị: đăng nhập, danh sách lead có tìm kiếm / lọc / sắp xếp / phân
  trang, trang chi tiết, cập nhật trạng thái và ghi chú, nút gọi nhanh và mở Zalo.

---

## 2. Công nghệ sử dụng

| Thành phần | Lựa chọn |
| --- | --- |
| Framework | Next.js 15 (App Router, React Server Components) |
| Ngôn ngữ | TypeScript (strict mode, `noUncheckedIndexedAccess`) |
| UI | Tailwind CSS 3 + design tokens dạng CSS variables |
| Icon | lucide-react |
| Form | React Hook Form + Zod |
| ORM | Prisma 6 |
| Database | SQLite (local) — schema tương thích PostgreSQL/Supabase |
| Xác thực | Session credentials tự triển khai: bcrypt + JWT (`jose`) trong cookie HTTP-only |
| Unit / Integration test | Vitest + React Testing Library |
| E2E test | Playwright |
| Chất lượng mã | ESLint 9 (flat config) + Prettier |

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
    cam-nhan-hoc-vien/
    kien-thuc/              # Blog + [slug] bài viết
    lien-he/
    chinh-sach-bao-mat/
    dieu-khoan-su-dung/
    admin/                  # login, leads, leads/[id]
    api/                    # leads, auth/session
    sitemap.ts, robots.ts, not-found.tsx, error.tsx
  components/
    layout/                 # header, footer, thanh CTA mobile, analytics
    sections/               # các section của trang chủ và trang con
    courses/ blog/ testimonials/ gallery/ forms/ admin/ ui/
  config/site.ts            # ★ Toàn bộ thông tin có thể thay đổi
  content/                  # courses, testimonials, faqs, gallery, blog/...
  features/
    leads/{domain,application,infrastructure,presentation}
    auth/{domain,application,infrastructure,presentation}
  lib/                      # analytics, auth, db, env, rate-limit, seo, security, utils, validation
  types/
  middleware.ts             # Bảo vệ /admin/* + phát sinh cookie CSRF
prisma/
  schema.prisma             # SQLite (đang dùng)
  schema.postgresql.prisma  # Bản tham chiếu cho PostgreSQL
  seed.ts
  migrations/
public/images/              # Ảnh minh họa SVG (sẽ thay bằng ảnh thật)
scripts/                    # Script sinh ảnh placeholder
tests/{unit,integration,e2e}/
docs/
```

Nguyên tắc phân tách: **Content** (`src/content`), **UI** (`src/components`),
**Validation** (`src/lib/validation`, `features/*/domain`), **Business logic**
(`features/*/application`), **Data access** (`features/*/infrastructure`),
**Auth** (`features/auth`), **Admin** (`src/app/admin`).

---

## 4. Yêu cầu môi trường

- **Node.js >= 20.9** (đã kiểm thử trên 20.14)
- **npm >= 10**
- Không cần cài database riêng — SQLite chạy trực tiếp từ file.

---

## 5. Cài đặt và chạy

```bash
# 1. Cài dependency
npm install

# 2. Tạo file .env từ mẫu rồi điền giá trị thật
cp .env.example .env        # Windows: copy .env.example .env

# 3. Sinh Prisma Client
npm run db:generate

# 4. Tạo database và bảng
npm run db:migrate

# 5. Seed tài khoản quản trị + vài lead mẫu
npm run db:seed

# 6. Chạy môi trường phát triển
npm run dev
```

Mở http://localhost:3000 — trang quản trị tại http://localhost:3000/admin/leads

### Các lệnh có sẵn

| Lệnh | Công dụng |
| --- | --- |
| `npm run dev` | Chạy dev server |
| `npm run build` | Sinh Prisma Client rồi build production |
| `npm run start` | Chạy bản build production |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint tự sửa |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Unit + integration test (Vitest) |
| `npm run test:watch` | Vitest chế độ theo dõi |
| `npm run test:e2e` | Playwright E2E (cần `npm run build` trước) |
| `npm run test:e2e:install` | Tải trình duyệt cho Playwright |
| `npm run format` | Prettier |
| `npm run db:generate` | `prisma generate` |
| `npm run db:migrate` | `prisma migrate dev` |
| `npm run db:migrate:deploy` | Áp dụng migration ở production |
| `npm run db:seed` | Chạy seed |
| `npm run db:studio` | Mở Prisma Studio |
| `npm run db:reset` | Xóa và tạo lại database dev |

---

## 6. Migration và seed

```bash
# Tạo migration mới sau khi sửa prisma/schema.prisma
npm run db:migrate -- --name ten_migration

# Áp dụng migration ở môi trường production
npm run db:migrate:deploy

# Seed lại (bỏ qua nếu bảng lead đã có dữ liệu)
npm run db:seed

# Làm mới hoàn toàn database dev
npm run db:reset
```

Seed tạo:

- **1 tài khoản quản trị** — email và mật khẩu đọc từ `ADMIN_EMAIL` /
  `ADMIN_PASSWORD` trong `.env`. Mật khẩu được hash bằng bcrypt trước khi lưu.
- **8 lead mẫu** — mọi bản ghi đều có ghi chú `[DEV SEED]` và dùng dải số
  `0912 34x xxx` để không trùng số thật.

Seed **không** ghi đè lead nếu bảng đã có dữ liệu.

---

## 7. Tài khoản quản trị (development)

Tài khoản **không được hard-code trong source**. Nó được tạo từ biến môi trường
khi chạy `npm run db:seed`:

```env
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="change-me"
```

Đổi giá trị trong `.env` rồi chạy lại `npm run db:seed` — mật khẩu của tài khoản
sẽ được cập nhật.

> **Trước khi triển khai thật, bắt buộc đổi `ADMIN_PASSWORD` và `AUTH_SECRET`.**
> Xem `docs/DEPLOYMENT.md`.

Sinh `AUTH_SECRET` ngẫu nhiên:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

---

## 8. Biến môi trường

Xem `.env.example` để có danh sách đầy đủ kèm chú thích. Tóm tắt:

| Biến | Bắt buộc | Ghi chú |
| --- | --- | --- |
| `DATABASE_URL` | ✅ | `file:./dev.db` cho SQLite |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Dùng cho canonical, OG, sitemap |
| `NEXT_PUBLIC_TEACHER_NAME` | ✅ | Tên thầy |
| `NEXT_PUBLIC_PHONE_NUMBER` | ✅ | Số điện thoại liên hệ |
| `NEXT_PUBLIC_ZALO_URL` | ✅ | URL Zalo hoặc số điện thoại |
| `NEXT_PUBLIC_CONTACT_EMAIL` | ✅ | Email liên hệ |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | ✅ | Tài khoản quản trị |
| `AUTH_SECRET` | ✅ | Tối thiểu 32 ký tự |
| `NEXT_PUBLIC_*` còn lại | ➖ | Địa chỉ, khu vực, Maps, mạng xã hội... |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ➖ | Để trống thì website vẫn chạy bình thường |
| `GOOGLE_SITE_VERIFICATION` | ➖ | Xác minh Google Search Console |

Mọi biến `NEXT_PUBLIC_*` chưa cấu hình sẽ rơi về placeholder dạng `[Tên thầy]`,
và giao diện tự chuyển sang trạng thái "đang cập nhật" thay vì tạo link hỏng.

---

## 9. Cách thay đổi nội dung

### 9.1 Đổi tên thầy, số điện thoại, Zalo

**Cách khuyến nghị** — sửa `.env` rồi khởi động lại server:

```env
NEXT_PUBLIC_TEACHER_NAME="Nguyễn Văn A"
NEXT_PUBLIC_PHONE_NUMBER="0912345678"
NEXT_PUBLIC_ZALO_URL="https://zalo.me/0912345678"
NEXT_PUBLIC_CONTACT_EMAIL="thay.a@example.com"
```

Toàn bộ header, footer, hero, nút gọi, nút Zalo, disclaimer, SEO title và
JSON-LD đều đọc từ một nơi duy nhất: [`src/config/site.ts`](src/config/site.ts).
Không có placeholder nào rải rác trong component.

Cách thứ hai: sửa trực tiếp giá trị mặc định trong `src/config/site.ts`.

### 9.2 Thêm khóa học

Mở [`src/content/courses.ts`](src/content/courses.ts), thêm một phần tử vào mảng
`courses`. Trang chi tiết `/khoa-hoc/<slug>`, sitemap, dropdown trong form đăng
ký và bảng so sánh học phí đều tự cập nhật.

Để trống học phí bằng `tuition: null` — giao diện sẽ hiển thị câu
"Vui lòng liên hệ để nhận thông tin học phí…". **Không tự điền số ước chừng.**

### 9.3 Thêm bài blog

1. Tạo file mới trong [`src/content/blog/`](src/content/blog/), export
   `post: BlogPost`.
2. Import và thêm vào mảng trong `src/content/blog/index.ts`.

Mục lục, thời gian đọc, bài viết liên quan, metadata SEO và JSON-LD `Article`
được sinh tự động.

### 9.4 Thêm FAQ và cảm nhận học viên

- FAQ chung: [`src/content/faqs.ts`](src/content/faqs.ts)
- FAQ riêng của khóa: trường `faqs` trong từng khóa học
- Cảm nhận: [`src/content/testimonials.ts`](src/content/testimonials.ts)

Mọi cảm nhận mẫu **bắt buộc** có `isPlaceholder: true`. Chỉ đặt `false` khi đó là
phản hồi thật và học viên đã đồng ý cho đăng. Xem
[`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md).

### 9.5 Thay ảnh

Ảnh hiện tại là hình minh họa SVG trong `public/images/`, được sinh bởi
`node scripts/generate-placeholder-images.mjs`.

Để thay bằng ảnh thật: đặt file vào đúng đường dẫn tương ứng rồi cập nhật `src`,
`width`, `height`, `alt` trong file content liên quan. Danh sách ảnh cần cung cấp
kèm kích thước đề xuất: [`docs/REQUIRED_ASSETS.md`](docs/REQUIRED_ASSETS.md).

---

## 10. Kiểm thử

```bash
npm run test        # 202 unit + integration test
npm run build       # bắt buộc trước khi chạy E2E
npm run test:e2e    # 29 E2E test (Playwright)
```

Lần đầu chạy E2E cần tải trình duyệt: `npm run test:e2e:install`.

E2E dùng database riêng `prisma/e2e.db`, được xóa và tạo lại trước mỗi lần chạy.
Database phát triển `prisma/dev.db` không bị ảnh hưởng.

---

## 11. Triển khai

Xem hướng dẫn chi tiết trong [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md):
deploy lên Vercel, chuyển SQLite sang PostgreSQL/Supabase, cấu hình domain,
Google Search Console, Google Analytics, sao lưu database và đổi mật khẩu quản trị.

---

## 12. Tài liệu khác

- [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md) — hướng dẫn biên tập nội dung
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — hướng dẫn triển khai
- [`docs/REQUIRED_ASSETS.md`](docs/REQUIRED_ASSETS.md) — ảnh và video cần cung cấp
- [`IMPLEMENTATION_LOG.md`](IMPLEMENTATION_LOG.md) — nhật ký triển khai, quyết định
  kỹ thuật và những việc còn lại
