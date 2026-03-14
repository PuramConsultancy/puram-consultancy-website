import Link from "next/link";

import { LinkCta } from "@/components/ui/link-cta";
import { PageShell } from "@/components/ui/page-shell";
import { SurfaceCard } from "@/components/ui/surface-card";

import { serviceLinks } from "@/data/serviceLinks";
import {
  serviceContentByName,
  serviceSlugFromHref,
} from "@/data/serviceDetails";
import { IoArrowForward } from "react-icons/io5";

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
            const slug = serviceSlugFromHref(service.href);

            return (
              <Link
                key={service.name}
                href={`#${slug}`}
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
          const slug = serviceSlugFromHref(service.href);
          const hasExpandedContent =
            Boolean(content.overview?.length) ||
            Boolean(content.problems?.length) ||
            Boolean(content.approachPoints?.length) ||
            Boolean(content.deliverables?.length) ||
            Boolean(content.audience?.length) ||
            Boolean(content.ctaLabel);

          return (
            <SurfaceCard
              as="article"
              key={service.name}
              id={slug}
              hoverable
              className="scroll-mt-28"
            >
              <h2 className="text-2xl font-semibold text-(--color-primary) sm:text-3xl">
                {content.heading}
              </h2>

              {hasExpandedContent ? (
                <div className="mt-4 space-y-8">
                  <section className="space-y-3">
                    {content.overviewTitle ? (
                      <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                        {content.overviewTitle}
                      </h3>
                    ) : null}
                    {content.overview?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-relaxed text-slate-700 sm:text-lg"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </section>

                  {content.problems?.length ? (
                    <section>
                      {content.problemTitle ? (
                        <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                          {content.problemTitle}
                        </h3>
                      ) : null}
                      {content.problemIntro ? (
                        <p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-lg">
                          {content.problemIntro}
                        </p>
                      ) : null}
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                        {content.problems.map((problem) => (
                          <li key={problem}>{problem}</li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {content.approachPoints?.length ? (
                    <section>
                      {content.approachTitle ? (
                        <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                          {content.approachTitle}
                        </h3>
                      ) : null}
                      {content.approachIntro ? (
                        <p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-lg">
                          {content.approachIntro}
                        </p>
                      ) : null}
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                        {content.approachPoints.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {content.deliverables?.length ? (
                    <section>
                      {content.deliverablesTitle ? (
                        <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                          {content.deliverablesTitle}
                        </h3>
                      ) : null}
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                        {content.deliverables.map((deliverable) => (
                          <li key={deliverable}>{deliverable}</li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {content.audience?.length ? (
                    <section>
                      {content.audienceTitle ? (
                        <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                          {content.audienceTitle}
                        </h3>
                      ) : null}
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                        {content.audience.map((audienceItem) => (
                          <li key={audienceItem}>{audienceItem}</li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  <section>
                    {content.outcomeTitle ? (
                      <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                        {content.outcomeTitle}
                      </h3>
                    ) : null}
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {content.outcomes.map((outcome) => (
                        <li key={outcome}>{outcome}</li>
                      ))}
                    </ul>
                  </section>

                  {content.ctaLabel && content.ctaHref ? (
                    <LinkCta href={content.ctaHref} className="mt-2">
                      {content.ctaLabel}
                      <IoArrowForward className="text-(--color-secondary)" />
                    </LinkCta>
                  ) : null}
                </div>
              ) : (
                <>
                  <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
                    {content.fullDescription}
                  </p>

                  <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {content.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </>
              )}
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
          Book a Free Strategy Call
          <IoArrowForward className="text-(--color-secondary)" />
        </LinkCta>
      </SurfaceCard>
    </PageShell>
  );
};

export default ServicesPage;
