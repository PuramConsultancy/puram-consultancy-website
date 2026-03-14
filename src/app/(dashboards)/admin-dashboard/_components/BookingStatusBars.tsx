"use client";

import { motion } from "motion/react";
import { DashboardStats } from "@/app/api-client/dashboard/useGetDashboard";

const STATUSES = [
  {
    key: "pendingBookings",
    label: "Pending",
    color: "bg-amber-400",
    text: "text-amber-600",
  },
  {
    key: "confirmedBookings",
    label: "Confirmed",
    color: "bg-blue-400",
    text: "text-blue-600",
  },
  {
    key: "completedBookings",
    label: "Completed",
    color: "bg-emerald-400",
    text: "text-emerald-600",
  },
  {
    key: "cancelledBookings",
    label: "Cancelled",
    color: "bg-rose-400",
    text: "text-rose-500",
  },
] as const;

const BookingStatusBars = ({ stats }: { stats: DashboardStats }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.45, duration: 0.35 }}
    className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100"
  >
    <p className="text-sm font-semibold text-gray-800">Booking Breakdown</p>
    <p className="mt-0.5 text-xs text-gray-400">Status distribution</p>

    <div className="mt-5 flex flex-col gap-4">
      {STATUSES.map(({ key, label, color, text }) => {
        const value = stats[key];
        const pct =
          stats.totalBookings > 0
            ? Math.round((value / stats.totalBookings) * 100)
            : 0;
        return (
          <div key={key}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs text-gray-600">{label}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${text}`}>{value}</span>
                <span className="text-[10px] text-gray-400">({pct}%)</span>
              </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                className={`h-full rounded-full ${color}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  </motion.div>
);

export default BookingStatusBars;
