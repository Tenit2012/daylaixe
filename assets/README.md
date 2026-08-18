# Ảnh và video gốc

Thư mục này chứa **file gốc chưa xử lý**. Nó **không** được phục vụ ra web —
chỉ `public/` mới được phục vụ.

| Thư mục                            | Vai trò                                             |
| ---------------------------------- | --------------------------------------------------- |
| `assets/photos/`, `assets/videos/` | File gốc, độ phân giải đầy đủ. Nguồn duy nhất.      |
| `public/images/`, `public/videos/` | File đã xử lý, **đây mới là thứ website hiển thị**. |

Đừng sửa file trong `public/` bằng tay — chúng được sinh ra từ đây bằng:

```bash
node scripts/process-photos.mjs    # ảnh
node scripts/process-video.mjs     # video (cần devDependency ffmpeg-static)
```

Muốn thêm file mới: bỏ vào đây, khai báo thêm một mục trong mảng `JOBS` của
script tương ứng, rồi chạy lại lệnh trên.

> **Vì sao phải qua script thay vì copy tay**
>
> - **Ảnh:** ảnh chụp bằng điện thoại thường có thẻ EXIF `orientation` — dữ liệu
>   điểm ảnh nằm ngang nhưng phải xoay 90° khi hiển thị. Copy thẳng thì ảnh có
>   thể hiện nằm nghiêng. Script "nướng" góc xoay vào chính điểm ảnh.
> - **Video:** file `.mov` quay bằng iPhone dùng container QuickTime. Dù bên
>   trong đã là H.264 + AAC, Firefox và một số bản Chrome vẫn từ chối phát vì
>   đọc brand của container. Script đóng gói lại thành MP4 chuẩn và đẩy bảng chỉ
>   mục lên đầu file (`faststart`) để video phát được ngay thay vì phải tải hết.

---

## Đang dùng

### Ảnh

| File                                         | Dùng ở                                      |
| -------------------------------------------- | ------------------------------------------- |
| `photos/thay-tai-phong-lam-viec.jpeg`        | Chân dung thầy — trang chủ và `/gioi-thieu` |
| `photos/thay-giai-thich-man-hinh-cabin.jpeg` | Hero trang chủ + ảnh Open Graph             |
| `photos/thay-huong-dan-vo-lang.jpeg`         | Album                                       |
| `photos/dan-xe-tap-lai.jpg`                  | Album                                       |
| `photos/xe-tap-lai-san-tap.jpeg`             | Album (mục "Sân tập")                       |
| `photos/congtruong.jpg`                      | Album (mục "Cổng trung tâm", có watermark)  |
| `photos/IMG_1636.jpeg`                       | Album (mục "Xe tập lái hạng B")             |
| `photos/IMG_1637.jpeg`                       | Album (mục "Xe tải tập lái hạng C1")        |
| `photos/IMG_1638.jpeg`                       | Album (mục "Đầu xe gắn biển TẬP LÁI")       |
| `photos/IMG_1639.jpeg`                       | Album (mục "Trong buổi thực hành")          |
| `photos/IMG_1640.jpeg`                       | Album (mục "Xe tập lái tại sân")            |

### Video

Cả 4 video đều nằm trong mục "Xem một buổi học thực tế" — trang chủ và
`/gioi-thieu`.

| File                                     | Nội dung                            | Dài | Nặng    |
| ---------------------------------------- | ----------------------------------- | ---- | ------- |
| `videos/buoi-hoc-thuc-te.mp4`            | Thầy hướng dẫn học viên trên xe con | 25 s | 2,9 MB  |
| `videos/videoplayback.mp4`               | Thực hành tại sân tập               | 46 s | 3,6 MB  |
| `videos/hoc-vien-lai-xe-tai.mov`         | Học viên tập lái xe tải, trời mưa   | 38 s | 4,2 MB  |
| `videos/thuc-hanh-xe-tai-trong-san.mov`  | Xe tải chạy trong sân, góc ghế lái  | 69 s | 10,3 MB |

