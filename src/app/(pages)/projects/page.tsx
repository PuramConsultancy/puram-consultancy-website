"use client";

import { useState } from "react";
import {
  useGetProjects,
  PROJECT_TYPE_LABELS,
} from "@/app/api-client/projects/useGetProjects";
import ProjectCard from "@/components/projects/ProjectCard";

type FilterType = "ALL" | keyof typeof PROJECT_TYPE_LABELS;

const FILTERS: { value: FilterType; label: string; emoji: string }[] = [
  { value: "ALL", label: "All Projects", emoji: "✦" },
  { value: "PRODUCT_LAUNCH", label: "Product Launch", emoji: "🚀" },
  { value: "INVESTMENT_NEW_COMPANY", label: "New Company", emoji: "🌱" },
  { value: "INVESTMENT_OLD_COMPANY", label: "Old Company", emoji: "🏢" },
  { value: "BUYING_PRODUCTS", label: "Buying Products", emoji: "🛒" },
];

const ProjectSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
    <div className="h-[3px] w-full animate-pulse bg-gray-200" />
    <div className="flex flex-col gap-3 p-5">
      <div className="h-5 w-32 animate-pulse rounded-full bg-gray-200" />
      <div className="h-6 w-4/5 animate-pulse rounded-lg bg-gray-200" />
      <div className="h-4 w-24 animate-pulse rounded-lg bg-gray-200" />
      <div className="space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="mt-2 h-10 animate-pulse rounded-xl bg-gray-200" />
    </div>
  </div>
);

const ProjectsPage = () => {
  const { data: projects, isLoading, isError } = useGetProjects(false);
  const [filter, setFilter] = useState<FilterType>("ALL");

  const filtered =
    filter === "ALL" ? projects : projects?.filter((p) => p.type === filter);

  return (
    <section className="mx-auto w-full max-w-6xl py-10">
      {/* ── Page hero ── */}
      <div className="relative mb-12 overflow-hidden rounded-3xl bg-[var(--color-primary)] px-6 py-12 text-center sm:px-12">
        {/* Decorative blobs */}
        <div
          className="absolute -top-16 -right-16 size-64 rounded-full opacity-10"
          style={{ background: "var(--color-secondary)" }}
        />
        <div
          className="absolute -bottom-12 -left-12 size-48 rounded-full opacity-10"
          style={{ background: "var(--color-secondary)" }}
        />

        <div className="relative">
          <span className="mb-3 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest text-white/80 uppercase">
            Active Opportunities
          </span>
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Explore Our Projects
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/60">
            From product launches to investment opportunities — find the project
            that aligns with your vision.
          </p>
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              filter === f.value
                ? "bg-[var(--color-primary)] text-white shadow-sm"
                : "border border-gray-200 bg-white text-gray-600 hover:border-[var(--color-primary-200)] hover:bg-[var(--color-primary-50)]"
            }`}
          >
            <span>{f.emoji}</span>
            {f.label}
          </button>
        ))}
      </div>

      {/* Result count */}
      {!isLoading && !isError && (
        <p className="mb-5 text-center text-sm text-gray-400">
          {filtered?.length ?? 0} project
          {(filtered?.length ?? 0) !== 1 ? "s" : ""} found
        </p>
      )}

      {/* ── Grid ── */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="text-4xl">⚠️</div>
          <p className="text-sm font-semibold text-gray-500">
            Failed to load projects. Please try again later.
          </p>
        </div>
      ) : !filtered?.length ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="text-4xl">🔍</div>
          <p className="text-sm font-semibold text-gray-500">
            No projects found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsPage;
