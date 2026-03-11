import { LinkCta } from "@/components/ui/link-cta";
import { PageShell } from "@/components/ui/page-shell";
import { SurfaceCard } from "@/components/ui/surface-card";

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
    <PageShell>
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
              className="card-hover rounded-2xl border border-white/15 bg-white/5 p-4"
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

      <SurfaceCard padding="roomy">
        <h2 className="text-2xl font-semibold text-(--color-primary) sm:text-3xl">
          Core Values
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {coreValues.map((value) => (
            <article
              key={value.title}
              className="card-hover rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <h3 className="text-lg font-semibold text-(--color-primary) sm:text-xl">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard padding="roomy">
        <h2 className="text-2xl font-semibold text-(--color-primary) sm:text-3xl">
          How We Engage
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {engagementFlow.map((step) => (
            <article
              key={step.phase}
              className="card-hover rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-(--color-secondary)">
                Stage {step.phase}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-(--color-primary) sm:text-xl">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard padding="roomy" tone="muted">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <article>
            <h2 className="text-2xl font-semibold leading-tight text-(--color-primary) sm:text-3xl lg:text-4xl">
              Ready to turn scattered growth into a structured system?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
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
            <LinkCta href="/contact#booking-form" variant="primary" className="mt-4">
              Book Strategy Call
            </LinkCta>
          </article>
        </div>
      </SurfaceCard>
    </PageShell>
  );
};

export default AboutPage;
