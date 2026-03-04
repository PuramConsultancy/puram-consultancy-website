import Link from "next/link";

import { PageShell } from "@/components/ui/page-shell";
import { SurfaceCard } from "@/components/ui/surface-card";

import { contactLinks } from "@/data/contactLinks";
import { socialLinks } from "@/data/socialLinks";

const ContactPage = () => {
  return (
    <PageShell>
      <header className="rounded-3xl bg-(--color-primary) p-6 text-(--color-primary-50) sm:p-8 lg:p-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-(--color-secondary-300)">
          Contact
        </p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">
          Let&apos;s Talk About Your Growth Goals
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-(--color-primary-100) sm:text-lg">
          Share your business stage and current bottlenecks. We will guide you
          with the right next steps.
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <SurfaceCard as="article">
          <h2 className="text-2xl font-semibold text-(--color-primary) sm:text-3xl">
            Reach Us Directly
          </h2>
          <ul className="mt-5 space-y-3 text-sm sm:text-base">
            {contactLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-slate-700 transition-colors duration-300 hover:text-(--color-secondary)"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </SurfaceCard>

        <SurfaceCard as="article" tone="muted">
          <h2 className="text-2xl font-semibold text-(--color-primary) sm:text-3xl">
            Follow Us
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-300 px-4 text-sm font-medium text-(--color-primary) transition-colors duration-300 hover:border-(--color-secondary) hover:text-(--color-secondary)"
                >
                  <Icon className="text-base" />
                  {social.name}
                </Link>
              );
            })}
          </div>
        </SurfaceCard>
      </section>
    </PageShell>
  );
};

export default ContactPage;
