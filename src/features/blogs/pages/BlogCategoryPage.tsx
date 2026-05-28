import { BlogHero } from "@/features/blogs/components/BlogHero";
import { BlogPostCard } from "@/features/blogs/components/BlogPostCard";
import { NewsletterSection } from "@/features/blogs/components/NewsletterSection";
import { SiteFooter } from "@/features/global/components/SiteFooter";
import { SiteHeader } from "@/features/global/components/SiteHeader";
import type { BlogArticleCard, CategoryPageData, SiteData } from "@/features/blogs/types/blog.type";

type BlogCategoryPageProps = {
  site: SiteData;
  data: CategoryPageData;
  cards: BlogArticleCard[];
};

export function BlogCategoryPage({ site, data, cards }: BlogCategoryPageProps) {
  return (
    <div className="bg-[var(--ui-surface-page)] text-[var(--ui-text-primary)]">
      <SiteHeader site={site} />
      <BlogHero
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        childrenTop={(
          <nav className="bc-breadcrumb" aria-label="Breadcrumb">
            {data.hero.breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${crumb.href ?? "current"}`} className="inline-flex items-center gap-2">
                {crumb.current ? (
                  <span aria-current="page">{crumb.label}</span>
                ) : (
                  <a href={crumb.href ?? "#"}>{crumb.label}</a>
                )}
                {index < data.hero.breadcrumbs.length - 1 ? (
                  <i className={`bi ${data.hero.breadcrumbSeparatorIcon}`} aria-hidden="true" />
                ) : null}
              </span>
            ))}
          </nav>
        )}
      />

      <main className="bp-page" id="main-content">
        <div className="blog-container">
          <section className="bp-post-section" aria-labelledby="category-heading">
            <div className="bp-section-head">
              <h2 id="category-heading">{data.sectionHeader.title}</h2>
              <p className="bc-section-meta">{data.sectionHeader.meta}</p>
            </div>

            <div className="bp-post-grid">
              {cards.map((article) => (
                <BlogPostCard key={article.title} article={article} href="/blogs/erp-pengertian-fungsi-dan-manfaatnya-dalam-bisnis-percetakan" />
              ))}
            </div>
          </section>

          <nav className="bc-pagination" aria-label="Blog category pagination">
            {data.pagination.items.map((item, index) => {
              if (item.type === "ellipsis") {
                return (
                  <span key={`ellipsis-${index}`} className="bc-page-dots" aria-hidden="true">
                    {item.label ?? "..."}
                  </span>
                );
              }

              const icon = item.icon ? <i className={`bi ${item.icon}`} aria-hidden="true" /> : null;
              const className = [
                "bc-page-btn",
                item.active ? "is-active" : "",
                item.type === "prev" ? "bc-page-btn--prev" : "",
                item.type === "next" ? "bc-page-btn--next" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <a
                  key={`${item.type}-${item.value ?? index}`}
                  href="#"
                  className={className}
                  aria-current={item.active ? "page" : undefined}
                  aria-label={item.type === "prev" ? "Previous page" : item.type === "next" ? "Next page" : undefined}
                >
                  {icon ?? item.value}
                </a>
              );
            })}
          </nav>

          <NewsletterSection newsletter={site.newsletter} />
        </div>
      </main>

      <SiteFooter site={site} />
    </div>
  );
}
