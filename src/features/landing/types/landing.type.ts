import type { InformationBarData, NavLink, FooterColumn } from "@/features/blogs/types/blog.type";

export type LandingLocale = "id" | "en";

export type LandingLocalizedLink = NavLink & {
  label: string;
};

export type LandingFeatureItem = {
  icon: string;
  title: string;
  description: string;
};

export type LandingStepItem = {
  step: string;
  title: string;
  description: string;
};

export type LandingTestimonial = {
  quote: string;
  name: string;
  role: string;
};

export type LandingMetric = {
  value: string;
  label: string;
};

export type LandingPricingPlan = {
  name: string;
  description: string;
  annualPrice: string;
  monthlyPrice: string;
  suffix: string;
  ctaLabel: string;
  ctaVariant: "solid" | "outline";
  recommended?: boolean;
  features: string[];
};

export type LandingFaqItem = {
  id: string;
  iconClassName: string;
  title: string;
  content: string;
  defaultOpen?: boolean;
};

export type LandingPageContent = {
  header: {
    languageToggleLabel: string;
    languageToggleAriaLabel: string;
    languageToggleIcon: string;
  };
  footer: {
    description: string;
  };
  hero: {
    eyebrow: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    primaryCta: LandingLocalizedLink;
    secondaryCta: LandingLocalizedLink;
    trustedLabel: string;
    trustedItems: string[];
    snapshot: {
      title: string;
      status: string;
      kpis: Array<{
        label: string;
        value: string;
      }>;
      flowItems: Array<{
        icon: string;
        label: string;
      }>;
    };
  };
  features: {
    eyebrow: string;
    title: string;
    description: string;
    items: LandingFeatureItem[];
  };
  workflow: {
    eyebrow: string;
    title: string;
    description: string;
    steps: LandingStepItem[];
  };
  outcomes: {
    eyebrow: string;
    title: string;
    description: string;
    testimonials: LandingTestimonial[];
    metrics: LandingMetric[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    description: string;
    billing: {
      ariaLabel: string;
      annualLabel: string;
      annualBadge: string;
      monthlyLabel: string;
      recommendedLabel: string;
    };
    plans: LandingPricingPlan[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: LandingLocalizedLink;
    secondaryCta: LandingLocalizedLink;
  };
  faq: {
    eyebrow: string;
    title: string;
    descriptionPrefix: string;
    chatLabel: string;
    descriptionSuffix: string;
    chatHref: string;
    items: LandingFaqItem[];
  };
};

export type LandingContentRoot = {
  defaultLocale: LandingLocale;
  header: {
    startNowLabel: string;
    navLinks: LandingLocalizedLink[];
  };
  informationBar: InformationBarData;
  footer: {
    columns: FooterColumn[];
    contactLinks?: NavLink[];
    copyright: string;
    bottomLinks: NavLink[];
  };
  locales: Record<LandingLocale, LandingPageContent>;
};
