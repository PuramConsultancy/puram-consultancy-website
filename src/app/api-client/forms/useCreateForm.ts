import { CreateFormInput } from "@/app/api/forms/types";
import { useCreateMutation } from "../apiFactory";
import { useApi } from "@/app/providers/ApiProvider";
import { Form } from "@prisma/client";


export const useCreateForm = ({
  invalidateQueryKey,
}: {
  invalidateQueryKey?: unknown[];
}) => {
  const { jsonApiClient } = useApi();

  return useCreateMutation<
    Record<string, any>,
    CreateFormInput,
    {
      success: boolean;
      data: Form;
      message: string;
    },
    {
      success: boolean;
      data: Form;
      message: string;
    }
  >({
    apiClient: jsonApiClient,
    method: "post",
    url: "/api/forms",
    errorMessage: "Failed to create form.",
    invalidateQueryKey,
    mutationOptions: {},
  });
};
