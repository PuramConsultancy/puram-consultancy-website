"use client";

import { motion } from "motion/react";
import { useAuth } from "@/store/authStore";

const GreetingHeader = () => {
  const { user } = useAuth();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-lg font-semibold text-gray-800">
        {greeting()}, {user?.firstName ?? "Admin"} 👋
      </h1>
      <p className="mt-0.5 text-xs text-gray-400">
        Here&apos;s what&apos;s happening with your business today.
      </p>
    </motion.div>
  );
};

export default GreetingHeader;
