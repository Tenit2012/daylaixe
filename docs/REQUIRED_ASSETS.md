# Ảnh và video cần cung cấp

## Trạng thái hiện tại

**Đã có ảnh và video thật** (nguồn nằm trong `assets/`, xử lý bằng
`node scripts/process-photos.mjs` và `node scripts/process-video.mjs`):

| Vị trí         | File                                                | Nội dung                                               |
| -------------- | --------------------------------------------------- | ------------------------------------------------------ |
| Hero trang chủ | `public/images/hero/thay-huong-dan-cabin.jpg`       | Thầy chỉ màn hình cabin mô phỏng cho học viên          |
| Chân dung thầy | `public/images/about/chan-dung-thay.jpg`            | Thầy tại phòng làm việc                                |
| Album          | `public/images/gallery/thay-huong-dan-hoc-vien.jpg` | Thầy cầm vô lăng làm mẫu                               |
| Album          | `public/images/gallery/cabin-mo-phong.jpg`          | Học viên tập trên cabin mô phỏng                       |
| Album          | `public/images/gallery/xe-tap-lai.jpg`              | Dàn xe tải tập lái                                     |
| Album          | `public/images/gallery/san-tap.jpg`                 | Xe tập lái đỗ trong ô kẻ vạch tại sân tập              |
| **Video**      | `public/videos/buoi-hoc-thuc-te.mp4`                | Buổi học thực tế, 37 giây — trang chủ và `/gioi-thieu` |
| Open Graph     | `public/images/og/og-default.jpg`                   | Ảnh hiện khi chia sẻ link                              |

**Còn là hình minh họa SVG** (sinh bởi
`node scripts/generate-placeholder-images.mjs`) — xem danh sách ở mục 2:
sa hình, đường trường, lý thuyết, ảnh từng khóa học, ảnh bìa blog.

---

## 1. Cách thay ảnh

### Cách nhanh: dùng script

1. Bỏ ảnh gốc vào thư mục `assets/photos/`.
2. Thêm một mục vào mảng `JOBS` trong
   [`scripts/process-photos.mjs`](../scripts/process-photos.mjs) — khai báo tên
   file nguồn, đường dẫn đích, kích thước và vị trí cắt.
3. Chạy `node scripts/process-photos.mjs`.

Script tự xoay ảnh theo EXIF, cắt đúng tỷ lệ và nén xuống cỡ dùng được cho web
(ảnh 3,7 MB từ điện thoại còn khoảng 80–110 KB).

> **Vì sao phải qua script thay vì copy tay:** ảnh chụp bằng điện thoại thường
> có thẻ EXIF `orientation`, nghĩa là dữ liệu điểm ảnh nằm ngang nhưng phải xoay
> 90° khi hiển thị. Nếu copy thẳng, ảnh có thể hiện nằm ngang trên một số trình
> duyệt hoặc sau khi Next.js tối ưu lại. Script "nướng" góc xoay vào chính điểm
> ảnh nên không còn phụ thuộc EXIF nữa.

### Cách thủ công

1. Đặt file ảnh thật vào đúng đường dẫn trong `public/images/` (giữ nguyên tên
   file để không phải sửa code, hoặc dùng tên mới rồi cập nhật `src`).
2. Cập nhật `src`, `width`, `height` và `alt` trong file content tương ứng.
3. Với ảnh trong `src/content/gallery.ts`, đổi `isPlaceholder: true` →
   `isPlaceholder: false`.

Ví dụ trong `src/content/courses.ts`:

```ts
image: {
  src: '/images/courses/hang-b-so-tu-dong.jpg',   // đổi .svg → .jpg
  alt: 'Học viên thực hành lái xe số tự động trong sân tập',
  width: 1600,
  height: 1000,
}
```

### Định dạng khuyến nghị

- **JPG** cho ảnh chụp (chất lượng 80–85).
- **PNG** cho ảnh có nền trong suốt (logo).
- **WebP / AVIF**: không cần chuyển đổi thủ công — Next.js Image tự sinh khi phục vụ.

`next.config.ts` đã bật `formats: ['image/avif', 'image/webp']`.

---

