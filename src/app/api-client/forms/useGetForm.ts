import { useCreateQuery } from "../apiFactory";
import { useApi } from "@/app/providers/ApiProvider";

// ✅ Define response shape manually — don't use raw Prisma types
interface FormOption {
  id: string;
  label: string;
  value: string;
}

interface FormQuestion {
  id: string;
  label: string;
  type: string;
  required: boolean;
  order: number;
  sectionId: string;
  validationRules: unknown;
  visibilityRules: unknown;
  createdAt: string;
  updatedAt: string;
  options: FormOption[]; // ✅ options included
}

interface FormSection {
  id: string;
  title: string;
  order: number;
  formId: string;
  questions: FormQuestion[];
}

interface FormResponse {
  id: string;
  title: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  sections: FormSection[];
}

export const useGetForm = (formId: string) => {
  const { jsonApiClient } = useApi();

  return useCreateQuery<{ success: boolean; data: FormResponse }>({
    // ✅ uses FormResponse not Prisma type
    apiClient: jsonApiClient,
    url: `/api/forms/${formId}`,
    queryKey: `form-${formId}`,
    queryOptions: {
      enabled: !!formId,
    },
  });
};
