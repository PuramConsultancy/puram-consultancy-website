import Link from "next/link";

const calloutItems = [
  "Where your growth bottlenecks are",
  "What systems are missing",
  "How to turn unpredictable revenue into consistent expansion",
];

const ConsultationCtaSection = () => {
  return (
    <section className="bg-(--color-secondary) py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 text-center text-white sm:px-6">
        <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
          Ready to Build a Business That Scales Without You Breaking?
        </h2>
        <p className="mx-auto mt-5 max-w-4xl text-base leading-relaxed text-orange-50 sm:text-xl">
          Schedule a free strategy call and discover:
        </p>

        <ul className="mx-auto mt-5 max-w-3xl space-y-2 text-left text-sm sm:text-base">
          {calloutItems.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-orange-50 sm:text-lg">
          No pressure. No obligations. Just clarity.
        </p>

        <Link
          href="/contact"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-(--color-primary) px-8 text-base font-semibold text-white transition-colors duration-300 hover:bg-[#012732]"
        >
          Book Free Strategy Call -&gt;
        </Link>

        <p className="mt-5 text-sm font-medium text-orange-100 sm:text-base">
          Limited strategy slots available each month.
        </p>
      </div>
    </section>
  );
};

export default ConsultationCtaSection;
