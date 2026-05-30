import { UiIcon } from "@/features/global/components/UiIcon";
import type { NavLink } from "@/features/blogs/types/blog.type";

type SocialLinksRowProps = {
  links: NavLink[];
  className?: string;
  linkClassName?: string;
  ariaLabel?: string;
};

export function SocialLinksRow({
  links,
  className,
  linkClassName,
  ariaLabel = "Social media links",
}: SocialLinksRowProps) {
  if (!links.length) return null;

  return (
    <div className={className} aria-label={ariaLabel}>
      {links.map((link) => (
        <a
          key={`social-${link.label}-${link.href}`}
          href={link.href}
          className={linkClassName}
          aria-label={link.label}
          title={link.label}
          target="_blank"
          rel="noopener noreferrer"
        >
          <UiIcon name={link.icon ?? "bi-link-45deg"} />
        </a>
      ))}
    </div>
  );
}
