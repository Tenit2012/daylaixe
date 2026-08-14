# Checklist thông tin cần thầy Tùng cung cấp

> Gửi kèm khi nhờ thầy cung cấp thông tin để hoàn thiện website.
> Cột **Bắt buộc**: ✅ = cần trước khi đưa web lên · ⭘ = có thì tốt, thiếu vẫn chạy được (web tự ẩn phần đó).
> Website đã được thiết kế để **thiếu thông tin nào thì tự ẩn phần đó đi**, nên thầy cứ cung cấp dần, không cần đủ hết một lúc.

Các ô "Ví dụ" bên dưới **chỉ minh hoạ định dạng**, không phải thông tin thật của thầy —
trừ những dòng được đánh dấu **VERIFIED_REAL_DATA**, đó là thông tin thật đã được xác nhận
và đã đưa lên website.

### Đã xác nhận (VERIFIED_REAL_DATA)

| Thông tin                 | Giá trị đã xác nhận                    | Ngày xác nhận  | Nơi lưu                        |
| ------------------------- | -------------------------------------- | -------------- | ------------------------------ |
| Cách xưng hô              | Thầy Tùng                              | 06/08/2026     | `NEXT_PUBLIC_TEACHER_NAME`     |
| Số điện thoại             | 0967569733                             | 06/08/2026     | `NEXT_PUBLIC_PHONE_NUMBER`     |
| Zalo                      | zalo.me/0967569733                     | 06/08/2026     | `NEXT_PUBLIC_ZALO_URL`         |
| **Kinh nghiệm giảng dạy** | **Gần 20 năm giảng dạy tại trung tâm** | **07/08/2026** | `NEXT_PUBLIC_EXPERIENCE_LABEL` |
| **Đối tượng học viên**    | **Cả hệ dân sự và hệ Công an**         | **07/08/2026** | `NEXT_PUBLIC_STUDENT_GROUPS`   |

> Lưu ý về cách diễn đạt kinh nghiệm: dữ liệu gốc là **"gần 20 năm"** (ước lượng).
> Website giữ nguyên cách nói này, **không** làm tròn thành "20 năm". Vì vậy biến môi
> trường lưu dạng **nhãn chữ** (`"Gần 20 năm"`) chứ không lưu số.

> Về cách gọi "hệ Công an": nếu trung tâm có tên gọi chính thức khác, chỉ cần sửa hai
> biến `NEXT_PUBLIC_STUDENT_GROUPS` và `NEXT_PUBLIC_STUDENT_GROUPS_SHORT` — không phải
> sửa bất kỳ component nào.

---

## 1. Thông tin cá nhân và thương hiệu

| Thông tin                                          | Ví dụ định dạng                                                       | Bắt buộc | Hiển thị tại                                          | Cần trung tâm xác nhận                                       |
| -------------------------------------------------- | --------------------------------------------------------------------- | -------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| Cách xưng hô muốn hiển thị                         | "Thầy Tùng"                                                           | ✅       | Header, tiêu đề, mọi trang                            | Không                                                        |
| Chức danh nghề nghiệp                              | "Giáo viên dạy thực hành lái xe"                                      | ✅       | Mục "Về thầy", dữ liệu SEO                            | Có thể                                                       |
| ~~Số năm kinh nghiệm~~ → **Kinh nghiệm giảng dạy** | **✅ ĐÃ CÓ — VERIFIED_REAL_DATA: "Gần 20 năm"**                       | ✅ đã có | Hero, mục "Về thầy", trang Giới thiệu, Person JSON-LD | Không                                                        |
| **Đối tượng học viên đã giảng dạy**                | **✅ ĐÃ CÓ — VERIFIED_REAL_DATA: "học viên hệ dân sự và hệ Công an"** | ✅ đã có | Hero (trust), mục "Về thầy", trang Giới thiệu         | Nên xác nhận **cách gọi chính thức** của trung tâm           |
| Vài dòng giới thiệu / câu chuyện nghề              | 3–5 câu thầy tự kể                                                    | ⭘        | Mục "Về thầy", trang Giới thiệu                       | Không                                                        |
| Logo cá nhân (nếu có)                              | file PNG nền trong suốt 512×512                                       | ⭘        | Header, footer                                        | Không (nhưng **không** dùng logo giống của trường/trung tâm) |

## 2. Thông tin liên hệ

