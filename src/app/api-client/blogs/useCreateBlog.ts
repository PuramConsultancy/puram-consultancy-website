import { useApi } from "@/app/providers/ApiProvider";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../QueryClient";
import { Blog, BLOGS_QUERY_KEY } from "./useGetBlogs";
import { CreateBlogInput } from "@/schemas/blog.schema";

export const useCreateBlog = () => {
  const { jsonApiClient } = useApi();
  return useMutation({
    mutationFn: async (
      input: CreateBlogInput,
    ): Promise<{ success: boolean; data: Blog }> => {
      const res = await jsonApiClient.post("/api/blogs", input);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
    },
  });
};
