import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const formSchema = z.object({
    link: z
        .url("Введіть коректне посилання"),
    title: z
        .string()
        .min(1, "Введіть назву"),
    oldPrice: z
        .number()
        .or(z.literal("")),
    newPrice: z
        .number()
        .or(z.literal(""))
        .refine((value) => value !== "" && value > 0, "Введіть нову ціну"),
    images: z
        .array(
            z.custom<File>((file) => file instanceof File, "Оберіть файл")
                .refine((file) => file?.size <= MAX_FILE_SIZE, "Максимальний розмір файлу 5МБ")
                .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Підтримуються лише формати .jpeg, .jpg, .png, .webp")
        )
        .max(5, "Додайте не більше 5 зображень"),
    description: z
        .string()
        // if description is empty, use Ai to write smth
        .max(500, "Опис повинен бути не більше 500 символів"),
})

export const commentFormSchema = z.object({
    content: z
        .string()
        .min(1, "Введіть коментар"),
    images: z
        .array(
            z.custom<File>((file) => file instanceof File, "Оберіть файл")
                .refine((file) => file?.size <= MAX_FILE_SIZE, "Максимальний розмір файлу 5МБ")
                .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Підтримуються лише формати .jpeg, .jpg, .png, .webp")
        )
        .max(5, "Додайте не більше 5 зображень"),
    dealId: z.string(),
    parentId: z.string().optional().nullable(),
})

export const dealActionSchema = z.object({
    images: z
        .array(
            z
                .string()
                .url("Введіть коректне посилання")
        ),
});

export type CommentFormValues = z.infer<typeof commentFormSchema>
export type DealFormValues = z.infer<typeof formSchema>