import { UiIcon } from "@/features/global/components/UiIcon";

export function BackToTopButton() {
  return (
    <button type="button" className="blog-float blog-float--top" data-back-to-top aria-label="Back to top">
      <UiIcon name="bi-arrow-up" />
    </button>
  );
}
