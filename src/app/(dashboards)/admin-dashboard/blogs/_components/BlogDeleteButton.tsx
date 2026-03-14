"use client";

import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useDeleteBlog } from "@/app/api-client/blogs/useDeleteBlog";

const BlogDeleteButton = ({ id }: { id: string }) => {
  const [confirming, setConfirming] = useState(false);
  const { mutateAsync: deleteBlog, isPending } = useDeleteBlog({ id });

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    await deleteBlog();
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
        confirming
          ? "bg-rose-50 text-rose-500 hover:bg-rose-100"
          : "text-gray-400 hover:bg-rose-50 hover:text-rose-400"
      } ${isPending ? "opacity-50" : ""}`}
    >
      {confirming ? "Sure?" : <IoTrashOutline className="size-4" />}
    </button>
  );
};

export default BlogDeleteButton;
