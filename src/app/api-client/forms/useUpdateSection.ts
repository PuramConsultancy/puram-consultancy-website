import { useCreateMutation } from "../apiFactory";
import { useApi } from "@/app/providers/ApiProvider";
import { FormSection } from "@prisma/client";

export const useUpdateSection = ({
  invalidateQueryKey,
}: {
  invalidateQueryKey?: unknown[];
}) => {
  const { jsonApiClient } = useApi();

  return useCreateMutation<
    { id: string; sectionId: string },
    { title: string; order: number },
    { success: boolean; data: FormSection },
    { success: boolean; data: FormSection }
  >({
    apiClient: jsonApiClient,
    method: "patch",
    url: "/api/forms/${id}/sections/${sectionId}",
    errorMessage: "Failed to update section.",
    invalidateQueryKey,
  });
};