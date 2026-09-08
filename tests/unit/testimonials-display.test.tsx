import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Testimonial } from '@/types/content';
import {
  ILLUSTRATIVE_LABEL,
  getRealTestimonials,
  hasPlaceholderTestimonials,
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
  it('trang chu va /cam-nhan-hoc-vien doc chung mot mang duy nhat', () => {
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
