"use server"
import { auth } from '@/lib/auth'
import { db } from '@/server/db';
import { DealActionValues , dealActionSchema } from "@/lib/schemas/dealSchema";
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'


type ActionResult =
    | { success: string; error?: undefined }
    | { error: string; success?: undefined }

const requireSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return { ok: false as const, error: "Ви не авторизовані" }
    }

    return { ok: true as const, session }
}

export async function createDealAction(values: DealActionValues): Promise<ActionResult> {
    const sessionResult = await requireSession()
    if (!sessionResult.ok) {
        return { error: sessionResult.error }
    }
    const { session } = sessionResult


    const validateField = dealActionSchema.safeParse(values)

    if (!validateField.success) {
        return { error: `Не коректно введені дані ${validateField.error.message}` }
    }

    const data = validateField.data

    try {
        await db.insertInto('deal')
            .values({
                id: crypto.randomUUID(),
                link: data.link,
                title: data.title,
                oldPrice: data.oldPrice === "" ? null : data.oldPrice,
                newPrice: data.newPrice === "" ? 0 : data.newPrice,
                description: data.description,
                imageUrls: data.images,
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

export async function updateDealAction(dealId: string, values: DealActionValues): Promise<ActionResult> {
    const sessionResult = await requireSession()
    if (!sessionResult.ok) {
        return { error: sessionResult.error }
    }
    const { session } = sessionResult


    const validateField = dealActionSchema.safeParse(values)

    if (!validateField.success) {
        return { error: `Не коректно введені дані ${validateField.error.message}` }
    }

    const data = validateField.data

    try {
        const result = await db.updateTable('deal')
            .set({
                link: data.link,
                title: data.title,
                oldPrice: data.oldPrice === "" ? null : data.oldPrice,
                newPrice: data.newPrice === "" ? 0 : data.newPrice,
                description: data.description,
                imageUrls: data.images,
            })
            .where('id', '=', dealId)
            .where('authorId', '=', session.user.id)
            .executeTakeFirst()
        if (Number(result.numUpdatedRows) === 0) {
            return { error: "Угоду не знайдено або немає прав" }
        }
        revalidatePath(`/deal/${dealId}`)
        return { success: "Знижку оновлено" }
    } catch (error) {
        console.error(error)
        return { error: "Помилка при збереженні в базу даних" }
    }
}

export async function deleteDealAction(dealId: string): Promise<ActionResult> {
    const sessionResult = await requireSession()
    if (!sessionResult.ok) {
        return { error: sessionResult.error }
    }
    const { session } = sessionResult

    try {
        const result = await db.deleteFrom('deal')
            .where('id', '=', dealId)
            .where('authorId', '=', session.user.id)
            .executeTakeFirst()
        if (Number(result.numDeletedRows) === 0) {
            return { error: "Угоду не знайдено або немає прав" }
        }
        revalidatePath("/")
        revalidatePath(`/deal/${dealId}`)
        return { success: "Знижку видалено" }
    } catch (error) {
        console.error(error)
        return { error: "Помилка при видаленні з бази даних" }
    }
}