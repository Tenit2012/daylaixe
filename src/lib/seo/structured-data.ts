import { isPlaceholderValue, siteConfig } from '@/config/site';
import { sortedCourses } from '@/content/courses';
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

/**
 * So dien thoai dang E.164 (`+84...`) cho JSON-LD.
 *
 * Website hien thi so noi dia ("0971397882") vi do la dang nguoi Viet doc va
 * bam goi duoc. Google thi doi ma quoc gia de biet chac day la so o Viet Nam.
 * Chuyen doi tai day thay vi luu hai bien: mot nguon su that, hai cach trinh
 * bay.
 */
function toE164(phone: string | undefined): string | undefined {
  const value = cleanValue(phone);
  if (!value) return undefined;

  const digits = value.replace(/[^\d+]/g, '');
  if (digits.startsWith('+')) return digits;
  if (digits.startsWith('84')) return `+${digits}`;
  if (digits.startsWith('0')) return `+84${digits.slice(1)}`;
  return `+84${digits}`;
}

/**
 * Cac ho so mang xa hoi / danh muc chinh chu cua thay.
 *
 * `sameAs` la cach noi voi Google "may trang nay cung mot chu the". Chi liet
 * ke ho so DA CAU HINH THAT - placeholder bi loc bang `cleanValue`, nen khi
 * chua co Facebook/YouTube thi mang tu ngan lai chu khong sinh link hong.
 */
function buildSameAs(): string[] {
  return [
    cleanValue(siteConfig.contact.googleMapsUrl),
    cleanValue(siteConfig.contact.facebookUrl),
    cleanValue(siteConfig.contact.zaloUrl),
    cleanValue(siteConfig.contact.youtubeUrl),
  ].filter((value): value is string => typeof value === 'string');
}

/**
 * Gio mo cua dang `OpeningHoursSpecification`.
 *
 * Dung ban day du thay vi chuoi rut gon `"Mo-Su 07:00-20:00"`: ca hai deu hop
 * le voi schema.org, nhung ban nay khong the doc nham va de doi lich rieng
 * cho tung ngay ve sau ma khong phai viet lai cu phap.
 */
function buildOpeningHours(): JsonLd {
  return {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [...siteConfig.business.openDays],
    opens: siteConfig.business.opens,
    closes: siteConfig.business.closes,
  };
}

/**
 * `geo` chi sinh khi da cau hinh toa do that (xem `siteConfig.business.geo`).
 * Chua co thi tra ve object rong de toan tu spread bo qua - KHONG ghi
 * `latitude: null`, vi mot toa do rong van la mot loi cu phap trong mat cong
 * cu kiem tra du lieu co cau truc.
 */
function geoFragment(): JsonLd {
  const geo = siteConfig.business.geo;
  if (!geo) return {};

  return {
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
  };
}

/**
 * Khoang hoc phi, TINH TU chinh du lieu khoa hoc chu khong go tay.
 *
 * Go tay mot khoang ("18.500.000d - 20.500.000d") se am tham sai vao ngay ai
 * do doi hoc phi mot khoa - va sai o cho khong ai nghi den viec kiem tra.
 * Chi tinh tren cac khoa co muc TRON GOI xac dinh (`amountVnd`); khoa tinh
 * theo buoi khong co diem dau/cuoi nen khong thuoc khoang nay.
 */
function buildPriceRange(): string | undefined {
  const amounts = sortedCourses
    .map((course) => course.tuition?.amountVnd)
    .filter((amount): amount is number => typeof amount === 'number');

  if (amounts.length === 0) return undefined;

  const format = (amount: number) =>
    `${new Intl.NumberFormat('vi-VN').format(amount)}₫`;

  const min = Math.min(...amounts);
  const max = Math.max(...amounts);

  return min === max ? format(min) : `${format(min)} - ${format(max)}`;
}

