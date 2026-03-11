"use client";

import { IoAdd, IoTrash } from "react-icons/io5";
import { Option } from "@/app/(dashboards)/admin-dashboard/forms/[id]/builder/types";
import { IconButton } from "./Premitive";

interface OptionsEditorProps {
  options: Option[];
  onAdd: () => void;
  onUpdate: (id: string, label: string) => void;
  onDelete: (id: string) => void;
}

export function OptionsEditor({
  options,
  onAdd,
  onUpdate,
  onDelete,
}: OptionsEditorProps) {
  return (
    <div className="border-t border-gray-100 bg-gray-50/60 px-4 pt-3 pb-3">
      <p className="mb-2 text-xs font-semibold tracking-wider text-(--color-primary)/60 uppercase">
        Options
      </p>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => (
          <div key={opt.id} className="flex items-center gap-2">
            {/* Indicator */}
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-(--color-primary)/20 text-[10px] font-bold text-(--color-primary)/40">
              {i + 1}
            </span>
            <input
              className="flex-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-700 focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/10 focus:outline-none"
              value={opt.label}
              placeholder={`Option ${i + 1}`}
              onChange={(e) => onUpdate(opt.id, e.target.value)}
            />
            <IconButton
              onClick={() => onDelete(opt.id)}
              className="text-gray-300 hover:bg-red-50 hover:text-red-500"
            >
              <IoTrash className="size-3.5" />
            </IconButton>
          </div>
        ))}

        <button
          type="button"
          onClick={onAdd}
          className="mt-1 flex items-center gap-1.5 text-xs font-medium text-(--color-secondary) transition-colors hover:text-(--color-secondary-800)"
        >
          <IoAdd className="size-3.5" /> Add option
        </button>
      </div>
    </div>
  );
}
