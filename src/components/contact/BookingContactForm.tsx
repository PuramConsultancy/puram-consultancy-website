"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type BookingFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  message: string;
};

const BookingContactForm = () => {
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<BookingFormValues>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: BookingFormValues) => {
    setSubmitMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      reset();
      setSubmitMessage({
        type: "success",
        text: "Booking request submitted. We will contact you shortly.",
      });
      return values;
    } catch {
      setSubmitMessage({
        type: "error",
        text: "Something went wrong while submitting. Please try again.",
      });
      return null;
    }
  };

  return (
    <form
      id="booking-form"
      noValidate
      className="space-y-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="mb-1 block text-sm font-semibold text-(--color-primary)"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition-colors duration-200 outline-none focus:border-(--color-secondary)"
            placeholder="Enter first name"
            {...register("firstName", {
              required: "First name is required.",
            })}
          />
          {errors.firstName ? (
            <p className="mt-1 text-sm text-red-600">
              {errors.firstName.message}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="mb-1 block text-sm font-semibold text-(--color-primary)"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition-colors duration-200 outline-none focus:border-(--color-secondary)"
            placeholder="Enter last name"
            {...register("lastName", {
              required: "Last name is required.",
            })}
          />
          {errors.lastName ? (
            <p className="mt-1 text-sm text-red-600">
              {errors.lastName.message}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-1 block text-sm font-semibold text-(--color-primary)"
        >
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition-colors duration-200 outline-none focus:border-(--color-secondary)"
          placeholder="Enter phone number"
          {...register("phone", {
            required: "Phone number is required.",
            pattern: {
              value: /^[0-9]+$/,
              message: "Phone number must contain numbers only.",
            },
          })}
          onInput={(event) => {
            const target = event.currentTarget;
            target.value = target.value.replace(/\D+/g, "");
          }}
        />
        {errors.phone ? (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-semibold text-(--color-primary)"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition-colors duration-200 outline-none focus:border-(--color-secondary)"
          placeholder="Tell us about your booking inquiry"
          {...register("message", {
            required: "Message is required.",
          })}
        />
        {errors.message ? (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="inline-flex h-11 items-center justify-center rounded-xl bg-(--color-secondary) px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-(--color-secondary-500) disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Submit Booking Request"}
      </button>

      {submitMessage ? (
        <p
          className={`text-sm ${
            submitMessage.type === "success"
              ? "text-emerald-700"
              : "text-red-600"
          }`}
        >
          {submitMessage.text}
        </p>
      ) : null}
    </form>
  );
};

export default BookingContactForm;
