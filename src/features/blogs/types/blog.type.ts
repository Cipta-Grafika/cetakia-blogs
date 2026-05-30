export type BlogLocale = "id" | "en";

export type NavLink = {
  label: string;
  href: string;
  icon?: string;
};

export type FooterColumn = {
  title: string;
  links?: NavLink[];
  items?: string[];
};

export type FooterData = {
  description: string;
  socialLinks?: NavLink[];
  columns: FooterColumn[];
  bottom: {
    copyright: string;
    links: NavLink[];
  };
};

export type InformationBarData = {
  announcement: {
    text: string;
    href: string;
  };
  links: NavLink[];
};

export type NewsletterData = {
  title: string;
  description: string;
  fieldLabel: string;
  placeholder: string;
  submitLabel: string;
};

export type SiteData = {
  brand: {
    name: string;
    logo: string;
    logoLight?: string;
    logoDark?: string;
    logoAlt: string;
  };
  primaryNavigation: NavLink[];
  mobileDrawerNavigation: NavLink[];
  informationBar?: InformationBarData;
  headerActions: {
    startNow: NavLink;
    themeToggleIcons: {
      light: string;
      dark: string;
    };
  };
  footer: FooterData;
  newsletter: NewsletterData;
};

export type BlogSeo = {
  title: string;
  description: string;
  robots?: string;
  author?: string;
  themeColor?: string;
  canonical?: string;
  og?: Record<string, string>;
  twitter?: Record<string, string>;
};

export type BlogArticleCard = {
  category: string;
  title: string;
  author: string;
  postedByPrefix: string;
  date: string;
  readTime: string;
  image: string;
  alt: string;
};

export type BlogSection = {
  id: string;
  title: string;
  centerTitle?: boolean;
  showViewAll?: boolean;
  articles: BlogArticleCard[];
};

export type BlogPageData = {
  seo: BlogSeo;
  hero: {
    title: string;
    subtitle: string;
  };
  search: {
    label: string;
    placeholder: string;
    modalTitle: string;
    emptyMessage: string;
    suggestions: Array<{
      title: string;
      keywords: string[];
    }>;
  };
  filters: {
    categories: string[];
    tags: string[];
  };
  sections: BlogSection[];
};

export type CategoryPageData = {
  seo: BlogSeo;
  hero: {
    breadcrumbs: Array<{
      label: string;
      href?: string;
      current?: boolean;
    }>;
    breadcrumbSeparatorIcon: string;
    title: string;
    subtitle: string;
  };
  sectionHeader: {
    title: string;
    meta: string;
  };
  articles: BlogArticleCard[];
  pagination: {
    currentPage: number;
    totalPages: number;
    items: Array<{
      type: "prev" | "next" | "page" | "ellipsis";
      value?: number;
      active?: boolean;
      label?: string;
      icon?: string;
    }>;
  };
};

export type TocNode = {
  title: string;
  href: string;
  children?: TocNode[];
};

export type BlogDetailContentBlock =
  | { type: "intro" | "p"; text: string }
  | { type: "h2" | "h3"; id: string; text: string }
  | {
      type: "list";
      variant: "ordered" | "unordered";
      title?: string;
      items: string[];
    }
  | {
      type: "table";
      title?: string;
      caption?: string;
      columns: string[];
      rows: string[][];
    }
  | { type: "figure"; image: string; alt: string; caption: string }
  | { type: "youtube"; url: string; title: string; caption?: string }
  | {
      type: "quote";
      text: string;
      subject: {
        name: string;
        role: string;
      };
    }
  | { type: "readAlso"; label: string; title: string; href: string };

export type BlogDetailPageData = {
  seo: BlogSeo;
  hero: {
    title: string;
    author: string;
    postedByPrefix: string;
    publishedLabel: string;
    publishedAt: string;
    publishedAtISO: string;
  };
  tableOfContents: TocNode[];
  categoryBadges: string[];
  content: BlogDetailContentBlock[];
  keyTakeaway: {
    label: string;
    items: string[];
  };
  rightSidebar: {
    relatedArticles: Array<{
      title: string;
      readTime: string;
      image: string;
      alt: string;
    }>;
    popularArticles: Array<{
      title: string;
      readTime: string;
      image: string;
      alt: string;
    }>;
  };
};

export type BlogsDataRoot = {
  site: SiteData;
  pages: {
    blogPage: BlogPageData;
    blogCategoryPage: CategoryPageData;
    blogDetailPage: BlogDetailPageData;
  };
};
