const painPoints = [
  "Revenue that fluctuates unpredictably",
  "Marketing that burns cash but lacks ROI clarity",
  "Teams overwhelmed with manual processes",
  "Founder bottlenecks slowing growth",
  "Launches that underperform",
];

const ProblemSection = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold text-(--color-primary) sm:text-4xl lg:text-5xl">
          Scaling Shouldn&apos;t Feel This Hard
        </h2>

        <p className="mt-5 text-lg text-slate-600">If you&apos;re experiencing:</p>

        <ul className="mt-4 space-y-2 text-base leading-relaxed text-slate-700 sm:text-lg">
          {painPoints.map((point) => (
            <li key={point}>- {point}</li>
          ))}
        </ul>

        <p className="mt-7 text-lg leading-relaxed text-slate-700 sm:text-xl">
          You don&apos;t have a marketing problem.
          <br />
          You have a systems problem.
          <br />
          And tactics won&apos;t fix it.
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;