## 2. Danh sách ảnh cần cung cấp

> **Đã có rồi, không cần cung cấp nữa:** mục 2.1 (chân dung thầy), 2.3 (xe tập
> lái), 2.4 (sân tập), 2.8 (thầy hướng dẫn học viên) và 2.11 (ảnh Open Graph). Mục 2.2 đã có
> ảnh thay thế cho vị trí hero (thầy hướng dẫn trên cabin mô phỏng) — ảnh thầy
> đứng cạnh xe tập lái ngoài sân vẫn đáng chụp thêm nếu có dịp, nhưng không còn
> gấp. Các mục còn lại vẫn cần.
>
> Mô tả bên dưới giữ nguyên để làm chuẩn khi bạn muốn **chụp lại đẹp hơn**.

### 2.1 Ảnh chân dung thầy — ✅ đã có

| Mục                | Chi tiết                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------- |
| Đường dẫn          | `public/images/about/chan-dung-thay.jpg`                                                                       |
| Kích thước đề xuất | 1200 × 1500 px                                                                                                 |
| Tỷ lệ              | 4:5 (dọc)                                                                                                      |
| Hiển thị tại       | Trang chủ (mục "Về thầy"), trang `/gioi-thieu`                                                                 |
| Yêu cầu            | Ảnh rõ mặt, ánh sáng tự nhiên, trang phục lịch sự. Nền đơn giản. Nhìn thẳng vào ống kính, biểu cảm thân thiện. |
| Nên tránh          | Ảnh selfie mờ, ảnh chụp ngược sáng, ảnh có nhiều người                                                         |

### 2.2 Ảnh thầy đứng cạnh xe tập lái — đã có ảnh thay thế

| Mục                       | Chi tiết                                                                                                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Đang dùng                 | `public/images/hero/thay-huong-dan-cabin.jpg` (thầy hướng dẫn trên cabin mô phỏng)                                                                          |
| Nếu chụp bổ sung, đặt tại | `public/images/hero/thay-va-xe-tap-lai.jpg`                                                                                                                 |
| Kích thước đề xuất        | 1800 × 1400 px                                                                                                                                              |
| Tỷ lệ                     | ~9:7 (ngang)                                                                                                                                                |
| Hiển thị tại              | Hero trang chủ (ảnh đầu tiên người dùng thấy)                                                                                                               |
| Yêu cầu                   | Thầy đứng cạnh xe tập lái, thấy rõ bảng "TẬP LÁI". Chụp ban ngày tại sân tập. Chừa khoảng trống hai bên để ảnh không bị cắt mất chi tiết trên màn hình hẹp. |

### 2.3 Ảnh xe tập lái — ✅ đã có

| Mục                | Chi tiết                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------- |
| Đường dẫn          | `public/images/gallery/xe-tap-lai.jpg`                                                   |
| Kích thước đề xuất | 1600 × 1200 px                                                                           |
| Tỷ lệ              | 4:3                                                                                      |
| Hiển thị tại       | Album ảnh (trang chủ, `/gioi-thieu`, `/cam-nhan-hoc-vien`)                               |
| Yêu cầu            | Chụp toàn cảnh chiếc xe, thấy rõ biển "TẬP LÁI". Xe sạch, góc chụp chếch 3/4 phía trước. |

### 2.4 Ảnh sân tập — ✅ đã có

| Mục                | Chi tiết                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------ |
| Đường dẫn          | `public/images/gallery/san-tap.jpg`                                                        |
| Kích thước đề xuất | 1600 × 1200 px                                                                             |
| Tỷ lệ              | 4:3                                                                                        |
| Yêu cầu            | Thấy rõ vạch kẻ, cọc tiêu, không gian sân. Chụp từ vị trí cao nếu có thể để thấy tổng thể. |

### 2.5 Ảnh buổi học sa hình

| Mục                | Chi tiết                                                                 |
| ------------------ | ------------------------------------------------------------------------ |
| Đường dẫn          | `public/images/gallery/sa-hinh.jpg`                                      |
| Kích thước đề xuất | 1600 × 1200 px                                                           |
| Tỷ lệ              | 4:3                                                                      |
| Yêu cầu            | Xe đang thực hiện một bài trong sa hình (ghép dọc, ghép ngang, lên dốc). |

