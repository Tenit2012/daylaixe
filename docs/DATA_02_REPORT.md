# DATA-02 — Báo cáo thay dữ liệu: Kinh nghiệm giảng dạy

**Ngày thực hiện:** 07/08/2026
**Trạng thái:** ✅ HOÀN THÀNH — `VERIFIED_REAL_DATA`
**Liên quan:** `docs/MOCK_AND_SAMPLE_DATA_AUDIT.md` (F13, F13b) ·
`docs/DATA_REPLACEMENT_PLAN.md` (Phase 2) · `docs/THAY_TUNG_CONTENT_CHECKLIST.md` (mục 1)

> **Ghi chú:** file này chưa tồn tại trước đó. Nó được tạo mới để ghi lại đúng
> lần thay dữ liệu này, theo cách đặt tên của các tài liệu DATA-\* trong `docs/`.

---

## 1. Dữ liệu nhận được

Thầy xác nhận hai thông tin:

```text
Kinh nghiệm:
Gần 20 năm kinh nghiệm giảng dạy tại trung tâm.

Đối tượng học viên đã giảng dạy:
Cả hệ dân sự và hệ Công an.
```

Phân loại: **VERIFIED_REAL_DATA** — thay thế hoàn toàn giá trị tạm trước đó
(`nhiều năm`, mơ hồ, được đánh dấu `NEEDS_CONFIRMATION`).

---

## 2. Nguyên tắc áp dụng khi diễn đạt

| Nguyên tắc                | Cách thực hiện                                                                                 |
| ------------------------- | ---------------------------------------------------------------------------------------------- |
| Giữ nguyên tính ước lượng | Lưu **"Gần 20 năm"**, không làm tròn thành "20 năm" ở bất kỳ đâu                               |
| Không lưu số tuyệt đối    | Kiểu dữ liệu là **nhãn chữ** (`experienceLabel: string`), không phải `experienceYears: number` |
| Wording có thể đổi sau    | Cách gọi nhóm học viên nằm trong biến môi trường, component không hard-code                    |
| Không bịa thêm            | Không thêm số học viên, tỷ lệ thi đậu, thành tích, chức vụ, cấp bậc, danh hiệu                 |
| Không nhồi từ khóa        | Cụm "gần 20 năm" chỉ xuất hiện ở 4 vị trí có ngữ cảnh phù hợp                                  |

### Những gì KHÔNG được thêm (đã kiểm tra)

- ❌ Số lượng học viên đã đào tạo
- ❌ Tỷ lệ thi đậu
- ❌ Thành tích, giải thưởng, danh hiệu chưa xác nhận
- ❌ Chức vụ trong lực lượng Công an
- ❌ Cấp bậc
- ❌ `aggregateRating`, `reviewCount`, `award` trong structured data

---

## 3. Thay đổi cấu hình

### 3.1 Biến môi trường

| Trước                                         | Sau                                                             | Lý do                                                      |
| --------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------- |
| `NEXT_PUBLIC_YEARS_OF_EXPERIENCE="nhiều năm"` | **đã bỏ**                                                       | Tên biến gợi ý "số năm", dễ dẫn tới việc điền số tuyệt đối |
| —                                             | `NEXT_PUBLIC_EXPERIENCE_LABEL="Gần 20 năm"`                     | Tên nói rõ đây là **nhãn chữ**                             |
| —                                             | `NEXT_PUBLIC_STUDENT_GROUPS="học viên hệ dân sự và hệ Công an"` | Dùng trong câu văn đầy đủ                                  |
| —                                             | `NEXT_PUBLIC_STUDENT_GROUPS_SHORT="học viên dân sự và Công an"` | Dùng trong nhãn ngắn ở hero                                |

Đã cập nhật: `.env`, `.env.example`, `src/lib/env/public.ts`,
`docs/CONTENT_GUIDE.md`, `docs/DEPLOYMENT.md`.

### 3.2 `src/config/site.ts`

```ts
teacher: {
  experienceLabel: publicEnv.NEXT_PUBLIC_EXPERIENCE_LABEL,      // "Gần 20 năm"
  studentGroups: publicEnv.NEXT_PUBLIC_STUDENT_GROUPS,
  studentGroupsShort: publicEnv.NEXT_PUBLIC_STUDENT_GROUPS_SHORT,
}

experience: {
  short:        'Gần 20 năm kinh nghiệm giảng dạy lái xe tại trung tâm',
  compact:      'Gần 20 năm kinh nghiệm giảng dạy',
  withAudience: 'Gần 20 năm kinh nghiệm hướng dẫn học viên hệ dân sự và hệ Công an',
  audienceShort:'Dạy cả học viên dân sự và Công an',
  biography:    '<đoạn giới thiệu đầy đủ theo bản thầy duyệt>',
}
```

