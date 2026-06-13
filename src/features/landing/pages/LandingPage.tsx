import "@/styles/shared/landing_page.css";
import "@/styles/shared/blogs.css";
import "@/styles/components/accordion.css";

import landingContentJson from "@/data/landing_content.json";
import type { SiteData } from "@/features/blogs/types/blog.type";
import { LandingPageClient } from "@/features/landing/pages/LandingPageClient";
import type { LandingContentRoot } from "@/features/landing/types/landing.type";

type LandingPageProps = {
  site: SiteData;
};

const landingContent = landingContentJson as LandingContentRoot;

export function LandingPage({ site }: LandingPageProps) {
  return <LandingPageClient site={site} contentRoot={landingContent} />;
}
