"use client";

import { useState, useCallback, use } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IoAdd,
  IoTrash,
  IoChevronDown,
  IoChevronUp,
  IoSave,
  IoArrowBack,
  IoEye,
} from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

type QuestionType =
  | "TEXT"
  | "TEXTAREA"
  | "EMAIL"
  | "PHONE"
  | "NUMBER"
  | "MULTIPLE_CHOICE"
  | "CHECKBOX"
  | "DROPDOWN"
  | "DATE"
  | "FILE";

interface Option {
  id: string;
  label: string;
  value: string;
}

interface Question {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
  order: number;
  options: Option[];
}

interface Section {
  id: string;
  title: string;
  order: number;
  questions: Question[];
}

const QUESTION_TYPES: { value: QuestionType; label: string }[] = [
  { value: "TEXT", label: "Short Text" },
  { value: "TEXTAREA", label: "Long Text" },
  { value: "EMAIL", label: "Email" },
  { value: "PHONE", label: "Phone" },
  { value: "NUMBER", label: "Number" },
  { value: "MULTIPLE_CHOICE", label: "Multiple Choice" },
  { value: "CHECKBOX", label: "Checkbox" },
  { value: "DROPDOWN", label: "Dropdown" },
  { value: "DATE", label: "Date" },
  { value: "FILE", label: "File Upload" },
];

const OPTION_TYPES: QuestionType[] = [
  "MULTIPLE_CHOICE",
  "CHECKBOX",
  "DROPDOWN",
];

const uid = () => Math.random().toString(36).slice(2, 10);

// ─── Sortable Question Card ───────────────────────────────────────────────────

