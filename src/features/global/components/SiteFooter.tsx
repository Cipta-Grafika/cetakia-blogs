import type { SiteData } from "@/features/blogs/types/blog.type";
import { SocialLinksRow } from "@/features/global/components/SocialLinksRow";
import { ThemeLogo } from "@/features/global/components/ThemeLogo";
import { UiIcon } from "@/features/global/components/UiIcon";

type SiteFooterProps = {
  site: SiteData;
};

function getFooterContactClassName(icon?: string) {
  const iconName = icon?.toLowerCase() ?? "";
  const toneClass = iconName.includes("whatsapp")
    ? "blog-site-footer__contact-link--whatsapp"
    : iconName.includes("envelope")
      ? "blog-site-footer__contact-link--email"
      : "";

  return ["blog-site-footer__contact-link", toneClass].filter(Boolean).join(" ");
}

export function SiteFooter({ site }: SiteFooterProps) {
  const [productColumn, resourcesColumn, companyColumn] = site.footer.columns;
  const productLinks = productColumn.links ?? [];
  const contactLinks = site.footer.contactLinks ?? [];
  const socialLinks = site.footer.socialLinks ?? [];
  const copyrightText = site.footer.bottom.copyright;
  const brandText = "Cetakia";
  const brandStartIndex = copyrightText.indexOf(brandText);
  const hasBrandMention = brandStartIndex >= 0;
  const copyrightPrefix = hasBrandMention ? copyrightText.slice(0, brandStartIndex) : copyrightText;
  const copyrightSuffix = hasBrandMention ? copyrightText.slice(brandStartIndex + brandText.length) : "";
  const logoLight = site.brand.logoLight ?? site.brand.logo;
  const logoDark = site.brand.logoDark ?? site.brand.logo;

  return (
    <footer className="blog-site-footer mt-10 border-t border-[var(--ui-border-subtle)] bg-[var(--ui-surface-card)]">
      <div className="blog-container">
        <div className="blog-site-footer__inner grid w-full grid-cols-2 gap-x-4 gap-y-8 py-10 md:grid-cols-3 md:gap-x-8 lg:grid-cols-[2.15fr_0.62fr_0.78fr_0.62fr] lg:gap-x-8 lg:gap-y-10">
          <section className="blog-site-footer__col blog-site-footer__col--brand col-span-2 space-y-3 md:col-span-3 lg:col-span-1">
            <ThemeLogo
              lightSrc={logoLight}
              darkSrc={logoDark}
              alt={site.brand.logoAlt}
              className="blog-site-footer__logo"
              width={220}
              height={80}
            />
            <p className="blog-site-footer__text blog-site-footer__text--full">{site.footer.description}</p>
            {contactLinks.length > 0 ? (
              <ul className="blog-site-footer__contact-list" aria-label="Contact Cetakia">
                {contactLinks.map((link) => (
                  <li key={`footer-contact-${link.label}`}>
                    <a href={link.href} className={getFooterContactClassName(link.icon)}>
                      {link.icon ? <UiIcon name={link.icon} className="blog-site-footer__contact-icon" /> : null}
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            <SocialLinksRow
              links={socialLinks}
              className="blog-site-footer__social"
              linkClassName="blog-site-footer__social-link"
            />
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
            <h2 className="blog-site-footer__title">{resourcesColumn.title}</h2>
            <ul className="blog-site-footer__list">
              {resourcesColumn.links
                ? resourcesColumn.links.map((link) => (
                    <li key={`footer-resources-${link.label}`}>
                      <a href={link.href} className="blog-site-footer__link">
                        {link.label}
                      </a>
                    </li>
                  ))
                : resourcesColumn.items?.map((item) => (
                    <li key={`footer-platform-${item}`}>
                      <span className="blog-site-footer__muted">{item}</span>
                    </li>
                  ))}
            </ul>
          </section>

          <section className="blog-site-footer__col blog-site-footer__col--company col-span-2 md:col-span-1">
            <h2 className="blog-site-footer__title">{companyColumn.title}</h2>
            <ul className="blog-site-footer__list">
              {(companyColumn.links ?? []).map((link) => (
                <li key={`footer-company-${link.label}`}>
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
          <span className="blog-site-footer__muted">
            {copyrightPrefix}
            {hasBrandMention ? (
              <a href="https://cetakia.com" className="blog-site-footer__brand-link">
                {brandText}
              </a>
            ) : null}
            {copyrightSuffix}
          </span>
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
