import Link from "next/link";

import type { SocialItem } from "@/data/footer/types";

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
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgb(255_255_255_/_0.14)] bg-[rgb(255_255_255_/_0.03)] text-[rgb(255_255_255_/_0.7)] transition-all duration-200 hover:border-[var(--color-secondary)] hover:bg-[rgb(253_94_2_/_0.12)] hover:text-[var(--color-on-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)]"
    >
      <Icon className="h-5 w-5" />
    </Link>
  );
}
