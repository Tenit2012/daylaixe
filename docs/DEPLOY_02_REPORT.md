> ## ⚠️ TÀI LIỆU ĐÃ HẾT HIỆU LỰC — GIỮ LÀM LỊCH SỬ
>
> Báo cáo này mô tả kiến trúc **Netlify + Neon (PostgreSQL) + Prisma + trang
> quản trị**. Toàn bộ phần đó đã bị gỡ khỏi dự án trong đợt refactor
> **13/08/2026**. Website hiện là **static export deploy trên Cloudflare Pages**,
> không có database, không có API, không có trang quản trị.
>
> **Đừng làm theo tài liệu này.** Hướng dẫn deploy hiện hành:
> [`CLOUDFLARE_PAGES_DEPLOY.md`](CLOUDFLARE_PAGES_DEPLOY.md).
> Chi tiết những gì đã đổi: [`REFACTOR_01_REPORT.md`](REFACTOR_01_REPORT.md).

---

# DEPLOY-02 REPORT — Netlify + Neon (PostgreSQL)

> Trạng thái ngắn gọn: **Repo đã sẵn sàng deploy (deploy-ready). Chưa có URL preview vì bước deploy thật cần bạn đăng nhập tài khoản Netlify + Neon.** Bạn đã chọn phương án _"Chuẩn bị + tôi tự deploy"_, nên phần dưới có hướng dẫn 6 bước để bạn bấm deploy trong ~10–15 phút và có link `https://xxxxx.netlify.app`.
>
> Vì sao tôi không tự deploy được: tôi không có quyền tạo/đăng nhập tài khoản Netlify hay Neon của bạn, và môi trường sandbox của tôi không chạy được toolchain của dự án (xem mục "Giới hạn môi trường").

---

## 1. Tổng quan kiến trúc (audit)

- **Framework:** Next.js 15 (App Router, React 19, RSC). TypeScript strict.
- **Prisma:** ORM 6, 2 model `Lead` và `AdminUser`. `status`/`role` lưu dạng String, ràng buộc ở tầng domain + Zod.
- **Auth admin:** tự triển khai bằng bcrypt (12 rounds) + JWT (`jose`) trong cookie HTTP-only. Middleware chặn `/admin`.
- **Lead flow:** Server Action `submitLeadAction` → `LeadService` (Zod validate, honeypot, rate limit theo IP, chặn trùng số) → `PrismaLeadRepository` → bảng `leads`.
- **Route Handlers:** `/api/leads`, `/api/auth/session`.
- **Trước đây:** SQLite (`file:./dev.db`). **Nay:** đã chuyển sang PostgreSQL.

## 2. Chuẩn hóa PostgreSQL (đã thực hiện)

- `prisma/schema.prisma`: `provider = "postgresql"`, `url = env("DATABASE_URL")`.
- `prisma/migrations/migration_lock.toml`: `provider = "postgresql"`.
- Migration `..._init/migration.sql`: viết lại theo cú pháp PostgreSQL (đúng định dạng Prisma sinh ra): `TIMESTAMP(3)` thay `DATETIME`, `CONSTRAINT *_pkey PRIMARY KEY`, giữ nguyên 5 index (`normalizedPhone`, `status`, `createdAt`, `interestedCourse`, `admin_users_email_key`).
- `PrismaClient` singleton (module-level, tương thích serverless — tái sử dụng trên instance ấm của Netlify Function).
- Không còn phụ thuộc SQLite khi deploy.

> Lưu ý Prisma vs migration đã có sẵn dữ liệu: Neon là DB **mới rỗng**, nên `prisma migrate deploy` sẽ áp migration `_init` một cách sạch sẽ, không có bước "baseline".

## 3. Neon database

Chưa tạo (cần bạn đăng nhập). Sau khi có, cấu hình `DATABASE_URL` (pooled, `?sslmode=require`) và chạy `npm run db:migrate:deploy` — netlify.toml đã tự chạy lệnh này trong build. **Không dùng `db push`** trên preview (đúng yêu cầu — dùng migrate deploy).

## 4. Admin account

- Script mới: `scripts/create-admin.ts` + lệnh `npm run admin:create`.
- Lấy `ADMIN_EMAIL`/`ADMIN_PASSWORD` từ env; nếu thiếu password sẽ **tự sinh mật khẩu mạnh và in 1 lần** ở terminal.
- Hash bcrypt 12 rounds; upsert (idempotent); không hard-code; **không tạo lead demo**; không in credential ra UI.

## 5. Environment variables (khai báo trên Netlify, KHÔNG commit)

