"use server"

import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { requireSession } from "./require-session"
import { profileSchema } from "../schemas/profileSchema";

export async function updateUserPhoto(imageUrl: string) {
    const sessionResult = await requireSession()
    if (!sessionResult.ok) {
        return { error: sessionResult.error };
    }
    const { session } = sessionResult

    try {
        await db.updateTable("user")
            .set({image: imageUrl})
            .where("id", "=", session.user.id)
            .execute()
        revalidatePath(`/user/[username]`, "page")
        return {success: "Фото профілю оновлено"}
    } catch {
        return { error: "Помилка оновлення фото профілю" };
    }
}

export async function updateUserData(data: { name?: string; userName?: string }) {
    const sessionResult = await requireSession()
    if (!sessionResult.ok) return { error: sessionResult.error };
    const { session } = sessionResult

    const parsedData = profileSchema.safeParse(data)

    if (!parsedData.success) {
        return {
            error: "validation_error",
            message: "Помилка перевірки даних"
        }
    }
    
    const values: { name?: string; username?: string } = {}
    if (parsedData.data.name !== undefined) values.name = parsedData.data.name
    if (parsedData.data.userName !== undefined) values.username = parsedData.data.userName

    if (Object.keys(values).length === 0) {
        return { error: "Немає даних для оновлення" };
    }

    try {
        if (values.username !== undefined) {
            const existingUser = await db
                .selectFrom("user")
                .select("id")
                .where("username", "=", values.username)
                .where("id", "!=", session.user.id)
                .executeTakeFirst();

            if (existingUser) {
                return {
                    error: "conflict",
                    message: "Цей юзернейм вже зайнятий іншим користувачем"
                };
            }
        }

        await db.updateTable("user")
            .set(values)
            .where("id", "=", session.user.id)
            .execute()
        revalidatePath(`/user/[username]`, "page")
        return {success: "Дані оновлено"}
    } catch {
        return { error: "Помилка оновлення даних" };
    }
}