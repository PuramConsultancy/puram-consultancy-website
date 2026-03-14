import { z } from "zod";

export const CreateBlogSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" })
    .max(200, { message: "Title cannot exceed 200 characters" })
    .trim(),

  content: z
    .string({ message: "Content is required" })
    .min(10, { message: "Content must be at least 10 characters" })
    .trim(),

  published: z.boolean().default(false),
});

export const UpdateBlogSchema = CreateBlogSchema.partial();

export type CreateBlogInput = z.infer<typeof CreateBlogSchema>;
export type UpdateBlogInput = z.infer<typeof UpdateBlogSchema>;