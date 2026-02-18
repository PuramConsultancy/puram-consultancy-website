import Image from "next/image";
import Link from "next/link";

const TransformSection = () => {
  return (
    <section className="overflow-hidden rounded-2xl bg-[#023f50] py-8 sm:py-10 lg:py-14">
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
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-(--color-secondary) px-7 text-base font-semibold text-white transition-colors duration-300 hover:bg-(--color-secondary-500) sm:h-13 sm:px-8"
            >
              Book Free Consultation <span className="ml-2">-&gt;</span>
            </Link>

            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/75 bg-transparent px-7 text-base font-semibold text-white transition-colors duration-300 hover:bg-white/10 sm:h-13 sm:px-8"
            >
              Explore Services
            </Link>
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
