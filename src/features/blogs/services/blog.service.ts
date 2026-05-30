import blogsDataJson from "@/data/blogs.json";
import type {
  BlogArticleCard,
  BlogDetailPageData,
  BlogLocale,
  BlogPageData,
  BlogsDataRoot,
  CategoryPageData,
  SiteData,
} from "@/features/blogs/types/blog.type";
import { normalizeBlogLocale } from "@/features/blogs/utils/blog-locale";

const blogsData = blogsDataJson as BlogsDataRoot;

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeLogoPath(path: string): string {
  if (path.startsWith("../../public/")) {
    return `/${path.replace("../../public/", "")}`;
  }
  return path;
}

export function getSiteData(): SiteData {
  const brand = blogsData.site.brand;
  return {
    ...blogsData.site,
    brand: {
      ...brand,
      logo: normalizeLogoPath(brand.logo),
      logoLight: brand.logoLight ? normalizeLogoPath(brand.logoLight) : undefined,
      logoDark: brand.logoDark ? normalizeLogoPath(brand.logoDark) : undefined,
    },
  };
}

export function getBlogListingPageData(): BlogPageData {
  return blogsData.pages.blogPage;
}

export function getBlogCategoryPageData(): CategoryPageData {
  return blogsData.pages.blogCategoryPage;
}

export function getAllBlogCards(): BlogArticleCard[] {
  const fromListing = blogsData.pages.blogPage.sections.reduce<BlogArticleCard[]>((accumulator, section) => {
    accumulator.push(...section.articles);
    return accumulator;
  }, []);
  const fromCategory = blogsData.pages.blogCategoryPage.articles;

  const dedupedByTitle = new Map<string, BlogArticleCard>();

  [...fromCategory, ...fromListing].forEach((article) => {
    if (!dedupedByTitle.has(article.title)) {
      dedupedByTitle.set(article.title, article);
    }
  });

  return Array.from(dedupedByTitle.values());
}

export function getArticlesByCategory(category: string): BlogArticleCard[] {
  const normalizedCategory = category.toLowerCase();
  return getAllBlogCards().filter((article) => article.category.toLowerCase() === normalizedCategory);
}

export function getArticlesByTag(tag: string): BlogArticleCard[] {
  const normalizedTag = tag.toLowerCase();
  return getAllBlogCards().filter((article) => {
    const haystack = `${article.title} ${article.category}`.toLowerCase();
    return haystack.includes(normalizedTag);
  });
}

function getDetailSlugCandidates(): string[] {
  const detail = blogsData.pages.blogDetailPage;
  const idSlug = slugify(detail.hero.title);
  const enSlug = slugify(detail.seo.og?.title || detail.seo.title);

  return Array.from(new Set([idSlug, enSlug]));
}

function localizeDetailPage(detail: BlogDetailPageData, locale: BlogLocale): BlogDetailPageData {
  if (locale === "id") {
    return detail;
  }

  return {
    ...detail,
    hero: {
      ...detail.hero,
      title: detail.seo.og?.title || detail.seo.title,
      postedByPrefix: "Posted by",
      publishedLabel: "Published at",
    },
    keyTakeaway: {
      label: "Key takeaway:",
      items: detail.keyTakeaway.items,
    },
  };
}

export function getBlogDetailPageBySlug(params: {
  slug: string;
  locale?: string;
}): BlogDetailPageData | null {
  const locale = normalizeBlogLocale(params.locale);
  const candidates = getDetailSlugCandidates();

  if (!candidates.includes(params.slug)) {
    return null;
  }

  return localizeDetailPage(blogsData.pages.blogDetailPage, locale);
}

export function getBlogDetailStaticParams() {
  const [idSlug, enSlug] = getDetailSlugCandidates();

  return {
    defaultLocale: [{ slug: idSlug }, { slug: enSlug }],
    idLocale: [{ slug: idSlug }, { slug: enSlug }],
    enLocale: [{ slug: enSlug }, { slug: idSlug }],
  };
}

export function getCategoryListingDataset(activeCategory = "Products"): {
  page: CategoryPageData;
  cards: BlogArticleCard[];
  activeCategory: string;
} {
  const scopedCards = getArticlesByCategory(activeCategory);

  return {
    page: {
      ...getBlogCategoryPageData(),
      sectionHeader: {
        title: `${activeCategory} Articles`,
        meta: `Showing ${scopedCards.length} articles in this category`,
      },
    },
    cards: scopedCards.length > 0 ? scopedCards : blogsData.pages.blogCategoryPage.articles,
    activeCategory,
  };
}

export function getTagListingDataset(defaultTag = "ERP"): {
  page: CategoryPageData;
  cards: BlogArticleCard[];
  activeTag: string;
} {
  const tagCards = getArticlesByTag(defaultTag);

  return {
    page: {
      ...blogsData.pages.blogCategoryPage,
      seo: {
        ...blogsData.pages.blogCategoryPage.seo,
        title: "Tags | Cetakia Blog",
        description: "Explore articles grouped by topic tags from Cetakia Blog.",
      },
      hero: {
        ...blogsData.pages.blogCategoryPage.hero,
        title: "Tagged Articles",
        subtitle: `Browse posts related to ${defaultTag} and discover practical insights for your team.`,
        breadcrumbs: [
          { label: "Blogs", href: "/blogs" },
          { label: "Tags", current: true },
        ],
      },
      sectionHeader: {
        title: `Tag: ${defaultTag}`,
        meta: `Showing ${tagCards.length} tagged articles`,
      },
    },
    cards: tagCards,
    activeTag: defaultTag,
  };
}
