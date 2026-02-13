import { resourceLinks, serviceLinks } from "./data";
import FooterBrand from "./FooterBrand";
import FooterColumn from "./FooterColumn";
import FooterContact from "./FooterContact";

export default function FooterMain() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 border-b border-[var(--color-divider-on-primary)] pb-10 md:grid-cols-2 xl:grid-cols-4">
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

