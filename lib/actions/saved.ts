"use server"
import { db } from "@/server/db"
import { revalidatePath } from "next/cache"
import { auth } from "../auth"
import { headers } from "next/headers"

export async function saveDealAction({ dealId }: { dealId: string }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return { error: "Ви не авторизовані" }
    }

    try {
        const existing = await db.selectFrom('saved_deal')
            .select('id')
            .where('userId', '=', session.user.id)
            .where('dealId', '=', dealId)
            .executeTakeFirst()

        if (existing) {
            await db.deleteFrom('saved_deal')
                .where('id', '=', existing.id)
                .execute()
            revalidatePath("/")
            return { success: "Знижку видалено із збережених", saved: false }
        }

        await db.insertInto('saved_deal')
            .values({
                id: crypto.randomUUID(),
                dealId: dealId,
                createdAt: new Date(),
                userId: session.user.id,
            })
            .execute()
        revalidatePath("/")
        return { success: "Знижку додано", saved: true }
    } catch (error) {
        console.error(error)
        return { error: "Помилка при збереженні в базу даних" }
    }
}