### 2.6 Ảnh buổi học đường trường

| Mục                | Chi tiết                                                                    |
| ------------------ | --------------------------------------------------------------------------- |
| Đường dẫn          | `public/images/gallery/duong-truong.jpg`                                    |
| Kích thước đề xuất | 1600 × 1200 px                                                              |
| Tỷ lệ              | 4:3                                                                         |
| Yêu cầu            | Xe tập lái đang chạy trên đường thực tế. **Không chụp trong lúc đang lái.** |

### 2.7 Ảnh buổi học lý thuyết

| Mục                | Chi tiết                                                                                |
| ------------------ | --------------------------------------------------------------------------------------- |
| Đường dẫn          | `public/images/gallery/ly-thuyet.jpg`                                                   |
| Kích thước đề xuất | 1600 × 1200 px                                                                          |
| Tỷ lệ              | 4:3                                                                                     |
| Yêu cầu            | Buổi ôn lý thuyết hoặc luyện phần mềm mô phỏng. Nếu có mặt học viên, phải có sự đồng ý. |

### 2.8 Ảnh thầy hướng dẫn học viên — ✅ đã có

| Mục                | Chi tiết                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Đường dẫn          | `public/images/gallery/thay-huong-dan-hoc-vien.jpg`                                                                 |
| Kích thước đề xuất | 1600 × 1200 px                                                                                                      |
| Tỷ lệ              | 4:3                                                                                                                 |
| Yêu cầu            | Thầy đang giải thích cho học viên bên cạnh xe hoặc trong xe khi xe đang đỗ. **Bắt buộc có sự đồng ý của học viên.** |

### 2.9 Ảnh minh họa từng khóa học

| Đường dẫn                                     | Kích thước  | Tỷ lệ | Nội dung gợi ý                   |
| --------------------------------------------- | ----------- | ----- | -------------------------------- |
| `public/images/courses/hang-b-so-tu-dong.jpg` | 1600 × 1000 | 8:5   | Xe số tự động, cần số ở vị trí D |
| `public/images/courses/hang-b-so-san.jpg`     | 1600 × 1000 | 8:5   | Cần số sàn, chân côn             |
| `public/images/courses/hang-c1.jpg`           | 1600 × 1000 | 8:5   | Xe tải nhẹ dùng để tập           |
| `public/images/courses/bo-tuc-tay-lai.jpg`    | 1600 × 1000 | 8:5   | Buổi bổ túc trên đường thực tế   |
| `public/images/courses/luyen-sa-hinh.jpg`     | 1600 × 1000 | 8:5   | Xe đang chạy bài sa hình         |

### 2.10 Ảnh bìa bài viết blog

8 file, tất cả cùng kích thước:

| Đường dẫn                                      | Bài viết                         |
| ---------------------------------------------- | -------------------------------- |
| `public/images/blog/so-san-so-tu-dong.jpg`     | Số sàn hay số tự động?           |
| `public/images/blog/loi-sa-hinh.jpg`           | Lỗi thường gặp khi học sa hình   |
| `public/images/blog/buoi-hoc-dau-tien.jpg`     | Chuẩn bị buổi học đầu tiên       |
| `public/images/blog/co-bang-khong-dam-lai.jpg` | Có bằng nhưng không dám lái      |
| `public/images/blog/quy-trinh-dang-ky.jpg`     | Quy trình đăng ký học lái xe     |
| `public/images/blog/duong-dong-tphcm.jpg`      | Lái xe đường đông tại TP.HCM     |
| `public/images/blog/giu-binh-tinh.jpg`         | Giữ bình tĩnh khi lái xe lần đầu |
| `public/images/blog/bo-tuc-tay-lai.jpg`        | Khi nào nên bổ túc tay lái       |

| Mục                | Chi tiết                                                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Kích thước đề xuất | 1200 × 630 px                                                                                                                            |
| Tỷ lệ              | 1.91:1                                                                                                                                   |
| Ghi chú            | Đây cũng là ảnh hiển thị khi chia sẻ bài viết lên Facebook/Zalo, nên chữ trên ảnh (nếu có) phải đủ lớn để đọc được ở kích thước thu nhỏ. |

