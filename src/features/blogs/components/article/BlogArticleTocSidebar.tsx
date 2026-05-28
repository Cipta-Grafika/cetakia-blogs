import type { TocNode } from "@/features/blogs/types/blog.type";

type BlogArticleTocSidebarProps = {
  tableOfContents: TocNode[];
  categoryBadges: string[];
};

function TocList({ items, nested = false }: { items: TocNode[]; nested?: boolean }) {
  return (
    <ol className={nested ? undefined : "blog-toc__list"}>
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href}>{item.title}</a>
          {item.children?.length ? <TocList items={item.children} nested /> : null}
        </li>
      ))}
    </ol>
  );
}

export function BlogArticleTocSidebar({ tableOfContents, categoryBadges }: BlogArticleTocSidebarProps) {
  return (
    <aside className="blog-sidebar blog-sidebar--left" aria-label="Table of contents sidebar">
      <section className="blog-side-card blog-side-card--toc" aria-labelledby="toc-heading">
        <h2 id="toc-heading" className="blog-side-card__title">
          Table of contents
        </h2>

        <nav className="blog-toc blog-toc--desktop" aria-label="Table of contents">
          <TocList items={tableOfContents} />
        </nav>

        <details className="blog-toc-mobile">
          <summary>View Content Navigation</summary>
          <nav className="blog-toc blog-toc--mobile" aria-label="Table of contents mobile">
            <TocList items={tableOfContents} />
          </nav>
        </details>

        <div className="blog-category-badges" aria-label="Article categories">
          {categoryBadges.map((badge) => (
            <span key={badge} className="blog-category-badges__item">
              {badge}
            </span>
          ))}
        </div>
      </section>
    </aside>
  );
}

