"use client";

import Form from "@/components/Form/Form";
import Field from "@/components/Form/Field";
import InputGroup from "@/components/Form/InputGroup";
import Input from "@/components/Form/Input";
import ErrorMessage from "@/components/Form/ErrorMessage";
import Button from "@/components/Button";

import { BookingContactSchema } from "@/schemas/contact.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { IoPerson, IoCall, IoChatbox, IoCalendar } from "react-icons/io5";
import { useContactBooking } from "@/app/api-client/booking/useBooking";
import { AxiosError } from "axios";
import { CustomError } from "@/app/api/helpers/handleError";

const ContactForm = () => {
  const router = useRouter();
  const { mutateAsync: booking } = useContactBooking({});

  return (
    <Form
      validationSchema={BookingContactSchema}
      className="space-y-5"
      onSubmit={async (values, methods) => {
        try {
          await booking({
            body: values,
          });

          methods.reset();
          alert("Message sent successfully!");
          router.refresh();
        } catch (error: any) {
          const err = error as AxiosError;
          const errObject = err.response?.data as CustomError;

          methods.setError("message", { message: errObject.error.message });
        }
      }}
    >
      {({ register, formState: { errors, isSubmitting } }) => (
        <>
          {/* Name Fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <InputGroup>
                <IoPerson data-slot="icon" />
                <Input
                  placeholder="First name"
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
                  placeholder="Last name"
                  data-invalid={errors.lastName?.message}
                  {...register("lastName")}
                />
              </InputGroup>
              <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
            </Field>
          </div>

          {/* Phone */}
          <Field>
            <InputGroup>
              <IoCall data-slot="icon" />
              <Input
                placeholder="Phone number"
                data-invalid={errors.phone?.message}
                {...register("phone")}
                onInput={(event) => {
                  event.currentTarget.value = event.currentTarget.value.replace(
                    /\D/g,
                    "",
                  );
                }}
              />
            </InputGroup>
            <ErrorMessage>{errors.phone?.message}</ErrorMessage>
          </Field>

          {/* Service */}
          <Field>
            <InputGroup>
              <IoChatbox data-slot="icon" />
              <Input
                placeholder="Service you are interested in"
                {...register("serviceName")}
              />
            </InputGroup>
          </Field>

          {/* Appointment Date */}
          <Field>
            <InputGroup>
              <IoCalendar data-slot="icon" />
              <Input type="date" {...register("appointmentDate")} />
            </InputGroup>
          </Field>

          {/* Message */}
          <Field>
            <InputGroup>
              <IoChatbox data-slot="icon" />
              <Input
                placeholder="Your message"
                data-invalid={errors.message?.message}
                {...register("message")}
              />{" "}
            </InputGroup>{" "}
            <ErrorMessage>{errors.message?.message}</ErrorMessage>{" "}
          </Field>
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full"
            variant="secondary"
          >
            Send Message
          </Button>
        </>
      )}
    </Form>
  );
};

export default ContactForm;
