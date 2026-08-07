# Kiểm kê dữ liệu giả / mẫu / placeholder — Website Thầy Tùng Dạy Lái Xe

> Ngày audit: 2026-08-07 · Người thực hiện: Claude (Cowork) · Nhánh: `master`
> Phạm vi: kiểm thử quality gate + kiểm kê toàn bộ mock/sample/placeholder/cấu hình dev.
> **Không thay đổi dữ liệu thật, không tự sáng tác nội dung.** Chỉ thống kê và lập kế hoạch.

Tài liệu đi kèm:
`docs/MOCK_AND_SAMPLE_DATA_INVENTORY.csv` · `docs/THAY_TUNG_CONTENT_CHECKLIST.md` · `docs/DATA_REPLACEMENT_PLAN.md` · `scripts/check-production-placeholders.ts`

---

## 1. Executive summary

Đây là một codebase **được xây dựng rất kỷ luật về mặt trung thực dữ liệu**. Phần lớn "dữ liệu giả" ở đây **không phải lỗi** mà là placeholder có chủ đích, được xử lý phòng thủ: khi chưa cấu hình, UI tự ẩn đi ("Đang cập nhật"), nút CTA tự vô hiệu hoá, JSON-LD tự lược bỏ, và mọi nội dung mẫu đều gắn cờ `isPlaceholder`. Vì vậy đa số phát hiện thuộc nhóm *cần cung cấp thông tin thật* hơn là *phải sửa gấp một lỗi nguy hiểm*.

| Chỉ số | Số lượng |
|---|---:|
| **Tổng phát hiện** | **27** |
| P0 (phải xử lý trước deploy) | 4 |
| P1 (trước khi chạy quảng cáo) | 13 |
| P2 (hoàn thiện sớm) | 8 |
| P3 (cải tiến sau) | 2 |
| MOCK_PRODUCTION_RISK | 2 |
| PLACEHOLDER_REQUIRED (cần thầy cung cấp) | 5 |
| SAMPLE_CONTENT_REVIEW (cần review) | 4 |
| NEEDS_CONFIRMATION | 6 |
| CONFIGURATION_REQUIRED | 8 |
| DEVELOPMENT_SEED | 1 |
| TEST_FIXTURE_SAFE | 1 |
| DEAD_OR_UNUSED_DATA | 0 |

**Kết luận sẵn sàng:** Website **đã sẵn sàng về mặt kỹ thuật để nhận dữ liệu thật** — kiến trúc đã tách nội dung khỏi code (một nguồn sự thật duy nhất là `src/config/site.ts` + các file `src/content/*`), và có sẵn cơ chế placeholder an toàn. Chưa thể deploy production **chỉ vì thiếu cấu hình thật** (domain, database, tài khoản admin) và **thiếu thông tin/hình ảnh thật của thầy Tùng**, chứ không phải vì có dữ liệu giả nguy hiểm đang giả mạo dữ liệu thật.

**Bốn việc chặn deploy (P0):** đổi `NEXT_PUBLIC_SITE_URL` sang domain thật, đặt `DATABASE_URL` production, đặt `ADMIN_EMAIL`/`ADMIN_PASSWORD` thật (hiện `admin@example.com` / `change-me`). `AUTH_SECRET` **đã** được đặt giá trị ngẫu nhiên hợp lệ (57 ký tự) — **không** phải blocker.

---

## 2. Phạm vi và phương pháp

