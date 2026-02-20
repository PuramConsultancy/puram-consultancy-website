import { useApi } from "@/app/providers/ApiProvider";
import { useCreateMutation } from "../apiFactory";
import { LoginInput } from "@/app/api/auth/types";
import { User } from "@prisma/client";

export const useLogin = ({
  invalidateQueryKey,
}: {
  invalidateQueryKey?: unknown[];
}) => {
  const { jsonApiClient } = useApi();

  return useCreateMutation<
    Record<string, any>,
    LoginInput,
    { data: { user: User; token: string } },
    { data: { user: User; token: string } }
  >({
    apiClient: jsonApiClient,
    method: "post",
    url: "/auth/login",
    errorMessage: "Failed to login.",
    invalidateQueryKey,
    mutationOptions: {},
  });
};
