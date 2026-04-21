import z from "zod";

export const forgetPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "Введіть електронну пошту")
        .email("Введіть коректну електронну пошту"),
})

export const newPasswordSchema = z.object({
    password: z
        .string()
        .min(1, "Введіть пароль")
        .min(8, "Пароль повинен містити не менше 8 символів")
        .regex(/[a-z]/, "Пароль повинен містити принаймні одну маленьку літеру")
        .regex(/[A-Z]/, "Пароль повинен містити принаймні одну велику літеру")
        .regex(/\d/, "Пароль повинен містити принаймні одну цифру")
        .regex(/[^a-zA-Z0-9]/, "Пароль повинен містити принаймні один спеціальний символ"),
    confirmPassword: z
        .string()
        .min(1, "Підтвердіть пароль")
        .min(8, "Пароль повинен містити не менше 8 символів")
        .regex(/[a-z]/, "Пароль повинен містити принаймні одну маленьку літеру")
        .regex(/[A-Z]/, "Пароль повинен містити принаймні одну велику літеру")
        .regex(/\d/, "Пароль повинен містити принаймні одну цифру")
        .regex(/[^a-zA-Z0-9]/, "Пароль повинен містити принаймні один спеціальний символ"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
})

export type ForgetPasswordSchemaValues = z.infer<typeof forgetPasswordSchema>
export type NewPasswordSchemaValues = z.infer<typeof newPasswordSchema>