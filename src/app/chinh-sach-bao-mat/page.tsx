import type { Metadata } from 'next';
import { isPlaceholderValue, siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { JsonLd } from '@/components/ui/json-ld';

export const metadata: Metadata = buildPageMetadata({
  title: 'Chính sách bảo mật thông tin',
  description:
    'Cách website thu thập, sử dụng, lưu trữ và bảo vệ thông tin của học viên tiềm năng, cùng quyền yêu cầu sửa hoặc xóa dữ liệu.',
  path: '/chinh-sach-bao-mat',
});

/** Ngay cap nhat chinh sach - sua khi noi dung thay doi. */
const LAST_UPDATED = '05/08/2026';

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
              giới thiệu khóa học và tiếp nhận thông tin của người có nhu cầu
              được tư vấn học lái xe. Chính sách dưới đây mô tả rõ dữ liệu nào
              được thu thập và dữ liệu đó được dùng như thế nào.
            </p>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              1. Dữ liệu được thu thập
            </h2>
            <p>
              Khi bạn điền biểu mẫu đăng ký tư vấn, chúng tôi lưu các thông tin
              sau:
            </p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Họ và tên bạn cung cấp.</li>
              <li>Số điện thoại liên hệ.</li>
              <li>Khóa học bạn quan tâm.</li>
              <li>Khu vực sinh sống ở mức quận hoặc phường (không bắt buộc).</li>
              <li>Khung giờ bạn muốn được liên hệ (không bắt buộc).</li>
              <li>Ghi chú bạn tự nhập (không bắt buộc).</li>
              <li>
                Trang bạn đã gửi biểu mẫu và tham số chiến dịch (UTM) nếu bạn
                đến từ một liên kết quảng bá.
              </li>
            </ul>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              2. Dữ liệu KHÔNG được thu thập
            </h2>
            <p>Biểu mẫu trên website cố ý không yêu cầu và không lưu:</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Số căn cước công dân hoặc số giấy tờ tùy thân.</li>
              <li>Ảnh chụp giấy tờ.</li>
              <li>Địa chỉ nhà chính xác.</li>
              <li>Hồ sơ hoặc thông tin sức khỏe.</li>
              <li>Thông tin thanh toán, số tài khoản ngân hàng.</li>
            </ul>
            <p>
              Nếu quá trình làm hồ sơ cần các giấy tờ trên, việc nộp sẽ diễn ra
              trực tiếp tại cơ sở đào tạo theo quy trình của cơ sở đó, không qua
              website này.
            </p>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              3. Mục đích sử dụng
            </h2>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Liên hệ tư vấn khóa học phù hợp với nhu cầu của bạn.</li>
              <li>Hướng dẫn bạn chuẩn bị hồ sơ và sắp xếp lịch học.</li>
              <li>Ghi nhận tiến trình trao đổi để không hỏi lại bạn nhiều lần.</li>
              <li>
                Thống kê tổng hợp về hiệu quả của các kênh giới thiệu (dạng số
                liệu tổng, không gắn với cá nhân).
              </li>
            </ul>
            <p>
              Chúng tôi <strong>không bán, không trao đổi và không cho thuê</strong>{' '}
              thông tin của bạn cho bất kỳ bên thứ ba nào vì mục đích tiếp thị.
            </p>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              4. Thời gian lưu trữ
            </h2>
            <p>
              Thông tin của bạn được lưu trong thời gian cần thiết để phục vụ
              việc tư vấn và hỗ trợ trong quá trình học, tối đa 24 tháng kể từ
              lần liên hệ gần nhất. Sau thời gian này, dữ liệu sẽ được xóa hoặc
              chuyển thành dạng thống kê không định danh.
            </p>
            <p>
              Nếu bạn cho biết không còn nhu cầu, thông tin của bạn sẽ được đánh
              dấu ngừng liên hệ và xóa trong lần rà soát dữ liệu gần nhất.
            </p>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              5. Quyền của bạn
            </h2>
            <p>Bạn có quyền:</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Yêu cầu biết những thông tin nào của bạn đang được lưu.</li>
              <li>Yêu cầu sửa thông tin nếu có sai sót.</li>
              <li>Yêu cầu xóa toàn bộ thông tin của bạn.</li>
              <li>Yêu cầu ngừng liên hệ bất cứ lúc nào.</li>
            </ul>
            <p>
              Yêu cầu sẽ được xử lý trong vòng 7 ngày làm việc kể từ khi nhận
              được. Bạn chỉ cần nhắn tin hoặc gọi điện, không cần làm thủ tục gì
              phức tạp.
            </p>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              6. Cách bảo vệ dữ liệu
            </h2>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                Dữ liệu được lưu trong cơ sở dữ liệu chỉ truy cập được sau khi
                đăng nhập, không hiển thị công khai trên website.
              </li>
              <li>
                Trang quản trị được bảo vệ bằng tài khoản riêng, mật khẩu được mã
                hóa một chiều và không lưu ở dạng đọc được.
              </li>
              <li>
                Phiên đăng nhập dùng cookie chỉ đọc được bởi máy chủ, có thời hạn
                và tự hết hiệu lực.
              </li>
              <li>
                Biểu mẫu có cơ chế hạn chế gửi hàng loạt để giảm rủi ro bị lạm
                dụng.
              </li>
              <li>
                Trang quản trị được đánh dấu không cho công cụ tìm kiếm lập chỉ
                mục.
              </li>
            </ul>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              7. Cookie và công cụ đo lường
            </h2>
            <p>
              Website sử dụng cookie kỹ thuật cần thiết cho việc đăng nhập trang
              quản trị. Với người dùng thông thường, website có thể sử dụng công
              cụ đo lường truy cập (như Google Analytics) để biết trang nào được
              quan tâm nhiều. Các công cụ này chỉ được kích hoạt khi quản trị
              viên cấu hình; nếu chưa cấu hình, website hoạt động hoàn toàn bình
              thường và không gửi dữ liệu đi đâu.
            </p>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              8. Liên hệ người quản lý website
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
              9. Thay đổi chính sách
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