Các câu văn được **soạn sẵn trong config**, component chỉ hiển thị chứ không tự
ghép chuỗi. Muốn đổi cách diễn đạt chỉ sửa một chỗ.

---

## 4. Vị trí đã cập nhật trên website

| #   | Vị trí                                  | File                         | Nội dung hiển thị                                                      | Nguồn                                         |
| --- | --------------------------------------- | ---------------------------- | ---------------------------------------------------------------------- | --------------------------------------------- |
| 1   | Hero — nhãn trên tiêu đề                | `hero-section.tsx`           | "Gần 20 năm kinh nghiệm giảng dạy lái xe tại trung tâm"                | `experience.short`                            |
| 2   | Hero — trust indicator đầu tiên         | `hero-section.tsx`           | "Dạy cả học viên dân sự và Công an"                                    | `experience.audienceShort`                    |
| 3   | Trang chủ — mục "Về thầy" (ô thông tin) | `about-teacher-section.tsx`  | "Gần 20 năm kinh nghiệm giảng dạy" + ô mới "Học viên đã hướng dẫn"     | `experience.compact`, `teacher.studentGroups` |
| 4   | Trang chủ — mục "Về thầy" (đoạn văn)    | `about-teacher-section.tsx`  | Đoạn giới thiệu đầy đủ                                                 | `experience.biography`                        |
| 5   | `/gioi-thieu` — đoạn mở đầu nổi bật     | `app/gioi-thieu/page.tsx`    | Đoạn giới thiệu đầy đủ                                                 | `experience.biography`                        |
| 6   | `/gioi-thieu` — meta description        | `app/gioi-thieu/page.tsx`    | "Gần 20 năm kinh nghiệm hướng dẫn học viên hệ dân sự và hệ Công an. …" | `experience.withAudience`                     |
| 7   | Person JSON-LD — trường `description`   | `lib/seo/structured-data.ts` | "Gần 20 năm kinh nghiệm hướng dẫn học viên hệ dân sự và hệ Công an"    | `experience.withAudience`                     |

**Không đưa vào:** trang chủ (ngoài 4 vị trí trên), khóa học, học phí, blog, liên hệ,
footer — để tránh nhồi cụm từ chỉ vì SEO.

### Đoạn giới thiệu đầy đủ (dùng ở vị trí 4, 5)

> Với gần 20 năm kinh nghiệm giảng dạy tại trung tâm, Thầy Tùng đã trực tiếp hướng dẫn
> nhiều thế hệ học viên, từ học viên dân sự đến học viên thuộc lực lượng Công an. Kinh
> nghiệm thực tế lâu năm giúp thầy hiểu những khó khăn thường gặp của người mới học lái
> và có phương pháp hướng dẫn rõ ràng, dễ tiếp thu, chú trọng kỹ năng lái xe an toàn.

Tên thầy trong đoạn này được nội suy từ config, không hard-code.

---

## 5. Structured data

Chỉ bổ sung **một** trường vào `Person` JSON-LD:

```json
"description": "Gần 20 năm kinh nghiệm hướng dẫn học viên hệ dân sự và hệ Công an"
```

Không thêm `aggregateRating`, `reviewCount`, `award`, `alumniOf` hay bất kỳ trường nào
cần số liệu chưa có nguồn xác thực.

---

## 6. Kiểm thử

| Lệnh                | Kết quả              |
| ------------------- | -------------------- |
| `npm run lint`      | ✅ 0 lỗi, 0 cảnh báo |
| `npm run typecheck` | ✅ 0 lỗi             |
| `npm run test`      | ✅ 212/212           |
| `npm run build`     | ✅ 29/29 trang       |
| `npm run test:e2e`  | ✅ 29/29             |

Bổ sung ràng buộc tự động trong `tests/unit/site-config.test.ts`:

- Nhãn kinh nghiệm **không được** là số tuyệt đối "20 năm" khi dữ liệu gốc là ước lượng.
- Không xuất hiện các cụm bịa: số học viên, tỷ lệ đỗ, cấp bậc, chức vụ, danh hiệu.
- Đoạn giới thiệu phải nhắc đủ cả hai nhóm học viên.

---

## 7. Việc còn lại liên quan

| Việc                                                                       | Chủ sở hữu       | Ghi chú                                                    |
| -------------------------------------------------------------------------- | ---------------- | ---------------------------------------------------------- |
| Xác nhận **cách gọi chính thức** của "hệ Công an" tại trung tâm            | Teacher + Center | Nếu khác, chỉ sửa `NEXT_PUBLIC_STUDENT_GROUPS` và `_SHORT` |
| Xác nhận có được phép nêu việc giảng dạy hệ Công an trên web cá nhân không | Teacher + Center | Liên quan mục 11–12 của checklist                          |
| Chức danh, tên trung tâm, địa chỉ, giờ liên hệ                             | Teacher          | Vẫn là giá trị tạm (F12, F14, F15)                         |
