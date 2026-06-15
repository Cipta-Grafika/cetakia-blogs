import { Suspense } from "react";
import Script from "next/script";

import { GoogleAnalyticsPageView } from "@/features/global/components/GoogleAnalyticsPageView";
import { GOOGLE_ANALYTICS_MEASUREMENT_ID } from "@/features/global/constants/analytics";

const googleAnalyticsInitScript = `
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
  window.gtag("js", new Date());
  window.gtag("config", ${JSON.stringify(GOOGLE_ANALYTICS_MEASUREMENT_ID)}, { send_page_view: false });
`;

export function GoogleAnalyticsHead() {
  if (!GOOGLE_ANALYTICS_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: googleAnalyticsInitScript }} />
    </>
  );
}

export function GoogleAnalyticsPageViewTracker() {
  if (!GOOGLE_ANALYTICS_MEASUREMENT_ID) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsPageView measurementId={GOOGLE_ANALYTICS_MEASUREMENT_ID} />
    </Suspense>
  );
}
