import { useApi } from "@/app/providers/ApiProvider";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../QueryClient";
import { Blog, BLOGS_QUERY_KEY } from "./useGetBlogs";
import { UpdateBlogInput } from "@/schemas/blog.schema";

export const useUpdateBlog = ({ id }: { id: string }) => {
  const { jsonApiClient } = useApi();
  return useMutation({
    mutationFn: async (
      input: UpdateBlogInput,
    ): Promise<{ success: boolean; data: Blog }> => {
      const res = await jsonApiClient.patch(`/api/blogs/${id}`, input);
      return res.data;
    },
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: BLOGS_QUERY_KEY });
      const previous = queryClient.getQueryData<{
        success: boolean;
        data: Blog[];
      }>(BLOGS_QUERY_KEY);
      queryClient.setQueryData<{ success: boolean; data: Blog[] }>(
        BLOGS_QUERY_KEY,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.map((b) => (b.id === id ? { ...b, ...input } : b)),
          };
        },
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous)
        queryClient.setQueryData(BLOGS_QUERY_KEY, context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
    },
  });
};
