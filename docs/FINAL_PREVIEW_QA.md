# FINAL_PREVIEW_QA — Kiểm định trước khi deploy Cloudflare Pages

**Ngày thực hiện:** 14/08/2026
**Phạm vi:** toàn bộ website tĩnh sinh ra trong `out/`
**Phiên bản kiểm:** bản build sạch sau khi đã sửa 6 lỗi phát hiện trong chính đợt QA này

---

## KẾT LUẬN

# ✅ READY FOR PREVIEW

Website đủ chất lượng để gửi Thầy Tùng xem và góp ý.

**Cần hiểu đúng phạm vi của kết luận này.** "Ready for preview" nghĩa là bản dựng đã đủ tốt để Thầy Tùng mở lên xem, đọc nội dung và cho ý kiến. Đây **chưa phải** kết luận "sẵn sàng phát hành công khai" — vẫn còn 3 việc phải xác nhận trực tiếp với Thầy Tùng trước khi cho Google index và chạy quảng cáo. Ba việc đó liệt kê ở [mục 7](#7-cần-xác-nhận-với-thầy-tùng-trước-khi-công-khai), và bản thân buổi Thầy xem preview chính là lúc thích hợp nhất để hỏi.

---

## 1. Bảng tổng hợp

| Hạng mục             | Kết quả    | Ghi chú                                                            |
| -------------------- | ---------- | ------------------------------------------------------------------ |
| Build                | ✅ Đạt     | exit 0, sinh `out/` gồm 23 tệp HTML                                |
| Static export        | ✅ Đạt     | Không rò rỉ `/api` hay `/admin`                                    |
| Responsive           | ✅ Đạt     | Không tràn ngang ở 390 / 768 / 1024 / 1440 px                      |
| Lighthouse — desktop | ✅ Đạt     | **100 / 100 / 100 / 100**                                          |
| Lighthouse — mobile  | ⚠️ Gần đạt | Performance **87** (mục tiêu ≥ 90); ba mục còn lại đều 100         |
| SEO                  | ✅ Đạt     | 100/100; mọi mục kiểm toán đều qua                                 |
| Metadata             | ✅ Đạt     | 22/22 trang có title + description trong ngưỡng Google             |
| Canonical            | ✅ Đạt     | Đúng trên mọi trang, khớp tuyệt đối với sitemap                    |
| Sitemap              | ✅ Đạt     | 21 URL, phủ đủ 21 trang thật                                       |
| Robots               | ✅ Đạt     | Cho phép thu thập, khai báo sitemap                                |
| Tối ưu ảnh           | ✅ Đạt     | 179 thẻ `<img>`: 0 thiếu `alt`, 0 thiếu `width/height`, 0 ảnh hỏng |
| Broken links         | ✅ Đạt     | Đối chiếu 702 link nội bộ — không có link hỏng                     |
| CTA                  | ✅ Đạt     | Mọi trang đều có ít nhất 4 điểm liên hệ                            |
| Mobile UX            | ✅ Đạt     | `target-size` và `font-size` của Lighthouse đều qua                |
| Trust signals        | ✅ Đạt     | Không có cụm từ bị cấm, không có đánh giá giả                      |
| Performance          | ✅ Đạt     | Trang chủ truyền 471 KB / 34 request                               |

**Kiểm thử tự động:** 97 unit test + 43 E2E test — tất cả đều xanh.

---

## 2. Môi trường và cách đo

Mọi số liệu dưới đây đo trên **chính thư mục `out/`** — đúng thứ sẽ được đẩy lên Cloudflare Pages — phục vụ qua máy chủ tĩnh ở `http://localhost:4173`. Không đo trên `next dev`, vì bản dev có thêm mã gỡ lỗi và không phản ánh bản phát hành.

```
Node        v20.14.0
Next.js     15.5.22
Lighthouse  12.x (xem cảnh báo ở mục 6.2)
Chrome      bản cài trên máy, chạy headless
```

Lệnh tái lập:

```bash
npm run build          # sinh out/
npm run preview        # phục vụ out/ tại cổng 4173
npm run test           # 97 unit test
npx playwright test    # 43 E2E test, chạy trên out/
```

---

## 3. Lỗi phát hiện **và đã sửa** trong đợt QA này

Sáu lỗi thật. Tất cả đều đã sửa, build lại và kiểm chứng lại.

### 3.1 Mô tả trang `/gioi-thieu` dài 177 ký tự — Google cắt cụt

Google cắt mô tả ở khoảng 160 ký tự. Câu mô tả của trang giới thiệu dài 177 nên bị cắt giữa chừng trên trang kết quả tìm kiếm.

Nguyên nhân sâu hơn đáng lưu ý: đợt refactor trước đã sửa lỗi y hệt cho trang chủ và có viết test chặn — **nhưng test đó chỉ kiểm trang chủ**. Các trang khác không ai kiểm nên lỗi nằm im. Đã rút mô tả xuống 142 ký tự và mở rộng test ra 15 route.

### 3.2 Tiêu đề trang chủ dài 64 ký tự

Google cắt tiêu đề ở khoảng 60 ký tự, nên phần `TP.HCM` — từ khoá địa phương quan trọng nhất — bị mất. Đã viết lại đưa địa danh lên đầu, còn 56 ký tự và **giữ nguyên đủ mọi từ khoá**:

```
Cũ  (64):  Học lái xe cùng thầy Tùng — giáo viên cơ hữu tại Thủ Đức, TP.HCM
Mới (56):  Học lái xe Thủ Đức, TP.HCM — Thầy Tùng, giáo viên cơ hữu
```

### 3.3 Toàn bộ URL trong sitemap lệch với canonical

`next.config.ts` đặt `trailingSlash: true`, nên địa chỉ thật của mọi trang đều kết thúc bằng dấu gạch chéo. Next.js tự chuẩn hoá thẻ canonical theo quy tắc này, **nhưng không đụng tới URL ta tự viết trong sitemap**. Kết quả:

```
canonical:  https://thaytungdaylaixe.vn/khoa-hoc/
sitemap:    https://thaytungdaylaixe.vn/khoa-hoc     ← thiếu dấu gạch chéo
```

Cả 21 dòng trong sitemap đều lệch. Trên Cloudflare Pages mỗi dòng sẽ thành một lần chuyển hướng 308, làm hao ngân sách thu thập của Google và gửi tín hiệu mâu thuẫn về đâu mới là URL chính tắc.

Đã thêm hàm `pageUrl()` tách bạch với `absoluteUrl()`:

- `pageUrl()` — dùng cho **trang**, luôn có dấu gạch chéo cuối
- `absoluteUrl()` — dùng cho **tệp** (ảnh OG), không bao giờ thêm dấu gạch chéo

Hai hàm trông rất giống nhau nên đã viết 5 unit test khoá lại sự khác biệt, tránh người sau dùng nhầm.

### 3.4 JSON-LD trỏ tới URL không chính tắc

Cùng gốc rễ với 3.3, nhưng nằm trong dữ liệu có cấu trúc — nơi Google dùng để định danh thực thể:

| Vị trí                  | Trường                 |
| ----------------------- | ---------------------- |
| `buildCourseJsonLd`     | `url`                  |
| `buildArticleJsonLd`    | `mainEntityOfPage.@id` |
| `buildBreadcrumbJsonLd` | `item`                 |

Đã chuyển cả ba sang `pageUrl()`. Trường `image` giữ nguyên `absoluteUrl()` vì đó là đường dẫn tệp — thêm dấu gạch chéo vào là sai.

### 3.5 31 phần tử vi phạm tương phản màu WCAG AA

Đây là lỗi nghiêm trọng nhất của đợt QA, và nó rơi đúng vào **nút CTA chính** — thứ quyết định người xem có gọi cho Thầy hay không:

| Thành phần              | Trước      | Chuẩn AA | Sau        |
| ----------------------- | ---------- | -------- | ---------- |
| Nền nút CTA + chữ trắng | **2,95:1** | ≥ 4,5:1  | **5,18:1** |
| Nhãn mục (`accent-600`) | 3,92:1     | ≥ 4,5:1  | **6,07:1** |
| Chữ nhỏ (`ink-subtle`)  | 3,48:1     | ≥ 4,5:1  | **4,68:1** |

Vì sao đáng bận tâm ngoài chuyện tuân thủ: phần lớn người xem trang này mở bằng điện thoại, nhiều khả năng đang ở ngoài đường. Chữ trắng trên nền cam nhạt ở mức 2,95:1 rất khó đọc dưới nắng.

Cách sửa: làm tối các bậc 500–900 của thang màu cam trong `globals.css`. Giá trị mới **tính bằng công thức WCAG, không ước lượng bằng mắt**, và đã kiểm tra thang màu vẫn giảm độ sáng đều. Các bậc 50–400 giữ nguyên vì chỉ dùng làm nền nhạt.

> Đây là thay đổi **nhìn thấy được** duy nhất của đợt QA: nút cam đậm hơn trước. Nếu Thầy Tùng muốn giữ sắc cam cũ, chỉ cần sửa lại các dòng `--color-accent-*` trong `src/app/globals.css` — nhưng khi đó website sẽ không đạt chuẩn tiếp cận WCAG AA.

### 3.6 Nhảy cấp tiêu đề ở `/khoa-hoc` và `/kien-thuc`

Hai trang danh sách đặt tiêu đề thẻ (`h3`) nằm thẳng dưới `h1`, bỏ trống cấp `h2`. Người dùng trình đọc màn hình thường điều hướng bằng cách nhảy giữa các tiêu đề; một bậc bị thiếu khiến họ tưởng đã bỏ sót nội dung.

Không thể đổi cứng `h3` thành `h2`, vì cùng component đó trên trang chủ lại nằm dưới một `h2` — ở đó `h3` mới đúng. Đã thêm tham số `headingLevel` (mặc định 3) và truyền `2` ở đúng hai trang danh sách.

---

## 4. Việc đã làm để lỗi không tái phát

Sửa lỗi thôi chưa đủ — cả 6 lỗi trên đều đã tồn tại qua nhiều đợt kiểm trước mà không ai bắt được. Nên phần quan trọng không kém là **bịt lỗ hổng kiểm thử**:

| Test mới                                            | Phạm vi     | Chặn lỗi nào                        |
| --------------------------------------------------- | ----------- | ----------------------------------- |
| `moi trang co tieu de va mo ta trong nguong Google` | 15 route    | 3.1, 3.2                            |
| `URL trong sitemap khop chinh xac voi canonical`    | 21 URL      | 3.3, 3.4                            |
| `khong trang nao nhay cap tieu de`                  | 10 route    | 3.6                                 |
| `seo-url.test.ts`                                   | 5 unit test | dùng nhầm `pageUrl` / `absoluteUrl` |

**Bài học được ghi thẳng vào comment của test:** nguyên nhân gốc của cả 3.1 lẫn lỗi ảnh hỏng ở đợt trước đều là _"test chỉ kiểm trang chủ"_. Các test mới đều duyệt toàn bộ route.

### Đã kiểm chứng guard bằng cách phá thật

Một test chặn mà không thật sự chặn được gì thì còn nguy hiểm hơn không có test, vì nó tạo cảm giác an toàn giả. Nên hai guard quan trọng nhất đã được kiểm chứng bằng cách **cố tình phá bản đã build** rồi chạy lại:

```
Phá 1: bỏ dấu gạch chéo của 1 URL trong out/sitemap.xml
Phá 2: kéo dài mô tả của /gioi-thieu lên 200 ký tự

Kết quả: cả 2 test ĐỀU BÁO LỖI đúng chỗ.
Khôi phục lại → cả 2 xanh trở lại.
```

Đo tương phản màu cũng không tin vào một lần chạy trên trang chủ: đã quét Lighthouse accessibility trên **toàn bộ 21 trang**, trước và sau khi sửa.

```
Trước:  96 điểm, 31 phần tử vi phạm tương phản
Sau :  100 điểm trên cả 21/21 trang, 0 vi phạm
```

---

## 5. Chi tiết từng hạng mục

### 5.1 Build và static export

```
Build sạch (đã xoá out/ trước)   exit 0
Số tệp HTML                       23
Tổng dung lượng out/              11 MB
Rò rỉ /api                        không
Rò rỉ /admin                      không
Tệp gốc bắt buộc                  _headers, 404.html, robots.txt,
                                  sitemap.xml, manifest.webmanifest  — đủ
```

`public/_headers` có mặt trong `out/` — cần thiết vì `headers()` trong `next.config.ts` không có tác dụng khi dùng `output: 'export'`; Cloudflare Pages đọc tệp này để đặt header bảo mật và cache.

### 5.2 Metadata trên toàn bộ 22 trang

Không trang nào vượt ngưỡng hiển thị của Google (tiêu đề ≤ 60, mô tả ≤ 160):

```
Tiêu đề : ngắn nhất 28, dài nhất 59 ký tự
Mô tả   : ngắn nhất 95, dài nhất 154 ký tự
Canonical: đúng trên 22/22 trang
Thẻ h1  : đúng 1 thẻ trên mỗi trang
lang="vi": đủ trên mọi trang
Open Graph + Twitter Card: đủ trên mọi trang
```

Không có tiêu đề hay mô tả nào trùng nhau giữa các trang thật.

### 5.3 Dữ liệu có cấu trúc

Mọi trang đều mang `WebSite`, `EducationalOrganization`, `Person`, `ProfessionalService`. Trang khoá học thêm `Course` + `FAQPage`, bài viết thêm `Article`, các trang con thêm `BreadcrumbList`.

Đã kiểm riêng: **không khối JSON-LD nào chứa `aggregateRating`, `ratingValue` hay `reviewCount`** — đúng ràng buộc "không tạo đánh giá giả".

`Person.worksFor` trỏ tới `EducationalOrganization`, không đảo ngược — quan hệ được mô tả đúng là thầy làm việc _tại_ trung tâm, chứ không phải trang này đại diện cho trung tâm.

### 5.4 Sitemap và robots

```
Số URL trong sitemap             21
Phủ hết trang thật               21/21
URL có dấu gạch chéo cuối        21/21
Khớp tuyệt đối với canonical     21/21
```

`robots.txt` cho phép thu thập toàn bộ và khai báo sitemap. Có thêm dòng `Host:` — đây là chỉ thị của Yandex, Google bỏ qua, vô hại.

### 5.5 Liên kết

Đối chiếu **702 link nội bộ** với 22 trang có thật trong `out/`: không có link hỏng.

Hai liên kết ngoài **cần kiểm bằng tay** vì không thể tự động xác minh là đúng đích:

| Liên kết                                    | Xuất hiện | Cần kiểm                   |
| ------------------------------------------- | --------- | -------------------------- |
| `https://zalo.me/0967569733`                | 104 chỗ   | Mở ra đúng Zalo của Thầy   |
| `https://maps.app.goo.gl/kRSa4XFj1jSbzCX76` | 26 chỗ    | Chỉ đúng địa chỉ trung tâm |

### 5.6 Ảnh

```
Tổng thẻ <img>          179
Thiếu alt               0
Thiếu width/height      0     (nên CLS gần bằng 0)
Ảnh hỏng                0     (kiểm bằng naturalWidth trên 8 trang)
Ảnh nặng hơn 300 KB     0
```

Định dạng: 6 tệp WebP (487 KB), 20 SVG (36 KB), 2 JPG (126 KB). JPG được giữ có chủ đích cho ảnh Open Graph — nhiều ứng dụng nhắn tin không đọc được SVG.

### 5.7 CTA

Mọi trang đều có tối thiểu 4 link gọi điện và 3 link Zalo. Trang chủ có 6 điểm gọi, 5 điểm Zalo, 3 link bản đồ. Mọi link `target="_blank"` đều có `rel="noopener"`.

### 5.8 Responsive và mobile UX

Đo ở 4 kích thước trên 4 trang khác nhau:

```
390 px  (điện thoại)     tràn ngang 0 px    thanh CTA đáy: hiện
768 px  (máy tính bảng)  tràn ngang 0 px    thanh CTA đáy: hiện
1024 px (laptop)         tràn ngang 0 px    nút nổi góc phải
1440 px (màn hình lớn)   tràn ngang 0 px    nút nổi góc phải
```

Bảng so sánh học phí rộng hơn màn hình điện thoại, nhưng nằm trong khung `overflow-x-auto` nên **trang không bị tràn** — đúng cách xử lý bảng rộng trên di động.

Lighthouse mobile: `target-size` đạt, `font-size` đạt.

### 5.9 Performance

**Trang chủ, lần vào đầu tiên:**

```
Tổng truyền     471 KB (đã nén)
Số request      34
  Ảnh           185 KB
  JavaScript    147 KB
  Font          102 KB
  HTML           28 KB
  CSS             8 KB
```

Video bài học nặng 5,7 MB **không tải khi vào trang** — chỉ tải khi người xem bấm nút, đúng thiết kế. Nếu tải sẵn, mỗi lượt xem sẽ tốn thêm 5,7 MB.

**Chỉ số Core Web Vitals:**

|                          | Desktop | Mobile |
| ------------------------ | ------- | ------ |
| First Contentful Paint   | 0,5 s   | 2,0 s  |
| Largest Contentful Paint | 0,8 s   | 3,8 s  |
| Total Blocking Time      | 0 ms    | 30 ms  |
| Cumulative Layout Shift  | 0,009   | 0      |

---

## 6. Việc còn mở — không chặn preview

### 6.1 Lighthouse mobile Performance 87 (mục tiêu ≥ 90)

Ba nhóm còn lại đều 100. Riêng Performance thiếu 3 điểm.

Chẩn đoán: phần tử LCP là **chữ `<h1>`, không phải ảnh**, và **88% thời gian LCP là render delay** (3 294 ms), trong đó tài nguyên chặn hiển thị chiếm 875 ms. Font đã tối ưu sẵn (`display: swap`, tự lưu trữ qua `next/font`, đã giới hạn subset) nên không phải nguyên nhân.

**Cần đo lại trên tên miền thật trước khi quyết định làm gì.** Con số 87 đo qua máy chủ tĩnh trên máy cá nhân, dưới chế độ Lighthouse giả lập mạng 4G chậm và CPU chậm gấp 4 lần. Cloudflare Pages sẽ có nén Brotli, HTTP/2/3 và CDN biên — những thứ tác động thẳng vào chính phần render delay này. Mục tiêu ≥ 90 vốn được đặt cho môi trường production, nên đo ở đó mới có nghĩa.

Một hướng cụ thể nếu sau khi đo thật vẫn chưa đạt: `CourseCard` hiện là client component (`'use client'`) chỉ để gọi `trackEvent` lúc bấm. Tách phần theo dõi ra một island nhỏ sẽ giảm được JS phải hydrate trên cả trang chủ lẫn trang khoá học.

### 6.2 Cảnh báo về công cụ: Lighthouse 13 không chạy được trên Node 20

Phát hiện trong lúc kiểm, ghi lại để người sau khỏi mất công:

```
npx lighthouse            → kéo về bản 13.4.1
Node hiện tại             → v20.14.0
Kết quả                   → audit `canonical` lỗi "URL.parse is not a function",
                            điểm SEO trả về null (dễ nhầm là 0)
```

`URL.parse` là API tĩnh chỉ có từ Node 22.1. **Phải chạy `npx lighthouse@12`** hoặc nâng Node lên ≥ 22. Mọi số liệu Lighthouse trong báo cáo này đều đo bằng bản 12 đã ghim.

Đây thuần tuý là vấn đề công cụ — website không hề có lỗi canonical, cả 9 mục kiểm toán SEO chấm điểm được đều đạt.

### 6.3 Chưa có `favicon.ico`

Website chỉ khai báo `/icon.svg`. Trình duyệt hiện đại đều đọc được SVG, nhưng vài phiên bản Safari cũ thì không và sẽ hiện icon trắng. Bổ sung `favicon.ico` 32×32 là xong.

### 6.4 Build hỏng khi máy thiếu RAM

Trong quá trình QA, `npm run build` **hỏng hai lần** với `exit 134` (SIGABRT) và `npm run test` hỏng một lần do esbuild crash. Nguyên nhân là bộ nhớ: máy còn trống 1,3–1,7 GB trên tổng 15,6 GB, trong khi build xin heap 4 GB (`--max-old-space-size=4096`).

**Không phải lỗi mã nguồn** — build sạch lại đều thành công sau khi giải phóng bộ nhớ. Playwright cũng cần `--workers=2` thay vì mặc định 8. Cloudflare Pages build trên máy chủ riêng nên sẽ không gặp.

### 6.5 Trang `/404/` trùng metadata với trang chủ

Next.js sinh thêm `out/404/index.html` kế thừa metadata của layout gốc. Trang này mang thẻ `noindex` nên Google sẽ không đưa vào chỉ mục — vô hại, ghi lại để không nhầm là lỗi ở các đợt kiểm sau.

---

## 7. Cần xác nhận với Thầy Tùng trước khi công khai

Ba việc dưới đây **không chặn việc gửi Thầy xem preview**. Hai việc đã được xác nhận, còn **một việc chưa**.

1. ✅ **Sự đồng ý của học viên trong ảnh** — _đã xác nhận 14/08/2026._
   Học viên xuất hiện trong `teacher/thay-tung-huong-dan-hoc-vien.webp` và ảnh hero. Cam kết trên trang Điều khoản sử dụng (_"ảnh có mặt học viên chỉ được đăng khi có sự đồng ý"_) là đúng sự thật.

2. ⏳ **Bản quyền hai tấm ảnh — CHƯA xác nhận.**
   `cabin-mo-phong-hoc-vien.jpg` và `dan-xe-tap-lai.jpg` — tên tệp gợi ý có thể tải từ website của trung tâm. Cần xác nhận được phép dùng trước khi công khai.
   Nếu không xin được phép, cách xử lý gọn nhất là chụp thay bằng ảnh tự chụp tại trung tâm; hai ảnh này chỉ dùng ở mục minh hoạ cơ sở vật chất nên thay được mà không ảnh hưởng bố cục.

3. ✅ **Liên kết Google Maps** — _đã xác nhận 14/08/2026._
   `https://maps.app.goo.gl/kRSa4XFj1jSbzCX76` (xuất hiện ở 26 chỗ) chỉ đúng địa chỉ Km 18 Võ Nguyên Giáp.

**Nên chuẩn bị thêm trước khi chạy quảng cáo** (không bắt buộc cho preview): ảnh thật cổng trung tâm thay cho `center/cong-trung-tam.svg`, họ tên đầy đủ và số giấy phép của Thầy, link Facebook/YouTube thật, khoảng học phí tham khảo do trung tâm công bố.

---

## 8. Ràng buộc nội dung — đã kiểm lại

Các ràng buộc đặt ra từ đợt REFACTOR-01 vẫn được giữ nguyên sau đợt QA này:

| Ràng buộc                                                                             | Kết quả                                      |
| ------------------------------------------------------------------------------------- | -------------------------------------------- |
| Không bịa số học viên                                                                 | ✅ không có                                  |
| Không bịa tỷ lệ đậu                                                                   | ✅ không có                                  |
| Không bịa học phí cụ thể                                                              | ✅ không có                                  |
| Không có testimonial giả                                                              | ✅ đã gỡ toàn bộ từ đợt trước                |
| Không có giải thưởng / chứng chỉ chưa xác nhận                                        | ✅ không có                                  |
| Không có "cam kết tuyệt đối", "giá rẻ nhất", "ưu đãi sốc", "đăng ký ngay kẻo hết chỗ" | ✅ quét toàn bộ 22 trang, không dính cụm nào |
| Không tạo rating giả / review giả                                                     | ✅ JSON-LD sạch                              |

Bằng chứng tin cậy có mặt đầy đủ trên trang chủ: địa chỉ `Km 18 Võ Nguyên Giáp`, chức danh `Giáo viên cơ hữu`, vị trí `Lầu 2`, kinh nghiệm `gần 20 năm`, số điện thoại `0967569733`.

Đoạn tuyên bố miễn trừ ở chân trang vẫn nêu **đồng thời hai ý** — thầy _là_ giáo viên cơ hữu của trung tâm (quan hệ có thật), _nhưng_ đây không phải cổng thông tin chính thức của trung tâm. Thiếu vế đầu là phủ nhận quan hệ có thật; thiếu vế sau là mạo danh.

---

## 9. Bước tiếp theo

1. Gửi Thầy Tùng xem bản preview — chạy `npm run preview`, mở `http://localhost:4173`, hoặc deploy lên Cloudflare Pages theo [CLOUDFLARE_PAGES_DEPLOY.md](CLOUDFLARE_PAGES_DEPLOY.md)
2. Hỏi Thầy 3 việc ở mục 7
3. Đo lại Lighthouse mobile trên tên miền thật, rồi mới quyết định có cần tối ưu thêm không
4. Bổ sung `favicon.ico`

---

_Báo cáo lập ngày 14/08/2026. Mọi số liệu đo trên bản build sạch của thư mục `out/`, không phải bản dev._
