// components/projects/InquiriesDrawer.tsx
"use client";

import { useEffect } from "react";
import { Project } from "@/app/api-client/projects/useGetProjects";
import {
  useGetProjectInquiries,
  useMarkInquiriesSeen,
} from "@/app/api-client/projects/useInquiries";
import {
  IoClose,
  IoPersonOutline,
  IoMailOutline,
  IoCallOutline,
  IoTimeOutline,
  IoChatbubblesOutline,
} from "react-icons/io5";
import { cn } from "@/utilities/cn";

interface InquiriesDrawerProps {
  project: Project;
  onClose: () => void;
}

const InquiriesDrawer = ({ project, onClose }: InquiriesDrawerProps) => {
  const { data: inquiries, isLoading } = useGetProjectInquiries(
    project.id,
    true, // enable fetch now that drawer is open
  );
  const markSeen = useMarkInquiriesSeen(project.id);

  // Mark all as seen when drawer opens
  useEffect(() => {
    markSeen.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isNew = (seenAt: string | null, createdAt: string) => {
    // "New" = created in last 48h AND not yet seen before this session
    const age = Date.now() - new Date(createdAt).getTime();
    return !seenAt && age < 48 * 60 * 60 * 1000;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden bg-[var(--color-primary)] px-6 py-5">
          {/* Orange glow */}
          <div
            className="absolute -top-8 -right-8 size-32 rounded-full opacity-20"
            style={{ background: "var(--color-secondary)" }}
          />
          <div className="relative flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <IoChatbubblesOutline className="size-5 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-bold text-white">Inquiries</h2>
                <p className="mt-0.5 truncate text-xs text-white/50">
                  {project.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {inquiries && inquiries.length > 0 && (
                <span className="rounded-full bg-[var(--color-secondary)] px-2.5 py-0.5 text-xs font-bold text-white">
                  {inquiries.length}
                </span>
              )}
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <IoClose className="size-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col gap-3 p-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-gray-50 p-4"
                >
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-48 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-28 animate-pulse rounded bg-gray-200" />
                </div>
              ))}
            </div>
          ) : !inquiries?.length ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-gray-100">
                <IoChatbubblesOutline className="size-8 text-gray-300" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-700">
                  No inquiries yet
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  When someone contacts about this project, they'll appear here.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 p-5">
              {inquiries.map((inquiry) => {
                const newEntry = isNew(inquiry.seenAt, inquiry.createdAt);
                return (
                  <div
                    key={inquiry.id}
                    className={cn(
                      "relative rounded-2xl border p-4 transition-colors",
                      newEntry
                        ? "border-[var(--color-secondary-200)] bg-[var(--color-secondary-50)]"
                        : "border-gray-100 bg-white",
                    )}
                  >
                    {/* New badge */}
                    {newEntry && (
                      <span className="absolute top-3 right-3 rounded-full bg-[var(--color-secondary)] px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">
                        New
                      </span>
                    )}

                    {/* Name */}
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-50)]">
                        <IoPersonOutline className="size-4 text-[var(--color-primary)]" />
                      </div>
                      <p className="font-bold text-[var(--color-primary)]">
                        {inquiry.fullName}
                      </p>
                    </div>

                    {/* Contact details */}
                    <div className="ml-11 flex flex-col gap-1.5">
                      <a
                        href={`mailto:${inquiry.email}`}
                        className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-[var(--color-secondary)]"
                      >
                        <IoMailOutline className="size-3.5 shrink-0 text-gray-400" />
                        <span className="truncate">{inquiry.email}</span>
                      </a>
                      <a
                        href={`tel:${inquiry.phone}`}
                        className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-[var(--color-secondary)]"
                      >
                        <IoCallOutline className="size-3.5 shrink-0 text-gray-400" />
                        <span>{inquiry.phone}</span>
                      </a>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <IoTimeOutline className="size-3.5 shrink-0" />
                        <span>{formatDate(inquiry.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-gray-100 bg-gray-50 px-6 py-4">
          <p className="text-center text-xs text-gray-400">
            {inquiries?.length ?? 0} total inquir
            {(inquiries?.length ?? 0) !== 1 ? "ies" : "y"} for this project
          </p>
        </div>
      </div>
    </>
  );
};

export default InquiriesDrawer;
