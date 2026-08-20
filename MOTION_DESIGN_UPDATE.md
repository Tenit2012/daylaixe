# Motion Design Update

Ngày thực hiện: 19/08/2026
Hướng thiết kế: **REAL DRIVING EXPERIENCE** — chuyển động lấy cảm hứng từ việc lái xe và tiến trình học, không phải từ landing page SaaS.

---

## Before

Website hoạt động tốt, SEO và hiệu năng đã được tối ưu, nhưng hoàn toàn tĩnh. Cụ thể:

| Mục | Trạng thái trước |
|---|---|
| Hero | Không có chuyển động nào |
| Trust badges | 4 ô tĩnh, không hover |
| Về thầy | Ảnh và chữ xuất hiện cùng lúc, không phân cấp |
| Lộ trình học | Đường kẻ dọc `bg-line` tĩnh, 7 bước hiện cùng lúc |
| Khoá học | Chỉ có `hover:shadow-card-hover`, ảnh không phản ứng, mũi tên đứng yên |
| Album ảnh | Chỉ đổi đổ bóng khi hover |
| FAQ | Dùng thuộc tính `hidden` — **không thể tạo chuyển động**, bật/tắt tức thì |
| Nút CTA | Chỉ đổi màu nền |

Điểm đáng chú ý: `tailwind.config.ts` đã khai báo sẵn keyframe `fade-in-up` từ trước nhưng **không component nào dùng đến**. Hạ tầng có, chỉ chưa ai nối vào.

---

## New Motion System

### Token dùng chung

Khai báo trong [globals.css](src/app/globals.css):

```
--ease-road: cubic-bezier(0.22, 0.61, 0.36, 1);
--dur-quick: 400ms;
--dur-base:  550ms;
--dur-slow:  700ms;
```

Một đường cong duy nhất cho toàn site: tăng tốc nhanh rồi ga về chậm, **không nảy lại**. Đây chính là thứ tạo ra cảm giác "lái xe" thay vì "SaaS" — chuyển động có quán tính và dừng dứt khoát, không lò xo, không đàn hồi.

### Nguyên tắc an toàn quan trọng nhất

Hiệu ứng hiện dần hoạt động bằng cách **làm mờ phần tử đi trước rồi mới hiện lại**. Nếu quy tắc làm mờ luôn bật, thì khi JavaScript không chạy — bot tìm kiếm cũ, JS lỗi, người dùng tắt JS — nội dung sẽ **kẹt ở trạng thái vô hình vĩnh viễn**. Đó là lỗi nghiêm trọng cả về SEO lẫn khả năng tiếp cận.

Giải pháp đảo ngược mặc định:

1. Mặc định **mọi thứ hiện**.
2. Một đoạn script nội tuyến trong `<head>` ([layout.tsx](src/app/layout.tsx)) gắn class `motion-js` lên `<html>` — **chỉ khi** JavaScript thực sự chạy **và** người dùng không bật "giảm chuyển động".
3. Toàn bộ quy tắc làm mờ nằm sau `.motion-js`.

Script chạy đồng bộ trong `<head>` nên hoàn tất **trước lần sơn đầu** — không có hiện tượng nội dung hiện rồi bị ẩn đi.

Đã kiểm chứng bằng Playwright với `javaScriptEnabled: false`: **0/39 khối bị ẩn**.

### Một IntersectionObserver cho toàn trang

[reveal.tsx](src/components/ui/reveal.tsx) dùng **một** observer dùng chung ở cấp module thay vì mỗi khối một observer. Trang chủ có 39 khối cần hiện dần — 39 observer riêng nghĩa là trình duyệt phải tính giao cắt 39 lần mỗi khung hình cuộn. Observer được tạo lười, và mỗi phần tử được `unobserve` ngay sau lần hiện đầu tiên, nên danh sách quan sát rút dần về 0.

### Không làm phình client bundle

