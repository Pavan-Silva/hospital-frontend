import { z } from "zod";

export const appointmentFormSchema = z.object({
  patientId: z.string().min(3, {
    message: "Must be at least 3 characters.",
  }),

  doctor: z.string(),
  date: z.string(),
});
