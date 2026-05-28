"use client";

import { useEffect, useState } from "react";
import { Accordion } from "@/features/global/components/Accordion";
import { SiteFooter } from "@/features/global/components/SiteFooter";
import { SiteHeader } from "@/features/global/components/SiteHeader";
import type { SiteData } from "@/features/blogs/types/blog.type";

type LandingPageProps = {
  site: SiteData;
};

type BillingCycle = "annual" | "monthly";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

type PricingPlan = {
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

const testimonials: Testimonial[] = [
  {
    quote: "Cetakia streamlined our quotation-to-invoice cycle and reduced follow-up bottlenecks between teams.",
    name: "Rina Hartono",
    role: "Head of Sales Operations",
  },
  {
    quote: "We now monitor in-house, division, and outsourcing jobs from one dashboard without losing control.",
    name: "Arief Nugraha",
    role: "Production Planning Manager",
  },
  {
    quote: "Delivery coordination is faster because everyone works on the same status and schedule reference.",
    name: "Maya Prasetyo",
    role: "Logistics & Fulfillment Lead",
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: "Free Starter",
    description: "Ideal for early-stage teams validating core workflows.",
    annualPrice: "0K",
    monthlyPrice: "0K",
    suffix: "/mo.",
    ctaLabel: "Start Free",
    ctaVariant: "outline",
    features: ["1 company workspace", "Quotation and basic order tracking", "Up to 3 active users"],
  },
  {
    name: "Basic",
    description: "For small operations that need tighter process control.",
    annualPrice: "255K",
    monthlyPrice: "300K",
    suffix: "/mo.",
    ctaLabel: "Choose Basic",
    ctaVariant: "outline",
    features: ["Sales, delivery, and purchase modules", "Up to 10 active users", "Exportable reports"],
  },
  {
    name: "Pro",
    description: "For growing teams requiring speed, visibility, and scale.",
    annualPrice: "520K",
    monthlyPrice: "650K",
    suffix: "/mo.",
    ctaLabel: "Start with Pro",
    ctaVariant: "solid",
    recommended: true,
    features: ["End-to-end workflow orchestration", "Up to 40 active users", "Priority support"],
  },
  {
    name: "Enterprise",
    description: "For business with advanced governance needs.",
    annualPrice: "1200K",
    monthlyPrice: "1500K",
    suffix: "/mo.",
    ctaLabel: "Contact Sales",
    ctaVariant: "outline",
    features: ["Multi-division operations", "Unlimited users", "Dedicated success manager"],
  },
  {
    name: "Custom",
    description: "Tailored for complex operations with specific requirements.",
    annualPrice: "Custom",
    monthlyPrice: "Custom",
    suffix: "plan",
    ctaLabel: "Request Proposal",
    ctaVariant: "outline",
    features: ["Custom module bundling", "Private deployment options", "Implementation consulting"],
  },
];

const sectionLinks = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Outcomes", href: "#outcomes" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
  { label: "FAQ", href: "#faq" },
];

const faqItems = [
  {
    id: "faq-free-trial",
    iconClassName: "bi-emoji-smile",
    title: "Is there a free trial available?",
    content: "Yes. You can start from the Free Starter plan, then upgrade when your team needs more users and deeper reporting.",
    defaultOpen: true,
  },
  {
    id: "faq-change-plan",
    iconClassName: "bi-sliders",
    title: "Can I change my plan later?",
    content: "Absolutely. You can move between plans as your production volume grows, while keeping data continuity intact.",
  },
  {
    id: "faq-billing",
    iconClassName: "bi-receipt",
    title: "How does billing and cancellation work?",
    content: "Billing can be monthly or annual based on your selected cycle. You can request cancellation before the next cycle starts.",
  },
  {
    id: "faq-onboarding",
    iconClassName: "bi-person-gear",
    title: "Do you provide onboarding and implementation support?",
    content: "Yes. Our team can assist setup, process mapping, and onboarding for sales, production, warehouse, and finance workflows.",
  },
];

const QUOTE_INTERVAL_MS = 10000;
const QUOTE_FADE_MS = 260;