`Reveal` là Client Component nhưng `children` truyền vào **vẫn render ở phía máy chủ**. React coi children như props đã render sẵn, không kéo cây con sang trình duyệt. Nhờ vậy bọc bao nhiêu section cũng không tăng số Client Component thật sự.

Số Client Component: **9 → 11** (thêm `reveal.tsx`, `count-up.tsx`). Không có section nào bị chuyển thành client.

---

## Hero

Chuỗi xuất hiện, **CSS thuần, không JavaScript**, chạy ngay từ lần sơn đầu:

| Phần tử | Hiệu ứng | Độ trễ |
|---|---|---|
| Badge "Giáo viên cơ hữu" | mờ dần + nhích lên | 0ms |
| `<h1>` | **chỉ dịch chuyển** | 0ms |
| Câu mô tả | mờ dần + nhích lên | 140ms |
| 2 nút CTA | mờ dần + nhích lên | 210ms |
| SĐT + địa chỉ | mờ dần + nhích lên | 280ms |

Tổng: **~830ms**, nằm trong khoảng 600–1000ms yêu cầu.

### Hai quyết định bảo vệ LCP

**1. `<h1>` chỉ dịch chuyển, tuyệt đối không đổi opacity.**
Trên điện thoại hero xếp một cột nên `<h1>` thường chính là phần tử LCP. Chrome không tính một phần tử đang `opacity: 0` là đã hiện, nên hiệu ứng mờ dần sẽ đẩy thẳng mốc LCP lùi lại đúng bằng độ trễ cộng thời gian chạy. `transform` không làm trễ thời điểm sơn, cũng không gây dịch chuyển bố cục.

**2. Ảnh hero không có hiệu ứng nào.**
Đây là ảnh LCP trên desktop (`priority` + `fetchPriority="high"`). Cả hiệu ứng mờ dần lẫn phóng to đều rủi ro. Cảm giác sống động của hero đã do cột chữ bên trái tạo ra — không đáng đánh đổi Core Web Vitals để thêm một hiệu ứng nữa.

**Trust badges** dùng CSS thuần (`hero-in` + stagger 70ms) chứ **không** dùng `Reveal`, vì trên desktop dải này đã lộ một phần trong màn hình đầu — cơ chế `Reveal` phải chờ hydrate xong mới hiện lại, tạo khoảng trống người dùng nhìn thấy được.

---

## Teacher Section

- Ảnh chân dung: hiện dần kiểu `reveal-zoom` (mờ dần + thu từ `scale(1.04)`), **700ms** — chậm hơn mặc định để cảm giác "lộ diện" chứ không phải "bật ra".
- Hover trên desktop: phóng 3%, có `overflow-hidden` bọc ngoài.
- Cột chữ hiện sau ảnh 90ms.
- **Count-up "Gần 20 năm"** — xem mục dưới.

Kiềm chế có chủ ý: không nghiêng, không trôi, không đổ bóng động. Chân dung là neo tin cậy của cả trang; những hiệu ứng đó làm ảnh một người thật trông như ảnh quảng cáo.

### Về count-up

Website **không có số liệu dạng number nào**. Giá trị duy nhất là biến môi trường `NEXT_PUBLIC_EXPERIENCE_LABEL="Gần 20 năm"` — một chuỗi văn bản.

[count-up.tsx](src/components/ui/count-up.tsx) tách số nguyên đầu tiên khỏi chuỗi và chỉ đếm đúng số đó, giữ nguyên chữ xung quanh. Nếu quản trị viên đổi nhãn thành chuỗi không có số ("Nhiều năm kinh nghiệm"), component **tự động ngừng đếm** và hiện nguyên văn bản.

**Không tạo thêm bất kỳ chỉ số nào** — không số học viên, không tỷ lệ đỗ, không số khoá đã dạy.

Hai chi tiết kỹ thuật:
- Số đang đếm mang `aria-hidden`, kèm một bản sao `sr-only` **luôn là giá trị thật**. Nếu không, trình đọc màn hình có thể đọc "0 năm kinh nghiệm" nếu đọc đúng lúc hiệu ứng đang chạy.
- Khoá bề ngang theo số chữ số cuối + `tabular-nums`. Khi đếm từ 9 lên 10, con số rộng thêm một ký tự và đẩy phần chữ phía sau dịch sang — vừa giật mắt vừa tính vào CLS.

