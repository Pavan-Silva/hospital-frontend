import { z } from "zod";

export const patientFormSchema = z.object({
  firstName: z.string().min(3, {
    message: "Must be at least 3 characters.",
  }),

  lastName: z.string().min(3, {
    message: "Must be at least 3 characters.",
  }),

  phone: z.string().regex(new RegExp(/^[0-9]{10}$/), {
    message: "number is invalid.",
  }),

  nic: z
    .string()
    .regex(
      new RegExp(
        /^(([5,6,7,8,9]{1})([0-9]{1})([0,1,2,3,5,6,7,8]{1})([0-9]{6})([v|V|x|X]))|(([1,2]{1})([0,9]{1})([0-9]{2})([0,1,2,3,5,6,7,8]{1})([0-9]{7}))/gm
      ),
      {
        message: "is invalid.",
      }
    ),

  gender: z.string(),

  address: z.string().min(3, {
    message: "Must be at least 3 characters.",
  }),
});
