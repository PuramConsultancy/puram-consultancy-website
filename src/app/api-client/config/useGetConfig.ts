import { useApi } from "@/app/providers/ApiProvider";
import { useQuery } from "@tanstack/react-query";

export interface SiteConfig {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  linkedin: string;
}

export const CONFIG_QUERY_KEY = ["site-config"];

export const useGetConfig = () => {
  const { jsonApiClient } = useApi();
  return useQuery({
    queryKey: CONFIG_QUERY_KEY,
    queryFn: async (): Promise<{ success: boolean; data: SiteConfig }> => {
      const res = await jsonApiClient.get("/api/config");
      return res.data;
    },
  });
};