export function LandingPage({ site }: LandingPageProps) {
  const [billing, setBilling] = useState<BillingCycle>("annual");
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [isQuoteVisible, setIsQuoteVisible] = useState(true);
  const quote = testimonials[activeQuoteIndex];

  useEffect(() => {
    let timeoutId = 0;
    const intervalId = window.setInterval(() => {
      setIsQuoteVisible(false);

      timeoutId = window.setTimeout(() => {
        setActiveQuoteIndex((prev) => (prev + 1) % testimonials.length);
        setIsQuoteVisible(true);
      }, QUOTE_FADE_MS);
    }, QUOTE_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="lp-page bg-[var(--ui-surface-page)] text-[var(--ui-text-primary)] antialiased">
      <SiteHeader site={site} navLinks={sectionLinks} startNowHref="#pricing" drawerId="landing-nav-drawer" />

      <main id="top">
        <section className="lp-hero">
          <div className="blog-container">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <span className="bp-pill bp-pill--tag">ERP for Printing</span>
                <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[var(--ui-text-primary)] sm:text-5xl lg:text-6xl">
                  One Stop <span className="text-[var(--ui-color-primary)]">Printing System</span> Solution.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--ui-text-muted)] sm:text-lg">
                  Cetakia unifies sales, production, inventory, accounting, and reporting into one connected operating system built for speed,
                  consistency, and growth.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#pricing" className="lp-btn lp-btn--solid">
                    Start with Cetakia <i className="bi bi-arrow-up-right" />
                  </a>
                  <a href="#features" className="lp-btn lp-btn--outline">
                    Explore Platform
                  </a>
                </div>

                <div className="mt-8">
                  <p className="text-sm text-[var(--ui-text-muted)]">Trusted by teams managing:</p>
                  <div className="bp-pill-group mt-3">
                    <span className="bp-pill bp-pill--tag">Sales</span>
                    <span className="bp-pill bp-pill--tag">Purchases</span>
                    <span className="bp-pill bp-pill--tag">Production</span>
                    <span className="bp-pill bp-pill--tag">Inventory</span>
                    <span className="bp-pill bp-pill--tag">Financial Reports</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="lp-hero-card">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-[var(--ui-text-primary)]">Daily Operations Snapshot</span>
                    <span className="lp-status">Live</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <article className="lp-kpi-box">
                      <small>Active Jobs</small>
                      <strong>128</strong>
                    </article>
                    <article className="lp-kpi-box">
                      <small>Ready to Deliver</small>
                      <strong>34</strong>
                    </article>
                    <article className="lp-kpi-box">
                      <small>Pending Approval</small>
                      <strong>12</strong>
                    </article>
                    <article className="lp-kpi-box">
                      <small>Receipts Today</small>
                      <strong>IDR 97M</strong>
                    </article>
                  </div>
                  <div className="mt-4 grid gap-2 rounded-xl border border-dashed border-[var(--ui-border-subtle)] p-3">
                    <p className="lp-flow-item">
                      <i className="bi bi-check-circle-fill" /> Quotation Approved
                    </p>
                    <p className="lp-flow-item">
                      <i className="bi bi-arrow-repeat" /> Production Running
                    </p>
                    <p className="lp-flow-item">
                      <i className="bi bi-truck" /> Delivery Scheduled
                    </p>
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
              <span className="bp-pill bp-pill--tag">Core Features</span>
              <h2>Built for end-to-end print business</h2>
              <p>Every team works on the same data foundation, from commercial planning to production output and finance.</p>
            </header>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["bi-currency-dollar", "Sales to Cash", "Handle quotations, sales orders, invoices, and customer receipts in one reliable flow."],
                ["bi-truck", "Delivery Coordination", "Control delivery schedules, dispatch progress, and proof of delivery with clear accountability."],
                ["bi-cart-check", "Purchase Control", "Manage purchase requests, purchase orders, and vendor transactions with full visibility."],
                ["bi-briefcase", "Production Jobs", "Run in-house, inter-division, and outsourcing jobs with status tracking and operational precision."],
                ["bi-database", "Master Data Integrity", "Keep customers, products, components, units, and vendors aligned for clean and accurate operations."],
                ["bi-file-earmark-bar-graph", "Accounting Readiness", "Structure chart of accounts and monitor financial positions with traceable transaction records."],
                ["bi-bar-chart-line", "Executive Reporting", "Access sales, receipt, inventory, and profitability insights to support strategic decisions."],
                ["bi-cpu", "Intelligence Layer", "Leverage Expert System and Business Intelligence for smarter planning and performance growth."],
              ].map(([icon, title, description]) => (
                <article key={title} className="lp-feature-card">
                  <i className={`bi ${icon} lp-feature-icon`} />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="lp-section lp-section--muted">
          <div className="blog-container">
            <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <span className="bp-pill bp-pill--tag">Operational Flow</span>
                <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.02em] text-[var(--ui-text-primary)] sm:text-4xl">
                  Keep every stage connected without operational silos
                </h2>
                <p className="mt-4 max-w-2xl text-[var(--ui-text-muted)]">
                  Cetakia helps teams execute with flawless efficiency by creating clear transitions between commercial, production, delivery, and
                  financial closure.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["01", "Capture Demand", "Generate quotation and convert to sales order with full traceability."],
                  ["02", "Plan & Produce", "Route jobs across in-house, divisions, or outsourcing with status governance."],
                  ["03", "Deliver with Control", "Coordinate delivery schedules and maintain customer communication quality."],
                  ["04", "Close Financial Loop", "Issue invoices, monitor receipts, and expose business insights in real time."],
                ].map(([step, title, desc]) => (
                  <article key={title} className="lp-step-card">
                    <span className="lp-step-number">{step}</span>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="outcomes" className="lp-section">
          <div className="blog-container">
            <header className="lp-head text-center">
              <span className="bp-pill bp-pill--tag">Testimonials</span>
              <h2>Proven results from teams running Cetakia every day</h2>
              <p>Hear how sales, production, delivery, and finance teams gain faster coordination with one connected platform.</p>
            </header>

            <article className="lp-quote-card text-center">
              <i className="bi bi-quote lp-quote-icon" aria-hidden="true" />
              <div className={`lp-quote-body${isQuoteVisible ? " is-visible" : ""}`} data-quote-body>
                <p>“{quote.quote}”</p>
                <div className="grid gap-1">
                  <strong>{quote.name}</strong>
                  <span>{quote.role}</span>
                </div>
              </div>
            </article>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["99.9%", "Data Availability"],
                ["3x", "Faster Job Coordination"],
                ["40%", "Lower Manual Rework"],
                ["24/7", "Real-time Visibility"],
              ].map(([value, label]) => (
                <article key={label} className="lp-metric-card">
                  <h3>{value}</h3>
                  <p>{label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="lp-section lp-section--grid">
          <div className="blog-container">
            <header className="lp-head text-center">
              <span className="bp-pill bp-pill--tag">Pricing Tiers</span>
              <h2>Flexible plans to match every stage of your business</h2>
              <p>Start with essential workflows, then scale into deeper automation and governance as complexity grows.</p>
            </header>

            <div className="mx-auto mb-6 flex w-fit items-center gap-1 rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-surface-card)] p-1" role="tablist" aria-label="Billing cycle">
              <button
                type="button"
                className={`lp-billing-btn${billing === "annual" ? " is-active" : ""}`}
                onClick={() => setBilling("annual")}
              >
                Bill Annually <span>Save 20%</span>
              </button>
              <button
                type="button"
                className={`lp-billing-btn${billing === "monthly" ? " is-active" : ""}`}
                onClick={() => setBilling("monthly")}
              >
                Bill Monthly
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {pricingPlans.map((plan) => (
                <article key={plan.name} className={`lp-price-card${plan.recommended ? " lp-price-card--recommended" : ""}`}>
                  {plan.recommended ? <span className="lp-recommend">Recommend</span> : null}
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                  <div className="lp-price-row">
                    <strong>{billing === "annual" ? plan.annualPrice : plan.monthlyPrice}</strong>
                    <span>{plan.suffix}</span>
                  </div>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <a href="#" className={`lp-btn ${plan.ctaVariant === "solid" ? "lp-btn--solid" : "lp-btn--outline"} w-full justify-center`}>
                    {plan.ctaLabel}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="lp-section">
          <div className="blog-container">
            <div className="lp-cta-panel">
              <div>
                <span className="lp-chip">Ready to Start</span>
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
                  Modernize your printing ERP with one cohesive platform
                </h2>
                <p className="mt-4 max-w-2xl text-white/80">Start building a faster, cleaner, and more predictable operation with Cetakia.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/6281200000000?text=Halo%20tim%20Cetakia,%20saya%20ingin%20konsultasi%20paket%20langganan%20atau%20demo."
                  className="lp-btn lp-btn--light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Demo
                </a>
                <a href="#" className="lp-btn lp-btn--contrast">
                  Start Free Trial
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="lp-section">
          <div className="blog-container">
            <header className="lp-head text-center">
              <span className="bp-pill bp-pill--tag">FAQ</span>
              <h2>Frequently asked questions</h2>
              <p>
                Need a tailored explanation?{" "}
                <a href="https://wa.me/6281200000000" target="_blank" rel="noopener noreferrer" className="text-[var(--ui-color-primary)] underline">
                  Chat with our team
                </a>
                .
              </p>
            </header>

            <Accordion items={faqItems} className="mx-auto max-w-4xl" />
          </div>
        </section>
      </main>

      <SiteFooter site={site} sectionLinksOverride={sectionLinks} />
    </div>
  );
}
