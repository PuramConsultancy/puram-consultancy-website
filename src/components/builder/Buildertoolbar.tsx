"use client";

import { IoArrowBack, IoEye, IoSave } from "react-icons/io5";

interface BuilderToolbarProps {
  formTitle: string;
  isSaving: boolean;
  saveStatus: "idle" | "saved" | "error";
  onBack: () => void;
  onPreview: () => void;
  onSave: () => void;
}

export function BuilderToolbar({
  formTitle,
  isSaving,
  saveStatus,
  onBack,
  onPreview,
  onSave,
}: BuilderToolbarProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-3 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="rounded-lg p-1.5 text-gray-400 transition-all hover:bg-(--color-primary)/5 hover:text-(--color-primary)"
        >
          <IoArrowBack className="size-5" />
        </button>
        <div>
          <h1 className="text-sm font-semibold text-(--color-primary)">
            {formTitle || "Untitled Form"}
          </h1>
          <p className="text-xs text-gray-400">Form Builder</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {saveStatus === "saved" && (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Saved
          </span>
        )}
        {saveStatus === "error" && (
          <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-500">
            <span className="size-1.5 rounded-full bg-red-500" />
            Failed to save
          </span>
        )}

        <button
          onClick={onPreview}
          className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-all hover:border-(--color-primary)/30 hover:bg-(--color-primary)/5 hover:text-(--color-primary)"
        >
          <IoEye className="size-4" /> Preview
        </button>

        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-xl bg-(--color-primary) px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-(--color-primary-800) disabled:opacity-60"
        >
          <IoSave className="size-4" />
          {isSaving ? "Saving..." : "Save Form"}
        </button>
      </div>
    </div>
  );
}