### 2.11 Ảnh chia sẻ mạng xã hội (Open Graph) — ✅ đã có

| Mục                     | Chi tiết                                                                                                         |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Đường dẫn               | `public/images/og/og-default.jpg`                                                                                |
| Kích thước **bắt buộc** | 1200 × 630 px                                                                                                    |
| Tỷ lệ                   | 1.91:1                                                                                                           |
| Hiển thị tại            | Khi chia sẻ trang chủ hoặc các trang chưa có ảnh riêng lên Facebook, Zalo, Messenger                             |
| Yêu cầu                 | Có ảnh thầy hoặc xe tập lái + tên thầy + số điện thoại. Chữ lớn, tương phản cao. Chừa lề an toàn ~60px mỗi cạnh. |

### 2.12 Logo Zalo — ✅ đã có

Các nút "Nhắn Zalo" trên website dùng **icon Zalo chính chủ** — đúng hình dạng
Zalo phát hành, không phải hình vẽ lại: khối squircle xanh `#0068FF`, bong bóng
trắng chiếm gần hết khung, đuôi lưỡi liềm ở góc dưới bên trái, chữ ký hiệu
"Zalo" màu xanh.

| Mục       | Chi tiết                                                |
| --------- | ------------------------------------------------------- |
| Đường dẫn | `public/images/brand/zalo-logo.svg`                     |
| Số file   | 1 — dùng chung cho mọi nền                              |
| Định dạng | SVG, khung nhìn 50 × 50, co giãn không vỡ nét           |

**Một file dùng cho cả ba nền của website.** Đã kiểm tra thực tế:

| Nền                            | Logo hiện ra thế nào                                    |
| ------------------------------ | ------------------------------------------------------- |
| Nút xanh Zalo, thanh CTA mobile | Khối squircle hòa vào nền nút, còn lại bong bóng trắng + chữ xanh |
| Footer nền navy                 | Hiện nguyên như một huy hiệu app icon                   |
| Thẻ "Zalo" trang Liên hệ        | Còn lại viền lưỡi liềm xanh + chữ xanh                  |

> **Muốn đổi logo thì chỉ cần ghi đè đúng file trên**, giữ nguyên tên và đường
> dẫn — không phải sửa dòng code nào.
>
> ⚠️ Khi sửa phần chú thích bên trong file SVG: XML **cấm hai dấu gạch ngang
> liền nhau** trong comment. Viết tên biến CSS kèm hai gạch ở đầu sẽ làm hỏng
> cả file, và lỗi đó **im lặng**: server vẫn trả 200, chỉ có trình duyệt hiện
> ảnh vỡ. Sửa xong nhớ mở trình duyệt xem lại, đừng chỉ tin `curl`.

**Lưu ý khi dùng:**

- Giữ nguyên tỷ lệ, không bóp méo, không tự đổi màu.
- Chỉ dùng để chỉ ra kênh liên hệ. Không đặt logo cạnh nội dung khiến người xem
  hiểu nhầm rằng Zalo bảo trợ hoặc liên kết với website này.
- Màu nền nút đang dùng là `#0068FF`. Nên đối chiếu lại với mã màu thương hiệu
  chính thức của Zalo; nếu khác, sửa hai biến `--color-zalo` và
  `--color-zalo-dark` trong `src/app/globals.css`.

### 2.13 Logo cá nhân (nếu có)

| Mục             | Chi tiết                                                                                                              |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| Đường dẫn       | `public/images/logo.png` và `public/icon.svg` (favicon)                                                               |
| Kích thước logo | 512 × 512 px, nền trong suốt (PNG)                                                                                    |
| Favicon         | SVG vuông, đơn giản, đọc được ở 16×16 px                                                                              |
| Ghi chú         | Hiện đang dùng logo chữ + icon xe. Nếu có logo riêng, thay `public/icon.svg` và cập nhật `SiteHeader` / `SiteFooter`. |