| Biến                                                                                                                                                               | Bắt buộc   | Ghi chú                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | -------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`                                                                                                                                                     | ✅         | Chuỗi Neon pooled, kèm `?sslmode=require`.                                                         |
| `AUTH_SECRET`                                                                                                                                                      | ✅         | ≥ 32 ký tự. Tạo: `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`. |
| `ADMIN_EMAIL`                                                                                                                                                      | ✅         | Email đăng nhập admin (đừng dùng `@example.com`).                                                  |
| `ADMIN_PASSWORD`                                                                                                                                                   | ✅         | ≥ 12 ký tự (dùng cho `admin:create`).                                                              |
| `NEXT_PUBLIC_SITE_URL`                                                                                                                                             | ✅         | URL Netlify thật sau khi deploy.                                                                   |
| `NEXT_PUBLIC_TEACHER_NAME`                                                                                                                                         | ✅         | Chỉ ghi **`Tùng`** — web tự thêm "Thầy".                                                           |
| `NEXT_PUBLIC_PHONE_NUMBER`                                                                                                                                         | ✅         | `0967569733`.                                                                                      |
| `NEXT_PUBLIC_ZALO_URL`                                                                                                                                             | ✅         | `https://zalo.me/0967569733`.                                                                      |
| `NEXT_PUBLIC_NOINDEX`                                                                                                                                              | ⚠️ preview | Đặt `true` cho bản demo (chặn Google index).                                                       |
| `NEXT_PUBLIC_TEACHER_TITLE`, `_ADDRESS`, `_TRAINING_AREA`, `_CENTER_NAME`, `_CONTACT_EMAIL`, `_CONTACT_HOURS`, `_GOOGLE_MAPS_URL`, `_FACEBOOK_URL`, `_YOUTUBE_URL` | tùy        | Điền dần; còn `[...]` thì giao diện hiển thị "đang cập nhật".                                      |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `_FACEBOOK_PIXEL_ID`, `_ENABLE_FACEBOOK_PIXEL`                                                                                    | không      | **Để trống trên preview** (không GA/Ads).                                                          |

`.env.example` đã được cập nhật đầy đủ. `.env` nằm trong `.gitignore` (đã xác minh không bị track) → không có secret nào bị commit.

## 6. Netlify configuration (đã thực hiện)

`netlify.toml`:

- `command = "npm run db:migrate:deploy && npm run build"` → migrate Neon rồi build (migrate deploy idempotent, an toàn chạy lại).
- `NODE_VERSION = "20"`, `NPM_FLAGS = "--include=dev"`, `NEXT_TELEMETRY_DISABLED = "1"`.
- Plugin `@netlify/plugin-nextjs` (Netlify tự cài — không đụng `package-lock.json`) → hỗ trợ Server Actions, Route Handlers, server runtime.

## 7. Quality gate (kết quả THẬT — không báo PASS thứ chưa chạy)

| Kiểm tra                         | Kết quả                     | Ghi chú                                                                      |
| -------------------------------- | --------------------------- | ---------------------------------------------------------------------------- |
| `tsc --noEmit` (typecheck)       | ✅ **PASS**                 | Chạy thật trong sandbox, exit 0 — toàn bộ thay đổi biên dịch sạch.           |
| Prisma migration (cú pháp)       | ✅ Soạn đúng chuẩn Postgres | Chưa apply local (không có DB). Sẽ apply trên Neon khi deploy.               |
| `prisma generate` / `next build` | ⏳ **PENDING trên Netlify** | Không chạy được trong sandbox (xem "Giới hạn môi trường").                   |
| `eslint`                         | ⏳ chưa chạy xong local     | ESLint khởi động > giới hạn 45s của sandbox. Đã review thủ công.             |
| `prettier --check`               | ⏳ chưa chạy xong local     | Như trên.                                                                    |
| `vitest` / `check:placeholders`  | ⏳ không chạy được local    | Chạy qua tsx/esbuild — binary là bản Windows, không chạy trên Linux sandbox. |

> Kết luận trung thực: bước biên dịch TypeScript đã xanh; các gate còn lại sẽ được xác nhận ngay trong lần build đầu trên Netlify (môi trường Linux có mạng tải engine bình thường).

## 8. Giới hạn môi trường (vì sao tôi không tự deploy)

1. **Không có quyền tài khoản:** không thể tạo/đăng nhập Netlify hay Neon thay bạn.
2. **`node_modules` là bản Windows:** repo cài trên ổ D: (Windows). Sandbox của tôi là Linux → các native binary (`@prisma/engines`, `esbuild`, `schema-engine`) không chạy được. Vì vậy `prisma generate`, `next build`, `tsx`, `vitest` đều không thực thi được ở đây.
3. **CDN engine của Prisma bị chặn** (403) và không có `sudo`/Docker để dựng Postgres cục bộ.

