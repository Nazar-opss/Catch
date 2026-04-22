import z from "zod"

export const authSchema = z.object({
    name: z.string().min(2, "Ім'я повинно бути не менше 2 символів"),
    email: z.email("Введіть коректний email").trim().toLowerCase(),
    password: z.string().min(8, "Пароль повинен бути не менше 8 символів"),
})

export type AuthFormValues = z.infer<typeof authSchema>