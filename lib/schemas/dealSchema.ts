import z from "zod";
import { ACCEPTED_IMAGE_TYPES, CATEGORY_VALUES, MAX_FILE_SIZE } from "../constants";


const baseSchema = z.object({
    link: z
        .url({protocol: /^https?$/, message: "Введіть коректне посилання"}),
    title: z
        .string()
        .refine((val) => !/(https?:\/\/|www\.|\.[a-z]{2,}\/)/i.test(val.normalize("NFKC")),
            { message: "У це поле потрібно ввести назву (наприклад, iPhone 15), а не посилання" }
        )
        .min(1, "Введіть назву"),
    category: z
        .enum(CATEGORY_VALUES, {message: "Оберіть категорію"}),
    oldPrice: z
        .number()
        .int("Введіть ціле число")
        .or(z.literal("")),
    newPrice: z
        .number()
        .int("Введіть ціле число")
        .or(z.literal(""))
        .refine((value) => value !== "" && value > 0, "Введіть нову ціну"),

    images: z
        .array(
            z.custom<File>((file) => file instanceof File, "Оберіть файл")
                .refine((file) => file?.size <= MAX_FILE_SIZE, "Максимальний розмір файлу 5МБ")
                .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Підтримуються лише формати .jpeg, .jpg, .png, .webp")
        )
        .max(5, "Додайте не більше 5 зображень"),

    existingImages: z
        .array(z.url("Введіть коректне посилання")),
    description: z
        .string()
        // TODO: if description is empty, use Ai to write smth
        .max(2000, "Опис повинен бути не більше 2000 символів"),
    expiresAt: z
        .string()
})

export const formSchema = baseSchema.refine(
    (value) => value.images.length + value.existingImages.length <= 5,
    {
        message: "Додайте не більше 5 зображень",
        path: ["images"]
    }
)

export const commentFormSchema = z.object({
    content: z
        .string()
        .min(1, "Введіть коментар")
        .max(2000, "Коментар не більше 2000 символів"),
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

export const dealActionSchema = baseSchema
    .omit({images: true, existingImages: true})
    .extend({
        images: z.array(z.url("Введіть короктне посилання")),
    })

export const importDealSchema = z.array(dealActionSchema.extend({
    expiresAt: z.string().optional().nullable(),
    oldPrice: z.number().int().or(z.literal("")).or(z.null()).optional(),
}))


export type ImportDealsValues = z.infer<typeof importDealSchema>
export type CommentFormValues = z.infer<typeof commentFormSchema>
export type DealFormValues = z.infer<typeof formSchema>
export type DealActionValues = z.infer<typeof dealActionSchema>