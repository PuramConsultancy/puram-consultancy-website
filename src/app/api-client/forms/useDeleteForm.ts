import { useCreateMutation } from "../apiFactory";
import { useApi } from "@/app/providers/ApiProvider";
import { Form } from "@prisma/client";

export const useDeleteForm = ({
  invalidateQueryKey,
}: {
  invalidateQueryKey?: unknown[];
}) => {
  const { jsonApiClient } = useApi();

  return useCreateMutation<
    { id: string },
    undefined,
    { success: boolean; message: string },
    { success: boolean; data: Form[] }
  >({
    apiClient: jsonApiClient,
    method: "delete",
    url: "/api/forms/${id}",
    errorMessage: "Failed to delete form.",
    // ✅ Must match the queryKey array that useGetForms registers: ["forms"]
    invalidateQueryKey: invalidateQueryKey ?? ["forms"],
  });
};
