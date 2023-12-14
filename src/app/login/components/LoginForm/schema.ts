import { z as zod } from "zod";

export const LoginSchema = zod.object({
  email: zod
    .string({
      required_error: "Este campo es requerido",
    })
    .min(1, "Este campo es requerido")
    .email("Invalid email address"),
  password: zod
    .string({
      required_error: "Este campo es requerido",
    })
    .min(1, "Este campo es requerido")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginSchemaType = zod.infer<typeof LoginSchema>;
