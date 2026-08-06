import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero-section';
import { WhyChooseSection } from '@/components/sections/why-choose-section';
import { CoursesSection } from '@/components/sections/courses-section';
import { LearningProcessSection } from '@/components/sections/learning-process-section';
import { AboutTeacherSection } from '@/components/sections/about-teacher-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { FaqSection } from '@/components/sections/faq-section';
import { LeadFormSection } from '@/components/sections/lead-form-section';
import { CtaBanner } from '@/components/sections/cta-banner';
import { JsonLd } from '@/components/ui/json-ld';
import { buildFaqJsonLd } from '@/lib/seo/structured-data';
import { generalFaqs } from '@/content/faqs';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = buildPageMetadata({
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseSection />
      <CoursesSection />
      <LearningProcessSection tone="muted" />
      <AboutTeacherSection />
      <TestimonialsSection limit={3} />
      <GallerySection />
      <FaqSection />
      <LeadFormSection formLocation="home" />
      <CtaBanner hideFormLink />

      <JsonLd data={buildFaqJsonLd(generalFaqs)} />
    </>
  );
}
