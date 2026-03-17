import { useApi } from "@/app/providers/ApiProvider";
import { useQuery } from "@tanstack/react-query";
import { ProjectType } from "@prisma/client";

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  budget: string;
  description: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  PRODUCT_LAUNCH: "Product Launch",
  INVESTMENT_NEW_COMPANY: "Investment Opportunity — New Company",
  INVESTMENT_OLD_COMPANY: "Investment Opportunity — Old Company",
  BUYING_PRODUCTS: "Buying Products",
};

export const useGetProjects = (admin = false) => {
  const { jsonApiClient } = useApi();
  return useQuery<Project[]>({
    queryKey: ["projects", { admin }],
    queryFn: async () => {
      const res = await jsonApiClient.get("/api/projects", {
        params: admin ? { admin: "true" } : {},
      });
      return res.data.data;
    },
  });
};
