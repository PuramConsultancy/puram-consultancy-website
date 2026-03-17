// app/api-client/projects/useInquiries.ts
import { useApi } from "@/app/providers/ApiProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface ProjectInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  projectId: string;
  seenAt: string | null;
  createdAt: string;
}

export interface InquiryCounts {
  [projectId: string]: {
    unseen: number;
    total: number;
  };
}

// ── Fetch all inquiries for one project ───────────────────────────────────────
export const useGetProjectInquiries = (projectId: string, enabled = false) => {
  const { jsonApiClient } = useApi();
  return useQuery<ProjectInquiry[]>({
    queryKey: ["inquiries", projectId],
    queryFn: async () => {
      const res = await jsonApiClient.get(
        `/api/projects/${projectId}/inquiries`,
      );
      return res.data.data;
    },
    enabled, // only fetch when the drawer is opened
  });
};

// ── Fetch unseen + total counts for ALL projects (badge numbers) ──────────────
export const useInquiryCounts = () => {
  const { jsonApiClient } = useApi();
  return useQuery<InquiryCounts>({
    queryKey: ["inquiry-counts"],
    queryFn: async () => {
      const res = await jsonApiClient.get("/api/projects/inquiry-counts");
      return res.data.data;
    },
    refetchInterval: 30_000, // poll every 30s for new notifications
  });
};

// ── Mark all inquiries of a project as seen ───────────────────────────────────
export const useMarkInquiriesSeen = (projectId: string) => {
  const { jsonApiClient } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await jsonApiClient.patch(`/api/projects/${projectId}/inquiries/seen`);
    },
    onSuccess: () => {
      // Refresh both the counts badge and the inquiries list
      queryClient.invalidateQueries({ queryKey: ["inquiry-counts"] });
      queryClient.invalidateQueries({ queryKey: ["inquiries", projectId] });
    },
  });
};
