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
        "focus-within:ring-primary focus-within:ring-2 dark:focus-within:ring-white/30",
        "dark:focus-within:ring-offset-primary-dark focus-within:ring-offset-1 focus-within:ring-offset-inherit",
        "has-[input[data-invalid]]:focus-within:ring-red-700",
        className,
      )}
    >
      <input
        id={id}
        type={type}
        className={cn(
          // Base style
          "relative block w-full rounded-xl",
          "dark:bg-primary-dark-foreground border-[1.5px] border-gray-300 bg-transparent dark:border-white/10",
          "text-sm leading-6 text-gray-800 placeholder:text-gray-500 dark:text-white dark:placeholder:text-white/50",

          // ← Fixed padding — works on all browsers including iOS Safari
          "px-3.5 py-2.5",

          // ← iOS Safari fix — must use both
          "appearance-none [-webkit-appearance:none]",

          // ← iOS Safari text color fix
          "opacity-100 [-webkit-text-fill-color:inherit]",

          // States
          "focus:outline-none enabled:hover:border-gray-400 dark:enabled:hover:border-white/20",
          "data-[invalid]:border-red-700 focus:data-[invalid]:border-red-100",

          // Disabled state
          "group-data-[disabled=true]:bg-gray-100 dark:group-data-[disabled=true]:bg-white/20",
          "group-data-[disabled=true]:text-gray-400 group-data-[disabled=true]:placeholder-gray-400 dark:group-data-[disabled=true]:text-white/50",
          "group-data-[disabled=true]:border-gray-200 dark:group-data-[disabled=true]:border-white/10",
          "data-disabled:border-gray-200 data-disabled:bg-gray-100 data-disabled:text-gray-400 dark:data-disabled:border-white/10 dark:data-disabled:bg-gray-900/50 dark:data-disabled:text-white/50",

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
