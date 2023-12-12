import { z as zod } from "zod";

export const LoginSchema = zod.object({
  email: zod
    .string({
      required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: zod
    .string({
      required_error: "Password is required",
    })
    .min(1, "Email is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginSchemaType = zod.infer<typeof LoginSchema>;
