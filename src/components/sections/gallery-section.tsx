import { galleryItems } from '@/content/gallery';
import { Section, SectionHeading } from '@/components/ui/section';
import { GalleryGrid } from '@/components/gallery/gallery-grid';

export function GallerySection() {
  return (
    <Section id="hinh-anh" ariaLabelledBy="hinh-anh-heading">
      <SectionHeading
        id="hinh-anh-heading"
        eyebrow="Hình ảnh"
        title="Hình ảnh lớp học và sân tập"
        description="Ảnh chụp thật tại nơi thầy giảng dạy. Một số hình còn là bản minh họa và sẽ được thay bằng ảnh thật khi có."
      />
      <div className="mt-10">
        <GalleryGrid items={galleryItems} />
      </div>
    </Section>
  );
}
