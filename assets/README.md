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
| `photos/cabin-mo-phong-hoc-vien.jpg`         | Album                                       |
| `photos/dan-xe-tap-lai.jpg`                  | Album                                       |
| `photos/xe-tap-lai-san-tap.jpeg`             | Album (mục "Sân tập")                       |

### Video

| File                          | Dùng ở                                                      |
| ----------------------------- | ----------------------------------------------------------- |
| `videos/buoi-hoc-thuc-te.mov` | Mục "Xem một buổi học thực tế" — trang chủ và `/gioi-thieu` |

Video dài 37 giây, quay dọc 480×854. Bản MP4 nặng khoảng 5,7 MB nên trang
**chỉ tải ảnh poster** (~54 KB) cho tới khi người dùng bấm nút play — xem
`src/components/ui/video-player.tsx`.

## Chưa dùng — cân nhắc kỹ trước khi đưa lên

| File                                 | Nội dung                                                                   |
| ------------------------------------ | -------------------------------------------------------------------------- |
| `photos/tap-the-hoi-truong.jpeg`     | Ảnh tập thể trong hội trường, có phù hiệu Bộ Công an và băng-rôn khẩu hiệu |
| `photos/tap-the-cau-thang.jpeg`      | Ảnh tập thể cán bộ mặc quân phục                                           |
| `photos/tap-the-nha-tuong-niem.jpeg` | Ảnh chào trong nhà tưởng niệm                                              |

Lý do chưa dùng: website mang disclaimer bắt buộc ở footer mọi trang —
_"không phải cổng thông tin chính thức của Trường Đại học An ninh Nhân dân hoặc
Trung tâm đào tạo lái xe"_. Đưa các ảnh mang phù hiệu và biểu tượng của ngành lên
trang tuyển sinh cá nhân sẽ khiến người xem hiểu ngược lại với câu disclaimer đó.
Ngoài ra ảnh có nhiều cán bộ không liên quan đến việc dạy lái xe.

---

## Quyền riêng tư và bản quyền

- **File có mặt học viên** — `photos/thay-huong-dan-vo-lang.jpeg`,
  `photos/thay-giai-thich-man-hinh-cabin.jpeg` và **`videos/buoi-hoc-thuc-te.mov`**
  (video thấy rõ mặt học viên suốt 37 giây): chỉ đăng khi học viên đã đồng ý.
  Trang Điều khoản sử dụng đã cam kết gỡ ngay khi người trong ảnh yêu cầu.
- **Xe trong video có dán phù hiệu trường.** Đây là xe tập lái thật dùng trong
  buổi học nên việc nó xuất hiện là tất yếu, khác với ảnh tập thể mang tính nghi
  lễ ở trên. Nhưng vẫn nên biết là nó có ở đó.
- **`photos/cabin-mo-phong-hoc-vien.jpg` và `photos/dan-xe-tap-lai.jpg`**: cần
  xác nhận đây là ảnh tự chụp. Nếu lấy từ website của trung tâm thì phải được
  trung tâm đồng ý trước khi dùng trên trang cá nhân.
