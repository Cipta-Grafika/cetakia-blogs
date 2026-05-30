import type { Metadata } from "next";

import { getSiteData } from "@/features/blogs/services/blog.service";
import { ContactUsPage } from "@/features/contact/pages/ContactUsPage";

export const metadata: Metadata = {
  title: "Contact Us | Cetakia",
  description: "Get in touch with Cetakia for support, product guidance, and implementation consultation.",
};

export default function ContactPageRoute() {
  const site = getSiteData();

  return <ContactUsPage site={site} />;
}