**Thư mục đã đọc:** toàn bộ `src/` (app, components, content, config, features, lib, types, middleware), `prisma/` (schema, seed, migrations, schema.postgresql.prisma), `public/`, `docs/`, `tests/`, cùng `package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `vitest.config.ts`, `playwright.config.ts`, `.env`, `.env.example`, `.gitignore`, `README.md`, `IMPLEMENTATION_LOG.md`.

**Pattern đã quét:** `mock, sample, fixture, fake, faker, dummy, demo, seed, placeholder, lorem, localhost, example.com, example@, 0900000000, 0123456789, change-me, todo, fixme, hardcoded, isPlaceholder, secret, default, fallback` cùng các cụm tiếng Việt `Nội dung mẫu, Dữ liệu mẫu, Đang cập nhật, Tên thầy, Số điện thoại, Zalo URL, Địa chỉ, Tên trung tâm`, và literal số/tiền/%/ngày. Mỗi phát hiện được **lần theo nơi import → render** để xác định có thật sự lên production UI hay không, không kết luận chỉ theo tên biến.

**Quality gate:** xem mục dưới. **Giới hạn của audit:** sandbox chạy Linux nhưng `node_modules` được cài trên Windows của chủ dự án; các gói native theo nền tảng (Prisma query engine, `@rollup/rollup-linux-x64-gnu`) thiếu, và egress mạng bị chặn nên không thể `npm ci`. Do đó **build / test / seed / E2E không chạy được trong sandbox** và được đánh dấu `BLOCKED_BY_ENVIRONMENT` — chủ dự án chạy được đầy đủ trên máy Windows. Việc **mở từng route bằng trình duyệt để chụp ảnh cũng không thực hiện được** (không build được); thay vào đó "có render ở production không" được xác định bằng **truy vết import tĩnh** (đã trace từng file content tới page/component sử dụng).

### Quality gate — kết quả thật

| Lệnh | Kết quả | Ghi chú |
|---|---|---|
| `npm ci` | `BLOCKED_BY_ENVIRONMENT` | egress bị chặn; `node_modules` hiện có là bản cài trên Windows |
| `npm run db:generate` | `BLOCKED_BY_ENVIRONMENT` | `prisma generate` treo (engine hiện có là `query_engine-windows.dll.node`, cần engine Linux, mạng chặn) |
| `npm run format:check` | `NOT VERIFIED` | timeout trong sandbox (plugin `prettier-plugin-tailwindcss` chậm). Cần chạy trên máy chủ dự án |
| `npm run lint` | `NOT VERIFIED` | timeout ở 43s trong sandbox; không kết luận được |
| `npm run typecheck` | **PASS** | `tsc --noEmit` chạy sạch, 0 lỗi (types Prisma đã generate sẵn nên không cần engine) |
| `npm run test` | `BLOCKED_BY_ENVIRONMENT` | Vitest không khởi động: thiếu `@rollup/rollup-linux-x64-gnu` (native, cài trên Windows) |
| `npm run test:e2e` | `BLOCKED_BY_ENVIRONMENT` | cần build + Prisma + trình duyệt Playwright |
| `npm run build` | `BLOCKED_BY_ENVIRONMENT` | script build = `prisma generate && next build` → dừng ngay ở `prisma generate` |
| migrate / seed | `BLOCKED_BY_ENVIRONMENT` | cần Prisma engine Linux |

Không sửa test để che lỗi, không dùng `.skip`/`.only`. Không sửa business logic.

---

## 3. Phát hiện quan trọng cho production (production-critical)

| ID | Priority | Category | Data | File | Dòng | Dùng tại | Giá trị hiện tại | Hành động |
|----|----------|----------|------|------|------|----------|------------------|-----------|
| F01 | P0 | CONFIGURATION_REQUIRED | Site URL / domain | `.env`, `.env.example`, `src/lib/env/public.ts` | 13 (public.ts) | Toàn bộ canonical, OG, sitemap, robots, JSON-LD (qua `siteConfig.url`) | `http://localhost:3000` | Đặt `NEXT_PUBLIC_SITE_URL=https://thaytungdaylaixe.vn` cho production |
| F02 | P0 | CONFIGURATION_REQUIRED | Mật khẩu admin | `.env` | `ADMIN_PASSWORD` | Seed + đăng nhập `/admin/login` | `chang***` (mặc định `.env.example`) | Đặt mật khẩu mạnh thật (seed đã tự chặn `change-me` khi `NODE_ENV=production`) |
| F03 | P0 | CONFIGURATION_REQUIRED | Email admin | `.env` | `ADMIN_EMAIL` | Tài khoản đăng nhập admin | `adm***@example.com` | Đặt email thật của thầy/quản trị |
| F04 | P0 | CONFIGURATION_REQUIRED | Database | `.env`, `prisma/schema.prisma` | `DATABASE_URL` | Lưu toàn bộ Lead + AdminUser | `file:./dev.db` (SQLite dev) | Chuyển provider → PostgreSQL (đã có sẵn `prisma/schema.postgresql.prisma`) và đặt `DATABASE_URL` production |
| F05 | P1 | MOCK_PRODUCTION_RISK | 6 cảm nhận học viên mẫu | `src/content/testimonials.ts` | 20–82 (`tm-01`..`tm-06`) | `/` , `/cam-nhan-hoc-vien`, `/gioi-thieu` | `isPlaceholder: true`, tên chung ("Học viên khóa số tự động"), `period: 'Nội dung mẫu'` | Thay bằng cảm nhận thật **đã được học viên đồng ý**, hoặc để trống. Xem lưu ý ở mục 7 |
| F06 | P1 | MOCK_PRODUCTION_RISK | 2 vị trí video cảm nhận | `src/content/testimonials.ts` | 105–119 (`video-01/02`) | `/cam-nhan-hoc-vien` | `videoUrl: null` (hiện khung chờ) | Cung cấp video thật (có đồng ý) hoặc giữ khung chờ |
| F07 | P1 | PLACEHOLDER_REQUIRED | Email liên hệ | `.env` | `NEXT_PUBLIC_CONTACT_EMAIL` | Footer, trang Liên hệ, JSON-LD Person | `[Email]` (UI tự ẩn) | Cung cấp email thật hoặc quyết định không dùng |
| F08 | P1 | PLACEHOLDER_REQUIRED | Facebook URL | `.env` | `NEXT_PUBLIC_FACEBOOK_URL` | Footer, JSON-LD `sameAs` | `[Facebook URL]` (UI tự ẩn) | Cung cấp URL trang Facebook |
| F09 | P1 | PLACEHOLDER_REQUIRED | YouTube URL | `.env` | `NEXT_PUBLIC_YOUTUBE_URL` | Footer, JSON-LD `sameAs` | `[YouTube URL]` (UI tự ẩn) | Cung cấp URL kênh (hoặc TikTok thay thế) |
| F10 | P1 | PLACEHOLDER_REQUIRED | Google Maps URL | `.env` | `NEXT_PUBLIC_GOOGLE_MAPS_URL` | Trang Liên hệ (nút chỉ đường) | `[Google Maps URL]` (UI tự ẩn) | Cung cấp link Google Maps điểm hẹn/sân tập |
| F11 | P1 | NEEDS_CONFIRMATION | Cách hiển thị tên thầy | `.env` | `NEXT_PUBLIC_TEACHER_NAME` | Header, hero, JSON-LD Person, title | `Tùng` → hiển thị "Thầy Tùng" | Xác nhận đúng cách xưng hô/hiển thị mong muốn |
| F12 | P1 | NEEDS_CONFIRMATION | Chức danh | `.env` (đánh dấu "tạm") | `NEXT_PUBLIC_TEACHER_TITLE` | About, JSON-LD `jobTitle` | `Giáo viên dạy thực hành lái xe` | Thầy xác nhận chức danh đúng |
| F13 | — | **VERIFIED_REAL_DATA** (07/08/2026) | Kinh nghiệm giảng dạy | `.env` | `NEXT_PUBLIC_EXPERIENCE_LABEL` | Hero, "Về thầy", `/gioi-thieu`, Person JSON-LD | **`Gần 20 năm`** — đã xác nhận | ✅ Đóng. Lưu dạng nhãn chữ, không làm tròn thành "20 năm" |
| F13b | — | **VERIFIED_REAL_DATA** (07/08/2026) | Đối tượng học viên đã giảng dạy | `.env` | `NEXT_PUBLIC_STUDENT_GROUPS` / `_SHORT` | Hero (trust), "Về thầy", `/gioi-thieu` | **`học viên hệ dân sự và hệ Công an`** | ⭘ Nên xác nhận cách gọi chính thức của trung tâm; đổi wording chỉ cần sửa env |
| F14 | P1 | NEEDS_CONFIRMATION | Tên trung tâm | `.env` (đánh dấu "tạm") | `NEXT_PUBLIC_CENTER_NAME` | About, footer | `Trung tâm đào tạo lái xe tại TP.HCM` (chung chung) | Xác nhận tên trung tâm thật + quan hệ (mục 4) |
| F15 | P1 | NEEDS_CONFIRMATION | Địa chỉ / khu vực / giờ | `.env` (đánh dấu "tạm") | `NEXT_PUBLIC_ADDRESS`, `_TRAINING_AREA`, `_CONTACT_HOURS` | Footer, hero, Liên hệ | `TP. Thủ Đức...`, `7:00 - 20:00...` (tạm) | Thầy xác nhận địa chỉ/khu vực/giờ thật |
| F16 | P1 | NEEDS_CONFIRMATION | **Disclaimer nêu đích danh một trường** | `src/config/site.ts` | 103–104 | Footer (mọi trang) + trang pháp lý | Nhắc tên **"Trường Đại học An ninh Nhân dân"** trong câu miễn trừ | **Xác nhận quan hệ thật** với đơn vị này trước khi nêu tên; nếu không liên quan, bỏ tên cụ thể (xem mục 4) |
| F17 | P1 | PLACEHOLDER_REQUIRED | 24 ảnh minh hoạ SVG | `public/images/**` | — | Hero, About, 5 khóa học, 7 gallery, 8 blog, 1 OG | Toàn bộ là SVG hình học sinh tự động (không phải ảnh thật) | Cung cấp ảnh thật theo `docs/REQUIRED_ASSETS.md`. Riêng OG phải là ảnh raster 1200×630 |

