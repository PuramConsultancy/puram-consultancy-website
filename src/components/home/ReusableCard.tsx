import Link from "next/link";
import { IconType } from "react-icons";

import { cn } from "@/lib/utils";

type ReusableCardProps = {
  icon: IconType;
  title: string;
  description: string;
  href?: string;
  ctaLabel?: string;
  className?: string;
  iconWrapClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

const ReusableCard = ({
  icon: Icon,
  title,
  description,
  href,
  ctaLabel,
  className,
  iconWrapClassName,
  titleClassName,
  descriptionClassName,
}: ReusableCardProps) => {
  return (
    <article className={cn("rounded-3xl", className)}>
      <div
        className={cn(
          "mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100/60 text-(--color-secondary)",
          iconWrapClassName,
        )}
      >
        <Icon className="text-3xl" />
      </div>

      <h3 className={cn("text-2xl font-semibold text-(--color-primary)", titleClassName)}>
        {title}
      </h3>

      <p className={cn("mt-4 text-base leading-relaxed text-slate-600 sm:text-lg", descriptionClassName)}>
        {description}
      </p>

      {href && ctaLabel ? (
        <Link
          href={href}
          className="mt-7 inline-flex items-center gap-2 text-lg font-semibold text-(--color-secondary) transition-colors duration-300 hover:text-(--color-secondary-500) sm:text-xl"
        >
          {ctaLabel}
          <span aria-hidden="true">-&gt;</span>
        </Link>
      ) : null}
    </article>
  );
};

export default ReusableCard;
