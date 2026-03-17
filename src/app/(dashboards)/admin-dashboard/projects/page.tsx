// app/admin-dashboard/projects/page.tsx
"use client";

import { useState } from "react";
import {
  useGetProjects,
  Project,
} from "@/app/api-client/projects/useGetProjects";
import {
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from "@/app/api-client/projects/useProjectMutations";
import { useInquiryCounts } from "@/app/api-client/projects/useInquiries";
import { CreateProjectInput } from "@/schemas/project.schema";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFormModal from "@/components/projects/ProjectFormModal";
import DeleteConfirmModal from "@/components/projects/DeleteConfirmModal";
import { useQueryClient } from "@tanstack/react-query";
import {
  IoAdd,
  IoLayersOutline,
  IoCheckmarkCircleOutline,
  IoDocumentTextOutline,
  IoBriefcaseOutline,
  IoChatbubblesOutline,
} from "react-icons/io5";
import Topbar from "../../Topbar";

type ModalState =
  | { type: "create" }
  | { type: "edit"; project: Project }
  | { type: "delete"; project: Project }
  | null;

// ── Edit wrapper ──────────────────────────────────────────────────────────────
const EditWrapper = ({
  project,
  onDone,
}: {
  project: Project;
  onDone: () => void;
}) => {
  const updateMutation = useUpdateProject(project.id);
  const queryClient = useQueryClient();
  return (
    <ProjectFormModal
      mode="edit"
      defaultValues={project}
      isPending={updateMutation.isPending}
      onClose={onDone}
      onSubmit={async (data) => {
        await updateMutation.mutateAsync({ body: data });
        queryClient.invalidateQueries({ queryKey: ["projects-admin"] });
        onDone();
      }}
    />
  );
};

// ── Skeleton ──────────────────────────────────────────────────────────────────
const ProjectSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
    <div className="h-[3px] w-full animate-pulse bg-gray-200" />
    <div className="flex flex-col gap-3 p-5">
      <div className="h-5 w-32 animate-pulse rounded-full bg-gray-200" />
      <div className="h-6 w-4/5 animate-pulse rounded-lg bg-gray-200" />
      <div className="h-4 w-24 animate-pulse rounded-lg bg-gray-200" />
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-3 animate-pulse rounded bg-gray-200"
            style={{ width: `${90 - i * 10}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <div className="h-10 animate-pulse rounded-xl bg-gray-200" />
        <div className="flex gap-2">
          <div className="h-9 flex-1 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-9 flex-1 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-9 w-16 animate-pulse rounded-xl bg-gray-200" />
        </div>
      </div>
    </div>
  </div>
);

// ── Stat card ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: number;
  total?: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  pillBg?: string;
  pillText?: string;
}

const StatCard = ({
  label,
  value,
  total,
  icon,
  iconBg,
  iconColor,
  pillBg,
  pillText,
}: StatCardProps) => {
  const pct = total && total > 0 ? Math.round((value / total) * 100) : null;

  return (
    <div className="flex min-w-[150px] flex-1 items-center gap-3.5 rounded-2xl border border-gray-100 bg-white px-4 py-3.5 shadow-sm">
      <div
        className="flex size-11 shrink-0 items-center justify-center rounded-xl"
        style={{ background: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
          {label}
        </p>
        <p className="mt-0.5 text-2xl font-black text-[var(--color-primary)] tabular-nums">
          {value}
        </p>
      </div>
      {pct !== null && pillBg && pillText && (
        <div className="ml-auto shrink-0">
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-bold"
            style={{ background: pillBg, color: pillText }}
          >
            {pct}%
          </span>
        </div>
      )}
    </div>
  );
};

// ── Main page ─────────────────────────────────────────────────────────────────
const AdminProjectsPage = () => {
  const { data: projects, isLoading } = useGetProjects(true);
  const { data: inquiryCounts } = useInquiryCounts();
  const [modal, setModal] = useState<ModalState>(null);
  const queryClient = useQueryClient();

  const createMutation = useCreateProject();
  const deleteMutation = useDeleteProject();

  const total = projects?.length ?? 0;
  const published = projects?.filter((p) => p.published).length ?? 0;
  const drafts = total - published;

  // Sum of all unseen across all projects — for a global indicator
  const totalUnseen = inquiryCounts
    ? Object.values(inquiryCounts).reduce((acc, c) => acc + c.unseen, 0)
    : 0;

  const handleCreate = async (data: CreateProjectInput) => {
    await createMutation.mutateAsync({ body: data });
    queryClient.invalidateQueries({ queryKey: ["projects-admin"] });
    setModal(null);
  };

  const handleDelete = async () => {
    if (modal?.type !== "delete") return;
    await deleteMutation.mutateAsync({ params: { id: modal.project.id } });
    queryClient.invalidateQueries({ queryKey: ["projects-admin"] });
    setModal(null);
  };

  return (
    <section className="flex h-full flex-1 flex-col overflow-hidden">
      <Topbar
        heading="Projects"
        subHeading="Manage all projects visible on the public site"
      />

      <div className="scrollbar h-full flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
        <div className="mx-auto max-w-7xl p-5">
          {/* ── Stats + global inquiry alert ── */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-3">
              <StatCard
                label="Total"
                value={total}
                icon={<IoBriefcaseOutline size={20} />}
                iconBg="#E1F5EE"
                iconColor="#085041"
              />
              <StatCard
                label="Published"
                value={published}
                total={total}
                icon={<IoCheckmarkCircleOutline size={20} />}
                iconBg="#EEEDFE"
                iconColor="#3C3489"
                pillBg="#EEEDFE"
                pillText="#3C3489"
              />
              <StatCard
                label="Drafts"
                value={drafts}
                total={total}
                icon={<IoDocumentTextOutline size={20} />}
                iconBg="#FAEEDA"
                iconColor="#633806"
                pillBg="#FAEEDA"
                pillText="#633806"
              />
              {/* Global unseen inquiries chip */}
              {totalUnseen > 0 && (
                <div className="flex min-w-[150px] flex-1 items-center gap-3.5 rounded-2xl border border-[var(--color-secondary-200)] bg-[var(--color-secondary-50)] px-4 py-3.5 shadow-sm">
                  <div className="relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-secondary)] text-white">
                    <IoChatbubblesOutline size={20} />
                    {/* Ping dot */}
                    <span className="absolute -top-1 -right-1 flex size-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-secondary)] opacity-60" />
                      <span className="relative inline-flex size-3 rounded-full bg-[var(--color-secondary-800)]" />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold tracking-widest text-[var(--color-secondary-700)] uppercase">
                      New Inquiries
                    </p>
                    <p className="mt-0.5 text-2xl font-black text-[var(--color-secondary)] tabular-nums">
                      {totalUnseen}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Add button */}
            <button
              onClick={() => setModal({ type: "create" })}
              className="flex items-center gap-2 rounded-xl bg-[var(--color-secondary)] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[var(--color-secondary-800)] active:scale-[0.97]"
            >
              <IoAdd className="size-4" />
              Add Project
            </button>
          </div>

          {/* ── Grid ── */}
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProjectSkeleton key={i} />
              ))}
            </div>
          ) : !projects?.length ? (
            <div className="flex flex-col items-center gap-5 overflow-hidden rounded-2xl bg-[var(--color-primary)] px-8 py-20 text-center shadow-md">
              <div className="relative">
                <div className="absolute inset-0 scale-150 rounded-full bg-[var(--color-secondary)]/10 blur-2xl" />
                <div className="relative flex size-16 items-center justify-center rounded-2xl bg-white/10">
                  <IoLayersOutline className="size-8 text-white/60" />
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-white">No projects yet</p>
                <p className="mt-1 text-sm text-white/50">
                  Create your first project to start showcasing opportunities.
                </p>
              </div>
              <button
                onClick={() => setModal({ type: "create" })}
                className="flex items-center gap-2 rounded-xl bg-[var(--color-secondary)] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[var(--color-secondary-800)] active:scale-[0.97]"
              >
                <IoAdd className="size-4" />
                Create First Project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isAdmin
                  unseenCount={inquiryCounts?.[project.id]?.unseen ?? 0}
                  totalCount={inquiryCounts?.[project.id]?.total ?? 0}
                  onEdit={(p) => setModal({ type: "edit", project: p })}
                  onDelete={(p) => setModal({ type: "delete", project: p })}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Modals ── */}
      {modal?.type === "create" && (
        <ProjectFormModal
          mode="create"
          isPending={createMutation.isPending}
          onClose={() => setModal(null)}
          onSubmit={handleCreate}
        />
      )}
      {modal?.type === "edit" && (
        <EditWrapper project={modal.project} onDone={() => setModal(null)} />
      )}
      {modal?.type === "delete" && (
        <DeleteConfirmModal
          title={modal.project.title}
          isPending={deleteMutation.isPending}
          onConfirm={handleDelete}
          onCancel={() => setModal(null)}
        />
      )}
    </section>
  );
};

export default AdminProjectsPage;
