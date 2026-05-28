import { BackToTopButton } from "@/features/global/components/BackToTopButton";
import { WhatsAppButton } from "@/features/global/components/WhatsAppButton";

export function FloatingActions() {
  return (
    <div className="blog-float-wrap" aria-label="Floating quick actions">
      <BackToTopButton />
      <WhatsAppButton />
    </div>
  );
}