Đã đo thực tế: `0 → 7 → 13 → 17 → 19 → 20`, kết thúc đúng "Gần 20 năm kinh nghiệm giảng dạy".

---

## Courses

Ba chuyển động gom vào một gốc CSS `hover-lift`:

| Thành phần | Hover | Đo được |
|---|---|---|
| Thẻ | `translateY(-4px)` | `matrix(1,0,0,1,0,-4)` ✓ |
| Ảnh | `scale(1.03)` | `matrix(1.029, ...)` ✓ |
| Mũi tên | `translateX(4px)` | `matrix(1,0,0,1,4,0)` ✓ |

**Toàn bộ nằm trong `@media (hover: hover) and (pointer: fine)`.** Trên điện thoại, một lần chạm sẽ kích hoạt `:hover` rồi **giữ nguyên** trạng thái đó cho đến khi chạm chỗ khác — thẻ sẽ dính ở vị trí bị nhấc lên. Chặn từ gốc bằng media query là cách duy nhất chắc chắn.

`focus-within` đi kèm `:hover` để người điều hướng bằng bàn phím cũng nhận đúng phản hồi.

Lưới thẻ hiện so le 70ms/thẻ.

---

## 11 Sa Hình

**Không thực hiện — section này không tồn tại trên website.**

Đã grep toàn bộ `src/`. Cụm "sa hình" chỉ xuất hiện ở: một khoá học (`luyen-sa-hinh`), một bước trong lộ trình, vài bài blog, và danh sách keyword SEO. **Không có danh sách 11 bài nào** — không component, không content file.

Làm mục này nghĩa là **viết mới nội dung 11 bài thi sát hạch**, không phải thêm chuyển động. Việc đó vi phạm chính ràng buộc của yêu cầu ("DO NOT invent", "Do not redesign the whole website"), và ghi sai tên hoặc thứ tự bài trên một website về lĩnh vực có quy chuẩn là rủi ro uy tín thật.

**Cần từ phía chủ website:** danh sách 11 bài, hoặc xác nhận dùng quy chuẩn sát hạch hiện hành. Có nội dung là làm được ngay theo đúng mẫu tương tác đã mô tả (chọn bài → nhấn mạnh bài đang chọn → chi tiết trượt vào, chỉ chạy hiệu ứng cho bài đang chọn).

---

## Learning Journey

Đây là mục được đầu tư nhiều nhất, vì nó là hình ảnh trực tiếp của chính nội dung: một lộ trình có điểm bắt đầu và tiến dần về phía trước.

**Đường kẻ tự vẽ từ trên xuống** khi người đọc cuộn tới, bằng `transform: scaleY(0 → 1)` với `transform-origin: top`. Dùng `scaleY` thay vì đổi chiều cao thật để trình duyệt không phải tính lại bố cục ở mỗi khung hình.

**Các bước sáng lên lần lượt**: vòng tròn icon đổi từ viền xanh nhạt sang viền cam (`accent-500`) khi đúng bước đó hiện ra, tạo cảm giác đi qua từng chặng thay vì cả lộ trình bật sáng cùng lúc. Đã đo: 6/7 chấm đã đổi màu tại thời điểm chụp, chấm cuối đổi khi cuộn tới.

Mỗi bước hiện so le 70ms.

---

## Gallery

- Hiện so le 70ms/ảnh.
- Hover trên desktop: nhấc thẻ 4px + phóng ảnh 3% trong khung `overflow-hidden`.
- Khung tỷ lệ 4:3 cố định giữ nguyên — đây là thứ đang giữ CLS ở mức 0.

Không thêm ảnh nào, không dùng ảnh stock. Chưa thêm lightbox vì website chưa có sẵn và thêm mới sẽ kéo theo bẫy focus, phím Esc, khoá cuộn — không tương xứng với giá trị mang lại ở giai đoạn này.

