"use server"

import { headers } from "next/headers"
import { auth } from "../auth"
import { db } from "@/server/db";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";

export async function updateUserPhoto(imageUrl: string) {
    const session = await auth.api.getSession({headers: await headers()})
    if (!session) return { error: "Не авторизовано" };

    try {
        await db.updateTable("user")
            .set({image: imageUrl})
            .where("id", "=", session.user.id)
            .execute()
        revalidatePath(`/user/${session.user.id}`)
        return {success: "Фото профілю оновлено"}
    } catch (error) {
        return { error: "Помилка оновлення фото профілю" };
    }
}