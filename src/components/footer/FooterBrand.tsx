import { socialLinks } from "./data";
import SocialIconLink from "./SocialIconLink";

export default function FooterBrand() {
  return (
    <div className="flex h-full flex-col justify-between gap-8 xl:pr-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-secondary)] text-base font-bold text-[var(--color-on-primary)]">
            P
          </span>
          <p className="text-xl font-semibold">Puram</p>
        </div>
        <p className="max-w-xs text-sm leading-6 text-[var(--color-on-primary-muted)]">
          We build the systems that build your business. Strategic consulting for the
          next generation of industry leaders.
        </p>
      </div>

      <div>
        <ul className="mt-1 flex flex-wrap gap-2">
          {socialLinks.map((item) => (
            <li key={item.label}>
              <SocialIconLink item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

