"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";

import { Accordion } from "@/features/global/components/Accordion";
import { SiteFooter } from "@/features/global/components/SiteFooter";
import { SiteHeader } from "@/features/global/components/SiteHeader";
import { UiIcon } from "@/features/global/components/UiIcon";
import { LandingOutcomesSection } from "@/features/landing/components/LandingOutcomesSection";
import { LandingPricingSection } from "@/features/landing/components/LandingPricingSection";
import type { SiteData } from "@/features/blogs/types/blog.type";
import type { LandingContentRoot, LandingLocale, LandingPageContent } from "@/features/landing/types/landing.type";

type LandingPageClientProps = {
  site: SiteData;
  contentRoot: LandingContentRoot;
};

const LANGUAGE_STORAGE_KEY = "cetakia_landing_language";
const LANGUAGE_CHANGE_EVENT = "cetakia-landing-language-change";

function isLandingLocale(value: string | null): value is LandingLocale {
  return value === "id" || value === "en";
}

function buildLocalizedSite(site: SiteData, contentRoot: LandingContentRoot, content: LandingPageContent): SiteData {
  return {
    ...site,
    primaryNavigation: contentRoot.header.navLinks,
    mobileDrawerNavigation: contentRoot.header.navLinks.map((link) => ({
      ...link,
      icon: link.icon ?? "bi-chevron-right",
    })),
    informationBar: contentRoot.informationBar,
    headerActions: {
      ...site.headerActions,
      startNow: {
        ...site.headerActions.startNow,
        label: contentRoot.header.startNowLabel,
      },
    },
    footer: {
      ...site.footer,
      description: content.footer.description,
      contactLinks: contentRoot.footer.contactLinks ?? site.footer.contactLinks,
      columns: contentRoot.footer.columns,
      bottom: {
        copyright: contentRoot.footer.copyright,
        links: contentRoot.footer.bottomLinks,
      },
    },
  };
}

function subscribeLandingLanguage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);
  };
}

