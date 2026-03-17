"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import {
  useGetProjects,
  PROJECT_TYPE_LABELS,
} from "@/app/api-client/projects/useGetProjects";
import InquiryModal from "@/components/projects/InquiryModal";
import Link from "next/link";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const TYPE_BAR: Record<string, string> = {
  PRODUCT_LAUNCH: "bg-[var(--color-primary)]",
  INVESTMENT_NEW_COMPANY: "bg-[var(--color-secondary)]",
  INVESTMENT_OLD_COMPANY: "bg-[var(--color-primary-500)]",
  BUYING_PRODUCTS: "bg-[var(--color-secondary-600)]",
};

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: projects, isLoading } = useGetProjects(false);
  const [showInquiry, setShowInquiry] = useState(false);

  const project = projects?.find((p) => p.id === id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl py-12">
        <div className="mb-4 h-5 w-28 animate-pulse rounded-lg bg-gray-200" />
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="h-[3px] animate-pulse bg-gray-200" />
          <div className="flex flex-col gap-4 p-8">
            <div className="h-5 w-36 animate-pulse rounded-full bg-gray-200" />
            <div className="h-8 w-3/4 animate-pulse rounded-xl bg-gray-200" />
            <div className="h-5 w-28 animate-pulse rounded-lg bg-gray-200" />
            <div className="space-y-2 pt-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-3.5 animate-pulse rounded bg-gray-200"
                  style={{ width: `${85 - i * 5}%` }}
                />
              ))}
            </div>
            <div className="mt-4 h-12 animate-pulse rounded-xl bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-24 text-center">
        <div className="text-5xl">🔍</div>
        <h2 className="text-xl font-bold text-[var(--color-primary)]">
          Project Not Found
        </h2>
        <p className="text-sm text-gray-500">
          This project may have been removed or is no longer available.
        </p>
        <Link
          href="/projects"
          className="mt-2 flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--color-primary-600)]"
        >
          <IoArrowBack className="size-4" />
          Back to Projects
        </Link>
      </div>
    );
  }

  const barColor = TYPE_BAR[project.type] ?? TYPE_BAR.PRODUCT_LAUNCH;

  return (
    <>
      <div className="mx-auto max-w-3xl py-10">
        {/* Breadcrumb */}
        <Link
          href="/projects"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary-500)] transition-colors hover:text-[var(--color-primary)]"
        >
          <IoArrowBack className="size-4" />
          All Projects
        </Link>

        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_24px_rgb(2_51_65_/_0.08)]">
          {/* Colored accent bar */}
          <div className={`h-1 w-full ${barColor}`} />

          <div className="p-8">
            {/* Type badge */}
            <span className="mb-4 inline-block rounded-full bg-[var(--color-primary-50)] px-3 py-1 text-xs font-bold tracking-wider text-[var(--color-primary)] uppercase">
              {PROJECT_TYPE_LABELS[project.type]}
            </span>

            {/* Title */}
            <h1 className="text-2xl leading-tight font-bold text-[var(--color-primary)] sm:text-3xl">
              {project.title}
            </h1>

            {/* Budget */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                Budget
              </span>
              <span className="rounded-xl bg-[var(--color-secondary-50)] px-3 py-1 text-sm font-extrabold text-[var(--color-secondary)]">
                {project.budget}
              </span>
            </div>

            {/* Divider */}
            <hr className="my-6 border-gray-100" />

            {/* Description */}
            <div className="prose prose-sm max-w-none">
              <p className="text-base leading-[1.85] whitespace-pre-wrap text-gray-600">
                {project.description}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 rounded-2xl border border-[var(--color-primary-100)] bg-[var(--color-primary-50)] p-6">
              <h3 className="mb-1 text-base font-bold text-[var(--color-primary)]">
                Interested in this opportunity?
              </h3>
              <p className="mb-4 text-sm text-gray-500">
                Submit your details and our team will get back to you with full
                information.
              </p>
              <button
                onClick={() => setShowInquiry(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[var(--color-primary-600)] active:scale-[0.98] sm:w-auto sm:px-10"
              >
                Contact Puram for More Details
                <IoArrowForward className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showInquiry && (
        <InquiryModal project={project} onClose={() => setShowInquiry(false)} />
      )}
    </>
  );
};

export default ProjectDetailPage;
