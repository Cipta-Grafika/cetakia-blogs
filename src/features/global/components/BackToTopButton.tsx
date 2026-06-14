"use client";

import { UiIcon } from "@/features/global/components/UiIcon";

export function BackToTopButton() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <button type="button" className="blog-float blog-float--top" aria-label="Back to top" onClick={handleBackToTop}>
      <UiIcon name="bi-arrow-up" />
    </button>
  );
}
