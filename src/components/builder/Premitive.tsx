"use client";

import React from "react";

// ─── IconButton ───────────────────────────────────────────────────────────────

export function IconButton({
  onClick,
  title,
  className = "",
  children,
  type = "button",
}: {
  onClick?: () => void;
  title?: string;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      title={title}
      className={`rounded-lg p-1.5 transition-all duration-150 ${className}`}
    >
      {children}
    </button>
  );
}

// ─── DashedButton ─────────────────────────────────────────────────────────────

export function DashedButton({
  onClick,
  children,
  className = "",
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-center gap-2 rounded-xl border border-dashed py-3 text-sm font-medium transition-all duration-150 ${className}`}
    >
      {children}
    </button>
  );
}

// ─── InlineInput ──────────────────────────────────────────────────────────────

export function InlineInput({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`bg-transparent placeholder:text-gray-400 focus:outline-none ${className}`}
    />
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

export function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

// ─── SectionDivider ───────────────────────────────────────────────────────────

export function SectionDivider() {
  return (
    <div className="mt-1 h-px bg-linear-to-r from-(--color-primary) via-(--color-secondary) to-transparent opacity-30" />
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

export function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
      <div className="mb-3 rounded-2xl bg-(--color-primary)/5 p-4 text-(--color-primary)">
        {icon}
      </div>
      <p className="text-sm font-semibold text-gray-700">{title}</p>
      {description && (
        <p className="mt-1 text-xs text-gray-400">{description}</p>
      )}
    </div>
  );
}

// ─── SaveStatusBadge ─────────────────────────────────────────────────────────

export function SaveStatusBadge({
  status,
}: {
  status: "idle" | "saved" | "error";
}) {
  if (status === "idle") return null;
  return (
    <span
      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
        status === "saved"
          ? "bg-emerald-50 text-emerald-600"
          : "bg-red-50 text-red-600"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${status === "saved" ? "bg-emerald-500" : "bg-red-500"}`}
      />
      {status === "saved" ? "Saved successfully" : "Failed to save"}
    </span>
  );
}
