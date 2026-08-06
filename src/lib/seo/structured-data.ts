import { isPlaceholderValue, siteConfig } from '@/config/site';
import type { BlogPost, Course, Faq } from '@/types/content';
import { absoluteUrl } from './metadata';

/**
 * Sinh JSON-LD (schema.org).
 *
 * LUU Y VE TINH MINH BACH: khong khai bao website nhu mot to chuc dao tao
 * chinh thuc. Chi dung `Person` cho thay va `Course` cho khoa hoc, kem
 * `provider` la trang ca nhan - tranh gay hieu nham voi don vi chinh thuc.
 */

type JsonLd = Record<string, unknown>;

/** Bo gia tri con la placeholder ra khoi JSON-LD. */
function cleanValue(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return isPlaceholderValue(value) ? undefined : value;
}

export function buildWebsiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.brandName,
    description: siteConfig.seo.defaultDescription,
    inLanguage: 'vi-VN',
  };
}

export function buildPersonJsonLd(): JsonLd {
  const sameAs = [
    cleanValue(siteConfig.contact.facebookUrl),
    cleanValue(siteConfig.contact.youtubeUrl),
  ].filter((value): value is string => typeof value === 'string');

  const name = cleanValue(siteConfig.teacher.name);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: name ?? siteConfig.brandName,
    jobTitle: cleanValue(siteConfig.teacher.title) ?? 'Giáo viên dạy lái xe',
    url: siteConfig.url,
    telephone: cleanValue(siteConfig.contact.phone),
    email: cleanValue(siteConfig.contact.email),
    areaServed: cleanValue(siteConfig.contact.trainingArea) ?? 'TP.HCM',
    knowsLanguage: 'vi',
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function buildCourseJsonLd(course: Course): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.summary,
    url: absoluteUrl(`/khoa-hoc/${course.slug}`),
    inLanguage: 'vi-VN',
    provider: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: cleanValue(siteConfig.teacher.name) ?? siteConfig.brandName,
      url: siteConfig.url,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      courseWorkload: course.estimatedDuration,
      location: {
        '@type': 'Place',
        name: cleanValue(siteConfig.contact.trainingArea) ?? 'TP.HCM',
      },
    },
  };
}

export function buildFaqJsonLd(faqs: Faq[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function buildArticleJsonLd(post: BlogPost): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    inLanguage: 'vi-VN',
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: [absoluteUrl(post.coverImage.src)],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/kien-thuc/${post.slug}`),
    },
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: cleanValue(siteConfig.teacher.name) ?? post.author,
    },
    publisher: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: cleanValue(siteConfig.teacher.name) ?? siteConfig.brandName,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * `ProfessionalService` mo ta dich vu tu van hoc lai xe cua CA NHAN thay.
 * Chi phat sinh khi da cau hinh du so dien thoai va khu vuc, va luon ghi ro
 * day la trang ca nhan de khong bi hieu nham la don vi dao tao chinh thuc.
 */
export function buildLocalServiceJsonLd(): JsonLd | null {
  const phone = cleanValue(siteConfig.contact.phone);
  const area = cleanValue(siteConfig.contact.trainingArea);
  const teacherName = cleanValue(siteConfig.teacher.name);

  if (!phone || !area || !teacherName) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}/#service`,
    name: `Tư vấn học lái xe - thầy ${teacherName}`,
    description:
      'Trang cá nhân tư vấn và hướng dẫn học viên học lái xe. Không phải cổng thông tin chính thức của cơ sở đào tạo.',
    url: siteConfig.url,
    telephone: phone,
    areaServed: area,
    availableLanguage: 'vi',
    provider: { '@id': `${siteConfig.url}/#person` },
  };
}