/** Dia chi vat ly cua trung tam, dung chung cho moi node co dia diem. */
function postalAddressFragment(): JsonLd {
  const address = cleanValue(siteConfig.contact.address);
  if (!address) return {};

  return {
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressLocality: 'Thủ Đức',
      addressRegion: 'TP.HCM',
      addressCountry: 'VN',
    },
  };
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
 * Trung tam noi thay giang day - node DIA DIEM cua website.
 *
 * Tra ve `null` khi chua cau hinh ten trung tam - khong bao gio sinh mot to
 * chuc rong. Dia chi duoc khai bao dang `PostalAddress` de Google hieu day la
 * dia diem vat ly co that.
 *
 * VI SAO `@type` LA MOT MANG HAI PHAN TU:
 * `DrivingSchool` la loai Google dung cho ket qua tim kiem dia phuong cua
 * truong day lai xe - dat no len truoc de Google chon dung khuon hien thi.
 * `EducationalOrganization` duoc GIU LAI vi day moi la mo ta dung ban chat
 * co so (mot trung tam dao tao thuoc truong dai hoc), va vi `Person.worksFor`
 * o node thay dang tro toi chinh `@id` nay. Schema.org cho phep mot thuc the
 * mang nhieu loai; bo mot trong hai deu lam mat mot nua su that.
 *
 * LUU Y VE `telephone` - CAN CHU WEBSITE XAC NHAN:
 * So dat o day la so cua THAY, khong phai tong dai chinh thuc cua trung tam.
 * Doi lai loi ich local SEO (Google gan so goi vao ket qua dia diem), no co
 * rui ro: nguoi tim ten trung tam co the thay so ca nhan cua thay hien ra nhu
 * so cua co so. Neu khong muon vay, xoa `telephone` va `priceRange` khoi node
 * nay - hai truong do van con day du o node `#service` ben duoi, la node mo ta
 * dich vu tu van cua rieng thay.
 */
export function buildCenterJsonLd(): JsonLd | null {
  const centerName = cleanValue(siteConfig.teacher.centerName);
  if (!centerName) return null;

  const sameAs = buildSameAs();
  const priceRange = buildPriceRange();
  const telephone = toE164(siteConfig.contact.phone);

  return {
    '@context': 'https://schema.org',
    '@type': ['DrivingSchool', 'EducationalOrganization'],
    '@id': `${siteConfig.url}/#center`,
    name: centerName,
    url: siteConfig.url,
    ...postalAddressFragment(),
    ...geoFragment(),
    openingHoursSpecification: [buildOpeningHours()],
    ...(telephone ? { telephone } : {}),
    ...(priceRange ? { priceRange } : {}),
    areaServed: cleanValue(siteConfig.contact.trainingArea) ?? 'TP.HCM',
    ...(cleanValue(siteConfig.contact.googleMapsUrl)
      ? { hasMap: siteConfig.contact.googleMapsUrl }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function buildPersonJsonLd(): JsonLd {
  const sameAs = buildSameAs();
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
    /**
     * `offers` chi sinh khi khoa hoc CO muc tron goi xac dinh.
     *
     * Day KHONG mau thuan voi lenh cam o dau file: cai bi cam la con so
     * KHONG kiem chung duoc (aggregateRating, so hoc vien, ty le dau). Hoc
     * phi thi nguoc lai - no la muc Trung tam cong bo, dang hien nguyen van
     * tren chinh trang nay, nen khai bao cho Google la mo ta dung thuc te.
     *
     * Khoa chua chot hoc phi (`amountVnd` bo trong) thi khong co `offers` -
     * tha thieu con hon bao mot con so ma trang khong hien.
     */
    ...(course.tuition?.amountVnd
      ? {
          offers: {
            '@type': 'Offer',
            price: String(course.tuition.amountVnd),
            priceCurrency: 'VND',
            category: 'Trọn gói',
            url: pageUrl(`/khoa-hoc/${course.slug}`),
          },
        }
      : {}),
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

  const sameAs = buildSameAs();
  const priceRange = buildPriceRange();

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}/#service`,
    name: `Tư vấn học lái xe - thầy ${teacherName}`,
    description:
      'Trang cá nhân tư vấn và hướng dẫn học viên học lái xe. Không phải cổng thông tin chính thức của cơ sở đào tạo.',
    url: siteConfig.url,
    telephone: toE164(phone) ?? phone,
    areaServed: area,
    availableLanguage: 'vi',
    provider: { '@id': `${siteConfig.url}/#person` },
    /** Cung dia diem, cung khung gio nhu trung tam - thay tu van tai cho. */
    ...postalAddressFragment(),
    ...geoFragment(),
    openingHoursSpecification: [buildOpeningHours()],
    ...(priceRange ? { priceRange } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/**
 * `ItemList` cho trang danh sach /khoa-hoc.
 *
 * Muc dich: noi voi Google rang trang nay la mot DANH SACH co thu tu, va tung
 * muc dan toi trang chi tiet nao. Nho vay ket qua tim kiem co the hien dang
 * danh sach thay vi mot dong link don.
 *
 * Moi phan tu chi mang `url` + `name`, KHONG nhung ca `Course` day du vao
 * day: mo ta khoa hoc, hoc phi va `hasCourseInstance` da co san o chinh trang
 * chi tiet ma `url` tro toi. Lap lai o hai noi la them mot cho co the le nhau
 * ma khong them thong tin gi cho Google.
 */
export function buildCourseListJsonLd(courses: Course[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${pageUrl('/khoa-hoc')}#courselist`,
    name: 'Các khóa học lái xe',
    numberOfItems: courses.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: course.name,
      url: pageUrl(`/khoa-hoc/${course.slug}`),
    })),
  };
}
