"use client";

import { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IoTrash, IoChevronDown, IoChevronUp, IoAdd } from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";
import {
  Question,
  QuestionType,
  QUESTION_TYPES,
  OPTION_TYPES,
  uid,
} from "@/app/(dashboards)/admin-dashboard/forms/[id]/builder/types";

interface QuestionRowProps {
  question: Question;
  sectionId: string;
  index: number;
  onUpdate: (sectionId: string, q: Question) => void;
  onDelete: (sectionId: string, questionId: string) => void;
}

export function QuestionRow({
  question,
  sectionId,
  index,
  onUpdate,
  onDelete,
}: QuestionRowProps) {
  const hasOptions = OPTION_TYPES.includes(question.type);

  // ✅ auto-expand when the question type requires options
  const [expanded, setExpanded] = useState(hasOptions);

  // ✅ when type changes to an option type, expand automatically
  useEffect(() => {
    if (OPTION_TYPES.includes(question.type)) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [question.type]);

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
    zIndex: isDragging ? 10 : undefined,
  };

  const update = (patch: Partial<Question>) =>
    onUpdate(sectionId, { ...question, ...patch });

  const typeLabel = QUESTION_TYPES.find((t) => t.value === question.type);

  return (
    <div ref={setNodeRef} style={style}>
      {/* Question row */}
      <div
        className={`group flex items-center gap-3 border-b border-gray-100 px-4 py-3 transition-colors ${
          isDragging ? "bg-blue-50/30" : "hover:bg-gray-50/60"
        }`}
      >
        {/* Drag + index */}
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab text-gray-200 opacity-0 transition-opacity group-hover:opacity-100 hover:text-gray-400 active:cursor-grabbing"
          >
            <MdDragIndicator className="size-4" />
          </button>
          <span className="w-5 text-center text-xs font-semibold text-gray-300">
            {index + 1}
          </span>
        </div>

        {/* Label */}
        <input
          className="min-w-0 flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none"
          placeholder="Type your question..."
          value={question.label}
          onChange={(e) => update({ label: e.target.value })}
        />

        {/* Type pill */}
        <span className="hidden shrink-0 items-center gap-1 rounded-md bg-[var(--color-primary)]/6 px-2 py-0.5 text-[11px] font-medium text-(--color-primary)/70 sm:flex">
          <span>{typeLabel?.icon}</span>
          <span>{typeLabel?.label}</span>
        </span>

        {/* Type select */}
        <select
          className="shrink-0 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs text-gray-600 focus:border-[var(--color-primary)]/30 focus:ring-1 focus:ring-[var(--color-primary)]/10 focus:outline-none"
          value={question.type}
          onChange={(e) => {
            const newType = e.target.value as QuestionType;
            // ✅ clear options when switching away from option types
            update({
              type: newType,
              options: OPTION_TYPES.includes(newType) ? question.options : [],
            });
          }}
        >
          {QUESTION_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        {/* Required toggle */}
        <button
          onClick={() => update({ required: !question.required })}
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all ${
            question.required
              ? "bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]"
              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
          }`}
        >
          {question.required ? "Required" : "Optional"}
        </button>

        {/* Expand toggle — only for option types */}
        {hasOptions && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="shrink-0 text-gray-300 transition-colors hover:text-gray-500"
          >
            {expanded ? (
              <IoChevronUp className="size-4" />
            ) : (
              <IoChevronDown className="size-4" />
            )}
          </button>
        )}

        {/* Delete */}
        <button
          onClick={() => onDelete(sectionId, question.id)}
          className="shrink-0 text-gray-200 opacity-0 transition-all group-hover:opacity-100 hover:text-red-400"
        >
          <IoTrash className="size-4" />
        </button>
      </div>

      {/* Options panel — auto-expanded for option types */}
      {expanded && hasOptions && (
        <div className="border-b border-gray-100 bg-gray-50/50 px-12 py-3">
          <p className="mb-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            Answer Options
          </p>

          {question.options.length === 0 && (
            <p className="mb-2 text-xs text-gray-300">
              No options yet — add one below
            </p>
          )}

          <div className="flex flex-col gap-1.5">
            {question.options.map((opt, i) => (
              <div key={opt.id} className="flex items-center gap-2">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[10px] font-bold text-[var(--color-primary)]/50">
                  {String.fromCharCode(65 + i)}
                </span>
                <input
                  className="flex-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-700 focus:border-[var(--color-primary)]/30 focus:ring-1 focus:ring-[var(--color-primary)]/10 focus:outline-none"
                  value={opt.label}
                  placeholder={`Option ${i + 1}`}
                  onChange={(e) => {
                    const label = e.target.value;
                    update({
                      options: question.options.map((o) =>
                        o.id === opt.id
                          ? {
                              ...o,
                              label,
                              value: label.toLowerCase().replace(/\s+/g, "_"),
                            }
                          : o,
                      ),
                    });
                  }}
                />
                <button
                  onClick={() =>
                    update({
                      options: question.options.filter((o) => o.id !== opt.id),
                    })
                  }
                  className="text-gray-300 transition-colors hover:text-red-400"
                >
                  <IoTrash className="size-3.5" />
                </button>
              </div>
            ))}

            {/* Add option button */}
            <button
              onClick={() =>
                update({
                  options: [
                    ...question.options,
                    { id: uid(), label: "", value: `opt_${uid()}` },
                  ],
                })
              }
              className="mt-1 flex items-center gap-1.5 text-xs font-medium text-[var(--color-secondary)] transition-colors hover:text-[var(--color-secondary-800)]"
            >
              <IoAdd className="size-3.5" /> Add option
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