*Không ghi giá trị đầy đủ của secret. `AUTH_SECRET` đã được đặt giá trị ngẫu nhiên 57 ký tự — đạt yêu cầu, không liệt kê ở đây như blocker.*

---

## 4. Dữ liệu thương hiệu và liên hệ

Tất cả đều đọc từ **một nguồn** (`src/config/site.ts` ← `NEXT_PUBLIC_*` trong `.env`). Không có component nào hard-code trực tiếp — đây là điểm rất tốt.

| Trường | Nguồn | Giá trị hiện tại | Trạng thái | Hiển thị tại |
|---|---|---|---|---|
| Tên thầy | `NEXT_PUBLIC_TEACHER_NAME` | `Tùng` | **Thật** (xác nhận cách hiển thị) | Header, hero, title, JSON-LD |
| Thương hiệu | dẫn xuất `Thầy ${name}` | "Thầy Tùng" | Thật (dẫn xuất) | Header/footer |
| Chức danh | `NEXT_PUBLIC_TEACHER_TITLE` | `Giáo viên dạy thực hành lái xe` | Tạm — cần xác nhận | About, JSON-LD |
| Kinh nghiệm giảng dạy | `NEXT_PUBLIC_EXPERIENCE_LABEL` | `Gần 20 năm` | **VERIFIED_REAL_DATA** | Hero, About, `/gioi-thieu`, JSON-LD |
| Đối tượng học viên | `NEXT_PUBLIC_STUDENT_GROUPS` | `học viên hệ dân sự và hệ Công an` | **VERIFIED_REAL_DATA** | Hero, About, `/gioi-thieu` |
| Tên trung tâm | `NEXT_PUBLIC_CENTER_NAME` | `Trung tâm đào tạo lái xe tại TP.HCM` | Tạm — cần xác nhận | About, footer |
| SĐT | `NEXT_PUBLIC_PHONE_NUMBER` | `0967569733` | **Thật** | Header, hero, CTA, JSON-LD |
| Zalo | `NEXT_PUBLIC_ZALO_URL` | `https://zalo.me/0967569733` | **Thật** | Nút Zalo mọi nơi |
| Email | `NEXT_PUBLIC_CONTACT_EMAIL` | `[Email]` | Placeholder — UI ẩn | Footer, Liên hệ |
| Facebook | `NEXT_PUBLIC_FACEBOOK_URL` | `[Facebook URL]` | Placeholder — UI ẩn | Footer |
| YouTube | `NEXT_PUBLIC_YOUTUBE_URL` | `[YouTube URL]` | Placeholder — UI ẩn | Footer |
| Địa chỉ | `NEXT_PUBLIC_ADDRESS` | `TP. Thủ Đức, TP.HCM` | Tạm | Footer, Liên hệ |
| Khu vực đào tạo | `NEXT_PUBLIC_TRAINING_AREA` | `TP. Thủ Đức và các quận lân cận` | Tạm | Hero, Liên hệ |
| Google Maps | `NEXT_PUBLIC_GOOGLE_MAPS_URL` | `[Google Maps URL]` | Placeholder — UI ẩn | Liên hệ |
| Giờ liên hệ | `NEXT_PUBLIC_CONTACT_HOURS` | `7:00 - 20:00 hằng ngày` | Tạm | Footer, Liên hệ |
| Slogan/messaging | `siteConfig.messaging` | tự soạn | Review giọng thầy | Hero |
| Disclaimer | `siteConfig.disclaimer` (hard-code) | **nêu tên "Trường ĐH An ninh Nhân dân"** | **Cần xác nhận (F16)** | Footer mọi trang |

