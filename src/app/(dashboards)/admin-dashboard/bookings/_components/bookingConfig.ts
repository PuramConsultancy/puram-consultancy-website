import {
      IoTimeOutline,
      IoCheckmarkCircle,
      IoCloseCircle,
    } from "react-icons/io5";
    import { BookingStatus } from "@/app/api-client/booking/useGetBookings";
    
   
    export const STATUS_CONFIG: Record<
      BookingStatus,
      {
        label: string;
        color: string;
        dot: string;
        icon: React.ElementType;
      }
    > = {
      PENDING: {
        label: "Pending",
        color: "bg-amber-50 text-amber-600",
        dot: "bg-amber-400",
        icon: IoTimeOutline,
      },
      CONFIRMED: {
        label: "Confirmed",
        color: "bg-emerald-50 text-emerald-600",
        dot: "bg-emerald-500",
        icon: IoCheckmarkCircle,
      },
      COMPLETED: {
        label: "Completed",
        color: "bg-sky-50 text-sky-600",
        dot: "bg-sky-500",
        icon: IoCheckmarkCircle,
      },
      CANCELLED: {
        label: "Cancelled",
        color: "bg-rose-50 text-rose-500",
        dot: "bg-rose-400",
        icon: IoCloseCircle,
      },
    };

    export const ALL_STATUSES: BookingStatus[] = [
      "PENDING",
      "CONFIRMED",
      "COMPLETED",
      "CANCELLED",
    ];
    
    export const AVATAR_COLORS = [
      "bg-violet-500",
      "bg-sky-500",
      "bg-emerald-500",
      "bg-rose-500",
      "bg-amber-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-teal-500",
    ];
    
    export const avatarColor = (id: string) =>
      AVATAR_COLORS[
        id.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_COLORS.length
      ];
    
    export const formatDate = (iso: string) =>
      new Date(iso).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    
    export const formatDateTime = (iso: string) =>
      new Date(iso).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });