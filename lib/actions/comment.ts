"use server"
import { auth } from '@/lib/auth'
import { db } from '@/server/db';
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'


// type ActionResult = { success: string } | { error: string } | null  -- make type work

export async function createCommentAction(values: { content: string, images: string[], dealId: string, parentId?: string | null }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return { error: "Ви не авторизовані" }
    }
    // TODO: uncomment for add images to comment, update db, example for formSchema
    // const serverSchema = formSchema.omit({ images: true }).merge(dealActionSchema)
    // const validateField = serverSchema.safeParse(values)

    // if (!validateField.success) {
    //     return { error: `Не коректно введені дані ${validateField.error.message}` }
    // }

    // const data = validateField.data
    // const imageUrls = data.images

    try {
        await db.insertInto('comment')
            .values({
                id: crypto.randomUUID(),
                content: values.content,
                createdAt: new Date(),
                authorId: session.user.id,
                dealId: values.dealId,
                parentId: values.parentId || null
            })
            .execute()
        revalidatePath(`/deal/${values.dealId}`)
        return { success: "Коментар додано" }
    } catch (error) {
        console.error(error)
        return { error: "Помилка при збереженні коментаря" }
    }
}