**Lưu ý F16 (quan trọng):** câu disclaimer được viết đúng tinh thần minh bạch ("website **không phải** cổng thông tin chính thức của…"). Tuy nhiên nó **nêu đích danh** "Trường Đại học An ninh Nhân dân" và "Trung tâm đào tạo lái xe". Việc nêu tên một đơn vị cụ thể — dù để phủ nhận liên quan — vẫn cần **thầy Tùng xác nhận đúng quan hệ thực tế**: (a) nếu thầy thực sự dạy tại/hợp tác tuyển sinh cho trung tâm gắn với trường này thì giữ; (b) nếu không liên quan, nên **bỏ tên cụ thể** và dùng câu trung tính để tránh gây hiểu nhầm hoặc đụng chạm không cần thiết.

---

## 5. Dữ liệu khóa học

Nguồn: `src/content/courses.ts` (5 khóa). Render tại `/khoa-hoc`, `/khoa-hoc/[slug]`, section trang chủ. **Điểm rất tốt:** `tuition: null` cho cả 5 khóa → UI tự hiển thị "Vui lòng liên hệ…" thay vì bịa học phí; ngôn ngữ về hồ sơ/điều kiện/quy định đều hướng "xác nhận tại thời điểm đăng ký", không khẳng định pháp luật.

| Khóa (slug) | Giá trị hiện tại | Nguồn | Trạng thái | Xác nhận với | Hành động |
|---|---|---|---|---|---|
| `hang-b-so-tu-dong` | Tên, mô tả, 6 mục lộ trình, hồ sơ, 2 FAQ, ảnh SVG, `tuition:null` | courses.ts | SAMPLE_CONTENT_REVIEW | Thầy (giọng) + trung tâm (hồ sơ) | Review mô tả; thay ảnh; xác nhận `estimatedDuration` "khoảng 3 tháng" |
| `hang-b-so-san` | như trên | courses.ts | SAMPLE_CONTENT_REVIEW | Thầy + trung tâm | như trên |
| `hang-c1` | như trên + ghi chú điều kiện dự học "theo quy định hiện hành" | courses.ts | SAMPLE_CONTENT_REVIEW + legal | Thầy + trung tâm + quy định | Xác nhận điều kiện/hồ sơ C1 tại thời điểm đăng |
| `bo-tuc-tay-lai` | mô tả, lộ trình, `tuition:null` | courses.ts | SAMPLE_CONTENT_REVIEW | Thầy | Review giọng; thay ảnh |
| `luyen-sa-hinh` | mô tả, lộ trình, `tuition:null` | courses.ts | SAMPLE_CONTENT_REVIEW | Thầy | Review giọng; thay ảnh |

