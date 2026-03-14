import { useApi } from "@/app/providers/ApiProvider";
import { useMutation } from "@tanstack/react-query";
import { useAuthActions } from "@/store/authStore";
import { User } from "@prisma/client";
import Cookie from "js-cookie";
import cookieKeys from "@/app/config/cookieKeys";

export interface UpdateCredentialsInput {
  email?: string;
  currentPassword: string;
  newPassword?: string;
}

export const useUpdateAdminCredentials = () => {
  const { jsonApiClient } = useApi();
  const { setUser } = useAuthActions();

  return useMutation({
    mutationFn: async (input: UpdateCredentialsInput) => {
      const res = await jsonApiClient.patch("/api/auth/update", input);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("AUTH UPDATE RESPONSE:", data);

      const updatedUser: User | null = data?.data?.user ?? null;

      if (!updatedUser) {
        console.warn("No user in response — Topbar will not update");
        return;
      }

      // Update Zustand store → Topbar re-renders immediately
      setUser(updatedUser);

      // Update cookie → email persists after page refresh
      Cookie.set(cookieKeys.USER, JSON.stringify(updatedUser), {
        expires: 7,
      });

      console.log("User updated in store and cookie:", updatedUser.email);
    },
    onError: (error) => {
      console.error("AUTH UPDATE FAILED:", error);
    },
  });
};
