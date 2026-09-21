import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Testimonial } from '@/types/content';
import {
  ILLUSTRATIVE_LABEL,
  PENDING_APPROVAL_LABEL,
  getRealTestimonials,
  hasPendingApprovalQuotes,
  hasPlaceholderTestimonials,
  studentPhotoDisclosure,
  studentPhotoTestimonials,
  testimonials,
} from '@/content/testimonials';
import { TestimonialCard } from '@/components/testimonials/testimonial-card';

/**
 * Cam nhan hoc vien hien la NOI DUNG MINH HOA. Bo test nay chot lai co che
 * "tu an": khi mot muc doi sang `isPlaceholder: false` thi nhan tinh huong
 * minh hoa phai bien mat, va khi CA DANH SACH la cam nhan that thi doan
 * disclaimer o dau khoi cung phai bien mat.
 *
 * Truoc day viec do phai kiem tra bang cach sua tay `testimonials.ts` roi
 * revert. Lam vay khong con dau vet nao trong repo, nen lan sau ai do doi
 * markup se khong biet minh vua pha vo dieu gi. Test nay chay ca hai trang
 * thai ma khong dung toi du lieu that.
 */

const placeholderItem: Testimonial = {
  id: 'test-placeholder',
  situation: 'Người mới bắt đầu',
  period: ILLUSTRATIVE_LABEL,
  quote: 'Nội dung minh họa dùng cho kiểm thử.',
  isPlaceholder: true,
};

const realItem: Testimonial = {
  id: 'test-real',
  situation: 'Hạng B số tự động',
  period: 'Tháng 6/2026',
  quote: 'Nội dung cảm nhận thật dùng cho kiểm thử.',
  isPlaceholder: false,
  name: 'Chị H.',
  avatarInitial: 'H',
};

describe('Nguon du lieu cam nhan', () => {
  it('khoi cam nhan tren trang chu doc tu mot mang duy nhat', () => {
    expect(testimonials.length).toBeGreaterThan(0);
    for (const item of testimonials) {
      expect(typeof item.isPlaceholder).toBe('boolean');
    }
  });

  it('moi muc minh hoa KHONG duoc gan ten nguoi that', () => {
    for (const item of testimonials.filter((t) => t.isPlaceholder)) {
      expect(item.name).toBeUndefined();
      expect(item.avatarInitial).toBeUndefined();
      expect(item.period).toBe(ILLUSTRATIVE_LABEL);
    }
  });

  it('getRealTestimonials chi tra ve muc isPlaceholder: false', () => {
    expect(getRealTestimonials().every((t) => !t.isPlaceholder)).toBe(true);
  });

  it('hasPlaceholderTestimonials phan anh dung trang thai danh sach', () => {
    // Hien tai toan bo la minh hoa nen disclaimer phai hien.
    expect(hasPlaceholderTestimonials()).toBe(true);
    expect(testimonials.some((t) => t.isPlaceholder)).toBe(true);

    // Mo phong danh sach da thay bang cam nhan that: disclaimer phai tat.
    const allReal = [realItem, { ...realItem, id: 'test-real-2' }];
    expect(allReal.some((t) => t.isPlaceholder)).toBe(false);
  });
});

describe('TestimonialCard - nhan tinh huong minh hoa', () => {
  it('HIEN nhan khi isPlaceholder: true', () => {
    render(<TestimonialCard testimonial={placeholderItem} />);
    expect(screen.getByText(ILLUSTRATIVE_LABEL)).toBeInTheDocument();
  });

  it('AN nhan khi isPlaceholder: false', () => {
    render(<TestimonialCard testimonial={realItem} />);
    expect(screen.queryByText(ILLUSTRATIVE_LABEL)).not.toBeInTheDocument();
  });

  it('chi hien ten va thoi gian hoc voi cam nhan that', () => {
    const { unmount } = render(
      <TestimonialCard testimonial={placeholderItem} />,
    );
    // Noi dung minh hoa: khong ten, chi hien nhan phan loai tinh huong.
    expect(screen.getByText(placeholderItem.situation)).toBeInTheDocument();
    expect(screen.queryByText(/Tháng/)).not.toBeInTheDocument();
    unmount();

    render(<TestimonialCard testimonial={realItem} />);
    expect(screen.getByText('Chị H.')).toBeInTheDocument();
    expect(
      screen.getByText(`${realItem.situation} · ${realItem.period}`),
    ).toBeInTheDocument();
  });
});