Danh sách khóa còn được dùng ở dropdown form (`courseOptions`) và admin (`getCourseLabel`) — nhất quán, không có option lạ ngoài `chua-xac-dinh` ("Chưa xác định - cần thầy tư vấn", hợp lệ).

---

## 6. Học phí và lịch khai giảng

**Không tìm thấy bất kỳ literal học phí, số tiền, %, "triệu", "giảm giá", countdown, hay ngày khai giảng cụ thể nào** trong toàn bộ `src/` (đã quét). Đây là chủ ý thiết kế:

- `tuition: null` ở mọi khóa → hiển thị `siteConfig.messaging.feeNotConfigured` = *"Vui lòng liên hệ để nhận thông tin học phí và lịch khai giảng…"*.
- `estimatedDuration` chỉ nêu định tính ("Khoảng 3 tháng, tùy lịch…") — cần thầy xác nhận nhưng không phải con số cứng gây hiểu nhầm.
- Không có badge "ưu đãi", "chỉ từ", "đăng ký hôm nay", không countdown giả.

⇒ Nhóm này **không có MOCK_PRODUCTION_RISK về giá**. Việc còn lại là thầy cung cấp học phí thật để hiển thị (tùy chọn — có thể tiếp tục để "liên hệ").

---

## 7. Cảm nhận học viên và số liệu uy tín

**Cảm nhận (F05, F06):** 6 mục `tm-01`..`tm-06` trong `testimonials.ts`, **tất cả `isPlaceholder: true`**, tên chung ("Học viên khóa số tự động"…), `period: 'Nội dung mẫu'`. Cơ chế bảo vệ hiện có:

1. Card luôn hiển thị `· Nội dung mẫu` cạnh tên khi `isPlaceholder` (không phụ thuộc badge).
2. `TestimonialsSection` và trang `/cam-nhan-hoc-vien` hiển thị dòng thông báo "Các cảm nhận đang hiển thị là **nội dung mẫu**…".
3. Badge "Nội dung mẫu" (`PlaceholderBadge`) — **nhưng** `showPlaceholderBadge` mặc định **TẮT ở production** (bật ở dev). Nghĩa là trên production, badge nổi không hiện, chỉ còn (1) và (2).

⇒ Vì vẫn còn nhãn "Nội dung mẫu" ở tên + dòng thông báo, các cảm nhận **không bị trình bày như thật** → xếp **P1 MOCK_PRODUCTION_RISK** (không phải P0). Dù vậy, khuyến nghị **không chạy quảng cáo khi trang cảm nhận vẫn toàn nội dung mẫu**: thay bằng cảm nhận thật (có đồng ý) hoặc ẩn khu vực.

**Số liệu uy tín:** **không tồn tại** số học viên, tỷ lệ đậu, số khóa, rating, animation counter… ở bất kỳ đâu (đã quét literal số + `trustIndicators` chỉ là các nhãn định tính như "Tư vấn trực tiếp bởi thầy"). Không có `aggregateRating`/`review` giả trong JSON-LD. Đây là điểm mạnh — không có số liệu bịa cần gỡ.

---

## 8. Blog và nội dung SEO

Nguồn: `src/content/blog/*.ts` (8 bài) + `index.ts`. Render tại `/kien-thuc`, `/kien-thuc/[slug]`.

| Bài (slug) | Route | Trạng thái | Dữ kiện cần xác minh | Ảnh cần | Hành động |
|---|---|---|---|---|---|
| `so-san-hay-so-tu-dong` | /kien-thuc/so-san-hay-so-tu-dong | SAMPLE_CONTENT_REVIEW | không có số/giá cứng | bìa 1200×630 | Review giọng thầy |
| `chuan-bi-truoc-buoi-hoc-dau-tien` | … | SAMPLE_CONTENT_REVIEW | — | bìa | Review |
| `co-bang-nhung-khong-dam-lai` | … | SAMPLE_CONTENT_REVIEW | — | bìa | Review |
| `quy-trinh-dang-ky-hoc-lai-xe` | … | SAMPLE_CONTENT_REVIEW + legal | quy trình/hồ sơ theo quy định | bìa | Đối chiếu quy định hiện hành |
| `loi-thuong-gap-khi-hoc-sa-hinh` | … | SAMPLE_CONTENT_REVIEW | — | bìa | Review |
| `kinh-nghiem-lai-xe-duong-dong-tphcm` | … | SAMPLE_CONTENT_REVIEW | — | bìa | Review |
| `cach-giu-binh-tinh-khi-lai-xe` | … | SAMPLE_CONTENT_REVIEW | — | bìa | Review |
| `khi-nao-nen-bo-tuc-tay-lai` | … | SAMPLE_CONTENT_REVIEW | — | bìa | Review |

