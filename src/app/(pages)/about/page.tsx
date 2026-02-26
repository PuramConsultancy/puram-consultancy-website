import Link from "next/link";

const impactStats = [
  {
    value: "120+",
    label: "Growth Projects Guided",
    description: "Across founders, service brands, and scaling teams.",
  },
  {
    value: "4-Step",
    label: "Execution Framework",
    description: "A repeatable operating cadence from strategy to optimization.",
  },
  {
    value: "90-Day",
    label: "Momentum Window",
    description: "Focused actions designed to create measurable business traction.",
  },
];

const coreValues = [
  {
    title: "Clarity Before Complexity",
    description:
      "We simplify growth decisions into clear priorities so teams can move faster with less confusion.",
  },
  {
    title: "Execution Over Theory",
    description:
      "Every strategy includes practical implementation steps, owners, timelines, and measurable outcomes.",
  },
  {
    title: "Systems That Scale",
    description:
      "We design processes that can handle growth without creating chaos in operations or delivery.",
  },
  {
    title: "Compounding Improvement",
    description:
      "Small, consistent optimizations across funnel, operations, and team rhythms produce durable results.",
  },
];

const engagementFlow = [
  {
    phase: "01",
    title: "Diagnose",
    description:
      "We map your growth constraints, positioning gaps, and internal bottlenecks.",
  },
  {
    phase: "02",
    title: "Architect",
    description:
      "You get a tailored roadmap with priorities, milestones, and accountability loops.",
  },
  {
    phase: "03",
    title: "Execute & Refine",
    description:
      "We support implementation, track key signals, and optimize to keep momentum consistent.",
  },
];

const AboutPage = () => {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 py-6 sm:gap-10 sm:py-8 lg:gap-12 lg:py-10">
      <header className="rounded-3xl bg-(--color-primary) p-6 text-(--color-primary-50) sm:p-8 lg:p-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-(--color-secondary-300)">
          About Puram
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
          We Build Growth Systems That Teams Can Actually Run
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-(--color-primary-100) sm:text-lg">
          Puram Consultancy is a strategy and implementation platform for
          founders and teams that want predictable growth. We align offers,
          operations, and execution rhythms so results are steady instead of
          random.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {impactStats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-white/15 bg-white/5 p-4"
            >
              <p className="text-2xl font-semibold text-white sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-(--color-primary-50)">
                {stat.label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-(--color-primary-200)">
                {stat.description}
              </p>
            </article>
          ))}
        </div>
      </header>

      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl font-semibold text-(--color-primary) sm:text-3xl">
            About The Platform
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
            Growth usually breaks when strategy, sales, delivery, and team
            execution are disconnected. Our work connects these layers into one
            operating system so your business can scale with fewer surprises.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            We partner with leadership teams to create practical roadmaps,
            implementation cycles, and accountability structures that improve
            decision quality and execution speed.
          </p>
        </article>

        <article className="rounded-3xl border border-(--color-secondary-200) bg-(--color-secondary-50) p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-(--color-secondary-700)">
            What We Solve
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            <li>Fragmented growth efforts across channels and teams</li>
            <li>Inconsistent lead-to-revenue conversion systems</li>
            <li>Operational strain as demand and delivery scale up</li>
            <li>Lack of visibility into what is driving growth</li>
          </ul>
        </article>
      </section>

      <section>
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-(--color-secondary)">
            Core Values
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-(--color-primary) sm:text-3xl">
            Principles Behind Every Engagement
          </h2>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {coreValues.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-7"
            >
              <h3 className="text-xl font-semibold text-(--color-primary) sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
        <h2 className="text-2xl font-semibold text-(--color-primary) sm:text-3xl">
          How We Work With You
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">
          The process is intentionally simple so your team can execute quickly
          and stay aligned at every stage.
        </p>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {engagementFlow.map((step) => (
            <article
              key={step.phase}
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-(--color-secondary)">
                Phase {step.phase}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-(--color-primary) sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-(--color-primary) p-6 text-(--color-primary-50) sm:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <article className="rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-7">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-(--color-secondary-300)">
              Let&apos;s Build Your Next Stage
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-(--color-primary-50) sm:text-3xl lg:text-4xl">
              Ready to turn scattered growth into a structured system?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-(--color-primary-100) sm:text-base">
              We will assess your current stage and map a practical execution
              plan tailored to your team, offer, and goals.
            </p>
          </article>

          <article className="rounded-2xl bg-(--color-secondary) p-5 text-white sm:p-6">
            <p className="text-sm font-semibold tracking-[0.14em] uppercase text-orange-100">
              Next Step
            </p>
            <p className="mt-2 text-lg font-semibold sm:text-xl">
              Ready to scale with a clear roadmap?
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-(--color-primary) px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-(--color-primary-800)"
            >
              Book Strategy Call
            </Link>
          </article>
        </div>
      </section>
    </section>
  );
};

export default AboutPage;
