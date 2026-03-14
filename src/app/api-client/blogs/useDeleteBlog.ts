import { useApi } from "@/app/providers/ApiProvider";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../QueryClient";
import { Blog, BLOGS_QUERY_KEY } from "./useGetBlogs";

export const useDeleteBlog = ({ id }: { id: string }) => {
  const { jsonApiClient } = useApi();
  return useMutation({
    mutationFn: async (): Promise<{ success: boolean }> => {
      const res = await jsonApiClient.delete(`/api/blogs/${id}`);
      return res.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: BLOGS_QUERY_KEY });
      const previous = queryClient.getQueryData<{
        success: boolean;
        data: Blog[];
      }>(BLOGS_QUERY_KEY);
      queryClient.setQueryData<{ success: boolean; data: Blog[] }>(
        BLOGS_QUERY_KEY,
        (old) => {
          if (!old) return old;
          return { ...old, data: old.data.filter((b) => b.id !== id) };
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
