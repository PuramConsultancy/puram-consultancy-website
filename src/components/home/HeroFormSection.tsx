"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { IoArrowForward, IoDocumentText } from "react-icons/io5";
import { LinkCta } from "@/components/ui/link-cta";
import { PublicForm } from "@/app/api-client/forms/useGetPublicForms";

interface HeroFormsSectionProps {
  forms: PublicForm[];
}

const HeroFormsSection = ({ forms }: HeroFormsSectionProps) => {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-(--color-primary)">
      {/* ── Grain texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ── Ambient glows ── */}
      <div className="pointer-events-none absolute -top-40 -right-40 size-[600px] rounded-full bg-(--color-secondary)/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 size-[400px] rounded-full bg-white/5 blur-3xl" />

      {/* ════════ HERO ════════ */}
      <div className="relative p-6 sm:p-8 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            {/* Eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-(--color-secondary)/30 bg-(--color-secondary)/10 px-3.5 py-1.5"
            >
              <span className="size-1.5 animate-pulse rounded-full bg-(--color-secondary)" />
              <span className="text-xs font-semibold tracking-wide text-(--color-secondary)">
                Trusted by 50+ growing businesses
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.08,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 text-3xl font-semibold text-white sm:text-4xl lg:text-[3.5rem] lg:leading-[1.12]"
            >
              Transform Your Business Into a{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-(--color-secondary)">
                  Predictable,
                </span>
                {/* Underline squiggle */}
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 6 Q50 1 100 5 Q150 9 200 4"
                    stroke="var(--color-secondary)"
                    strokeWidth="2"
                    strokeOpacity="0.4"
                    fill="none"
                  />
                </svg>
              </span>{" "}
              Scalable Growth Machine
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.16,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg lg:mx-0"
            >
              We help founders and SMEs build revenue systems, automation
              frameworks, and growth engines that scale — without chaos,
              burnout, or guesswork.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.5 }}
              className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <LinkCta href="/contact#booking-form" size="lg">
                Book Your Free Strategy Call
              </LinkCta>
              <LinkCta href="/process" variant="light" size="lg">
                See How It Works
              </LinkCta>
            </motion.div>
          </div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.14,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto w-full max-w-xl"
          >
            <div className="relative h-72 overflow-hidden rounded-2xl border border-white/15 shadow-2xl sm:h-96 lg:h-[420px]">
              <Image
                src="/Home page old photo.png"
                alt="Business analytics laptop workspace"
                fill
                className="object-cover"
                priority
              />
              {/* Subtle gradient overlay bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-(--color-primary)/60 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ════════ DIVIDER (only if forms exist) ════════ */}
      {forms.length > 0 && (
        <div className="relative mx-6 sm:mx-10 lg:mx-12">
          <div className="h-px bg-gradient-to-r from-white/20 via-white/8 to-transparent" />
          <span className="absolute top-1/2 left-0 size-1.5 -translate-y-1/2 rounded-full bg-(--color-secondary)" />
        </div>
      )}

      {/* ════════ FORMS ════════ */}
      {forms.length > 0 && (
        <div className="relative px-6 pt-8 pb-10 sm:px-10 sm:pb-12 lg:px-12">
          {/* Sub-heading */}
          <div className="mb-5 flex items-center gap-2">
            <span className="block h-3.5 w-0.5 rounded-full bg-(--color-secondary)" />
            <p className="text-xs font-bold tracking-[0.2em] text-(--color-secondary) uppercase">
              Forms & Applications
            </p>
          </div>

          {/* Cards — same style as your FormsSection */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {forms.map((form, i) => (
              <motion.button
                key={form.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                onClick={() => router.push(`/contact/forms/${form.id}`)}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-left backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/15 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-(--color-secondary) text-white shadow-sm">
                    <IoDocumentText className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm leading-tight font-semibold text-white">
                      {form.title}
                    </p>
                    {form.description && (
                      <p className="mt-0.5 line-clamp-1 text-xs text-white/50">
                        {form.description}
                      </p>
                    )}
                  </div>
                </div>
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/10 transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-(--color-secondary)">
                  <IoArrowForward className="size-3.5 text-white" />
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroFormsSection;