`videoplayback.mp4` từng đăng YouTube trước đó, tải lại về để tự lưu trên site
(không nhúng iframe YouTube), nên độ phân giải thấp hơn do đã qua nén lại của
YouTube. Trang **chỉ tải ảnh poster** (~35-50 KB mỗi cái) cho tới khi người
dùng bấm nút play — xem `src/components/ui/video-player.tsx`. Nhờ vậy video
10,3 MB không ảnh hưởng tốc độ tải trang.

## Chưa dùng — cân nhắc kỹ trước khi đưa lên

### Nhóm 1 — ảnh mang phù hiệu / biểu tượng của ngành

| File                                 | Nội dung                                                                    |
| ------------------------------------ | --------------------------------------------------------------------------- |
| `photos/tap-the-hoi-truong.jpeg`     | Ảnh tập thể trong hội trường, có phù hiệu Bộ Công an và băng-rôn khẩu hiệu  |
| `photos/tap-the-cau-thang.jpeg`      | Ảnh tập thể cán bộ mặc quân phục                                            |
| `photos/tap-the-nha-tuong-niem.jpeg` | Ảnh chào trong nhà tưởng niệm                                               |
| `photos/IMG_1641.jpeg`               | Lễ trao quyết định trong phòng họp, có sĩ quan mang quân hàm và cấp hiệu CA |

Lý do chưa dùng: website mang disclaimer bắt buộc ở footer mọi trang —
_"không phải cổng thông tin chính thức của Trường Đại học An ninh Nhân dân hoặc
Trung tâm đào tạo lái xe"_. Đưa các ảnh mang phù hiệu và biểu tượng của ngành lên
trang tuyển sinh cá nhân sẽ khiến người xem hiểu ngược lại với câu disclaimer đó.
Ngoài ra ảnh có nhiều cán bộ không liên quan đến việc dạy lái xe.

### Nhóm 2 — chưa chọn dùng vì lý do nội dung / trùng lặp

| File                                     | Lý do                                                                       |
| ---------------------------------------- | --------------------------------------------------------------------------- |
| `photos/NguyenThanhTung-laixeanninh.jpg` | Đã gỡ khỏi Album ngày 18/08/2026 theo yêu cầu chủ website (bố cục chưa đẹp) |

---

## Quyền riêng tư và bản quyền

- **File có mặt học viên** — `photos/thay-huong-dan-vo-lang.jpeg`,
  `photos/thay-giai-thich-man-hinh-cabin.jpeg`, **`videos/buoi-hoc-thuc-te.mp4`**
  (thấy rõ mặt học viên suốt 25 giây) và **`videos/hoc-vien-lai-xe-tai.mov`**
  (thấy rõ mặt học viên, ảnh poster cũng có mặt): chỉ đăng khi học viên đã đồng
  ý. Chủ website xác nhận đã xin phép cho video xe tải ngày 18/08/2026. Trang
  Điều khoản sử dụng đã cam kết gỡ ngay khi người trong ảnh yêu cầu.
- `videos/thuc-hanh-xe-tai-trong-san.mov` chỉ thấy tay cầm vô lăng, không lộ
  danh tính.
- **`videos/videoplayback.mp4`**: chủ website xác nhận đây là video do
  chính mình/trung tâm tự quay và từng đăng YouTube trước đó (18/08/2026),
  nay tải lại để tự lưu trên site.
- **Xe trong video có dán phù hiệu trường.** Đây là xe tập lái thật dùng trong
  buổi học nên việc nó xuất hiện là tất yếu, khác với ảnh tập thể mang tính nghi
  lễ ở trên. Nhưng vẫn nên biết là nó có ở đó.
- **`photos/dan-xe-tap-lai.jpg`**: cần xác nhận đây là ảnh tự chụp. Nếu lấy từ
  website của trung tâm thì phải được trung tâm đồng ý trước khi dùng trên
  trang cá nhân. (`photos/cabin-mo-phong-hoc-vien.jpg` cùng nhóm nghi vấn này
  đã được gỡ khỏi Album ngày 18/08/2026.)