Ghi chú: **`author: 'Thầy dạy lái xe'`** (chung chung) ở cả 8 bài — trong JSON-LD Article sẽ tự thay bằng tên thầy nếu đã cấu hình, nhưng field hiển thị nên đổi sang "Thầy Tùng". **Ngày tháng** `publishedAt`/`updatedAt` là 2025 (ví dụ `2025-03`..`2025-08-28`) — **không có ngày tương lai** so với hôm nay (2026-08-07), nhưng là ngày tự đặt cho nội dung mẫu → nên cập nhật đúng ngày xuất bản thật khi chốt bài. Metadata (canonical/OG) toàn bộ dẫn xuất từ `siteConfig.url` → khớp F01.

---

## 9. FAQ

Nguồn: `src/content/faqs.ts` (9 câu chung) + FAQ theo từng khóa trong `courses.ts` (2/khóa). Render ở trang chủ (`FaqSection`), trang khóa học, và JSON-LD `FAQPage`.

| Nhóm | Ví dụ | Phân loại | Cần xác nhận |
|---|---|---|---|
| Cách bắt đầu / chọn khóa / tâm lý | "Người chưa từng lái xe có học được không?" | FAQ chung — dùng được | — |
| Hồ sơ | "Hồ sơ đăng ký gồm những gì?" | Cần xác nhận | Trung tâm + quy định hiện hành |
| Học phí (khoản mục) | "Học phí gồm những khoản nào?" | Cần xác nhận | Thầy + trung tâm (không nêu số — đã đúng) |
| Lịch học / thời gian | "Thời gian học dự kiến bao lâu?" (≈3 tháng) | Cần xác nhận | Thầy |
| Địa điểm | "Địa điểm học thực hành ở đâu?" | Cần xác nhận | Trung tâm |
| Điều kiện C1 | trong `courses.ts` | Cần kiểm tra quy định | Quy định hiện hành |

Toàn bộ FAQ đã tuân nguyên tắc: không nêu số học phí cứng, không cam kết kết quả thi, luôn hướng "xác nhận tại thời điểm đăng ký". Rủi ro pháp lý thấp; chủ yếu cần thầy/trung tâm xác nhận chi tiết vận hành.

---

## 10. Hình ảnh và assets

**24 file trong `public/images/` — tất cả là SVG minh hoạ sinh tự động** (`scripts/generate-placeholder-images.mjs`), không phải ảnh thật, không mô phỏng người thật. Đã có tài liệu yêu cầu ảnh rất chi tiết: `docs/REQUIRED_ASSETS.md`.

| Asset | Dùng tại | Loại hiện tại | Placeholder | Bản quyền | Cần thay |
|---|---|---|---|---|---|
| `hero/thay-va-xe-tap-lai.svg` | Hero trang chủ | SVG minh hoạ | Có | Tự sinh | **Ưu tiên cao** — ảnh thầy cạnh xe |
| `about/chan-dung-thay.svg` | About (/, /gioi-thieu) | SVG | Có | Tự sinh | **Ưu tiên cao** — chân dung thầy |
| `courses/*.svg` (5) | Trang khóa học | SVG | Có | Tự sinh | Ảnh minh hoạ 5 khóa |
| `gallery/*.svg` (6 + `video-placeholder.svg`) | Album (/, /gioi-thieu, /cam-nhan) | SVG | Có (`isPlaceholder:true`) | Tự sinh | Ảnh sân/xe/buổi học (có đồng ý học viên) |
| `blog/*.svg` (8) | Bìa 8 bài viết | SVG | Có | Tự sinh | 8 ảnh bìa 1200×630 |
| `og/og-default.svg` | Open Graph mặc định | **SVG** | Có | Tự sinh | **Phải là raster** 1200×630 (PNG/JPG) — nhiều mạng xã hội không đọc OG dạng SVG |
| `public/icon.svg` | Favicon | SVG icon | Một phần | Tự sinh | Tùy chọn — thay nếu có logo riêng |

Cảnh báo bản quyền/nhận diện (đã ghi trong REQUIRED_ASSETS.md): logo/màu **không được** gợi liên tưởng con dấu của trường/trung tâm; **không dùng ảnh AI giả người thật** trình bày như ảnh thầy/học viên.

---

## 11. Environment và cấu hình