| Thông tin              | Ví dụ định dạng                         | Bắt buộc | Hiển thị tại          | Cần trung tâm xác nhận |
| ---------------------- | --------------------------------------- | -------- | --------------------- | ---------------------- |
| Số điện thoại chính    | (đã có: 0967569733)                     | ✅ đã có | Header, hero, nút gọi | Không                  |
| Zalo                   | (đã có: zalo.me/0967569733)             | ✅ đã có | Nút Zalo mọi nơi      | Không                  |
| Email                  | ten@gmail.com                           | ⭘        | Footer, trang Liên hệ | Không                  |
| Facebook               | https://facebook.com/trang-cua-thay     | ⭘        | Footer                | Không                  |
| YouTube hoặc TikTok    | https://youtube.com/@kenh (hoặc TikTok) | ⭘        | Footer                | Không                  |
| Khung giờ nhận liên hệ | "7:00 – 20:00 hằng ngày"                | ⭘        | Footer, Liên hệ       | Không                  |

## 3. Khóa học

| Thông tin                                 | Ví dụ định dạng                                  | Bắt buộc | Hiển thị tại                 | Cần trung tâm xác nhận    |
| ----------------------------------------- | ------------------------------------------------ | -------- | ---------------------------- | ------------------------- |
| Danh sách khóa đang thực sự nhận học viên | "B tự động, B số sàn, C1, bổ túc, luyện sa hình" | ✅       | Trang Khóa học, form đăng ký | Có                        |
| Thời lượng dự kiến mỗi khóa               | "Khoảng 3 tháng"                                 | ⭘        | Trang khóa học               | Có                        |
| Điều kiện dự học (nhất là C1)             | mô tả điều kiện theo quy định                    | ⭘        | Trang khóa C1                | Có (+ quy định hiện hành) |

## 4. Học phí

| Thông tin              | Ví dụ định dạng                                             | Bắt buộc                  | Hiển thị tại                       | Cần trung tâm xác nhận |
| ---------------------- | ----------------------------------------------------------- | ------------------------- | ---------------------------------- | ---------------------- |
| Học phí từng khóa      | "Khóa B tự động: … đồng"                                    | ⭘ (web đang để "liên hệ") | Trang khóa học, Học phí & lộ trình | Có                     |
| Khoản đã bao gồm       | "gồm đào tạo lý thuyết + thực hành + …"                     | ⭘                         | Trang Học phí                      | Có                     |
| Khoản có thể phát sinh | "hồ sơ, khám sức khỏe, lệ phí sát hạch, giờ thực hành thêm" | ⭘                         | Trang Học phí, FAQ                 | Có                     |

> Lưu ý: nếu thầy **chưa muốn công khai học phí**, web sẽ tiếp tục hiển thị "Vui lòng liên hệ…" — hoàn toàn ổn.

## 5. Lịch học và địa điểm

| Thông tin                   | Ví dụ định dạng                      | Bắt buộc | Hiển thị tại                  | Cần trung tâm xác nhận |
| --------------------------- | ------------------------------------ | -------- | ----------------------------- | ---------------------- |
| Địa chỉ điểm tư vấn/hẹn gặp | "Số … đường …, TP. Thủ Đức"          | ✅       | Footer, Liên hệ               | Có thể                 |
| Địa điểm học lý thuyết      | mô tả nơi học                        | ⭘        | Liên hệ, FAQ                  | Có                     |
| Địa điểm/sân thực hành      | tên sân, khu vực                     | ⭘        | Liên hệ, FAQ                  | Có                     |
| Link Google Maps            | link chia sẻ từ ứng dụng Google Maps | ⭘        | Nút "Chỉ đường" trang Liên hệ | Có thể                 |
| Khu vực nhận học viên       | "TP. Thủ Đức và các quận lân cận"    | ✅       | Hero, Liên hệ                 | Không                  |
| Khung giờ học               | "sáng / chiều / tối / cuối tuần"     | ⭘        | FAQ                           | Có                     |

## 6. Hồ sơ

| Thông tin                   | Ví dụ định dạng                         | Bắt buộc | Hiển thị tại        | Cần trung tâm xác nhận |
| --------------------------- | --------------------------------------- | -------- | ------------------- | ---------------------- |
| Danh mục hồ sơ cần chuẩn bị | liệt kê giấy tờ theo quy định hiện hành | ⭘        | Trang khóa học, FAQ | Có (+ quy định)        |

## 7. Hình ảnh (xem chi tiết kích thước ở `docs/REQUIRED_ASSETS.md`)

