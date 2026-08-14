# REFACTOR-01 — Báo cáo

**Ngày:** 13/08/2026
**Mục tiêu:** chuyển website thành landing page production-ready, static export, deploy trên Cloudflare Pages.
**Trạng thái:** ✅ Đủ điều kiện deploy. `npm run build` sinh ra `out/` thành công.

---

## 1. Tóm tắt

| Hạng mục        | Trước                                     | Sau                          |
| --------------- | ----------------------------------------- | ---------------------------- |
| Kiến trúc       | Next.js + Postgres + Prisma + admin + API | Static export, không backend |
| Lệnh build      | `prisma generate && next build`           | `next build` → `out/`        |
| Cần máy chủ     | Có (serverless functions + DB)            | Không                        |
| Chi phí hạ tầng | Postgres + host trả phí                   | Cloudflare Pages free        |
| Trang           | 9 (gồm 5 trang admin)                     | 23 file HTML tĩnh            |
| Ảnh thật        | 0                                         | 7 (WebP) + 1 video           |
| Testimonial     | 7 mục **nội dung mẫu**                    | Đã gỡ (chờ cảm nhận thật)    |
| Unit test       | 97 pass                                   | 91 pass                      |
| E2E test        | 16 pass                                   | 33 pass (15 + 18 mới)        |

---

## 2. Đã refactor những gì

### 2.1 Static export (mục 2 của đề bài)

`next.config.ts` chuyển sang:

```ts
output: 'export';
images: {
  unoptimized: true;
}
trailingSlash: true;
```

Ba việc phải xử lý kèm theo, vì `output: 'export'` làm mất một số tính năng:

| Mất gì                         | Xử lý                                                                                                                                              |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `headers()` không còn hiệu lực | Chuyển toàn bộ header bảo mật sang [`public/_headers`](../public/_headers) — định dạng riêng của Cloudflare Pages, được copy nguyên vẹn vào `out/` |
| Tối ưu ảnh lúc chạy            | Nén sẵn sang WebP bằng `scripts/process-photos.mjs`                                                                                                |
| Metadata routes báo lỗi        | Thêm `export const dynamic = 'force-static'` vào `robots.ts`, `sitemap.ts`, `manifest.ts`                                                          |

`next start` không dùng được với static export, nên Playwright được chuyển sang phục vụ **trực tiếp thư mục `out/`**. Nhờ vậy E2E kiểm chứng đúng thứ sẽ deploy, kể cả cách `trailingSlash` sinh thư mục con.

### 2.2 Backend (mục 3)

Đã xoá ở các lượt trước và **xác minh lại lần này**: không còn `prisma/`, `src/app/api/`, `src/app/admin/`, `src/features/`, `src/middleware.ts`, `src/lib/db`, `src/lib/auth`, `src/lib/rate-limit`, `src/lib/security`.

Lượt này gỡ nốt `server-only` khỏi dependencies (không còn ai import).

**Dependencies runtime còn lại:** `clsx`, `lucide-react`, `next`, `react`, `react-dom`, `tailwind-merge`, `zod`.

### 2.3 Nội dung trust-first (mục 4)

Dữ liệu đã xác nhận được đưa vào `src/config/site.ts` — nguồn sự thật duy nhất:

- `teacher.employmentStatus = 'Giáo viên cơ hữu'` (tách riêng khỏi `title` vì đây là chi tiết phân biệt quan trọng nhất với "cò tuyển sinh")
- `teacher.centerName` = tên đầy đủ trung tâm
- `contact.address` = Km 18 Võ Nguyên Giáp, Linh Trung, Thủ Đức, TP.HCM
- `contact.consultLocation` = Lầu 2, trong khuôn viên trung tâm _(biến mới)_
- `url` = https://thaytungdaylaixe.vn

**Không thêm:** số học viên, tỷ lệ đậu, học phí cụ thể, testimonial, giải thưởng, chứng chỉ.

#### Xử lý disclaimer — điểm quan trọng nhất

