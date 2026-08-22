# Analytics Tracking

Kiến trúc đo lường của website.

```
Website  →  Google Tag Manager  →  Google Analytics 4
```

Mã nguồn **không gọi thẳng GA4**. Nó chỉ đẩy sự kiện vào `dataLayer`; GTM đọc `dataLayer` rồi quyết định chuyển tiếp đi đâu. Nhờ vậy thêm một công cụ đo lường mới (Google Ads, Facebook CAPI…) chỉ là việc cấu hình trong GTM, không phải sửa và build lại website.

---

## Cần cấu hình phía Google

Hai giá trị dưới đây **chưa có** và không thể tự tạo. Website chạy bình thường khi để trống — chỉ là không có số liệu.

| Biến | Trạng thái | Lấy ở đâu |
|---|---|---|
| `NEXT_PUBLIC_GTM_ID` | **GTM_ID_REQUIRED** | tagmanager.google.com → tạo container loại Web → mã dạng `GTM-XXXXXXX` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | **GA4_ID_REQUIRED** *(chỉ khi không dùng GTM)* | analytics.google.com → Admin → Data Streams → mã dạng `G-XXXXXXXXXX` |
| `GOOGLE_SITE_VERIFICATION` | tuỳ chọn | Search Console → xác minh bằng thẻ HTML |

### Quy tắc bắt buộc: không điền cả hai

Nếu đã có `NEXT_PUBLIC_GTM_ID`, **để trống** `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

GA4 gần như chắc chắn sẽ được cấu hình **bên trong** GTM. Nếu website gắn thêm `gtag.js` nữa thì mọi lượt xem trang và mọi sự kiện bị đếm **hai lần** — báo cáo phồng lên gấp đôi mà không có dấu hiệu báo lỗi nào. Đây là kiểu sai nguy hiểm nhất vì số liệu trông vẫn "hợp lý".

Mã nguồn đã tự chặn: xem `shouldLoadDirectGa()` trong `src/lib/analytics/track.ts`. Nhưng vẫn nên để trống cho rõ ràng.

### Nơi đặt biến trên Cloudflare Pages

Các biến `NEXT_PUBLIC_*` được **nhúng vào mã lúc build**, không đọc lúc chạy. Phải khai báo trong Cloudflare Pages → Settings → Environment variables, rồi **build lại**. Sửa biến mà không build lại thì không có tác dụng.

---

## Events

| Event | Trigger | Parameters |
|---|---|---|
| `contact_phone` | Bấm bất kỳ link `tel:` | `location`, `course?`, `article?` |
| `contact_zalo` | Bấm link Zalo | `location`, `course?`, `article?` |
| `registration_click` | Bấm nút liên hệ/đăng ký gắn với khóa học | `location`, `course?` |
| `view_course` | Bấm vào một khóa học | `location`, `course` |
| `view_pricing` | Bấm CTA trong khối học phí | `location` |
| `view_article` | Bấm vào một bài viết | `location`, `article` |
| `click_google_map` | Bấm mở Google Maps | `location` |
| `click_facebook` | Bấm link Facebook | `location` |
| `click_youtube` | Bấm link YouTube | `location` |
| `click_email` | Bấm link email | `location` |
| `click_video` | Bấm nút phát video buổi học | `location`, `video` |
| `spa_page_view` | Điều hướng sang trang khác trong ứng dụng | `page_path`, `page_location`, `page_title` |

### Hai event đã đặt tên nhưng chưa dùng

`form_start` và `form_submit` **chưa được gọi ở đâu cả — và đó là đúng**.

Website hiện **không có biểu mẫu nào**. Đã kiểm tra: không có thẻ `<form>`, không có `onSubmit`. Người dùng liên hệ qua điện thoại, Zalo hoặc Facebook; website không thu thập và không lưu bất kỳ dữ liệu cá nhân nào.

Tên được giữ sẵn để khi nào thực sự thêm biểu mẫu thì đã có hợp đồng đặt tên, không phải nghĩ lại và không bị lệch với GTM đã cấu hình. **Khi thêm: chỉ gửi `form_name`.**

### `view_location` — làm bằng GTM, không bằng mã nguồn

Sự kiện "người dùng đã xem khối Học ở đâu" nên dùng **Element Visibility trigger** trong GTM nhắm vào `#hoc-tai-dau` (id này đã có sẵn và ổn định).

Không làm bằng mã nguồn vì sẽ phải gắn thêm bộ theo dõi cuộn — đúng loại chi phí mà website này cố tránh. GTM làm việc đó ở tầng ngoài, không tốn gì thêm.

Tương tự: `#khoa-hoc`, `#hoc-phi`, `#lien-he-nhanh`.

---

## CTA locations

`location` trả lời câu hỏi **CTA đặt ở đâu**, không phải nội dung gì.

| Giá trị | Vị trí |
|---|---|
| `header` | Thanh điều hướng trên cùng |
| `hero` | Khối đầu trang chủ |
| `home` | Trang chủ, các khối ngoài hero |
| `course_card` | Trong thẻ khóa học ở lưới |
| `course_page` | Trang chi tiết khóa học — khối CTA chính |
| `course_page_fee` | Trang chi tiết khóa học — khối học phí |
| `course_page_sidebar` | Trang chi tiết khóa học — cột phải |
| `course_list` | Trang danh sách khóa học |
| `pricing` | Trang/khối học phí và lộ trình |
| `cta_banner` | Dải kêu gọi hành động giữa trang |
| `contact_section` | Khối liên hệ cuối mỗi trang |
| `contact_page` | Trang liên hệ |
| `where_to_study` | Khối "Học ở đâu" |
| `about_page` | Trang giới thiệu |
| `testimonials_page` | Trang cảm nhận học viên |
| `article` | Bài viết / mục Kiến thức |
| `footer` | Chân trang |
| `mobile_sticky` | Thanh CTA cố định đáy màn hình (mobile) |
| `floating_cta` | Nút nổi góc phải (desktop) |
| `lesson_video` | Khối video buổi học |

