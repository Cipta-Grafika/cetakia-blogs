"use client";

import { useEffect, useState } from "react";
import { UiIcon } from "@/features/global/components/UiIcon";

export type LandingTestimonial = {
  quote: string;
  name: string;
  role: string;
};

export type LandingMetric = {
  value: string;
  label: string;
};

type LandingOutcomesSectionProps = {
  testimonials: LandingTestimonial[];
  metrics: LandingMetric[];
};

const QUOTE_INTERVAL_MS = 5000;
const QUOTE_FADE_MS = 260;

export function LandingOutcomesSection({ testimonials, metrics }: LandingOutcomesSectionProps) {
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
  }, [testimonials.length]);

  return (
    <>
      <article className="lp-quote-card text-center">
        <UiIcon name="bi-quote" className="lp-quote-icon" />
        <div className={`lp-quote-body${isQuoteVisible ? " is-visible" : ""}`} data-quote-body>
          <p>“{quote.quote}”</p>
          <div className="grid gap-1">
            <strong>{quote.name}</strong>
            <span>{quote.role}</span>
          </div>
        </div>
      </article>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.label} className="lp-metric-card">
            <h3>{metric.value}</h3>
            <p>{metric.label}</p>
          </article>
        ))}
      </div>
    </>
  );
}
