# Hướng dẫn triển khai

---

## 1. Chuẩn bị trước khi triển khai

### 1.1 Danh sách kiểm tra bắt buộc

- [ ] Đã thay toàn bộ placeholder trong `.env` (tên thầy, số điện thoại, Zalo,
      email, địa chỉ, khu vực đào tạo, Google Maps, tên trung tâm).
- [ ] Đã sinh `AUTH_SECRET` ngẫu nhiên (tối thiểu 32 ký tự).
- [ ] Đã đổi `ADMIN_PASSWORD` khỏi giá trị `change-me`.
- [ ] Đã đặt `NEXT_PUBLIC_SITE_URL` bằng domain thật (có `https://`).
- [ ] Đã thay ảnh minh họa bằng ảnh thật (xem `docs/REQUIRED_ASSETS.md`).
- [ ] `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` đều xanh.
- [ ] File `.env` **không** được commit lên git.

Sinh `AUTH_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

### 1.2 Chọn database

| Môi trường | Database | Ghi chú |
| --- | --- | --- |
| Local development | SQLite (`prisma/dev.db`) | Mặc định, không cần cài gì thêm |
| Production trên Vercel | **PostgreSQL / Supabase** | Bắt buộc — xem mục 3 |
| Production trên VPS | SQLite hoặc PostgreSQL | SQLite chấp nhận được nếu lưu lượng thấp và có backup |

> **Quan trọng:** Vercel dùng filesystem chỉ đọc (ngoại trừ `/tmp` không bền
> vững), nên **không thể** dùng SQLite trên Vercel. Phải chuyển sang PostgreSQL.

---

## 2. Triển khai lên Vercel

### 2.1 Đưa mã nguồn lên Git

```bash
git add .
git commit -m "chore: chuan bi trien khai"
git remote add origin <URL repository của bạn>
git push -u origin main
```

### 2.2 Tạo project trên Vercel

1. Vào https://vercel.com → **Add New** → **Project**.
2. Import repository vừa đẩy lên.
3. Framework Preset: Vercel tự nhận diện **Next.js**.
4. Build Command: để mặc định (`npm run build` — đã bao gồm `prisma generate`).
5. **Chưa bấm Deploy vội** — cấu hình biến môi trường trước.

### 2.3 Cấu hình biến môi trường trên Vercel

Vào **Settings → Environment Variables**, thêm cho cả ba môi trường
(Production, Preview, Development):

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname?schema=public&sslmode=require

NEXT_PUBLIC_SITE_URL=https://ten-mien-cua-ban.com
NEXT_PUBLIC_TEACHER_NAME=Nguyễn Văn A
NEXT_PUBLIC_TEACHER_TITLE=Giáo viên dạy thực hành lái xe
NEXT_PUBLIC_PHONE_NUMBER=0912345678
NEXT_PUBLIC_ZALO_URL=https://zalo.me/0912345678
NEXT_PUBLIC_CONTACT_EMAIL=thay.a@example.com
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/...
NEXT_PUBLIC_YOUTUBE_URL=https://youtube.com/@...
NEXT_PUBLIC_ADDRESS=123 Đường ABC, TP. Thủ Đức, TP.HCM
NEXT_PUBLIC_TRAINING_AREA=TP. Thủ Đức và các quận lân cận
NEXT_PUBLIC_GOOGLE_MAPS_URL=https://maps.app.goo.gl/...
NEXT_PUBLIC_CENTER_NAME=Trung tâm đào tạo lái xe ...
NEXT_PUBLIC_YEARS_OF_EXPERIENCE=hơn 10 năm
NEXT_PUBLIC_CONTACT_HOURS=7:00 - 20:00 hằng ngày

ADMIN_EMAIL=email-quan-tri-that@example.com
ADMIN_PASSWORD=<mật khẩu mạnh, không dùng lại ở nơi khác>
AUTH_SECRET=<chuỗi ngẫu nhiên >= 32 ký tự>

NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
GOOGLE_SITE_VERIFICATION=<mã xác minh Search Console>
```

