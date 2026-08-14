import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from '@/components/ui/accordion';

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
