import { CreateUserData } from "@/lib/types/user.types";
import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .trim(),
  email: z.email("Invalid email format").toLowerCase().trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
});

export const validateSignup = (data: CreateUserData) => {
  return signupSchema.safeParse(data);
};
