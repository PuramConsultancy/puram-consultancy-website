"use client";

import { useState } from "react";
import { IoAddOutline, IoDocumentTextOutline } from "react-icons/io5";
import { useGetBlogs, Blog } from "@/app/api-client/blogs/useGetBlogs";
import BlogList from "./_components/BlogList";
import BlogFormDrawer from "./_components/BlogFormDrawer";

const BlogsPage = () => {
  const { data, isLoading, isError } = useGetBlogs();
  const blogs = data?.data ?? [];
  const [drawer, setDrawer] = useState<Blog | "new" | null>(null);

  const publishedCount = blogs.filter((b) => b.published).length;
  const draftCount = blogs.filter((b) => !b.published).length;

  if (isLoading) {
    return (
      <section className="flex h-full flex-1 flex-col overflow-hidden">
        <div className="h-full overflow-y-auto bg-gray-50 p-5">
          <div className="flex flex-col gap-4">
            <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-2xl bg-gray-200"
                />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-48 animate-pulse rounded-2xl bg-gray-200"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex h-full flex-1 items-center justify-center">
        <p className="text-sm text-gray-500">Failed to load blogs.</p>
      </section>
    );
  }

  return (
    <>
      <section className="flex h-full flex-1 flex-col overflow-hidden">
        <div className="h-full overflow-y-auto bg-gray-50 p-5">
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold text-gray-800">Blogs</h1>
                <p className="mt-0.5 text-xs text-gray-400">
                  {publishedCount} published · {draftCount} draft
                  {draftCount !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={() => setDrawer("new")}
                className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
              >
                <IoAddOutline className="size-4" />
                New Blog
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  label: "Total Posts",
                  value: blogs.length,
                  color: "from-violet-500 to-violet-700",
                },
                {
                  label: "Published",
                  value: publishedCount,
                  color: "from-emerald-500 to-emerald-700",
                },
                {
                  label: "Drafts",
                  value: draftCount,
                  color: "from-amber-400 to-amber-600",
                },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br p-5 ${color}`}
                >
                  <div className="pointer-events-none absolute -top-4 -right-4 size-20 rounded-full bg-white/10" />
                  <IoDocumentTextOutline className="size-5 text-white/80" />
                  <p className="mt-3 text-2xl font-bold text-white">{value}</p>
                  <p className="mt-0.5 text-xs font-medium text-white/70">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Blog list */}
            <BlogList blogs={blogs} onEdit={(blog) => setDrawer(blog)} />
          </div>
        </div>
      </section>

      <BlogFormDrawer blog={drawer} onClose={() => setDrawer(null)} />
    </>
  );
};

export default BlogsPage;
