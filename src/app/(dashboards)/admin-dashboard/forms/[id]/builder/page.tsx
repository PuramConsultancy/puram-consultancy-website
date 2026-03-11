"use client";

import { useState, useCallback, use, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useGetForm } from "@/app/api-client/forms/useGetForm";
import { useCreateSection } from "@/app/api-client/forms/useCreateSection";
import { useUpdateSection } from "@/app/api-client/forms/useUpdateSection";
import { useCreateQuestion } from "@/app/api-client/forms/useCreateQuestion";
import { useApi } from "@/app/providers/ApiProvider";
import { QuestionType, Section, isDbId } from "./types";
import { useSections } from "@/hooks/useSections";
import { BuilderToolbar } from "@/components/builder/Buildertoolbar";
import { SectionBlock } from "@/components/builder/Sectionblock";

export default function FormBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: formId } = use(params);
  const router = useRouter();
  const { jsonApiClient } = useApi();

  const [formTitle, setFormTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">(
    "idle",
  );

  const {
    sections,
    setSections,
    addSection,
    updateSectionTitle,
    addQuestion,
    updateQuestion,
    reorderQuestions,
  } = useSections();

  // ── API hooks ──
  const { data: formData, isLoading, refetch } = useGetForm(formId);
  const { mutateAsync: createSection } = useCreateSection({
    invalidateQueryKey: [`form-${formId}`],
  });
  const { mutateAsync: updateSection } = useUpdateSection({
    invalidateQueryKey: [`form-${formId}`],
  });
  const { mutateAsync: createQuestion } = useCreateQuestion({
    invalidateQueryKey: [`form-${formId}`],
  });

  // ── Load form data into local state ──
  useEffect(() => {
    if (!formData?.data) return;
    setFormTitle(formData.data.title);
    setSections(
      formData.data.sections.map(
        (s): Section => ({
          id: s.id,
          title: s.title,
          order: s.order,
          questions: s.questions.map((q) => ({
            id: q.id,
            label: q.label,
            type: q.type as QuestionType,
            required: q.required,
            order: q.order,
            options: q.options.map((o) => ({
              id: o.id,
              label: o.label,
              value: o.value,
            })),
          })),
        }),
      ),
    );
  }, [formData, setSections]);

  // ── Delete section — calls API then refetches ──
  const handleDeleteSection = useCallback(
    async (sectionId: string) => {
      // Optimistic UI update
      setSections((prev) => prev.filter((s) => s.id !== sectionId));

      // Only call API if it's a real DB record
      if (isDbId(sectionId)) {
        try {
          await jsonApiClient.delete(
            `/api/forms/${formId}/sections/${sectionId}`,
          );
          await refetch(); // ✅ sync with DB
        } catch (error) {
          console.error("Failed to delete section:", error);
          await refetch(); // revert optimistic update on error
        }
      }
    },
    [formId, jsonApiClient, refetch, setSections],
  );

  // ── Delete question — calls API then refetches ──
  const handleDeleteQuestion = useCallback(
    async (sectionId: string, questionId: string) => {
      // Optimistic UI update
      setSections((prev) =>
        prev.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                questions: s.questions.filter((q) => q.id !== questionId),
              }
            : s,
        ),
      );

      // Only call API if it's a real DB record
      if (isDbId(questionId)) {
        try {
          await jsonApiClient.delete(
            `/api/forms/${formId}/sections/${sectionId}/questions/${questionId}`,
          );
          await refetch(); // ✅ sync with DB
        } catch (error) {
          console.error("Failed to delete question:", error);
          await refetch(); // revert on error
        }
      }
    },
    [formId, jsonApiClient, refetch, setSections],
  );

  // ── Save ──
  const handleSave = useCallback(async () => {
    setIsSaving(true);
    setSaveStatus("idle");

    try {
      for (const section of sections) {
        let savedSectionId = section.id;

        if (!isDbId(section.id)) {
          // New section → create
          const res = await createSection({
            params: { id: formId },
            body: { title: section.title, order: section.order },
          });
          savedSectionId = res.data.id;
        } else {
          // Existing section → update title/order
          await updateSection({
            params: { id: formId, sectionId: section.id },
            body: { title: section.title, order: section.order },
          });
        }

        // Only save new (non-DB) questions
        for (const question of section.questions) {
          if (isDbId(question.id)) continue;

          await createQuestion({
            params: { id: formId, sectionId: savedSectionId },
            body: {
              label: question.label || "Untitled Question",
              type: question.type,
              required: question.required,
              order: question.order,
              options: question.options.map(
                ({ label, value }: { label: string; value: string }) => ({
                  label,
                  value,
                }),
              ),
            },
          });
        }
      }

      // ✅ Refetch from DB — this replaces all temp IDs with real ones
      // and makes questions appear correctly after save
      await refetch();

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  }, [formId, sections, createSection, updateSection, createQuestion, refetch]);

  const totalQuestions = sections.reduce(
    (acc, s) => acc + s.questions.length,
    0,
  );

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 bg-gray-50">
        <div className="size-7 animate-spin rounded-full border-2 border-(--color-primary) border-t-transparent" />
        <p className="text-xs text-gray-400">Loading form...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-gray-50">
      {/* Toolbar */}
      <BuilderToolbar
        formTitle={formTitle}
        isSaving={isSaving}
        saveStatus={saveStatus}
        onBack={() => router.back()}
        onPreview={() =>
          router.push(`/admin-dashboard/forms/${formId}/preview`)
        }
        onSave={handleSave}
      />

      {/* Canvas */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-4 py-8">
          {/* Form header */}
          <div className="mb-6 overflow-hidden rounded-2xl bg-(--color-primary) px-6 py-5 text-white shadow-md">
            <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
              Form Builder
            </p>
            <h2 className="mt-1 text-xl font-bold">
              {formTitle || "Untitled Form"}
            </h2>
            <div className="mt-3 flex items-center gap-4 border-t border-white/10 pt-3">
              <span className="text-xs text-white/50">
                <span className="font-semibold text-white">
                  {sections.length}
                </span>{" "}
                section{sections.length !== 1 ? "s" : ""}
              </span>
              <span className="text-white/20">·</span>
              <span className="text-xs text-white/50">
                <span className="font-semibold text-white">
                  {totalQuestions}
                </span>{" "}
                question{totalQuestions !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Empty state */}
          {sections.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
              <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-(--color-primary)/8 text-(--color-primary)">
                <IoAdd className="size-6" />
              </div>
              <p className="text-sm font-semibold text-gray-600">
                Start building your form
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Add a section to get started
              </p>
            </div>
          )}

          {/* Sections */}
          <div className="flex flex-col gap-4">
            {sections.map((section, index) => (
              <SectionBlock
                key={section.id}
                section={section}
                index={index}
                isLast={index === sections.length - 1}
                onUpdateTitle={updateSectionTitle}
                onDeleteSection={handleDeleteSection}
                onAddQuestion={addQuestion}
                onUpdateQuestion={updateQuestion}
                onDeleteQuestion={handleDeleteQuestion}
                onReorderQuestions={reorderQuestions}
              />
            ))}
          </div>

          {/* Add section */}
          <button
            onClick={addSection}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white py-3 text-sm font-medium text-gray-400 transition-all hover:border-(--color-primary)/30 hover:bg-(--color-primary)/3 hover:text-(--color-primary)"
          >
            <IoAdd className="size-4" /> Add Section
          </button>
        </div>
      </div>
    </div>
  );
}
