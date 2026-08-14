# Kế hoạch thay dữ liệu thật (Data Replacement Plan)

> Đi kèm `docs/MOCK_AND_SAMPLE_DATA_AUDIT.md` (báo cáo) và `docs/THAY_TUNG_CONTENT_CHECKLIST.md` (thu thập).
> **Không thực hiện migration lớn trong giai đoạn audit.** Đây là kế hoạch để chạy sau khi có dữ liệu thật.

## Nguyên tắc "dữ liệu nào để ở đâu"

| Loại dữ liệu                                     | Nên quản lý ở                                                     | Lý do                                                                |
| ------------------------------------------------ | ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| Domain, secret, DB URL, admin, GA4, verification | **Environment variable** (`.env`)                                 | Bí mật / khác nhau theo môi trường; không hard-code                  |
| Tên/chức danh/liên hệ/địa chỉ/giờ của thầy       | **Environment variable** (`NEXT_PUBLIC_*`) → `src/config/site.ts` | Đã là một nguồn sự thật duy nhất; đổi không cần sửa code             |
| Khóa học, FAQ, blog, gallery, learning-process   | **Content file** `src/content/*` (giữ nguyên)                     | Có kiểm soát phiên bản qua git, có test hợp lệ                       |
| Disclaimer                                       | `src/config/site.ts` (giữ)                                        | Bắt buộc, ít thay đổi                                                |
| Lead (học viên đăng ký)                          | **Database** (đã đúng)                                            | Dữ liệu động, riêng tư                                               |
| Ảnh/video                                        | **Public asset** `public/images/*` (giữ)                          | —                                                                    |
| Cảm nhận học viên                                | Content file hiện tại; cân nhắc **admin-managed** sau này         | Tần suất thay đổi vừa; hiện để ở `src/content/testimonials.ts` là đủ |

Không cần đưa nội dung sang CMS/database trong giai đoạn này. Kiến trúc hiện tại (env + content file) là hợp lý cho quy mô một thầy.

---

## Bảng kế hoạch theo pha

