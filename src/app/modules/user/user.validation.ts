import z from "zod";
import { isActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name too short" })
    .max(30, { message: "Max length 30 character" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be 8 character" })
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\;'/`~]/,
      "Password must contain at least one special character"
    )
    .regex(/\d/, "Password must contain at least one digit"),
  phone: z
    .string()
    .regex(/^(?:\+880|880|0)1[3-9]\d{8}$/, "Invalid phone number")
    .optional(),
  address: z.string().optional(),
});


export const updateUserZodSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name too short" })
    .max(30, { message: "Max length 30 character" }),
//   email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be 8 character" })
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\;'/`~]/,
      "Password must contain at least one special character"
    )
    .regex(/\d/, "Password must contain at least one digit").optional(),
  phone: z
    .string()
    .regex(/^(?:\+880|880|0)1[3-9]\d{8}$/, "Invalid phone number")
    .optional(),
  address: z.string().optional(),
  role: z.enum(Object.values(Role)).optional(),
  isActive: z.enum(Object.values(isActive)).optional(),
  isDeleted: z.boolean().optional(),
  isVerified: z.boolean().optional()
});
