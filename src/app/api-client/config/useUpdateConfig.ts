import { useApi } from "@/app/providers/ApiProvider";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../QueryClient";
import { SiteConfig, CONFIG_QUERY_KEY } from "./useGetConfig";

export const useUpdateConfig = () => {
  const { jsonApiClient } = useApi();
  return useMutation({
    mutationFn: async (
      input: Partial<SiteConfig>,
    ): Promise<{ success: boolean; data: SiteConfig }> => {
      const res = await jsonApiClient.patch("/api/config", input);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(CONFIG_QUERY_KEY, data);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CONFIG_QUERY_KEY });
    },
  });
};
