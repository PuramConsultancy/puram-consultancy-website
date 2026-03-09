"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  
  return (
    <main className="bg-(--color-primary) flex h-dvh w-full flex-col overflow-hidden p-1.5">
      <div className="flex w-full flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex h-full w-full min-w-0 flex-1 flex-col rounded-2xl bg-white">
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