---

## FAQ

Trước đây panel dùng thuộc tính `hidden`, **không thể tạo chuyển động** vì `hidden` bật/tắt tức thì, không có trạng thái trung gian.

Bản mới dùng `grid-template-rows: 0fr → 1fr`. Vì sao không dùng `max-height`: `max-height` buộc phải đoán trước một con số lớn hơn mọi câu trả lời, khiến câu ngắn mở xong từ lâu mà hiệu ứng vẫn còn chạy, còn câu dài thì bị cắt. `0fr → 1fr` cho đúng chiều cao thật của từng câu.

**Khả năng tiếp cận giữ nguyên:**
- `aria-expanded` / `aria-controls` không đổi.
- `visibility: hidden` vẫn loại nội dung đang đóng khỏi cây trợ năng, chỉ khác là đợi đến cuối hiệu ứng mới áp dụng (`transition-delay`), còn lúc mở thì hiện ngay.
- Đo thực tế: `rows 97.125px / visible / aria-expanded=true` ↔ `rows 0px / hidden / aria-expanded=false`.
- 6/6 test accordion sẵn có vẫn pass.

**Đánh đổi đã cân nhắc:** `grid-template-rows` là thuộc tính bố cục, không phải GPU-friendly. Nhưng nó chỉ chạy khi người dùng chủ động bấm, trên đúng một phần tử. Không có giải pháp thuần `transform` nào xử lý được chiều cao tự động mà không cần JavaScript đo đạc — và JavaScript đo đạc thì tốn INP hơn nhiều.

---

## CTA

Thêm đúng **một** tương tác: `active:scale-[0.98]` khi bấm.

Chọn lún xuống khi bấm thay vì nảy lên khi hover vì hai lý do: nó hoạt động giống nhau trên cả điện thoại lẫn máy tính (không phụ thuộc `:hover`), và nó phản hồi đúng khoảnh khắc người dùng chạm vào — đúng chỗ cần trấn an nhất khi bấm nút gọi điện.

**Không có hiệu ứng nào tự chạy.** Nút nhấp nháy hay đập như nhịp tim tạo cảm giác giả tạo về sự gấp gáp, không phù hợp với trang giới thiệu một giáo viên dạy lái xe.

`motion-reduce:active:scale-100` tắt hẳn thay vì để chạy trong 0.01ms.

Đo được: `transition-property: color, background-color, border-color, box-shadow, transform` @ 0.15s.

**Nút phát video**: một nhịp phóng to rồi về (`play-pulse`, 620ms) chạy **đúng một lần** mỗi lần rê chuột vào, không lặp. Keyframe kết thúc đúng ở `scale(1.03)` trùng với trạng thái hover nên không có cú giật khi hiệu ứng chạy xong.

---

## Mobile

- Thanh CTA cố định đáy màn hình **đã có sẵn** — chỉ thêm `active:scale-[0.97]` khi chạm.
- Mọi hiệu ứng hover bị chặn hoàn toàn bằng `@media (hover: hover) and (pointer: fine)`.
- Kiểm tra 375×812 và 390×844: **tràn ngang = 0px**, **CLS = 0** ở cả hai.
- Không thêm phần tử cố định mới — tránh xung đột với thanh CTA đang có.

---

## Accessibility

`prefers-reduced-motion: reduce` được xử lý ở **hai tầng**:

1. **Không gắn `motion-js`** → toàn bộ hiệu ứng hiện dần không tồn tại, nội dung hiện ngay từ đầu. Mạnh hơn là để animation chạy với thời lượng 0.01ms.
2. Bộ reset toàn cục sẵn có trong `globals.css` vẫn giữ nguyên, phủ nốt các transition còn lại.
3. Count-up kiểm tra `motion-js` trước khi đếm — không có class thì giữ nguyên con số thật, không chạy `requestAnimationFrame` nào.
4. `motion-reduce:active:scale-100` trên nút.

