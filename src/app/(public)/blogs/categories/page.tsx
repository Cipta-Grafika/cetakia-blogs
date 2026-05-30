import type { Metadata } from "next";
import "@/styles/shared/blogs.css";

import { BlogCategoryPage } from "@/features/blogs/pages/BlogCategoryPage";
import { getCategoryListingDataset, getSiteData } from "@/features/blogs/services/blog.service";

export function generateMetadata(): Metadata {
  const { page } = getCategoryListingDataset();

  return {
    title: page.seo.title,
    description: page.seo.description,
  };
}

type PageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogCategoriesPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const activeCategory = category ? decodeURIComponent(category) : "Products";
  const site = getSiteData();
  const { page, cards } = getCategoryListingDataset(activeCategory);

  return <BlogCategoryPage site={site} data={page} cards={cards} />;
}
