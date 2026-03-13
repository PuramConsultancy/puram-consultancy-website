import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LinkCta } from "@/components/ui/link-cta";
import { PageShell } from "@/components/ui/page-shell";
import { SurfaceCard } from "@/components/ui/surface-card";
import {
  getServiceContentBySlug,
  serviceSlugFromHref,
} from "@/data/serviceDetails";
import { serviceLinks } from "@/data/serviceLinks";

type ServiceSlugPageParams = {
  slug: string;
};

type ServiceSlugPageProps = {
  params: Promise<ServiceSlugPageParams>;
};

const buildDetailContent = (slug: string) => {
  const service = getServiceContentBySlug(slug);

  if (!service) {
    return null;
  }

  return (
    service.detailPage ?? {
      heroEyebrow: service.heading,
      heroSummary: service.fullDescription,
      heroHighlights: service.outcomes,
      sections: [
        {
          title: "What This Service Delivers",
          items: service.outcomes,
        },
      ],
      cta: {
        title: "Need a tailored roadmap for this area?",
        description:
          "Book a strategy conversation and we will map the best next steps for your current stage and business priorities.",
        label: "Book a Free Strategy Call",
        href: "/contact#booking-form",
      },
    }
  );
};

export const generateStaticParams = () =>
  serviceLinks.map((service) => ({
    slug: serviceSlugFromHref(service.href),
  }));

export const generateMetadata = async ({
  params,
}: ServiceSlugPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const service = getServiceContentBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Puram Consultancy",
    };
  }

  return {
    title: `${service.heading} | Puram Consultancy`,
    description: service.fullDescription,
  };
};

const ServiceSlugPage = async ({ params }: ServiceSlugPageProps) => {
  const { slug } = await params;
  const service = getServiceContentBySlug(slug);

  if (!service) {
    notFound();
  }

  const detailPage = buildDetailContent(slug);

  if (!detailPage) {
    notFound();
  }

  return (
    <PageShell className="gap-8 py-8 sm:py-10 lg:gap-10">
      <Link
        href="/services"
        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-(--color-primary) transition-colors duration-300 hover:text-(--color-secondary)"
      >
        <span aria-hidden="true">&larr;</span>
        Back to all services
      </Link>

      <SurfaceCard
        as="header"
        className="overflow-hidden border-(--color-primary)/10 bg-[radial-gradient(circle_at_top_right,_rgba(253,94,2,0.12),_transparent_28%),linear-gradient(135deg,_rgba(2,51,65,0.05),_rgba(255,255,255,0.94))]"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--color-secondary)">
              {detailPage.heroEyebrow}
            </p>

            <h1 className="mt-4 text-3xl font-semibold text-(--color-primary) sm:text-4xl lg:text-5xl">
              {detailPage.heroTitle ?? service.heading}
            </h1>

            {detailPage.heroSubtitle ? (
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
                {detailPage.heroSubtitle}
              </p>
            ) : null}

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {detailPage.heroSummary}
            </p>
          </div>

          <div className="w-full max-w-sm rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_20px_60px_rgba(2,51,65,0.08)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-(--color-primary)">
              Strategic Focus
            </p>

            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {(detailPage.heroHighlights ?? service.outcomes).map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SurfaceCard>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.9fr)] lg:items-start">
        <div className="space-y-6">
          {(detailPage.sections ?? []).map((section) => (
            <SurfaceCard
              key={section.title}
              tone={section.tone === "accent" ? "accent" : "default"}
              className="border-slate-200"
            >
              <h2 className="text-2xl font-semibold text-(--color-primary) sm:text-3xl">
                {section.title}
              </h2>

              {section.description ? (
                <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
                  {section.description}
                </p>
              ) : null}

              {section.items?.length ? (
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.note ? (
                <p className="mt-5 text-sm leading-relaxed text-slate-500 sm:text-base">
                  {section.note}
                </p>
              ) : null}
            </SurfaceCard>
          ))}
        </div>

        <div className="space-y-6 lg:sticky lg:top-24">
          <SurfaceCard className="border-slate-200">
            <h2 className="text-xl font-semibold text-(--color-primary) sm:text-2xl">
              Outcomes You Can Expect
            </h2>

            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {service.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  {outcome}
                </li>
              ))}
            </ul>
          </SurfaceCard>

          <SurfaceCard tone="brand">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              {detailPage.cta?.title ?? "Need help choosing the right next step?"}
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-(--color-primary-100) sm:text-base">
              {detailPage.cta?.description ??
                "Book a strategy call and we will map the right service path for your current stage, constraints, and growth targets."}
            </p>

            <LinkCta
              href={detailPage.cta?.href ?? "/contact#booking-form"}
              className="mt-6"
            >
              {detailPage.cta?.label ?? "Book a Free Strategy Call"}
            </LinkCta>
          </SurfaceCard>
        </div>
      </div>
    </PageShell>
  );
};

export default ServiceSlugPage;
