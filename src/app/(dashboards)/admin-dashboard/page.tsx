"use client";

import Topbar from "../Topbar";
import { useGetDashboard } from "@/app/api-client/dashboard/useGetDashboard";
import GreetingHeader from "./_components/GreetingHeader";
import StatGrid from "./_components/StatGrid";
import ActivityChart from "./_components/ActivityChart";
import BookingStatusBars from "./_components/BookingStatusBars";
import RecentBookings from "./_components/RecentBookings";
import RecentSubmissions from "./_components/RecentSubmissions";
import QuickLinks from "./_components/QuickLinks";

const Skeleton = () => (
  <div className="flex flex-col gap-5 p-5">
    <div className="h-7 w-48 animate-pulse rounded-lg bg-gray-200" />
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-24 animate-pulse rounded-2xl bg-gray-200" />
      ))}
    </div>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="h-56 animate-pulse rounded-2xl bg-gray-200 lg:col-span-2" />
      <div className="h-56 animate-pulse rounded-2xl bg-gray-200" />
    </div>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="h-52 animate-pulse rounded-2xl bg-gray-200" />
      <div className="h-52 animate-pulse rounded-2xl bg-gray-200" />
    </div>
  </div>
);

const DashboardPage = () => {
  const { data, isLoading, isError } = useGetDashboard();
  const dashboard = data?.data;

  return (
    <section className="flex h-full flex-1 flex-col overflow-hidden">
      <Topbar heading="Admin Dashboard" />

      <div className="scrollbar h-full flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
        {isLoading ? (
          <Skeleton />
        ) : isError || !dashboard ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-gray-400">Failed to load dashboard.</p>
          </div>
        ) : (
          <div className="mx-auto flex max-w-7xl flex-col gap-6 p-5">
            <GreetingHeader />
            <StatGrid stats={dashboard.stats} />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ActivityChart data={dashboard.last7Days} />
              </div>
              <BookingStatusBars stats={dashboard.stats} />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <RecentBookings bookings={dashboard.recentBookings} />
              <RecentSubmissions submissions={dashboard.recentSubmissions} />
            </div>

            <QuickLinks />
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardPage;