Danh sách này là **kiểu có ràng buộc** trong TypeScript (`CtaLocationName`), không phải chuỗi tự do. Gõ sai sẽ không build được.

### Vì sao tách `location` khỏi `course`/`article`

Trước đợt này, các trang khóa học truyền `location={`course_${slug}`}` — gộp **chỗ đặt nút** và **nội dung** vào một tham số. Với 5 khóa học × 3 vị trí + 18 bài viết, GA4 nhận **33 giá trị `location` khác nhau**, mỗi giá trị chỉ vài lượt. Báo cáo "CTA nào hiệu quả nhất" trở nên vô dụng.

Tách ra thì đọc được **hai chiều độc lập**: vị trí nào hiệu quả, và khóa học nào được quan tâm.

---

## Course tracking

`course` mang **slug** của khóa học, không phải tên hiển thị — slug ổn định, tên có thể sửa vì lý do biên tập.

| Slug | Khóa học |
|---|---|
| `hang-b-so-tu-dong` | Hạng B – Số tự động |
| `hang-b-so-san` | Hạng B – Số sàn |
| `hang-c1` | Hạng C1 |
| `bo-tuc-tay-lai` | Bổ túc tay lái |
| `luyen-sa-hinh` | Luyện sa hình |

Trong GA4, tạo **Custom dimension** cho `course` và `location` (Admin → Custom definitions → Event-scoped) thì mới lọc được trong báo cáo.

---

## Cấu hình trong GTM

### Dùng Custom Event trigger, KHÔNG dùng Click trigger

Mã nguồn **đã** đẩy sự kiện vào `dataLayer` ngay trong `onClick` của từng nút. Trong GTM hãy tạo:

- **Trigger**: Custom Event → Event name khớp chính xác tên ở bảng trên (`contact_phone`, `contact_zalo`…)
- **Variables**: Data Layer Variable cho `location`, `course`, `article`
- **Tag**: GA4 Event, Event Name lấy từ `{{Event}}`, gắn tham số tương ứng

**Không tạo thêm Trigger kiểu "Click – All Elements" bắt vào `data-track-event`.** Nếu làm vậy, mỗi cú bấm sẽ sinh **hai** sự kiện cho cùng một hành động.

### Về `spa_page_view`

Tên này **cố ý không phải** `page_view`.

Thẻ cấu hình GA4 trong GTM thường đã bật sẵn "Send a page view event when this configuration loads". Nếu đẩy thêm một sự kiện tên `page_view` nữa thì GA4 nhận hai lượt cho cùng một lần điều hướng.

Cách làm đúng: tạo một thẻ **GA4 Event** riêng, Event Name = `page_view`, Trigger = Custom Event `spa_page_view`, và gắn `page_path` / `page_location` / `page_title` từ Data Layer Variable.

Lượt xem **đầu tiên** đã được chính thẻ GTM đếm lúc nó nạp xong — mã nguồn cố tình bỏ qua lần đầu, xem `AnalyticsRouteTracker`.

---

## Data attributes

Mỗi CTA quan trọng mang:

```html
data-track-event="contact_zalo"
data-track-location="hero"
data-track-target="hang-b-so-san"   <!-- khi có, là slug nội dung -->
```

Đây là **định danh ổn định**, đọc được từ cả mã nguồn lẫn DevTools. Trước đây muốn biết "nút nào vừa được bấm" thì chỉ còn cách đối chiếu bằng **chữ trên nút** — mà chữ có thể đổi bất cứ lúc nào, và có nhiều nút trùng chữ ("Liên hệ tư vấn" xuất hiện ở bảy chỗ).

Các thuộc tính này **không tự gửi dữ liệu đi đâu**. Chúng phục vụ kiểm thử thủ công và làm Element Variable trong GTM khi cần.

---

## Privacy

**Không gửi PII tới GA4.**

Tuyệt đối không đưa vào tham số sự kiện: họ tên, số điện thoại, địa chỉ email, địa chỉ nhà, nội dung tin nhắn tư vấn, hay bất kỳ dữ liệu nào nhận dạng được cá nhân.

Được phép: định danh khóa học (slug), vị trí CTA, tên biểu mẫu, đường dẫn trang — đều là dữ liệu về **nội dung**, không phải về **người dùng**.

Lưu ý một cạm bẫy cụ thể: sự kiện `contact_phone` ghi nhận việc **người dùng bấm vào số của thầy**, không phải số của người dùng. Số điện thoại trong `tel:` là số công khai của thầy Tùng — không phải PII của khách. Không bao giờ được thêm bất kỳ số nào do người dùng nhập vào.

Facebook Pixel **mặc định tắt**, chỉ bật khi đặt `NEXT_PUBLIC_ENABLE_FACEBOOK_PIXEL="true"`.

---

## Kiểm tra sau khi gắn ID

1. Cài **Tag Assistant** (tagassistant.google.com) → Connect tới domain
2. Bấm thử từng CTA, xác nhận mỗi cú bấm sinh **đúng một** sự kiện
3. GA4 → Reports → Realtime → xác nhận sự kiện về đủ tham số
4. GA4 → Admin → Custom definitions → khai báo `location`, `course`, `article`
5. GA4 → Admin → Events → đánh dấu `contact_phone`, `contact_zalo`, `registration_click` là **Key event** (chuyển đổi)

Trong lúc chưa gắn ID, chạy `npm run dev` và mở Console — mỗi sự kiện được in ra dưới dạng `[analytics] <tên> <tham số>` để kiểm tra taxonomy.
