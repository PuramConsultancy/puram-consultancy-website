import Link from "next/link";

const outcomes = [
  "Clarify positioning",
  "Build automated lead systems",
  "Increase monthly recurring revenue by 180%",
];

const CaseStudySection = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold text-(--color-primary) sm:text-4xl lg:text-5xl">
          From Chaos to 7-Figure Scale
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
          See how we helped a SaaS founder:
        </p>

        <ul className="mt-4 space-y-2 text-base leading-relaxed text-slate-700 sm:text-lg">
          {outcomes.map((outcome) => (
            <li key={outcome}>- {outcome}</li>
          ))}
        </ul>

        <Link
          href="/case-studies"
          className="mt-7 inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 px-8 text-base font-semibold text-(--color-primary) transition-colors duration-300 hover:bg-slate-100"
        >
          View Case Study -&gt;
        </Link>
      </div>
    </section>
  );
};

export default CaseStudySection;