/**
 * ============================================================================
 * ANH HOC VIEN THAT - RANG BUOC VE SU DONG Y
 * ============================================================================
 * Day la bo test QUAN TRONG NHAT cua khoi nay, va la rang buoc DAO DUC chu
 * khong phai kiem tra ky thuat.
 *
 * Boi canh: anh la NGUOI THAT va da duoc phep dung. Nhung loi nhan xet di
 * kem thi do doi ngu soan, CHUA duoc chinh ho duyet. Rui ro cu the la ai do
 * (hoac chinh minh, sau nay quen mat) lang le go nhan canh bao, hoac dat mot
 * cai ten bia vao duoi mat nguoi that - luc do website dang gan loi noi va
 * danh tinh khong co that cho mot nguoi nhan dien duoc.
 *
 * Nhung test duoi day chan dung viec do. Khi tung nguoi da duyet loi that
 * thi xoa `quotePendingApproval` cho muc do - test tu dong cho qua.
 */
describe('Anh hoc vien that - rang buoc dong y', () => {
  it('muc dang cho duyet KHONG duoc gan ten nguoi', () => {
    for (const item of studentPhotoTestimonials) {
      if (item.quotePendingApproval) {
        expect(
          item.name,
          `${item.id}: chua duyet loi ma da gan ten - khong duoc dat ten bia len mat nguoi that`,
        ).toBeUndefined();
      }
    }
  });

  /**
   * RANG BUOC DAO DUC. Cac ban trong anh da chon hien ten dang VIET TAT
   * (20/09/2026). Test nay chan hai kieu sai:
   *
   *  1. Dat ten day du ("Nguyen Van A") - vuot qua dieu ho dong y.
   *  2. Dat ten bia bat ky - ten placeholder kieu "Minh Anh", "Hoang Nam"
   *     gan len mat nguoi that la gan cho ho danh tinh khong co that.
   *
   * Dang duoc phep: mot danh xung ngan + chu cai viet tat, vi du 'Anh T.',
   * 'Chị H.', hoac chi 'T.'. Chu cai phai do chu website cung cap - TUYET
   * DOI khong doc tu bang ten tren ao trong anh.
   *
   * Cho phep toi 2 ky tu truoc dau cham ('Anh Kh.') de con duong tach khi
   * hai nguoi trung chu cai dau. Hien `sp-03` va `sp-05` CO Y dung chung
   * 'Anh T.' theo yeu cau cua chu website - xem ghi chu trong
   * `src/content/testimonials.ts`.
   */
  it('ten (neu co) phai la dang viet tat, khong phai ho ten day du', () => {
    const abbreviated = /^(?:Anh|Chị|Em|Bạn)?\s*[A-ZÀ-Ỹ][a-zà-ỹ]?\.$/u;
    for (const item of studentPhotoTestimonials) {
      if (!item.name) continue;
      expect(
        item.name,
        `${item.id}: "${item.name}" khong phai dang viet tat - cac ban chi dong y hien ten rut gon`,
      ).toMatch(abbreviated);
    }
  });

  it('moi muc co anh deu phai co alt text co nghia', () => {
    for (const item of studentPhotoTestimonials) {
      expect(item.photo, `${item.id}: thieu anh`).toBeDefined();
      expect(item.photo!.alt.length).toBeGreaterThan(10);
      expect(item.photo!.src).toMatch(/^\/images\/students\/.+\.webp$/);
    }
  });

  /**
   * Alt text KHONG duoc chua ten nguoi hay chuc danh suy doan. Anh cho thay
   * mot so nguoi mac trang phuc co phu hieu - mo ta them nghe nghiep/don vi
   * la tu bia thong tin ve mot nguoi nhan dien duoc.
   */
  it('alt text khong suy doan danh tinh hay nghe nghiep', () => {
    const forbidden =
      /anh |chị |công an|cảnh sát|sĩ quan|chiến sĩ|bộ đội|giám đốc|kỹ sư/i;
    for (const item of studentPhotoTestimonials) {
      expect(
        item.photo!.alt,
        `${item.id}: alt text suy doan danh tinh`,
      ).not.toMatch(forbidden);
    }
  });

  it('muc co anh that KHONG duoc deo nhan tinh huong minh hoa', () => {
    for (const item of studentPhotoTestimonials) {
      expect(item.isPlaceholder, `${item.id}: nguoi that, khong phai minh hoa`).toBe(
        false,
      );
    }
  });

  it('period phai khop trang thai duyet cua tung muc', () => {
    for (const item of studentPhotoTestimonials) {
      if (item.quotePendingApproval) {
        expect(item.period).toBe(PENDING_APPROVAL_LABEL);
      } else {
        // Da duyet -> khong duoc con mang nhan cho duyet.
        expect(
          item.period,
          `${item.id}: da duyet nhung period van la nhan cho duyet`,
        ).not.toBe(PENDING_APPROVAL_LABEL);
      }
    }
  });

  it('hasPendingApprovalQuotes phan anh dung du lieu', () => {
    expect(hasPendingApprovalQuotes()).toBe(
      studentPhotoTestimonials.some((item) => item.quotePendingApproval),
    );
  });

  /**
   * Doan canh bao (chi hien khi con muc cho duyet) phai noi ro CA HAI phan:
   * anh da duoc phep, rieng loi thi chua. Gop chung thanh mot cau mo ho se
   * khien nguoi doc khong biet phan nao la that.
   */
  it('doan canh bao neu ro anh da duoc phep con loi thi chua', () => {
    expect(studentPhotoDisclosure).toMatch(/đồng ý|được phép/i);
    expect(studentPhotoDisclosure).toMatch(/chờ|xác nhận/i);
    expect(studentPhotoDisclosure).toMatch(/học viên trong ảnh/i);
  });

  it('khong bia con so hoc phi hay ty le dau trong loi', () => {
    const haystack = studentPhotoTestimonials
      .map((item) => item.quote)
      .join(' ');
    expect(haystack).not.toMatch(/\d+\s*%/);
    expect(haystack).not.toMatch(/đậu ngay lần đầu/i);
  });
});

