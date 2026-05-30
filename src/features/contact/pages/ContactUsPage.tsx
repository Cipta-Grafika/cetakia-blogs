import type { SiteData } from "@/features/blogs/types/blog.type";
import "@/styles/components/contact.css";
import "@/styles/components/cards.css";
import { SiteFooter } from "@/features/global/components/SiteFooter";
import { SiteHeader } from "@/features/global/components/SiteHeader";
import { ContactInfoCard } from "@/features/contact/components/ContactInfoCard";
import { ContactInquiryForm } from "@/features/contact/components/ContactInquiryForm";
import { ContactOfficeMap } from "@/features/contact/components/ContactOfficeMap";

type ContactUsPageProps = {
  site: SiteData;
};

const officeAddress = "Jl. Sedap Malam No. 3, Nagasari, Kec. Karawang Barat, Karawang, Jawa Barat 41314";
const officeDirectionsUrl =
  "https://www.google.com/maps?vet=10CAAQoqAOahcKEwiI3caKwNuUAxUAAAAAHQAAAAAQDw..i&rlz=1C5GCEA_enID1171ID1171&sca_esv=bfe94a51adf7a8b8&pvq=CgwvZy8xaGhrOHh4czEiEwoNY2lwdGEgZ3JhZmlrYRACGAM&lqi=ChVjaXB0YSBncmFmaWthIGFkZHJlc3MiAkgBSIHmuZS-j4CACFoXEAAQARgAGAEiDWNpcHRhIGdyYWZpa2GSARJjb21tZXJjaWFsX3ByaW50ZXI&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=id&sa=X&geocode=KYN1N3HBd2kuMTaBr3rnbkn7&daddr=Jl.+Sedap+Malam+No.3,+Nagasari,+Kec.+Karawang+Bar.,+Karawang,+Jawa+Barat+41314";
const officeMapEmbedUrl =
  "https://www.google.com/maps?q=Jl.+Sedap+Malam+No.3,+Nagasari,+Kec.+Karawang+Bar.,+Karawang,+Jawa+Barat+41314&z=16&output=embed";

const contactCards = [
  {
    iconClassName: "bi-envelope-fill",
    title: "Our Email",
    value: "sales@cetakia.com",
    href: "mailto:sales@cetakia.com",
    iconTone: "purple" as const,
  },
  {
    iconClassName: "bi-telephone-fill",
    title: "Phone",
    value: "+62 749 530 742",
    href: "tel:+62749530742",
    iconTone: "teal" as const,
  },
  {
    iconClassName: "bi-geo-alt-fill",
    title: "Visit Us",
    value: officeAddress,
    iconTone: "orange" as const,
    fullWidth: true,
  },
];

export function ContactUsPage({ site }: ContactUsPageProps) {
  return (
    <div className="ct-page bg-[var(--ui-surface-page)] text-[var(--ui-text-primary)]">
      <SiteHeader site={site} />

      <main className="ct-main" id="main-content">
        <div className="blog-container">
          <section>
            <div className="ct-layout">
              <div className="ct-layout__form">
                <ContactInquiryForm />
              </div>

              <div className="ct-layout__left">
                <div className="ct-layout__intro">
                  <span className="bp-pill bp-pill--tag">Contact</span>
                  <h1 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.02em] text-[var(--ui-text-primary)] sm:text-4xl">
                    Contact Us
                  </h1>
                  <p className="mt-4 max-w-2xl text-[var(--ui-text-muted)]">
                    We&apos;ll show you self-help options first. Additional help is available if you need it, including live support with our specialist
                    team.
                  </p>
                </div>

                <div className="ct-layout__cards">
                  <div className="ct-cards-grid" aria-label="Contact channels">
                    {contactCards.map((item) => (
                      <ContactInfoCard
                        key={item.title}
                        iconClassName={item.iconClassName}
                        title={item.title}
                        value={item.value}
                        href={item.href}
                        iconTone={item.iconTone}
                        className={item.fullWidth ? "ct-contact-card--full" : ""}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <ContactOfficeMap
              address={officeAddress}
              directionsUrl={officeDirectionsUrl}
              mapEmbedUrl={officeMapEmbedUrl}
            />
          </section>
        </div>
      </main>

      <SiteFooter site={site} />
    </div>
  );
}
