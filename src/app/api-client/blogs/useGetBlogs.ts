import { useApi } from "@/app/providers/ApiProvider";
import { useQuery } from "@tanstack/react-query";

export interface Blog {
  id: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export const BLOGS_QUERY_KEY = ["blogs"];

export const useGetBlogs = () => {
  const { jsonApiClient } = useApi();
  return useQuery({
    queryKey: BLOGS_QUERY_KEY,
    queryFn: async (): Promise<{ success: boolean; data: Blog[] }> => {
      const res = await jsonApiClient.get("/api/blogs");
      return res.data;
    },
  });
};
