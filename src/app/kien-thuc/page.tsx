import type { Metadata } from 'next';
import { blogPosts, getBlogCategories } from '@/content/blog';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { Section, SectionHeading } from '@/components/ui/section';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { PostCard } from '@/components/blog/post-card';
import { Badge } from '@/components/ui/card';
import { CtaBanner } from '@/components/sections/cta-banner';
import { JsonLd } from '@/components/ui/json-ld';
import { CtaLocation } from '@/lib/analytics/events';

export const metadata: Metadata = buildPageMetadata({
  title: 'Kiến thức học lái xe',
  description:
    'Bài viết chia sẻ kinh nghiệm học lái xe: chọn khóa học, chuẩn bị hồ sơ, luyện sa hình và giữ bình tĩnh khi cầm lái.',
  path: '/kien-thuc',
});

export default function BlogIndexPage() {
  const crumbs = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Kiến thức', path: '/kien-thuc' },
  ];
  const categories = getBlogCategories();

  return (
    <>
      <div className="border-b border-line bg-surface-muted">
        <div className="container-page py-4">
          <Breadcrumb items={crumbs} />
        </div>
      </div>

      <Section ariaLabelledBy="blog-heading">
        <SectionHeading
          id="blog-heading"
          as="h1"
          eyebrow="Kiến thức"
          title="Kiến thức học lái xe"
          description="Những điều tôi thường phải giải thích đi giải thích lại cho học viên, viết lại thành bài để bạn đọc trước khi bắt đầu."
        />

        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <li key={category.label}>
              <Badge tone="info">
                {category.label} ({category.count})
              </Badge>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            // headingLevel=2 vi o trang danh sach nay card nam thang duoi <h1>.
            <PostCard
              key={post.slug}
              post={post}
              priority={index < 3}
              headingLevel={2}
            />
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Có câu hỏi chưa được bài viết nào trả lời?"
        description="Nhắn cho thầy, câu hỏi của bạn có thể trở thành bài viết tiếp theo trên trang này."
        location={CtaLocation.Article}
      />

      <JsonLd data={buildBreadcrumbJsonLd(crumbs)} />
    </>
  );
}
