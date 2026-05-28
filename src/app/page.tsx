import type { Metadata } from "next";

import { LandingPage } from "@/features/landing/pages/LandingPage";
import { getSiteData } from "@/features/blogs/services/blog.service";

export const metadata: Metadata = {
  title: "Cetakia Landing Page | One Stop Printing System Solution",
  description:
    "Cetakia unifies sales, production, inventory, accounting, and reporting for printing businesses in one connected platform.",
};

export default function HomePage() {
  const site = getSiteData();

  return <LandingPage site={site} />;
}
