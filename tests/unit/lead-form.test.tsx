import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { LeadSubmitResult } from '@/features/leads/application/lead-service';

/**
 * Test giao dien form dang ky.
 * Server Action duoc mock de test chay duoc trong jsdom, khong dung database.
 */

const submitLeadActionMock =
  vi.fn<(prev: unknown, formData: FormData) => Promise<LeadSubmitResult>>();

vi.mock('@/features/leads/presentation/lead-actions', () => ({
  submitLeadAction: (prev: unknown, formData: FormData) =>
    submitLeadActionMock(prev, formData),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/khoa-hoc/hang-b-so-tu-dong',
}));

const { LeadForm } = await import('@/components/forms/lead-form');

/**
 * Dung neo `^` cho nhan so dien thoai: doan van ban dong y cung chua
 * cum "số điện thoại" nen tim khong neo se khop nhieu phan tu.
 */
const NAME_LABEL = /^Họ và tên/i;
const PHONE_LABEL = /^Số điện thoại/i;
const COURSE_LABEL = /^Khóa học quan tâm/i;
const SUBMIT_BUTTON = /Gửi thông tin/i;

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(NAME_LABEL), 'Nguyễn Văn An');
  await user.type(screen.getByLabelText(PHONE_LABEL), '0912345678');
  await user.selectOptions(
    screen.getByLabelText(COURSE_LABEL),
    'hang-b-so-tu-dong',
  );
  await user.click(screen.getByRole('checkbox'));
}

describe('LeadForm', () => {
  beforeEach(() => {
    submitLeadActionMock.mockReset();
    submitLeadActionMock.mockResolvedValue({
      ok: true,
      leadId: 'lead_1',
      message: 'Đã nhận thông tin của bạn.',
    });
  });

  it('hien thi day du cac truong bat buoc', () => {
    render(<LeadForm />);

    expect(screen.getByLabelText(NAME_LABEL)).toBeInTheDocument();
    expect(screen.getByLabelText(PHONE_LABEL)).toBeInTheDocument();
    expect(screen.getByLabelText(COURSE_LABEL)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/^Khu vực bạn đang sinh sống/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/^Khung giờ muốn được liên hệ/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/^Ghi chú thêm/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('co truong honeypot an voi nguoi dung', () => {
    const { container } = render(<LeadForm />);
    const honeypot = container.querySelector('input[name="website"]');

    expect(honeypot).not.toBeNull();
    expect(honeypot?.closest('[aria-hidden="true"]')).not.toBeNull();
  });

  it('chon san khoa hoc khi truyen defaultCourse', () => {
    render(<LeadForm defaultCourse="bo-tuc-tay-lai" />);
    const select = screen.getByLabelText(COURSE_LABEL) as HTMLSelectElement;
    expect(select.value).toBe('bo-tuc-tay-lai');
  });

  it('bao loi phia client khi gui form rong', async () => {
    const user = userEvent.setup();
    render(<LeadForm />);

    await user.click(screen.getByRole('button', { name: SUBMIT_BUTTON }));

    expect(await screen.findAllByRole('alert')).not.toHaveLength(0);
    expect(submitLeadActionMock).not.toHaveBeenCalled();
  });

  it('bao loi khi so dien thoai khong hop le', async () => {
    const user = userEvent.setup();
    render(<LeadForm />);

    await user.type(screen.getByLabelText(NAME_LABEL), 'Nguyễn Văn An');
    await user.type(screen.getByLabelText(PHONE_LABEL), '0123456789');
    await user.selectOptions(
      screen.getByLabelText(COURSE_LABEL),
      'hang-b-so-tu-dong',
    );
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: SUBMIT_BUTTON }));

    expect(
      await screen.findByText(/Số điện thoại không hợp lệ/i),
    ).toBeInTheDocument();
    expect(submitLeadActionMock).not.toHaveBeenCalled();
  });

  it('bao loi khi chua tich o dong y', async () => {
    const user = userEvent.setup();
    render(<LeadForm />);

    await user.type(screen.getByLabelText(NAME_LABEL), 'Nguyễn Văn An');
    await user.type(screen.getByLabelText(PHONE_LABEL), '0912345678');
    await user.selectOptions(
      screen.getByLabelText(COURSE_LABEL),
      'hang-b-so-tu-dong',
    );
    await user.click(screen.getByRole('button', { name: SUBMIT_BUTTON }));

    expect(await screen.findByText(/Vui lòng đồng ý/i)).toBeInTheDocument();
    expect(submitLeadActionMock).not.toHaveBeenCalled();
  });

  it('gui du lieu len server khi hop le va hien thong bao thanh cong', async () => {
    const user = userEvent.setup();
    render(<LeadForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: SUBMIT_BUTTON }));

    await waitFor(() => {
      expect(submitLeadActionMock).toHaveBeenCalledOnce();
    });

    const formData = submitLeadActionMock.mock.calls[0]?.[1];
    expect(formData?.get('fullName')).toBe('Nguyễn Văn An');
    expect(formData?.get('phone')).toBe('0912345678');
    expect(formData?.get('consent')).toBe('true');
    expect(formData?.get('sourcePage')).toBe('/khoa-hoc/hang-b-so-tu-dong');

    expect(
      await screen.findByText(/Đã nhận thông tin của bạn/i),
    ).toBeInTheDocument();
  });

  it('giu lai du lieu da nhap khi server bao loi', async () => {
    submitLeadActionMock.mockResolvedValue({
      ok: false,
      code: 'UNKNOWN_ERROR',
      message: 'Hệ thống đang gặp sự cố.',
    });

    const user = userEvent.setup();
    render(<LeadForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: SUBMIT_BUTTON }));

    expect(
      await screen.findByText(/Hệ thống đang gặp sự cố/i),
    ).toBeInTheDocument();
    // Du lieu khong bi mat sau khi server bao loi.
    expect(
      (screen.getByLabelText(NAME_LABEL) as HTMLInputElement).value,
    ).toBe('Nguyễn Văn An');
  });

  it('hien thong bao thanh cong gia khi honeypot bi kich hoat', async () => {
    submitLeadActionMock.mockResolvedValue({
      ok: false,
      code: 'SPAM_DETECTED',
      message: 'Đã nhận thông tin của bạn.',
    });

    const user = userEvent.setup();
    render(<LeadForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: SUBMIT_BUTTON }));

    expect(
      await screen.findByText(/Đã nhận thông tin của bạn/i),
    ).toBeInTheDocument();
  });
});
