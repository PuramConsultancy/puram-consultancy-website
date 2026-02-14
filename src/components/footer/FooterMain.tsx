import { resourceLinks, serviceLinks } from "@/data/footer/data";
import FooterBrand from "./FooterBrand";
import FooterColumn from "./FooterColumn";
import FooterContact from "./FooterContact";

export default function FooterMain() {
  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-10 sm:px-4 sm:py-10 lg:px-6">
      <div className="grid grid-cols-1 gap-8 border-b border-[var(--color-divider-on-primary)] pb-8 md:grid-cols-4">
        <FooterBrand />
        <FooterColumn
          title="Services"
          ariaLabel="Footer Services"
          links={serviceLinks}
        />
        <FooterColumn
          title="Resources"
          ariaLabel="Footer Resources"
          links={resourceLinks}
        />
        <FooterContact />
      </div>
    </div>
  );
}
