import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticlePage } from "@/features/blogs/pages/BlogArticlePage";
import { getBlogDetailPageBySlug, getBlogDetailStaticParams, getSiteData } from "@/features/blogs/services/blog.service";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogDetailStaticParams().defaultLocale;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getBlogDetailPageBySlug({ slug, locale: "id" });

  if (!page) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: page.seo.title,
    description: page.seo.description,
  };
}

export default async function BlogDetailDefaultPage({ params }: PageProps) {
  const { slug } = await params;
  const site = getSiteData();
  const page = getBlogDetailPageBySlug({ slug, locale: "id" });

  if (!page) notFound();

  return <BlogArticlePage site={site} data={page} articlePath={`/blogs/${slug}`} />;
}
