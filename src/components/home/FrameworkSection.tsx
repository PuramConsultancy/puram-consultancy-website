import Link from "next/link";

const phases = [
  {
    title: "Strategic Clarity",
    description: "Market research, positioning, revenue modeling.",
  },
  {
    title: "Conversion Architecture",
    description: "Funnels, messaging, offer refinement, launch strategy.",
  },
  {
    title: "Automation and Infrastructure",
    description: "CRM systems, marketing automation, operational workflows.",
  },
  {
    title: "Long-Term Expansion",
    description: "Optimization, scaling channels, performance tracking.",
  },
];

const FrameworkSection = () => {
  return (
    <section className="rounded-3xl bg-(--color-primary) p-6 text-(--color-primary-50) sm:p-8 lg:p-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
          The SCALE Growth Framework
        </h2>
        <p className="mt-3 text-base text-(--color-primary-100) sm:text-lg">
          Our 4-Phase System for Sustainable Expansion
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {phases.map((phase, index) => (
            <article
              key={phase.title}
              className="rounded-2xl border border-white/15 bg-white/5 p-5"
            >
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-(--color-secondary-200)">
                Phase {index + 1}
              </p>
              <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
                {phase.title}
              </h3>
              <p className="mt-2 text-sm text-(--color-primary-100) sm:text-base">
                {phase.description}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-7 text-base sm:text-lg">
          This isn&apos;t theory. It&apos;s battle-tested execution.
        </p>

        <Link
          href="/process"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-(--color-secondary) px-8 text-base font-semibold text-white transition-colors duration-300 hover:bg-(--color-secondary-500)"
        >
          Explore How It Works -&gt;
        </Link>
      </div>
    </section>
  );
};

export default FrameworkSection;
