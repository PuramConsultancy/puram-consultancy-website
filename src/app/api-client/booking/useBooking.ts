import { BookingInput } from "@/app/api/auth/types";
import { useCreateMutation } from "../apiFactory";
import { useApi } from "@/app/providers/ApiProvider";
import { Booking } from "@prisma/client";

export interface ContactBookingResponse {
  success: boolean;
  message: string;
  data: {
    submission: any;
    booking: any | null;
  };
}


export const useContactBooking = ({
  invalidateQueryKey,
}: {
  invalidateQueryKey?: unknown[];
}) => {
  const { jsonApiClient } = useApi();

  return useCreateMutation<
    Record<string, any>,
    BookingInput,
   ContactBookingResponse,
   ContactBookingResponse
  >({
    apiClient: jsonApiClient,
    method: "post",
    url: "/api/booking",
    errorMessage: "Failed to submit contact request",
    invalidateQueryKey,
    mutationOptions: {},
  });
};
