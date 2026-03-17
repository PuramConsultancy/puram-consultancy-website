// components/projects/InquiryModal.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProjectInquirySchema,
  ProjectInquiryInput,
} from "@/schemas/project.schema";
import { useSubmitInquiry } from "@/app/api-client/projects/useProjectMutations";
import { Project } from "@/app/api-client/projects/useGetProjects";
import {
  IoClose,
  IoCheckmarkCircle,
  IoMailOutline,
  IoCallOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { cn } from "@/utilities/cn";

interface InquiryModalProps {
  project: Project;
  onClose: () => void;
}

const InquiryModal = ({ project, onClose }: InquiryModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync, isPending } = useSubmitInquiry(project.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectInquiryInput>({
    resolver: zodResolver(ProjectInquirySchema),
  });

  const onSubmit = async (data: ProjectInquiryInput) => {
    await mutateAsync({ body: data });
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--color-primary)]/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Modal header with brand gradient */}
        <div className="relative bg-[var(--color-primary)] px-6 py-5">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 50%, var(--color-secondary) 0%, transparent 60%)",
            }}
          />
          <div className="relative flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white">
                Contact Puram for Details
              </h2>
              <p className="mt-0.5 line-clamp-1 text-sm text-white/60">
                Re: {project.title}
              </p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <IoClose className="size-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-[var(--color-secondary-50)]">
                <IoCheckmarkCircle className="size-10 text-[var(--color-secondary)]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--color-primary)]">
                  Inquiry Submitted!
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Our team will reach out to you shortly.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-1 rounded-xl bg-[var(--color-primary)] px-8 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--color-primary-600)]"
              >
                Done
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                label="Full Name"
                placeholder="John Doe"
                icon={<IoPersonOutline className="size-4 text-gray-400" />}
                error={errors.fullName?.message}
                {...register("fullName")}
              />
              <FormField
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                icon={<IoMailOutline className="size-4 text-gray-400" />}
                error={errors.email?.message}
                {...register("email")}
              />
              <FormField
                label="Phone Number"
                type="tel"
                placeholder="+91 98765 43210"
                icon={<IoCallOutline className="size-4 text-gray-400" />}
                error={errors.phone?.message}
                {...register("phone")}
              />

              <button
                type="submit"
                disabled={isPending}
                className={cn(
                  "mt-1 w-full rounded-xl py-3 text-sm font-bold text-white shadow-sm transition-all active:scale-[0.98]",
                  isPending
                    ? "cursor-not-allowed bg-[var(--color-primary)]/50"
                    : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-600)]",
                )}
              >
                {isPending ? "Submitting..." : "Submit Inquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Reusable branded form field ───────────────────────────────────────────────
interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const FormField = ({ label, error, icon, ...props }: FormFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold tracking-wider text-[var(--color-primary)] uppercase">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={cn(
          "w-full rounded-xl border py-3 pr-4 text-sm text-gray-900 transition-all outline-none",
          "placeholder:text-gray-400",
          "focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)]/20",
          icon ? "pl-10" : "pl-4",
          error
            ? "border-red-400 bg-red-50"
            : "border-gray-200 bg-gray-50 hover:border-gray-300",
        )}
      />
    </div>
    {error && (
      <p className="flex items-center gap-1 text-xs font-medium text-red-500">
        {error}
      </p>
    )}
  </div>
);

export default InquiryModal;
