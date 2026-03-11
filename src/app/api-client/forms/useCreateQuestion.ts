import { useCreateMutation } from "../apiFactory";
import { useApi } from "@/app/providers/ApiProvider";
import { Question } from "@prisma/client";

export const useCreateQuestion = ({
  invalidateQueryKey,
}: {
  invalidateQueryKey?: unknown[];
}) => {
  const { jsonApiClient } = useApi();

  return useCreateMutation<
    { id: string; sectionId: string },
    {
      label: string;
      type: string;
      required: boolean;
      order: number;
      options?: { label: string; value: string }[];
    },
    { success: boolean; data: Question },
    { success: boolean; data: Question }
  >({
    apiClient: jsonApiClient,
    method: "post",
    url: "/api/forms/${id}/sections/${sectionId}/questions",
    errorMessage: "Failed to create question.",
    invalidateQueryKey,
  });
};