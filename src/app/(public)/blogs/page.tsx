import type { Metadata } from "next";
import "@/styles/shared/blogs.css";

import { BlogExplorerPage } from "@/features/blogs/pages/BlogExplorerPage";
import { getBlogListingPageData, getSiteData } from "@/features/blogs/services/blog.service";

export function generateMetadata(): Metadata {
  const page = getBlogListingPageData();

  return {
    title: page.seo.title,
    description: page.seo.description,
    robots: page.seo.robots,
    authors: page.seo.author ? [{ name: page.seo.author }] : undefined,
    alternates: {
      canonical: "/blogs",
    },
    openGraph: {
      type: "website",
      siteName: page.seo.og?.siteName,
      title: page.seo.og?.title ?? page.seo.title,
      description: page.seo.og?.description ?? page.seo.description,
      url: "/blogs",
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.og?.title ?? page.seo.title,
      description: page.seo.og?.description ?? page.seo.description,
    },
  };
}

export default function BlogsPage() {
  const site = getSiteData();
  const page = getBlogListingPageData();

  return <BlogExplorerPage site={site} data={page} />;
}
