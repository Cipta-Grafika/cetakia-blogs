"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type GoogleAnalyticsPageViewProps = {
  measurementId: string;
};

export function GoogleAnalyticsPageView({ measurementId }: GoogleAnalyticsPageViewProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    if (!pathname || typeof window.gtag !== "function") {
      return;
    }

    const pagePath = search ? `${pathname}?${search}` : pathname;
    window.gtag("config", measurementId, { page_path: pagePath });
  }, [measurementId, pathname, search]);

  return null;
}
