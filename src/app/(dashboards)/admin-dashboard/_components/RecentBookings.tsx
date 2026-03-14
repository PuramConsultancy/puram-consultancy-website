"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { IoCalendarOutline } from "react-icons/io5";
import { RecentBooking } from "@/app/api-client/dashboard/useGetDashboard";

const STATUS_CONFIG: Record<
  string,
  { label: string; className: string; dot: string }
> = {
  PENDING: {
    label: "Pending",
    className: "bg-amber-50 text-amber-600",
    dot: "bg-amber-400",
  },
  CONFIRMED: {
    label: "Confirmed",
    className: "bg-blue-50 text-blue-600",
    dot: "bg-blue-400",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-600",
    dot: "bg-emerald-400",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-rose-50 text-rose-500",
    dot: "bg-rose-400",
  },
};

const parseName = (notes: string | null) => {
  try {
    const p = JSON.parse(notes ?? "{}");
    return `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim() || "—";
  } catch {
    return "—";
  }
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

const RecentBookings = ({ bookings }: { bookings: RecentBooking[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.35 }}
    className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100"
  >
    <div className="flex items-center justify-between border-b border-gray-50 px-5 py-4">
      <div>
        <p className="text-sm font-semibold text-gray-800">Recent Bookings</p>
        <p className="text-xs text-gray-400">Latest 5 requests</p>
      </div>
      <Link
        href="/admin-dashboard/bookings"
        className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-[var(--color-primary)]/8 hover:text-[var(--color-primary)]"
      >
        View all →
      </Link>
    </div>

    <div className="divide-y divide-gray-50">
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center py-10">
          <IoCalendarOutline className="size-8 text-gray-200" />
          <p className="mt-2 text-xs text-gray-400">No bookings yet</p>
        </div>
      ) : (
        bookings.map((b) => {
          const status = STATUS_CONFIG[b.status] ?? STATUS_CONFIG.PENDING;
          return (
            <div
              key={b.id}
              className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-gray-50/60"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/8">
                  <IoCalendarOutline className="size-3.5 text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-800">
                    {parseName(b.notes)}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {formatDate(b.createdAt)}
                  </p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${status.className}`}
              >
                <span className={`size-1 rounded-full ${status.dot}`} />
                {status.label}
              </span>
            </div>
          );
        })
      )}
    </div>
  </motion.div>
);

export default RecentBookings;
