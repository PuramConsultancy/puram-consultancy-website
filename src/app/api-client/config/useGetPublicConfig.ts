import { useApi } from "@/app/providers/ApiProvider";
import { useQuery } from "@tanstack/react-query";
import { SiteConfig } from "./useGetConfig";

export const useGetPublicConfig = () => {
  const { jsonApiClient } = useApi();
  return useQuery({
    queryKey: ["public-config"],
    queryFn: async (): Promise<{ success: boolean; data: SiteConfig }> => {
      const res = await jsonApiClient.get("/api/config");
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // cache 5 mins
  });
};
