import Link from "next/link";

import { serviceLinks } from "@/data/serviceLinks";
import { serviceContentByName, serviceSlugFromHref } from "@/data/serviceDetails";

const ServicesPage = () => {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 py-8 sm:py-10">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <h1 className="text-3xl font-semibold text-(--color-primary) sm:text-4xl lg:text-5xl">
          End-to-End Growth and Scaling Solutions
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Explore each service in detail. Every offering is designed to solve a
          specific growth constraint while building long-term business capacity.
        </p>

        <nav className="mt-6 flex flex-wrap gap-2">
          {serviceLinks.map((service) => {
            const content = serviceContentByName[service.name];
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
      </header>

      <div className="space-y-6">
        {serviceLinks.map((service) => {
          const content = serviceContentByName[service.name];
          const slug = serviceSlugFromHref(service.href);

          return (
            <article
              key={service.name}
              id={slug}
              className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8"
            >
              <h2 className="text-2xl font-semibold text-(--color-primary) sm:text-3xl">
                {content.heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
                {content.fullDescription}
              </p>

              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                {content.outcomes.map((outcome) => (
                  <li key={outcome}>- {outcome}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <div className="rounded-3xl bg-(--color-primary) p-6 text-(--color-primary-50) sm:p-8">
        <h3 className="text-2xl font-semibold sm:text-3xl">
          Not sure which service fits your stage?
        </h3>
        <p className="mt-3 text-sm text-(--color-primary-100) sm:text-base">
          Book a strategy call and we will map the right service path for your
          business model, current constraints, and growth goals.
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-(--color-secondary) px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-(--color-secondary-500)"
        >
          Book a Free Strategy Call -&gt;
        </Link>
      </div>
    </section>
  );
};

export default ServicesPage;
