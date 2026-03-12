"use client";

import { useState, useMemo } from "react";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";
import {
  useGetBookings,
  parseBooking,
  ParsedBooking,
  BookingStatus,
} from "@/app/api-client/booking/useGetBookings";
import StatCard from "./_components/StatCard";
import BookingToolbar from "./_components/BookingToolbar";
import BookingTable from "./_components/BookingTable";
import BookingDrawer from "./_components/BookingDrawer";

const BookingsPage = () => {
  const { data, isLoading, isError } = useGetBookings();
  const bookings = useMemo(
    () => (data?.data ?? []).map(parseBooking),
    [data],
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "ALL">("ALL");
  const [selected, setSelected] = useState<ParsedBooking | null>(null);

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const q = search.toLowerCase();
      const matchesSearch =
        `${b.firstName} ${b.lastName}`.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        (b.serviceName?.toLowerCase() ?? "").includes(q);
      const matchesStatus =
        statusFilter === "ALL" || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  const counts = useMemo(() => ({
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "PENDING").length,
    confirmed: bookings.filter((b) => b.status === "CONFIRMED").length,
    completed: bookings.filter((b) => b.status === "COMPLETED").length,
  }), [bookings]);

  if (isLoading) {
    return (
      <section className="flex h-full flex-1 flex-col overflow-hidden">
        <div className="h-full overflow-y-auto bg-gray-50 p-5">
          <div className="flex flex-col gap-4">
            <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 animate-pulse rounded-2xl bg-gray-200" />
              ))}
            </div>
            <div className="h-96 animate-pulse rounded-2xl bg-gray-200" />
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex h-full flex-1 items-center justify-center">
        <p className="text-sm text-gray-500">Failed to load bookings.</p>
      </section>
    );
  }

  return (
    <>
      <section className="flex h-full flex-1 flex-col overflow-hidden">
        <div className="h-full overflow-y-auto bg-gray-50 p-5">
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Bookings</h1>
              <p className="mt-0.5 text-xs text-gray-400">
                All contact form submissions and appointment requests
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard
                label="Total"
                value={counts.total}
                color="bg-gradient-to-br from-violet-500 to-violet-700"
                icon={IoCalendarOutline}
              />
              <StatCard
                label="Pending"
                value={counts.pending}
                color="bg-gradient-to-br from-amber-400 to-amber-600"
                icon={IoTimeOutline}
              />
              <StatCard
                label="Confirmed"
                value={counts.confirmed}
                color="bg-gradient-to-br from-emerald-500 to-emerald-700"
                icon={IoCheckmarkCircle}
              />
              <StatCard
                label="Completed"
                value={counts.completed}
                color="bg-gradient-to-br from-sky-500 to-sky-700"
                icon={IoCheckmarkCircle}
              />
            </div>

            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
              <BookingToolbar
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                resultCount={filtered.length}
              />
              <BookingTable
                bookings={filtered}
                onSelect={setSelected}
                hasFilters={!!search || statusFilter !== "ALL"}
              />
            </div>
          </div>
        </div>
      </section>

      <BookingDrawer
        booking={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
};

export default BookingsPage;