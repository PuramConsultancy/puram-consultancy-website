import type { HTMLAttributes } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const surfaceCardVariants = cva("rounded-3xl border", {
  variants: {
    tone: {
      default: "border-slate-200 bg-white",
      muted: "border-slate-200 bg-slate-50",
      primary: "border-white/15 bg-white/5 text-(--color-primary-50)",
      brand: "border-(--color-primary) bg-(--color-primary) text-(--color-primary-50)",
      accent: "border-(--color-secondary-200) bg-(--color-secondary-50)",
    },
    padding: {
      default: "p-6 sm:p-8",
      compact: "p-5 sm:p-6",
      roomy: "p-6 sm:p-8 lg:p-10",
      none: "",
    },
  },
  defaultVariants: {
    tone: "default",
    padding: "default",
  },
});

type SurfaceCardProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof surfaceCardVariants> & {
    as?: "article" | "section" | "div";
  };

const SurfaceCard = ({
  as = "section",
  className,
  tone,
  padding,
  ...props
}: SurfaceCardProps) => {
  const Comp = as;

  return (
    <Comp
      className={cn(surfaceCardVariants({ tone, padding, className }))}
      {...props}
    />
  );
};

export { SurfaceCard, surfaceCardVariants };