> Đánh dấu `ADMIN_PASSWORD` và `AUTH_SECRET` là **Sensitive** để Vercel không
> hiển thị lại giá trị sau khi lưu.

### 2.4 Deploy và khởi tạo database

```bash
# Áp dụng migration lên database production (chạy từ máy của bạn)
DATABASE_URL="postgresql://..." npx prisma migrate deploy

# Tạo tài khoản quản trị
DATABASE_URL="postgresql://..." ADMIN_EMAIL="..." ADMIN_PASSWORD="..." npx prisma db seed
```

Trên Windows PowerShell:

```powershell
$env:DATABASE_URL="postgresql://..."; npx prisma migrate deploy
$env:DATABASE_URL="postgresql://..."; npx prisma db seed
```

Sau đó bấm **Deploy** trên Vercel.

> Seed sẽ tạo tài khoản quản trị và **bỏ qua** phần lead mẫu nếu bảng đã có dữ
> liệu. Nếu muốn database production hoàn toàn sạch, hãy xóa các lead có ghi chú
> `[DEV SEED]` sau khi seed.

---

## 3. Chuyển từ SQLite sang PostgreSQL / Supabase

### 3.1 Tạo database

**Supabase:** tạo project mới → **Settings → Database → Connection string** →
chọn **URI**. Với môi trường serverless như Vercel, dùng chuỗi kết nối có
**connection pooling** (cổng `6543`) cho `DATABASE_URL`, và chuỗi kết nối trực
tiếp (cổng `5432`) cho `DIRECT_URL` khi chạy migration.

**Vercel Postgres / Neon:** tạo database rồi copy `DATABASE_URL` được cấp.

### 3.2 Đổi schema

Dự án đã có sẵn bản schema PostgreSQL tham chiếu:

```bash
# 1. Sao lưu schema hiện tại
cp prisma/schema.prisma prisma/schema.sqlite.prisma.bak

# 2. Dùng bản PostgreSQL
cp prisma/schema.postgresql.prisma prisma/schema.prisma

# 3. Migration của SQLite không tương thích PostgreSQL — xóa đi
rm -rf prisma/migrations

# 4. Tạo migration mới cho PostgreSQL
DATABASE_URL="postgresql://..." npx prisma migrate dev --name init_postgres
```

Khác biệt chính giữa hai bản schema:

| | SQLite | PostgreSQL |
| --- | --- | --- |
| `Lead.status` | `String` (`"NEW"`, `"CONTACTED"`…) | `enum LeadStatus` |
| `AdminUser.role` | `String` | `enum AdminRole` |

Tầng ứng dụng đã ràng buộc các giá trị này bằng Zod và TypeScript
(`src/features/leads/domain/lead-status.ts`), nên **không cần sửa code** khi đổi.

### 3.3 Nếu cần chuyển dữ liệu cũ

```bash
# Xuất dữ liệu từ SQLite
npx prisma db pull   # kiểm tra schema hiện tại
# Dùng Prisma Studio hoặc sqlite3 để export CSV, sau đó import vào PostgreSQL
```

Với lượng lead nhỏ, cách đơn giản nhất là mở `npm run db:studio`, copy dữ liệu
và nhập thủ công vào database mới.

### 3.4 Cấu hình cho môi trường serverless

