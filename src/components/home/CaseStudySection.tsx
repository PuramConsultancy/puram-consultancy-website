import { LinkCta } from "@/components/ui/link-cta";
import { SurfaceCard } from "@/components/ui/surface-card";

const outcomes = [
  "Clarified positioning in a crowded market",
  "Built an automated lead system from scratch",
  "Grew monthly recurring revenue by 180%",
];

const CaseStudySection = () => {
  return (
    <SurfaceCard padding="roomy">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.15em] text-(--color-secondary) uppercase">
          Case study
        </p>

        <h2 className="mt-3 text-3xl font-semibold text-(--color-primary) sm:text-4xl">
          From chaos to 7-figure scale
        </h2>

        <p className="mt-3 text-base leading-relaxed text-slate-500">
          A SaaS founder came to us with no system, no predictability, and
          stalled growth. In 90 days we helped them:
        </p>

        <ul className="mt-4 space-y-2.5">
          {outcomes.map((outcome) => (
            <li
              key={outcome}
              className="flex items-center gap-3 text-sm text-slate-700 sm:text-base"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
              {outcome}
            </li>
          ))}
        </ul>

        <LinkCta
          href="/services"
          variant="outline"
          size="lg"
          className="mt-7"
        >
          View case study →
        </LinkCta>
      </div>
    </SurfaceCard>
  );
};

export default CaseStudySection;