| Ảnh                                                           | Số lượng | Bắt buộc                        | Hiển thị tại                                        |
| ------------------------------------------------------------- | -------- | ------------------------------- | --------------------------------------------------- |
| Chân dung thầy (dọc 4:5)                                      | 1        | ✅                              | Trang chủ, Giới thiệu                               |
| Thầy đứng cạnh xe tập lái (ngang)                             | 1        | ✅                              | Hero trang chủ                                      |
| Ảnh xe tập lái                                                | 1        | ⭘                               | Album                                               |
| Ảnh sân tập                                                   | 1        | ⭘                               | Album                                               |
| Ảnh buổi học (sa hình / đường trường / lý thuyết / hướng dẫn) | 4        | ⭘                               | Album (cần **học viên đồng ý** nếu có mặt học viên) |
| Ảnh minh hoạ 5 khóa học                                       | 5        | ⭘                               | Trang khóa học                                      |
| Ảnh bìa 8 bài viết (1200×630)                                 | 8        | ⭘                               | Blog + chia sẻ mạng xã hội                          |
| **Ảnh chia sẻ mạng xã hội (OG) 1200×630 raster**              | 1        | ✅ (nếu chạy quảng cáo/chia sẻ) | Khi chia sẻ link lên Facebook/Zalo                  |

> Không dùng ảnh AI giả người thật, không dùng ảnh trên mạng chưa rõ bản quyền. Chưa có ảnh thật thì cứ giữ hình minh hoạ hiện tại — trung thực hơn.

## 8. Video

| Thông tin               | Ví dụ định dạng                           | Bắt buộc | Hiển thị tại              |
| ----------------------- | ----------------------------------------- | -------- | ------------------------- |
| Video cảm nhận học viên | MP4 1080p ngang hoặc link YouTube, 30–90s | ⭘        | Trang Cảm nhận (2 vị trí) |
| Video giới thiệu thầy   | tương tự                                  | ⭘        | Trang chủ / Giới thiệu    |

> Bắt buộc có **sự đồng ý của học viên**; không quay khi xe đang chạy; không cam kết kết quả thi trong video.

## 9. Phản hồi học viên

| Thông tin                       | Ví dụ định dạng                                       | Bắt buộc | Hiển thị tại              |
| ------------------------------- | ----------------------------------------------------- | -------- | ------------------------- |
| Cảm nhận thật đã được phép dùng | tên (hoặc viết tắt) + khóa học + nội dung + có đồng ý | ⭘        | Trang chủ, trang Cảm nhận |

> Hiện trang đang hiển thị **nội dung mẫu** (có ghi rõ "Nội dung mẫu"). Khi có cảm nhận thật, sẽ thay vào và bỏ nhãn mẫu. **Không** chỉnh sửa lời học viên theo hướng phóng đại.

## 10. Kênh mạng xã hội

Đã gộp ở mục 2 (Facebook, YouTube/TikTok). Bổ sung kênh nào thầy đang dùng thật.

## 11. Thông tin xác nhận với trung tâm

| Thông tin                                                                                                                | Bắt buộc | Ghi chú                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------- |
| Tên trung tâm đào tạo thật                                                                                               | ✅       | Đang để tên chung "Trung tâm đào tạo lái xe tại TP.HCM"                                                     |
| **Quan hệ chính xác giữa thầy và trung tâm**                                                                             | ✅       | Thầy là giáo viên cơ hữu / cộng tác / hỗ trợ tuyển sinh?                                                    |
| **Website hiện có câu miễn trừ nêu tên "Trường Đại học An ninh Nhân dân"** — thầy có thực sự liên quan đơn vị này không? | ✅       | Nếu **không** liên quan, sẽ bỏ tên cụ thể để tránh gây hiểu nhầm. Nếu **có**, giữ và xác nhận cách diễn đạt |
| Lịch khai giảng thật (nếu muốn hiển thị)                                                                                 | ⭘        | Hiện web không nêu ngày cụ thể                                                                              |

## 12. Quyền sử dụng logo, hình ảnh và tên trung tâm

| Thông tin                                                | Bắt buộc      | Ghi chú                                        |
| -------------------------------------------------------- | ------------- | ---------------------------------------------- |
| Được phép dùng tên trung tâm trên website cá nhân không? | ✅            | Xác nhận với trung tâm                         |
| Được phép dùng logo/hình ảnh của trung tâm không?        | ⭘             | Nếu không, chỉ dùng nhận diện cá nhân của thầy |
| Ảnh có mặt học viên đã có đồng ý chưa?                   | ✅ (nếu dùng) | Tốt nhất lưu lại tin nhắn/văn bản đồng ý       |

---

### Cách gửi lại cho người làm web

Thầy có thể trả lời trực tiếp theo từng mục trên (đánh số), gửi kèm ảnh/video qua Zalo hoặc Google Drive. Ưu tiên trước: **mục 1 (tên/chức danh), mục 5 (địa chỉ), mục 7 (2 ảnh ưu tiên cao + ảnh OG), mục 11 (quan hệ với trung tâm)**.
