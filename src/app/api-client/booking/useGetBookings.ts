// app/api-client/booking/useGetBookings.ts

import { useApi } from "@/app/providers/ApiProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "../QueryClient";

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface Booking {
  id: string;
  notes: string | null;
  appointmentDate: string | null;
  status: BookingStatus;
  notificationSent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ParsedBooking extends Omit<Booking, "notes"> {
  firstName: string;
  lastName: string;
  phone: string;
  message: string | null;
  serviceName: string | null;
}

export const parseBooking = (b: Booking): ParsedBooking => {
  let notes: Record<string, string> = {};
  try {
    notes = JSON.parse(b.notes ?? "{}");
  } catch {}
  return {
    ...b,
    firstName: notes.firstName ?? "",
    lastName: notes.lastName ?? "",
    phone: notes.phone ?? "",
    message: notes.message ?? null,
    serviceName: notes.serviceName ?? null,
  };
};

// ── Single shared key — all three hooks use this exact reference ──────────────
const QUERY_KEY = ["bookings"];

export const useGetBookings = () => {
  const { jsonApiClient } = useApi();
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async (): Promise<{ success: boolean; data: Booking[] }> => {
      const res = await jsonApiClient.get("/api/booking");
      return res.data;
    },
  });
};

export const useUpdateBookingStatus = ({ id }: { id: string }) => {
  const { jsonApiClient } = useApi();
  return useMutation({
    mutationFn: async (status: BookingStatus) => {
      const res = await jsonApiClient.patch(`/api/booking/${id}`, { status });
      return res.data;
    },
    onMutate: async (status) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });
      const previous = queryClient.getQueryData<{
        success: boolean;
        data: Booking[];
      }>(QUERY_KEY);
      queryClient.setQueryData<{ success: boolean; data: Booking[] }>(
        QUERY_KEY,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.map((b) => (b.id === id ? { ...b, status } : b)),
          };
        },
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(QUERY_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};

export const useDeleteBooking = ({ id }: { id: string }) => {
  const { jsonApiClient } = useApi();
  return useMutation({
    mutationFn: async () => {
      const res = await jsonApiClient.delete(`/api/booking/${id}`);
      return res.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });
      const previous = queryClient.getQueryData<{
        success: boolean;
        data: Booking[];
      }>(QUERY_KEY);
      queryClient.setQueryData<{ success: boolean; data: Booking[] }>(
        QUERY_KEY,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.filter((b) => b.id !== id),
          };
        },
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(QUERY_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};
