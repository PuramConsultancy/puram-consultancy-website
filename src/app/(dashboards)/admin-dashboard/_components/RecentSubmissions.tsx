"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RecentSubmission } from "@/app/api-client/dashboard/useGetDashboard";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

const AVATAR_COLORS = [
  "bg-violet-100 text-violet-600",
  "bg-blue-100 text-blue-600",
  "bg-teal-100 text-teal-600",
  "bg-orange-100 text-orange-600",
  "bg-pink-100 text-pink-600",
];

const RecentSubmissions = ({
  submissions,
}: {
  submissions: RecentSubmission[];
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.55, duration: 0.35 }}
    className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100"
  >
    <div className="flex items-center justify-between border-b border-gray-50 px-5 py-4">
      <div>
        <p className="text-sm font-semibold text-gray-800">
          Recent Submissions
        </p>
        <p className="text-xs text-gray-400">Latest 5 form responses</p>
      </div>
      <Link
        href="/admin-dashboard/submissions"
        className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-violet-50 hover:text-violet-600"
      >
        View all →
      </Link>
    </div>

    <div className="divide-y divide-gray-50">
      {submissions.length === 0 ? (
        <div className="flex flex-col items-center py-10">
          <IoDocumentTextOutline className="size-8 text-gray-200" />
          <p className="mt-2 text-xs text-gray-400">No submissions yet</p>
        </div>
      ) : (
        submissions.map((s, i) => (
          <div
            key={s.id}
            className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-gray-50/60"
          >
            <div
              className={`flex size-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
            >
              {s.form.title.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-gray-800">
                {s.form.title}
              </p>
              <p className="text-[10px] text-gray-400">
                {formatDate(s.createdAt)}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-600">
              New
            </span>
          </div>
        ))
      )}
    </div>
  </motion.div>
);

export default RecentSubmissions;
