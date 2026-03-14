import { SurfaceCard } from "@/components/ui/surface-card";

const pillars = [
  {
    number: "01",
    title: "Consistent qualified leads",
    description:
      "A pipeline that fills itself — not one that depends on ad spend or luck.",
  },
  {
    number: "02",
    title: "Predictable revenue",
    description:
      "Conversion systems that turn prospects into clients — repeatably.",
  },
  {
    number: "03",
    title: "Operations without bottlenecks",
    description:
      "Automation that removes manual work and frees your team to focus.",
  },
  {
    number: "04",
    title: "Growth as a repeatable process",
    description:
      "Not a lucky quarter — a documented system you can scale on demand.",
  },
];

const PositioningSection = () => {
  return (
    <SurfaceCard tone="muted" padding="roomy">
      <div className="mx-auto max-w-5xl">
        {/* Label */}
        <p className="text-xs font-semibold tracking-[0.15em] text-(--color-secondary) uppercase">
          Our approach
        </p>

        {/* Heading */}
        <h2 className="mt-3 text-3xl font-semibold text-(--color-primary) sm:text-4xl lg:text-5xl">
          We build systems. Not short-term hacks.
        </h2>

        {/* Subtext */}
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
          Most consultants sell campaigns. We build infrastructure — scalable
          systems that compound over time.
        </p>

        {/* Pillar cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {pillars.map(({ number, title, description }) => (
            <div
              key={number}
              className="rounded-2xl border border-gray-100 bg-white p-5"
            >
              <p className="text-2xl font-semibold text-(--color-primary)/20">
                {number}
              </p>
              <p className="mt-2 text-sm font-semibold text-(--color-primary)">
                {title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing callout */}
        <div className="mt-8 flex items-start gap-4 rounded-2xl bg-white/60 px-5 py-4">
          <div className="mt-1 h-full w-0.5 shrink-0 self-stretch rounded-full bg-gray-200" />
          <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
            Real scaling isn&apos;t about doing more. It&apos;s about doing the
            right things — <em>systematically</em>.
          </p>
        </div>
      </div>
    </SurfaceCard>
  );
};

export default PositioningSection;
