import z from "zod";
import { passwordRules } from "./resetSchema";

export const profileSchema = z.object({
  name: z.string().min(2, "Ім'я повинно бути не менше 2 символів").optional(),
  email: z.email("Введіть коректний email").trim().toLowerCase().optional(),
  userName: z
    .string()
    .min(2, "Нікнейм повинен бути не менше 2 символів")
    .max(30, "Нікнейм надто довгий")
    .regex(/^[a-zA-Z0-9_-]+$/, "Юзернейм може містити лише латинські літери, цифри та нижнє підкреслення (_)")
    .optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Введіть поточний пароль"),
  newPassword: passwordRules,
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
