"use client";

export function BackToTopButton() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button type="button" className="blog-float blog-float--top" onClick={handleBackToTop} aria-label="Back to top">
      <i className="bi bi-arrow-up" />
    </button>
  );
}