`TRUST_AUDIT_REPORT.md` mục 3 yêu cầu chọn dứt khoát: **hoặc** chứng minh quan hệ với Trường ĐH An ninh Nhân dân và nêu rõ, **hoặc** bỏ hẳn mọi ám chỉ.

Đề bài chọn phương án đầu. Nhưng disclaimer cũ lại _phủ nhận_ quan hệ đó, nên đã viết lại để nêu **đồng thời hai ý**:

> Đây là trang cá nhân của thầy Tùng — **giáo viên cơ hữu tại** [tên trung tâm] — dùng để tư vấn và hướng dẫn học viên. Đây **không phải cổng thông tin chính thức** của Trung tâm hay Nhà trường. Lịch khai giảng, học phí và quy định đào tạo do Trung tâm công bố và cần được xác nhận lại tại thời điểm đăng ký.

Thiếu ý đầu → phủ nhận quan hệ có thật. Thiếu ý sau → thành mạo danh. Có test bảo vệ cả hai (`site-config.test.ts`).

### 2.4 Trang chủ (mục 5)

Thứ tự các mục bám theo thứ tự câu hỏi của người đang cân nhắc bỏ ra 20–30 triệu:

| #   | Mục                      | Trả lời câu hỏi        |
| --- | ------------------------ | ---------------------- |
| 1   | Hero                     | Đây là ai, học ở đâu?  |
| 2   | Trust badges _(mới)_     | Có gì bảo đảm?         |
| 3   | Về thầy                  | Người dạy là ai?       |
| 4   | Video buổi học           | Cho tôi xem thầy dạy   |
| 5   | Học ở đâu _(mới)_        | Địa điểm, đến thế nào? |
| 6   | Quy trình 6 bước _(mới)_ | Đăng ký ra sao?        |
| 7   | Khóa học                 | Có những khóa nào?     |
| 8   | Cách thầy hướng dẫn      | Dạy thế nào?           |
| 9   | Album ảnh                | Xem thêm hình          |
| 10  | FAQ                      | Còn thắc mắc           |
| 11  | Liên hệ                  | CTA cuối trang         |

**Hero** dùng đúng tiêu đề và subtitle đề bài yêu cầu, với ba CTA tương ứng ba mức độ sẵn sàng: gọi ngay (sẵn sàng), nhắn Zalo (còn ngại gọi), đến tư vấn tại trung tâm (muốn kiểm chứng).

**Quy trình** rút từ 9 bước xuống 6 theo đề bài. Bản 9 bước đầy đủ vẫn giữ ở `/hoc-phi-lo-trinh` — `LearningProcessSection` giờ nhận `steps` qua prop nên dùng chung được cả hai.

### 2.5 Bỏ cảm giác "cò tuyển sinh" (mục 6)

**Gỡ toàn bộ 7 testimonial mẫu** cùng trang `/cam-nhan-hoc-vien`, component hiển thị, và mục trong nav/sitemap. Lý do: dù đã gắn nhãn "Nội dung mẫu", với một landing page chạy Google Ads thì đây là thứ làm mất lòng tin nhanh nhất khi người đọc nhận ra. Hướng dẫn khôi phục khi có cảm nhận thật được ghi lại trong `src/types/content.ts`.

**Sửa từ ngữ học phí** ở `/hoc-phi-lo-trinh` — nói rõ tiền đóng cho ai:

> Học phí do trung tâm công bố, và bạn đóng trực tiếp cho trung tâm chứ không đóng cho tôi. Tôi không thu bất kỳ khoản nào riêng và không nhận tiền đặt cọc giữ chỗ.

**Quét từ ngữ cấm** trên toàn bộ nội dung: không có "bao đậu", "cam kết đậu", "chống trượt", "rẻ nhất", "ưu đãi sốc", "kẻo hết chỗ", "nhanh tay", "số lượng có hạn". Có test tự động (`landing-page.spec.ts`) chặn tái phát.

### 2.6 Hình ảnh (mục 7)