Kiểm chứng với `reducedMotion: 'reduce'`: `motion-js = false`, **0/39 khối bị ẩn**, không lỗi JS.

Ngoài ra: `aria-expanded`/`aria-controls` của FAQ nguyên vẹn, số đang đếm có bản `sr-only` giá trị thật, mọi hiệu ứng hover đều kèm `focus-within` cho người dùng bàn phím.

---

## Performance

### Kết quả kiểm tra

```
npm run typecheck   PASS  (không lỗi)
npm run lint        PASS  (0 lỗi, 0 cảnh báo)
npm test            PASS  (111/111, 7 file)
npm run build       xem mục dưới
```

### Đo trên trình duyệt thật (Playwright, deviceScaleFactor 2)

Đo trên **bản tĩnh sẽ deploy** (`npm run preview` → `serve out`), không phải dev server.

| Chỉ số | Desktop 1440×900 | Mobile 375×812 | Mobile 390×844 |
|---|---|---|---|
| Tràn ngang | 0px | 0px | 0px |
| **CLS** | **0.0079** | **0** | **0** |
| Khối reveal kẹt ẩn | 0/39 | 0/39 | 0/39 |
| Ảnh hỏng | 0 | 0 | 0 |
| Lỗi JS | 0 | 0 | 0 |

CLS 0.0079–0.0082 nằm rất sâu dưới ngưỡng "tốt" 0.1 của Core Web Vitals.

### Kiểm chứng trên HTML tĩnh đã xuất (`out/index.html`)

| Kiểm tra | Kết quả |
|---|---|
| Script bootstrap nằm trong `<head>` | có |
| Tiêu đề `<h1>` trong HTML | có |
| "Gần 20 năm kinh nghiệm giảng dạy" trong HTML | có (count-up render giá trị thật ở phía máy chủ) |
| Số khối `reveal` | 39 |
| **Inline `opacity:0` trong HTML** | **0** — không nội dung nào bị ẩn ngay trong mã nguồn |
| Panel FAQ | 9 panel, 8 đóng + 1 mở sẵn |
| Nội dung câu trả lời FAQ trong HTML | có (kiểm 3/3 câu) |

### So sánh bundle trước/sau

Đo bằng hai lần `npm run build` sạch (`.next` xoá trước mỗi lần), bản gốc lấy bằng `git stash`:

| Route | Trước | Sau | Chênh |
|---|---|---|---|
| `/` (trang chủ) | 140 kB | 142 kB | **+2 kB** |
| `/gioi-thieu` | 139 kB | 139 kB | 0 |
| `/khoa-hoc` | 139 kB | 139 kB | 0 |
| `/cam-nhan-hoc-vien` | 140 kB | 140 kB | 0 |
| `/kien-thuc` | 137 kB | 137 kB | 0 |

**Shared chunk không đổi một byte** — vẫn 103 kB, và hash file y hệt (`255-2b334ff5c2ee7a81.js` 46.4 kB, `4bd1b696-c023c6e3521b1417.js` 54.2 kB). Nghĩa là toàn bộ thay đổi không chạm vào bundle khung.

Riêng phần JS của trang chủ còn **giảm** 3.7 kB → 2.39 kB, do mã chuyển sang chunk dùng chung giữa các route thay vì nằm riêng trong trang.

Tổng kết: **+2 kB trên đúng một trang, 0 kB trên mọi trang còn lại.**

### Ngân sách JavaScript

- Client Component: **9 → 11**. Không section nào bị chuyển thành client.
- IntersectionObserver: **1** cho toàn trang, tạo lười, tự `unobserve` sau lần hiện đầu.
- `requestAnimationFrame`: **1 vòng duy nhất**, có giới hạn — dừng sau ~1,1 giây và chỉ chạy một lần trong đời sống của trang.
- Không thêm thư viện animation nào. `package.json` **không đổi một dòng**.

### Thuộc tính được animate

