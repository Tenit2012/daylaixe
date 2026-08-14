# Triển khai lên Cloudflare Pages

Website là **static export**: `npm run build` sinh ra thư mục `out/` chứa HTML,
CSS, JS, ảnh và video tĩnh. Không có backend, không có API, không cần Node.js
chạy nền.

---

## 1. Cấu hình trong Cloudflare Pages

Vào **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**,
chọn repository, rồi điền:

| Trường                 | Giá trị                          |
| ---------------------- | -------------------------------- |
| Framework preset       | **Next.js (Static HTML Export)** |
| Build command          | `npm run build`                  |
| Build output directory | `out`                            |
| Root directory         | _(để trống)_                     |
| Node.js version        | `20` hoặc mới hơn                |

> **Lưu ý về Node version:** Cloudflare mặc định có thể dùng Node cũ. Đặt biến
> môi trường `NODE_VERSION = 20` trong phần Environment variables để chắc chắn.

---

## 2. Biến môi trường

Vào **Settings → Environment variables → Production**, thêm các biến dưới đây.
Toàn bộ đều là thông tin công khai (được nhúng vào HTML lúc build), **không có
secret nào**.

### Bắt buộc

| Biến                           | Giá trị                                                                            |
| ------------------------------ | ---------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | `https://thaytungdaylaixe.vn`                                                      |
| `NEXT_PUBLIC_TEACHER_NAME`     | `Tùng`                                                                             |
| `NEXT_PUBLIC_TEACHER_TITLE`    | `Giáo viên cơ hữu`                                                                 |
| `NEXT_PUBLIC_PHONE_NUMBER`     | `0967569733`                                                                       |
| `NEXT_PUBLIC_ZALO_URL`         | `https://zalo.me/0967569733`                                                       |
| `NEXT_PUBLIC_CENTER_NAME`      | `Trung tâm Dạy nghề, Đào tạo và Sát hạch Lái xe – Trường Đại học An ninh Nhân dân` |
| `NEXT_PUBLIC_ADDRESS`          | `Km 18 Võ Nguyên Giáp, Linh Trung, Thủ Đức, TP.HCM`                                |
| `NEXT_PUBLIC_CONSULT_LOCATION` | `Lầu 2, trong khuôn viên trung tâm`                                                |
| `NEXT_PUBLIC_GOOGLE_MAPS_URL`  | link Google Maps của trung tâm                                                     |
| `NEXT_PUBLIC_EXPERIENCE_LABEL` | `Gần 20 năm`                                                                       |
| `NODE_VERSION`                 | `20`                                                                               |

### Nên có

`NEXT_PUBLIC_CENTER_SHORT_NAME`, `NEXT_PUBLIC_CONTACT_EMAIL`,
`NEXT_PUBLIC_CONTACT_HOURS`, `NEXT_PUBLIC_TRAINING_AREA`,
`NEXT_PUBLIC_STUDENT_GROUPS`, `NEXT_PUBLIC_STUDENT_GROUPS_SHORT`.

### Khi có tài khoản thật

`NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_YOUTUBE_URL`. Để trống hoặc để dạng
`[Facebook URL]` thì giao diện **tự ẩn** nút tương ứng, không tạo link hỏng.

### Analytics và Search Console

`NEXT_PUBLIC_GA_MEASUREMENT_ID`, `GOOGLE_SITE_VERIFICATION`. Để trống thì
website vẫn chạy bình thường và không tải script nào.

### Chặn index cho bản xem thử

Nếu tạo thêm một Pages project để xem thử, đặt `NEXT_PUBLIC_NOINDEX = "true"`
trên project đó. Bản production **phải để trống** biến này.

---

## 3. Tên miền

1. **Custom domains → Set up a domain** → nhập `thaytungdaylaixe.vn`.
2. Nếu tên miền đã dùng Cloudflare làm DNS, Cloudflare tự thêm bản ghi. Nếu
   chưa, làm theo một trong hai cách:

| Trường hợp                       | Bản ghi DNS                                                            |
| -------------------------------- | ---------------------------------------------------------------------- |
| Domain gốc `thaytungdaylaixe.vn` | `CNAME` → `<project>.pages.dev` (Cloudflare tự làm phẳng thành A/AAAA) |
| `www.thaytungdaylaixe.vn`        | `CNAME` → `<project>.pages.dev`                                        |

3. Cloudflare tự cấp chứng chỉ SSL, thường trong vài phút.
4. **Chọn một tên miền chính** (khuyến nghị bản không có `www`) và chuyển hướng
   bản còn lại về nó, tránh trùng lặp nội dung với công cụ tìm kiếm. Tạo
   redirect trong **Rules → Redirect Rules**.
5. `NEXT_PUBLIC_SITE_URL` **phải khớp đúng** tên miền chính đã chọn — biến này
   sinh ra canonical URL, Open Graph và `sitemap.xml`. Sửa xong phải **build
   lại**, vì giá trị được nhúng lúc build chứ không đọc lúc chạy.

---

## 4. HTTP headers

Header bảo mật và cache nằm trong [`public/_headers`](../public/_headers),
được copy nguyên vẹn vào `out/` khi build.

**Vì sao không dùng `headers()` trong `next.config.ts`:** với
`output: 'export'` không có máy chủ Next.js nào chạy để gắn header, nên hàm đó
mất hiệu lực hoàn toàn. Cloudflare Pages đọc file `_headers` thay thế.

Sau khi deploy, kiểm tra lại bằng:

```bash
curl -sI https://thaytungdaylaixe.vn | grep -iE "x-content-type|x-frame|referrer|strict-transport"
```

---

## 5. Kiểm tra trước khi deploy

```bash
npm ci
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build          # phải sinh ra out/
npm run preview        # xem thử bản tĩnh tại http://localhost:4173
```

Danh sách cần thấy trong `out/`:

- `index.html`, `404.html`
- `robots.txt`, `sitemap.xml`, `manifest.webmanifest`
- `_headers`
- `images/`, `videos/`, `_next/static/`

---

## 6. Những lỗi đã gặp và cách xử lý

**`export const dynamic = "force-static" ... not configured on route`**
Các route sinh metadata (`robots.ts`, `sitemap.ts`, `manifest.ts`) bắt buộc phải
khai báo `export const dynamic = 'force-static'` khi dùng `output: 'export'`.
Cả ba file đã khai báo sẵn — đừng xoá dòng đó.

**`JavaScript heap out of memory` lúc build**
Máy build ít RAM. Script `npm run build` đã đặt sẵn
`NODE_OPTIONS=--max-old-space-size=4096`. Nếu Cloudflare vẫn báo lỗi này, thêm
biến môi trường `NODE_OPTIONS = --max-old-space-size=4096` trong Pages.

**Ảnh không hiển thị**
`images.unoptimized = true` là **bắt buộc** với static export. Đừng bật lại tối
ưu ảnh của Next.js — không có máy chủ nào để chạy nó. Ảnh đã được nén sẵn sang
WebP bởi `node scripts/process-photos.mjs`.

**Trang con trả về 404**
`trailingSlash: true` khiến mỗi trang là một thư mục có `index.html`. Đừng đổi
Build output directory thành gì khác ngoài `out`.
