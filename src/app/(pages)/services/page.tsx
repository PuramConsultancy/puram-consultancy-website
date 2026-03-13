import Link from "next/link";

import { LinkCta } from "@/components/ui/link-cta";
import { PageShell } from "@/components/ui/page-shell";
import { SurfaceCard } from "@/components/ui/surface-card";

import { serviceLinks } from "@/data/serviceLinks";
import {
  serviceContentByName,
} from "@/data/serviceDetails";

const ServicesPage = () => {
  return (
    <PageShell className="gap-10 py-8 sm:py-10 lg:py-10">
      <SurfaceCard as="header">
        <h1 className="text-3xl font-semibold text-(--color-primary) sm:text-4xl lg:text-5xl">
          End-to-End Growth and Scaling Solutions
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Explore each service in detail. Every offering is designed to solve a
          specific growth constraint while building long-term business capacity.
        </p>

        <nav className="mt-6 flex flex-wrap gap-2">
          {serviceLinks.map((service) => {
            const content =
              serviceContentByName[
                service.name as keyof typeof serviceContentByName
              ];

            return (
              <Link
                key={service.name}
                href={service.href}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-(--color-primary) transition-colors duration-300 hover:bg-slate-100"
              >
                {content.heading}
              </Link>
            );
          })}
        </nav>
      </SurfaceCard>

      <div className="space-y-6">
        {serviceLinks.map((service) => {
          const content =
            serviceContentByName[
              service.name as keyof typeof serviceContentByName
            ];

          return (
            <SurfaceCard
              as="article"
              key={service.name}
              hoverable
              className="scroll-mt-28"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-semibold text-(--color-primary) sm:text-3xl">
                    {content.heading}
                  </h2>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-(--color-secondary)">
                    {content.shortDescription}
                  </p>
                </div>

                <Link
                  href={service.href}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 px-5 text-sm font-semibold text-(--color-primary) transition-colors duration-300 hover:bg-slate-100"
                >
                  View Service Page
                </Link>
              </div>

              <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
                {content.fullDescription}
              </p>

              <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                {content.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </SurfaceCard>
          );
        })}
      </div>

      <SurfaceCard tone="brand" padding="default">
        <h3 className="text-2xl font-semibold sm:text-3xl">
          Not sure which service fits your stage?
        </h3>
        <p className="mt-3 text-sm text-(--color-primary-100) sm:text-base">
          Book a strategy call and we will map the right service path for your
          business model, current constraints, and growth goals.
        </p>
        <LinkCta href="/contact#booking-form" className="mt-5">
          Book a Free Strategy Call -&gt;
        </LinkCta>
      </SurfaceCard>
    </PageShell>
  );
};

export default ServicesPage;
