"use client";

import { cn } from "@/utilities/cn";
import { ComponentProps } from "react";
import { useFieldContext } from "./Field";

interface IInput extends ComponentProps<"input"> {
  as?: "input" | "textarea";
  inputClass?: string;
}

const Input = ({
  className,
  inputClass,
  disabled,
  type = "text",
  ...rest
}: IInput) => {
  const { id, form, disabled: rootDisabled, name } = useFieldContext();
  const hasError = name && !!form.formState.errors[name];

  return (
    <span
      data-slot="control"
      className={cn(
        "relative block rounded-xl",
        "transition-all duration-150",
        "focus-within:ring-2 focus-within:ring-blue-500/20",
        "has-[input[data-invalid]]:focus-within:ring-red-700",
        className,
      )}
    >
      <input
        id={id}
        type={type}
        style={{
          // ← Inline styles for iOS Safari — Tailwind arbitrary values
          // don't always compile correctly on WebKit
          WebkitAppearance: "none",
          WebkitTextFillColor: "inherit",
          opacity: 1,
          // ← Critical: bg-transparent breaks on iOS, use white instead
          backgroundColor: "white",
        }}
        className={cn(
          // Base
          "relative block w-full rounded-xl",
          "border-[1.5px] border-gray-300",
          "text-sm leading-6 text-gray-800 placeholder:text-gray-500",

          // Padding
          "px-3.5 py-2.5",

          // Focus
          "focus:outline-none",
          "enabled:hover:border-gray-400",

          // Invalid
          "data-[invalid]:border-red-700",

          // Disabled
          "disabled:bg-gray-100 disabled:text-gray-400",
          "disabled:border-gray-200 disabled:placeholder:text-gray-400",
          "group-data-[disabled=true]:bg-gray-100",
          "group-data-[disabled=true]:text-gray-400",
          "group-data-[disabled=true]:border-gray-200",

          // Transitions
          "transition-all duration-150",

          inputClass,
        )}
        disabled={form.formState.isSubmitting || disabled || rootDisabled}
        data-invalid={hasError || undefined}
        {...rest}
      />
    </span>
  );
};

export default Input;
