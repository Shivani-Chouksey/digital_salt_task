import { z } from "zod";

// Extended schema with more fields
export const fullSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(3, "Password must be at least 3 characters"),
  email: z.string().email("Invalid email address").optional(),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits")
    .optional(),
  confirmPassword: z
    .string()
    .min(3, "Confirmation Password must be at least 3 characters")
    .optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(), // Gender options
  country: z
    .string()
    .refine(
      (value) => ["USA", "Canada", "India", "Australia"].includes(value),
      {
        message: "Invalid country selected",
      }
    )
    .optional(), // Country with a valid set of options
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    })
    .optional(),
});
