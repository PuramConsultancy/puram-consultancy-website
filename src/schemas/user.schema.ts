import { z } from "zod";

const RegisterUserSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long" })
      .max(50, { message: "First name cannot exceed 50 characters" })
      .trim()
      .regex(/^[a-zA-Z\s-]+$/, {
        message: "First name can only contain letters, spaces, and hyphens",
      }),

    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long" })
      .max(50, { message: "Last name cannot exceed 50 characters" })
      .trim()
      .regex(/^[a-zA-Z\s-]+$/, {
        message: "Last name can only contain letters, spaces, and hyphens",
      }),

    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email format" })
      .max(255, { message: "Email cannot exceed 255 characters" })
      .trim()
      .toLowerCase(),

    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(100, { message: "Password cannot exceed 100 characters" })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((val) => /[a-z]/.test(val), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((val) => /\d/.test(val), {
        message: "Password must contain at least one number",
      })
      .refine((val) => /[!@#$%^&*]/.test(val), {
        message:
          "Password must contain at least one special character (!@#$%^&*)",
      })
      .refine((val) => /^[A-Za-z\d!@#$%^&*]+$/.test(val), {
        message:
          "Password can only contain letters, numbers, and special characters (!@#$%^&*)",
      }),

    confirmPassword: z.string({
      message: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  export { RegisterUserSchema };
