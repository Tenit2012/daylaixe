import { galleryItems } from '@/content/gallery';
import { Section, SectionHeading } from '@/components/ui/section';
import { GalleryGrid } from '@/components/gallery/gallery-grid';

export function GallerySection() {
  return (
    <Section id="hinh-anh" ariaLabelledBy="hinh-anh-heading">
      <SectionHeading
        id="hinh-anh-heading"
        eyebrow="Hình ảnh"
        title="Hình ảnh xe tập lái và sân tập"
        description="Ảnh chụp thật tại nơi thầy giảng dạy: xe tập lái, sân tập, cổng trung tâm và các buổi thực hành."
      />
      <div className="mt-10">
        <GalleryGrid items={galleryItems} />
      </div>
    </Section>
  );
}
