import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  logoWrapClassName?: string;
  textClassName?: string;
  showText?: boolean;
};

const SiteLogo = ({
  className,
  logoWrapClassName,
  textClassName,
  showText = true,
}: SiteLogoProps) => {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative h-10 w-10 overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-110",
          logoWrapClassName,
        )}
      >
        <Image
          src="/image.png"
          alt="Puram Consultancy Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      {showText ? (
        <span
          className={cn(
            "text-2xl leading-tight font-bold text-(--color-primary) lg:text-3xl",
            textClassName,
          )}
        >
          Puram
        </span>
      ) : null}
    </Link>
  );
};

export default SiteLogo;
