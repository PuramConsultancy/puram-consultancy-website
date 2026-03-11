"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IoTrash, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";
import {
  Question,
  QuestionType,
  QUESTION_TYPES,
  OPTION_TYPES,
  uid,
} from "@/app/(dashboards)/admin-dashboard/forms/[id]/builder/types";
import { Badge, IconButton } from "./Premitive";
import { OptionsEditor } from "./Optionseditor";

interface SortableQuestionProps {
  question: Question;
  sectionId: string;
  onUpdate: (sectionId: string, q: Question) => void;
  onDelete: (sectionId: string, questionId: string) => void;
}

export function SortableQuestion({
  question,
  sectionId,
  onUpdate,
  onDelete,
}: SortableQuestionProps) {
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
    opacity: isDragging ? 0.45 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  const update = (patch: Partial<Question>) =>
    onUpdate(sectionId, { ...question, ...patch });

  const typeLabel = QUESTION_TYPES.find((t) => t.value === question.type);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-full bg-linear-to-r from-(--color-primary)/40 to-(--color-secondary)/30" />

      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab text-gray-300 hover:text-(--color-primary)/50 active:cursor-grabbing"
        >
          <MdDragIndicator className="size-5" />
        </button>

        {/* Label input */}
        <input
          className="flex-1 bg-transparent text-sm font-medium text-gray-800 placeholder:text-gray-300 focus:outline-none"
          placeholder="Enter question..."
          value={question.label}
          onChange={(e) => update({ label: e.target.value })}
        />

        {/* Type badge */}
        <Badge className="hidden bg-(--color-primary)/8 text-(--color-primary)/70 sm:inline-flex">
          {typeLabel?.icon} {typeLabel?.label}
        </Badge>

        {/* Type selector */}
        <select
          className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-600 focus:border-(--color-primary)/30 focus:ring-2 focus:ring-(--color-primary)/10 focus:outline-none"
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

        {/* Required toggle */}
        <label className="flex cursor-pointer items-center gap-1.5 text-xs text-gray-500">
          <div
            onClick={() => update({ required: !question.required })}
            className={`relative h-4 w-7 rounded-full transition-colors ${
              question.required ? "bg-(--color-secondary)" : "bg-gray-200"
            }`}
          >
            <div
              className={`absolute top-0.5 size-3 rounded-full bg-white shadow transition-transform ${
                question.required ? "translate-x-3.5" : "translate-x-0.5"
              }`}
            />
          </div>
          <span
            className={
              question.required
                ? "font-medium text-(--color-secondary)"
                : ""
            }
          >
            {question.required ? "Required" : "Optional"}
          </span>
        </label>

        {/* Expand */}
        <IconButton
          onClick={() => setExpanded((v) => !v)}
          className="text-gray-300 hover:bg-gray-100 hover:text-gray-500"
        >
          {expanded ? (
            <IoChevronUp className="size-4" />
          ) : (
            <IoChevronDown className="size-4" />
          )}
        </IconButton>

        {/* Delete */}
        <IconButton
          onClick={() => onDelete(sectionId, question.id)}
          className="text-gray-300 hover:bg-red-50 hover:text-red-500"
        >
          <IoTrash className="size-4" />
        </IconButton>
      </div>

      {/* Options */}
      {expanded && OPTION_TYPES.includes(question.type) && (
        <OptionsEditor
          options={question.options}
          onAdd={() =>
            update({
              options: [
                ...question.options,
                { id: uid(), label: "", value: `option_${uid()}` },
              ],
            })
          }
          onUpdate={(id, label) =>
            update({
              options: question.options.map((o) =>
                o.id === id
                  ? {
                      ...o,
                      label,
                      value: label.toLowerCase().replace(/\s+/g, "_"),
                    }
                  : o,
              ),
            })
          }
          onDelete={(id) =>
            update({ options: question.options.filter((o) => o.id !== id) })
          }
        />
      )}
    </div>
  );
}
