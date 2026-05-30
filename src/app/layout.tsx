import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Script from "next/script";
import "./globals.css";
import cetakiaFavicon from "./cetakia.webp";
import { FloatingActions } from "@/features/global/components/FloatingActions";
import {
  DARK_THEME_BACKGROUND,
  EARLY_THEME_BOOT_SCRIPT,
  EARLY_THEME_BOOT_STYLE,
  LIGHT_THEME_BACKGROUND,
  THEME_COOKIE_KEY,
  type UiTheme,
} from "@/features/global/constants/uiBootstrap";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://cetakia-blogs.vercel.app"),
  title: "Cetakia",
  description: "Cetakia is a leading provider of ERP for printing solutions in Indonesia.",
  icons: {
    icon: [
      { url: cetakiaFavicon.src, type: "image/webp" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: [cetakiaFavicon.src],
    apple: [cetakiaFavicon.src],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get(THEME_COOKIE_KEY)?.value;
  const initialTheme: UiTheme = cookieTheme === "dark" ? "dark" : "light";
  const initialBackground = initialTheme === "dark" ? DARK_THEME_BACKGROUND : LIGHT_THEME_BACKGROUND;

  return (
    <html
      lang="en"
      data-theme={initialTheme}
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full antialiased`}
      style={{ colorScheme: initialTheme, backgroundColor: initialBackground }}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: EARLY_THEME_BOOT_STYLE }} />
        <Script id="early-theme-boot" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: EARLY_THEME_BOOT_SCRIPT }} />
        <Script src="/scripts/ui-scripts.js" strategy="lazyOnload" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
