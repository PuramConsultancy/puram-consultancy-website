import { LinkCta } from "@/components/ui/link-cta";
import { SurfaceCard } from "@/components/ui/surface-card";

const outcomes = [
  "Clarify positioning",
  "Build automated lead systems",
  "Increase monthly recurring revenue by 180%",
];

const CaseStudySection = () => {
  return (
    <SurfaceCard padding="roomy">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold text-(--color-primary) sm:text-4xl lg:text-5xl">
          From Chaos to 7-Figure Scale
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
          See how we helped a SaaS founder:
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700 sm:text-lg">
          {outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>

        <LinkCta
          href="/case-studies"
          variant="outline"
          size="lg"
          className="mt-7"
        >
          View Case Study
        </LinkCta>
      </div>
    </SurfaceCard>
  );
};

export default CaseStudySection;