export function LandingPageClient({ site, contentRoot }: LandingPageClientProps) {
  const fallbackLocale = contentRoot.defaultLocale;
  const locale = useSyncExternalStore(
    subscribeLandingLanguage,
    () => {
      const storedLocale = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      return isLandingLocale(storedLocale) ? storedLocale : fallbackLocale;
    },
    () => fallbackLocale,
  );
  const content = contentRoot.locales[locale] ?? contentRoot.locales[fallbackLocale];
  const localizedSite = buildLocalizedSite(site, contentRoot, content);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
  }, [locale]);

  const toggleLanguage = () => {
    const nextLocale: LandingLocale = locale === "id" ? "en" : "id";
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLocale);
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
  };

  return (
    <div className="lp-page bg-[var(--ui-surface-page)] text-[var(--ui-text-primary)] antialiased">
      <SiteHeader
        site={localizedSite}
        navLinks={contentRoot.header.navLinks}
        startNowHref="/#pricing"
        drawerId="landing-nav-drawer"
        languageToggle={{
          label: content.header.languageToggleLabel,
          ariaLabel: content.header.languageToggleAriaLabel,
          icon: content.header.languageToggleIcon,
          onToggle: toggleLanguage,
        }}
      />

      <main id="top">
        <section className="lp-hero">
          <div className="blog-container">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="lp-hero-intro">
                <span className="bp-pill bp-pill--tag">{content.hero.eyebrow}</span>
                <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[var(--ui-text-primary)] sm:text-5xl lg:text-6xl">
                  {content.hero.titlePrefix} <span className="text-[var(--ui-color-primary)]">{content.hero.titleHighlight}</span>{" "}
                  {content.hero.titleSuffix}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--ui-text-muted)] sm:text-lg">{content.hero.description}</p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={content.hero.primaryCta.href} className="lp-btn lp-btn--solid">
                    {content.hero.primaryCta.label} <UiIcon name="bi-arrow-up-right" />
                  </Link>
                  <Link href={content.hero.secondaryCta.href} className="lp-btn lp-btn--outline">
                    {content.hero.secondaryCta.label}
                  </Link>
                </div>

                <div className="mt-8">
                  <p className="text-sm text-[var(--ui-text-muted)]">{content.hero.trustedLabel}</p>
                  <div className="bp-pill-group mt-3">
                    {content.hero.trustedItems.map((item) => (
                      <span key={item} className="bp-pill bp-pill--tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="lp-hero-card lp-hero-card--floating">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-[var(--ui-text-primary)]">{content.hero.snapshot.title}</span>
                    <span className="lp-status">{content.hero.snapshot.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {content.hero.snapshot.kpis.map((kpi) => (
                      <article key={kpi.label} className="lp-kpi-box">
                        <small>{kpi.label}</small>
                        <strong>{kpi.value}</strong>
                      </article>
                    ))}
                  </div>
                  <div className="mt-4 grid gap-2 rounded-xl border border-dashed border-[var(--ui-border-subtle)] p-3">
                    {content.hero.snapshot.flowItems.map((item) => (
                      <p key={item.label} className="lp-flow-item">
                        <UiIcon name={item.icon} /> {item.label}
                      </p>
                    ))}
                  </div>
                </div>
                <span className="lp-glow" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="lp-section">
          <div className="blog-container">
            <header className="lp-head text-center">
              <span className="bp-pill bp-pill--tag">{content.features.eyebrow}</span>
              <h2>{content.features.title}</h2>
              <p>{content.features.description}</p>
            </header>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {content.features.items.map((feature) => (
                <article key={feature.title} className="lp-feature-card">
                  <span className="lp-feature-icon" aria-hidden="true">
                    <UiIcon name={feature.icon} className="lp-feature-icon__glyph" />
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="lp-section lp-section--muted">
          <div className="blog-container">
            <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <span className="bp-pill bp-pill--tag">{content.workflow.eyebrow}</span>
                <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.02em] text-[var(--ui-text-primary)] sm:text-4xl">
                  {content.workflow.title}
                </h2>
                <p className="mt-4 max-w-2xl text-[var(--ui-text-muted)]">{content.workflow.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {content.workflow.steps.map((step) => (
                  <article key={step.title} className="lp-step-card">
                    <span className="lp-step-number">{step.step}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="outcomes" className="lp-section">
          <div className="blog-container">
            <header className="lp-head text-center">
              <span className="bp-pill bp-pill--tag">{content.outcomes.eyebrow}</span>
              <h2>{content.outcomes.title}</h2>
              <p>{content.outcomes.description}</p>
            </header>

            <LandingOutcomesSection key={locale} testimonials={content.outcomes.testimonials} metrics={content.outcomes.metrics} />
          </div>
        </section>

        <section id="pricing" className="lp-section lp-section--grid">
          <div className="blog-container">
            <header className="lp-head text-center">
              <span className="bp-pill bp-pill--tag">{content.pricing.eyebrow}</span>
              <h2>{content.pricing.title}</h2>
              <p>{content.pricing.description}</p>
            </header>

            <LandingPricingSection plans={content.pricing.plans} billingCopy={content.pricing.billing} />
          </div>
        </section>

        <section id="contact" className="lp-section">
          <div className="blog-container">
            <div className="lp-cta-panel">
              <div>
                <span className="lp-chip">{content.contact.eyebrow}</span>
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">{content.contact.title}</h2>
                <p className="mt-4 max-w-2xl text-white/80">{content.contact.description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={content.contact.primaryCta.href} className="lp-btn lp-btn--light">
                  {content.contact.primaryCta.label}
                </a>
                <a href={content.contact.secondaryCta.href} className="lp-btn lp-btn--contrast">
                  {content.contact.secondaryCta.label}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="lp-section">
          <div className="blog-container">
            <header className="lp-head text-center">
              <span className="bp-pill bp-pill--tag">{content.faq.eyebrow}</span>
              <h2>{content.faq.title}</h2>
              <p>
                {content.faq.descriptionPrefix}
                <a href={content.faq.chatHref} target="_blank" rel="noopener noreferrer" className="text-[var(--ui-color-primary)] underline">
                  {content.faq.chatLabel}
                </a>
                {content.faq.descriptionSuffix}
              </p>
            </header>

            <Accordion items={content.faq.items} className="mx-auto max-w-4xl" />
          </div>
        </section>
      </main>

      <SiteFooter site={localizedSite} />
    </div>
  );
}
