import { SurfaceCard } from "@/components/ui/surface-card";

const pillars = [
  "Generate consistent qualified leads",
  "Convert prospects into predictable revenue",
  "Automate operations to remove bottlenecks",
  "Turn growth into a repeatable process",
];

const PositioningSection = () => {
  return (
    <SurfaceCard tone="muted" padding="roomy">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold text-(--color-primary) sm:text-4xl lg:text-5xl">
          We Build Systems. Not Short-Term Hacks.
        </h2>

        <p className="mt-5 text-base leading-relaxed text-slate-700 sm:text-lg">
          Most consultants sell campaigns.
          <br />
          We build infrastructure.
        </p>

        <p className="mt-5 text-base leading-relaxed text-slate-700 sm:text-lg">
          At Puram Consultancy, we design scalable systems that:
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700 sm:text-lg">
          {pillars.map((pillar) => (
            <li key={pillar}>{pillar}</li>
          ))}
        </ul>

        <p className="mt-7 text-base leading-relaxed text-slate-700 sm:text-lg">
          Because real scaling isn&apos;t about doing more.
          <br />
          It&apos;s about doing the right things - systematically.
        </p>
      </div>
    </SurfaceCard>
  );
};

export default PositioningSection;
