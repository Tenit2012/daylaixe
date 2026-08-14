import { isPlaceholderValue, siteConfig } from '@/config/site';
import type { BlogPost, Course, Faq } from '@/types/content';
import { absoluteUrl, pageUrl } from './metadata';

/**
 * Sinh JSON-LD (schema.org).
 *
 * LUU Y VE TINH MINH BACH - doc ky truoc khi sua:
 *
 *  - Thuc the CHINH cua website la `Person` (thay), KHONG phai to chuc.
 *    Website nay la trang ca nhan cua thay, khong phai cong thong tin cua
 *    trung tam.
 *  - Trung tam duoc khai bao la `EducationalOrganization` va noi voi thay
 *    qua `Person.worksFor`. Day la mo ta dung quan he co that: thay la giao
 *    vien co huu cua trung tam. KHONG duoc dao nguoc (khai to chuc lam thuc
 *    the chinh) vi nhu vay thanh mao danh trung tam.
 *  - TUYET DOI khong sinh `aggregateRating`, `review`, `award` hay bat ky
 *    con so nao (so hoc vien, ty le dau) khi chua co nguon kiem chung duoc.
 *    Google phat nang du lieu co cau truc gia, va no chinh la thu bien mot
 *    trang that thanh trang "co tuyen sinh" trong mat nguoi doc.
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

/**
 * Trung tam noi thay giang day.
 *
 * Tra ve `null` khi chua cau hinh ten trung tam - khong bao gio sinh mot to
 * chuc rong. Dia chi duoc khai bao dang `PostalAddress` de Google hieu day la
 * dia diem vat ly co that.
 */
export function buildCenterJsonLd(): JsonLd | null {
  const centerName = cleanValue(siteConfig.teacher.centerName);
  if (!centerName) return null;

  const address = cleanValue(siteConfig.contact.address);

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${siteConfig.url}/#center`,
    name: centerName,
    ...(address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: address,
            addressLocality: 'Thủ Đức',
            addressRegion: 'TP.HCM',
            addressCountry: 'VN',
          },
        }
      : {}),
    ...(cleanValue(siteConfig.contact.googleMapsUrl)
      ? { hasMap: siteConfig.contact.googleMapsUrl }
      : {}),
  };
}

export function buildPersonJsonLd(): JsonLd {
  const sameAs = [
    cleanValue(siteConfig.contact.facebookUrl),
    cleanValue(siteConfig.contact.youtubeUrl),
  ].filter((value): value is string => typeof value === 'string');

  const name = cleanValue(siteConfig.teacher.name);
  const center = buildCenterJsonLd();

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: name ?? siteConfig.brandName,
    jobTitle: siteConfig.teacher.employmentStatus,
    /**
     * Chi mo ta kinh nghiem bang cau van da duoc xac nhan.
     * KHONG khai bao aggregateRating, reviewCount, award hay so hoc vien -
     * do la du lieu co cau truc gia neu chua co nguon that.
     */
    description: siteConfig.experience.withAudience,
    url: siteConfig.url,
    telephone: cleanValue(siteConfig.contact.phone),
    email: cleanValue(siteConfig.contact.email),
    areaServed: cleanValue(siteConfig.contact.trainingArea) ?? 'TP.HCM',
    knowsLanguage: 'vi',
    /** Quan he co that: giao vien co huu cua trung tam. */
    ...(center ? { worksFor: { '@id': `${siteConfig.url}/#center` } } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function buildCourseJsonLd(course: Course): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.summary,
    url: pageUrl(`/khoa-hoc/${course.slug}`),
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
        name:
          cleanValue(siteConfig.teacher.centerName) ??
          cleanValue(siteConfig.contact.trainingArea) ??
          'TP.HCM',
        ...(cleanValue(siteConfig.contact.address)
          ? {
              address: {
                '@type': 'PostalAddress',
                streetAddress: siteConfig.contact.address,
                addressLocality: 'Thủ Đức',
                addressRegion: 'TP.HCM',
                addressCountry: 'VN',
              },
            }
          : {}),
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
    // Anh la FILE nen dung absoluteUrl (khong dau gach cheo cuoi);
    // mainEntityOfPage la TRANG nen dung pageUrl de khop canonical.
    image: [absoluteUrl(post.coverImage.src)],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl(`/kien-thuc/${post.slug}`),
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
      item: pageUrl(item.path),
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
    ...(cleanValue(siteConfig.contact.address)
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: siteConfig.contact.address,
            addressLocality: 'Thủ Đức',
            addressRegion: 'TP.HCM',
            addressCountry: 'VN',
          },
        }
      : {}),
  };
}
