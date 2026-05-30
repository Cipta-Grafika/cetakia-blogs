import Image from "next/image";
import Link from "next/link";

import type { BlogDetailPageData } from "@/features/blogs/types/blog.type";

type ArticleTeaser = BlogDetailPageData["rightSidebar"]["relatedArticles"][number];

type BlogArticleRecommendationsSidebarProps = {
  relatedArticles: ArticleTeaser[];
  popularArticles: ArticleTeaser[];
};

function BlogArticleTeaserList({
  headingId,
  title,
  items,
}: {
  headingId: string;
  title: string;
  items: ArticleTeaser[];
}) {
  const getOptimizedImageSrc = (src: string) => {
    if (!src.includes("images.unsplash.com") || src.includes("h=")) {
      return src;
    }

    const separator = src.includes("?") ? "&" : "?";
    return `${src}${separator}h=400`;
  };

  return (
    <section className="blog-side-card" aria-labelledby={headingId}>
      <h2 id={headingId} className="blog-side-card__title">
        {title}
      </h2>
      <ul className="blog-article-list">
        {items.map((article) => (
          <li key={article.title}>
            <Link href="#" className="blog-mini-card">
              <Image
                className="blog-mini-card__thumb"
                src={getOptimizedImageSrc(article.image)}
                alt={article.alt}
                width={400}
                height={400}
                quality={68}
                sizes="67px"
              />
              <span className="blog-mini-card__body">
                <span className="blog-mini-card__title-link">{article.title}</span>
                <span className="blog-mini-card__meta">{article.readTime}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function BlogArticleRecommendationsSidebar({ relatedArticles, popularArticles }: BlogArticleRecommendationsSidebarProps) {
  return (
    <aside className="blog-sidebar blog-sidebar--right" aria-label="Recommended articles sidebar">
      <BlogArticleTeaserList headingId="related-heading" title="Related Articles" items={relatedArticles} />
      <BlogArticleTeaserList headingId="popular-heading" title="Popular Article" items={popularArticles} />
    </aside>
  );
}
