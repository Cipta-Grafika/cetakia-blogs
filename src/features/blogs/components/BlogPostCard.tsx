import Link from "next/link";
import Image from "next/image";

import type { BlogArticleCard } from "@/features/blogs/types/blog.type";
import { UiIcon } from "@/features/global/components/UiIcon";

type BlogPostCardProps = {
  article: BlogArticleCard;
  href?: string;
  priority?: boolean;
  fetchPriority?: "high" | "low";
};

function getOptimizedCardImageSrc(src: string): string {
  if (!src.includes("images.unsplash.com") || src.includes("h=")) {
    return src;
  }

  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}h=675`;
}

export function BlogPostCard({ article, href = "#", priority = false, fetchPriority }: BlogPostCardProps) {
  return (
    <article className="bp-post-card">
      <Link href={href} className="bp-post-card__image-wrap">
        <Image
          src={getOptimizedCardImageSrc(article.image)}
          alt={article.alt}
          width={1200}
          height={675}
          quality={72}
          sizes="(max-width: 767px) 82vw, (max-width: 1199px) 46vw, 260px"
          priority={priority}
          fetchPriority={fetchPriority}
          loading={priority ? "eager" : undefined}
        />
        <span className="bp-post-card__badge">{article.category}</span>
      </Link>
      <div className="bp-post-card__body">
        <h3>
          <Link href={href}>{article.title}</Link>
        </h3>
        <p className="bp-post-card__author">
          {article.postedByPrefix} <strong>{article.author}</strong>
        </p>
        <p className="bp-post-card__meta">
          {article.date} &bull; {article.readTime}
        </p>
        <Link href={href} className="bp-read-more" aria-label={`Read more about ${article.title}`}>
          Read more <span className="sr-only">about {article.title}</span> <UiIcon name="bi-arrow-right" />
        </Link>
      </div>
    </article>
  );
}
