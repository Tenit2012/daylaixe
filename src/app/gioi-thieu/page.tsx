import type { Metadata } from 'next';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { isPlaceholderValue, siteConfig } from '@/config/site';
import { galleryItems } from '@/content/gallery';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { Section, SectionHeading } from '@/components/ui/section';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card } from '@/components/ui/card';
import { GalleryGrid } from '@/components/gallery/gallery-grid';
import { LearningProcessSection } from '@/components/sections/learning-process-section';
import { LeadFormSection } from '@/components/sections/lead-form-section';
import { JsonLd } from '@/components/ui/json-ld';

const teacherLabel = isPlaceholderValue(siteConfig.teacher.name)
  ? 'thầy dạy lái xe'
  : `thầy ${siteConfig.teacher.name}`;

export const metadata: Metadata = buildPageMetadata({
  title: 'Giới thiệu về thầy dạy lái xe',
  description: `${siteConfig.experience.withAudience}. Câu chuyện nghề, giá trị giảng dạy và cách đồng hành cùng học viên từ buổi học đầu tiên đến ngày thi sát hạch.`,
  path: '/gioi-thieu',
});

const values = [
  {
    title: 'Nói thật về khả năng của học viên',
    description:
      'Chưa được thì tôi nói rõ chưa được ở đâu và cần luyện thêm gì. Khen cho qua chuyện chỉ khiến học viên bất ngờ vào ngày thi.',
  },
  {
    title: 'Minh bạch về chi phí và thủ tục',
    description:
      'Mọi khoản chi phí và giấy tờ đều được nói rõ từ đầu. Tôi không muốn học viên gặp khoản phát sinh ngoài dự tính giữa khóa.',
  },
  {
    title: 'Tôn trọng nhịp học của từng người',
    description:
      'Có người quen tay sau hai buổi, có người cần nhiều hơn. Tôi điều chỉnh bài tập theo học viên chứ không ép theo một khuôn chung.',
  },
  {
    title: 'An toàn quan trọng hơn thành tích',
    description:
      'Mục tiêu cuối cùng không phải tấm bằng mà là bạn ra đường vẫn bình tĩnh và xử lý được tình huống thực tế.',
  },
];