Cấu trúc mới:

```
public/images/
  teacher/   thay-tung-chan-dung.webp, thay-tung-cabin.webp,
             thay-tung-huong-dan-hoc-vien.webp, buoi-hoc-thuc-te-poster.jpg
  center/    cong-trung-tam.svg (placeholder), san-tap-xe-tap-lai.webp,
             dan-xe-tap-lai.webp, cabin-mo-phong.webp
  courses/   (SVG minh họa)
  gallery/   (SVG minh họa còn lại)
  blog/ brand/ og/
```

Toàn bộ ảnh thật chuyển sang **WebP**, nhỏ hơn JPEG 25–35% ở cùng chất lượng:

| File                                        | Dung lượng |
| ------------------------------------------- | ---------- |
| `teacher/thay-tung-huong-dan-hoc-vien.webp` | 44 KB      |
| `teacher/thay-tung-chan-dung.webp`          | 55 KB      |
| `teacher/thay-tung-cabin.webp` (hero)       | 72 KB      |
| `center/cabin-mo-phong.webp`                | 49 KB      |
| `center/dan-xe-tap-lai.webp`                | 127 KB     |
| `center/san-tap-xe-tap-lai.webp`            | 140 KB     |
| `og/og-default.jpg` (giữ JPEG)              | 72 KB      |

Ảnh OG **cố ý giữ JPEG**: nhiều trình thu thập của Zalo và một số phiên bản Facebook không đọc được WebP khi render ảnh xem trước.

Tổng: **15,4 MB ảnh gốc → 0,5 MB**. Mọi ảnh đều có `width`/`height` (chống nhảy layout), `loading="lazy"` trừ ảnh hero dùng `priority` + `fetchPriority="high"`, và `sizes` responsive.

### 2.7 SEO (mục 8)

- Domain production `https://thaytungdaylaixe.vn` → canonical, OG, sitemap
- **Meta description rút từ ~285 xuống 152 ký tự** — bản cũ vượt xa ngưỡng Google cắt (~160) nên bị cụt giữa chừng trên trang kết quả
- JSON-LD: `WebSite`, `Person`, **`EducationalOrganization` (mới)**, `ProfessionalService`, `FAQPage`, `Course`, `Article`, `BreadcrumbList`
- Quan hệ mô hình hoá qua `Person.worksFor → EducationalOrganization`. **Không đảo ngược** (không lấy tổ chức làm thực thể chính) vì như vậy thành mạo danh trung tâm
- `PostalAddress` thật cho trung tâm và cho `CourseInstance.location`
- **Không có** `aggregateRating`, `review`, `ratingValue` — có test chặn
- Thêm `manifest.webmanifest`

### 2.8 CTA (mục 9)

| Kích thước | Cơ chế                                                               |
| ---------- | -------------------------------------------------------------------- |
| < 1024px   | Thanh CTA ngang cố định đáy màn hình (Gọi / Zalo / Facebook)         |
| ≥ 1024px   | Hai nút nổi góc phải dưới (Zalo + Gọi) — component `FloatingCta` mới |

Hai component bổ sung nhau chứ không hiện cùng lúc — hiện cả hai sẽ che nội dung trên điện thoại. Không popup, không tự bung, không đếm ngược.

---

## 3. Code đã xoá

| Đường dẫn                                                      | Lý do                                 |
| -------------------------------------------------------------- | ------------------------------------- |
| `src/app/cam-nhan-hoc-vien/`                                   | Trang chỉ chứa nội dung mẫu           |
| `src/components/testimonials/`                                 | Không còn nơi dùng                    |
| `src/components/sections/testimonials-section.tsx`             | Không còn nơi dùng                    |
| `src/content/testimonials.ts`                                  | 7 mục đều là nội dung mẫu             |
| `public/images/gallery/video-placeholder.svg`                  | Mồ côi sau khi gỡ testimonial         |
| `public/images/about/`, `public/images/hero/`                  | Gộp vào `teacher/`                    |
| `Testimonial` interface                                        | Thay bằng ghi chú hướng dẫn khôi phục |
| `server-only` (dependency)                                     | Không còn ai import                   |
| Test testimonial trong `accordion.test.tsx`, `content.test.ts` | Theo code đã xoá                      |