Chỉ `transform`, `opacity`, và các thuộc tính màu/đổ bóng. **Không** animate `width`, `height`, `top`, `left`, `margin`, `padding`.

Ngoại lệ duy nhất là `grid-template-rows` của FAQ — đã giải thích lý do và phạm vi ở mục FAQ.

---

## Ghi chú kỹ thuật: lỗi chỉ phát hiện được khi chạy app

`staggerDelay` ban đầu được export từ `reveal.tsx` — một module `'use client'`. **Typecheck và lint đều pass**, nhưng khi tải trang thật thì mọi route lỗi 500:

```
Attempted to call staggerDelay() from the server but staggerDelay is on the client.
```

Mọi thứ export từ module client đều trở thành "tham chiếu phía trình duyệt"; Server Component chỉ được phép *render* nó, không được *gọi* nó. Đã tách hàm sang [stagger.ts](src/lib/utils/stagger.ts) — module thuần, không có chỉ thị `'use client'`, chạy được ở cả hai phía.

Đây là lý do bước chạy app thật không thể thay bằng typecheck.

---

## Điều đã cân nhắc và cố ý KHÔNG làm

**Tiêu đề section (`SectionHeading`) giữ tĩnh.** Yêu cầu có nhắc "Section title → content → cards". Nhưng `SectionHeading` được dùng trên nhiều trang con, một số nằm gần đầu trang — bọc `Reveal` sẽ tạo khoảng trống giữa lần sơn đầu và lúc hydrate xong ở đúng những vị trí đó. Để tiêu đề tĩnh làm điểm neo cố định cho nội dung hiện lên bên dưới, vừa an toàn trên mọi trang con, vừa đúng tinh thần "some elements should remain static".

**Không thêm lightbox cho album.** Xem mục Gallery.

**Không thêm parallax.** Parallax cần theo dõi vị trí cuộn liên tục — đúng loại chi phí mà yêu cầu bảo tránh, và nó làm ảnh chụp thật trông như ảnh quảng cáo.

---

## Final UX Assessment

**1. Website có sống động hơn không?**
Có. Trang giờ có nhịp: hero mở ra theo thứ tự đọc, đường lộ trình tự vẽ khi cuộn, các bước sáng lên lần lượt, thẻ khoá học phản hồi khi rê chuột, số năm kinh nghiệm đếm lên. Trước đó không có gì chuyển động cả.

**2. Chuyển động có hỗ trợ kể chuyện không?**
Có, và đây là phần được cân nhắc kỹ nhất. Phân cấp P0/P1/P2 được tôn trọng: Hero và Lộ trình học được đầu tư nhiều nhất vì chúng trả lời "đây là ai" và "tôi sẽ đi qua những gì"; FAQ và footer gần như không đổi. Đường kẻ tự vẽ không phải trang trí — nó là hình ảnh trực tiếp của một lộ trình có hướng đi. Mục Trải nghiệm học viên **cố ý** chỉ được hiện dần, không hover, không chuyển cảnh, vì đó là tình huống minh hoạ chứ không phải đánh giá thật.

**3. Chuyển động có gây vấn đề hiệu năng không?**
Không đo được vấn đề nào. CLS 0.0079/0/0, không thêm thư viện, một observer dùng chung, một vòng rAF có giới hạn, và hai quyết định cụ thể để bảo vệ LCP (`<h1>` chỉ transform, ảnh hero không đụng tới).

**4. Mobile có còn mượt không?**
Có. Tràn ngang 0px và CLS 0 ở cả 375×812 và 390×844. Mọi hiệu ứng hover bị chặn từ gốc bằng media query nên không có trạng thái hover dính. Không thêm phần tử cố định nào.

**5. SEO có nguyên vẹn không?**
Có. Không đổi routing, không đổi metadata, không đổi JSON-LD, không đổi một chữ nội dung nào. Điều quan trọng nhất: đã kiểm chứng với **JavaScript tắt hoàn toàn** — 0/39 khối bị ẩn, toàn bộ nội dung hiện bình thường. Cấu trúc heading và ảnh không đổi.
