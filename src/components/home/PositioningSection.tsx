const pillars = [
  "Generate consistent qualified leads",
  "Convert prospects into predictable revenue",
  "Automate operations to remove bottlenecks",
  "Turn growth into a repeatable process",
];

const PositioningSection = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold text-(--color-primary) sm:text-4xl lg:text-5xl">
          We Build Systems. Not Short-Term Hacks.
        </h2>

        <p className="mt-5 text-base leading-relaxed text-slate-700 sm:text-lg">
          Most consultants sell campaigns.
          <br />
          We build infrastructure.
        </p>

        <p className="mt-5 text-base leading-relaxed text-slate-700 sm:text-lg">
          At Puram Consultancy, we design scalable systems that:
        </p>

        <ul className="mt-4 space-y-2 text-base leading-relaxed text-slate-700 sm:text-lg">
          {pillars.map((pillar) => (
            <li key={pillar}>- {pillar}</li>
          ))}
        </ul>

        <p className="mt-7 text-base leading-relaxed text-slate-700 sm:text-lg">
          Because real scaling isn&apos;t about doing more.
          <br />
          It&apos;s about doing the right things - systematically.
        </p>
      </div>
    </section>
  );
};

export default PositioningSection;
