import { BlogHero } from "@/features/blogs/components/BlogHero";
import { BlogPostCard } from "@/features/blogs/components/BlogPostCard";
import { BlogPostScroller } from "@/features/blogs/components/BlogPostScroller";
import { BlogSearchBox } from "@/features/blogs/components/BlogSearchBox";
import { NewsletterSection } from "@/features/blogs/components/NewsletterSection";
import { SiteFooter } from "@/features/global/components/SiteFooter";
import { SiteHeader } from "@/features/global/components/SiteHeader";
import type { BlogPageData, SiteData } from "@/features/blogs/types/blog.type";
import Link from "next/link";

type BlogExplorerPageProps = {
  site: SiteData;
  data: BlogPageData;
};

export function BlogExplorerPage({ site, data }: BlogExplorerPageProps) {
  const lcpCandidateAlts = new Set<string>([
    "Latest post article cover two",
    "ERP update article cover",
    "Product update article cover",
  ]);

  return (
    <div className="bp-shell bg-[var(--ui-surface-page)] text-[var(--ui-text-primary)]">
      <SiteHeader site={site} />
      <BlogHero title={data.hero.title} subtitle={data.hero.subtitle} />

      <main className="bp-page" id="main-content">
        <div className="blog-container">
          <BlogSearchBox search={data.search} />

          <section className="bp-filter-grid" aria-label="Category and tags">
            <article className="bp-filter-card">
              <h2>Categories</h2>
              <div className="bp-pill-group">
                {data.filters.categories.map((category, index) => (
                  <button key={category} type="button" className={`bp-pill${index === 0 ? " is-active" : ""}`}>
                    {category}
                  </button>
                ))}
              </div>
            </article>

            <article className="bp-filter-card">
              <h2>Tags</h2>
              <div className="bp-pill-group bp-pill-group--tags">
                {data.filters.tags.map((tag) => (
                  <button key={tag} type="button" className="bp-pill bp-pill--tag">
                    {tag}
                  </button>
                ))}
              </div>
            </article>
          </section>

          {data.sections.map((section, sectionIndex) => (
            <section key={section.id} className="bp-post-section" aria-labelledby={`${section.id}-heading`}>
              <div className={`bp-section-head${section.centerTitle ? " bp-section-head--center" : ""}`}>
                <h2 id={`${section.id}-heading`}>{section.title}</h2>
                {section.showViewAll ? (
                  <Link href="/blogs/categories" className="bp-view-all">
                    View all
                  </Link>
                ) : null}
              </div>

              <BlogPostScroller>
                {section.articles.map((article, articleIndex) => {
                  const shouldPrioritize =
                    (sectionIndex === 0 && articleIndex < 2) ||
                    lcpCandidateAlts.has(article.alt);

                  return (
                  <BlogPostCard
                    key={`${section.id}-${article.title}`}
                    article={article}
                    href="/blogs/erp-pengertian-fungsi-dan-manfaatnya-dalam-bisnis-percetakan"
                    priority={shouldPrioritize}
                    fetchPriority={shouldPrioritize ? "high" : undefined}
                  />
                  );
                })}
              </BlogPostScroller>
            </section>
          ))}

          <NewsletterSection newsletter={site.newsletter} />
        </div>
      </main>

      <SiteFooter site={site} />
    </div>
  );
}
