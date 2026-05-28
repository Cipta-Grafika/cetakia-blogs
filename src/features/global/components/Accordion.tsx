import type { ReactNode } from "react";

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
  iconClassName?: string;
  defaultOpen?: boolean;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
};

function joinClasses(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={joinClasses("c-accordion", className)}>
      {items.map((item) => (
        <details key={item.id} className="c-accordion__item" open={item.defaultOpen}>
          <summary className="c-accordion__summary">
            <span className="c-accordion__summary-text">
              {item.iconClassName ? <i className={`bi ${item.iconClassName}`} aria-hidden="true" /> : null}
              {item.title}
            </span>
            <i className="bi bi-chevron-down c-accordion__chevron" aria-hidden="true" />
          </summary>
          <div className="c-accordion__content">{item.content}</div>
        </details>
      ))}
    </div>
  );
}

