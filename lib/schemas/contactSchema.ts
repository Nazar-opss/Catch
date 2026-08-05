import z from "zod";

export const contactFormSchema = z.object({
    name: z.string().min(2, "Ім'я або нікнейм повинно бути не менше 2 символів"),
    email: z.email("Введіть ваш email").trim().toLowerCase(),
    subject: z.string().min(5, "Тема занадто коротка"),
    message: z.string().min(10, "Повідомлення повинно містити мінімум 10 символів"),
    userId: z.string().optional(),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>