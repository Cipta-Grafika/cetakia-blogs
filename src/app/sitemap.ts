import type { MetadataRoute } from "next";

import { getBlogDetailStaticParams } from "@/features/blogs/services/blog.service";

const siteUrl = "https://cetakia.com";
const lastModified = new Date("2026-06-14T00:00:00+07:00");

const toUrl = (path: string) => `${siteUrl}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const blogParams = getBlogDetailStaticParams();
  const defaultBlogSlugs = blogParams.defaultLocale.map(({ slug }) => slug);
  const idBlogSlugs = blogParams.idLocale.map(({ slug }) => slug);
  const enBlogSlugs = blogParams.enLocale.map(({ slug }) => slug);

  const routes: MetadataRoute.Sitemap = [
    {
      url: toUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: toUrl("/about"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: toUrl("/contact-us"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: toUrl("/blogs"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: toUrl("/blogs/categories"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: toUrl("/blogs/tags"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  defaultBlogSlugs.forEach((slug) => {
    routes.push({
      url: toUrl(`/blogs/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  });

  idBlogSlugs.forEach((slug) => {
    routes.push({
      url: toUrl(`/blogs/id/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  enBlogSlugs.forEach((slug) => {
    routes.push({
      url: toUrl(`/blogs/en/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  return routes;
}
