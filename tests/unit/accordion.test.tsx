import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from '@/components/ui/accordion';
import { TestimonialCard } from '@/components/testimonials/testimonial-card';

const items = [
  { question: 'Người chưa từng lái xe có học được không?', answer: 'Được.' },
  { question: 'Có thể học cuối tuần không?', answer: 'Có.' },
];

describe('Accordion', () => {
  it('render tat ca cau hoi duoi dang nut bam', () => {
    render(<Accordion items={items} />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('mo san muc dau tien theo mac dinh', () => {
    render(<Accordion items={items} />);
    const [first, second] = screen.getAllByRole('button');
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(second).toHaveAttribute('aria-expanded', 'false');
  });

  it('dong het khi defaultOpenIndex la -1', () => {
    render(<Accordion items={items} defaultOpenIndex={-1} />);
    for (const button of screen.getAllByRole('button')) {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('mo va dong khi bam', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} defaultOpenIndex={-1} />);

    const first = screen.getAllByRole('button')[0];
    expect(first).toBeDefined();
    if (!first) return;

    await user.click(first);
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Được.')).toBeVisible();

    await user.click(first);
    expect(first).toHaveAttribute('aria-expanded', 'false');
  });

  it('lien ket nut voi vung noi dung bang aria-controls', () => {
    render(<Accordion items={items} />);
    const first = screen.getAllByRole('button')[0];
    const panelId = first?.getAttribute('aria-controls');

    expect(panelId).toBeTruthy();
    if (panelId) {
      expect(document.getElementById(panelId)).not.toBeNull();
    }
  });

  it('dieu huong duoc bang ban phim', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} defaultOpenIndex={-1} />);

    await user.tab();
    const first = screen.getAllByRole('button')[0];
    expect(first).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(first).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('TestimonialCard', () => {
  const placeholderTestimonial = {
    id: 'tm-test',
    name: 'Học viên khóa số tự động',
    courseSlug: 'hang-b-so-tu-dong',
    period: 'Nội dung mẫu',
    quote: 'Thầy hướng dẫn dễ hiểu.',
    isPlaceholder: true,
    avatarInitial: 'A',
  };

  it('hien thi noi dung cam nhan', () => {
    render(<TestimonialCard testimonial={placeholderTestimonial} />);
    expect(screen.getByText(/Thầy hướng dẫn dễ hiểu/)).toBeInTheDocument();
    expect(screen.getByText('Học viên khóa số tự động')).toBeInTheDocument();
  });

  it('gan nhan "Nội dung mẫu" cho du lieu placeholder', () => {
    render(<TestimonialCard testimonial={placeholderTestimonial} />);
    // Moi truong test khong phai production nen nhan luon hien thi.
    expect(screen.getByText('Nội dung mẫu')).toBeInTheDocument();
  });

  it('khong gan nhan cho cam nhan that', () => {
    render(
      <TestimonialCard
        testimonial={{ ...placeholderTestimonial, isPlaceholder: false }}
      />,
    );
    expect(screen.queryByText('Nội dung mẫu')).not.toBeInTheDocument();
  });
});
