"use client";

import { useState } from "react";

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

type BillingCycle = "annual" | "monthly";

type LandingPricingSectionProps = {
  plans: LandingPricingPlan[];
};

export function LandingPricingSection({ plans }: LandingPricingSectionProps) {
  const [billing, setBilling] = useState<BillingCycle>("annual");

  return (
    <>
      <div
        className="mx-auto mb-6 flex w-fit items-center gap-1 rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-surface-card)] p-1"
        role="group"
        aria-label="Billing cycle"
      >
        <button
          type="button"
          className={`lp-billing-btn${billing === "annual" ? " is-active" : ""}`}
          aria-pressed={billing === "annual"}
          onClick={() => setBilling("annual")}
        >
          Bill Annually <span>Save 20%</span>
        </button>
        <button
          type="button"
          className={`lp-billing-btn${billing === "monthly" ? " is-active" : ""}`}
          aria-pressed={billing === "monthly"}
          onClick={() => setBilling("monthly")}
        >
          Bill Monthly
        </button>
      </div>

      <div className={`lp-pricing-grid grid gap-4 sm:grid-cols-2 xl:grid-cols-5 lp-pricing-grid--${billing}`}>
        {plans.map((plan) => (
          <article key={plan.name} className={`lp-price-card lp-price-card--reveal${plan.recommended ? " lp-price-card--recommended" : ""}`}>
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
    </>
  );
}
