import { z as zod } from "zod";

export const MemeSchema = zod.object({
  name: zod
    .string({
      required_error: "Este campo es requerido",
    })
    .min(1, "Este campo es requerido")
    .max(100),
  description: zod
    .string({
      required_error: "Este campo es requerido",
    })
    .min(1, "Este campo es requerido")
    .max(200),
  url: zod
    .string({
      required_error: "Este campo es requerido",
    })
    .min(1, "Este campo es requerido")
    .max(200),
  numberOfLikes: zod
    .number({
      required_error: "Este campo es requerido",
      invalid_type_error: "El valor debe ser un número",
    })
    .positive("Solo se permiten números positivos")
    .nullable()
    .transform((value) => value ?? NaN)
    .refine((value) => !isNaN(value), {
      message: "Este campo es requerido",
    }),
  numberOfComments: zod
    .number({
      required_error: "Este campo es requerido",
    })
    .min(0),
});

export const MemeDefaultValues = {
  name: "",
  description: "",
  url: "",
  numberOfLikes: undefined,
  numberOfComments: undefined,
};

export type MemeSchemaType = zod.infer<typeof MemeSchema>;