export default function AboutPage() {
  const crumbs = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Giới thiệu', path: '/gioi-thieu' },
  ];

  return (
    <>
      <div className="border-b border-line bg-surface-muted">
        <div className="container-page py-4">
          <Breadcrumb items={crumbs} />
        </div>
      </div>

      <Section ariaLabelledBy="about-heading">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14">
          <div className="overflow-hidden rounded-card border border-line bg-surface-muted shadow-card">
            <Image
              src="/images/about/chan-dung-thay.svg"
              alt="Vị trí đặt ảnh chân dung của thầy dạy lái xe"
              width={600}
              height={750}
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="h-auto w-full"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-600">
              Giới thiệu
            </p>
            <h1 id="about-heading" className="mt-3 text-3xl sm:text-4xl">
              Câu chuyện nghề của {teacherLabel}
            </h1>
            <p className="mt-2 text-[0.9375rem] font-medium text-brand-600">
              {siteConfig.teacher.title} · {siteConfig.teacher.centerName}
            </p>

            {/* Doan mo dau lay tu config - du lieu kinh nghiem da xac nhan */}
            <p className="mt-6 rounded-card border-l-4 border-brand-600 bg-brand-50 p-5 text-[1.0625rem] leading-relaxed text-brand-900">
              {siteConfig.experience.biography}
            </p>

            <div className="prose-article mt-6">
              <p>
                Tôi bắt đầu công việc hướng dẫn lái xe từ mong muốn rất đơn giản:
                giúp người mới bớt sợ khi lần đầu ngồi vào ghế lái. Trong những
                năm đi dạy, tôi nhận ra phần khó nhất với đa số học viên không
                phải thao tác tay chân, mà là cảm giác không kiểm soát được chiếc
                xe trong vài buổi đầu.
              </p>
              <p>
                Vì vậy cách tôi dạy tập trung vào việc giải thích nguyên nhân.
                Khi học viên hiểu tại sao xe chết máy, tại sao xe trôi dốc, tại
                sao bánh cán vạch, họ tự sửa được ở lần sau mà không cần tôi nhắc.
                Đó là điều tôi tin sẽ theo họ suốt quá trình cầm lái, chứ không
                chỉ đến ngày thi.
              </p>
              <p>
                Tôi cũng chọn cách trực tiếp trao đổi với từng học viên thay vì
                qua trung gian. Nhờ vậy tôi nắm được ai đang vướng ở đâu, ai cần
                đổi lịch, ai cần luyện thêm bài nào trước kỳ sát hạch.
              </p>
            </div>

            <blockquote className="mt-7 rounded-card border-l-4 border-accent-500 bg-accent-50 p-5">
              <Quote aria-hidden="true" className="h-6 w-6 text-accent-500" />
              <p className="mt-2 text-[0.9375rem] font-medium italic leading-relaxed text-brand-900">
                {siteConfig.messaging.philosophy}
              </p>
            </blockquote>
          </div>
        </div>
      </Section>

      <Section tone="muted" ariaLabelledBy="values-heading">
        <SectionHeading
          id="values-heading"
          eyebrow="Giá trị"
          title="Giá trị trong cách tôi giảng dạy"
          description="Bốn nguyên tắc tôi giữ trong mọi khóa học, dù học viên là người mới hay đã có bằng."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {values.map((value) => (
            <Card as="li" key={value.title}>
              <h2 className="text-lg">{value.title}</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                {value.description}
              </p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section ariaLabelledBy="teaching-style-heading">
        <div className="mx-auto max-w-prose">
          <h2 id="teaching-style-heading" className="text-2xl sm:text-3xl">
            Phong cách hướng dẫn
          </h2>
          <div className="prose-article mt-5">
            <p>
              Mỗi buổi học đều có mục tiêu cụ thể được thống nhất từ đầu buổi. Ví
              dụ buổi đầu chỉ tập trung vào cảm nhận chân ga, chân phanh và dừng
              xe êm; buổi thứ hai mới thêm phần đánh lái và canh làn.
            </p>
            <p>
              Tôi hạn chế nói liên tục trong lúc học viên đang lái, vì việc bị
              nhắc dồn dập làm người mới rối thêm. Thay vào đó, tôi để học viên
              chạy trọn một đoạn rồi dừng lại phân tích những điểm cần sửa.
            </p>
            <p>
              Với học viên hay lo lắng, chúng ta bắt đầu từ khung giờ vắng và
              đoạn đường quen. Tự tin cần được xây dần từ những lần làm được, chứ
              không đến từ việc bị ép vào tình huống quá sức.
            </p>
          </div>

          <h2 className="mt-10 text-2xl sm:text-3xl">Quan điểm về an toàn</h2>
          <div className="prose-article mt-5">
            <p>
              Tôi không dùng những lời hứa như bảo đảm kết quả thi. Kỳ sát hạch
              được tổ chức theo quy định và kết quả phụ thuộc vào năng lực thực
              tế của học viên. Điều tôi cam kết được là hướng dẫn kỹ, nói thật
              tình trạng và đồng hành cho tới khi bạn đủ vững.
            </p>
            <p>
              Trong quá trình học, tôi luôn nhấn mạnh những thói quen nhỏ nhưng
              quan trọng: kiểm tra gương trước khi chuyển làn, giữ khoảng cách
              đủ, bật tín hiệu sớm, và không bao giờ vội khi chưa quan sát đủ.
            </p>
          </div>
        </div>
      </Section>

      <LearningProcessSection tone="muted" />

      <Section ariaLabelledBy="album-heading">
        <SectionHeading
          id="album-heading"
          eyebrow="Hình ảnh"
          title="Album hoạt động"
          description="Hình ảnh minh họa các buổi học. Ảnh chụp thật sẽ được cập nhật khi có sự đồng ý của học viên."
        />
        <div className="mt-10">
          <GalleryGrid items={galleryItems} />
        </div>
      </Section>

      <LeadFormSection
        formLocation="about"
        tone="muted"
        title="Muốn trao đổi trực tiếp với thầy?"
        description="Để lại thông tin, thầy sẽ liên hệ để nghe rõ nhu cầu của bạn trước khi tư vấn khóa học."
      />

      <JsonLd data={buildBreadcrumbJsonLd(crumbs)} />
    </>
  );
}
