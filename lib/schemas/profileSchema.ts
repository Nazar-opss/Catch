import z from "zod"

export const profileSchema = z.object({
    name: z.string().min(2, "Ім'я повинно бути не менше 2 символів").optional(),
    email: z.email("Введіть коректний email").trim().toLowerCase().optional(),
    userName: z.string().min(2, "Нікнейм повинен бути не менше 2 символів").optional(),
})

export type ProfileFormValues = z.infer<typeof profileSchema>