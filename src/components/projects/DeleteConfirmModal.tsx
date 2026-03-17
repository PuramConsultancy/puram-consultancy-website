"use client";

import { IoTrashOutline } from "react-icons/io5";

interface DeleteConfirmModalProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

const DeleteConfirmModal = ({
  title,
  onConfirm,
  onCancel,
  isPending,
}: DeleteConfirmModalProps) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-primary)]/60 p-4 backdrop-blur-sm"
    onClick={(e) => e.target === e.currentTarget && onCancel()}
  >
    <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">
      {/* Red header accent */}
      <div className="h-[3px] w-full bg-red-500" />

      <div className="p-6">
        <div className="mb-5 flex flex-col items-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-red-50">
            <IoTrashOutline className="size-7 text-red-500" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--color-primary)]">
              Delete Project?
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
              <span className="font-semibold text-gray-700">{title}</span> will
              be permanently removed along with all its inquiries. This cannot
              be undone.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-gray-200 bg-gray-50 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
          >
            Keep It
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-bold text-white transition-all hover:bg-red-700 active:scale-[0.98] disabled:opacity-60"
          >
            {isPending ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default DeleteConfirmModal;
