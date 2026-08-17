import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
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
import { generalFaqs } from '@/content/faqs';
import { galleryItems } from '@/content/gallery';
import { learningProcess } from '@/content/learning-process';
import {
  commonConcerns,
  getRealTestimonials,
  hasPlaceholderTestimonials,
  ILLUSTRATIVE_LABEL,
  testimonials,
  testimonialsDisclosure,
} from '@/content/testimonials';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Bat con so tien te bi hard-code trong noi dung ("500.000đ", "20 triệu").
 *
 * `(?![\p{L}])` o cuoi la BAT BUOC: thieu no thi don vi "đ" se an vao dau
 * moi tu tieng Viet bat dau bang chu d - vi du "học C1 để phục vụ" bi cham
 * nham thanh "1 đ". Can co flag `u` de dung duoc `\p{L}`.
 */
const MONEY_PATTERN = /\d[\d.,]*\s*(?:vnđ|vnd|triệu|nghìn|ngàn|đ)(?![\p{L}])/iu;

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
    expect(
      courseOptions.some((option) => option.value === 'chua-xac-dinh'),
    ).toBe(true);
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
        expect(
          getPostBySlug(slug),
          `${post.slug} tro toi ${slug}`,
        ).toBeDefined();
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

  /**
   * Cac rang buoc noi dung o docs/CONTENT_GUIDE.md muc 0 ap dung cho MOI noi
   * dung, nhung truoc day chi `courses` duoc kiem tra. Bai viet la noi de lot
   * nhat vi dai va viet tu do hon.
   */
  it('khong dung tu ngu cam ket ket qua thi', () => {
    const banned = ['bao đậu', 'cam kết đậu', 'chống trượt', 'rẻ nhất'];
    for (const post of blogPosts) {
      const haystack = (
        JSON.stringify(post.content) +
        post.title +
        post.description
      ).toLowerCase();
      for (const phrase of banned) {
        expect(
          haystack,
          `bai ${post.slug} chua cum tu bi cam: ${phrase}`,
        ).not.toContain(phrase);
      }
    }
  });

  it('bai viet khong hard-code con so hoc phi', () => {
    for (const post of blogPosts) {
      const haystack = JSON.stringify(post.content) + post.description;
      expect(haystack, `bai ${post.slug} co con so tien`).not.toMatch(
        MONEY_PATTERN,
      );
    }
  });

  /**
   * Chan loi "bai viet mo coi": tao file trong src/content/blog nhung quen
   * them vao mang trong index.ts. Khi do bai khong len sitemap, khong co
   * trang, va MOI test khac deu cho qua vi chung chi duyet `blogPosts` -
   * bai bi thieu thi khong co gi de kiem tra. Loi nay im lang hoan toan.
   */
  it('moi file bai viet deu duoc noi vao index', () => {
    const dir = join(process.cwd(), 'src', 'content', 'blog');
    const files = readdirSync(dir)
      .filter((name) => name.endsWith('.ts') && name !== 'index.ts')
      .sort();
    expect(files.length, 'khong doc duoc thu muc bai viet').toBeGreaterThan(0);
    expect(
      blogPosts.length,
      `co ${files.length} file bai viet nhung index chi xuat ${blogPosts.length}`,
    ).toBe(files.length);
  });

  it('anh bia cua moi bai ton tai that trong public/', () => {
    for (const post of blogPosts) {
      const file = join(process.cwd(), 'public', post.coverImage.src);
      expect(existsSync(file), `thieu anh bia cua bai ${post.slug}`).toBe(true);
    }
  });

  /**
   * Block `image` chen giua noi dung (khac coverImage o dau trang) - them
   * tu dot viet 3 so do minh hoa cho bai ghep xe va bai len doc. Kiem tra
   * rieng vi coverImage va anh chen giua la hai truong khac nhau trong kieu
   * du lieu, khong the goi chung.
   */
  it('anh chen giua noi dung (block image) ton tai that va co alt text', () => {
    for (const post of blogPosts) {
      const imageBlocks = post.content.filter(
        (
          block,
        ): block is Extract<(typeof post.content)[number], { type: 'image' }> =>
          block.type === 'image',
      );
      for (const block of imageBlocks) {
        expect(
          block.alt.length,
          `anh trong bai ${post.slug} (${block.src}) thieu alt text`,
        ).toBeGreaterThan(0);
        const file = join(process.cwd(), 'public', block.src);
        expect(
          existsSync(file),
          `bai ${post.slug} tro toi anh khong ton tai: ${block.src}`,
        ).toBe(true);
      }
    }
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
    expect(haystack).not.toMatch(MONEY_PATTERN);
  });

  it('moi anh gallery co alt text', () => {
    for (const item of galleryItems) {
      expect(item.image.alt.length).toBeGreaterThan(0);
      expect(item.image.src.startsWith('/images/')).toBe(true);
    }
  });
});

