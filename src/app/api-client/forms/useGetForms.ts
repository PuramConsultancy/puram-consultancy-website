import { useCreateQuery } from "../apiFactory";
import { useApi } from "@/app/providers/ApiProvider";
import { Form } from "@prisma/client";

export const useGetForms = () => {
  const { jsonApiClient } = useApi();

  return useCreateQuery<{ success: boolean; data: Form[] }>({
    apiClient: jsonApiClient,
    url: "/api/forms",
    queryKey: "forms",
  });
};
