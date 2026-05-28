"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import type { NavLink, SiteData } from "@/features/blogs/types/blog.type";
import { ThemeLogo } from "@/features/global/components/ThemeLogo";

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
  const themeStorageKey = "bp_theme_v2";
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const primaryLinks = navLinks ?? site.primaryNavigation;
  const logoLight = site.brand.logoLight ?? site.brand.logo;
  const logoDark = site.brand.logoDark ?? site.brand.logo;
  const lightThemeIcon = site.headerActions.themeToggleIcons.light;
  const darkThemeIcon = site.headerActions.themeToggleIcons.dark;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const stored = localStorage.getItem(themeStorageKey);
    if (stored !== "dark") return;

    const rafId = window.requestAnimationFrame(() => {
      setTheme("dark");
    });

    return () => window.cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem(themeStorageKey, next);
    window.dispatchEvent(new CustomEvent("bp-theme-change", { detail: { theme: next } }));
  };

  const themeIconRaw = theme === "dark" ? darkThemeIcon : lightThemeIcon;
  const themeIcon = themeIconRaw.startsWith("bi ") ? themeIconRaw : `bi ${themeIconRaw}`;

  return (
    <>
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
                <a key={`${link.label}-${link.href}`} href={link.href} className="blog-site-nav__link">
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="blog-site-nav__actions justify-self-end">
              <div className="blog-site-nav__cta-group hidden items-center lg:flex">
                <a href={site.headerActions.login.href} className="blog-site-nav__cta blog-site-nav__cta--ghost inline-flex items-center justify-center">
                  {site.headerActions.login.label}
                </a>
                <a
                  href={startNowHref ?? site.headerActions.startNow.href}
                  className="blog-site-nav__cta blog-site-nav__cta--solid inline-flex items-center justify-center"
                >
                  {site.headerActions.startNow.label}
                </a>
              </div>

              <button
                type="button"
                className="blog-site-nav__theme hidden lg:inline-flex"
                aria-label="Toggle theme"
                aria-pressed={theme === "dark"}
                onClick={toggleTheme}
              >
                <i className={themeIcon} />
              </button>

              <button
                type="button"
                className="blog-site-nav__theme inline-flex lg:hidden"
                aria-label="Toggle theme"
                aria-pressed={theme === "dark"}
                onClick={toggleTheme}
              >
                <i className={themeIcon} />
              </button>

              <button
                type="button"
                className={`blog-site-nav__hamburger inline-flex lg:hidden${drawerOpen ? " is-open" : ""}`}
                aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-controls={drawerId}
                aria-expanded={drawerOpen}
                onClick={() => setDrawerOpen((open) => !open)}
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

      <div className={`blog-nav-mobile lg:hidden${drawerOpen ? " is-open" : ""}`} id={drawerId} aria-hidden={!drawerOpen}>
        <div className="blog-container">
          <div className="blog-nav-mobile__inner">
            <nav className="blog-nav-mobile__menu" aria-label="Mobile and tablet navigation">
              {primaryLinks.map((link) => (
                <a
                  key={`mobile-${link.label}-${link.href}`}
                  href={link.href}
                  className="blog-nav-mobile__link"
                  onClick={() => setDrawerOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="blog-nav-mobile__actions">
              <a
                href={site.headerActions.login.href}
                className="blog-site-nav__cta blog-site-nav__cta--ghost inline-flex items-center justify-center"
                onClick={() => setDrawerOpen(false)}
              >
                {site.headerActions.login.label}
              </a>
              <a
                href={startNowHref ?? site.headerActions.startNow.href}
                className="blog-site-nav__cta blog-site-nav__cta--solid inline-flex items-center justify-center"
                onClick={() => setDrawerOpen(false)}
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
