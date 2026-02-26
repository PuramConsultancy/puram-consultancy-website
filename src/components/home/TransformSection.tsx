import Image from "next/image";
import Link from "next/link";

import { LinkCta } from "@/components/ui/link-cta";

const TransformSection = () => {
  return (
    <section className="overflow-hidden rounded-2xl bg-(--color-primary) py-8 sm:py-10 lg:py-14">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:px-10">
        <div>
          <h2 className="text-4xl leading-tight font-semibold text-white sm:text-5xl lg:text-[5.2rem]">
            Transform Your Business with
            <span className="block text-(--color-secondary)">
              Systems That Scale
            </span>
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-100 sm:text-xl lg:text-[2rem]">
            We help SMEs and startups build sustainable growth through
            strategic consulting, automation, and proven frameworks.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <LinkCta
              href="/contact"
              size="lg"
              className="sm:px-8"
            >
              Book Free Consultation <span className="ml-2">-&gt;</span>
            </LinkCta>

            <LinkCta
              href="/services"
              variant="light"
              size="lg"
              className="sm:px-8"
            >
              Explore Services
            </LinkCta>
          </div>
        </div>

        <div className="relative h-64 overflow-hidden rounded-3xl sm:h-80 lg:h-[36rem]">
          <Image
            src="/Home page.png"
            alt="Business growth dashboard"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default TransformSection;
