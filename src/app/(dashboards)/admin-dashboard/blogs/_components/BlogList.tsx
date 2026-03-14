"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import {
  IoSearchOutline,
  IoCloseOutline,
  IoFunnelOutline,
} from "react-icons/io5";
import { Blog } from "@/app/api-client/blogs/useGetBlogs";
import BlogCard from "./BlogCard";

type Filter = "ALL" | "PUBLISHED" | "DRAFT";

const BlogList = ({
  blogs,
  onEdit,
}: {
  blogs: Blog[];
  onEdit: (blog: Blog) => void;
}) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("ALL");

  const filtered = useMemo(
    () =>
      blogs.filter((b) => {
        const q = search.toLowerCase();
        const matchesSearch =
          b.title.toLowerCase().includes(q) || b.slug.toLowerCase().includes(q);
        const matchesFilter =
          filter === "ALL" ||
          (filter === "PUBLISHED" && b.published) ||
          (filter === "DRAFT" && !b.published);
        return matchesSearch && matchesFilter;
      }),
    [blogs, search, filter],
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-gray-200">
          <IoSearchOutline className="size-4 text-gray-400" />
          <input
            placeholder="Search blogs…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <IoCloseOutline className="size-3.5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 ring-1 ring-gray-200">
            <IoFunnelOutline className="size-3.5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as Filter)}
              className="bg-transparent text-xs font-medium text-gray-600 focus:outline-none"
            >
              <option value="ALL">All</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Drafts</option>
            </select>
          </div>
          <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-600">
            {filtered.length} post{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Empty */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-20 text-center shadow-sm ring-1 ring-gray-100">
          <p className="text-sm font-medium text-gray-500">
            {search || filter !== "ALL"
              ? "No blogs match your filters."
              : "No blogs yet. Create your first post!"}
          </p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filtered.map((blog, i) => (
            <BlogCard key={blog.id} blog={blog} index={i} onEdit={onEdit} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BlogList;
