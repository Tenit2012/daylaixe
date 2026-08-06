import { describe, expect, it } from 'vitest';
import {
  courseOptions,
  courses,
  featuredCourses,
  getAllCourseSlugs,
  getCourseBySlug,
  getCourseLabel,
  sortedCourses,
} from '@/content/courses';
import {
  blogPosts,
  buildTableOfContents,
  estimateReadingTime,
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from '@/content/blog';
import { testimonials } from '@/content/testimonials';
import { generalFaqs } from '@/content/faqs';
import { galleryItems } from '@/content/gallery';
import { learningProcess } from '@/content/learning-process';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

describe('courses', () => {
  it('co du cac khoa hoc bat buoc', () => {
    const required = [
      'hang-b-so-tu-dong',
      'hang-b-so-san',
      'hang-c1',
      'bo-tuc-tay-lai',
      'luyen-sa-hinh',
    ];
    for (const slug of required) {
      expect(getCourseBySlug(slug), `thieu khoa hoc ${slug}`).toBeDefined();
    }
  });

  it('slug hop le va duy nhat', () => {
    const slugs = getAllCourseSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug, `slug khong hop le: ${slug}`).toMatch(SLUG_PATTERN);
    }
  });

  it('sap xep theo truong order tang dan', () => {
    const orders = sortedCourses.map((course) => course.order);
    expect([...orders].sort((a, b) => a - b)).toEqual(orders);
  });

  it('moi khoa hoc co day du truong hien thi bat buoc', () => {
    for (const course of courses) {
      expect(course.name.length).toBeGreaterThan(0);
      expect(course.summary.length).toBeGreaterThan(0);
      expect(course.suitableFor.length).toBeGreaterThan(0);
      expect(course.vehicleType.length).toBeGreaterThan(0);
      expect(course.estimatedDuration.length).toBeGreaterThan(0);
      expect(course.curriculum.length).toBeGreaterThan(0);
      expect(course.requiredDocuments.length).toBeGreaterThan(0);
      expect(course.image.src.startsWith('/images/')).toBe(true);
      expect(course.image.alt.length).toBeGreaterThan(0);
    }
  });

  it('khong dung tu ngu cam ket ket qua thi', () => {
    const banned = ['bao đậu', 'cam kết đậu', 'chống trượt', 'rẻ nhất'];
    const haystack = JSON.stringify(courses).toLowerCase();
    for (const phrase of banned) {
      expect(haystack, `noi dung chua cum tu bi cam: ${phrase}`).not.toContain(
        phrase,
      );
    }
  });

  it('getCourseBySlug tra ve undefined voi slug khong ton tai', () => {
    expect(getCourseBySlug('khong-ton-tai')).toBeUndefined();
  });

  it('courseOptions co lua chon "chua-xac-dinh"', () => {
    expect(courseOptions.some((option) => option.value === 'chua-xac-dinh')).toBe(
      true,
    );
  });

  it('getCourseLabel tra ve nhan doc duoc', () => {
    expect(getCourseLabel('hang-b-so-tu-dong')).toBe('Hạng B số tự động');
    expect(getCourseLabel('gia-tri-la')).toBe('gia-tri-la');
  });

  it('co it nhat 5 khoa hoc noi bat', () => {
    expect(featuredCourses.length).toBeGreaterThanOrEqual(5);
  });
});

