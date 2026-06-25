"use server"

import { headers } from "next/headers"
import { auth } from "../auth"
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

export async function updateUserPhoto(imageUrl: string) {
    const session = await auth.api.getSession({headers: await headers()})
    if (!session) {
        return { error: "Не авторизовано" };
    } 

    try {
        await db.updateTable("user")
            .set({image: imageUrl})
            .where("id", "=", session.user.id)
            .execute()
        revalidatePath(`/user/${session.user.id}`)
        return {success: "Фото профілю оновлено"}
    } catch {
        return { error: "Помилка оновлення фото профілю" };
    }
}

export async function updateUserData(data: { name?: string; userName?: string }) {
    const session = await auth.api.getSession({headers: await headers()})
    if (!session) return { error: "Не авторизовано" };

    const values: { name?: string; username?: string } = {}
    if (data.name !== undefined) values.name = data.name
    if (data.userName !== undefined) values.username = data.userName

    if (Object.keys(values).length === 0) {
        return { error: "Немає даних для оновлення" };
    }

    try {
        await db.updateTable("user")
            .set(values)
            .where("id", "=", session.user.id)
            .execute()
        revalidatePath(`/user/${session.user.id}`)
        return {success: "Дані оновлено"}
    } catch {
        return { error: "Помилка оновлення даних" };
    }
}