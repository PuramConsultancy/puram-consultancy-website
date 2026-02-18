import Link from "next/link";
import { FiCompass, FiSearch, FiSettings, FiTrendingUp, FiZap } from "react-icons/fi";
import { IconType } from "react-icons";

import { serviceLinks } from "@/data/serviceLinks";
import { serviceContentByName, serviceSlugFromHref } from "@/data/serviceDetails";

import ReusableCard from "./ReusableCard";

const iconByIndex: IconType[] = [
  FiZap,
  FiSearch,
  FiTrendingUp,
  FiSettings,
  FiCompass,
];

const serviceOrder = [
  "Brand Creation",
  "Market Strategy",
  "Growth Strategy",
  "Business Systems",
  "Scaling Consulting",
];

const orderedServices = serviceOrder
  .map((name) => serviceLinks.find((service) => service.name === name))
  .filter((service): service is (typeof serviceLinks)[number] => Boolean(service));

const ServicesSection = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold text-(--color-primary) sm:text-4xl lg:text-5xl">
            End-to-End Growth and Scaling Solutions
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {orderedServices.map((service, index) => {
            const content = serviceContentByName[service.name];
            const Icon = iconByIndex[index % iconByIndex.length];
            const slug = serviceSlugFromHref(service.href);

            return (
              <ReusableCard
                key={service.name}
                icon={Icon}
                title={content.title}
                description={content.shortDescription}
                href={`/services#${slug}`}
                ctaLabel="Learn More"
                className="border border-slate-200 bg-white p-6 shadow-[0_2px_10px_rgba(2,51,65,0.04)]"
                iconWrapClassName="h-16 w-16 rounded-2xl border border-orange-100 bg-orange-50"
                titleClassName="text-2xl leading-snug"
                descriptionClassName="text-base text-slate-600"
              />
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/services"
            className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-(--color-primary) px-8 text-base font-medium text-(--color-primary) transition-colors duration-300 hover:bg-slate-100 sm:h-14 sm:text-xl"
          >
            View All Services -&gt;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
