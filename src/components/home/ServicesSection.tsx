import { FiCompass, FiSearch, FiSettings, FiTrendingUp, FiZap } from "react-icons/fi";
import { IconType } from "react-icons";

import { LinkCta } from "@/components/ui/link-cta";
import { SurfaceCard } from "@/components/ui/surface-card";

import { serviceLinks } from "@/data/serviceLinks";
import { serviceContentByName } from "@/data/serviceDetails";

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
    <SurfaceCard padding="roomy">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold text-(--color-primary) sm:text-4xl lg:text-5xl">
            End-to-End Growth and Scaling Solutions
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {orderedServices.map((service, index) => {
            const content = serviceContentByName[service.name as keyof typeof serviceContentByName];
            const Icon = iconByIndex[index % iconByIndex.length];

            return (
              <ReusableCard
                key={service.name}
                icon={Icon}
                title={content.heading}
                href={service.href}
                className="border border-slate-200 bg-white p-6 shadow-[0_2px_10px_rgba(2,51,65,0.04)]"
                iconWrapClassName="h-16 w-16 rounded-2xl border border-orange-100 bg-orange-50"
                titleClassName="text-2xl leading-snug"
                ctaLabel="Explore Service"
              />
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <LinkCta
            href="/services"
            variant="outline"
            size="lg"
            className="border-2 border-(--color-primary) font-medium sm:h-14 sm:text-xl"
          >
            View All Services
          </LinkCta>
        </div>
      </div>
    </SurfaceCard>
  );
};

export default ServicesSection;
