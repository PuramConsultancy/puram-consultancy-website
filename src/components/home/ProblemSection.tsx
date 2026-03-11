import { SurfaceCard } from "@/components/ui/surface-card";

const painPoints = [
  "Revenue that fluctuates unpredictably",
  "Marketing that burns cash but lacks ROI clarity",
  "Teams overwhelmed with manual processes",
  "Founder bottlenecks slowing growth",
  "Launches that underperform",
];

const ProblemSection = () => {
  return (
    <SurfaceCard padding="roomy">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold text-(--color-primary) sm:text-4xl lg:text-5xl">
          Scaling Shouldn&apos;t Feel This Hard
        </h2>

        <p className="mt-5 text-lg text-slate-600">If you&apos;re experiencing:</p>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700 sm:text-lg">
          {painPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <p className="mt-7 text-lg leading-relaxed text-slate-700 sm:text-xl">
          You don&apos;t have a marketing problem.
          <br />
          You have a systems problem.
          <br />
          And tactics won&apos;t fix it.
        </p>
      </div>
    </SurfaceCard>
  );
};

export default ProblemSection;
