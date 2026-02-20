const posts = [
  {
    title: "How to Build a Predictable Growth System",
    description:
      "A practical framework for turning inconsistent revenue into repeatable growth.",
    meta: "Strategy",
  },
  {
    title: "Operational Bottlenecks That Slow Down Scaling",
    description:
      "Common execution gaps that hold founders back and how to fix them.",
    meta: "Operations",
  },
  {
    title: "From Lead Generation to Revenue Consistency",
    description:
      "How to connect messaging, conversion, and follow-up into one working system.",
    meta: "Growth",
  },
];

const BlogsPage = () => {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 py-6 sm:gap-10 sm:py-8 lg:gap-12 lg:py-10">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-(--color-secondary)">
          Insights
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-(--color-primary) sm:text-4xl lg:text-5xl">
          Blogs and Practical Business Insights
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-700 sm:text-lg">
          Short, clear, and actionable content for founders and teams focused
          on better strategy, better systems, and better growth outcomes.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.title}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
          >
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-(--color-secondary)">
              {post.meta}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-(--color-primary) sm:text-2xl">
              {post.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {post.description}
            </p>
          </article>
        ))}
      </section>
    </section>
  );
};

export default BlogsPage;
