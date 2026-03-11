import { CreateFormSchema } from "@/schemas/form.schemas";
import z from "zod";

export type CreateFormInput = z.infer<typeof CreateFormSchema>;