Những giới hạn này **không ảnh hưởng khi deploy trên Netlify** — Netlify chạy Linux, cài lại dependency đúng nền tảng và tải engine bình thường.

## 9. Hướng dẫn deploy (bạn thực hiện, ~10–15 phút)

**Bước 1 — Neon:** vào https://neon.tech → đăng nhập → _Create project_ (region Singapore gần VN nhất) → copy **Connection string** (chọn _Pooled connection_, có `-pooler`, kèm `?sslmode=require`).

**Bước 2 — Đẩy code lên GitHub:** commit các thay đổi (đừng commit `.env`) và push lên một repo GitHub riêng tư.

**Bước 3 — Netlify:** vào https://app.netlify.com → _Add new site_ → _Import from GitHub_ → chọn repo. Netlify tự nhận Next.js; giữ nguyên build command trong `netlify.toml`.

**Bước 4 — Environment variables (Site settings → Environment variables):** thêm tối thiểu:

```
DATABASE_URL       = (chuỗi Neon pooled ?sslmode=require)
AUTH_SECRET        = (chuỗi random ≥ 32 ký tự)
ADMIN_EMAIL        = (email admin của bạn)
ADMIN_PASSWORD     = (mật khẩu ≥ 12 ký tự)
NEXT_PUBLIC_SITE_URL   = https://TÊN-SITE.netlify.app
NEXT_PUBLIC_TEACHER_NAME = Tùng
NEXT_PUBLIC_PHONE_NUMBER = 0967569733
NEXT_PUBLIC_ZALO_URL     = https://zalo.me/0967569733
NEXT_PUBLIC_NOINDEX      = true
```

**Bước 5 — Deploy:** bấm _Deploy site_. Build sẽ tự chạy `prisma migrate deploy` (tạo bảng trên Neon) rồi `next build`. Nếu lần đầu chưa biết URL để điền `NEXT_PUBLIC_SITE_URL`, cứ deploy trước, lấy URL Netlify cấp, cập nhật biến rồi _Trigger deploy_ lại.

**Bước 6 — Tạo admin:** sau khi bảng đã có trên Neon, tạo tài khoản admin bằng một trong hai cách:

- Local (nếu máy bạn chạy được Node): đặt `DATABASE_URL` trỏ Neon trong `.env` rồi chạy `npm run admin:create`.
- Hoặc trên Netlify: dùng Netlify CLI `netlify env:...` + chạy script qua một lần build, hoặc dùng Neon SQL editor để insert (khuyên dùng `admin:create` để hash bcrypt đúng).

## 10. Migration sau deploy — verify

Sau khi build xong, kiểm tra trên Neon (SQL editor): tồn tại bảng `leads`, `admin_users`, `_prisma_migrations`; các index đã liệt kê ở mục 2; và `admin_users` có đúng 1 dòng sau khi chạy `admin:create`.

## 11. Verify như người dùng thật (checklist chạy trên URL preview)

Public: `/`, `/gioi-thieu`, `/khoa-hoc`, `/lien-he` mở được. Conversion: nút Gọi (tel:), nút Zalo (mở zalo.me), submit form đăng ký → hiện "Đã nhận thông tin" → 1 dòng mới trong bảng `leads`. Admin: `/admin/login` → đăng nhập → thấy lead vừa gửi → logout. SEO: title/description/canonical đúng, `/robots.txt` chặn khi `NEXT_PUBLIC_NOINDEX=true`, `/sitemap.xml` có, favicon hiện. Responsive: mobile/tablet/desktop.

## 12. Rollback plan

- **Web:** Netlify → _Deploys_ → chọn deploy tốt trước đó → _Publish deploy_ (khôi phục tức thì).
- **Schema:** migration `_init` chỉ tạo bảng mới, không phá dữ liệu cũ. Muốn làm lại từ đầu: xóa project Neon và tạo mới, đổi `DATABASE_URL`, deploy lại.
- **Code:** `git revert` các commit deploy để quay về SQLite/local nếu cần.

## 13. Production readiness

- ✅ Sẵn sàng về hạ tầng: Postgres, migration, admin script, Netlify config, biến môi trường, chặn index preview.
- ⚠️ Nội dung: theo TRUST_AUDIT_REPORT, còn thiếu ảnh thật, tên/địa chỉ trung tâm, bản đồ, cảm nhận thật. Bản này phù hợp làm **preview gửi Thầy Tùng xem bố cục**, chưa nên chạy quảng cáo.
- ⚠️ Chưa xác minh runtime (login/lead) vì chưa có DB thật — sẽ xác nhận ngay trên preview theo checklist mục 11.