describe('testimonials', () => {
  it('co dung 10 tinh huong minh hoa', () => {
    expect(testimonials.length).toBe(10);
  });

  it('id khong trung nhau va noi dung du dai de co nghia', () => {
    const ids = testimonials.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of testimonials) {
      expect(item.quote.length).toBeGreaterThan(40);
      expect(item.situation.length).toBeGreaterThan(0);
    }
  });

  it('nhan situation khong trung nhau giua cac tinh huong', () => {
    const situations = testimonials.map((item) => item.situation);
    expect(new Set(situations).size).toBe(situations.length);
  });

  /**
   * RANG BUOC DAO DUC: noi dung minh hoa khong duoc mang ten nguoi/avatar
   * that - dieu nay se goi y day la mot hoc vien co that. Chi cam nhan THAT
   * (isPlaceholder: false, da xin phep hoc vien) moi duoc dat `name`.
   */
  it('noi dung minh hoa khong duoc gan ten hay avatar nguoi', () => {
    for (const item of testimonials) {
      if (item.isPlaceholder) {
        expect(item.name).toBeUndefined();
        expect(item.avatarInitial).toBeUndefined();
      }
    }
  });

  /**
   * RANG BUOC DAO DUC, khong phai kiem tra ky thuat.
   *
   * Noi dung minh hoa bat buoc phai deo nhan de khach khong tuong la loi
   * that. `TestimonialCard` deo nhan dua vao dung co `isPlaceholder`, con o
   * day chan chieu nguoc lai: khong ai duoc lang le doi co sang `false` cho
   * mot muc van dang mang nhan minh hoa.
   *
   * Khi co cam nhan THAT (da xin phep hoc vien): dat `isPlaceholder: false`
   * VA doi `period` thanh thoi gian hoc that - luc do test tu dong cho qua.
   */
  it('muc nao con nhan minh hoa thi phai giu isPlaceholder = true', () => {
    for (const item of testimonials) {
      if (item.period === ILLUSTRATIVE_LABEL) {
        expect(item.isPlaceholder).toBe(true);
      }
    }
  });

  /**
   * Doan giai thich phai noi ro noi dung nay LA GI, khong chi phu dinh.
   * Neu ai do rut gon no thanh mot cau chung chung thi test bao ngay.
   */
  it('doan giai thich neu ro day la minh hoa va se duoc thay bang loi that', () => {
    expect(testimonialsDisclosure).toMatch(/minh họa/i);
    expect(testimonialsDisclosure).toMatch(/thực tế|đồng ý chia sẻ/i);
    expect(testimonialsDisclosure.length).toBeGreaterThan(100);
  });

  it('danh sach quan tam chung khong hua hen dieu khong kiem chung duoc', () => {
    expect(commonConcerns.length).toBeGreaterThan(0);
    const haystack = commonConcerns.join(' ');
    expect(haystack).not.toMatch(/cam kết|bảo đảm|đảm bảo|100%|chắc chắn đậu/i);
  });

  it('hasPlaceholderTestimonials phan anh dung du lieu', () => {
    expect(hasPlaceholderTestimonials()).toBe(
      testimonials.some((item) => item.isPlaceholder),
    );
    expect(getRealTestimonials()).toEqual(
      testimonials.filter((item) => !item.isPlaceholder),
    );
  });

  it('khong bia con so hoc phi hay ty le dau trong loi cam nhan', () => {
    const haystack = testimonials.map((item) => item.quote).join(' ');
    expect(haystack).not.toMatch(MONEY_PATTERN);
    expect(haystack).not.toMatch(/\d+\s*%/);
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
