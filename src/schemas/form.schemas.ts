import { z } from "zod";

export const CreateQuestionSchema = z.object({
  label: z.string().min(1, "Question label is required"),
  type: z.enum([
    "TEXT",
    "TEXTAREA",
    "EMAIL",
    "PHONE",
    "PHONE_INTERNATIONAL",
    "NUMBER",
    "MULTIPLE_CHOICE",
    "CHECKBOX",
    "DROPDOWN",
    "DATE",
    "FILE",
  ]),
  required: z.boolean().default(false),
  order: z.number().default(0),
  options: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
  validationRules: z.record(z.string(), z.any()).optional(),
  visibilityRules: z.record(z.string(), z.any()).optional(),
});

export const CreateSectionSchema = z.object({
  title: z.string().default(""),
  order: z.number().default(0),
});

export const CreateFormSchema = z.object({
  title: z.string().min(1, "Form title required"),
  description: z.string().optional(),
  sections: z.array(CreateSectionSchema).optional(),
});

export const CreateFormApiSchema = CreateFormSchema.extend({
  createdBy: z.string().min(1, "Creator ID is required"),
});

export const SubmitFormSchema = z.object({
  userId: z.string().optional(),
  data: z.record(z.string(), z.any()),
});

export type CreateFormInput = z.infer<typeof CreateFormSchema>;
export type CreateFormApiInput = z.infer<typeof CreateFormApiSchema>;
