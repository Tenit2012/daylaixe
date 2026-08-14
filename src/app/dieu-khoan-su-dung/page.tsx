import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { JsonLd } from '@/components/ui/json-ld';

export const metadata: Metadata = buildPageMetadata({
  title: 'Điều khoản sử dụng website',
  description:
    'Điều khoản sử dụng website giới thiệu và tư vấn học viên, phạm vi thông tin và giới hạn trách nhiệm.',
  path: '/dieu-khoan-su-dung',
});

const LAST_UPDATED = '05/08/2026';

export default function TermsPage() {
  const crumbs = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Điều khoản sử dụng', path: '/dieu-khoan-su-dung' },
  ];

  return (
    <>
      <div className="border-b border-line bg-surface-muted">
        <div className="container-page py-4">
          <Breadcrumb items={crumbs} />
        </div>
      </div>

      <article className="container-page py-10 lg:py-14">
        <div className="mx-auto max-w-prose">
          <h1 className="text-3xl sm:text-4xl">Điều khoản sử dụng</h1>
          <p className="mt-3 text-sm text-ink-subtle">
            Cập nhật lần cuối: {LAST_UPDATED}
          </p>

          <div className="prose-article mt-7">
            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              1. Về website này
            </h2>
            <p>
              Đây là website cá nhân của {siteConfig.brandName}, phục vụ mục
              đích giới thiệu các khóa học lái xe và tiếp nhận nhu cầu tư vấn
              của người học.
            </p>
            <p>
              Website <strong>không phải</strong> cổng thông tin chính thức của
              Trường Đại học An ninh Nhân dân hoặc của bất kỳ trung tâm đào tạo
              lái xe nào. Mọi nội dung trên website thể hiện quan điểm và kinh
              nghiệm cá nhân của người biên soạn.
            </p>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              2. Tính chính xác của thông tin
            </h2>
            <p>
              Thông tin về chương trình học, hồ sơ, học phí, lịch khai giảng và
              quy định đào tạo có thể thay đổi theo thời điểm và theo quy định
              hiện hành. Nội dung trên website mang tính tham khảo và cần được
              xác nhận lại tại cơ sở đào tạo ở thời điểm bạn đăng ký.
            </p>
            <p>
              Chúng tôi không khẳng định các nội dung liên quan đến quy định
              pháp luật khi chưa kiểm chứng, và luôn khuyến nghị bạn đối chiếu
              với nguồn chính thức.
            </p>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              3. Không cam kết kết quả thi
            </h2>
            <p>
              Kỳ sát hạch được tổ chức theo quy định và kết quả phụ thuộc vào
              năng lực thực tế của từng học viên. Website không đưa ra bất kỳ
              cam kết nào về việc bảo đảm đỗ, và bạn nên thận trọng với mọi lời
              hứa dạng đó từ bất kỳ nguồn nào.
            </p>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              4. Liên hệ qua điện thoại, Zalo và Facebook
            </h2>
            <p>
              Website không có biểu mẫu và không nhận thông tin nào từ bạn. Các
              nút trên trang chỉ mở ứng dụng gọi điện hoặc nhắn tin trên máy của
              bạn. Khi liên hệ, mong bạn:
            </p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                Chỉ cung cấp thông tin của chính mình hoặc của người đã đồng ý
                cho bạn cung cấp thay.
              </li>
              <li>
                Không gửi nội dung quảng cáo, spam hoặc nội dung vi phạm pháp
                luật.
              </li>
            </ul>
            <p>
              Thông tin bạn nhắn được xử lý theo{' '}
              <Link
                href="/chinh-sach-bao-mat"
                className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-900"
              >
                chính sách bảo mật
              </Link>
              .
            </p>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              5. Bản quyền nội dung
            </h2>
            <p>
              Các bài viết trong mục Kiến thức là nội dung nguyên bản do chúng
              tôi biên soạn. Bạn có thể trích dẫn với điều kiện ghi rõ nguồn và
              dẫn liên kết về trang gốc. Vui lòng không sao chép toàn bộ bài
              viết để đăng lại ở nơi khác.
            </p>
            <p>
              Website dùng cả ảnh chụp thật tại nơi thầy giảng dạy lẫn hình minh
              họa. Ảnh có mặt học viên chỉ được đăng sau khi học viên đồng ý;
              nếu bạn xuất hiện trong một tấm ảnh và muốn gỡ, chỉ cần nhắn cho
              thầy là ảnh sẽ được gỡ xuống.
            </p>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              6. Liên kết đến bên thứ ba
            </h2>
            <p>
              Website có thể chứa liên kết đến Zalo, Facebook, YouTube hoặc
              Google Maps. Chúng tôi không kiểm soát nội dung và chính sách của
              các nền tảng này, bạn nên xem điều khoản riêng của từng nền tảng
              khi sử dụng.
            </p>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              7. Giới hạn trách nhiệm
            </h2>
            <p>
              Chúng tôi cố gắng giữ thông tin trên website chính xác và cập
              nhật, nhưng không chịu trách nhiệm cho thiệt hại phát sinh từ việc
              bạn sử dụng thông tin mà chưa xác nhận lại tại cơ sở đào tạo.
            </p>

            <h2 className="!mt-9 text-xl text-brand-900 sm:text-2xl">
              8. Thay đổi điều khoản
            </h2>
            <p>
              Điều khoản có thể được cập nhật. Ngày cập nhật ở đầu trang phản
              ánh phiên bản mới nhất. Việc bạn tiếp tục sử dụng website sau khi
              điều khoản thay đổi được hiểu là bạn chấp nhận nội dung mới.
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
