import z from "zod"

export const authSchema = z.object({
    email: z.email("Введіть коректний email").trim().toLowerCase(),
    password: z.string().min(8, "Пароль повинен бути не менше 8 символів"),
})

export type AuthFormValues = z.infer<typeof authSchema>