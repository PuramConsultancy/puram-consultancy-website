import type { ComponentType, SVGProps } from "react";

export type LinkItem = {
  label: string;
  href: string;
};

export type SocialItem = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

