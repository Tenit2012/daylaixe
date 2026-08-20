import { lessonVideos } from '@/content/videos';
import { Section, SectionHeading } from '@/components/ui/section';
import { VideoPlayer } from '@/components/ui/video-player';
import { Reveal } from '@/components/ui/reveal';
import { staggerDelay } from '@/lib/utils/stagger';

interface LessonVideoSectionProps {
  location?: string;
  tone?: 'default' | 'muted';
}

/**
 * Video quay tai buoi hoc that.
 *
 * Khong render gi neu chua co video nao - nho vay khi go het video khoi
 * `src/content/videos.ts` thi trang khong con lai mot muc trong rong.
 */
export function LessonVideoSection({
  location = 'lesson_video',
  tone = 'muted',
}: LessonVideoSectionProps) {
  if (lessonVideos.length === 0) return null;

  return (
    <Section
      id="video-buoi-hoc"
      tone={tone}
      ariaLabelledBy="video-buoi-hoc-heading"
    >
      <SectionHeading
        id="video-buoi-hoc-heading"
        eyebrow="Video"
        title="Xem một buổi học thực tế"
        description="Quay trực tiếp trong giờ học để bạn hình dung được cách thầy hướng dẫn trước khi quyết định đăng ký."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {lessonVideos.map((video, index) => (
          <Reveal key={video.id} delay={staggerDelay(index)} className="h-full">
            <VideoPlayer video={video} location={location} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
