import { z } from "zod";

export const ProjectTypeEnum = z.enum([
  "PRODUCT_LAUNCH",
  "INVESTMENT_NEW_COMPANY",
  "INVESTMENT_OLD_COMPANY",
  "BUYING_PRODUCTS",
]);

export const CreateProjectSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(120),
  type: ProjectTypeEnum,
  budget: z.string().min(1, "Budget is required").max(80),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000),
  published: z.boolean().optional().default(false),
});

export const UpdateProjectSchema = CreateProjectSchema.partial().extend({
  published: z.boolean().optional(),
});

export const ProjectInquirySchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number is required")
    .max(20)
    .regex(/^[+\d\s\-().]+$/, "Invalid phone number"),
});

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
export type ProjectInquiryInput = z.infer<typeof ProjectInquirySchema>;
