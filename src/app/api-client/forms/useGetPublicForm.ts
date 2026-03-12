import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface FormOption {
  id: string;
  label: string;
  value: string;
}

export interface FormQuestion {
  id: string;
  label: string;
  type: string;
  required: boolean;
  order: number;
  sectionId: string;
  options: FormOption[];
}

export interface FormSection {
  id: string;
  title: string;
  order: number;
  formId: string;
  questions: FormQuestion[];
}

export interface PublicFormDetail {
  id: string;
  title: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  sections: FormSection[];
}

export const useGetPublicForm = (formId: string) => {
  return useQuery({
    queryKey: ["public-form", formId],
    queryFn: async () => {
      const res = await axios.get<{
        success: boolean;
        data: PublicFormDetail;
      }>(`/api/forms/public/${formId}`);
      return res.data;
    },
    enabled: !!formId,
  });
};
