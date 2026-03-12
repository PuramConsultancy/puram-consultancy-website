"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IoCalendarOutline,
  IoChevronForwardOutline,
  IoTrashOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import {
  ParsedBooking,
  BookingStatus,
  useUpdateBookingStatus,
  useDeleteBooking,
} from "@/app/api-client/booking/useGetBookings";
import {
  STATUS_CONFIG,
  ALL_STATUSES,
  avatarColor,
  formatDate,
  formatDateTime,
} from "./bookingConfig";

// ── Status Dropdown ───────────────────────────────────────────────────────────

const StatusDropdown = ({ booking }: { booking: ParsedBooking }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: updateStatus, isPending } = useUpdateBookingStatus({
    id: booking.id,
  });

  const handleChange = async (status: BookingStatus) => {
    setOpen(false);
    await updateStatus(status);
  };

  const current = STATUS_CONFIG[booking.status];

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        disabled={isPending}
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-opacity ${current.color} ${isPending ? "opacity-50" : "hover:opacity-80"}`}
      >
        <span className={`size-1.5 rounded-full ${current.dot}`} />
        {current.label}
        <IoChevronDownOutline className="size-3" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              transition={{ duration: 0.12 }}
              className="absolute top-full left-0 z-20 mt-1.5 w-36 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg"
            >
              {ALL_STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChange(s);
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-xs font-medium transition-colors hover:bg-gray-50 ${
                    s === booking.status ? "bg-gray-50" : ""
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${STATUS_CONFIG[s].dot}`}
                  />
                  <span className="text-gray-700">
                    {STATUS_CONFIG[s].label}
                  </span>
                  {s === booking.status && (
                    <span className="ml-auto text-violet-500">✓</span>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Delete Button ─────────────────────────────────────────────────────────────

const DeleteButton = ({ booking }: { booking: ParsedBooking }) => {
  const [confirming, setConfirming] = useState(false);
  const { mutateAsync: deleteBooking, isPending } = useDeleteBooking({
    id: booking.id,
  });

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    await deleteBooking();
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={`rounded-lg px-2 py-1 text-xs font-medium transition-colors ${
        confirming
          ? "bg-rose-50 text-rose-500 hover:bg-rose-100"
          : "text-gray-300 hover:bg-rose-50 hover:text-rose-400"
      } ${isPending ? "opacity-50" : ""}`}
    >
      {confirming ? "Sure?" : <IoTrashOutline className="size-4" />}
    </button>
  );
};

// ── Table ─────────────────────────────────────────────────────────────────────

const BookingTable = ({
  bookings,
  onSelect,
  hasFilters,
}: {
  bookings: ParsedBooking[];
  onSelect: (b: ParsedBooking) => void;
  hasFilters: boolean;
}) => {
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-gray-100">
          <IoCalendarOutline className="size-7 text-gray-300" />
        </div>
        <p className="mt-4 text-sm font-medium text-gray-500">
          {hasFilters ? "No bookings match your filters." : "No bookings yet."}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Bookings will appear here once users submit the contact form.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/60">
            {[
              "Name",
              "Phone",
              "Service",
              "Message",
              "Appointment",
              "Submitted",
              "Status",
              "",
            ].map((h) => (
              <th
                key={h}
                className="px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-400 uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {bookings.map((b, i) => (
              <motion.tr
                key={b.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => onSelect(b)}
                className="group cursor-pointer border-b border-gray-50 transition-colors last:border-0 hover:bg-violet-50/40"
              >
                {/* Name */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white ${avatarColor(b.id)}`}
                    >
                      {b.firstName[0]}
                      {b.lastName[0]}
                    </div>
                    <p className="font-medium text-gray-800">
                      {b.firstName} {b.lastName}
                    </p>
                  </div>
                </td>

                {/* Phone */}
                <td className="px-5 py-3.5 text-gray-600">{b.phone}</td>

                {/* Service */}
                <td className="max-w-[140px] truncate px-5 py-3.5 text-gray-600">
                  {b.serviceName ?? "—"}
                </td>

                {/* Message */}
                <td className="max-w-[180px] px-5 py-3.5">
                  {b.message ? (
                    <p className="truncate text-xs text-gray-400">
                      {b.message}
                    </p>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </td>

                {/* Appointment */}
                <td className="px-5 py-3.5 text-xs whitespace-nowrap text-gray-400">
                  {b.appointmentDate ? formatDate(b.appointmentDate) : "—"}
                </td>

                {/* Submitted */}
                <td className="px-5 py-3.5 text-xs whitespace-nowrap text-gray-400">
                  {formatDateTime(b.createdAt)}
                </td>

                {/* Status dropdown */}
                <td
                  className="px-5 py-3.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <StatusDropdown booking={b} />
                </td>

                {/* Actions */}
                <td
                  className="px-5 py-3.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1">
                    <DeleteButton booking={b} />
                    <IoChevronForwardOutline
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(b);
                      }}
                      className="size-4 text-gray-300 transition-colors group-hover:text-violet-500"
                    />
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
