"use client";

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
  arrayMove,
} from "@dnd-kit/sortable";
import { IoAdd, IoTrash } from "react-icons/io5";

// ✅ ALL types from local types.ts — never import from @prisma/client
import {
  Section,
  Question,
} from "@/app/(dashboards)/admin-dashboard/forms/[id]/builder/types";
import { QuestionRow } from "./Questionrow";


interface SectionBlockProps {
  section: Section;
  index: number;
  isLast: boolean;
  onUpdateTitle: (id: string, title: string) => void;
  onDeleteSection: (id: string) => void;
  onAddQuestion: (sectionId: string) => void;
  onUpdateQuestion: (sectionId: string, q: Question) => void;
  onDeleteQuestion: (sectionId: string, questionId: string) => void;
  onReorderQuestions: (sectionId: string, questions: Question[]) => void;
}

export function SectionBlock({
  section,
  index,
  isLast,
  onUpdateTitle,
  onDeleteSection,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onReorderQuestions,
}: SectionBlockProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = section.questions.findIndex((q) => q.id === active.id);
    const newIndex = section.questions.findIndex((q) => q.id === over.id);
    onReorderQuestions(
      section.id,
      arrayMove(section.questions, oldIndex, newIndex).map((q, i) => ({
        ...q,
        order: i,
      })),
    );
  };

  return (
    <div className="relative">
      {/* Connector line between sections */}
      {!isLast && (
        <div className="absolute top-full bottom-0 left-[1.85rem] z-10 h-4 w-px bg-linear-to-b from-gray-200 to-transparent" />
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Section header */}
        <div className="flex items-center gap-3 border-b border-gray-100 bg-linear-to-r from-(--color-primary)/4 to-transparent px-4 py-3">
          {/* Number bubble */}
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-(--color-primary) text-xs font-bold text-white shadow-sm">
            {index + 1}
          </div>

          {/* Editable title */}
          <input
            value={section.title}
            onChange={(e) => onUpdateTitle(section.id, e.target.value)}
            placeholder="Section title (optional)"
            className="flex-1 bg-transparent text-sm font-semibold text-(--color-primary) placeholder:font-normal placeholder:text-gray-300 focus:outline-none"
          />

          {/* Question count */}
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-400">
            {section.questions.length} Q
          </span>

          {/* Delete section */}
          <button
            onClick={() => onDeleteSection(section.id)}
            title="Delete section"
            className="rounded-lg p-1.5 text-gray-300 transition-all hover:bg-red-50 hover:text-red-400"
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
            {section.questions.length === 0 ? (
              <div className="px-4 py-6 text-center">
                <p className="text-xs text-gray-300">
                  No questions yet — add one below
                </p>
              </div>
            ) : (
              <div>
                {section.questions.map((q, i) => (
                  <QuestionRow
                    key={q.id}
                    question={q}
                    sectionId={section.id}
                    index={i}
                    onUpdate={onUpdateQuestion}
                    onDelete={onDeleteQuestion}
                  />
                ))}
              </div>
            )}
          </SortableContext>
        </DndContext>

        {/* Add question */}
        <button
          onClick={() => onAddQuestion(section.id)}
          className="flex w-full items-center gap-2 border-t border-dashed border-(--color-secondary)/20 px-4 py-2.5 text-sm font-medium text-(--color-secondary)/70 transition-all hover:bg-(--color-secondary)/5 hover:text-(--color-secondary)"
        >
          <IoAdd className="size-4" /> Add Question
        </button>
      </div>
    </div>
  );
}
