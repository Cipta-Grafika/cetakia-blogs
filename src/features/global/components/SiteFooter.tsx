import type { SiteData } from "@/features/blogs/types/blog.type";
import { ThemeLogo } from "@/features/global/components/ThemeLogo";

type SiteFooterProps = {
  site: SiteData;
  sectionLinksOverride?: Array<{ label: string; href: string }>;
};

export function SiteFooter({ site, sectionLinksOverride }: SiteFooterProps) {
  const [productColumn, platformColumn, getStartedColumn] = site.footer.columns;
  const productLinks = sectionLinksOverride ?? productColumn.links ?? [];
  const logoLight = site.brand.logoLight ?? site.brand.logo;
  const logoDark = site.brand.logoDark ?? site.brand.logo;

  return (
    <footer className="blog-site-footer mt-10 border-t border-[var(--ui-border-subtle)] bg-[var(--ui-surface-card)]">
      <div className="blog-container">
        <div className="blog-site-footer__inner grid w-full grid-cols-2 gap-x-4 gap-y-8 py-10 lg:grid-cols-[1.35fr_0.9fr_1fr_0.85fr] lg:gap-x-12 lg:gap-y-10">
          <section className="blog-site-footer__col blog-site-footer__col--brand col-span-2 space-y-3 lg:col-span-1">
            <ThemeLogo
              lightSrc={logoLight}
              darkSrc={logoDark}
              alt={site.brand.logoAlt}
              className="blog-site-footer__logo h-15 w-auto object-contain md:h-20"
              width={220}
              height={80}
            />
            <p className="blog-site-footer__text blog-site-footer__text--full">{site.footer.description}</p>
          </section>

          <section className="blog-site-footer__col blog-site-footer__col--product">
            <h2 className="blog-site-footer__title">{productColumn.title}</h2>
            <ul className="blog-site-footer__list">
              {productLinks.map((link) => (
                <li key={`footer-product-${link.label}`}>
                  <a href={link.href} className="blog-site-footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="blog-site-footer__col blog-site-footer__col--platform">
            <h2 className="blog-site-footer__title">{platformColumn.title}</h2>
            <ul className="blog-site-footer__list">
              {(platformColumn.items ?? []).map((item) => (
                <li key={`footer-platform-${item}`}>
                  <span className="blog-site-footer__muted">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="blog-site-footer__col blog-site-footer__col--start col-span-2 lg:col-span-1">
            <h2 className="blog-site-footer__title">{getStartedColumn.title}</h2>
            <ul className="blog-site-footer__list">
              {(getStartedColumn.links ?? []).map((link) => (
                <li key={`footer-start-${link.label}`}>
                  <a href={link.href} className="blog-site-footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="blog-container">
        <div className="blog-site-footer__bottom flex w-full flex-col items-center gap-2 border-t border-[var(--ui-border-soft)] py-4 text-center text-sm md:flex-row md:items-center md:justify-between md:text-left">
          <span className="blog-site-footer__muted">{site.footer.bottom.copyright}</span>
          <div className="flex items-center justify-center gap-4 md:justify-end">
            {site.footer.bottom.links.map((link) => (
              <a key={`footer-bottom-${link.label}`} href={link.href} className="blog-site-footer__link">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
