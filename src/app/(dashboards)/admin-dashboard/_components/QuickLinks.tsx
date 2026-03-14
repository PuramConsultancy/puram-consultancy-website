"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  IoCalendarOutline,
  IoListOutline,
  IoBookOutline,
  IoSettingsOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";

const LINKS = [
  {
    label: "Manage Bookings",
    href: "/admin-dashboard/bookings",
    icon: IoCalendarOutline,
    iconClass: "text-[var(--color-primary)] bg-[var(--color-primary)]/10",
    desc: "View & update status",
  },
  {
    label: "View Submissions",
    href: "/admin-dashboard/submissions",
    icon: IoListOutline,
    iconClass: "text-violet-600 bg-violet-50",
    desc: "Browse form responses",
  },
  {
    label: "Write Blog",
    href: "/admin-dashboard/blogs",
    icon: IoBookOutline,
    iconClass: "text-orange-500 bg-orange-50",
    desc: "Create & publish posts",
  },
  {
    label: "Configurations",
    href: "/admin-dashboard/configurations",
    icon: IoSettingsOutline,
    iconClass: "text-[var(--color-secondary)] bg-[var(--color-secondary)]/10",
    desc: "Site settings & links",
  },
];

const QuickLinks = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 0.35 }}
    className="flex flex-col gap-3"
  >
    <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
      Quick Actions
    </p>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {LINKS.map(({ label, href, icon: Icon, iconClass, desc }) => (
        <Link
          key={label}
          href={href}
          className="group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <span
            className={`flex size-9 items-center justify-center rounded-xl ${iconClass}`}
          >
            <Icon className="size-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-gray-800 group-hover:text-[var(--color-primary)]">
              {label}
            </p>
            <p className="mt-0.5 text-[10px] text-gray-400">{desc}</p>
          </div>
          <IoArrowForwardOutline className="size-3 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-500" />
        </Link>
      ))}
    </div>
  </motion.div>
);

export default QuickLinks;
