"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { NavLink, SiteData } from "@/features/blogs/types/blog.type";
import { InformationBar } from "@/features/global/components/InformationBar";
import { ThemeLogo } from "@/features/global/components/ThemeLogo";
import { UiIcon } from "@/features/global/components/UiIcon";

type SiteHeaderProps = {
  site: SiteData;
  navLinks?: NavLink[];
  startNowHref?: string;
  drawerId?: string;
  languageToggle?: {
    label: string;
    ariaLabel: string;
    icon: string;
    onToggle: () => void;
  };
};

const getHashSectionId = (href: string) => {
  const hashIndex = href.indexOf("#");
  if (hashIndex < 0) {
    return null;
  }

  const hash = href.slice(hashIndex + 1).trim();
  return hash.length > 0 ? decodeURIComponent(hash) : null;
};

const getStickyHeaderOffset = () => {
  const rootStyles = getComputedStyle(document.documentElement);
  const infoBarHeight = Number.parseFloat(rootStyles.getPropertyValue("--blog-info-bar-sticky-height")) || 0;
  const navHeight = Number.parseFloat(rootStyles.getPropertyValue("--blog-nav-sticky-height")) || 0;

  return infoBarHeight + navHeight;
};

export function SiteHeader({
  site,
  navLinks,
  startNowHref,
  drawerId = "public-nav-drawer",
  languageToggle,
}: SiteHeaderProps) {
  const primaryLinks = navLinks ?? site.primaryNavigation;
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const sectionIds = useMemo(
    () => Array.from(new Set(primaryLinks.map((link) => getHashSectionId(link.href)).filter((id): id is string => Boolean(id)))),
    [primaryLinks],
  );
  const logoLight = site.brand.logoLight ?? site.brand.logo;
  const logoDark = site.brand.logoDark ?? site.brand.logo;
  const lightThemeIcon = site.headerActions.themeToggleIcons.light;
  const darkThemeIcon = site.headerActions.themeToggleIcons.dark;

  const toIconName = (icon: string) => (icon.startsWith("bi ") ? icon.slice(3) : icon);
  const lightThemeIconName = toIconName(lightThemeIcon);
  const darkThemeIconName = toIconName(darkThemeIcon);
  const normalizeHeaderHref = (href: string) => (href.startsWith("#") ? `/${href}` : href);
  const languageIconName = languageToggle ? toIconName(languageToggle.icon) : null;

  useEffect(() => {
    if (sectionIds.length === 0) {
      const resetFrameId = window.requestAnimationFrame(() => setActiveSectionId(null));
      return () => window.cancelAnimationFrame(resetFrameId);
    }

    let animationFrameId = 0;

    const updateActiveSection = () => {
      const anchorY = window.scrollY + getStickyHeaderOffset() + 8;
      let nextActiveSectionId: string | null = null;

      sectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (!section) {
          return;
        }

        const top = section.getBoundingClientRect().top + window.scrollY;
        const bottom = top + section.offsetHeight;

        if (anchorY >= top && anchorY < bottom) {
          nextActiveSectionId = sectionId;
        }
      });

      setActiveSectionId(nextActiveSectionId);
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updateActiveSection);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, [sectionIds]);

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
              {primaryLinks.map((link) => {
                const sectionId = getHashSectionId(link.href);
                const isActive = sectionId !== null && activeSectionId === sectionId;

                return (
                  <a
                    key={`${link.label}-${link.href}`}
                    href={normalizeHeaderHref(link.href)}
                    className={`blog-site-nav__link${isActive ? " is-active" : ""}`}
                    aria-current={isActive ? "location" : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
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

              {languageToggle ? (
                <button
                  type="button"
                  className="blog-site-nav__theme blog-site-nav__language hidden lg:inline-flex"
                  aria-label={languageToggle.ariaLabel}
                  onClick={languageToggle.onToggle}
                >
                  {languageIconName ? <UiIcon name={languageIconName} className="blog-site-nav__language-icon" /> : null}
                  <span className="blog-site-nav__language-label">{languageToggle.label}</span>
                </button>
              ) : null}

              <button
                type="button"
                className="blog-site-nav__theme inline-flex lg:hidden"
                aria-label="Toggle theme"
                data-theme-toggle
              >
                <UiIcon name={lightThemeIconName} className="blog-site-nav__theme-icon blog-site-nav__theme-icon--light" />
                <UiIcon name={darkThemeIconName} className="blog-site-nav__theme-icon blog-site-nav__theme-icon--dark" />
              </button>

              {languageToggle ? (
                <button
                  type="button"
                  className="blog-site-nav__theme blog-site-nav__language inline-flex lg:hidden"
                  aria-label={languageToggle.ariaLabel}
                  onClick={languageToggle.onToggle}
                >
                  {languageIconName ? <UiIcon name={languageIconName} className="blog-site-nav__language-icon" /> : null}
                  <span className="blog-site-nav__language-label">{languageToggle.label}</span>
                </button>
              ) : null}

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
              {primaryLinks.map((link) => {
                const sectionId = getHashSectionId(link.href);
                const isActive = sectionId !== null && activeSectionId === sectionId;

                return (
                  <a
                    key={`mobile-${link.label}-${link.href}`}
                    href={normalizeHeaderHref(link.href)}
                    className={`blog-nav-mobile__link${isActive ? " is-active" : ""}`}
                    aria-current={isActive ? "location" : undefined}
                    data-nav-close
                  >
                    {link.label}
                  </a>
                );
              })}
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
