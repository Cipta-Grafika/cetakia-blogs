import type { ReactNode } from "react";
import { UiIcon } from "@/features/global/components/UiIcon";

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
      {items.map((item) => {
        const isOpen = Boolean(item.defaultOpen);
        const contentId = `accordion-content-${item.id}`;

        return (
          <details key={item.id} className="c-accordion__item" open={isOpen}>
            <summary className="c-accordion__summary" aria-controls={contentId}>
              <span className="c-accordion__summary-text">
                {item.iconClassName ? <UiIcon name={item.iconClassName} /> : null}
                {item.title}
              </span>
              <UiIcon name="bi-chevron-down" className="c-accordion__chevron" />
            </summary>

            <div id={contentId} className="c-accordion__content">
              <div className="c-accordion__content-inner">{item.content}</div>
            </div>
          </details>
        );
      })}
    </div>
  );
}
