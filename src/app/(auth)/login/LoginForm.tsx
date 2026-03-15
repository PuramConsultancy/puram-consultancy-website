"use client";

import { useLogin } from "@/app/api-client/login/useLogin";
import cookieKeys from "@/app/config/cookieKeys";
import Button from "@/components/Button";
import ErrorMessage from "@/components/Form/ErrorMessage";
import Field from "@/components/Form/Field";
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import InputGroup from "@/components/Form/InputGroup";
import { LoginUserSchema } from "@/schemas/user.schema";
import { useAuthActions } from "@/store/authStore";
import { AxiosError } from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { IoLockClosed, IoMail } from "react-icons/io5";

const parseLoginError = (error: unknown): string => {
  const err = error as AxiosError;
  const status = err?.response?.status;
  const data = err?.response?.data as any;

  // Wrong email or password
  if (status === 401) return "Invalid email or password.";

  // Server returned a structured error message
  if (data?.error?.message) return data.error.message;

  // Fallback
  return "Something went wrong. Please try again.";
};

const LoginForm = () => {
  const router = useRouter();
  const { mutateAsync: login } = useLogin({});
  const { setUser, setAuthToken } = useAuthActions();

  return (
    <Form
      validationSchema={LoginUserSchema}
      className="space-y-1"
      onSubmit={async (values, methods) => {
        try {
          const {
            data: { user, token },
          } = await login({ body: values });

          Cookie.set(cookieKeys.USER_TOKEN, token);
          Cookie.set(cookieKeys.USER, JSON.stringify(user));

          setAuthToken(token);
          setUser(user);

          if (user.role === "ADMIN") {
            router.push("/admin-dashboard");
          } else {
            router.push("/");
          }
        } catch (error) {
          const message = parseLoginError(error);
          methods.setError("root", { message });
        }
      }}
    >
      {({ register, formState: { errors, isSubmitting } }) => (
        <>
          <Field>
            <InputGroup>
              <IoMail data-slot="icon" />
              <Input
                placeholder="Enter your email"
                data-invalid={errors.email?.message}
                {...register("email")}
              />
            </InputGroup>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </Field>

          <Field>
            <InputGroup>
              <IoLockClosed data-slot="icon" />
              <Input
                type="password"
                placeholder="Enter your password"
                data-invalid={errors.password?.message}
                {...register("password")}
              />
            </InputGroup>
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </Field>

          {/* Root error — shown for wrong credentials */}
          {errors.root?.message && (
            <div className="flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-2.5 text-xs font-medium text-rose-600">
              <span>⚠</span>
              {errors.root.message}
            </div>
          )}

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Login
          </Button>
        </>
      )}
    </Form>
  );
};

export default LoginForm;
