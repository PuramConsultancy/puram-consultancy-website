import { LinkCta } from "@/components/ui/link-cta";

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

        <ul className="mx-auto mt-5 max-w-3xl list-disc space-y-2 pl-5 text-left text-sm sm:text-base">
          {calloutItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-orange-50 sm:text-lg">
          No pressure. No obligations. Just clarity.
        </p>

        <LinkCta
          href="/contact#booking-form"
          variant="primary"
          size="lg"
          className="mt-8"
        >
          Book Free Strategy Call
        </LinkCta>

        <p className="mt-5 text-sm font-medium text-orange-100 sm:text-base">
          Limited strategy slots available each month.
        </p>
      </div>
    </section>
  );
};

export default ConsultationCtaSection;