| Biến | Scope | Bắt buộc | Fallback hiện tại | Giá trị production cần | Rủi ro |
|---|---|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | client | Có | `http://localhost:3000` | Domain thật | **P0** — sai canonical/OG/sitemap |
| `DATABASE_URL` | server | Có | `file:./dev.db` | Postgres production | **P0** — mất/không có DB |
| `ADMIN_EMAIL` | server | Có | `admin@example.com` | Email thật | **P0** |
| `ADMIN_PASSWORD` | server | Có | `change-me` | Mật khẩu mạnh | **P0** (seed chặn ở prod) |
| `AUTH_SECRET` | server | Có | **đã đặt (57 ký tự)** | (đã đạt) | OK |
| `NEXT_PUBLIC_TEACHER_NAME` | client | Có | `[Tên thầy]` (default) / `Tùng` (.env) | "Tùng" | OK — xác nhận hiển thị |
| `NEXT_PUBLIC_PHONE_NUMBER` | client | Có | `[Số điện thoại]` / `0967569733` | (đã đặt) | OK |
| `NEXT_PUBLIC_ZALO_URL` | client | Có | `[Zalo URL]` / zalo.me/… | (đã đặt) | OK |
| `NEXT_PUBLIC_CONTACT_EMAIL` | client | Không | `[Email]` | Email (tùy chọn) | P1 — UI ẩn nếu thiếu |
| `NEXT_PUBLIC_FACEBOOK_URL` / `_YOUTUBE_URL` / `_GOOGLE_MAPS_URL` | client | Không | `[...]` | URL thật | P1 — UI ẩn |
| `NEXT_PUBLIC_TEACHER_TITLE` / `_CENTER_NAME` / `_ADDRESS` / `_TRAINING_AREA` / `_CONTACT_HOURS` | client | Có (min 1) | giá trị tạm | Giá trị thật | P1 — cần xác nhận |
| `NEXT_PUBLIC_EXPERIENCE_LABEL` / `_STUDENT_GROUPS` / `_STUDENT_GROUPS_SHORT` | client | Có (min 1) | **giá trị thật đã xác nhận** | — | ✅ **VERIFIED_REAL_DATA** (07/08/2026) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | client | Không | `''` | GA4 ID | P2 — analytics tắt |
| `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` / `_ENABLE_FACEBOOK_PIXEL` | client | Không | `'' / false` | Pixel ID (nếu chạy ads) | P2 |
| `GOOGLE_SITE_VERIFICATION` | server | Không | `''` | Mã Search Console | P2 |
| `NEXT_PUBLIC_SHOW_PLACEHOLDER_BADGE` | client | Không | `''` (dev: bật, prod: tắt) | (giữ) | — |

**Điểm mạnh:** không có fallback secret nguy hiểm kiểu `process.env.X || "sample"`. Public env có default placeholder `[...]` **có chủ đích** (để dev chạy được); server env **bắt buộc** và validate bằng Zod, ném lỗi kèm tên biến (không lộ giá trị). `.env.example` đầy đủ, có hướng dẫn tạo `AUTH_SECRET`.

---

## 12. Dữ liệu seed database

Nguồn: `prisma/seed.ts`. Chạy thủ công qua `npm run db:seed` (không tự chạy khi build/deploy).

| Entity | Dữ liệu | Có thể chạy production? | Rủi ro lộ public | Xóa trước deploy? |
|---|---|---|---|---|
| AdminUser | Lấy từ `ADMIN_EMAIL`/`ADMIN_PASSWORD`, hash **bcrypt(12)**, `upsert` idempotent | Có (nếu đặt email/mật khẩu thật) | Không (chỉ dùng đăng nhập) | Không — nhưng đặt credential thật (F02/F03) |
| Lead × 8 | Tên VN, SĐT dải **`0912340001`..`0912340008`** (dải cấm trùng số thật), ghi chú gắn `[DEV SEED]`, UTM mẫu | **Không nên** | Có — hiện ở `/admin/leads` | **Có** — chỉ seed cho DB development/test |

Cơ chế an toàn: seed lead **idempotent** (bỏ qua nếu DB đã có bản ghi), mọi lead đánh dấu `SEED_MARKER = '[DEV SEED] Dữ liệu mẫu cho môi trường phát triển.'`, và **chặn `change-me` khi `NODE_ENV=production`**. ⇒ **DEVELOPMENT_SEED, P3** — an toàn miễn là **không seed lead vào database production** (chỉ seed admin).

---

## 13. Dữ liệu mẫu xác thực (authentication)

| Mục | Giá trị (đã che) | Trạng thái |
|---|---|---|
| Admin email | `adm***@example.com` | P0 — đặt email thật |
| Admin password | `chang***` (= mặc định `.env.example`) | P0 — đặt mật khẩu mạnh |
| `AUTH_SECRET` | đã đặt, 57 ký tự | OK |
| Fallback secret / hard-coded JWT / auth bypass / demo account trên trang login | **Không tồn tại** | OK |

Kiểm tra kỹ: `session-token.ts` bắt buộc secret ≥32 ký tự (ném lỗi nếu thiếu), JWT HS256 qua `jose`, verify không throw. Trang `/admin/login` **không** hiển thị tài khoản demo. Middleware bảo vệ `/admin`. Rate limiter cho login. **Không có** credential mặc định hard-code trong code, không có auth bypass dev. Đây là phần được làm chắc.

---

## 14. Cấu hình analytics

