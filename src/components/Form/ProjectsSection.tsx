// components/home/ProjectsSection.tsx
"use client";

import { useGetProjects } from "@/app/api-client/projects/useGetProjects";
import ProjectCard from "@/components/projects/ProjectCard";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

const ProjectsSection = () => {
  const { data: projects, isLoading } = useGetProjects(false);

  // Show at most 3 on the home page
  const preview = projects?.slice(0, 3);

  // Don't render section while loading or if no published projects
  if (!isLoading && (!preview || preview.length === 0)) return null;

  return (
    <section className="flex flex-col gap-8">
      {/* Section header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="mb-2 inline-block rounded-full bg-[var(--color-secondary-50)] px-3 py-1 text-xs font-bold tracking-widest text-[var(--color-secondary)] uppercase">
            Open Opportunities
          </span>
          <h2 className="text-2xl font-bold text-[var(--color-primary)] sm:text-3xl">
            Active Projects
          </h2>
          <p className="mt-1.5 text-sm text-gray-500">
            Investment, product launches and buying opportunities — open now.
          </p>
        </div>
        <Link
          href="/projects"
          className="group flex w-fit shrink-0 items-center gap-2 rounded-xl border border-[var(--color-primary-200)] bg-[var(--color-primary-50)] px-4 py-2.5 text-sm font-bold text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)] hover:text-white"
        >
          View All Projects
          <IoArrowForward className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
            >
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
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preview!.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
