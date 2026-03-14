"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoTimeOutline,
  IoCloseCircleOutline,
  IoListOutline,
  IoEyeOutline,
  IoBookOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { DashboardStats } from "@/app/api-client/dashboard/useGetDashboard";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  delay?: number;
  href?: string;
}

const StatCard = ({
  label,
  value,
  icon,
  iconBg,
  delay = 0,
  href,
}: StatCardProps) => {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="group flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div
        className={`flex size-9 items-center justify-center rounded-xl ${iconBg}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </motion.div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
};

const StatGrid = ({ stats }: { stats: DashboardStats }) => (
  <div className="flex flex-col gap-3">
    <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
      Overview
    </p>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard
        label="Total Bookings"
        value={stats.totalBookings}
        icon={
          <IoCalendarOutline className="size-4 text-[var(--color-primary)]" />
        }
        iconBg="bg-[var(--color-primary)]/10"
        delay={0}
        href="/admin-dashboard/bookings"
      />
      <StatCard
        label="Pending"
        value={stats.pendingBookings}
        icon={<IoTimeOutline className="size-4 text-amber-500" />}
        iconBg="bg-amber-50"
        delay={0.05}
        href="/admin-dashboard/bookings"
      />
      <StatCard
        label="Confirmed"
        value={stats.confirmedBookings}
        icon={<IoCheckmarkCircleOutline className="size-4 text-blue-500" />}
        iconBg="bg-blue-50"
        delay={0.1}
        href="/admin-dashboard/bookings"
      />
      <StatCard
        label="Completed"
        value={stats.completedBookings}
        icon={<IoCheckmarkCircleOutline className="size-4 text-emerald-500" />}
        iconBg="bg-emerald-50"
        delay={0.15}
        href="/admin-dashboard/bookings"
      />
      <StatCard
        label="Cancelled"
        value={stats.cancelledBookings}
        icon={<IoCloseCircleOutline className="size-4 text-rose-500" />}
        iconBg="bg-rose-50"
        delay={0.2}
      />
      <StatCard
        label="Submissions"
        value={stats.totalSubmissions}
        icon={<IoListOutline className="size-4 text-violet-500" />}
        iconBg="bg-violet-50"
        delay={0.25}
        href="/admin-dashboard/submissions"
      />
      <StatCard
        label="Blog Posts"
        value={stats.totalBlogs}
        icon={<IoBookOutline className="size-4 text-orange-500" />}
        iconBg="bg-orange-50"
        delay={0.3}
        href="/admin-dashboard/blogs"
      />
      <StatCard
        label="Published"
        value={stats.publishedBlogs}
        icon={<IoEyeOutline className="size-4 text-teal-500" />}
        iconBg="bg-teal-50"
        delay={0.35}
        href="/admin-dashboard/blogs"
      />
    </div>
  </div>
);

export default StatGrid;
