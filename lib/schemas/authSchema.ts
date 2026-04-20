import z from "zod"

export const authSchema = z.object({
    email: z.email("Введіть коректний email").trim().toLowerCase(),
    password: z.string().min(6, "Пароль повинен бути не менше 6 символів"),
})


export type AuthFormValues = z.infer<typeof authSchema>