"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { PageShell } from "@/components/ui/page-shell";
import { SurfaceCard } from "@/components/ui/surface-card";
import { contactLinks } from "@/data/contactLinks";
import { socialLinks } from "@/data/socialLinks";
import ContactForm from "./ContactForm";
import DynamicForm from "./DynamicForm";
import { IoDocumentText, IoArrowBack } from "react-icons/io5";
import { motion } from "motion/react";
import { PublicForm } from "@/app/api-client/forms/useGetPublicForms";

interface ContactPageClientProps {
  forms: PublicForm[];
}

const ContactPageClient = ({ forms }: ContactPageClientProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedFormId = searchParams.get("form");

  return (
    <PageShell>
      {/* ── Hero header ── */}
      <header className="rounded-3xl bg-(--color-primary) p-6 text-(--color-primary-50) sm:p-8 lg:p-10">
        <p className="text-xs font-semibold tracking-[0.18em] text-(--color-secondary-300) uppercase">
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
      {/* ── Dynamic form view (when ?form=id is in URL) ── */}
      {selectedFormId ? (
        <SurfaceCard as="section">
          <button
            onClick={() => router.push("/contact")}
            className="mb-5 flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-(--color-primary)"
          >
            <IoArrowBack className="size-3.5" /> Back to all forms
          </button>
          <DynamicForm formId={selectedFormId} />
        </SurfaceCard>
      ) : (
        <>
          {/* ── Form picker — instantly rendered, data came from server ── */}
          {forms.length > 0 && (
            <SurfaceCard as="section">
              <h2 className="text-2xl font-semibold text-(--color-primary) sm:text-3xl">
                Applications & Inquiries
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Choose the form that best matches your inquiry.
              </p>

              <div className="mt-5 flex flex-col gap-3">
                {forms.map((form, i) => (
                  <motion.button
                    key={form.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => router.push(`/contact?form=${form.id}`)}
                    className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-left transition-all hover:border-(--color-primary)/30 hover:shadow-sm"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-(--color-primary)/8 text-(--color-primary)">
                      <IoDocumentText className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-(--color-primary)">
                        {form.title}
                      </p>
                      {form.description && (
                        <p className="mt-0.5 truncate text-xs text-slate-400">
                          {form.description}
                        </p>
                      )}
                    </div>
                    <span className="text-xs font-medium text-(--color-secondary) opacity-0 transition-opacity group-hover:opacity-100">
                      Open →
                    </span>
                  </motion.button>
                ))}
              </div>
            </SurfaceCard>
          )}

          {/* ── Default booking form (always shown) ── */}
          <SurfaceCard as="section" id="booking-form-section">
            <h2 className="text-2xl font-semibold text-(--color-primary) sm:text-3xl">
              Booking Form
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              Fill in the details below and our team will reach out for your
              booking inquiry.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </SurfaceCard>
        </>
      )}

      {/* ── Contact cards ── */}
      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <SurfaceCard as="article" hoverable>
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

        <SurfaceCard as="article" tone="muted" hoverable>
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

export default ContactPageClient;
