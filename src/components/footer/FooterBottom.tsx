import Link from "next/link";

import { legalLinks } from "@/data/footer/data";

export default function FooterBottom() {
  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-4 lg:px-6">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <nav aria-label="Legal Policies">
          <ul className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--color-on-primary-muted)]">
            {legalLinks.map((item, index) => (
              <li key={item.href} className="flex items-center gap-2">
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[var(--color-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)]"
                >
                  {item.label}
                </Link>
                {index < legalLinks.length - 1 ? (
                  <span aria-hidden="true" className="text-[var(--color-on-primary-subtle)]">
                    |
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-sm text-[var(--color-on-primary-muted)]">
          &copy; 2026 Puram Consultancy
        </p>
      </div>
    </div>
  );
}
