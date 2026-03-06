import { z } from "zod";

export const BookingContactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),

  lastName: z.string().min(1, "Last name is required"),

  phone: z.string().regex(/^[0-9]+$/, "Phone must contain numbers only"),

  message: z.string().min(1, "Message is required"),

  serviceName: z.string().optional(),

  appointmentDate: z.string().optional(),
});


