import type { Metadata } from "next";
import "@/styles/shared/blogs.css";

import { BlogTagPage } from "@/features/blogs/pages/BlogTagPage";
import { getSiteData, getTagListingDataset } from "@/features/blogs/services/blog.service";

export function generateMetadata(): Metadata {
  const { page } = getTagListingDataset();

  return {
    title: page.seo.title,
    description: page.seo.description,
  };
}

type PageProps = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function BlogTagsPage({ searchParams }: PageProps) {
  const { tag } = await searchParams;
  const activeTag = tag ? decodeURIComponent(tag) : "ERP";
  const site = getSiteData();
  const { page, cards } = getTagListingDataset(activeTag);

  return <BlogTagPage site={site} data={page} cards={cards} />;
}
