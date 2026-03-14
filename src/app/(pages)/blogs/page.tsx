"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  IoSearchOutline,
  IoCloseOutline,
  IoArrowForwardOutline,
  IoTimeOutline,
  IoCalendarOutline,
} from "react-icons/io5";
import { useGetBlogs, Blog } from "@/app/api-client/blogs/useGetBlogs";

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const readingTime = (content: string) => {
  const words = content.replace(/[#*`>\-_~\[\]()]/g, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

const getExcerpt = (content: string, max = 140) => {
  const clean = content.replace(/[#*`>_~\[\]()!]/g, "").trim();
  return clean.length > max ? clean.slice(0, max).trimEnd() + "…" : clean;
};

// ── Featured card (first/hero blog) ──────────────────────────────────────────

const FeaturedCard = ({ blog }: { blog: Blog }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Link href={`/blogs/${blog.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-500)] p-8 md:p-10">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 size-48 rounded-full bg-[var(--color-secondary)]/10" />

        <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <span className="inline-block rounded-full border border-[var(--color-secondary)]/40 bg-[var(--color-secondary)]/15 px-3 py-1 text-xs font-semibold text-[var(--color-secondary)]">
              Featured
            </span>

            <h2 className="mt-4 text-2xl leading-snug font-bold text-white md:text-3xl lg:text-4xl">
              {blog.title}
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">
              {getExcerpt(blog.content, 180)}
            </p>

            <div className="mt-5 flex items-center gap-4 text-xs text-white/50">
              <span className="flex items-center gap-1.5">
                <IoCalendarOutline className="size-3.5" />
                {formatDate(blog.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <IoTimeOutline className="size-3.5" />
                {readingTime(blog.content)} min read
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all group-hover:border-[var(--color-secondary)] group-hover:bg-[var(--color-secondary)]">
            Read Article
            <IoArrowForwardOutline className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

// ── Blog card ─────────────────────────────────────────────────────────────────

const BlogCard = ({ blog, index }: { blog: Blog; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ delay: index * 0.06, duration: 0.35 }}
  >
    <Link href={`/blogs/${blog.slug}`} className="group flex h-full flex-col">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[var(--color-primary)]/15 group-hover:shadow-lg">
        {/* Color accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] opacity-0 transition-opacity group-hover:opacity-100" />

        <div className="flex flex-1 flex-col p-6">
          <h3 className="line-clamp-2 text-base leading-snug font-bold text-gray-900 transition-colors group-hover:text-[var(--color-primary)]">
            {blog.title}
          </h3>

          <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-500">
            {getExcerpt(blog.content)}
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-gray-50 pt-4">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <IoCalendarOutline className="size-3" />
                {formatDate(blog.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <IoTimeOutline className="size-3" />
                {readingTime(blog.content)}m
              </span>
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-[var(--color-secondary)] opacity-0 transition-opacity group-hover:opacity-100">
              Read
              <IoArrowForwardOutline className="size-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

// ── Skeleton loader ───────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
    <div className="h-5 w-3/4 animate-pulse rounded-lg bg-gray-100" />
    <div className="mt-3 space-y-2">
      <div className="h-3.5 w-full animate-pulse rounded bg-gray-100" />
      <div className="h-3.5 w-5/6 animate-pulse rounded bg-gray-100" />
      <div className="h-3.5 w-2/3 animate-pulse rounded bg-gray-100" />
    </div>
    <div className="mt-6 flex gap-3">
      <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
      <div className="h-3 w-16 animate-pulse rounded bg-gray-100" />
    </div>
  </div>
);

// ── Main page ─────────────────────────────────────────────────────────────────

export default function BlogsPage() {
  const { data, isLoading, isError } = useGetBlogs();
  const [search, setSearch] = useState("");

  const allBlogs = useMemo(
    () => (data?.data ?? []).filter((b) => b.published),
    [data],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return allBlogs;
    return allBlogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.content.toLowerCase().includes(q),
    );
  }, [allBlogs, search]);

  const featured = search ? null : (filtered[0] ?? null);
  const rest = search ? filtered : filtered.slice(1);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary-50)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] text-[var(--color-secondary)] uppercase">
                Our Blog
              </p>
              <h1 className="mt-2 text-3xl font-bold text-[var(--color-primary)] md:text-4xl">
                Insights & Updates
              </h1>
              <p className="mt-2 max-w-md text-sm text-gray-500">
                Expert perspectives, industry insights, and updates from our
                team.
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-full bg-[var(--color-primary)]/8 px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
                  {allBlogs.length} post{allBlogs.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Search */}
            <div className="flex w-full items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm transition-all focus-within:border-[var(--color-primary)]/40 focus-within:bg-white focus-within:shadow-md md:w-72">
              <IoSearchOutline className="size-4 shrink-0 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles…"
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
              />
              {search && (
                <button onClick={() => setSearch("")}>
                  <IoCloseOutline className="size-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="mx-auto max-w-6xl px-5 py-10">
        {isLoading && (
          <div className="flex flex-col gap-6">
            <div className="h-56 animate-pulse rounded-3xl bg-gray-200" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-sm font-medium text-gray-500">
              Failed to load blogs. Please try again.
            </p>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="flex flex-col gap-8">
            {/* Featured */}
            {featured && !search && <FeaturedCard blog={featured} />}

            {/* Search result count */}
            {search && (
              <p className="text-sm text-gray-500">
                {filtered.length === 0
                  ? "No results found"
                  : `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${search}"`}
              </p>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {rest.map((blog, i) => (
                    <BlogCard key={blog.id} blog={blog} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Empty */}
            {filtered.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white py-24 text-center">
                <p className="text-sm font-medium text-gray-500">
                  {search
                    ? "No articles match your search."
                    : "No articles published yet."}
                </p>
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="mt-3 text-xs font-semibold text-[var(--color-secondary)] hover:underline"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