describe('TestimonialCard - nhan cho duyet', () => {
  const pendingItem: Testimonial = {
    id: 'test-pending',
    situation: 'Chưa từng cầm vô-lăng',
    period: PENDING_APPROVAL_LABEL,
    quote: 'Nội dung chờ duyệt dùng cho kiểm thử.',
    isPlaceholder: false,
    quotePendingApproval: true,
    photo: {
      src: '/images/students/hoc-vien-01.webp',
      alt: 'Học viên ngồi ghế lái trong buổi thực hành tại trung tâm',
      width: 640,
      height: 640,
    },
  };

  it('HIEN nhan cho duyet khi quotePendingApproval: true', () => {
    render(<TestimonialCard testimonial={pendingItem} />);
    expect(screen.getByText(PENDING_APPROVAL_LABEL)).toBeInTheDocument();
  });

  it('AN nhan khi loi da duoc duyet', () => {
    const approved = { ...pendingItem, quotePendingApproval: false };
    render(<TestimonialCard testimonial={approved} />);
    expect(screen.queryByText(PENDING_APPROVAL_LABEL)).not.toBeInTheDocument();
  });

  it('hien anh voi alt text, khong hien ten bia khi chua co ten', () => {
    render(<TestimonialCard testimonial={pendingItem} />);
    const img = screen.getByAltText(pendingItem.photo!.alt);
    expect(img).toBeInTheDocument();
    expect(
      screen.getByText('Học viên học lái xe tại Thầy Tùng'),
    ).toBeInTheDocument();
  });
});
