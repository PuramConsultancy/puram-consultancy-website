import { useApi } from "@/app/providers/ApiProvider";
import { useQuery } from "@tanstack/react-query";
import { Blog } from "./useGetBlogs";

export const useGetBlogBySlug = (slug: string) => {
  const { jsonApiClient } = useApi();
  return useQuery({
    queryKey: ["blogs", slug],
    queryFn: async (): Promise<{ success: boolean; data: Blog }> => {
      const res = await jsonApiClient.get(`/api/blogs/${slug}`);
      return res.data;
    },
    enabled: !!slug,
  });
};
