import { Suspense } from "react";

import { GoogleAnalyticsPageView } from "@/features/global/components/GoogleAnalyticsPageView";
import { GOOGLE_ANALYTICS_MEASUREMENT_ID } from "@/features/global/constants/analytics";

const googleAnalyticsInitScript = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = window.gtag || gtag;
  gtag("js", new Date());
  gtag("config", ${JSON.stringify(GOOGLE_ANALYTICS_MEASUREMENT_ID)});
`;

export function GoogleAnalyticsHead() {
  if (!GOOGLE_ANALYTICS_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_MEASUREMENT_ID}`} />
      <script id="google-analytics-init" dangerouslySetInnerHTML={{ __html: googleAnalyticsInitScript }} />
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
