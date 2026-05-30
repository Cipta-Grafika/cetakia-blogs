import Link from "next/link";

import type { NavLink, SiteData } from "@/features/blogs/types/blog.type";
import { InformationBar } from "@/features/global/components/InformationBar";
import { ThemeLogo } from "@/features/global/components/ThemeLogo";
import { UiIcon } from "@/features/global/components/UiIcon";

type SiteHeaderProps = {
  site: SiteData;
  navLinks?: NavLink[];
  startNowHref?: string;
  drawerId?: string;
};

export function SiteHeader({
  site,
  navLinks,
  startNowHref,
  drawerId = "public-nav-drawer",
}: SiteHeaderProps) {
  const primaryLinks = navLinks ?? site.primaryNavigation;
  const logoLight = site.brand.logoLight ?? site.brand.logo;
  const logoDark = site.brand.logoDark ?? site.brand.logo;
  const lightThemeIcon = site.headerActions.themeToggleIcons.light;
  const darkThemeIcon = site.headerActions.themeToggleIcons.dark;

  const toIconName = (icon: string) => (icon.startsWith("bi ") ? icon.slice(3) : icon);
  const lightThemeIconName = toIconName(lightThemeIcon);
  const darkThemeIconName = toIconName(darkThemeIcon);
  const normalizeHeaderHref = (href: string) => (href.startsWith("#") ? `/${href}` : href);

  return (
    <>
      <InformationBar informationBar={site.informationBar} />
      <header className="blog-site-nav sticky top-0 z-50 border-b border-[var(--ui-border-subtle)]">
        <div className="blog-container">
          <div className="blog-site-nav__inner grid w-full items-center gap-4">
            <Link href="/" className="blog-site-nav__brand inline-flex items-center justify-self-start" aria-label="Cetakia home">
              <ThemeLogo
                lightSrc={logoLight}
                darkSrc={logoDark}
                alt={site.brand.logoAlt}
                className="blog-site-nav__logo h-auto w-[150px] object-contain"
                width={150}
                height={60}
                priority
              />
            </Link>

            <nav className="blog-site-nav__menu hidden items-center justify-center justify-self-center lg:flex" aria-label="Primary navigation">
              {primaryLinks.map((link) => (
                <a key={`${link.label}-${link.href}`} href={normalizeHeaderHref(link.href)} className="blog-site-nav__link">
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="blog-site-nav__actions justify-self-end">
              <div className="blog-site-nav__cta-group hidden items-center lg:flex">
                <a
                  href={normalizeHeaderHref(startNowHref ?? site.headerActions.startNow.href)}
                  className="blog-site-nav__cta blog-site-nav__cta--solid inline-flex items-center justify-center"
                >
                  {site.headerActions.startNow.label}
                </a>
              </div>

              <button
                type="button"
                className="blog-site-nav__theme hidden lg:inline-flex"
                aria-label="Toggle theme"
                data-theme-toggle
              >
                <UiIcon name={lightThemeIconName} className="blog-site-nav__theme-icon blog-site-nav__theme-icon--light" />
                <UiIcon name={darkThemeIconName} className="blog-site-nav__theme-icon blog-site-nav__theme-icon--dark" />
              </button>

              <button
                type="button"
                className="blog-site-nav__theme inline-flex lg:hidden"
                aria-label="Toggle theme"
                data-theme-toggle
              >
                <UiIcon name={lightThemeIconName} className="blog-site-nav__theme-icon blog-site-nav__theme-icon--light" />
                <UiIcon name={darkThemeIconName} className="blog-site-nav__theme-icon blog-site-nav__theme-icon--dark" />
              </button>

              <button
                type="button"
                className="blog-site-nav__hamburger inline-flex lg:hidden"
                aria-label="Open navigation menu"
                aria-controls={drawerId}
                aria-expanded="false"
                data-nav-toggle
              >
                <span className="blog-site-nav__hamburger-lines" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="blog-nav-mobile lg:hidden" id={drawerId} aria-hidden="true" data-nav-mobile>
        <div className="blog-container">
          <div className="blog-nav-mobile__inner">
            <nav className="blog-nav-mobile__menu" aria-label="Mobile and tablet navigation">
              {primaryLinks.map((link) => (
                <a
                  key={`mobile-${link.label}-${link.href}`}
                  href={normalizeHeaderHref(link.href)}
                  className="blog-nav-mobile__link"
                  data-nav-close
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="blog-nav-mobile__actions">
              <a
                href={normalizeHeaderHref(startNowHref ?? site.headerActions.startNow.href)}
                className="blog-site-nav__cta blog-site-nav__cta--solid inline-flex items-center justify-center"
                data-nav-close
              >
                {site.headerActions.startNow.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
