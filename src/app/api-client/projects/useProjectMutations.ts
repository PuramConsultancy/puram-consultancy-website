import { useApi } from "@/app/providers/ApiProvider";
import { useCreateMutation } from "../apiFactory";
import {
  CreateProjectInput,
  UpdateProjectInput,
  ProjectInquiryInput,
} from "@/schemas/project.schema";
import { Project } from "./useGetProjects";

// ── Create Project ──────────────────────────────────────────────────────────
export const useCreateProject = () => {
  const { jsonApiClient } = useApi();
  return useCreateMutation<
    Record<string, any>,
    CreateProjectInput,
    { success: boolean; data: Project }
  >({
    apiClient: jsonApiClient,
    method: "post",
    url: "/api/projects",
    errorMessage: "Failed to create project.",
    invalidateQueryKey: ["projects", { admin: true }],
  });
};

// ── Update Project ──────────────────────────────────────────────────────────
export const useUpdateProject = (id: string) => {
  const { jsonApiClient } = useApi();
  return useCreateMutation<
    Record<string, any>,
    UpdateProjectInput,
    { success: boolean; data: Project }
  >({
    apiClient: jsonApiClient,
    method: "patch",
    url: `/api/projects/${id}`,
    errorMessage: "Failed to update project.",
    invalidateQueryKey: ["projects", { admin: true }],
  });
};

// ── Delete Project ──────────────────────────────────────────────────────────
// The apiFactory replaces ${id} at call-time using params.id.
// URL must be a plain string so the placeholder reaches the factory intact.
export const useDeleteProject = () => {
  const { jsonApiClient } = useApi();
  return useCreateMutation<{ id: string }, undefined, { success: boolean }>({
    apiClient: jsonApiClient,
    method: "delete",
    // eslint-disable-next-line no-template-curly-in-string
    url: "/api/projects/${id}",
    errorMessage: "Failed to delete project.",
    invalidateQueryKey: ["projects", { admin: true }],
  });
};

// ── Submit Inquiry ──────────────────────────────────────────────────────────
export const useSubmitInquiry = (projectId: string) => {
  const { jsonApiClient } = useApi();
  return useCreateMutation<
    Record<string, any>,
    ProjectInquiryInput,
    { success: boolean }
  >({
    apiClient: jsonApiClient,
    method: "post",
    url: `/api/projects/${projectId}/inquiries`,
    errorMessage: "Failed to submit inquiry.",
  });
};
