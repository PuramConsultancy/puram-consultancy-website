import Link from "next/link";

import type { LinkItem } from "./types";

type FooterColumnProps = {
  title: string;
  ariaLabel: string;
  links: LinkItem[];
};

export default function FooterColumn({
  title,
  ariaLabel,
  links,
}: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-on-primary)]">
        {title}
      </h3>
      <nav aria-label={ariaLabel} className="mt-4">
        <ul className="space-y-2.5">
          {links.map((item) => {
            const isExternal = item.href.startsWith("http");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="text-sm text-[var(--color-on-primary-muted)] transition-colors hover:text-[var(--color-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)]"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

