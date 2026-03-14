"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IoCloseOutline, IoCheckmarkOutline } from "react-icons/io5";
import dynamic from "next/dynamic";
import { Blog } from "@/app/api-client/blogs/useGetBlogs";
import { useCreateBlog } from "@/app/api-client/blogs/useCreateBlog";
import { useUpdateBlog } from "@/app/api-client/blogs/useUpdateBlog";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const BlogFormDrawer = ({
  blog,
  onClose,
}: {
  blog: Blog | "new" | null;
  onClose: () => void;
}) => {
  const isNew = blog === "new";
  const isOpen = blog !== null;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
  }>({});

  const { mutateAsync: createBlog, isPending: isCreating } = useCreateBlog();
  const { mutateAsync: updateBlog, isPending: isUpdating } = useUpdateBlog({
    id: !isNew && blog ? blog.id : "",
  });

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (blog && blog !== "new") {
      setTitle(blog.title);
      setContent(blog.content);
      setPublished(blog.published);
    } else {
      setTitle("");
      setContent("");
      setPublished(false);
    }
    setErrors({});
  }, [blog]);

  const validate = () => {
    const newErrors: { title?: string; content?: string } = {};
    if (!title.trim() || title.trim().length < 3)
      newErrors.title = "Title must be at least 3 characters";
    if (!content.trim() || content.trim().length < 10)
      newErrors.content = "Content must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const input = { title: title.trim(), content: content.trim(), published };
    if (isNew) {
      await createBlog(input);
    } else {
      await updateBlog(input);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 z-50 flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {isNew ? "Create Blog" : "Edit Blog"}
                </p>
                <p className="text-xs text-gray-400">
                  {isNew
                    ? "Write and publish a new blog post"
                    : "Update your blog post"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-gray-100"
              >
                <IoCloseOutline className="size-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="flex flex-col gap-5">
                {/* Title */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (errors.title)
                        setErrors((p) => ({ ...p, title: undefined }));
                    }}
                    placeholder="Enter blog title…"
                    className={`w-full rounded-xl border bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-violet-100 focus:outline-none ${
                      errors.title
                        ? "border-rose-300 focus:border-rose-400"
                        : "border-gray-200 focus:border-violet-400"
                    }`}
                  />
                  {errors.title && (
                    <p className="mt-1 text-xs text-rose-500">{errors.title}</p>
                  )}
                </div>

                {/* Content */}
                <div data-color-mode="light">
                  <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    Content
                  </label>
                  <MDEditor
                    value={content}
                    onChange={(val) => {
                      setContent(val ?? "");
                      if (errors.content)
                        setErrors((p) => ({ ...p, content: undefined }));
                    }}
                    height={380}
                    preview="edit"
                  />
                  {errors.content && (
                    <p className="mt-1 text-xs text-rose-500">
                      {errors.content}
                    </p>
                  )}
                </div>

                {/* Publish toggle */}
                <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Publish</p>
                    <p className="text-xs text-gray-400">
                      Make this blog visible to the public
                    </p>
                  </div>
                  <button
                    onClick={() => setPublished((v) => !v)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      published ? "bg-violet-500" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform ${
                        published ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
              <button
                onClick={onClose}
                className="rounded-xl px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <IoCheckmarkOutline className="size-4" />
                {isPending
                  ? isNew
                    ? "Creating…"
                    : "Saving…"
                  : isNew
                    ? "Create Blog"
                    : "Save Changes"}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default BlogFormDrawer;
