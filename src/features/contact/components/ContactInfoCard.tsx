import { UiIcon } from "@/features/global/components/UiIcon";

type ContactInfoCardProps = {
  iconClassName: string;
  title: string;
  value: string;
  href?: string;
  iconTone?: "blue" | "purple" | "teal" | "orange";
  className?: string;
};

export function ContactInfoCard({
  iconClassName,
  title,
  value,
  href,
  iconTone = "blue",
  className = "",
}: ContactInfoCardProps) {
  return (
    <article className={`gc-card gc-card--interactive ct-contact-card ${className}`.trim()}>
      <div className="ct-contact-card__inner">
        <span className={`gc-card__icon gc-card__icon--${iconTone}`} aria-hidden="true">
          <UiIcon name={iconClassName} />
        </span>

        <div className="ct-contact-card__body">
          <h3 className="gc-card__title">{title}</h3>

          {href ? (
            <a href={href} className="gc-card__meta">
              {value}
            </a>
          ) : (
            <p className="gc-card__meta">{value}</p>
          )}
        </div>
      </div>
    </article>
  );
}
