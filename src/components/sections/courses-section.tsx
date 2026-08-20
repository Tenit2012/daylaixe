import Link from 'next/link';
import { featuredCourses } from '@/content/courses';
import { Section, SectionHeading } from '@/components/ui/section';
import { CourseCard } from '@/components/courses/course-card';
import { buttonClasses } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { staggerDelay } from '@/lib/utils/stagger';

export function CoursesSection() {
  return (
    <Section id="khoa-hoc" ariaLabelledBy="khoa-hoc-heading">
      <SectionHeading
        id="khoa-hoc-heading"
        eyebrow="Khóa học"
        title="Khóa học nổi bật"
        description="Chọn khóa phù hợp với loại xe bạn sẽ lái và quỹ thời gian của bạn. Chưa chắc chắn thì cứ nhắn, thầy tư vấn giúp."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCourses.map((course, index) => (
          /*
            `h-full` bat buoc phai co tren lop boc: Reveal chen them mot the
            div giua o luoi va the khoa hoc. Thieu no thi div chi cao bang noi
            dung, the ben trong mat cho de `h-full` bam vao, va cac the trong
            cung mot hang se cao thap khac nhau.
          */
          <Reveal
            key={course.slug}
            delay={staggerDelay(index)}
            className="h-full"
          >
            <CourseCard course={course} priority={index === 0} />
          </Reveal>
        ))}
      </div>

      <div className="mt-9 text-center">
        <Link href="/khoa-hoc" className={buttonClasses('secondary', 'md')}>
          Xem tất cả khóa học
        </Link>
      </div>
    </Section>
  );
}
