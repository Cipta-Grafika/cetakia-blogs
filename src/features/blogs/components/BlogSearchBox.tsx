import type { BlogPageData } from "@/features/blogs/types/blog.type";
import { UiIcon } from "@/features/global/components/UiIcon";

type BlogSearchBoxProps = {
  search: BlogPageData["search"];
};

export function BlogSearchBox({ search }: BlogSearchBoxProps) {
  return (
    <section className="bp-search-wrap" aria-label="Blog search">
      <label htmlFor="bp-search" className="bp-search-label">
        {search.label}
      </label>
      <form className="bp-search-box" role="search" action="/blogs" method="get">
        <UiIcon name="bi-search" />
        <input id="bp-search" name="q" type="text" placeholder={search.placeholder} autoComplete="off" />
        <button type="reset" className="bp-search-clear" aria-label="Clear search">
          <UiIcon name="bi-x-lg" />
        </button>
      </form>
    </section>
  );
}
