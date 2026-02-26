import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const linkCtaVariants = cva(
  "inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold transition-colors duration-300",
  {
    variants: {
      variant: {
        primary: "bg-(--color-primary) text-white hover:bg-(--color-primary-800)",
        accent:
          "bg-(--color-secondary) text-white hover:bg-(--color-secondary-500)",
        outline:
          "border border-slate-300 text-(--color-primary) hover:bg-slate-100",
        light: "border border-white/60 text-white hover:bg-white/10",
      },
      size: {
        default: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "accent",
      size: "default",
    },
  },
);

type LinkCtaProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className"> &
  VariantProps<typeof linkCtaVariants> & {
    className?: string;
  };

const LinkCta = ({ className, variant, size, ...props }: LinkCtaProps) => {
  return (
    <Link
      className={cn(linkCtaVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { LinkCta, linkCtaVariants };
