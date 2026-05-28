const WHATSAPP_HREF =
  "https://wa.me/6281200000000?text=Halo%20tim%20Cetakia,%20saya%20ingin%20konsultasi%20paket%20langganan%20atau%20demo.";

export function WhatsAppButton() {
  return (
    <a href={WHATSAPP_HREF} className="blog-float blog-float--wa" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <i className="bi bi-whatsapp" />
    </a>
  );
}

