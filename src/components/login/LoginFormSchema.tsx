import * as z from "zod";

export const loginFormSchema = z.object({
    username: z
    .string()
    .min(3, {
      message: "Логин должен быть больше 3 символов.",
    })
    .max(50, {
      message: "Логин должен быть меньше 50 символов.",
    }),
  password: z
  .string()
    .min(5, {
      message: "Пароль должен быть больше 5 символов.",
    })
    .max(50, {
      message: "Пароль должен быть меньше 50 символов.",
    }),
});

export const loginFormDefaultValues = {
    username: "",
    password: "",
};

export type LoginFormSchemaValues = z.infer<typeof loginFormSchema>;