| Mục | Trạng thái | Ghi chú |
|---|---|---|
| GA4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID`) | Trống → **không render script** | CONFIGURATION_REQUIRED P2; có `anonymize_ip: true` khi bật |
| Facebook Pixel | Trống + `ENABLE=false` → **mặc định tắt** | Chỉ bật khi khai báo rõ |
| Google Site Verification | Trống → không render thẻ verify | P2 |
| Lớp trừu tượng `track.ts` | No-op an toàn khi chưa cấu hình; không throw | Không gửi PII; chỉ `console.debug` ở **dev** khi chưa gắn GA |

Không có ID mẫu/của dự án khác bị nhúng cứng; không gửi PII đi analytics; không có "mock analytics" giả lập gây nhầm. ⇒ Không có rủi ро tracking.

---

## 15. Test fixtures an toàn

| Mục | Vì sao an toàn |
|---|---|
| `tests/unit/*`, `tests/integration/*` | Chỉ chạy khi test; dùng `InMemoryLeadRepository` (`src/features/leads/infrastructure/in-memory-lead-repository.ts`) — không đụng DB production |
| `tests/e2e/*` + `prisma/e2e.db` | E2E dùng DB riêng `e2e.db` (gitignored `*.db`), global-setup riêng |
| `in-memory-lead-repository.ts` | Là test double hợp lệ, **không** được import ở đường production (production dùng `PrismaLeadRepository`) |

⇒ **TEST_FIXTURE_SAFE, P3.** Không bundle vào production, không hiển thị UI thật. Lưu ý tích cực: có test `site-config.test.ts`, `content.test.ts` kiểm tra tính hợp lệ của nội dung/alt-text — nên chạy lại sau khi thay dữ liệu.

---

## 16. Dữ liệu chết / không dùng

**Không phát hiện** dữ liệu chết đáng kể. Mọi export trong `src/content/*` đều được import và render (đã trace). `prisma/schema.postgresql.prisma` là bản schema thay thế cho production (không "chết" — là tài liệu chuyển đổi). `in-memory-lead-repository.ts` chỉ dùng cho test (không chết, có mục đích).

---

## 17. Thông tin cần thầy Tùng cung cấp

Xem checklist đầy đủ, có ví dụ định dạng và mức bắt buộc: **`docs/THAY_TUNG_CONTENT_CHECKLIST.md`**. Tóm tắt nhóm cần trước:

Liên hệ & thương hiệu: cách hiển thị tên ("Thầy Tùng"?), chức danh, số năm kinh nghiệm thật, email, Facebook, YouTube/TikTok, giờ liên hệ, logo (nếu có). · Trung tâm: tên trung tâm thật + **quan hệ chính xác** (F16 — có liên quan "Trường ĐH An ninh Nhân dân" không?). · Địa điểm: địa chỉ tư vấn, sân tập, nơi học lý thuyết, link Google Maps. · Khóa học: danh sách khóa đang tuyển, học phí từng khóa + khoản đã gồm/phát sinh, thời lượng, lịch khai giảng, hồ sơ. · Hình ảnh/video: theo `docs/REQUIRED_ASSETS.md`. · Cảm nhận học viên **đã được phép** dùng.

---

## 18. Thứ tự thay thế đề xuất

Chi tiết từng file + test cần chạy lại: **`docs/DATA_REPLACEMENT_PLAN.md`**. Tóm tắt 5 pha:

**Pha 1 — Production blockers (P0):** `NEXT_PUBLIC_SITE_URL` domain thật · `DATABASE_URL` Postgres (đổi provider theo `schema.postgresql.prisma`) · `ADMIN_EMAIL`/`ADMIN_PASSWORD` thật · rà soát disclaimer F16. → Chạy lại: `typecheck`, `build`, `db:migrate:deploy`, seed **chỉ admin**.

**Pha 2 — Nội dung chuyển đổi (P1):** thông tin liên hệ còn `[...]` (email/FB/YT/Maps) · các giá trị "tạm" (chức danh/năm KN/trung tâm/địa chỉ/giờ) · ảnh hero + chân dung + OG raster. → `typecheck`, `test` (alt-text/site-config), `build`.

**Pha 3 — Nội dung tạo niềm tin (P1→P2):** thay cảm nhận mẫu bằng cảm nhận thật (đồng ý) hoặc ẩn · ảnh gallery/khóa học · video. → `test`, `build`.

**Pha 4 — SEO (P2):** review 8 blog theo giọng thầy + đối chiếu quy định + ảnh bìa · cập nhật `author`/ngày · FAQ xác nhận. → `test`, `build`.

**Pha 5 — Sẵn sàng quảng cáo (P2):** GA4 ID · (tùy chọn) Facebook Pixel · Google Site Verification · UTM. → `build`, kiểm tra tracking thật.

---

## Phụ lục — điểm mạnh cần giữ

Để tránh "sửa nhầm" trong quá trình thay dữ liệu, lưu ý những cơ chế **cố ý** sau (đừng gỡ):

- `isPlaceholderValue()` + `getUnresolvedPlaceholders()` (`src/config/site.ts`) — bộ khung phát hiện placeholder.
- CTA/nút tự vô hiệu khi config còn `[...]` (`src/lib/utils/cta-links.ts`).
- JSON-LD tự lược placeholder; `buildLocalServiceJsonLd()` trả `null` khi thiếu cấu hình.
- `tuition: null` → "liên hệ" (không bịa giá).
- Badge/nhãn "Nội dung mẫu" cho testimonial/gallery.
- Server env validate bắt buộc; không có fallback secret.
