"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import {
  IoCheckmarkCircle,
  IoAlertCircle,
  IoArrowBack,
  IoChevronForward,
} from "react-icons/io5";
import { useGetPublicForm } from "@/app/api-client/forms/useGetPublicForm";
import InputGroup from "@/components/Form/InputGroup";
import Button from "@/components/Button";
import RawInput from "@/components/Form/Rawinput";

// ── Shared base styles for textarea / select (mirrors RawInput) ──────────────
const baseFieldCls =
  "w-full rounded-xl border-[1.5px] border-gray-300 bg-transparent px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] text-sm text-gray-800 placeholder:text-gray-500 outline-none transition-all duration-150 hover:border-gray-400 data-[invalid]:border-red-700 focus:border-primary";

type Answers = Record<string, string | string[]>;
type FieldErrors = Record<string, string>;

// ── Plain field wrapper — no RHF FormContext needed ──────────────────────────
const FieldWrapper = ({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: string;
}) => (
  <div className="group w-full space-y-1">
    {children}
    {error && (
      <p className="text-xs font-medium text-red-500" role="alert">
        {error}
      </p>
    )}
  </div>
);

// ── Shared label ─────────────────────────────────────────────────────────────
const FieldLabel = ({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) => (
  <label className="block text-sm font-medium text-slate-700">
    {label}
    {required && <span className="ml-1 text-(--color-secondary)">*</span>}
  </label>
);

// ── Main component ───────────────────────────────────────────────────────────
const DynamicForm = ({ formId }: { formId: string }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetPublicForm(formId);
  const form = data?.data;

  const [answers, setAnswers] = useState<Answers>({});
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const setAnswer = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setFieldErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const toggleCheckbox = (id: string, value: string) => {
    setAnswers((prev) => {
      const current = (prev[id] as string[]) ?? [];
      return {
        ...prev,
        [id]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
    setFieldErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validate = (): boolean => {
    const errors: FieldErrors = {};
    form?.sections.forEach((section) => {
      section.questions.forEach((q) => {
        if (!q.required) return;
        const val = answers[q.id];
        const isEmpty =
          !val || val === "" || (Array.isArray(val) && val.length === 0);
        if (isEmpty) errors[q.id] = "This field is required";
      });
    });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await axios.post(`/api/forms/${formId}/submit`, { data: answers });
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Loading skeleton ──
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 py-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-11 animate-pulse rounded-xl bg-slate-100" />
        ))}
      </div>
    );
  }

  // ── Error state ──
  if (isError || !form) {
    return (
      <div className="rounded-xl bg-red-50 px-4 py-6 text-center text-sm text-red-500">
        This form could not be loaded. Please try again later.
      </div>
    );
  }

  // ── Success state ──
  if (submitStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 rounded-2xl bg-emerald-50 px-6 py-12 text-center"
      >
        <IoCheckmarkCircle className="size-14 text-emerald-500" />
        <h3 className="text-xl font-semibold text-(--color-primary)">
          Submitted Successfully!
        </h3>
        <p className="max-w-sm text-sm text-slate-500">
          Thank you for filling out <strong>{form.title}</strong>. Our team will
          get back to you shortly.
        </p>
        <button
          onClick={() => router.push("/contact")}
          className="mt-3 flex items-center gap-1.5 text-sm font-medium text-(--color-secondary) hover:underline"
        >
          <IoArrowBack className="size-3.5" /> Back to forms
        </button>
      </motion.div>
    );
  }

  // ── Form ──
  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Header */}
      <div className="mb-5 border-b border-slate-100 pb-4">
        <h3 className="text-xl font-semibold text-(--color-primary)">
          {form.title}
        </h3>
        {form.description && (
          <p className="mt-1 text-sm text-slate-500">{form.description}</p>
        )}
      </div>

      {form.sections.map((section, si) => (
        <div key={section.id} className="space-y-4">
          {section.title && (
            <div className="mt-6 mb-3 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-(--color-primary) text-[11px] font-bold text-white">
                {si + 1}
              </span>
              <h4 className="text-sm font-semibold text-(--color-primary)">
                {section.title}
              </h4>
            </div>
          )}

          {section.questions.map((q) => (
            <FieldWrapper key={q.id} error={fieldErrors[q.id]}>
              <FieldLabel label={q.label} required={q.required} />

              {/* TEXT */}
              {q.type === "TEXT" && (
                <InputGroup>
                  <RawInput
                    placeholder={`Enter ${q.label.toLowerCase()}`}
                    value={(answers[q.id] as string) ?? ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    hasError={!!fieldErrors[q.id]}
                  />
                </InputGroup>
              )}

              {/* EMAIL */}
              {q.type === "EMAIL" && (
                <InputGroup>
                  <RawInput
                    type="email"
                    placeholder="you@example.com"
                    value={(answers[q.id] as string) ?? ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    hasError={!!fieldErrors[q.id]}
                  />
                </InputGroup>
              )}

              {/* PHONE / PHONE_INTERNATIONAL */}
              {(q.type === "PHONE" || q.type === "PHONE_INTERNATIONAL") && (
                <InputGroup>
                  <RawInput
                    type="tel"
                    placeholder={
                      q.type === "PHONE_INTERNATIONAL"
                        ? "+1 (555) 000-0000"
                        : "Enter phone number"
                    }
                    value={(answers[q.id] as string) ?? ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    hasError={!!fieldErrors[q.id]}
                  />
                </InputGroup>
              )}

              {/* NUMBER */}
              {q.type === "NUMBER" && (
                <InputGroup>
                  <RawInput
                    type="number"
                    placeholder="0"
                    value={(answers[q.id] as string) ?? ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    hasError={!!fieldErrors[q.id]}
                  />
                </InputGroup>
              )}

              {/* DATE */}
              {q.type === "DATE" && (
                <InputGroup>
                  <RawInput
                    type="date"
                    value={(answers[q.id] as string) ?? ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    hasError={!!fieldErrors[q.id]}
                  />
                </InputGroup>
              )}

              {/* TEXTAREA */}
              {q.type === "TEXTAREA" && (
                <textarea
                  rows={4}
                  value={(answers[q.id] as string) ?? ""}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  placeholder={`Enter ${q.label.toLowerCase()}`}
                  data-invalid={fieldErrors[q.id] ? true : undefined}
                  className={`${baseFieldCls} resize-none`}
                />
              )}

              {/* DROPDOWN */}
              {q.type === "DROPDOWN" && (
                <select
                  value={(answers[q.id] as string) ?? ""}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  data-invalid={fieldErrors[q.id] ? true : undefined}
                  className={baseFieldCls}
                >
                  <option value="">Select an option</option>
                  {q.options.map((opt) => (
                    <option key={opt.id} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}

              {/* MULTIPLE CHOICE */}
              {q.type === "MULTIPLE_CHOICE" && (
                <div className="flex flex-col gap-2">
                  {q.options.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition-all ${
                        answers[q.id] === opt.value
                          ? "border-(--color-primary)/30 bg-(--color-primary)/5 font-medium text-(--color-primary)"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.value}
                        checked={answers[q.id] === opt.value}
                        onChange={(e) => setAnswer(q.id, e.target.value)}
                        className="accent-[var(--color-primary)]"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              )}

              {/* CHECKBOX */}
              {q.type === "CHECKBOX" && (
                <div className="flex flex-col gap-2">
                  {q.options.map((opt) => {
                    const checked = (
                      (answers[q.id] as string[]) ?? []
                    ).includes(opt.value);
                    return (
                      <label
                        key={opt.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition-all ${
                          checked
                            ? "border-(--color-secondary)/30 bg-(--color-secondary)/5 font-medium text-(--color-primary)"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          value={opt.value}
                          checked={checked}
                          onChange={() => toggleCheckbox(q.id, opt.value)}
                          className="accent-[var(--color-secondary)]"
                        />
                        {opt.label}
                      </label>
                    );
                  })}
                </div>
              )}

              {/* FILE */}
              {q.type === "FILE" && (
                <input
                  type="file"
                  onChange={(e) =>
                    setAnswer(q.id, e.target.files?.[0]?.name ?? "")
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-(--color-primary)/10 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-(--color-primary)"
                />
              )}
            </FieldWrapper>
          ))}
        </div>
      ))}

      <AnimatePresence>
        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            <IoAlertCircle className="size-4 shrink-0" />
            Something went wrong. Please try again.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-2">
        <Button type="submit" isLoading={isSubmitting} className="w-full bg-(--color-secondary) hover:bg-(--color-secondary)/90 text-white">
          Submit 
        </Button>
      </div>
    </form>
  );
};

export default DynamicForm;