---

## 4. Hiệu năng

| Chỉ số                  | Giá trị                       |
| ----------------------- | ----------------------------- |
| First Load JS (chia sẻ) | **103 kB**                    |
| Trang chủ               | 3,69 kB + 103 kB = **140 kB** |
| Tổng `out/`             | 11 MB (5,6 MB là video)       |
| `out/_next`             | 1,2 MB                        |
| `out/images`            | 704 KB                        |
| Số file HTML tĩnh       | 23                            |

Các tối ưu đã áp dụng:

- **Font**: `next/font` với `display: 'swap'`, self-host, chỉ subset `vietnamese` + `latin` → không có request tới Google Fonts, không cần `preconnect`
- **Ảnh hero**: `priority` + `fetchPriority="high"` → trình duyệt tải sớm, cải thiện LCP
- **Video 5,6 MB**: `preload="none"` + chỉ hiện ảnh poster 55 KB. Thẻ `<video>` chỉ được gắn vào trang khi người dùng bấm play — nếu không sẽ tốn 5,6 MB cho mọi lượt vào trang
- **Cache**: `_next/static/*` cache vĩnh viễn (`immutable`), ảnh/video 30 ngày — khai báo trong `_headers`
- **Hydration**: chỉ 4 component là client (`MobileCtaBar`, `FloatingCta`, `VideoPlayer`, `Accordion` và các nút CTA), phần còn lại là Server Component render sẵn

> **Chưa đo Lighthouse thực tế.** Cần chạy sau khi deploy lên domain thật vì điểm số phụ thuộc mạng và TTFB của Cloudflare. Xem mục 7.

---

## 5. Trust audit — đối chiếu từng vấn đề

| Vấn đề trong `TRUST_AUDIT_REPORT.md` | Thay đổi cụ thể                                                | Trạng thái |
| ------------------------------------ | -------------------------------------------------------------- | ---------- |
| Thiếu ảnh thật của thầy              | 3 ảnh thật: chân dung, hero cabin, hướng dẫn học viên          | ✅         |
| Thiếu bằng chứng giảng dạy           | Video 37s quay buổi học thật, có ảnh poster                    | ✅         |
| Thiếu bằng chứng trung tâm           | Ảnh xe tập lái, sân tập, cabin mô phỏng                        | ✅         |
| Thiếu địa điểm cụ thể                | Mục "Học ở đâu": tên trung tâm + địa chỉ + Lầu 2 + Google Maps | ✅         |
| Vấn đề "Trường ĐH An ninh Nhân dân"  | Nêu rõ quan hệ cơ hữu + giữ disclaimer về giới hạn website     | ✅         |
| Thiếu quy trình rõ ràng              | Quy trình 6 bước trên trang chủ                                | ✅         |
| Thiếu minh bạch chi phí              | Nói rõ đóng cho trung tâm, thầy không thu, không nhận cọc      | ✅         |
| Công bố họ tên đầy đủ + số GPLX      | Chưa có — cần thầy cung cấp                                    | ⏳         |
| 3–5 cảm nhận học viên thật           | Đã gỡ bản mẫu; chờ cảm nhận thật                               | ⏳         |
| Khoảng học phí tham khảo             | Chưa có — cần trung tâm công bố                                | ⏳         |
| Facebook/YouTube thật                | Chưa có — đang để placeholder, nút tự ẩn                       | ⏳         |
| Ảnh cổng trung tâm                   | Đang dùng placeholder SVG                                      | ⏳         |

---

## 6. Cloudflare Pages readiness

