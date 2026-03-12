"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { IoArrowForward } from "react-icons/io5";
import { PublicForm } from "@/app/api-client/forms/useGetPublicForms";

interface FormsSectionProps {
  forms: PublicForm[];
}

const FormsSection = ({ forms }: FormsSectionProps) => {
  const router = useRouter();

  if (forms.length === 0) return null;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-(--color-primary) px-6 py-10 sm:px-10 sm:py-14">
      {/* ── Grain texture overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ── Radial glow — top right ── */}
      <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-(--color-secondary)/15 blur-3xl" />
      {/* ── Radial glow — bottom left ── */}
      <div className="pointer-events-none absolute -bottom-24 -left-16 size-80 rounded-full bg-white/5 blur-2xl" />

      {/* ── Layout: heading left | CTA right ── */}
      <div className="relative flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            {/* Accent bar */}
            <span className="block h-4 w-1 rounded-full bg-(--color-secondary)" />
            <p className="text-xs font-bold tracking-[0.22em] text-(--color-secondary) uppercase">
              Forms & Applications
            </p>
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            Get Started Today
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
            Choose the form that fits your needs — we respond within 24 hours.
          </p>
        </div>

        {/* Subtle form count badge */}
        <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-center backdrop-blur-sm">
          <p className="text-2xl font-bold text-white">{forms.length}</p>
          <p className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">
            {forms.length === 1 ? "Form" : "Forms"}
          </p>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="relative mt-8 h-px w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent" />

      {/* ── Cards grid ── */}
      <div className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {forms.map((form, i) => (
          <motion.button
            key={form.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => router.push(`/contact/forms/${form.id}`)}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-sm transition-all duration-300 hover:border-(--color-secondary)/40 hover:bg-white/10"
          >
            {/* Hover glow behind card */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 0% 100%, var(--color-secondary, #e85d26) 0%, transparent 60%)",
                opacity: 0,
              }}
            />

            {/* Top row: number + arrow */}
            <div className="flex items-start justify-between">
              {/* Step number */}
              <span className="flex size-8 items-center justify-center rounded-lg bg-(--color-secondary)/20 text-xs font-bold text-(--color-secondary)">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Arrow circle */}
              <span className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-(--color-secondary) group-hover:bg-(--color-secondary)">
                <IoArrowForward className="size-3.5 text-white/50 transition-colors group-hover:text-white" />
              </span>
            </div>

            {/* Text content */}
            <div className="mt-5">
              <p className="text-base leading-snug font-semibold text-white">
                {form.title}
              </p>
              {form.description ? (
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/50">
                  {form.description}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-white/30">
                  Click to open form →
                </p>
              )}
            </div>

            {/* Bottom accent line — slides in on hover */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-(--color-secondary) transition-all duration-300 group-hover:w-full" />
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default FormsSection;
