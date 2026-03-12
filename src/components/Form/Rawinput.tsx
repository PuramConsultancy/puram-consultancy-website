"use client";

import { cn } from "@/utilities/cn";
import { ComponentProps } from "react";

interface IRawInput extends ComponentProps<"input"> {
  inputClass?: string;
  hasError?: boolean;
}

/**
 * Same visual styles as Input, but requires NO FieldContext / FormContext.
 * Use this anywhere outside a <Form> + <Field> tree (e.g. DynamicForm).
 */
const RawInput = ({
  className,
  inputClass,
  disabled,
  type = "text",
  hasError = false,
  ...rest
}: IRawInput) => {
  return (
    <span
      data-slot="control"
      className={cn(
        "relative block rounded-xl",
        "transition-all duration-150",
        "focus-within:ring-primary focus-within:ring-2 focus-within:ring-offset-1",
        "has-[input[data-invalid]]:focus-within:ring-red-700",
        className,
      )}
    >
      <input
        type={type}
        disabled={disabled}
        data-invalid={hasError || undefined}
        className={cn(
          "relative block w-full appearance-none rounded-xl",
          "dark:bg-primary-dark-foreground border-[1.5px] border-gray-300 bg-transparent dark:border-white/10",
          "text-sm/6 text-gray-800 placeholder:text-gray-500 dark:text-white dark:placeholder:text-white/50",
          "px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)]",
          "focus:outline-hidden enabled:hover:border-gray-400 dark:enabled:hover:border-white/20",
          "data-invalid:border-red-700 focus:data-invalid:border-red-100",
          "transition-all duration-150",
          inputClass,
        )}
        {...rest}
      />
    </span>
  );
};

export default RawInput;
