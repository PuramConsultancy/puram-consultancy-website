import Link from "next/link";

const keyPoints = [
  {
    title: "Who We Are",
    description:
      "Puram Consultancy is a growth-focused consulting platform that helps founders and teams scale with clarity.",
  },
  {
    title: "What We Do",
    description:
      "We align strategy, systems, and execution so businesses can grow consistently without operational chaos.",
  },
  {
    title: "How We Work",
    description:
      "Simple plans, measurable actions, and practical implementation tailored to your current business stage.",
  },
];

const AboutPage = () => {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 py-6 sm:gap-10 sm:py-8 lg:gap-12 lg:py-10">
      <header className="rounded-3xl bg-(--color-primary) p-6 text-white sm:p-8 lg:p-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#FD5E02]">
          About Us
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
          Building Better Growth Systems for Modern Businesses
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-(--color-primary-100) sm:text-lg">
          We help businesses move from scattered efforts to structured growth.
          Our focus is to create reliable systems that improve performance,
          decision-making, and long-term expansion.
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
        <h2 className="text-2xl font-semibold text-(--color-primary) sm:text-3xl">
          About Puram Consultancy
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
          Puram Consultancy combines strategic consulting and execution support
          to help founders and growing companies scale with confidence. We keep
          the process clear, focused, and result-oriented.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {keyPoints.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-7"
          >
            <h3 className="text-xl font-semibold text-(--color-primary) sm:text-2xl">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {item.description}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-(--color-primary) sm:text-3xl">
              Short and Clean. Strategy That Works.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
              We believe business growth should feel structured, not stressful.
              Our team helps you prioritize what matters, execute faster, and
              build systems that support sustainable success.
            </p>
          </div>

          <div className="rounded-2xl bg-(--color-secondary) p-5 text-white sm:p-6">
            <p className="text-sm font-semibold tracking-[0.14em] uppercase text-orange-100">
              Next Step
            </p>
            <p className="mt-2 text-lg font-semibold sm:text-xl">
              Ready to scale with a clear roadmap?
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-(--color-primary) px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#012732]"
            >
              Book Strategy Call
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AboutPage;
