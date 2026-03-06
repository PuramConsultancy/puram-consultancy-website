import Image from "next/image";

import { LinkCta } from "@/components/ui/link-cta";

const trustPoints = [
  "No long-term contracts",
  "Data-driven execution",
  "Built for sustainable scale",
];

const HomeHeroSection = () => {
  return (
    <section className="rounded-3xl border border-white/10 bg-(--color-primary) p-6 sm:p-8 lg:p-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-6xl lg:leading-[1.15]">
            Transform Your Business Into a Predictable, Scalable Growth Machine
          </h1>

          <p className="mx-auto mt-5 max-w-4xl text-base leading-relaxed text-slate-100 sm:text-lg lg:mx-0 lg:text-2xl">
            We help founders and SMEs build revenue systems, automation
            frameworks, and growth engines that scale - without chaos, burnout,
            or guesswork.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <LinkCta href="/contact#booking-form" size="lg">
              Book Your Free Strategy Call
            </LinkCta>

            <LinkCta href="/process" variant="light" size="lg">
              See How It Works
            </LinkCta>
          </div>

          <ul className="mt-7 grid gap-2 text-sm text-slate-100 sm:grid-cols-3 sm:text-base">
            {trustPoints.map((point) => (
              <li key={point} className="rounded-xl bg-white/10 px-3 py-2">
                {point}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm font-medium tracking-wide text-slate-200 sm:text-base">
            Trusted by 50+ growing businesses
          </p>
        </div>

        <div className="mx-auto w-full max-w-xl">
          <div className="relative h-72 overflow-hidden rounded-3xl border border-white/15 shadow-2xl sm:h-104 lg:h-136">
            <Image
              src="/Home page old photo.png"
              alt="Business analytics laptop workspace"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