describe('blog', () => {
  it('co it nhat 8 bai viet', () => {
    expect(blogPosts.length).toBeGreaterThanOrEqual(8);
  });

  it('slug bai viet hop le va duy nhat', () => {
    const slugs = getAllPostSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(SLUG_PATTERN);
    }
  });

  it('moi bai co day du metadata SEO', () => {
    for (const post of blogPosts) {
      expect(post.title.length).toBeGreaterThan(0);
      expect(post.description.length).toBeGreaterThan(40);
      expect(post.author.length).toBeGreaterThan(0);
      expect(post.category.length).toBeGreaterThan(0);
      expect(post.readingTimeMinutes).toBeGreaterThan(0);
      expect(post.coverImage.src.startsWith('/images/')).toBe(true);
      expect(post.tags.length).toBeGreaterThan(0);
      expect(new Date(post.publishedAt).toString()).not.toBe('Invalid Date');
      expect(new Date(post.updatedAt).toString()).not.toBe('Invalid Date');
    }
  });

  it('sap xep theo ngay dang giam dan', () => {
    for (let i = 1; i < blogPosts.length; i += 1) {
      const previous = blogPosts[i - 1];
      const current = blogPosts[i];
      expect(previous).toBeDefined();
      expect(current).toBeDefined();
      if (previous && current) {
        expect(previous.publishedAt >= current.publishedAt).toBe(true);
      }
    }
  });

  it('relatedSlugs deu tro toi bai co that', () => {
    for (const post of blogPosts) {
      for (const slug of post.relatedSlugs) {
        expect(getPostBySlug(slug), `${post.slug} tro toi ${slug}`).toBeDefined();
      }
    }
  });

  it('buildTableOfContents lay dung cac heading', () => {
    const first = blogPosts[0];
    expect(first).toBeDefined();
    if (!first) return;

    const toc = buildTableOfContents(first.content);
    expect(toc.length).toBeGreaterThan(0);
    for (const entry of toc) {
      expect(entry.id.length).toBeGreaterThan(0);
      expect([2, 3]).toContain(entry.level);
    }
  });

  it('id cua heading trong mot bai la duy nhat', () => {
    for (const post of blogPosts) {
      const ids = buildTableOfContents(post.content).map((entry) => entry.id);
      expect(new Set(ids).size, `trung id trong bai ${post.slug}`).toBe(
        ids.length,
      );
    }
  });

  it('getRelatedPosts khong tra ve chinh bai dang xem', () => {
    const first = blogPosts[0];
    expect(first).toBeDefined();
    if (!first) return;

    const related = getRelatedPosts(first.slug, 3);
    expect(related.length).toBeLessThanOrEqual(3);
    expect(related.some((post) => post.slug === first.slug)).toBe(false);
  });

  it('estimateReadingTime tra ve so phut duong', () => {
    const first = blogPosts[0];
    expect(first).toBeDefined();
    if (!first) return;
    expect(estimateReadingTime(first.content)).toBeGreaterThan(0);
  });
});

describe('testimonials', () => {
  it('moi cam nhan mau deu duoc danh dau isPlaceholder', () => {
    for (const testimonial of testimonials) {
      expect(
        typeof testimonial.isPlaceholder,
        `${testimonial.id} thieu co isPlaceholder`,
      ).toBe('boolean');
    }
  });

  it('toan bo du lieu hien tai la noi dung mau', () => {
    expect(testimonials.every((item) => item.isPlaceholder)).toBe(true);
  });

  it('id cam nhan la duy nhat', () => {
    const ids = testimonials.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('faqs va gallery', () => {
  it('co day du cac cau hoi bat buoc', () => {
    expect(generalFaqs.length).toBeGreaterThanOrEqual(9);
    for (const faq of generalFaqs) {
      expect(faq.question.length).toBeGreaterThan(0);
      expect(faq.answer.length).toBeGreaterThan(20);
    }
  });

  it('FAQ khong hard-code con so hoc phi', () => {
    const haystack = generalFaqs.map((faq) => faq.answer).join(' ');
    expect(haystack).not.toMatch(/\d[\d.,]*\s*(đ|vnđ|vnd|triệu)/i);
  });

  it('moi anh gallery co alt text', () => {
    for (const item of galleryItems) {
      expect(item.image.alt.length).toBeGreaterThan(0);
      expect(item.image.src.startsWith('/images/')).toBe(true);
    }
  });
});

describe('learningProcess', () => {
  it('co du 9 buoc va thu tu lien tuc', () => {
    expect(learningProcess.length).toBe(9);
    learningProcess.forEach((step, index) => {
      expect(step.order).toBe(index + 1);
      expect(step.title.length).toBeGreaterThan(0);
      expect(step.description.length).toBeGreaterThan(0);
    });
  });
});
