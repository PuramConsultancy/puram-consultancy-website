import Link from "next/link";

export default function FooterCta() {
  return (
    <div className="border-b border-[var(--color-divider-on-primary)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Ready to scale your business?
        </h2>
        <p className="mt-3 max-w-2xl text-base text-[var(--color-on-primary-muted)]">
          Book a free strategy call with our experts today.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-md bg-[var(--color-secondary)] px-6 py-3 text-sm font-semibold text-[var(--color-on-primary)] shadow-md transition-all duration-200 hover:bg-[var(--color-secondary-hover)] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)]"
        >
          Book a Free Strategy Call
        </Link>
      </div>
    </div>
  );
}

