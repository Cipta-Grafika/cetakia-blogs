export type UiTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "bp_theme_v2";
export const THEME_COOKIE_KEY = "bp_theme_v2";
export const LIGHT_THEME_BACKGROUND = "#f8fafc";
export const DARK_THEME_BACKGROUND = "#081734";

export const EARLY_THEME_BOOT_SCRIPT = `(function(){try{var root=document.documentElement;var rootTheme=root.getAttribute("data-theme");var cookieMatch=document.cookie.match(/(?:^|;\\s*)${THEME_COOKIE_KEY}=(dark|light)(?:;|$)/);var cookieTheme=cookieMatch?cookieMatch[1]:null;var stored=window.localStorage.getItem("${THEME_STORAGE_KEY}");var nextTheme=(stored==="dark"||stored==="light")?stored:((cookieTheme==="dark"||cookieTheme==="light")?cookieTheme:((rootTheme==="dark"||rootTheme==="light")?rootTheme:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")));var bg=nextTheme==="dark"?"${DARK_THEME_BACKGROUND}":"${LIGHT_THEME_BACKGROUND}";root.setAttribute("data-theme",nextTheme);root.style.colorScheme=nextTheme;root.style.backgroundColor=bg;if(document.body){document.body.style.backgroundColor=bg;}window.localStorage.setItem("${THEME_STORAGE_KEY}",nextTheme);}catch(_e){document.documentElement.setAttribute("data-theme","light");document.documentElement.style.colorScheme="light";document.documentElement.style.backgroundColor="${LIGHT_THEME_BACKGROUND}";if(document.body){document.body.style.backgroundColor="${LIGHT_THEME_BACKGROUND}";}}})();`;

export const EARLY_THEME_BOOT_STYLE = `html,body{margin:0;background:${LIGHT_THEME_BACKGROUND};}html[data-theme='light'],html[data-theme='light'] body{background:${LIGHT_THEME_BACKGROUND};}html[data-theme='dark'],html[data-theme='dark'] body{background:${DARK_THEME_BACKGROUND};}`;
