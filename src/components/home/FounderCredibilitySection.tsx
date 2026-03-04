import { SurfaceCard } from "@/components/ui/surface-card";

const FounderCredibilitySection = () => {
  return (
    <SurfaceCard tone="muted" padding="roomy">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold text-(--color-primary) sm:text-4xl lg:text-5xl">
          Meet the Team Behind Your Growth
        </h2>

        <p className="mt-5 text-base leading-relaxed text-slate-700 sm:text-lg">
          Puram Consultancy was built on one principle:
        </p>

        <p className="mt-3 text-lg font-medium text-(--color-primary) sm:text-2xl">
          Scaling should create freedom - not stress.
        </p>

        <p className="mt-5 text-base leading-relaxed text-slate-700 sm:text-lg">
          We combine strategic insight, automation expertise, and performance
          marketing to build businesses that grow sustainably.
        </p>
      </div>
    </SurfaceCard>
  );
};

export default FounderCredibilitySection;