function SortableQuestion({
  question,
  sectionId,
  onUpdate,
  onDelete,
}: {
  question: Question;
  sectionId: string;
  onUpdate: (sectionId: string, q: Question) => void;
  onDelete: (sectionId: string, questionId: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const update = (patch: Partial<Question>) =>
    onUpdate(sectionId, { ...question, ...patch });

  const addOption = () =>
    update({
      options: [
        ...question.options,
        { id: uid(), label: "Option", value: `option_${uid()}` },
      ],
    });

  const updateOption = (id: string, label: string) =>
    update({
      options: question.options.map((o) =>
        o.id === id
          ? { ...o, label, value: label.toLowerCase().replace(/\s+/g, "_") }
          : o,
      ),
    });

  const deleteOption = (id: string) =>
    update({ options: question.options.filter((o) => o.id !== id) });

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Question Header */}
      <div className="flex items-center gap-2 p-3">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing"
        >
          <MdDragIndicator className="size-5" />
        </button>

        <input
          className="flex-1 bg-transparent text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none"
          placeholder="Question label..."
          value={question.label}
          onChange={(e) => update({ label: e.target.value })}
        />

        <select
          className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={question.type}
          onChange={(e) =>
            update({ type: e.target.value as QuestionType, options: [] })
          }
        >
          {QUESTION_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-1 text-xs text-gray-500">
          <input
            type="checkbox"
            checked={question.required}
            onChange={(e) => update({ required: e.target.checked })}
            className="accent-blue-600"
          />
          Required
        </label>

        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-gray-400 hover:text-gray-600"
        >
          {expanded ? (
            <IoChevronUp className="size-4" />
          ) : (
            <IoChevronDown className="size-4" />
          )}
        </button>

        <button
          onClick={() => onDelete(sectionId, question.id)}
          className="text-gray-300 transition-colors hover:text-red-500"
        >
          <IoTrash className="size-4" />
        </button>
      </div>

      {/* Options (for choice-type questions) */}
      {expanded && OPTION_TYPES.includes(question.type) && (
        <div className="border-t border-gray-100 px-4 pt-2 pb-3">
          <p className="mb-2 text-xs font-medium text-gray-500">Options</p>
          <div className="flex flex-col gap-1.5">
            {question.options.map((opt) => (
              <div key={opt.id} className="flex items-center gap-2">
                <div className="size-3 rounded-full border border-gray-300" />
                <input
                  className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={opt.label}
                  onChange={(e) => updateOption(opt.id, e.target.value)}
                />
                <button
                  onClick={() => deleteOption(opt.id)}
                  className="text-gray-300 transition-colors hover:text-red-500"
                >
                  <IoTrash className="size-3.5" />
                </button>
              </div>
            ))}
            <button
              onClick={addOption}
              className="mt-1 flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700"
            >
              <IoAdd className="size-3.5" /> Add option
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function SectionCard({
  section,
  onUpdateTitle,
  onDeleteSection,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onReorderQuestions,
}: {
  section: Section;
  onUpdateTitle: (id: string, title: string) => void;
  onDeleteSection: (id: string) => void;
  onAddQuestion: (sectionId: string) => void;
  onUpdateQuestion: (sectionId: string, q: Question) => void;
  onDeleteQuestion: (sectionId: string, questionId: string) => void;
  onReorderQuestions: (sectionId: string, questions: Question[]) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = section.questions.findIndex((q) => q.id === active.id);
    const newIndex = section.questions.findIndex((q) => q.id === over.id);
    const reordered = arrayMove(section.questions, oldIndex, newIndex).map(
      (q, i) => ({ ...q, order: i }),
    );
    onReorderQuestions(section.id, reordered);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
      {/* Section Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1">
          <input
            className="w-full bg-transparent text-base font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none"
            placeholder="Section title..."
            value={section.title}
            onChange={(e) => onUpdateTitle(section.id, e.target.value)}
          />
          <div className="mt-1 h-px bg-gray-200" />
        </div>
        <button
          onClick={() => onDeleteSection(section.id)}
          className="rounded-lg p-1.5 text-gray-300 transition-colors hover:bg-red-50 hover:text-red-500"
        >
          <IoTrash className="size-4" />
        </button>
      </div>

      {/* Questions */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={section.questions.map((q) => q.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {section.questions.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-400">
                No questions yet. Add one below.
              </p>
            )}
            {section.questions.map((q) => (
              <SortableQuestion
                key={q.id}
                question={q}
                sectionId={section.id}
                onUpdate={onUpdateQuestion}
                onDelete={onDeleteQuestion}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Add Question */}
      <button
        onClick={() => onAddQuestion(section.id)}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-blue-300 py-2.5 text-sm text-blue-500 transition-colors hover:border-blue-400 hover:bg-blue-50"
      >
        <IoAdd className="size-4" /> Add Question
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FormBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: formId } = use(params);
  const router = useRouter();
  const [formTitle] = useState("Untitled Form");
  const [sections, setSections] = useState<Section[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">(
    "idle",
  );

  // ── Section actions ──

  const addSection = () =>
    setSections((prev) => [
      ...prev,
      { id: uid(), title: "New Section", order: prev.length, questions: [] },
    ]);

  const updateSectionTitle = (id: string, title: string) =>
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, title } : s)));

  const deleteSection = (id: string) =>
    setSections((prev) => prev.filter((s) => s.id !== id));

  // ── Question actions ──

  const addQuestion = (sectionId: string) =>
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              questions: [
                ...s.questions,
                {
                  id: uid(),
                  label: "",
                  type: "TEXT",
                  required: false,
                  order: s.questions.length,
                  options: [],
                },
              ],
            }
          : s,
      ),
    );

  const updateQuestion = (sectionId: string, updated: Question) =>
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              questions: s.questions.map((q) =>
                q.id === updated.id ? updated : q,
              ),
            }
          : s,
      ),
    );

  const deleteQuestion = (sectionId: string, questionId: string) =>
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, questions: s.questions.filter((q) => q.id !== questionId) }
          : s,
      ),
    );

  const reorderQuestions = (sectionId: string, questions: Question[]) =>
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, questions } : s)),
    );

  // ── Save ──

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    setSaveStatus("idle");

    try {
      // 1. Save each section + its questions
      for (const section of sections) {
        // Create section
        const sectionRes = await fetch(`/api/forms/${formId}/sections`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: section.title, order: section.order }),
        });

        if (!sectionRes.ok) throw new Error("Failed to save section");
        const { data: savedSection } = await sectionRes.json();

        // Create questions for this section
        for (const question of section.questions) {
          const qRes = await fetch(
            `/api/forms/${formId}/sections/${savedSection.id}/questions`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                label: question.label || "Untitled Question",
                type: question.type,
                required: question.required,
                order: question.order,
                options: question.options.map(({ label, value }) => ({
                  label,
                  value,
                })),
              }),
            },
          );

          if (!qRes.ok) throw new Error("Failed to save question");
        }
      }

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  }, [formId, sections]);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-gray-100">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <IoArrowBack className="size-5" />
          </button>
          <div>
            <h1 className="text-sm font-semibold text-gray-800">{formTitle}</h1>
            <p className="text-xs text-gray-400">Form Builder</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveStatus === "saved" && (
            <span className="text-xs text-green-500">✓ Saved successfully</span>
          )}
          {saveStatus === "error" && (
            <span className="text-xs text-red-500">✗ Failed to save</span>
          )}

          <button
            onClick={() =>
              router.push(`/admin-dashboard/forms/${formId}/preview`)
            }
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50"
          >
            <IoEye className="size-4" /> Preview
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
          >
            <IoSave className="size-4" />
            {isSaving ? "Saving..." : "Save Form"}
          </button>
        </div>
      </div>

      {/* Builder Body */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {sections.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
              <div className="mb-3 rounded-full bg-blue-50 p-4">
                <IoAdd className="size-8 text-blue-400" />
              </div>
              <p className="text-sm font-medium text-gray-600">
                No sections yet
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Add a section to start building your form
              </p>
            </div>
          )}

          {sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              onUpdateTitle={updateSectionTitle}
              onDeleteSection={deleteSection}
              onAddQuestion={addQuestion}
              onUpdateQuestion={updateQuestion}
              onDeleteQuestion={deleteQuestion}
              onReorderQuestions={reorderQuestions}
            />
          ))}

          {/* Add Section Button */}
          <button
            onClick={addSection}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-white py-4 text-sm font-medium text-gray-500 transition-colors hover:border-blue-300 hover:text-blue-500"
          >
            <IoAdd className="size-5" /> Add Section
          </button>
        </div>
      </div>
    </div>
  );
}
