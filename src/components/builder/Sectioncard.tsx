"use client";

import { Question, Section } from "@/app/(dashboards)/admin-dashboard/forms/[id]/builder/types";
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
import { DashedButton, IconButton, InlineInput, SectionDivider } from "./Premitive";
import { SortableQuestion } from "./Sortablequestion";

interface SectionCardProps {
  section: Section;
  index: number;
  onUpdateTitle: (id: string, title: string) => void;
  onDeleteSection: (id: string) => void;
  onAddQuestion: (sectionId: string) => void;
  onUpdateQuestion: (sectionId: string, q: Question) => void;
  onDeleteQuestion: (sectionId: string, questionId: string) => void;
  onReorderQuestions: (sectionId: string, questions: Question[]) => void;
}

export function SectionCard({
  section,
  index,
  onUpdateTitle,
  onDeleteSection,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onReorderQuestions,
}: SectionCardProps) {
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
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Section header bar */}
      <div className="flex items-center gap-3 border-b border-gray-100 bg-(--color-primary)/3 px-4 py-3">
        {/* Section number */}
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-(--color-primary) text-[10px] font-bold text-white">
          {index + 1}
        </span>

        <div className="flex-1">
          <InlineInput
            value={section.title}
            onChange={(v) => onUpdateTitle(section.id, v)}
            placeholder="Section title..."
            className="w-full text-sm font-semibold text-(--color-primary)"
          />
          <SectionDivider />
        </div>

        <IconButton
          onClick={() => onDeleteSection(section.id)}
          className="text-gray-300 hover:bg-red-50 hover:text-red-500"
          title="Delete section"
        >
          <IoTrash className="size-4" />
        </IconButton>
      </div>

      {/* Questions */}
      <div className="p-4">
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
              {section.questions.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-8 text-center">
                  <p className="text-xs text-gray-400">No questions yet</p>
                </div>
              ) : (
                section.questions.map((q) => (
                  <SortableQuestion
                    key={q.id}
                    question={q}
                    sectionId={section.id}
                    onUpdate={onUpdateQuestion}
                    onDelete={onDeleteQuestion}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>

        <DashedButton
          onClick={() => onAddQuestion(section.id)}
          className="mt-3 border-(--color-secondary)/30 text-(--color-secondary) hover:border-(--color-secondary)/50 hover:bg-(--color-secondary)/5"
        >
          <IoAdd className="size-4" /> Add Question
        </DashedButton>
      </div>
    </div>
  );
}