| Phase | Item                                  | Current source                        | Target source                                  | Input owner         | Files affected                                                                                         | Tests to rerun                              | Done criteria                                                                      |
| ----- | ------------------------------------- | ------------------------------------- | ---------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------- | ---------------------------------------------------------------------------------- |
| 1     | Domain thật (F01)                     | `NEXT_PUBLIC_SITE_URL=localhost:3000` | env production                                 | Developer           | `.env` (prod)                                                                                          | `build`                                     | canonical/OG/sitemap trỏ đúng `https://thaytungdaylaixe.vn`                        |
| 1     | Database production (F04)             | `file:./dev.db`                       | env `DATABASE_URL` + đổi provider              | Developer           | `.env` (prod), `prisma/schema.prisma` (theo `schema.postgresql.prisma`)                                | `db:generate`, `db:migrate:deploy`, `build` | Kết nối Postgres OK, migrate thành công                                            |
| 1     | Admin thật (F02, F03)                 | `admin@example.com` / `change-me`     | env                                            | Teacher + Developer | `.env` (prod)                                                                                          | `db:seed` (chỉ admin)                       | Đăng nhập `/admin/login` bằng credential thật                                      |
| 1     | Disclaimer / quan hệ trung tâm (F16)  | nêu "Trường ĐH An ninh Nhân dân"      | xác nhận → giữ hoặc bỏ tên                     | Teacher + Center    | `src/config/site.ts`                                                                                   | `typecheck`, `test` (site-config)           | Câu miễn trừ khớp quan hệ thật                                                     |
| 2     | Liên hệ còn `[...]` (F07–F10)         | env placeholder                       | env thật                                       | Teacher             | `.env` (prod)                                                                                          | `build`                                     | Footer/Liên hệ hiện email/FB/YT/Maps thật                                          |
| 2     | ~~Kinh nghiệm (F13)~~                 | ~~`nhiều năm`~~                       | **`Gần 20 năm`**                               | Teacher             | `.env`, `src/config/site.ts`                                                                           | `typecheck`, `test`, `build`                | ✅ **XONG 07/08/2026 — VERIFIED_REAL_DATA**                                        |
| 2     | ~~Đối tượng học viên (F13b)~~         | ~~không có~~                          | **`học viên hệ dân sự và hệ Công an`**         | Teacher             | `.env`, `src/config/site.ts`                                                                           | `typecheck`, `test`, `build`                | ✅ **XONG 07/08/2026 — VERIFIED_REAL_DATA** (còn nên xác nhận cách gọi chính thức) |
| 2     | Giá trị "tạm" còn lại (F12, F14, F15) | env giá trị tạm                       | env thật                                       | Teacher + Center    | `.env` (prod)                                                                                          | `test` (site-config), `build`               | Chức danh/trung tâm/địa chỉ/giờ đúng thật                                          |
| 2     | Ảnh hero + chân dung (F17)            | SVG                                   | ảnh raster thật                                | Teacher             | `public/images/hero/*`, `public/images/about/*`, `src/content` nếu đổi tên/kích thước                  | `test` (alt-text), `build`                  | Hero + About hiện ảnh thật, không méo trên mobile                                  |
| 2     | Ảnh OG raster (F17)                   | `og/og-default.svg`                   | `og/og-default.jpg` 1200×630                   | Teacher             | `public/images/og/*`, `src/config/site.ts` (`ogImage`)                                                 | `build`                                     | Chia sẻ link ra Facebook/Zalo hiện ảnh đúng                                        |
| 3     | Cảm nhận thật (F05)                   | 6 mẫu `isPlaceholder:true`            | cảm nhận thật (đồng ý) hoặc ẩn                 | Teacher             | `src/content/testimonials.ts`                                                                          | `test` (content), `build`                   | `/cam-nhan-hoc-vien` không còn "Nội dung mẫu" (hoặc khu vực được ẩn)               |
| 3     | Video cảm nhận (F06)                  | `videoUrl:null`                       | video thật/YouTube                             | Teacher             | `src/content/testimonials.ts`, `public` hoặc link                                                      | `build`                                     | Video phát được, không autoplay                                                    |
| 3     | Ảnh gallery + khóa học (F17)          | SVG                                   | ảnh thật                                       | Teacher             | `public/images/gallery/*`, `public/images/courses/*`, `src/content/gallery.ts` (`isPlaceholder:false`) | `test`, `build`                             | Album/khóa học hiện ảnh thật                                                       |
| 4     | Blog theo giọng thầy (F18)            | 8 bài mẫu, author chung               | bản đã review + author "Thầy Tùng" + ngày thật | Teacher             | `src/content/blog/*.ts`                                                                                | `test` (content), `build`                   | Nội dung đúng giọng, ngày đúng, có ảnh bìa                                         |
| 4     | Khóa học / FAQ xác nhận (F19, F20)    | tự soạn                               | bản đã xác nhận                                | Teacher + Center    | `src/content/courses.ts`, `src/content/faqs.ts`                                                        | `test`, `build`                             | Hồ sơ/điều kiện/địa điểm khớp thực tế                                              |
| 4     | Messaging giọng thầy (F27)            | tự soạn                               | bản review                                     | Teacher             | `src/config/site.ts`                                                                                   | `test` (site-config), `build`               | Slogan/triết lý đúng giọng thầy                                                    |
| 5     | GA4 (F21)                             | trống                                 | env GA4 ID                                     | Developer           | `.env` (prod)                                                                                          | `build`, kiểm tra realtime GA               | Sự kiện về GA                                                                      |
| 5     | Facebook Pixel (F22)                  | tắt                                   | env Pixel ID + `ENABLE=true` (nếu chạy ads)    | Developer           | `.env` (prod)                                                                                          | `build`                                     | Pixel nhận event                                                                   |
| 5     | Search Console (F23)                  | trống                                 | env verification                               | Developer           | `.env` (prod)                                                                                          | `build`                                     | Xác minh sở hữu domain                                                             |

---

## Kiểm thử cần chạy lại sau mỗi thay đổi

Chạy tuần tự (trên máy có toolchain đầy đủ — không chạy được trong sandbox Linux hiện tại):

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test          # gồm site-config.test.ts, content.test.ts (alt-text, tính hợp lệ nội dung)
npm run build
npm run check:placeholders   # script mới - xem docs mục 12 của audit
```

Nếu môi trường hỗ trợ E2E:

```bash
npm run test:e2e
```

**Done tổng thể để deploy:** Pha 1 xong + `check:placeholders` không còn cảnh báo P0 + `build` PASS + đăng nhập admin bằng credential thật + disclaimer đã xác nhận.
