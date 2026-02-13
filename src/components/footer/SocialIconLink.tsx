import Link from "next/link";

import type { SocialItem } from "./types";

type SocialIconLinkProps = {
  item: SocialItem;
};

export default function SocialIconLink({ item }: SocialIconLinkProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-on-primary-subtle)] bg-white/10 text-[var(--color-on-primary-muted)] transition-colors hover:border-[var(--color-secondary)] hover:text-[var(--color-on-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)]"
    >
      <Icon className="h-4 w-4" />
    </Link>
  );
}

