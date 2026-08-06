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
        description="Hình ảnh hiện tại là bản minh họa. Ảnh chụp thật tại sân tập sẽ được cập nhật."
      />
      <div className="mt-10">
        <GalleryGrid items={galleryItems} />
      </div>
    </Section>
  );
}
