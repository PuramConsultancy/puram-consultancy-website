// src/app/api-client/forms/useGetAllSubmissions.ts

import { useCreateQuery } from "../apiFactory";
import { useApi } from "@/app/providers/ApiProvider";
import type { Submission, FormQuestion } from "./useGetSubmissions";

export interface FormWithSubmissions {
  id: string;
  title: string;
  description?: string | null;
  createdAt: string;
  sections: { questions: FormQuestion[] }[];
  submissions: Submission[];
}

export const useGetAllSubmissions = () => {
  const { jsonApiClient } = useApi();

  return useCreateQuery<{ success: boolean; data: FormWithSubmissions[] }>({
    apiClient: jsonApiClient,
    url: `/api/forms/submissions`,
    queryKey: "all-submissions",
  });
};
