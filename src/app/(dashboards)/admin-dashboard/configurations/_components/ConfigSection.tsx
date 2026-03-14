"use client";

import { ReactNode } from "react";

const ConfigSection = ({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}) => (
  <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
    <div className="flex items-start gap-4 border-b border-gray-50 px-6 py-5">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/8 text-[var(--color-primary)]">
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
        <p className="mt-0.5 text-xs text-gray-400">{description}</p>
      </div>
    </div>
    <div className="px-6 py-5">{children}</div>
  </div>
);

export default ConfigSection;