> **Cảnh báo:** logo và bộ nhận diện **không được** giống hoặc gợi liên tưởng đến
> logo, màu sắc, con dấu của Trường Đại học An ninh Nhân dân hoặc của trung tâm
> đào tạo, để tránh khiến người xem hiểu nhầm đây là trang chính thức.

---

## 3. Video

### 3.1 Video buổi học — ✅ đã có

`src/content/videos.ts` đang có 1 video: buổi dạy thực tế, 37 giây, quay dọc
480×854. Hiển thị ở trang chủ và `/gioi-thieu`.

Thêm video mới: bỏ file vào `assets/videos/`, khai báo một mục trong mảng `JOBS`
của [`scripts/process-video.mjs`](../scripts/process-video.mjs), chạy
`node scripts/process-video.mjs`, rồi thêm một mục vào `src/content/videos.ts`.

Script tự đóng gói lại thành MP4 chuẩn web và trích ảnh poster. Ảnh poster là
bắt buộc: trang chỉ tải poster (~54 KB) chứ **không** tải video (~5,7 MB) cho
tới khi người dùng bấm play — nếu thiếu poster, người dùng chỉ thấy một ô đen.

### 3.2 Video cảm nhận học viên — chưa có

Hiện tại `src/content/testimonials.ts` khai báo 2 vị trí video với
`videoUrl: null` — giao diện hiển thị khung chờ kèm dòng chữ giải thích.
Đây là chỗ dành cho video **học viên tự kể trải nghiệm**, khác với video buổi
học ở mục 3.1.

| Mục            | Chi tiết                                                                            |
| -------------- | ----------------------------------------------------------------------------------- |
| Số lượng       | 2 video (có thể thêm)                                                               |
| Độ dài đề xuất | 30–90 giây                                                                          |
| Định dạng      | MP4 (H.264) hoặc link YouTube                                                       |
| Độ phân giải   | 1080p, quay ngang (16:9)                                                            |
| Ảnh poster     | 1280 × 720 px                                                                       |
| Nội dung gợi ý | Học viên tự kể trải nghiệm: xuất phát điểm, điều lo lắng ban đầu, điều đã cải thiện |

**Bắt buộc:**

- Có sự đồng ý rõ ràng của học viên trước khi quay và trước khi đăng.
- Không quay trong lúc xe đang di chuyển.
- Không lồng lời cam kết kết quả thi vào video.
- Video **không autoplay** — người dùng phải chủ động bấm phát (đã tuân thủ
  trong giao diện hiện tại).

---

## 4. Quy tắc bản quyền và quyền riêng tư

### Bản quyền

- Chỉ dùng ảnh **tự chụp** hoặc ảnh có giấy phép sử dụng rõ ràng.
- **Không hotlink** ảnh từ website khác — mọi ảnh phải nằm trong `public/`.
- Không dùng ảnh từ Google Images mà chưa kiểm tra giấy phép.
- Nếu dùng ảnh miễn phí (Unsplash, Pexels…), lưu lại nguồn để đối chiếu khi cần.

### Quyền riêng tư

- Ảnh có mặt học viên: phải có sự đồng ý, tốt nhất là bằng văn bản hoặc tin nhắn
  lưu lại được.
- Không đăng ảnh có thể nhận diện biển số xe cá nhân của học viên.
- Không đăng ảnh giấy tờ tùy thân, giấy khám sức khỏe hay hồ sơ.
- Khi học viên yêu cầu gỡ ảnh, gỡ ngay.

### Không tạo ảnh giả

Không dùng ảnh do AI tạo ra trông giống người thật rồi trình bày như ảnh của thầy
hoặc của học viên. Nếu chưa có ảnh thật, cứ giữ hình minh họa SVG hiện tại —
người xem hiểu đó là hình minh họa và điều đó trung thực hơn.

---

## 5. Sau khi thay ảnh

```bash
npm run typecheck   # bắt lỗi sai kiểu nếu quên cập nhật width/height
npm run test        # kiểm tra mọi ảnh đều có alt text
npm run build       # xác nhận build được
```

Kiểm tra bằng mắt trên cả màn hình rộng và màn hình 360px để chắc chắn ảnh không
bị méo hay cắt mất chi tiết quan trọng.
