"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import {
  IoArrowBackOutline,
  IoTimeOutline,
  IoCalendarOutline,
  IoShareSocialOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";
import { useGetBlogs, Blog } from "@/app/api-client/blogs/useGetBlogs";
import { useGetBlogBySlug } from "@/app/api-client/blogs/useGetBlogBySlug";

const MDPreview = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default.Markdown),
  { ssr: false },
);

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

const ShareButton = ({ title }: { title: string }) => {
  const [copied, setCopied] = useState(false);
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 shadow-sm transition-all hover:border-[var(--color-primary)]/30 hover:text-[var(--color-primary)]"
    >
      {copied ? (
        <>
          <IoCheckmarkOutline className="size-3.5 text-emerald-500" />
          Copied!
        </>
      ) : (
        <>
          <IoShareSocialOutline className="size-3.5" />
          Share
        </>
      )}
    </button>
  );
};

const RelatedCard = ({ blog }: { blog: Blog }) => {
  const getExcerpt = (content: string, max = 90) => {
    const clean = content.replace(/[#*`>_~\[\]()!]/g, "").trim();
    return clean.length > max ? clean.slice(0, max).trimEnd() + "…" : clean;
  };
  return (
    <Link href={`/blogs/${blog.slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[var(--color-primary)]/15 group-hover:shadow-md">
        <div className="h-0.5 w-8 rounded-full bg-[var(--color-secondary)] transition-all group-hover:w-16" />
        <h4 className="mt-3 line-clamp-2 text-sm leading-snug font-semibold text-gray-800 transition-colors group-hover:text-[var(--color-primary)]">
          {blog.title}
        </h4>
        <p className="mt-1.5 line-clamp-2 text-xs text-gray-400">
          {getExcerpt(blog.content)}
        </p>
        <p className="mt-3 text-xs text-gray-400">
          {formatDate(blog.createdAt)}
        </p>
      </div>
    </Link>
  );
};

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data, isLoading, isError } = useGetBlogBySlug(slug);
  const { data: allData } = useGetBlogs();

  const blog = data?.data;
  const related =
    allData?.data
      ?.filter((b) => b.published && b.id !== blog?.id)
      .slice(0, 3) ?? [];

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-3xl px-5 py-14">
          <div className="h-5 w-24 animate-pulse rounded-lg bg-gray-200" />
          <div className="mt-8 space-y-4">
            <div className="h-10 w-4/5 animate-pulse rounded-xl bg-gray-200" />
            <div className="h-10 w-3/5 animate-pulse rounded-xl bg-gray-200" />
          </div>
          <div className="mt-10 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-4 animate-pulse rounded bg-gray-100"
                style={{ width: `${75 + Math.random() * 25}%` }}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!blog || isError) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="flex flex-col items-center justify-center py-40 text-center">
          <p className="text-4xl font-bold text-gray-200">404</p>
          <p className="mt-2 text-sm font-medium text-gray-500">
            Blog post not found.
          </p>
          <Link
            href="/blogs"
            className="mt-5 flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white"
          >
            <IoArrowBackOutline className="size-4" />
            Back to Blogs
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--color-primary-50)_0%,_transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl px-5 py-14 md:py-18">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 transition-colors hover:text-[var(--color-primary)]"
            >
              <IoArrowBackOutline className="size-3.5" />
              All Articles
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="mt-5 text-2xl leading-tight font-bold text-[var(--color-primary)] md:text-3xl lg:text-4xl"
          >
            {blog.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-5 flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <IoCalendarOutline className="size-3.5" />
                {formatDate(blog.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <IoTimeOutline className="size-3.5" />
                {readingTime(blog.content)} min read
              </span>
            </div>
            <ShareButton title={blog.title} />
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-7 h-px origin-left bg-gradient-to-r from-[var(--color-primary)]/20 via-[var(--color-secondary)]/30 to-transparent"
          />
        </div>
      </section>

      {/* Article */}
      <div className="mx-auto max-w-3xl px-5 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          data-color-mode="light"
          className="rounded-3xl bg-white px-6 py-10 shadow-sm ring-1 ring-gray-100 md:px-10 md:py-12"
        >
          <div className="prose-blog">
            <MDPreview source={blog.content} />
          </div>
        </motion.article>

        {/* Related */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.45 }}
            className="mt-14"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-bold text-[var(--color-primary)]">
                More Articles
              </h2>
              <Link
                href="/blogs"
                className="text-xs font-semibold text-[var(--color-secondary)] hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((b) => (
                <RelatedCard key={b.id} blog={b} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Back */}
        <div className="mt-12 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 shadow-sm transition-all hover:border-[var(--color-primary)]/30 hover:text-[var(--color-primary)] hover:shadow-md"
          >
            <IoArrowBackOutline className="size-4" />
            Back to All Articles
          </Link>
        </div>
      </div>
    </main>
  );
}
