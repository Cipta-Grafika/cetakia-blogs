import Image from "next/image";

import type { NavLink } from "@/features/blogs/types/blog.type";
import { SocialLinksRow } from "@/features/global/components/SocialLinksRow";

type BlogArticleAuthorCardProps = {
  authorName: string;
  description: string;
  avatarSrc: string;
  socialLinks: NavLink[];
};

export function BlogArticleAuthorCard({
  authorName,
  description,
  avatarSrc,
  socialLinks,
}: BlogArticleAuthorCardProps) {
  return (
    <section className="blog-author-card" aria-label="Author information">
      <div className="blog-author-card__header">
        <Image
          src={avatarSrc}
          alt={`${authorName} avatar`}
          width={400}
          height={400}
          className="blog-author-card__avatar"
          sizes="96px"
          quality={68}
        />
      </div>

      <h3 className="blog-author-card__name">{authorName}</h3>
      <p className="blog-author-card__desc">{description}</p>

      <SocialLinksRow
        links={socialLinks}
        className="blog-author-card__social"
        linkClassName="blog-author-card__social-link"
        ariaLabel="Author social media links"
      />

      <div className="blog-author-card__separator" aria-hidden="true" />
    </section>
  );
}
