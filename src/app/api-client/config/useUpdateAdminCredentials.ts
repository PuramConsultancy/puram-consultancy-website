import { useApi } from "@/app/providers/ApiProvider";
import { useMutation } from "@tanstack/react-query";

export interface UpdateCredentialsInput {
  email?: string;
  currentPassword: string;
  newPassword?: string;
}

export const useUpdateAdminCredentials = () => {
  const { jsonApiClient } = useApi();
  return useMutation({
    mutationFn: async (input: UpdateCredentialsInput) => {
      const res = await jsonApiClient.patch("/api/auth/update", input);
      return res.data;
    },
  });
};
