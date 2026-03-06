import { BookingContactSchema } from "@/schemas/contact.schema";
import { LoginUserSchema, RegisterUserSchema } from "@/schemas/user.schema";
import { z } from "zod";

export type RegisterInput = z.infer<typeof RegisterUserSchema>;
export type LoginInput =  z.infer<typeof LoginUserSchema>;
export type BookingContactFormValues = z.infer<typeof BookingContactSchema>;
export type BookingInput = z.infer<typeof BookingContactSchema>
