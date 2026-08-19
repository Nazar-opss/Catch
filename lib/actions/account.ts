"use server"

import { headers } from "next/headers"
import { auth } from "../auth"
import { requireSession } from "./require-session"
import { newPasswordSchema } from "../schemas/resetSchema"

export async function deleteAccountWithPassword(password: string) {
    const sessionResult = await requireSession()
    if (!sessionResult.ok) {
        return { error: sessionResult.error }
    }
    const { session } = sessionResult

    const ctx = await auth.$context
    const accounts = await ctx.internalAdapter.findAccounts(session.user.id)
    const credential = accounts.find(a => a.providerId === "credential" && a.password)
    const hash = credential?.password
    if (!hash) {
        return {error: "CREDENTIAL_ACCOUNT_NOT_FOUND"}
    }

    const ok = await ctx.password.verify({ hash, password })
    if(!ok) return {error: "INVALID_PASSWORD"}

    await ctx.internalAdapter.deleteUser(session.user.id)
    await ctx.internalAdapter.deleteSessions(session.user.id)
    return { success: true }
}

export async function createPassword(data: {password: string, confirmPassword: string}) {
    const sessionResult = await requireSession()
    if (!sessionResult.ok) {
        return { error: sessionResult.error }
    }

    const validatedFields = newPasswordSchema.safeParse(data)
    if(!validatedFields.success) {
        return {error: validatedFields.error.message}
    }
    try {
        await auth.api.setPassword({
            body: {
                newPassword: validatedFields.data.password,
            },
            headers: await headers() 
        });

        return { success: true };
    } catch (error) {
        console.error("Помилка створення пароля:", error);
        return { error: "Не вдалося створити пароль. Спробуйте пізніше." };
    }
}