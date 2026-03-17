"use client";

import { useEffect } from "react";
import { useForm, Controller, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import {
  CreateProjectSchema,
  CreateProjectInput,
} from "@/schemas/project.schema";
import { Project } from "@/app/api-client/projects/useGetProjects";
import { IoClose, IoAdd, IoSaveOutline } from "react-icons/io5";
import { cn } from "@/utilities/cn";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const PROJECT_TYPES = [
  { value: "PRODUCT_LAUNCH", label: "🚀 Product Launch" },
  { value: "INVESTMENT_NEW_COMPANY", label: "🌱 Investment — New Company" },
  { value: "INVESTMENT_OLD_COMPANY", label: "🏢 Investment — Old Company" },
  { value: "BUYING_PRODUCTS", label: "🛒 Buying Products" },
] as const;

interface ProjectFormModalProps {
  mode: "create" | "edit";
  defaultValues?: Partial<Project>;
  onSubmit: (data: CreateProjectInput) => Promise<void>;
  isPending: boolean;
  onClose: () => void;
}

const ProjectFormModal = ({
  mode,
  defaultValues,
  onSubmit,
  isPending,
  onClose,
}: ProjectFormModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(CreateProjectSchema) as Resolver<CreateProjectInput>,
    defaultValues: {
      title: "",
      type: "PRODUCT_LAUNCH",
      budget: "",
      description: "",
      published: false,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        title: defaultValues.title ?? "",
        type:
          (defaultValues.type as CreateProjectInput["type"]) ??
          "PRODUCT_LAUNCH",
        budget: defaultValues.budget ?? "",
        description: defaultValues.description ?? "",
        published: defaultValues.published ?? false,
      });
    }
  }, [defaultValues, reset]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--color-primary)]/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* ── Header ── */}
        <div className="relative shrink-0 bg-[var(--color-primary)] px-6 py-5">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 90% 50%, var(--color-secondary) 0%, transparent 55%)",
            }}
          />
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-white/10">
                {mode === "create" ? (
                  <IoAdd className="size-5 text-white" />
                ) : (
                  <IoSaveOutline className="size-4 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-base font-bold text-white">
                  {mode === "create" ? "Add New Project" : "Edit Project"}
                </h2>
                <p className="text-xs text-white/60">
                  {mode === "create"
                    ? "Fill in the details below"
                    : "Update project information"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <IoClose className="size-5" />
            </button>
          </div>
        </div>

        {/* ── Scrollable form ── */}
        <div className="flex-1 overflow-y-auto p-6">
          <form
            id="project-form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Project Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-wider text-[var(--color-primary)] uppercase">
                Project Type
              </label>
              <select
                {...register("type")}
                className={cn(
                  "w-full rounded-xl border py-3 pr-10 pl-4 text-sm text-gray-900 transition-all outline-none",
                  "focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)]/20",
                  errors.type
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300",
                )}
              >
                {PROJECT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="text-xs font-medium text-red-500">
                  {errors.type.message}
                </p>
              )}
            </div>

            {/* Title */}
            <FormField
              label="Project Name"
              error={errors.title?.message}
              {...register("title")}
            />

            {/* Budget */}
            <FormField
              label="Budget"
              error={errors.budget?.message}
              {...register("budget")}
            />

            {/* Description — MD Editor */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-wider text-[var(--color-primary)] uppercase">
                Description
              </label>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <div
                    data-color-mode="light"
                    className={cn(
                      "overflow-hidden rounded-xl border transition-all",
                      errors.description ? "border-red-400" : "border-gray-200",
                    )}
                  >
                    <MDEditor
                      value={field.value}
                      onChange={(val) => field.onChange(val ?? "")}
                      height={260}
                      preview="edit"
                    />
                  </div>
                )}
              />
              {errors.description && (
                <p className="text-xs font-medium text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* ── Visibility: segmented control ── */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-wider text-[var(--color-primary)] uppercase">
                Visibility
              </label>
              <Controller
                control={control}
                name="published"
                render={({ field }) => (
                  <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 p-1">
                    <button
                      type="button"
                      onClick={() => field.onChange(false)}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all duration-150",
                        !field.value
                          ? "bg-white text-[var(--color-primary)] shadow-sm"
                          : "text-gray-400 hover:text-gray-600",
                      )}
                    >
                      <span
                        className={cn(
                          "size-2 rounded-full transition-colors",
                          !field.value ? "bg-amber-400" : "bg-gray-300",
                        )}
                      />
                      Draft
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange(true)}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all duration-150",
                        field.value
                          ? "bg-white text-[var(--color-primary)] shadow-sm"
                          : "text-gray-400 hover:text-gray-600",
                      )}
                    >
                      <span
                        className={cn(
                          "size-2 rounded-full transition-colors",
                          field.value ? "bg-emerald-400" : "bg-gray-300",
                        )}
                      />
                      Published
                    </button>
                  </div>
                )}
              />
              <p className="text-xs text-gray-400">
                Draft projects are only visible to admins. Published projects
                appear on the public site.
              </p>
            </div>
          </form>
        </div>

        {/* ── Footer ── */}
        <div className="shrink-0 border-t border-gray-100 bg-gray-50 px-6 py-4">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="project-form"
              disabled={isPending}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-white shadow-sm transition-all active:scale-[0.98]",
                isPending
                  ? "cursor-not-allowed bg-[var(--color-primary)]/50"
                  : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-600)]",
              )}
            >
              {isPending ? (
                <>
                  <svg
                    className="size-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  {mode === "create" ? "Creating..." : "Saving..."}
                </>
              ) : mode === "create" ? (
                "Create Project"
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Reusable input ────────────────────────────────────────────────────────────
interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormField = ({ label, error, ...props }: FormFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold tracking-wider text-[var(--color-primary)] uppercase">
      {label}
    </label>
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border px-4 py-3 text-sm text-gray-900 transition-all outline-none",
        "focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)]/20",
        error
          ? "border-red-400 bg-red-50"
          : "border-gray-200 bg-gray-50 hover:border-gray-300",
      )}
    />
    {error && <p className="text-xs font-medium text-red-500">{error}</p>}
  </div>
);

export default ProjectFormModal;
