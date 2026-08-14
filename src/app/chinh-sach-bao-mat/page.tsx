import type { Metadata } from 'next';
import { isPlaceholderValue, siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { JsonLd } from '@/components/ui/json-ld';

export const metadata: Metadata = buildPageMetadata({
  title: 'Chính sách bảo mật thông tin',
  description:
    'Website không thu thập và không lưu trữ thông tin cá nhân của người truy cập. Trang này giải thích rõ điều đó và những gì xảy ra khi bạn chủ động liên hệ.',
  path: '/chinh-sach-bao-mat',
});

/** Ngay cap nhat chinh sach - sua khi noi dung thay doi. */
const LAST_UPDATED = '11/08/2026';

export default function PrivacyPolicyPage() {
  const crumbs = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Chính sách bảo mật', path: '/chinh-sach-bao-mat' },
  ];

  const contactLine = isPlaceholderValue(siteConfig.contact.email)
    ? 'Thông tin liên hệ của người quản lý website sẽ được cập nhật.'
    : `Email: ${siteConfig.contact.email}`;
  const phoneLine = isPlaceholderValue(siteConfig.contact.phone)
    ? ''
    : ` · Điện thoại: ${siteConfig.contact.phone}`;

  return (
    <>
      <div className="border-b border-line bg-surface-muted">
        <div className="container-page py-4">
          <Breadcrumb items={crumbs} />
        </div>
      </div>

      <article className="container-page py-10 lg:py-14">
        <div className="mx-auto max-w-prose">
          <h1 className="text-3xl sm:text-4xl">Chính sách bảo mật thông tin</h1>
          <p className="mt-3 text-sm text-ink-subtle">
            Cập nhật lần cuối: {LAST_UPDATED}
          </p>

          <div className="prose-article mt-7">
            <p>
              Website này là trang cá nhân của {siteConfig.brandName}, dùng để
              giới thiệu khóa học lái xe. Đây là một website tĩnh: toàn bộ nội
              dung đã được tạo sẵn từ trước, website{' '}
              <strong>không có biểu mẫu, không có cơ sở dữ liệu</strong> và
              không nhận bất kỳ thông tin nào bạn gửi lên.
            </p>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              1. Website không thu thập thông tin cá nhân
            </h2>
            <p>
              Khi bạn xem website này, chúng tôi không yêu cầu, không nhận và
              không lưu bất kỳ thông tin nào của bạn, bao gồm:
            </p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Họ tên, số điện thoại, email.</li>
              <li>Số căn cước công dân hoặc số giấy tờ tùy thân.</li>
              <li>Ảnh chụp giấy tờ, hồ sơ hoặc thông tin sức khỏe.</li>
              <li>Địa chỉ nhà.</li>
              <li>Thông tin thanh toán, số tài khoản ngân hàng.</li>
            </ul>
            <p>
              Bạn có thể xem toàn bộ website mà không cần để lại bất cứ thông
              tin gì.
            </p>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              2. Khi bạn chủ động liên hệ
            </h2>
            <p>
              Các nút trên website chỉ mở ứng dụng gọi điện, Zalo hoặc Facebook
              trên máy của bạn. Cuộc gọi và tin nhắn diễn ra trực tiếp giữa bạn
              và thầy, không đi qua website.
            </p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                Nội dung trao đổi được lưu trên chính ứng dụng bạn dùng (Zalo,
                Messenger, lịch sử cuộc gọi) và tuân theo chính sách bảo mật của
                nhà cung cấp ứng dụng đó.
              </li>
              <li>
                Thầy chỉ dùng thông tin bạn nhắn để tư vấn khóa học và sắp xếp
                lịch học, không chuyển cho bên thứ ba vì mục đích tiếp thị.
              </li>
              <li>
                Nếu quá trình làm hồ sơ cần giấy tờ, việc nộp diễn ra trực tiếp
                tại cơ sở đào tạo theo quy trình của cơ sở đó.
              </li>
            </ul>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              3. Quyền của bạn
            </h2>
            <p>
              Vì website không lưu dữ liệu, bạn không cần yêu cầu website xóa gì
              cả. Với nội dung đã trao đổi qua Zalo, Facebook hoặc điện thoại,
              bạn có quyền:
            </p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Yêu cầu thầy xóa thông tin bạn đã nhắn.</li>
              <li>Yêu cầu ngừng liên hệ bất cứ lúc nào.</li>
            </ul>
            <p>
              Bạn chỉ cần nhắn tin hoặc gọi điện, không cần làm thủ tục gì phức
              tạp.
            </p>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              4. Cookie và công cụ đo lường
            </h2>
            <p>
              Website không đặt cookie đăng nhập vì không có khu vực nào cần
              đăng nhập. Website có thể sử dụng công cụ đo lường truy cập (như
              Google Analytics) để biết trang nào được quan tâm nhiều — số liệu
              ở dạng tổng hợp, không định danh cá nhân. Công cụ này chỉ chạy khi
              được cấu hình; nếu chưa cấu hình, website hoạt động bình thường và
              không gửi dữ liệu đi đâu.
            </p>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              5. Liên hệ người quản lý website
            </h2>
            <p>
              Mọi thắc mắc hoặc yêu cầu liên quan đến dữ liệu cá nhân, bạn liên
              hệ:
            </p>
            <p>
              {siteConfig.brandName} — {contactLine}
              {phoneLine}
            </p>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              6. Thay đổi chính sách
            </h2>
            <p>
              Khi chính sách được cập nhật, ngày cập nhật ở đầu trang sẽ thay
              đổi. Bạn nên xem lại trang này định kỳ để nắm thông tin mới nhất.
            </p>
          </div>

          <div className="mt-10 rounded-card border border-accent-200 bg-accent-50 p-5">
            <h2 className="text-base">Lưu ý</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {siteConfig.disclaimer}
            </p>
          </div>
        </div>
      </article>

      <JsonLd data={buildBreadcrumbJsonLd(crumbs)} />
    </>
  );
}
