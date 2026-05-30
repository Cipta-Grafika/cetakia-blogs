import type { InformationBarData } from "@/features/blogs/types/blog.type";
import { UiIcon } from "@/features/global/components/UiIcon";

type InformationBarProps = {
  informationBar?: InformationBarData;
};

export function InformationBar({ informationBar }: InformationBarProps) {
  if (!informationBar) return null;

  const { announcement, links } = informationBar;

  return (
    <aside className="blog-info-bar" role="note" aria-label="Site announcement">
      <div className="blog-container">
        <div className="blog-info-bar__inner">
          <a href={announcement.href} className="blog-info-bar__announcement">
            <span className="blog-info-bar__announcement-text">{announcement.text}</span>
            <span className="blog-info-bar__announcement-cta">
              <UiIcon name="bi-caret-right-fill" />
            </span>
          </a>

          <nav className="blog-info-bar__menu" aria-label="Information quick links">
            {links.map((link) => (
              <a key={`info-bar-${link.label}-${link.href}`} href={link.href} className="blog-info-bar__link">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
