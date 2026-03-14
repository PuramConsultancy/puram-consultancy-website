"use client";

import { motion } from "motion/react";
import {
  IoPencilOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoCalendarOutline,
} from "react-icons/io5";
import { Blog } from "@/app/api-client/blogs/useGetBlogs";
import BlogDeleteButton from "./BlogDeleteButton";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const excerpt = (content: string, max = 130) =>
  content.replace(/[#*`>_~\[\]]/g, "").slice(0, max) +
  (content.length > max ? "…" : "");

const BlogCard = ({
  blog,
  index,
  onEdit,
}: {
  blog: Blog;
  index: number;
  onEdit: (blog: Blog) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.97 }}
    transition={{ delay: index * 0.04 }}
    className="group flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md"
  >
    {/* Top */}
    <div className="flex items-start justify-between gap-3">
      <h3 className="line-clamp-2 flex-1 text-sm font-semibold text-gray-800">
        {blog.title}
      </h3>
      <span
        className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
          blog.published
            ? "bg-emerald-50 text-emerald-600"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        {blog.published ? (
          <IoEyeOutline className="size-3" />
        ) : (
          <IoEyeOffOutline className="size-3" />
        )}
        {blog.published ? "Published" : "Draft"}
      </span>
    </div>

    {/* Slug */}
    <p className="mt-1 font-mono text-xs text-gray-400">{blog.slug}</p>

    {/* Excerpt */}
    <p className="mt-3 flex-1 text-xs leading-relaxed text-gray-500">
      {excerpt(blog.content)}
    </p>

    {/* Footer */}
    <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        <IoCalendarOutline className="size-3.5" />
        {formatDate(blog.createdAt)}
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onEdit(blog)}
          className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-violet-50 hover:text-violet-600"
        >
          <IoPencilOutline className="size-4" />
        </button>
        <BlogDeleteButton id={blog.id} />
      </div>
    </div>
  </motion.div>
);

export default BlogCard;