| Yêu cầu                                             | Trạng thái                                                         |
| --------------------------------------------------- | ------------------------------------------------------------------ |
| `npm run build` PASS                                | ✅                                                                 |
| `out/` được tạo                                     | ✅ 23 file HTML                                                    |
| Không dependency server                             | ✅                                                                 |
| Không lỗi export                                    | ✅                                                                 |
| Không dynamic route unsupported                     | ✅ tất cả là `○ Static` hoặc `● SSG`                               |
| Không phụ thuộc tối ưu ảnh phía máy chủ             | ✅ `images.unoptimized`                                            |
| `_headers` được copy vào `out/`                     | ✅                                                                 |
| `robots.txt`, `sitemap.xml`, `manifest.webmanifest` | ✅                                                                 |
| Tài liệu deploy                                     | ✅ [`docs/CLOUDFLARE_PAGES_DEPLOY.md`](CLOUDFLARE_PAGES_DEPLOY.md) |

### Kết quả kiểm thử

```
npm run format:check   ✅ All matched files use Prettier code style
npm run lint           ✅ không cảnh báo
npm run typecheck      ✅ không lỗi
npm run test           ✅ 91/91 pass
npm run build          ✅ out/ được tạo
npx playwright test    ✅ 33/33 pass (15 public-pages + 18 landing-page)
```

E2E mới bao phủ: 3 CTA hero trỏ đúng nơi, CTA trên mọi trang, địa chỉ và vị trí công tác hiển thị, đủ 6 bước quy trình, không có từ ngữ cấm, disclaimer nêu đủ hai ý, **mọi ảnh tải được** (kiểm tra `naturalWidth`), ảnh hero có `width`/`height`, không tràn ngang ở 390/768/1024/1440px, CTA đúng theo kích thước màn hình, JSON-LD đúng loại, không có review giả, manifest tải được.

---

## 7. Việc còn lại

### Chặn phát hành

> Cập nhật 14/08/2026: mục 1 và 3 **đã được xác nhận**. Chỉ còn mục 2.
> Xem `docs/FINAL_PREVIEW_QA.md` mục 7.

1. ✅ ~~**Xác nhận đã xin phép học viên** xuất hiện trong ảnh.~~ Đã xác nhận 14/08/2026 — cam kết trên trang Điều khoản là đúng sự thật.
2. ⏳ **Xác nhận bản quyền** hai ảnh `cabin-mo-phong` và `dan-xe-tap-lai` — tên file gốc gợi ý có thể tải từ web của trung tâm. **Chưa xác nhận.**
3. ✅ ~~**Điền `NEXT_PUBLIC_GOOGLE_MAPS_URL`** trỏ đúng vị trí trung tâm.~~ Đã xác nhận 14/08/2026 — link chỉ đúng địa chỉ Km 18 Võ Nguyên Giáp.

### Nên làm trước khi chạy Google Ads

4. **Ảnh cổng trung tâm** — thay `center/cong-trung-tam.svg`. Đây là bằng chứng "học tại trung tâm" mạnh nhất còn thiếu.
5. **Họ tên đầy đủ + số/hạng GPLX + chứng nhận giáo viên dạy thực hành** của thầy.
6. **Facebook/YouTube thật** → điền `NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_YOUTUBE_URL`. Hiện nút tự ẩn.
7. **Khoảng học phí tham khảo** do trung tâm công bố.
8. **Chạy Lighthouse trên domain thật** sau deploy, đối chiếu ngưỡng đề bài (Performance ≥ 90, SEO ≥ 95, Best Practices ≥ 95, Accessibility ≥ 90).

### Tuỳ chọn

9. **Cảm nhận học viên thật** (3–5 mục, đã xin phép) → khôi phục theo hướng dẫn trong `src/types/content.ts`.
10. **Ảnh sa hình, đường trường, lý thuyết** để thay 3 SVG minh họa còn lại trong album.
11. **Cân nhắc đưa video lên YouTube** thay vì tự host, nếu lưu lượng tăng — hiện 5,6 MB/lượt xem, Cloudflare free 100 GB/tháng cho khoảng 18.000 lượt.
