(() => {
  try {
    const nav = performance.getEntriesByType?.("navigation")?.[0];
    const navType = nav && "type" in nav ? nav.type : performance.navigation?.type === 1 ? "reload" : "navigate";
    if (navType === "reload") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }

      if (window.location.hash) {
        history.replaceState(history.state ?? null, "", window.location.pathname + window.location.search);
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });

      window.addEventListener(
        "load",
        () => {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        },
        { once: true },
      );
    }
  } catch {
    // no-op
  }

  try {
    const THEME_STORAGE_KEY = "bp_theme_v2";
    const THEME_COOKIE_KEY = "bp_theme_v2";
    const THEME_TOGGLE_SELECTOR = "[data-theme-toggle]";
    const THEME_BIND_ATTR = "data-bp-theme-bound";

    const resolveTheme = () => {
      const current = document.documentElement.getAttribute("data-theme");
      if (current === "dark" || current === "light") return current;
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "dark" || stored === "light") return stored;
      return "light";
    };

    const applyTheme = (nextTheme) => {
      document.documentElement.style.colorScheme = nextTheme;
      document.documentElement.setAttribute("data-theme", nextTheme);
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      document.cookie = `${THEME_COOKIE_KEY}=${nextTheme}; path=/; max-age=31536000; samesite=lax`;
      window.dispatchEvent(new CustomEvent("bp-theme-change", { detail: { theme: nextTheme } }));
    };

    const toggleTheme = () => {
      const current = resolveTheme();
      applyTheme(current === "dark" ? "light" : "dark");
    };

    const bindThemeToggleHandler = () => {
      if (document.documentElement.hasAttribute(THEME_BIND_ATTR)) return;

      document.addEventListener(
        "click",
        (event) => {
          const target = event.target;
          if (!(target instanceof Element)) return;
          const toggleButton = target.closest(THEME_TOGGLE_SELECTOR);
          if (!toggleButton) return;
          event.preventDefault();
          toggleTheme();
        },
        true,
      );

      document.documentElement.setAttribute(THEME_BIND_ATTR, "1");
    };

    bindThemeToggleHandler();

    window.addEventListener("pageshow", () => {
      const theme = resolveTheme();
      if (document.documentElement.getAttribute("data-theme") !== theme) {
        applyTheme(theme);
      }

      bindThemeToggleHandler();
    });
  } catch {
    // no-op
  }

  try {
    const BACK_TO_TOP_SELECTOR = "[data-back-to-top]";
    const BACK_TO_TOP_BIND_ATTR = "data-bp-back-to-top-bound";

    const bindBackToTopHandler = () => {
      if (document.documentElement.hasAttribute(BACK_TO_TOP_BIND_ATTR)) return;

      document.addEventListener(
        "click",
        (event) => {
          const target = event.target;
          if (!(target instanceof Element)) return;
          const trigger = target.closest(BACK_TO_TOP_SELECTOR);
          if (!trigger) return;
          event.preventDefault();
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        },
        true,
      );

      document.documentElement.setAttribute(BACK_TO_TOP_BIND_ATTR, "1");
    };

    bindBackToTopHandler();
    window.addEventListener("pageshow", bindBackToTopHandler);
  } catch {
    // no-op
  }

  try {
    const NAV_TOGGLE_SELECTOR = "[data-nav-toggle]";
    const NAV_MOBILE_SELECTOR = "[data-nav-mobile]";
    const NAV_CLOSE_SELECTOR = "[data-nav-close]";
    const NAV_BIND_ATTR = "data-bp-mobile-nav-bound";

    const closeMobileNav = () => {
      document.querySelectorAll(NAV_TOGGLE_SELECTOR).forEach((toggle) => {
        if (!(toggle instanceof HTMLElement)) return;
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
      });

      document.querySelectorAll(NAV_MOBILE_SELECTOR).forEach((panel) => {
        if (!(panel instanceof HTMLElement)) return;
        panel.classList.remove("is-open");
        panel.setAttribute("aria-hidden", "true");
      });
    };

    const toggleMobileNav = (toggleButton) => {
      const panelId = toggleButton.getAttribute("aria-controls");
      if (!panelId) return;
      const panel = document.getElementById(panelId);
      if (!(panel instanceof HTMLElement)) return;

      const shouldOpen = !panel.classList.contains("is-open");
      if (!shouldOpen) {
        closeMobileNav();
        return;
      }

      closeMobileNav();
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      toggleButton.classList.add("is-open");
      toggleButton.setAttribute("aria-expanded", "true");
      toggleButton.setAttribute("aria-label", "Close navigation menu");
    };

    const bindMobileNavHandler = () => {
      if (document.documentElement.hasAttribute(NAV_BIND_ATTR)) return;

      document.addEventListener(
        "click",
        (event) => {
          const target = event.target;
          if (!(target instanceof Element)) return;

          const toggleButton = target.closest(NAV_TOGGLE_SELECTOR);
          if (toggleButton instanceof HTMLElement) {
            event.preventDefault();
            toggleMobileNav(toggleButton);
            return;
          }

          const closeTrigger = target.closest(NAV_CLOSE_SELECTOR);
          if (closeTrigger) {
            closeMobileNav();
          }
        },
        true,
      );

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeMobileNav();
        }
      });

      document.documentElement.setAttribute(NAV_BIND_ATTR, "1");
    };

    bindMobileNavHandler();
    window.addEventListener("pageshow", bindMobileNavHandler);
  } catch {
    // no-op
  }

})();
