// components/projects/ProjectCard.tsx
"use client";

import { useState } from "react";
import {
  Project,
  PROJECT_TYPE_LABELS,
} from "@/app/api-client/projects/useGetProjects";
import { cn } from "@/utilities/cn";
import {
  IoCopyOutline,
  IoCheckmarkOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoArrowForward,
  IoChatbubblesOutline,
} from "react-icons/io5";
import InquiryModal from "./InquiryModal";
import InquiriesDrawer from "./InquiriesDrawer";

const TYPE_CONFIG: Record<
  string,
  { badge: string; bar: string; icon: string }
> = {
  PRODUCT_LAUNCH: {
    badge:
      "bg-[var(--color-primary-50)] text-[var(--color-primary)] border-[var(--color-primary-200)]",
    bar: "bg-[var(--color-primary)]",
    icon: "🚀",
  },
  INVESTMENT_NEW_COMPANY: {
    badge:
      "bg-[var(--color-secondary-50)] text-[var(--color-secondary-800)] border-[var(--color-secondary-200)]",
    bar: "bg-[var(--color-secondary)]",
    icon: "🌱",
  },
  INVESTMENT_OLD_COMPANY: {
    badge:
      "bg-[var(--color-primary-100)] text-[var(--color-primary-700)] border-[var(--color-primary-300)]",
    bar: "bg-[var(--color-primary-500)]",
    icon: "🏢",
  },
  BUYING_PRODUCTS: {
    badge:
      "bg-[var(--color-secondary-100)] text-[var(--color-secondary-900)] border-[var(--color-secondary-300)]",
    bar: "bg-[var(--color-secondary-600)]",
    icon: "🛒",
  },
};

interface ProjectCardProps {
  project: Project;
  isAdmin?: boolean;
  /** unseen inquiry count — drives the notification badge */
  unseenCount?: number;
  /** total inquiry count — shown as secondary label */
  totalCount?: number;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
}

const ProjectCard = ({
  project,
  isAdmin,
  unseenCount = 0,
  totalCount = 0,
  onEdit,
  onDelete,
}: ProjectCardProps) => {
  const [showInquiry, setShowInquiry] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [copied, setCopied] = useState(false);

  const config = TYPE_CONFIG[project.type] ?? TYPE_CONFIG.PRODUCT_LAUNCH;

  const handleCopyLink = () => {
    const url = `${window.location.origin}/projects/${project.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <>
      <article
        className={cn(
          "card-hover group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white",
          "shadow-[0_2px_12px_rgb(2_51_65_/_0.06)]",
          !project.published && isAdmin && "opacity-55",
        )}
      >
        {/* Colored top bar */}
        <div className={cn("h-[3px] w-full", config.bar)} />

        <div className="flex flex-1 flex-col gap-0 p-5">
          {/* Draft pill */}
          {isAdmin && !project.published && (
            <span className="absolute top-3 right-4 rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-gray-400 uppercase shadow-sm">
              Draft
            </span>
          )}

          {/* Type badge */}
          <span
            className={cn(
              "mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold tracking-wider uppercase",
              config.badge,
            )}
          >
            <span>{config.icon}</span>
            {PROJECT_TYPE_LABELS[project.type]}
          </span>

          {/* Title */}
          <h3 className="mb-2 line-clamp-2 text-[1.05rem] leading-snug font-bold text-[var(--color-primary)]">
            {project.title}
          </h3>

          {/* Budget chip */}
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Budget
            </span>
            <span className="rounded-lg bg-[var(--color-secondary-50)] px-2.5 py-0.5 text-sm font-extrabold text-[var(--color-secondary)]">
              {project.budget}
            </span>
          </div>

          {/* Description */}
          <p className="mb-5 line-clamp-4 flex-1 text-sm leading-[1.75] text-gray-500">
            {project.description}
          </p>

          {/* ── Public CTA ── */}
          {!isAdmin && (
            <button
              onClick={() => setShowInquiry(true)}
              className="group/btn mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[var(--color-primary-600)] active:scale-[0.98]"
            >
              Contact Puram for Details
              <IoArrowForward className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
            </button>
          )}

          {/* ── Admin Actions ── */}
          {isAdmin && (
            <div className="mt-auto flex flex-col gap-2">
              {/* Inquiries button — full width, prominent */}
              <button
                onClick={() => setShowDrawer(true)}
                className={cn(
                  "relative flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all active:scale-[0.98]",
                  unseenCount > 0
                    ? "bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-800)]"
                    : "border border-[var(--color-primary-200)] bg-[var(--color-primary-50)] text-[var(--color-primary)] hover:bg-[var(--color-primary-100)]",
                )}
              >
                <IoChatbubblesOutline className="size-4" />
                Inquiries
                {/* Unseen badge — animated pulse when new */}
                {unseenCount > 0 && (
                  <span className="flex items-center gap-1">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-white" />
                    </span>
                    <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[11px] font-extrabold text-white">
                      {unseenCount} new
                    </span>
                  </span>
                )}
                {/* Total count when no unseen */}
                {unseenCount === 0 && totalCount > 0 && (
                  <span className="rounded-full bg-[var(--color-primary-100)] px-2 py-0.5 text-[11px] font-bold text-[var(--color-primary-600)]">
                    {totalCount}
                  </span>
                )}
              </button>

              {/* Edit / Delete / Copy row */}
              <div className="flex items-stretch gap-2">
                <button
                  onClick={() => onEdit?.(project)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[var(--color-primary-200)] bg-[var(--color-primary-50)] px-3 py-2 text-xs font-bold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary-100)]"
                >
                  <IoPencilOutline className="size-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => onDelete?.(project)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-100"
                >
                  <IoTrashOutline className="size-3.5" />
                  Delete
                </button>
                <button
                  onClick={handleCopyLink}
                  title="Copy shareable project link"
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all",
                    copied
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100",
                  )}
                >
                  {copied ? (
                    <IoCheckmarkOutline className="size-3.5" />
                  ) : (
                    <IoCopyOutline className="size-3.5" />
                  )}
                  {copied ? "Copied!" : "Link"}
                </button>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Public inquiry form */}
      {showInquiry && (
        <InquiryModal project={project} onClose={() => setShowInquiry(false)} />
      )}

      {/* Admin inquiries drawer */}
      {showDrawer && (
        <InquiriesDrawer
          project={project}
          onClose={() => setShowDrawer(false)}
        />
      )}
    </>
  );
};

export default ProjectCard;
