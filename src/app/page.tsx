import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-20 sm:px-6 lg:px-8">
        <p className="w-fit rounded-full border border-slate-300 bg-white px-4 py-1 text-sm font-medium text-slate-600">
          Trusted Business Advisory
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Strategic Consultancy That Moves Your Business Forward
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Puram Consultancy helps businesses improve operations, accelerate
          growth, and make confident decisions with practical, data-driven
          advisory services.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/services"
            className="rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
          >
            Explore Services
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 pb-20 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        {[
          {
            title: "Business Strategy",
            description:
              "Build clear roadmaps that align teams, priorities, and outcomes.",
          },
          {
            title: "Operational Excellence",
            description:
              "Optimize systems and processes to improve efficiency and profitability.",
          },
          {
            title: "Growth Advisory",
            description:
              "Scale with confidence using structured planning and market insight.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {item.description}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
