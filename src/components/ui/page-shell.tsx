import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const pageShellBaseClassName =
  "mx-auto flex w-full flex-col gap-8 py-6 sm:gap-10 sm:py-8 lg:gap-12 lg:py-10";

type PageShellProps = HTMLAttributes<HTMLElement> & {
  maxWidthClassName?: string;
};

const PageShell = ({
  className,
  maxWidthClassName = "max-w-6xl",
  ...props
}: PageShellProps) => {
  return (
    <section
      className={cn(pageShellBaseClassName, maxWidthClassName, className)}
      {...props}
    />
  );
};

export { PageShell };
