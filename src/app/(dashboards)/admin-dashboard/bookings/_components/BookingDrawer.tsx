import { motion, AnimatePresence } from "motion/react";
import {
  IoPersonOutline,
  IoCallOutline,
  IoCalendarOutline,
  IoCloseOutline,
  IoBriefcaseOutline,
  IoChatbubbleOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { ParsedBooking } from "@/app/api-client/booking/useGetBookings";
import {
  STATUS_CONFIG,
  avatarColor,
  formatDate,
  formatDateTime,
} from "./bookingConfig";

const DrawerField = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
    <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
      <Icon className="size-3.5" />
      {label}
    </div>
    <p className="mt-1.5 text-sm leading-relaxed font-medium text-gray-800">
      {value}
    </p>
  </div>
);

const BookingDrawer = ({
  booking,
  onClose,
}: {
  booking: ParsedBooking | null;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {booking && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        />
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 260 }}
          className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <div
                className={`flex size-11 items-center justify-center rounded-2xl text-sm font-bold text-white ${avatarColor(booking.id)}`}
              >
                {booking.firstName[0]}
                {booking.lastName[0]}
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {booking.firstName} {booking.lastName}
                </p>
                <p className="text-xs text-gray-400">{booking.phone}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <IoCloseOutline className="size-5" />
            </button>
          </div>

          {/* Status */}
          <div className="border-b border-gray-100 px-6 py-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_CONFIG[booking.status].color}`}
            >
              <span
                className={`size-1.5 rounded-full ${STATUS_CONFIG[booking.status].dot}`}
              />
              {STATUS_CONFIG[booking.status].label}
            </span>
          </div>

          {/* Fields */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <p className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
              Booking Details
            </p>
            <div className="flex flex-col gap-3">
              <DrawerField
                icon={IoPersonOutline}
                label="Full Name"
                value={`${booking.firstName} ${booking.lastName}`}
              />
              <DrawerField
                icon={IoCallOutline}
                label="Phone"
                value={booking.phone}
              />
              {booking.serviceName && (
                <DrawerField
                  icon={IoBriefcaseOutline}
                  label="Service"
                  value={booking.serviceName}
                />
              )}
              {booking.appointmentDate && (
                <DrawerField
                  icon={IoCalendarOutline}
                  label="Appointment Date"
                  value={formatDate(booking.appointmentDate)}
                />
              )}
              {booking.message && (
                <DrawerField
                  icon={IoChatbubbleOutline}
                  label="Message"
                  value={booking.message}
                />
              )}
              <DrawerField
                icon={IoTimeOutline}
                label="Submitted At"
                value={formatDateTime(booking.createdAt)}
              />
            </div>
          </div>

          <div className="border-t border-gray-100 px-6 py-4">
            <p className="text-[10px] text-gray-300">
              Booking ID: {booking.id}
            </p>
          </div>
        </motion.aside>
      </>
    )}
  </AnimatePresence>
);

export default BookingDrawer;
