import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { SurfaceCard } from "@/components/ui/surface-card";
import { IoDocumentText, IoArrowForward, IoArrowBack } from "react-icons/io5";

import { useGetPublicForms } from "@/app/api-client/forms/useGetPublicForms";
const FormsListPage = async () => {
  const forms = await useGetPublicForms();

  return (
    <PageShell>
      {/* Header */}
      <header className="rounded-3xl bg-(--color-primary) p-6 text-(--color-primary-50) sm:p-8 lg:p-10">
        <Link
          href="/contact"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-(--color-primary-100) transition-colors hover:text-white"
        >
          <IoArrowBack className="size-3.5" /> Back to Contact
        </Link>
        <p className="text-xs font-semibold tracking-[0.18em] text-(--color-secondary-300) uppercase">
          Applications & Inquiries
        </p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">
          Choose a Form
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-(--color-primary-100) sm:text-lg">
          Select the form that best matches your inquiry and we&apos;ll get back
          to you promptly.
        </p>
      </header>

      {/* Forms list */}
      <SurfaceCard as="section">
        {forms.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-400">
            No forms available at the moment. Please check back later.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {forms.map((form) => (
              <Link
                key={form.id}
                href={`/contact/forms/${form.id}`}
                className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-4 transition-all hover:border-(--color-primary)/30 hover:shadow-sm"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-(--color-secondary) text-white shadow-sm">
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
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 transition-all group-hover:translate-x-0.5 group-hover:bg-(--color-primary)">
                  <IoArrowForward className="size-3.5 text-slate-400 transition-colors group-hover:text-white" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </SurfaceCard>
    </PageShell>
  );
};

export default FormsListPage;
