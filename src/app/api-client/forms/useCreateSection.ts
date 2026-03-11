import { useCreateMutation } from "../apiFactory";
import { useApi } from "@/app/providers/ApiProvider";
import { FormSection } from "@prisma/client";

export const useCreateSection = ({
  invalidateQueryKey,
}: {
  invalidateQueryKey?: unknown[];
}) => {
  const { jsonApiClient } = useApi();

  return useCreateMutation<
    { id: string },
    { title: string; order: number },
    { success: boolean; data: FormSection },
    { success: boolean; data: FormSection }
  >({
    apiClient: jsonApiClient,
    method: "post",
    url: "/api/forms/${id}/sections",
    errorMessage: "Failed to create section.",
    invalidateQueryKey,
  });
};