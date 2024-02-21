import * as z from "zod";

export const loginFormSchema = z.object({
    username: z
    .string()
    .min(3, {
      message: "Логин должен быть больше 3 символов.",
    })
    .max(30, {
      message: "Логин должен быть меньше 30 символов.",
    }),
  password: z
  .string()
    .min(5, {
      message: "Пароль должен быть больше 5 символов.",
    })
    .max(30, {
      message: "Пароль должен быть меньше 30 символов.",
    }),
});

export const loginFormDefaultValues = {
    username: "",
    password: "",
};

export type LoginFormSchemaValues = z.infer<typeof loginFormSchema>;