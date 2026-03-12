import { useCreateQuery } from "../apiFactory";
import { useApi } from "@/app/providers/ApiProvider";

export interface SubmissionUser {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
}

export interface Submission {
  id: string;
  formId: string;
  userId: string | null;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  user: SubmissionUser | null;
}

export interface FormQuestion {
  id: string;
  label: string;
  type: string;
}

export interface SubmissionsResponse {
  form: {
    id: string;
    title: string;
    sections: { questions: FormQuestion[] }[];
  };
  submissions: Submission[];
}

export const useGetSubmissions = (formId: string) => {
  const { jsonApiClient } = useApi();

  return useCreateQuery<{ success: boolean; data: SubmissionsResponse }>({
    apiClient: jsonApiClient,
    url: `/api/forms/${formId}/submissions`,
    queryKey: `submissions-${formId}`,
    queryOptions: { enabled: !!formId },
  });
};
