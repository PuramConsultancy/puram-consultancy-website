"use client";

import { motion } from "motion/react";
import { DayActivity } from "@/app/api-client/dashboard/useGetDashboard";

const ActivityChart = ({ data }: { data: DayActivity[] }) => {
  const max = Math.max(...data.flatMap((d) => [d.bookings, d.submissions]), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.35 }}
      className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100"
    >
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-800">7-Day Activity</p>
          <p className="mt-0.5 text-xs text-gray-400">
            Bookings &amp; submissions this week
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-[var(--color-primary)]" />
            Bookings
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-[var(--color-secondary)]" />
            Submissions
          </span>
        </div>
      </div>

      <div className="flex items-end gap-2" style={{ height: "120px" }}>
        {data.map((d, i) => (
          <div
            key={i}
            className="group flex flex-1 flex-col items-center gap-1.5"
          >
            <div
              className="flex w-full items-end justify-center gap-0.5"
              style={{ height: "96px" }}
            >
              {/* Booking bar */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.bookings / max) * 96}px` }}
                transition={{
                  delay: 0.5 + i * 0.05,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="flex-1 rounded-t-md bg-[var(--color-primary)] opacity-80"
                style={{ minHeight: d.bookings > 0 ? "4px" : "0" }}
              />
              {/* Submission bar */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.submissions / max) * 96}px` }}
                transition={{
                  delay: 0.55 + i * 0.05,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="flex-1 rounded-t-md bg-[var(--color-secondary)] opacity-80"
                style={{ minHeight: d.submissions > 0 ? "4px" : "0" }}
              />
            </div>
            <span className="text-[10px] text-gray-400">{d.label}</span>
          </div>
        ))}
      </div>

      {/* Totals row */}
      <div className="mt-4 flex items-center gap-4 border-t border-gray-50 pt-4">
        <div className="flex-1 text-center">
          <p className="text-base font-bold text-[var(--color-primary)]">
            {data.reduce((s, d) => s + d.bookings, 0)}
          </p>
          <p className="text-[10px] text-gray-400">bookings this week</p>
        </div>
        <div className="h-8 w-px bg-gray-100" />
        <div className="flex-1 text-center">
          <p className="text-base font-bold text-[var(--color-secondary)]">
            {data.reduce((s, d) => s + d.submissions, 0)}
          </p>
          <p className="text-[10px] text-gray-400">submissions this week</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityChart;
