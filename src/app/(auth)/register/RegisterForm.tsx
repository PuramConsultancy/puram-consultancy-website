"use client";

import { useRegister } from "@/app/api-client/register/useRegister";
import { CustomError } from "@/app/api/helpers/handleError";
import { AxiosError } from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@/store/authStore";
import Form from "@/components/form/Form";
import { RegisterUserSchema } from "@/schemas/user.schema";
import cookieKeys from "@/app/config/cookieKeys";
import Field from "@/components/form/Field";
import InputGroup from "@/components/form/InputGroup";
import { IoPerson, IoMail, IoLockClosed } from "react-icons/io5";
import Input from "@/components/form/Input";
import ErrorMessage from "@/components/form/ErrorMessage";
import Button from "@/components/form/Button";

const RegisterForm = () => {
  const router = useRouter();
  const { mutateAsync: register } = useRegister({});
  const { setUser, setAuthToken } = useAuthActions();

  return (
    <Form
      validationSchema={RegisterUserSchema}
      className="space-y-1"
      onSubmit={async (values, methods) => {
        try {
          const {
            data: { user, token },
          } = await register({
            body: values,
          });

          Cookie.set(cookieKeys.USER_TOKEN, token);
          Cookie.set(cookieKeys.USER, JSON.stringify(user));

          setAuthToken(token);
          setUser(user);

          router.push("/");
        } catch (error) {
          const err = error as AxiosError;
          const errObject = err.response?.data as CustomError;

          methods.setError("email", { message: errObject.error.message });
        }
      }}
    >
      {({ register, formState: { errors, isSubmitting } }) => (
        <>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Field>
              <InputGroup>
                <IoPerson data-slot="icon" />
                <Input
                  placeholder="Your first name"
                  data-invalid={errors.firstName?.message}
                  {...register("firstName")}
                />
              </InputGroup>
              <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
            </Field>

            <Field>
              <InputGroup>
                <IoPerson data-slot="icon" />
                <Input
                  placeholder="Your last name"
                  data-invalid={errors.lastName?.message}
                  {...register("lastName")}
                />
              </InputGroup>
              <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
            </Field>
          </div>

          <Field>
            <InputGroup>
              <IoMail data-slot="icon" />
              <Input
                placeholder="Your email"
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
                placeholder="Your password"
                data-invalid={errors.password?.message}
                {...register("password")}
              />
            </InputGroup>
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </Field>

          <Field>
            <InputGroup>
              <IoLockClosed data-slot="icon" />
              <Input
                type="password"
                placeholder="Confirm your password"
                data-invalid={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </InputGroup>
            <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
          </Field>

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Register
          </Button>
        </>
      )}
    </Form>
  );
};

export default RegisterForm;
