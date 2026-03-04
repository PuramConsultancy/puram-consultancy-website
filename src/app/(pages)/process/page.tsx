import Link from "next/link";

import { LinkCta } from "@/components/ui/link-cta";
import { PageShell } from "@/components/ui/page-shell";
import { SurfaceCard } from "@/components/ui/surface-card";

const steps = [
  {
    title: "Discovery",
    description:
      "We audit your current offer, market positioning, funnel, and internal workflow.",
  },
  {
    title: "Strategy Design",
    description:
      "We create a focused roadmap with clear priorities, milestones, and expected outcomes.",
  },
  {
    title: "Implementation",
    description:
      "We help execute systems, messaging, and growth actions with practical support.",
  },
  {
    title: "Optimization",
    description:
      "We track performance, refine bottlenecks, and improve consistency over time.",
  },
];

const ProcessPage = () => {
  return (
    <PageShell>
      <header className="rounded-3xl bg-(--color-primary) p-6 text-(--color-primary-50) sm:p-8 lg:p-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-(--color-secondary-300)">
          Our Process
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
          A Clear 4-Step System for Sustainable Growth
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-(--color-primary-100) sm:text-lg">
          We keep things simple: diagnose, plan, execute, and optimize. Each
          step is designed to reduce guesswork and build long-term business
          performance.
        </p>
      </header>

      <section className="grid gap-5 sm:grid-cols-2">
        {steps.map((step, index) => (
          <SurfaceCard
            as="article"
            key={step.title}
            className="p-6 sm:p-7"
          >
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-(--color-secondary)">
              Step {index + 1}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-(--color-primary)">
              {step.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {step.description}
            </p>
          </SurfaceCard>
        ))}
      </section>

      <SurfaceCard tone="muted">
        <h2 className="text-2xl font-semibold text-(--color-primary) sm:text-3xl">
          Ready to Start?
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-lg">
          Book a strategy call and we will map the right execution path for
          your stage, goals, and current constraints.
        </p>
        <LinkCta
          href="/contact"
          className="mt-5"
        >
          Book Strategy Call
        </LinkCta>
      </SurfaceCard>
    </PageShell>
  );
};

export default ProcessPage;