Nếu dùng Supabase với pooling, thêm vào `prisma/schema.prisma`:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")      // chuỗi pooling, cổng 6543
  directUrl = env("DIRECT_URL")        // chuỗi trực tiếp, cổng 5432
}
```

---

## 4. Cấu hình domain

1. Vercel → **Settings → Domains** → **Add** → nhập tên miền.
2. Tại nhà cung cấp tên miền, trỏ bản ghi DNS theo hướng dẫn Vercel hiển thị:
   - Domain gốc (`vidu.com`): bản ghi `A` → `76.76.21.21`
   - Subdomain (`www.vidu.com`): bản ghi `CNAME` → `cname.vercel-dns.com`
3. Chờ DNS lan truyền (thường vài phút đến vài giờ).
4. Vercel tự cấp chứng chỉ SSL.
5. **Bắt buộc:** cập nhật `NEXT_PUBLIC_SITE_URL` thành domain chính thức rồi
   redeploy — biến này được dùng cho canonical URL, Open Graph và `sitemap.xml`.
6. Chọn một domain chính (có `www` hoặc không) và redirect domain còn lại về nó,
   tránh trùng lặp nội dung với công cụ tìm kiếm.

---

## 5. Google Search Console

1. Vào https://search.google.com/search-console → **Add property** → chọn
   **URL prefix** và nhập domain đầy đủ.
2. Chọn phương thức xác minh **HTML tag**, copy phần `content` của thẻ meta.
3. Đặt giá trị đó vào biến môi trường `GOOGLE_SITE_VERIFICATION` trên Vercel rồi
   redeploy. Ứng dụng tự chèn thẻ meta xác minh khi biến này có giá trị.
4. Quay lại Search Console bấm **Verify**.
5. Vào **Sitemaps**, nộp đường dẫn: `sitemap.xml`
6. Kiểm tra **Pages** sau vài ngày để chắc chắn các trang được lập chỉ mục và
   `/admin/*` **không** xuất hiện (đã bị chặn bằng `robots.txt` và header
   `X-Robots-Tag: noindex`).

---

## 6. Google Analytics 4

1. Vào https://analytics.google.com → tạo Property → tạo Data Stream loại **Web**.
2. Copy **Measurement ID** dạng `G-XXXXXXXXXX`.
3. Đặt vào biến `NEXT_PUBLIC_GA_MEASUREMENT_ID` trên Vercel rồi redeploy.

Khi biến này để trống, website **vẫn chạy bình thường** và không tải script nào.

### Sự kiện được theo dõi sẵn

| Sự kiện | Khi nào phát sinh |
| --- | --- |
| `click_phone` | Bấm nút gọi điện (header, hero, thanh CTA, form, trang khóa học) |
| `click_zalo` | Bấm nút nhắn Zalo |
| `click_course` | Bấm vào một khóa học |
| `open_lead_form` | Lần đầu tương tác với form đăng ký |
| `submit_lead_form` | Bấm nút gửi |
| `submit_lead_form_success` | Gửi thành công |
| `submit_lead_form_error` | Gửi thất bại (kèm lý do) |
| `click_google_maps` | Bấm mở bản đồ |
| `click_video` | Bấm xem video |

Nên đánh dấu `submit_lead_form_success` là **Key event** (conversion) trong GA4.

### Facebook Pixel

Mặc định **TẮT**. Chỉ bật khi thực sự cần:

```env
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789
NEXT_PUBLIC_ENABLE_FACEBOOK_PIXEL=true
```

---

## 7. Sao lưu database

### 7.1 PostgreSQL / Supabase

```bash
# Sao lưu thủ công
pg_dump "postgresql://user:pass@host:5432/dbname" > backup-$(date +%Y%m%d).sql

# Khôi phục
psql "postgresql://user:pass@host:5432/dbname" < backup-20260806.sql
```

Supabase có sẵn **Daily backups** ở gói trả phí (Settings → Database → Backups).
Với gói miễn phí, nên tự chạy `pg_dump` định kỳ.

### 7.2 SQLite (nếu chạy trên VPS)

```bash
# Sao lưu an toàn kể cả khi ứng dụng đang chạy
sqlite3 prisma/dev.db ".backup 'backup-$(date +%Y%m%d).db'"
```

Nên đặt cron chạy hằng ngày và giữ ít nhất 7 bản gần nhất.

### 7.3 Lưu ý về dữ liệu cá nhân

Bản sao lưu chứa **họ tên và số điện thoại của học viên**. Vì vậy:

- Lưu ở nơi có kiểm soát truy cập, không để trong thư mục public hay repo git.
- Mã hóa file backup nếu lưu trên dịch vụ đám mây bên thứ ba.
- Xóa các bản backup quá hạn lưu trữ đã công bố trong chính sách bảo mật
  (24 tháng kể từ lần liên hệ gần nhất).

---

## 8. Đổi mật khẩu quản trị

Mật khẩu được hash bằng bcrypt, không lưu dạng đọc được. Cách đổi:

**Cách 1 — chạy lại seed (đơn giản nhất):**

```bash
# Cập nhật ADMIN_PASSWORD trong .env hoặc biến môi trường của Vercel
DATABASE_URL="..." ADMIN_EMAIL="..." ADMIN_PASSWORD="mat-khau-moi" npx prisma db seed
```

Seed dùng `upsert` nên tài khoản có sẵn sẽ được cập nhật mật khẩu mới, không tạo
trùng.

**Cách 2 — cập nhật trực tiếp:**

```bash
# Sinh hash cho mật khẩu mới
node -e "console.log(require('bcryptjs').hashSync('mat-khau-moi', 12))"

# Mở Prisma Studio và dán hash vào cột passwordHash của admin_users
npm run db:studio
```

**Sau khi đổi mật khẩu**, nên đổi luôn `AUTH_SECRET` để vô hiệu hóa mọi phiên
đăng nhập đang mở, rồi redeploy.

---

## 9. Triển khai trên VPS (thay thế cho Vercel)

```bash
# Trên máy chủ
git clone <repository>
cd daylayxe
npm ci
cp .env.example .env      # rồi điền giá trị thật

npm run db:migrate:deploy
npm run db:seed
npm run build

# Chạy nền bằng PM2
npm install -g pm2
pm2 start npm --name daylayxe -- run start
pm2 save
pm2 startup
```

Đặt Nginx làm reverse proxy phía trước và cấp SSL bằng Let's Encrypt
(`certbot --nginx`). Bảo đảm Nginx chuyển tiếp header `X-Forwarded-For` để rate
limiting nhận đúng IP người dùng:

```nginx
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header Host $host;
```

---

## 10. Kiểm tra sau khi triển khai

- [ ] Trang chủ mở được trên HTTPS, không có cảnh báo chứng chỉ.
- [ ] Nút gọi điện mở được ứng dụng gọi trên điện thoại.
- [ ] Nút Zalo mở đúng hồ sơ Zalo của thầy.
- [ ] Gửi thử một đăng ký → thấy thông báo thành công.
- [ ] Đăng nhập trang quản trị → thấy đăng ký vừa gửi.
- [ ] Truy cập `/admin/leads` khi chưa đăng nhập → bị chuyển về trang login.
- [ ] Mở `https://domain/robots.txt` → thấy `Disallow: /admin`.
- [ ] Mở `https://domain/sitemap.xml` → thấy các trang, **không** thấy `/admin`.
- [ ] Chạy Lighthouse trên trang chủ (mục tiêu tham khảo: Performance ≥ 85,
      Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90).
- [ ] Xóa các lead có ghi chú `[DEV SEED]` khỏi database production.
- [ ] Kiểm tra GA4 nhận được sự kiện `submit_lead_form_success`.

---

## 11. Rate limiting ở môi trường nhiều instance

Rate limiting hiện lưu trong bộ nhớ tiến trình
(`src/lib/rate-limit/rate-limiter.ts`), đủ dùng cho website cá nhân chạy trên một
instance. Khi mở rộng nhiều instance hoặc dùng edge functions, thay
`MemoryRateLimitStore` bằng Redis / Upstash — interface `RateLimiter` giữ nguyên
nên phần business logic không phải sửa.
