"use server"
import { auth } from '@/lib/auth'
import { db } from '@/server/db';
import { formSchema, DealFormValues, dealActionSchema } from "@/lib/schemas/dealSchema";
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'


// type ActionResult = { success: string } | { error: string } | null  -- make type work

export async function createDealAction(values: DealFormValues) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return { error: "Ви не авторизовані" }
    }

    const serverSchema = formSchema.omit({ images: true }).merge(dealActionSchema)
    const validateField = serverSchema.safeParse(values)

    if (!validateField.success) {
        return { error: `Не коректно введені дані ${validateField.error.message}` }
    }

    const data = validateField.data
    const imageUrls = data.images

    try {
        await db.insertInto('deal')
            .values({
                id: crypto.randomUUID(),
                link: data.link,
                title: data.title,
                oldPrice: data.oldPrice === "" ? null : data.oldPrice,
                newPrice: data.newPrice === "" ? 0 : data.newPrice,
                description: data.description,
                imageUrls: imageUrls,
                createdAt: new Date(),
                authorId: session.user.id
            })
            .execute()
        revalidatePath("/")
        return { success: "Знижку додано" }
    } catch (error) {
        console.error(error)
        return { error: "Помилка при збереженні в базу даних" }
    }
}